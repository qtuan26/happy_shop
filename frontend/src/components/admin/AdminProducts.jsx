import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Power } from 'lucide-react';
import AdminApiService from '../../service/admin-api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category_id: '',
    brand_id: '',
    is_active: ''
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [pagination.current_page, search, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        search,
        ...filters
      };
      const data = await AdminApiService.getProducts(params);
      setProducts(data.data);
      setPagination({
        current_page: data.current_page,
        per_page: data.per_page,
        total: data.total
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await AdminApiService.toggleProductActive(id);
      fetchProducts();
    } catch (error) {
      console.error('Error toggling product:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    
    try {
      await AdminApiService.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Không thể xóa sản phẩm này');
    }
  };

  const totalPages = Math.ceil(pagination.total / pagination.per_page);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Thêm sản phẩm
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.is_active}
            onChange={(e) => setFilters({...filters, is_active: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="1">Đang bán</option>
            <option value="0">Ngừng bán</option>
          </select>

          <button
            onClick={() => {
              setSearch('');
              setFilters({ category_id: '', brand_id: '', is_active: '' });
              setPagination({ ...pagination, current_page: 1 });
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thương hiệu</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kho</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.product_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.url_image} 
                            alt={product.product_name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{product.product_name}</p>
                            <p className="text-sm text-gray-500">{product.color}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product.category?.category_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product.brand?.brand_name}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {Number(product.base_price).toLocaleString('vi-VN')} ₫
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product.inventory?.reduce((sum, inv) => sum + inv.quantity, 0) || 0}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.is_active ? 'Đang bán' : 'Ngừng bán'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleActive(product.product_id)}
                            className={`p-2 rounded-lg ${
                              product.is_active 
                                ? 'text-red-600 hover:bg-red-50' 
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={product.is_active ? 'Ngừng bán' : 'Bán lại'}
                          >
                            <Power size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Sửa"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.product_id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <p className="text-sm text-gray-600">
                  Hiển thị {(pagination.current_page - 1) * pagination.per_page + 1} - {Math.min(pagination.current_page * pagination.per_page, pagination.total)} / {pagination.total} sản phẩm
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPagination({...pagination, current_page: pagination.current_page - 1})}
                    disabled={pagination.current_page === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Trước
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPagination({...pagination, current_page: i + 1})}
                      className={`px-4 py-2 border rounded-lg ${
                        pagination.current_page === i + 1 
                          ? 'bg-blue-600 text-white' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPagination({...pagination, current_page: pagination.current_page + 1})}
                    disabled={pagination.current_page === totalPages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Sau
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;