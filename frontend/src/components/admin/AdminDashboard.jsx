import { useState, useEffect } from 'react';
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import AdminApiService from '../../service/admin-api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await AdminApiService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  const statCards = [
    {
      title: 'Tổng khách hàng',
      value: stats?.overview?.totalCustomers || 0,
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Tổng sản phẩm',
      value: stats?.overview?.totalProducts || 0,
      icon: Package,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Tổng đơn hàng',
      value: stats?.overview?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Tổng doanh thu',
      value: `${Number(stats?.overview?.totalRevenue || 0).toLocaleString('vi-VN')} ₫`,
      icon: DollarSign,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    shipped: 'Đã gửi hàng',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy'
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={stat.textColor} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today & This Month Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Hôm nay</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Đơn hàng:</span>
              <span className="font-semibold">{stats?.today?.orders || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Doanh thu:</span>
              <span className="font-semibold text-green-600">
                {Number(stats?.today?.revenue || 0).toLocaleString('vi-VN')} ₫
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Tháng này</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Đơn hàng:</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{stats?.thisMonth?.orders || 0}</span>
                {stats?.thisMonth?.orderGrowth !== undefined && (
                  <span className={`flex items-center text-sm ${
                    stats.thisMonth.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stats.thisMonth.orderGrowth >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {Math.abs(stats.thisMonth.orderGrowth).toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Doanh thu:</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">
                  {Number(stats?.thisMonth?.revenue || 0).toLocaleString('vi-VN')} ₫
                </span>
                {stats?.thisMonth?.revenueGrowth !== undefined && (
                  <span className={`flex items-center text-sm ${
                    stats.thisMonth.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stats.thisMonth.revenueGrowth >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {Math.abs(stats.thisMonth.revenueGrowth).toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders by Status & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Đơn hàng theo trạng thái</h3>
          <div className="space-y-3">
            {stats?.ordersByStatus?.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[item.status]}`}>
                  {statusLabels[item.status]}
                </span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Sản phẩm bán chạy</h3>
          <div className="space-y-3">
            {stats?.topProducts?.map((product, index) => (
              <div key={index} className="flex items-center gap-3">
                <img 
                  src={product.url_image} 
                  alt={product.product_name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm truncate">{product.product_name}</p>
                  <p className="text-xs text-gray-500">Đã bán: {product.total_sold}</p>
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {Number(product.total_revenue).toLocaleString('vi-VN')} ₫
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Doanh thu 7 ngày gần nhất</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {stats?.revenueChart?.map((item, index) => {
            const maxRevenue = Math.max(...stats.revenueChart.map(i => i.revenue));
            const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative group w-full">
                  <div 
                    className="bg-blue-500 rounded-t hover:bg-blue-600 transition-all cursor-pointer w-full"
                    style={{ height: `${height}%`, minHeight: item.revenue > 0 ? '20px' : '0px' }}
                  />
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {Number(item.revenue).toLocaleString('vi-VN')} ₫
                  </div>
                </div>
                <span className="text-xs text-gray-600">{item.date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;