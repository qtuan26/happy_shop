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
            'payment_method' => 'required|string',
            'coupon_code' => 'nullable|string',
        ]);

        $customer = $request->user()->customer;
        $product = Product::findOrFail($request->product_id);

        return DB::transaction(function () use ($request, $product, $customer) {
            
            $subtotal = $product->base_price * $request->quantity;
            $shippingFee = 20;
            $discountAmount = 0;
            $appliedCoupon = null;

            // Apply coupon
            if ($request->coupon_code) {
                $coupon = Coupon::where('coupon_code', $request->coupon_code)
                    ->where('is_active', 1)
                    ->lockForUpdate()
                    ->first();

                if (!$coupon) {
                    throw new \Exception('Coupon không hợp lệ');
                }

                if ($coupon->usage_limit <= 0) {
                    throw new \Exception('Coupon đã hết lượt sử dụng');
                }

                if ($subtotal < $coupon->min_purchase_amount) {
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

            $total = $subtotal + $shippingFee - $discountAmount;

            // Check inventory
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

            // Create order
            $order = Order::create([
                'customer_id' => $customer->customer_id,
                'subtotal' => $subtotal,
                'shipping_fee' => $shippingFee,
                'discount_amount' => $discountAmount,
                'total_amount' => $total,
                'payment_method' => $request->payment_method,
                'status' => 'completed',
            ]);

            // Decrease inventory
            $inventory->decrement('quantity', $request->quantity);

            // Create order item
            OrderItem::create([
                'order_id' => $order->order_id,
                'product_id' => $request->product_id,
                'size' => $request->size,
                'quantity' => $request->quantity,
                'unit_price' => $product->base_price,
                'subtotal' => $subtotal,
            ]);

            // Save coupon
            if ($appliedCoupon) {
                OrderCoupon::create([
                    'order_id' => $order->order_id,
                    'coupon_id' => $appliedCoupon->coupon_id,
                    'discount_applied' => $discountAmount,
                ]);
            }

            return response()->json([
                'message' => 'Thanh toán thành công',
                'order' => $order->load('items.product', 'coupons.coupon'),
            ]);
        });
    }
}