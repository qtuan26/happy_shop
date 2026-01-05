<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Order;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminController extends Controller
{
    // ===== DASHBOARD STATISTICS =====
    public function getDashboardStats()
    {
        try {
            $today = Carbon::today();
            $thisMonth = Carbon::now()->startOfMonth();
            $lastMonth = Carbon::now()->subMonth()->startOfMonth();

            // Tổng quan
            $totalCustomers = Customer::count();
            $totalProducts = Product::count();
            $totalOrders = Order::count();
            $totalRevenue = Order::where('status', '!=', 'cancelled')->sum('total_amount');

            // Đơn hàng hôm nay
            $todayOrders = Order::whereDate('created_at', $today)->count();
            $todayRevenue = Order::whereDate('created_at', $today)
                ->where('status', '!=', 'cancelled')
                ->sum('total_amount');

            // Đơn hàng tháng này
            $monthOrders = Order::where('created_at', '>=', $thisMonth)->count();
            $monthRevenue = Order::where('created_at', '>=', $thisMonth)
                ->where('status', '!=', 'cancelled')
                ->sum('total_amount');

            // Đơn hàng tháng trước
            $lastMonthOrders = Order::whereBetween('created_at', [$lastMonth, $thisMonth])->count();
            $lastMonthRevenue = Order::whereBetween('created_at', [$lastMonth, $thisMonth])
                ->where('status', '!=', 'cancelled')
                ->sum('total_amount');

            // Tính % tăng trưởng
            $orderGrowth = $lastMonthOrders > 0 
                ? (($monthOrders - $lastMonthOrders) / $lastMonthOrders) * 100 
                : 0;
            $revenueGrowth = $lastMonthRevenue > 0 
                ? (($monthRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100 
                : 0;

            // Trạng thái đơn hàng
            $ordersByStatus = Order::select('status', DB::raw('count(*) as count'))
                ->groupBy('status')
                ->get();

            // Top sản phẩm bán chạy
            $topProducts = DB::table('order_items')
                ->join('products', 'order_items.product_id', '=', 'products.product_id')
                ->join('orders', 'order_items.order_id', '=', 'orders.order_id')
                ->where('orders.status', '!=', 'cancelled')
                ->select('products.product_id', 'products.product_name', 'products.url_image', 
                    DB::raw('SUM(order_items.quantity) as total_sold'),
                    DB::raw('SUM(order_items.subtotal) as total_revenue'))
                ->groupBy('products.product_id', 'products.product_name', 'products.url_image')
                ->orderBy('total_sold', 'desc')
                ->limit(5)
                ->get();

            // Doanh thu 7 ngày gần nhất
            $revenueChart = [];
            for ($i = 6; $i >= 0; $i--) {
                $date = Carbon::now()->subDays($i);
                $revenue = Order::whereDate('created_at', $date)
                    ->where('status', '!=', 'cancelled')
                    ->sum('total_amount');
                $revenueChart[] = [
                    'date' => $date->format('d/m'),
                    'revenue' => (float) $revenue
                ];
            }

            return response()->json([
                'overview' => [
                    'totalCustomers' => $totalCustomers,
                    'totalProducts' => $totalProducts,
                    'totalOrders' => $totalOrders,
                    'totalRevenue' => (float) $totalRevenue,
                ],
                'today' => [
                    'orders' => $todayOrders,
                    'revenue' => (float) $todayRevenue,
                ],
                'thisMonth' => [
                    'orders' => $monthOrders,
                    'revenue' => (float) $monthRevenue,
                    'orderGrowth' => round($orderGrowth, 2),
                    'revenueGrowth' => round($revenueGrowth, 2),
                ],
                'ordersByStatus' => $ordersByStatus,
                'topProducts' => $topProducts,
                'revenueChart' => $revenueChart,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi lấy thống kê',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ===== CUSTOMERS MANAGEMENT =====
    public function getCustomers(Request $request)
    {
        $query = Customer::with('user')->orderBy('created_at', 'desc');

        // Tìm kiếm
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $customers = $query->paginate($request->per_page ?? 10);

        return response()->json($customers);
    }

    public function getCustomerDetail($id)
    {
        $customer = Customer::with(['user', 'orders.orderItems.product'])
            ->findOrFail($id);

        $totalOrders = $customer->orders->count();
        $totalSpent = $customer->orders->where('status', '!=', 'cancelled')->sum('total_amount');

        return response()->json([
            'customer' => $customer,
            'statistics' => [
                'totalOrders' => $totalOrders,
                'totalSpent' => (float) $totalSpent,
            ]
        ]);
    }

    // ===== ORDERS MANAGEMENT =====
    public function getOrders(Request $request)
    {
        $query = Order::with(['customer.user', 'orderItems.product'])
            ->orderBy('created_at', 'desc');

        // Filter theo status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter theo ngày
        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Tìm kiếm
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('order_id', $search)
                  ->orWhereHas('customer', function($q) use ($search) {
                      $q->where('full_name', 'like', "%{$search}%");
                  });
            });
        }

        $orders = $query->paginate($request->per_page ?? 10);

        return response()->json($orders);
    }

    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return response()->json([
            'message' => 'Cập nhật trạng thái đơn hàng thành công',
            'order' => $order
        ]);
    }

    public function getOrderDetail($id)
    {
        $order = Order::with([
            'customer.user',
            'orderItems.product.brand',
            'orderCoupons.coupon'
        ])->findOrFail($id);

        return response()->json($order);
    }
}