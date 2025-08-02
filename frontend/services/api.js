import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (resetToken, password) => api.put(`/auth/reset-password/${resetToken}`, { password }),
  logout: () => api.post('/auth/logout'),
};

// Product API
export const productAPI = {
  getProducts: (params = {}) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  getFeaturedProducts: (limit = 8) => api.get('/products/featured', { params: { limit } }),
  searchProducts: (query) => api.get('/products/search', { params: { q: query } }),
  getCategories: () => api.get('/products/categories'),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getSellerProducts: (params = {}) => api.get('/products/seller/my-products', { params }),
};

// Order API
export const orderAPI = {
  getOrders: (params = {}) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  createOrder: (orderData) => api.post('/orders', orderData),
  updateOrderStatus: (id, statusData) => api.put(`/orders/${id}/status`, statusData),
  cancelOrder: (id, reason) => api.put(`/orders/${id}/cancel`, { reason }),
  getOrderStats: () => api.get('/orders/stats'),
};

// Review API
export const reviewAPI = {
  getReviews: (params = {}) => api.get('/reviews', { params }),
  createReview: (reviewData) => api.post('/reviews', reviewData),
  updateReview: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
  markHelpful: (id, isHelpful) => api.post(`/reviews/${id}/helpful`, { isHelpful }),
  reportReview: (id, reason) => api.post(`/reviews/${id}/report`, { reason }),
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId) => api.post('/wishlist', { productId }),
  removeFromWishlist: (productId) => api.delete(`/wishlist/${productId}`),
  clearWishlist: () => api.delete('/wishlist'),
  checkWishlist: (productId) => api.get(`/wishlist/check/${productId}`),
  getWishlistCount: () => api.get('/wishlist/count'),
};

// Category API
export const categoryAPI = {
  getCategories: () => api.get('/products/categories'),
};

// User API
export const userAPI = {
  getUsers: (params = {}) => api.get('/users', { params }),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  approveSeller: (id, approved) => api.put(`/users/${id}/approve-seller`, { approved }),
  getUserStats: () => api.get('/users/stats'),
};

export default api; 