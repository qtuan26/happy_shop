import React from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import Filter from '../filters/Filter'



const Product = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/')[1]; // nike, adidas, sport, pickleball,...

  return (
    <div className="flex gap-6 container mx-auto px-4 py-6">
      {/* Cột trái: Filter */}
      <div className="w-1/6">
        <Filter category={category}/>
      </div>

      {/* Cột phải: danh sách sản phẩm */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default Product
