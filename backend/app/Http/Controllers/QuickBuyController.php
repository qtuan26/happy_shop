<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderCoupon;
use App\Models\Coupon;
use App\Models\Inventory;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class QuickBuyController extends Controller
{
    // POST /api/quick-buy/apply-coupon
    public function applyCoupon(Request $request)
    {
        $request->validate([
            'coupon_code' => 'required|string',
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);
        $subtotal = $product->base_price * $request->quantity;

        $coupon = Coupon::where('coupon_code', $request->coupon_code)
            ->where('is_active', 1)
            ->first();

        if (!$coupon) {
            return response()->json(['message' => 'Coupon không tồn tại'], 400);
        }

        $now = now();
        if ($coupon->start_date && $now->lt($coupon->start_date)) {
            return response()->json(['message' => 'Coupon chưa bắt đầu'], 400);
        }
        if ($coupon->end_date && $now->gt($coupon->end_date)) {
            return response()->json(['message' => 'Coupon đã hết hạn'], 400);
        }

        if ($coupon->usage_limit !== null && $coupon->usage_limit <= 0) {
            return response()->json(['message' => 'Coupon đã hết lượt sử dụng'], 400);
        }

        if ($coupon->min_purchase_amount !== null && $subtotal < $coupon->min_purchase_amount) {
            return response()->json([
                'error' => 'MIN_ORDER_NOT_MET',
                'message' => "Đơn hàng phải tối thiểu \${$coupon->min_purchase_amount}",
            ], 422);
        }

        $discount = 0;
        if ($coupon->discount_type === 'percentage') {
            $discount = $subtotal * ($coupon->discount_value / 100);
            if ($coupon->max_discount_amount) {
                $discount = min($discount, $coupon->max_discount_amount);
            }
        }
        if ($coupon->discount_type === 'fixed_amount') {
            $discount = $coupon->discount_value;
        }

        return response()->json([
            'message' => "Áp dụng mã {$coupon->coupon_code} thành công",
            'data' => [
                'coupon_code' => $coupon->coupon_code,
                'discount' => round($discount, 2),
                'min_purchase_amount' => $coupon->min_purchase_amount,
                'discount_type' => $coupon->discount_type
            ]
        ]);
    }

    // POST /api/quick-buy/checkout
    public function checkout(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'size' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'payment_method' => 'required|string|in:COD,MOMO',
            'coupon_code' => 'nullable|string',
        ]);

        $customer = $request->user()->customer;
        $product = Product::findOrFail($request->product_id);

        return DB::transaction(function () use ($request, $product, $customer) {
            
            /* 1️⃣ SUBTOTAL */
            $subtotal = $product->base_price * $request->quantity;
            
            /* 2️⃣ SHIPPING */
            $shippingFee = 20;
            
            /* 3️⃣ COUPON */
            $discountAmount = 0;
            $appliedCoupon = null;

            if ($request->coupon_code) {
                $coupon = Coupon::where('coupon_code', $request->coupon_code)
                    ->where('is_active', 1)
                    ->lockForUpdate()
                    ->first();

                if (!$coupon) {
                    throw new \Exception('Coupon không hợp lệ');
                }

                if ($coupon->usage_limit !== null && $coupon->usage_limit <= 0) {
                    throw new \Exception('Coupon đã hết lượt sử dụng');
                }

                if ($coupon->min_purchase_amount !== null && $subtotal < $coupon->min_purchase_amount) {
                    throw new \Exception('Đơn hàng chưa đủ điều kiện áp dụng coupon');
                }

                if ($coupon->discount_type === 'percentage') {
                    $discountAmount = $subtotal * ($coupon->discount_value / 100);
                    if ($coupon->max_discount_amount) {
                        $discountAmount = min($discountAmount, $coupon->max_discount_amount);
                    }
                }

                if ($coupon->discount_type === 'fixed_amount') {
                    $discountAmount = $coupon->discount_value;
                }

                $coupon->decrement('usage_limit');
                if ($coupon->usage_limit <= 0) {
                    $coupon->update(['is_active' => 0]);
                }

                $appliedCoupon = $coupon;
            }

            /* 4️⃣ TOTAL */
            $total = $subtotal + $shippingFee - $discountAmount;

            /* 5️⃣ ORDER STATUS */
            $orderStatus = $request->payment_method === 'MOMO' ? 'pending' : 'completed';

            /* 6️⃣ CHECK INVENTORY (chỉ cho COD, MOMO sẽ check sau) */
            $inventory = Inventory::where('product_id', $request->product_id)
                ->where('size', $request->size)
                ->lockForUpdate()
                ->first();

            if (!$inventory) {
                throw new \Exception("Sản phẩm không tồn tại trong kho");
            }

            if ($inventory->quantity < $request->quantity) {
                throw new \Exception("Không đủ tồn kho");
            }

            /* 7️⃣ CREATE ORDER */
            $order = Order::create([
                'customer_id' => $customer->customer_id,
                'subtotal' => $subtotal,
                'shipping_fee' => $shippingFee,
                'discount_amount' => $discountAmount,
                'total_amount' => $total,
                'payment_method' => $request->payment_method,
                'status' => $orderStatus,
            ]);

            /* 8️⃣ DECREASE INVENTORY (chỉ COD) */
            if ($request->payment_method === 'COD') {
                $inventory->decrement('quantity', $request->quantity);
            }

            /* 9️⃣ CREATE ORDER ITEM */
            OrderItem::create([
                'order_id' => $order->order_id,
                'product_id' => $request->product_id,
                'size' => $request->size,
                'quantity' => $request->quantity,
                'unit_price' => $product->base_price,
                'subtotal' => $subtotal,
            ]);

            /* 🔟 SAVE COUPON */
            if ($appliedCoupon) {
                OrderCoupon::create([
                    'order_id' => $order->order_id,
                    'coupon_id' => $appliedCoupon->coupon_id,
                    'discount_applied' => $discountAmount,
                ]);
            }

            /* 1️⃣1️⃣ RESPONSE */
            if ($request->payment_method === 'MOMO') {
                return response()->json([
                    'message' => 'Đơn hàng đã tạo, vui lòng thanh toán qua MOMO',
                    'order' => [
                        'order_id' => $order->order_id,
                        'total_amount' => $total,
                        'status' => 'pending',
                        'payment_method' => 'MOMO'
                    ],
                    'qr_code' => [
                        'order_id' => $order->order_id,
                        'amount' => $total,
                        'method' => 'MOMO',
                        'qr_string' => "MOMO|ORDER_{$order->order_id}|{$total}|VND"
                    ]
                ]);
            }

            // COD response
            return response()->json([
                'message' => 'Thanh toán thành công (COD)',
                'order' => $order->load('items.product', 'coupons.coupon'),
            ]);
        });
    }

    /* ======================= CONFIRM MOMO (Quick Buy) ======================= */
    public function confirmMomo(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,order_id'
        ]);

        return DB::transaction(function () use ($request) {
            $order = Order::with('items.product')
                ->where('order_id', $request->order_id)
                ->lockForUpdate()
                ->first();

            if (!$order) {
                return response()->json(['message' => 'Đơn hàng không tồn tại'], 404);
            }

            if ($order->status !== 'pending') {
                return response()->json([
                    'message' => 'Đơn hàng không ở trạng thái chờ thanh toán'
                ], 400);
            }

            // MOMO → trừ kho SAU khi thanh toán
            foreach ($order->items as $item) {
                $inventory = Inventory::where('product_id', $item->product_id)
                    ->where('size', $item->size)
                    ->lockForUpdate()
                    ->first();

                if (!$inventory || $inventory->quantity < $item->quantity) {
                    throw new \Exception("Không đủ tồn kho cho sản phẩm {$item->product->product_name} size {$item->size}");
                }

                $inventory->decrement('quantity', $item->quantity);
            }

            $order->update(['status' => 'completed']);

            return response()->json([
                'message' => 'Thanh toán MOMO thành công',
                'order' => $order->load('items.product', 'coupons.coupon')
            ]);
        });
    }
}