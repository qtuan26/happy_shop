import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Power } from 'lucide-react';
import AdminApiService from '../../service/admin-api';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0
  });

  useEffect(() => {
    fetchCoupons();
  }, [pagination.current_page, search]);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        search
      };
      const data = await AdminApiService.getCoupons(params);
      setCoupons(data.data);
      setPagination({
        current_page: data.current_page,
        per_page: data.per_page,
        total: data.total
      });
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await AdminApiService.toggleCouponActive(id);
      fetchCoupons();
    } catch (error) {
      console.error('Error toggling coupon:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa coupon này?')) return;
    
    try {
      await AdminApiService.deleteCoupon(id);
      fetchCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
      alert('Không thể xóa coupon này');
    }
  };

  const totalPages = Math.ceil(pagination.total / pagination.per_page);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý mã giảm giá</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Thêm coupon
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm mã giảm giá..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          coupons.map((coupon) => (
            <div key={coupon.coupon_id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Coupon Image */}
              <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600">
                <img 
                  src={coupon.url_image || coupon.public_url_image} 
                  alt={coupon.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    coupon.is_active 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {coupon.is_active ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                  </span>
                </div>
              </div>

              {/* Coupon Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{coupon.title || coupon.coupon_code}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{coupon.description}</p>

                {/* Coupon Code */}
                <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-3 mb-3">
                  <p className="text-xs text-gray-600 mb-1">Mã giảm giá</p>
                  <p className="text-xl font-bold text-blue-600">{coupon.coupon_code}</p>
                </div>

                {/* Discount Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Giảm:</span>
                    <span className="font-semibold">
                      {coupon.discount_type === 'percentage' 
                        ? `${coupon.discount_value}%` 
                        : `${Number(coupon.discount_value).toLocaleString('vi-VN')} ₫`}
                    </span>
                  </div>
                  {coupon.max_discount_amount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Giảm tối đa:</span>
                      <span className="font-semibold">
                        {Number(coupon.max_discount_amount).toLocaleString('vi-VN')} ₫
                      </span>
                    </div>
                  )}
                  {coupon.min_purchase_amount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Đơn tối thiểu:</span>
                      <span className="font-semibold">
                        {Number(coupon.min_purchase_amount).toLocaleString('vi-VN')} ₫
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hạn sử dụng:</span>
                    <span className="font-semibold">
                      {new Date(coupon.end_date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t">
                  <button
                    onClick={() => handleToggleActive(coupon.coupon_id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg ${
                      coupon.is_active 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    <Power size={16} />
                    {coupon.is_active ? 'Tắt' : 'Bật'}
                  </button>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.coupon_id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPagination({...pagination, current_page: pagination.current_page - 1})}
            disabled={pagination.current_page === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Trước
          </button>
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={i}
                onClick={() => setPagination({...pagination, current_page: pageNum})}
                className={`px-4 py-2 border rounded-lg ${
                  pagination.current_page === pageNum 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setPagination({...pagination, current_page: pagination.current_page + 1})}
            disabled={pagination.current_page === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;