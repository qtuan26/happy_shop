<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShoppingCart;
use App\Models\CartItem;

class CartController extends Controller
{
    // GET /api/cart
    public function index(Request $request)
    {
        $user = $request->user();
        $customer = $user->customer;

        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $cart = ShoppingCart::firstOrCreate([
            'customer_id' => $customer->customer_id
        ]);

        $cart->load(['items.product']);

        return response()->json([
            'cart_id' => $cart->cart_id,
            'items' => $cart->items->map(function ($item) {
                return [
                    'cart_item_id' => $item->cart_item_id,
                    'product_id'   => $item->product_id,
                    'product_name' => $item->product->product_name,
                    'url_image'    => $item->product->url_image,
                    'size'         => $item->size,
                    'quantity'     => $item->quantity,
                    'price'        => $item->product->base_price,
                    'subtotal'     => $item->quantity * $item->product->base_price
                ];
            })
        ]);
    }

    // POST /api/cart/add
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'size'       => 'required|string|max:10',
            'quantity'   => 'required|integer|min:1'
        ]);

        $customer = $request->user()->customer;

        $cart = ShoppingCart::firstOrCreate([
            'customer_id' => $customer->customer_id
        ]);

        $item = CartItem::where('cart_id', $cart->cart_id)
            ->where('product_id', $request->product_id)
            ->where('size', $request->size)
            ->first();

        if ($item) {
            $item->increment('quantity', $request->quantity);
        } else {
            CartItem::create([
                'cart_id'    => $cart->cart_id,
                'product_id' => $request->product_id,
                'size'       => $request->size,
                'quantity'   => $request->quantity
            ]);
        }

        return response()->json(['message' => 'Added to cart']);
    }

    // PUT /api/cart/item/{id}
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $item = CartItem::findOrFail($id);
        $item->update(['quantity' => $request->quantity]);

        return response()->json(['message' => 'Cart item updated']);
    }

    // DELETE /api/cart/item/{id}
    public function remove($id)
    {
        CartItem::findOrFail($id)->delete();

        return response()->json(['message' => 'Item removed']);
    }

    // DELETE /api/cart/clear
    public function clear(Request $request)
    {
        $customer = $request->user()->customer;

        $cart = ShoppingCart::where('customer_id', $customer->customer_id)->first();

        if ($cart) {
            $cart->items()->delete();
        }

        return response()->json(['message' => 'Cart cleared']);
    }





}
