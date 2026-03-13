import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://restaurant-ecommerce-cn1u.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    // Retry logic for network errors (Nigerian network issues)
    if (!error.response && error.config && error.config.retryCount < 3) {
      error.config.retryCount = error.config.retryCount || 0;
      error.config.retryCount++;
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      return api(error.config);
    }
    
    return Promise.reject(error);
  }
);

// Menu API
export const menuAPI = {
  getAll: (cuisine?: string) => 
    api.get('/menu', { params: { cuisine } }),
  getByCategory: (category: string) => 
    api.get(`/menu/category/${category}`),
  search: (query: string) => 
    api.get('/menu/search', { params: { q: query } }),
};

// Order API
export const orderAPI = {
  create: (orderData: unknown) => 
    api.post('/orders', orderData),
  getById: (id: string) => 
    api.get(`/orders/${id}`),
  track: (id: string) => 
    api.get(`/orders/${id}/track`),
  getHistory: () => 
    api.get('/orders'),
};

// Payment API
export const paymentAPI = {
  initializePaystack: (amount: number, email: string) => 
    api.post('/payment/paystack/initialize', { amount, email }),
  verifyPaystack: (reference: string) => 
    api.get(`/payment/paystack/verify/${reference}`),
  initializeFlutterwave: (amount: number, email: string) => 
    api.post('/payment/flutterwave/initialize', { amount, email }),
  verifyFlutterwave: (transactionId: string) => 
    api.get(`/payment/flutterwave/verify/${transactionId}`),
};

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: unknown) => api.put('/auth/profile', data),
};

// User API
export const userAPI = {
  getAddresses: () => api.get('/users/addresses'),
  addAddress: (data: unknown) => api.post('/users/addresses', data),
  updateAddress: (id: string, data: unknown) => 
    api.put(`/users/addresses/${id}`, data),
  deleteAddress: (id: string) => 
    api.delete(`/users/addresses/${id}`),
  getLoyaltyPoints: () => api.get('/users/loyalty'),
  getFavorites: () => api.get('/users/favorites'),
  addFavorite: (itemId: string) => 
    api.post('/users/favorites', { itemId }),
  removeFavorite: (itemId: string) => 
    api.delete(`/users/favorites/${itemId}`),
};

export default api;
