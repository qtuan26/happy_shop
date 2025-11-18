import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";

const ProductPage = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // const brandInfo = {
  //   nike: { name: "Giày Nike", color: "from-blue-600 to-cyan-500" },
  //   adidas: { name: "Giày Adidas", color: "from-green-600 to-emerald-400" },
  //   lacoste: { name: "Giày Lacoste", color: "from-lime-600 to-teal-400" },
  //   puma: { name: "Giày Puma", color: "from-pink-600 to-rose-400" },
  // };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: "Sản phẩm A",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
          price: "1.500.000",
          oldPrice: "2.000.000",
          discount: 25,
        },
        {
          id: 2,
          name: "Sản phẩm B",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
          price: "1.700.000",
          oldPrice: "2.300.000",
          discount: 26,
        },
      ]);
      setLoading(false);
    }, 600);
  
  }, [brand]);

 

  return (
    <div className="container mx-auto px-4">
      

      {loading ? (
        <p className="text-gray-500 text-center">Đang tải sản phẩm...</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default ProductPage;
