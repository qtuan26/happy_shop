import React, { useState,useEffect } from 'react';
import { ShoppingCart, Heart, Share2, Star, Truck, ShieldCheck, RotateCcw, ArrowLeft, Plus, Minus, Check } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams(); // 👈 lấy id từ URL
  const [products, setProducts] = useState(null);

  useEffect(() => {
    // sau này sẽ là fetch(`/api/products/${id}`)
    // tạm thời mock data:
    const mockProduct = {
    id: id,
    name: 'Nike Air Max 270 React',
    brand: 'Nike',
    category: 'Giày Nike',
    price: 2500000,
    originalPrice: 3500000,
    discount: 29,
    rating: 4.8,
    reviewCount: 156,
    soldCount: 523,
    inStock: true,
    stockCount: 45,
    sku: 'NK-AM270-BLK-42',
    description: 'Nike Air Max 270 React kết hợp thiết kế iconic của Air Max với công nghệ đệm React tiên tiến, mang đến sự thoải mái tối đa cho cả ngày dài vận động. Thiết kế hiện đại, trẻ trung phù hợp với mọi phong cách.',
    features: [
      'Đệm khí Air Max 270 độc quyền mang lại cảm giác êm ái',
      'Công nghệ React Foam giảm ch động hiệu quả',
      'Upper mesh thoáng khí, nhẹ nhàng',
      'Đế ngoài cao su bền bỉ, chống trơn trượt',
      'Thiết kế phù hợp cho cả tập luyện và đi hàng ngày'
    ],
    specifications: {
      'Chất liệu upper': 'Mesh, Synthetic',
      'Chất liệu đế': 'Cao su, EVA',
      'Công nghệ': 'Air Max 270, React',
      'Trọng lượng': '350g (size 42)',
      'Xuất xứ': 'Vietnam',
      'Bảo hành': '6 tháng'
    },
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Đen/Trắng', code: '#000000', hex: '#000000' },
      { name: 'Xanh Navy', code: '#1e3a8a', hex: '#1e3a8a' },
      { name: 'Đỏ/Trắng', code: '#dc2626', hex: '#dc2626' },
      { name: 'Xám/Cam', code: '#6b7280', hex: '#6b7280' }
    ],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop'
    ]
    };
    setProducts(mockProduct);
  }, [id]);

  // Hardcoded product data - easy to replace with database data later
  

  // Related products
  const relatedProducts = [
    { id: 2, name: 'Nike Air Force 1', price: 2200000, originalPrice: 2800000, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', rating: 4.7 },
    { id: 3, name: 'Nike React Infinity', price: 2800000, originalPrice: 3500000, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop', rating: 4.9 },
    { id: 4, name: 'Nike Zoom Pegasus', price: 2300000, originalPrice: 3000000, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=300&fit=crop', rating: 4.6 },
    { id: 5, name: 'Nike Air Zoom', price: 2600000, originalPrice: 3200000, image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop', rating: 4.8 }
  ];

  const handleQuantityChange = (type) => {
    if (type === 'increase' && quantity < products.stockCount) {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Vui lòng chọn size!');
      return;
    }
    if (!selectedColor) {
      alert('Vui lòng chọn màu!');
      return;
    }
    console.log('Add to cart:', {
      product: products.id,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
    alert('Đã thêm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Vui lòng chọn size!');
      return;
    }
    if (!selectedColor) {
      alert('Vui lòng chọn màu!');
      return;
    }
    console.log('Buy now:', {
      product: products.id,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
  };
  if(!products) return <p className="text-center text-gray-500">Đang tải...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - simplified for demo */}
      <div className="bg-linear-to-r from-blue-800 to-blue-900 text-white py-4">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center hover:text-blue-200 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Quay lại</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-600 cursor-pointer">{products.category}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{products.name}</span>
        </div>

        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left - Images */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <div className="relative mb-4 group">
                <img 
                  src={products.images[selectedImage]} 
                  alt={products.name}
                  className="w-full h-[500px] object-cover rounded-xl"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full shadow-lg transition-all ${
                      isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50'
                    }`}
                  >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
                {products.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                    -{products.discount}%
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {products.images.map((image, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-blue-600 shadow-md' : 'border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${products.name} ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <Truck className="mx-auto mb-2 text-blue-600" size={28} />
                <p className="text-xs font-semibold text-gray-800">Miễn phí vận chuyển</p>
                <p className="text-xs text-gray-500">Đơn từ 500k</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <ShieldCheck className="mx-auto mb-2 text-blue-600" size={28} />
                <p className="text-xs font-semibold text-gray-800">Chính hãng 100%</p>
                <p className="text-xs text-gray-500">Cam kết hoàn tiền</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <RotateCcw className="mx-auto mb-2 text-blue-600" size={28} />
                <p className="text-xs font-semibold text-gray-800">Đổi trả 30 ngày</p>
                <p className="text-xs text-gray-500">Miễn phí đổi size</p>
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Brand */}
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {products.brand}
                </span>
                {products.inStock && (
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full ml-2">
                    Còn hàng
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{products.name}</h1>

              {/* Rating & Stats */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={i < Math.floor(products.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-800">{products.rating}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">{products.reviewCount} đánh giá</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">{products.soldCount} đã bán</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold text-red-600">
                    {products.price.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="text-2xl text-gray-400 line-through">
                    {products.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                </div>
                <p className="text-sm text-gray-600">Giá đã bao gồm VAT</p>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Màu sắc: {selectedColor && <span className="text-blue-600">{selectedColor}</span>}
                </label>
                <div className="flex gap-3">
                  {products.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color.name 
                          ? 'border-blue-600 shadow-lg scale-110' 
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <Check className="absolute inset-0 m-auto text-white" size={20} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-800">
                    Kích thước: {selectedSize && <span className="text-blue-600">{selectedSize}</span>}
                  </label>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Hướng dẫn chọn size
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {products.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border-2 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-blue-400 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Số lượng: <span className="text-gray-600 font-normal">({products.stockCount} sản phẩm có sẵn)</span>
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    className="w-10 h-10 border-2 border-gray-300 rounded-l-lg hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} className="mx-auto text-gray-600" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-16 h-10 border-t-2 border-b-2 border-gray-300 text-center font-semibold"
                  />
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    className="w-10 h-10 border-2 border-gray-300 rounded-r-lg hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} className="mx-auto text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  <ShoppingCart size={20} />
                  Thêm vào giỏ
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-linear-to-r from-blue-800 to-blue-900 text-white py-4 rounded-lg font-semibold hover:from-blue-900 hover:to-blue-800 transition-all shadow-lg"
                >
                  Mua ngay
                </button>
              </div>

              {/* SKU */}
              <div className="text-sm text-gray-600">
                <span className="font-semibold">SKU:</span> {products.sku}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="border-b mb-6">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-blue-600 text-blue-600 font-semibold">
                Mô tả sản phẩm
              </button>
              <button className="pb-4 text-gray-600 hover:text-blue-600 font-semibold">
                Đặc điểm nổi bật
              </button>
              <button className="pb-4 text-gray-600 hover:text-blue-600 font-semibold">
                Thông số kỹ thuật
              </button>
              <button className="pb-4 text-gray-600 hover:text-blue-600 font-semibold">
                Đánh giá ({products.reviewCount})
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Mô tả sản phẩm</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{products.description}</p>
            
            
          </div>

         
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-500 font-bold text-lg">{item.price.toLocaleString('vi-VN')}₫</p>
                      <p className="text-gray-400 text-xs line-through">{item.originalPrice.toLocaleString('vi-VN')}₫</p>
                    </div>
                    <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;