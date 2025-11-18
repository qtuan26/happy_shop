import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ProductList = ({ products }) => {
  const navigate = useNavigate();
  const { brand } = useParams();

  const handleClick = (id) => {
    navigate(`/${brand}/${id}`);
  };

  return (
    <div className="mt-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleClick(product.id)}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.discount && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  -{product.discount}%
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-500 font-bold">{product.price}₫</p>
                  {product.oldPrice && (
                    <p className="text-gray-400 text-xs line-through">
                      {product.oldPrice}₫
                    </p>
                  )}
                </div>
                <button
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
