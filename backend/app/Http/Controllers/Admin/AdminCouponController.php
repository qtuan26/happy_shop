<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminCouponController extends Controller
{
    public function index(Request $request)
    {
        $query = Coupon::orderBy('created_at', 'desc');

        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('coupon_code', 'like', "%{$search}%")
                  ->orWhere('title', 'like', "%{$search}%");
            });
        }

        $coupons = $query->paginate($request->per_page ?? 10);
        return response()->json($coupons);
    }

    public function store(Request $request)
    {
        $request->validate([
            'coupon_code' => 'required|string|unique:coupons,coupon_code|max:50',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'discount_type' => 'required|in:percentage,fixed_amount',
            'discount_value' => 'required|numeric|min:0',
            'max_discount_amount' => 'nullable|numeric|min:0',
            'min_purchase_amount' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            // Upload ảnh
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('coupons', $imageName, 'public');

            $coupon = Coupon::create([
                'coupon_code' => strtoupper($request->coupon_code),
                'title' => $request->title,
                'description' => $request->description,
                'discount_type' => $request->discount_type,
                'discount_value' => $request->discount_value,
                'max_discount_amount' => $request->max_discount_amount,
                'min_purchase_amount' => $request->min_purchase_amount,
                'usage_limit' => $request->usage_limit,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'url_image' => $imagePath,
                'public_url_image' => Storage::url($imagePath),
                'is_active' => true,
            ]);

            return response()->json([
                'message' => 'Tạo coupon thành công',
                'coupon' => $coupon
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi tạo coupon',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $coupon = Coupon::findOrFail($id);
        return response()->json($coupon);
    }

    public function update(Request $request, $id)
    {
        $coupon = Coupon::findOrFail($id);

        $request->validate([
            'coupon_code' => 'required|string|max:50|unique:coupons,coupon_code,' . $id . ',coupon_id',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'discount_type' => 'required|in:percentage,fixed_amount',
            'discount_value' => 'required|numeric|min:0',
            'max_discount_amount' => 'nullable|numeric|min:0',
            'min_purchase_amount' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            // Upload ảnh mới nếu có
            if ($request->hasFile('image')) {
                Storage::disk('public')->delete($coupon->url_image);

                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $imagePath = $image->storeAs('coupons', $imageName, 'public');

                $coupon->url_image = $imagePath;
                $coupon->public_url_image = Storage::url($imagePath);
            }

            $coupon->update([
                'coupon_code' => strtoupper($request->coupon_code),
                'title' => $request->title,
                'description' => $request->description,
                'discount_type' => $request->discount_type,
                'discount_value' => $request->discount_value,
                'max_discount_amount' => $request->max_discount_amount,
                'min_purchase_amount' => $request->min_purchase_amount,
                'usage_limit' => $request->usage_limit,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            return response()->json([
                'message' => 'Cập nhật coupon thành công',
                'coupon' => $coupon
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi cập nhật coupon',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $coupon = Coupon::findOrFail($id);
            Storage::disk('public')->delete($coupon->url_image);
            $coupon->delete();

            return response()->json([
                'message' => 'Xóa coupon thành công'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi xóa coupon',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleActive($id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->is_active = !$coupon->is_active;
        $coupon->save();

        return response()->json([
            'message' => 'Cập nhật trạng thái thành công',
            'coupon' => $coupon
        ]);
    }
}