
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token here if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

// API endpoints
export const contactApi = {
  submitForm: (data: any) => api.post('/api/contact', data),
};

export const joinUsApi = {
  submitApplication: (data: any) => api.post('/api/join-us', data),
};

export const donationApi = {
  processDonation: (data: any, paymentMethod: string) => {
    if (paymentMethod === 'stripe') {
      return api.post('/api/donations/stripe', data);
    } else if (paymentMethod === 'paypal') {
      return api.post('/api/donations/paypal', data);
    } else if (paymentMethod === 'mpesa') {
      return api.post('/api/donations/mpesa', data);
    } else {
      // For visa and mastercard
      return api.post('/api/donations/card', { ...data, cardType: paymentMethod });
    }
  },
  getPaymentMethods: () => api.get('/api/payment-methods'),
  getDonationStatus: (id: string) => api.get(`/api/donations/${id}`),
};

export const userApi = {
  register: (data: any) => api.post('/api/users/register', data),
  login: (data: any) => api.post('/api/users/login', data),
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (data: any) => api.put('/api/users/profile', data),
};

export default api;
