// /lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ||
    // "http://localhost:5000/api" || 
    'https://parvfinancialservices-backend.onrender.com/api',
  withCredentials: true // send cookies automatically
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let refreshSubscribers = [];

// Subscribe to token refresh
function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

// Notify all subscribers with new token
function onTokenRefreshed() {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
}

// Handle logout - clear storage and redirect
function handleLogout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");

    // Only redirect to login if the user is in a protected route (dashboard)
    const isProtectedRoute = window.location.pathname.startsWith("/dashboard");

    if (isProtectedRoute && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
}

// Automatically refresh token when access token expires
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired (401) and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await axios.get(
          `${apiUrl}/auth/refresh-token`,
          { withCredentials: true }
        );

        // If refresh successful and we got a new token
        if (response.data?.token && typeof window !== "undefined") {
          localStorage.setItem("token", response.data.token);
        }

        isRefreshing = false;
        onTokenRefreshed();

        // Retry the original request
        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        refreshSubscribers = [];

        console.log("Refresh token failed, logging out...");

        // Clear all auth data and redirect to login
        handleLogout();

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
