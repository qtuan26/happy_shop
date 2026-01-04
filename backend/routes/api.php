<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\QuickBuyController;
use App\Http\Controllers\ProductReviewController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', function () {
        return auth()->user();
    });
});

// Customer Profile
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/customer/profile', [CustomerController::class, 'profile']);
    Route::put('/customer/profile', [CustomerController::class, 'updateProfile']);
});

// Categories
Route::get('/categories', [CategoryController::class, 'index']);  
Route::get('/categories/{id}/products', [CategoryController::class, 'products']); 
Route::get( '/categories/{id}/products/filter',[CategoryController::class, 'filterProducts']);

// Cart - Checkout
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::put('/cart/item/{id}', [CartController::class, 'update']);
    Route::delete('/cart/item/{id}', [CartController::class, 'remove']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);
    Route::post('/cart/apply-coupon', [CartController::class, 'applyCoupon']);
    Route::post('/cart/checkout', [CartController::class, 'checkout']);
    Route::post('/checkout/momo/confirm', [CartController::class, 'confirmMomo']);
});


// Products
Route::get('/products/search', [ProductController::class, 'search']);
Route::get('/products/top-selling', [ProductController::class, 'topSelling']);
Route::get('/products/{id}', [ProductController::class, 'show']) ->whereNumber('id');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::put('/cart/item/{id}', [CartController::class, 'update']);
    Route::delete('/cart/item/{id}', [CartController::class, 'remove']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);
});

//COUPON
Route::get('/coupons', [CouponController::class, 'index']);
Route::get('/coupons/{id}', [CouponController::class, 'show']);

// Quick Buy
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/quick-buy/apply-coupon', [QuickBuyController::class, 'applyCoupon']);
    Route::post('/quick-buy/checkout', [QuickBuyController::class, 'checkout']);
});

// Product Reviews
Route::middleware('auth:sanctum')->post(
    '/products/{productId}/reviews',
    [ProductReviewController::class, 'store']
);