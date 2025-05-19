
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = 'https://backend-yr3r.onrender.com';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
  submitForm: (data: any) => api.post('/contact', data),
};

export const joinUsApi = {
  submitApplication: (data: any) => api.post('/join-us', data),
};

export const donationApi = {
  processDonation: (data: any) => api.post('/donations', data),
  getPaymentMethods: () => api.get('/payment-methods'),
};

export default api;
