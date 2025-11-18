import React from 'react'
import { ShoppingCart } from 'lucide-react'

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Hero Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sport Shoes Banner */}
        <div className="relative bg-linear-to-br from-indigo-900 via-indigo-800 to-indigo-900 rounded-lg overflow-hidden p-8 flex flex-col justify-between min-h-[400px]">
          <div className="absolute top-8 left-8 w-32 h-32 bg-cyan-400 rounded-full opacity-20"></div>
          <div className="absolute bottom-8 left-4 w-8 h-8 bg-cyan-400 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 right-8 grid grid-cols-3 gap-1 opacity-20">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-sm"></div>
            ))}
          </div>
          
          <div className="relative z-10">
            <div className="bg-cyan-400 rounded-full w-32 h-32 flex items-center justify-center mb-6">
              <div className="text-center">
                <p className="text-white text-xs font-medium">Get discount up to</p>
                <p className="text-white text-5xl font-bold">50<span className="text-2xl">%</span></p>
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=200&fit=crop" 
              alt="Sport Shoes" 
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-white text-3xl font-bold mb-2">NEW ARRIVAL</h3>
            <h2 className="text-white text-4xl font-bold">SPORT SHOES</h2>
          </div>
        </div>

        {/* Main Sale Banner */}
        <div className="relative bg-linear-to-br from-blue-600 via-cyan-500 to-blue-500 rounded-lg overflow-hidden p-8 flex flex-col justify-center items-center text-center min-h-[400px]">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 opacity-30 transform rotate-45"></div>
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-200 border-l-transparent border-b-200 border-b-white opacity-10"></div>
          </div>
          
          <div className="relative z-10 w-full">
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&h=80&fit=crop" 
                alt="MyShoes Logo" 
                className="h-16 mx-auto mb-2 filter brightness-0 invert"
              />
              <p className="text-white text-lg font-medium">Giày chính hãng! 🇻🇳</p>
            </div>
            
            <div className="flex justify-center gap-8 mb-8">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=40&fit=crop" alt="Nike" className="h-12 object-contain filter brightness-0 invert" />
              <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=80&h=40&fit=crop" alt="Adidas" className="h-12 object-contain filter brightness-0 invert" />
              <img src="https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=80&h=40&fit=crop" alt="Lacoste" className="h-12 object-contain filter brightness-0 invert" />
              <img src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=80&h=40&fit=crop" alt="Puma" className="h-12 object-contain filter brightness-0 invert" />
            </div>
            
            <h1 className="text-white text-8xl font-bold mb-4">SALE</h1>
            <p className="text-white text-3xl font-semibold mb-8">UP TO OFF 50%</p>
            
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-2xl font-bold rounded-md transition-colors">
              MUA NGAY
            </button>
          </div>
        </div>

        {/* Product Banner */}
        <div className="relative bg-linear-to-br from-indigo-900 via-indigo-800 to-blue-900 rounded-lg overflow-hidden p-8 flex flex-col justify-center items-center min-h-[400px]">
          <div className="absolute top-8 left-8 w-24 h-24 border-4 border-cyan-400 opacity-20 transform rotate-45"></div>
          <div className="absolute bottom-8 right-8 w-32 h-32 bg-blue-400 opacity-10 rounded-full"></div>
          
          <div className="relative z-10 text-center">
            <img 
              src="https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&h=300&fit=crop" 
              alt="Product" 
              className="w-full h-64 object-contain mb-6"
            />
            <div className="absolute top-4 right-4 bg-yellow-400 text-indigo-900 px-4 py-2 rounded-full text-sm font-bold">
              PREMIUM QUALITY
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sản Phẩm Nổi Bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative">
                <img 
                  src={"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"} 
                  alt={`Product ${item}`}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  -30%
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Nike Air Max {item}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-500 font-bold">1.500.000₫</p>
                    <p className="text-gray-400 text-xs line-through">2.000.000₫</p>
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
  
  )
}

export default Home
