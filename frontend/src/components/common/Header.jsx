import {React,useState} from 'react'
import { Search, ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const Header = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [cartCount] = useState(0);
    const navigate = useNavigate();
    
    const categories = [
      { id: 'nike', name: 'Giày Nike', badge: 'New', color: 'bg-green-500', path: '/nike' },
      { id: 'adidas', name: 'Giày Adidas', badge: 'Sale', color: 'bg-red-500', path: '/adidas' },
      { id: 'newbalance', name: 'Giày New Balance', badge: 'Sale', color: 'bg-red-500', path: '/newbalance' },
      { id: 'puma', name: 'Giày Puma', badge: 'Sale', color: 'bg-red-500', path: '/puma' },
      { id: 'clarks', name: 'Giày Clarks', badge: 'Sale', color: 'bg-red-500', path: '/clarks' },
      { id: 'sport ', name: 'Giày Thể Thao ', badge: 'New', color: 'bg-green-500', path: '/sport' },
      { id: 'pickleball ', name: 'Giày Pickleball ', badge: 'New', color: 'bg-green-500', path: '/pickleball' },


    ];
    const handleCategoryClick = (category) => {
      setCurrentPage(category.id);
      navigate(category.path); // điều hướng tới trang tương ứng
    };
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-linear-to-r from-blue-800 to-blue-900 text-white">
        {/* Top Bar */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/introduction')}
            >
              <h1 className="text-3xl font-bold">happyshop</h1>
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">🇻🇳</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-2 bg-white rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-300"
              onClick={() => navigate("/login")}>
                <User size={20} />
                <div className="text-sm">
                  <p>Tài khoản</p>
                  <p className="font-semibold">Đăng nhập/ Đăng ký</p>
                </div>
              </div>
              <div className="relative cursor-pointer hover:text-blue-300"
              onClick={() => navigate("/cart")}>
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-blue-900 border-t border-blue-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              
              {/* Left buttons */}
              <div className="flex items-center space-x-1">
                <button className="px-4 py-3 hover:bg-blue-800 transition-colors flex items-center space-x-2" 
                              onClick={() => navigate("/")}>
                
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-white font-bold">SALE</span>
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className={`relative px-8 py-3 hover:bg-blue-800 transition-colors ${
                      currentPage === category.id ? 'bg-blue-800' : ''
                    }`}
                  >
                    <span className="text-white font-medium">{category.name}</span>

                    {category.badge && (
                      <span
                        className={`absolute -top-1 -right-1 ${category.color} text-white text-xs px-2 py-0.5 rounded`}
                      >
                        {category.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* RIGHT SIDE BUTTON */}
              
              <button className="ml-auto px-4 py-3 hover:bg-blue-800 transition-colors flex items-center space-x-2 " 
              onClick={() => navigate("/support")}>
                
                <span className="text-white font-bold">Hỗ trợ / Tư vấn</span>
                
              </button>
            </div>
          </div>
        </nav>

        
      </header>
      
    </div>
    )
}

export default Header
