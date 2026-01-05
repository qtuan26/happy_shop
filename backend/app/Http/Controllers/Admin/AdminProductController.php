<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Inventory;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AdminProductController extends Controller
{
    // Lấy danh sách sản phẩm
    public function index(Request $request)
    {
        $query = Product::with(['brand', 'category', 'inventory'])
            ->orderBy('created_at', 'desc');

        // Filter theo category
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter theo brand
        if ($request->has('brand_id')) {
            $query->where('brand_id', $request->brand_id);
        }

        // Filter theo trạng thái
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        // Tìm kiếm
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('product_name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $products = $query->paginate($request->per_page ?? 10);

        return response()->json($products);
    }

    // Tạo sản phẩm mới
    public function store(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'brand_id' => 'required|exists:brands,brand_id',
            'category_id' => 'required|exists:categories,category_id',
            'base_price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'color' => 'nullable|string',
            'material' => 'nullable|string',
            'gender' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'inventory' => 'required|array',
            'inventory.*.size' => 'required|string',
            'inventory.*.quantity' => 'required|integer|min:0',
        ]);

        try {
            DB::beginTransaction();

            // Upload ảnh
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('products', $imageName, 'public');

            // Tạo sản phẩm
            $product = Product::create([
                'brand_id' => $request->brand_id,
                'category_id' => $request->category_id,
                'product_name' => $request->product_name,
                'url_image' => $imagePath,
                'public_url_image' => Storage::url($imagePath),
                'description' => $request->description,
                'base_price' => $request->base_price,
                'color' => $request->color,
                'material' => $request->material,
                'gender' => $request->gender,
                'date_added' => now(),
                'is_active' => true,
            ]);

            // Tạo inventory
            foreach ($request->inventory as $inv) {
                Inventory::create([
                    'product_id' => $product->product_id,
                    'size' => $inv['size'],
                    'quantity' => $inv['quantity'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Tạo sản phẩm thành công',
                'product' => $product->load(['brand', 'category', 'inventory'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Lỗi khi tạo sản phẩm',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Xem chi tiết sản phẩm
    public function show($id)
    {
        $product = Product::with(['brand', 'category', 'inventory'])
            ->findOrFail($id);

        return response()->json($product);
    }

    // Cập nhật sản phẩm
    public function update(Request $request, $id)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'brand_id' => 'required|exists:brands,brand_id',
            'category_id' => 'required|exists:categories,category_id',
            'base_price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'color' => 'nullable|string',
            'material' => 'nullable|string',
            'gender' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'inventory' => 'nullable|array',
            'inventory.*.size' => 'required|string',
            'inventory.*.quantity' => 'required|integer|min:0',
        ]);

        try {
            DB::beginTransaction();

            $product = Product::findOrFail($id);

            // Upload ảnh mới nếu có
            if ($request->hasFile('image')) {
                // Xóa ảnh cũ
                Storage::disk('public')->delete($product->url_image);

                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $imagePath = $image->storeAs('products', $imageName, 'public');

                $product->url_image = $imagePath;
                $product->public_url_image = Storage::url($imagePath);
            }

            // Cập nhật thông tin
            $product->update([
                'brand_id' => $request->brand_id,
                'category_id' => $request->category_id,
                'product_name' => $request->product_name,
                'description' => $request->description,
                'base_price' => $request->base_price,
                'color' => $request->color,
                'material' => $request->material,
                'gender' => $request->gender,
            ]);

            // Cập nhật inventory
            if ($request->has('inventory')) {
                // Xóa inventory cũ
                Inventory::where('product_id', $product->product_id)->delete();

                // Tạo mới
                foreach ($request->inventory as $inv) {
                    Inventory::create([
                        'product_id' => $product->product_id,
                        'size' => $inv['size'],
                        'quantity' => $inv['quantity'],
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Cập nhật sản phẩm thành công',
                'product' => $product->load(['brand', 'category', 'inventory'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Lỗi khi cập nhật sản phẩm',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Xóa sản phẩm
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            
            // Xóa ảnh
            Storage::disk('public')->delete($product->url_image);
            
            $product->delete();

            return response()->json([
                'message' => 'Xóa sản phẩm thành công'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi xóa sản phẩm',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Toggle trạng thái active
    public function toggleActive($id)
    {
        $product = Product::findOrFail($id);
        $product->is_active = !$product->is_active;
        $product->save();

        return response()->json([
            'message' => 'Cập nhật trạng thái thành công',
            'product' => $product
        ]);
    }
}