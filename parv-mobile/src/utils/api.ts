import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Replace with your actual backend IP/URL. 
// For physical Android devices, use your machine's local IP (e.g., http://192.168.1.5:5000/api)
// For Android Emulator, use http://10.0.2.2:5000/api
const BASE_URL = 'http://10.0.2.2:5000/api'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Refresh or Expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Handle token refresh logic here if applicable
        // const refreshToken = await SecureStore.getItemAsync('refreshToken');
        // ... call refresh endpoint ...
        // await SecureStore.setItemAsync('token', newToken);
        // return api(originalRequest);
      } catch (refreshError) {
        // Logout user or redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
