// src/api/api.js
import axiosInstance from './axiosConfig';
import axios from 'axios';

export default class ApiService {
  // ===== AUTH =====

  static async login(loginDetails) {
    try {
      const response = await axiosInstance.post('/login', loginDetails);

      // Backend bạn trả: { message, user, token }
      return response.data;
    } catch (error) {
      throw error.response?.message || 'Đăng nhập thất bại';
    }
  }

  static async register(registerDetails) {
    try {
      const response = await axios.post('/register', registerDetails);
      return response.message;
    } catch (error) {
      throw error.response?.message || 'Đăng ký thất bại';
    }
  }

  static async getMe() {
    try {
      const response = await axiosInstance.get('/me');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Không lấy được thông tin user';
    }
  }

  static async logout() {
    try {
      await axiosInstance.post('/logout');
      sessionStorage.clear();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      sessionStorage.clear();
    }
  }

  // ===== CUSTOMER =====
  // Lấy thông tin cá nhân
  static async getCustomerProfile() {
    try {
      const response = await axiosInstance.get('/customer/profile');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Không lấy được thông tin cá nhân';
    }
  }

  // Cập nhật thông tin cá nhân
  static async updateCustomerProfile(profileData) {
    try {
      const response = await axiosInstance.put(
        '/customer/profile',
        profileData
      );
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Cập nhật thông tin thất bại';
    }
  }



  // ===== CATEGORY =====
  static async getCategories() {
    try {
      const response = await axiosInstance.get('/categories');
      return response.data.data; // lấy mảng categories
    } catch (error) {
      throw error.response?.data?.message || 'Không lấy được categories';
    }
  }
  static async getProductsByCategory(categoryId) {
    try {
      const response = await axiosInstance.get(`/categories/${categoryId}/products`);
      return response.data.products; // lấy mảng products
    } catch (error) {
      throw error.response?.data?.message || 'Không lấy được products của category';
    }
  }


  // ===== PRODUCT =====

  static async getProductDetail(productId) {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data.product;
    } catch (error) {
      throw error.response?.data?.message || 'Không lấy được chi tiết sản phẩm';
    }
  }
  // filter products
  static async filterProducts(categoryId, filters) {
    try {
      const params = {};

      if (filters.minPrice) {
        params.min_price = filters.minPrice;
      }

      if (filters.gender.length > 0) {
        params.gender = filters.gender; // gender[]=nam&gender[]=nu
      }

      if (filters.sizes.length > 0) {
        params.sizes = filters.sizes; // sizes[]=40&sizes[]=42
      }

      const response = await axiosInstance.get(
        `/categories/${categoryId}/products/filter`,
        { params }
      );

      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Không lọc được sản phẩm';
    }
  }
  // search products
  static async searchProducts(keyword) {
    try {
      const response = await axiosInstance.get('/products/search', {
        params: { q: keyword }
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Không tìm được sản phẩm';
    }
  }

  // Top 6 sản phẩm bán chạy
  static async getTopSellingProducts() {
    try {
      const response = await axiosInstance.get('/products/top-selling');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Không lấy được sản phẩm bán chạy';
    }
  }

  // ===== CART =====
  // src/api/api.js
  static async getCart() {
    try {
      const response = await axiosInstance.get('/cart');
      return response.data; // { cart_id, items }
    } catch (error) {
      throw error.response?.data?.message || 'Không lấy được giỏ hàng';
    }
  }
  
  static async updateCartItem(id, data) {
    return axiosInstance.put(`/cart/item/${id}`, data);
  }

  static async removeCartItem(id) {
    return axiosInstance.delete(`/cart/item/${id}`);
  } 
  //api thêm vào giỏ hàng
  static async addToCart(data) {
    try {
      const response = await axiosInstance.post('/cart/add', data);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Không thêm được vào giỏ hàng';
    }
  }



}




