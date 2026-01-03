import React, { useEffect, useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Truck,
  ChevronRight,
  Shield,
  CreditCard
} from 'lucide-react';
import { message } from 'antd';
import ApiService from '../../service/api';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== COUPON =====
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  // ================= FETCH CART =================
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getCart();
      setCartId(data.cart_id);

      const mappedItems = data.items.map(item => ({
        id: item.cart_item_id,
        productId: item.product_id,
        name: item.product_name,
        image: item.url_image,
        size: item.size,
        quantity: item.quantity,
        price: Number(item.price),
        subtotal: Number(item.subtotal)
      }));

      setCartItems(mappedItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await ApiService.updateCartItem(id, { quantity: newQuantity });

      setCartItems(prev =>
        prev.map(item =>
          item.id === id
            ? {
                ...item,
                quantity: newQuantity,
                subtotal: newQuantity * item.price
              }
            : item
        )
      );
    } catch (error) {
      console.error('Update quantity failed', error);
    }
  };

  // ================= REMOVE ITEM =================
  const removeItem = async (id) => {
    if (!window.confirm('Xóa sản phẩm này khỏi giỏ hàng?')) return;

    try {
      await ApiService.removeCartItem(id);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Remove item failed', error);
    }
  };

  // ================= CALCULATE =================
  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const shippingFee = calculateSubtotal() >= 500 ? 0 : 30;
  const total = calculateSubtotal() + shippingFee - discount;

  // ================= APPLY COUPON (MOCK) =================
  const applyCoupon = () => {
    setCouponError('');
    setDiscount(0);

    if (!couponCode) {
      setCouponError('Vui lòng nhập mã giảm giá');
      return;
    }

    if (couponCode === 'SALE10') {
      setDiscount(calculateSubtotal() * 0.1);
    } else if (couponCode === 'SALE50') {
      setDiscount(50);
    } else if (couponCode === 'FREESHIP') {
      setDiscount(shippingFee);
    } else {
      setCouponError('Mã giảm giá không hợp lệ');
    }
  };

  // ================= UI =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center mb-4 hover:text-blue-200"
          >
            <ArrowLeft size={18} className="mr-2" />
            Tiếp tục mua sắm
          </button>

          <h1 className="text-3xl font-bold">Giỏ hàng</h1>
          <p className="text-blue-200">{cartItems.length} sản phẩm</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <ShoppingBag size={60} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">Giỏ hàng của bạn đang trống</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-4 flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500">Size: {item.size}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="border px-2 py-1"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="px-3 font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="border px-2 py-1"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="font-bold text-red-600">
                        ${item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="bg-white rounded-xl shadow p-6 h-fit">
              {/* COUPON */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">
                  Mã giảm giá
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Nhập mã giảm giá"
                    className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
                  />

                  <button
                    onClick={applyCoupon}
                    className="bg-gray-800 text-white px-4 rounded hover:bg-gray-700"
                  >
                    Áp dụng
                  </button>
                </div>

                {couponError && (
                  <p className="text-red-500 text-sm mt-2">
                    {couponError}
                  </p>
                )}

                {discount > 0 && (
                  <p className="text-green-600 text-sm mt-2">
                    Đã áp dụng mã, giảm ${discount.toFixed(2)}
                  </p>
                )}
              </div>

              <h2 className="text-xl font-bold mb-4">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Vận chuyển</span>
                  <span>
                    {shippingFee === 0 ? 'Miễn phí' : `$${shippingFee}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Tổng cộng</span>
                <span className="text-red-600">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                Thanh toán
                <ChevronRight size={18} />
              </button>

              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield size={16} className="mr-2 text-green-500" />
                  Thanh toán an toàn
                </div>
                <div className="flex items-center">
                  <CreditCard size={16} className="mr-2 text-blue-500" />
                  Hỗ trợ nhiều phương thức
                </div>
                <div className="flex items-center">
                  <Truck size={16} className="mr-2 text-orange-500" />
                  Giao hàng nhanh
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
