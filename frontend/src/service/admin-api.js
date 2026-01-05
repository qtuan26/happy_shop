import axiosInstance from './axiosConfig';

class AdminApiService {
  
  

  // ===== CUSTOMERS =====
  static async getCustomers(params = {}) {
    const response = await axiosInstance.get('/admin/customers', { params });
    return response.data.data;
  }

  static async getCustomerDetail(customerId) {
    const response = await axiosInstance.get(`/admin/customers/${customerId}`);
    return response.data.data;
  }

  static async createCustomer(customerData) {
    const response = await axiosInstance.post('/admin/customers', customerData);
    return response.data;
  }

  static async updateCustomer(customerId, customerData) {
    const response = await axiosInstance.put(`/admin/customers/${customerId}`, customerData);
    return response.data;
  }

  static async deleteCustomer(customerId) {
    const response = await axiosInstance.delete(`/admin/customers/${customerId}`);
    return response.data;
  }

  static async bulkDeleteCustomers(customerIds) {
    const response = await axiosInstance.post('/admin/customers/bulk-delete', {
      customer_ids: customerIds
    });
    return response.data;
  }

  static async getCustomerStatistics() {
    const response = await axiosInstance.get('/admin/customers/statistics');
    return response.data.data;
  }
  

    // ===== ORDERS =====
    static async getOrders(params = {}) {
        const response = await axiosInstance.get('/admin/orders', { params });
        return response.data.data;
    }

    static async getOrderDetail(orderId) {
        const response = await axiosInstance.get(`/admin/orders/${orderId}`);
        return response.data.data;
    }

    static async updateOrderStatus(orderId, status) {
        const response = await axiosInstance.put(`/admin/orders/${orderId}/status`, { status });
        return response.data;
    }

    static async cancelOrder(orderId) {
        const response = await axiosInstance.put(`/admin/orders/${orderId}/cancel`);
        return response.data;
    }
}

export default AdminApiService;