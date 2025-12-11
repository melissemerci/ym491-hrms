import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Client-side only
    if (typeof window !== 'undefined') {
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const message =
      (error.response?.data as any)?.detail || 
      (error.response?.data as any)?.message || 
      error.message || 
      'Something went wrong';
    
    // Handle 401 - Unauthorized
    if (error.response?.status === 401) {
       if (typeof window !== 'undefined') {
         // Clear token and redirect to login
         Cookies.remove('token');
         const currentPath = window.location.pathname;
         if (currentPath !== '/login') {
           window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
         }
       }
    }

    return Promise.reject(new Error(message));
  }
);


