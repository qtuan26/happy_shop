import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Truck, CreditCard, Shield, ChevronRight } from 'lucide-react';

const ShoppingCart = () => {
  // Hardcoded cart data - easy to replace with database data later
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productId: 1,
      name: 'Nike Air Max 270 React',
      brand: 'Nike',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      price: 2500000,
      originalPrice: 3500000,
      size: '42',
      color: 'Đen/Trắng',
      quantity: 1,
      inStock: true,
      maxQuantity: 10
    },
    {
      id: 2,
      productId: 2,
      name: 'Nike Air Force 1 Low White',
      brand: 'Nike',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
      price: 2200000,
      originalPrice: 2800000,
      size: '41',
      color: 'Trắng',
      quantity: 2,
      inStock: true,
      maxQuantity: 15
    },
    {
      id: 3,
      productId: 3,
      name: 'Adidas Ultraboost 21',
      brand: 'Adidas',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop',
      price: 2800000,
      originalPrice: 3500000,
      size: '43',
      color: 'Xanh Navy',
      quantity: 1,
      inStock: true,
      maxQuantity: 8
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Available coupons - hardcoded for demo
  const availableCoupons = [
    { code: 'SUMMER50', discount: 50000, minOrder: 500000, description: 'Giảm 50k cho đơn từ 500k' },
    { code: 'NEWUSER100', discount: 100000, minOrder: 1000000, description: 'Giảm 100k cho đơn từ 1tr' },
    { code: 'FREESHIP', discount: 30000, minOrder: 0, description: 'Miễn phí ship toàn quốc' }
  ];

  const updateQuantity = (id, type) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        let newQuantity = item.quantity;
        if (type === 'increase' && item.quantity < item.maxQuantity) {
          newQuantity = item.quantity + 1;
        } else if (type === 'decrease' && item.quantity > 1) {
          newQuantity = item.quantity - 1;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      if (calculateSubtotal() >= coupon.minOrder) {
        setAppliedCoupon(coupon);
        alert(`Áp dụng mã giảm giá thành công! Giảm ${coupon.discount.toLocaleString('vi-VN')}₫`);
      } else {
        alert(`Đơn hàng tối thiểu ${coupon.minOrder.toLocaleString('vi-VN')}₫`);
      }
    } else {
      alert('Mã giảm giá không hợp lệ!');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  };

  const shippingFee = calculateSubtotal() >= 500000 ? 0 : 30000;
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = calculateSubtotal() + shippingFee - discount;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    console.log('Checkout:', {
      items: cartItems,
      subtotal: calculateSubtotal(),
      shipping: shippingFee,
      discount,
      total,
      coupon: appliedCoupon
    });
    // Redirect to checkout page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-800 to-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center hover:text-blue-200 transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Tiếp tục mua sắm</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Giỏ hàng của bạn</h1>
              <p className="text-blue-200">
                {cartItems.length} sản phẩm
              </p>
            </div>
            <div className="hidden md:block">
              <ShoppingBag size={64} className="opacity-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
            <button 
              onClick={() => window.history.back()}
              className="bg-linear-to-r from-blue-800 to-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-900 hover:to-blue-800 transition-all"
            >
              Khám phá sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Promotion Banner */}
              <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-lg p-4 text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Truck size={24} className="mr-3" />
                  <div>
                    <p className="font-semibold">Miễn phí vận chuyển</p>
                    <p className="text-sm text-blue-100">
                      {calculateSubtotal() >= 500000 
                        ? 'Bạn được miễn phí ship!' 
                        : `Mua thêm ${(500000 - calculateSubtotal()).toLocaleString('vi-VN')}₫ để được freeship`}
                    </p>
                  </div>
                </div>
                {calculateSubtotal() < 500000 && (
                  <div className="text-right">
                    <div className="text-sm">{Math.round((calculateSubtotal() / 500000) * 100)}%</div>
                    <div className="w-24 bg-blue-400 rounded-full h-2 mt-1">
                      <div 
                        className="bg-white h-2 rounded-full transition-all"
                        style={{ width: `${(calculateSubtotal() / 500000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b bg-gray-50">
                  <h2 className="text-xl font-bold text-gray-800">Sản phẩm trong giỏ</h2>
                </div>
                
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-28 h-28 shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <div className="flex justify-between mb-2">
                            <div>
                              <span className="text-xs text-blue-600 font-semibold">{item.brand}</span>
                              <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>

                          <div className="flex gap-4 text-sm text-gray-600 mb-3">
                            <span>Size: <strong>{item.size}</strong></span>
                            <span>Màu: <strong>{item.color}</strong></span>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Control */}
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, 'decrease')}
                                className="w-8 h-8 border-2 border-gray-300 rounded-l-lg hover:bg-gray-100 transition-colors"
                              >
                                <Minus size={14} className="mx-auto text-gray-600" />
                              </button>
                              <input
                                type="text"
                                value={item.quantity}
                                readOnly
                                className="w-12 h-8 border-t-2 border-b-2 border-gray-300 text-center font-semibold"
                              />
                              <button
                                onClick={() => updateQuantity(item.id, 'increase')}
                                className="w-8 h-8 border-2 border-gray-300 rounded-r-lg hover:bg-gray-100 transition-colors"
                              >
                                <Plus size={14} className="mx-auto text-gray-600" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="text-xl font-bold text-red-600">
                                {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                              </p>
                              <p className="text-sm text-gray-400 line-through">
                                {(item.originalPrice * item.quantity).toLocaleString('vi-VN')}₫
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Coupons */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Tag className="mr-2 text-blue-600" size={20} />
                  Mã giảm giá khả dụng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {availableCoupons.map((coupon) => (
                    <button
                      key={coupon.code}
                      onClick={() => {
                        setCouponCode(coupon.code);
                        setAppliedCoupon(coupon);
                      }}
                      className={`border-2 rounded-lg p-3 text-left transition-all ${
                        appliedCoupon?.code === coupon.code
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-dashed border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <div className="font-bold text-blue-600 text-sm mb-1">{coupon.code}</div>
                      <div className="text-xs text-gray-600">{coupon.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Tóm tắt đơn hàng</h2>

                {/* Coupon Input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mã giảm giá
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-green-50 border-2 border-green-500 rounded-lg p-3">
                      <div>
                        <p className="font-bold text-green-700">{appliedCoupon.code}</p>
                        <p className="text-xs text-green-600">-{appliedCoupon.discount.toLocaleString('vi-VN')}₫</p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Áp dụng
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-gray-700">
                    <span>Tạm tính</span>
                    <span className="font-semibold">{calculateSubtotal().toLocaleString('vi-VN')}₫</span>
                  </div>
                  
                  {calculateSavings() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Tiết kiệm</span>
                      <span className="font-semibold">-{calculateSavings().toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-700">
                    <span>Phí vận chuyển</span>
                    <span className="font-semibold">
                      {shippingFee === 0 ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        `${shippingFee.toLocaleString('vi-VN')}₫`
                      )}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá ({appliedCoupon.code})</span>
                      <span className="font-semibold">-{discount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6 text-xl">
                  <span className="font-bold text-gray-800">Tổng cộng</span>
                  <span className="font-bold text-red-600 text-2xl">{total.toLocaleString('vi-VN')}₫</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-linear-to-r from-blue-800 to-blue-900 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-900 hover:to-blue-800 transition-all shadow-lg flex items-center justify-center gap-2 mb-4"
                >
                  Thanh toán
                  <ChevronRight size={20} />
                </button>

                {/* Trust Badges */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="mr-2 text-green-500" size={18} />
                    <span>Thanh toán an toàn & bảo mật</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CreditCard className="mr-2 text-blue-500" size={18} />
                    <span>Hỗ trợ nhiều hình thức thanh toán</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="mr-2 text-orange-500" size={18} />
                    <span>Giao hàng nhanh chóng</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
                <h3 className="font-bold text-gray-800 mb-4">Phương thức thanh toán</h3>
                <div className="grid grid-cols-4 gap-3">
                  <div className="border rounded p-2 flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
                  </div>
                  <div className="border rounded p-2 flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                  </div>
                  <div className="border rounded p-2 flex items-center justify-center">
                    <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png" alt="MoMo" className="h-6" />
                  </div>
                  <div className="border rounded p-2 flex items-center justify-center text-xs font-bold text-gray-600">
                    COD
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;