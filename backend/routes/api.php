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
use App\Http\Controllers\ChatController;

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
// Guest routes (chỉ cho người chưa đăng nhập)
Route::middleware('guest')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/chat/conversations', [ChatController::class, 'getConversations']);
    Route::get('/chat/{conversationId}', [ChatController::class, 'getConversationMessages']);
    Route::post('/chat/send', [ChatController::class, 'adminSendMessage']);
    
    // Thêm các route quản lý khác
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('coupons', CouponController::class);
});

// Customer routes (đã đăng nhập)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', function () {
        return auth()->user();
    });
    
    // Customer profile
    Route::get('/customer/profile', [CustomerController::class, 'profile']);
    Route::put('/customer/profile', [CustomerController::class, 'updateProfile']);
    
    // Cart
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index']);
        Route::post('/add', [CartController::class, 'add']);
        Route::put('/item/{id}', [CartController::class, 'update']);
        Route::delete('/item/{id}', [CartController::class, 'remove']);
        Route::delete('/clear', [CartController::class, 'clear']);
        Route::post('/apply-coupon', [CartController::class, 'applyCoupon']);
        Route::post('/checkout', [CartController::class, 'checkout']);
        Route::post('/checkout/momo/confirm', [CartController::class, 'confirmMomo']);
    });
    
    // Quick Buy
    Route::prefix('quick-buy')->group(function () {
        Route::post('/apply-coupon', [QuickBuyController::class, 'applyCoupon']);
        Route::post('/checkout', [QuickBuyController::class, 'checkout']);
        Route::post('/confirm-momo', [QuickBuyController::class, 'confirmMomo']);
    });
    
    // Reviews
    Route::post('/products/{productId}/reviews', [ProductReviewController::class, 'store']);
    
    // Chat
    Route::prefix('chat')->group(function () {
        Route::get('/conversation', [ChatController::class, 'getOrCreateConversation']);
        Route::post('/send', [ChatController::class, 'sendMessage']);
        Route::get('/{conversationId}/messages', [ChatController::class, 'getNewMessages']);
    });
});

// Public routes (không cần đăng nhập)
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}/products', [CategoryController::class, 'products']);
Route::get('/categories/{id}/products/filter', [CategoryController::class, 'filterProducts']);
Route::get('/products/search', [ProductController::class, 'search']);
Route::get('/products/top-selling', [ProductController::class, 'topSelling']);
Route::get('/products/{id}', [ProductController::class, 'show'])->whereNumber('id');
Route::get('/coupons', [CouponController::class, 'index']);
Route::get('/coupons/{id}', [CouponController::class, 'show']);