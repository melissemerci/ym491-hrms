import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

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
      const token = localStorage.getItem('token');
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
      (error.response?.data as any)?.message || error.message || 'Something went wrong';
    
    // Handle 401 specifically if needed (e.g. redirect to login)
    if (error.response?.status === 401) {
       // Optionally redirect to login or clear token
       if (typeof window !== 'undefined') {
         // localStorage.removeItem('token');
         // window.location.href = '/login';
       }
    }

    return Promise.reject(new Error(message));
  }
);


