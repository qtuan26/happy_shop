import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const Filter = ({ category }) => {
  const [filters, setFilters] = useState({
    gender: [],
    priceRange: [890000, 3650000],
    sizes: [],
    brands: []
  });

  // Accordion state
  const [openSection, setOpenSection] = useState({
    gender: true,
    price: true,
    size: true,
    brand: true
  });

  const toggleSection = (section) => {
    setOpenSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const brands = [
    { id: 'nike', name: 'Nike' },
    { id: 'adidas', name: 'Adidas' },
    { id: 'puma', name: 'Puma' },
    { id: 'newbalance', name: 'New Balance' },
    { id: 'lacoste', name: 'Lacoste' }
  ];

  // Brand logic theo category
  const allowedBrands =
    category === 'sport' || category === 'pickleball'
      ? brands
      : brands.filter(b => b.id === category);

  const showBrandFilter = allowedBrands.length > 1;

  const sizes = [36, 37, 38, 39, 40, 41, 42, 43];

  // Handlers
  const handleGenderChange = (gender) => {
    setFilters(prev => ({
      ...prev,
      gender: prev.gender.includes(gender)
        ? prev.gender.filter(g => g !== gender)
        : [...prev.gender, gender]
    }));
  };

  const handleSizeChange = (size) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleBrandChange = (brandId) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brandId)
        ? prev.brands.filter(b => b !== brandId)
        : [...prev.brands, brandId]
    }));
  };

  const clearFilters = () => {
    setFilters({
      gender: [],
      priceRange: [890000, 3650000],
      sizes: [],
      brands: []
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <h3 className="font-bold text-gray-800">TÌM KIẾM THEO</h3>
        <button 
          onClick={clearFilters}
          className="flex items-center text-blue-600 text-sm hover:text-blue-700"
        >
          <X size={16} className="mr-1" />
          Xóa
        </button>
      </div>

      {/* Gender Filter */}
      <div className="border-b pb-3">
        <button 
          className="w-full flex justify-between items-center text-gray-700 font-semibold uppercase text-sm"
          onClick={() => toggleSection('gender')}
        >
          Giới tính
          {openSection.gender ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSection.gender && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center cursor-pointer hover:text-blue-600">
              <input 
                type="checkbox"
                checked={filters.gender.includes('nam')}
                onChange={() => handleGenderChange('nam')}
                className="mr-2 w-4 h-4"
              />
              Giày Nam
            </label>
            <label className="flex items-center cursor-pointer hover:text-blue-600">
              <input 
                type="checkbox"
                checked={filters.gender.includes('nu')}
                onChange={() => handleGenderChange('nu')}
                className="mr-2 w-4 h-4"
              />
              Giày Nữ
            </label>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b pb-3">
        <button 
          className="w-full flex justify-between items-center text-gray-700 font-semibold uppercase text-sm"
          onClick={() => toggleSection('price')}
        >
          Giá
          {openSection.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSection.price && (
          <div className="mt-2 space-y-3">
            <input
              type="range"
              min="890000"
              max="3650000"
              value={filters.priceRange[0]}
              onChange={(e) =>
                setFilters(prev => ({
                  ...prev,
                  priceRange: [parseInt(e.target.value), prev.priceRange[1]]
                }))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm">
              <span>{filters.priceRange[0].toLocaleString()} ₫</span>
              <span>-</span>
              <span>{filters.priceRange[1].toLocaleString()} ₫</span>
            </div>
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="border-b pb-3">
        <button 
          className="w-full flex justify-between items-center text-gray-700 font-semibold uppercase text-sm"
          onClick={() => toggleSection('size')}
        >
          Size
          {openSection.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {openSection.size && (
          <div className="mt-2 grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
            {sizes.map(size => (
              <label key={size} className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className="hidden peer"
                />
                <div className="border border-gray-300 rounded px-3 py-2 text-center text-sm hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 transition">
                  {size}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      {showBrandFilter && (
        <div className="border-b pb-3">
          <button 
            className="w-full flex justify-between items-center text-gray-700 font-semibold uppercase text-sm"
            onClick={() => toggleSection('brand')}
          >
            Thương hiệu
            {openSection.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openSection.brand && (
            <div className="mt-2 space-y-2">
              {allowedBrands.map(brand => (
                <label key={brand.id} className="flex items-center cursor-pointer hover:text-blue-600">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand.id)}
                    onChange={() => handleBrandChange(brand.id)}
                    className="mr-2 w-4 h-4"
                  />
                  {brand.name}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Filter;
