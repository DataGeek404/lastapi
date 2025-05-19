
import axios from 'axios';
import { toast } from 'sonner';

// Use a variable that can be easily updated if needed
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
    // More specific error handling
    if (error.code === 'ERR_NETWORK') {
      toast.error('Network error - Please check if the backend server is running');
    } else if (error.response?.status === 400) {
      // Handle validation errors
      const errors = error.response?.data?.errors;
      if (errors && Array.isArray(errors)) {
        errors.forEach(err => {
          toast.error(`Validation error: ${err.msg}`);
        });
      } else {
        toast.error(error.response?.data?.message || 'Form validation failed');
      }
    } else if (error.response?.status === 500 && error.response?.data?.message) {
      // Handle server errors with messages
      toast.error(`Server error: ${error.response.data.message}`);
    } else {
      const message = error.response?.data?.message || 'An error occurred';
      toast.error(message);
    }
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
      // Format phone number before sending to backend
      const formattedData = {
        ...data,
        phoneNumber: formatMpesaPhoneNumber(data.phoneNumber)
      };
      return api.post('/api/donations/mpesa', formattedData);
    } else {
      // For visa and mastercard
      return api.post('/api/donations/card', { ...data, cardType: paymentMethod });
    }
  },
  getPaymentMethods: () => api.get('/api/payment-methods'),
  getDonationStatus: (id: string) => api.get(`/api/donations/${id}`),
};

// Helper function to format phone number for M-Pesa
function formatMpesaPhoneNumber(phoneNumber: string): string {
  // Remove any non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // If the number starts with '0', replace with '254'
  if (digitsOnly.startsWith('0')) {
    return '254' + digitsOnly.substring(1);
  }
  
  // If the number doesn't start with '254', add it
  if (!digitsOnly.startsWith('254')) {
    return '254' + digitsOnly;
  }
  
  return digitsOnly;
}

export const userApi = {
  register: (data: any) => api.post('/api/users/register', data),
  login: (data: any) => api.post('/api/users/login', data),
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (data: any) => api.put('/api/users/profile', data),
};

export default api;
