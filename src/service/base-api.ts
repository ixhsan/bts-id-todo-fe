// src/api/axiosInstance.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { BASE_API_URL } from '../constant/api';

const getAuthToken = () => {
  return localStorage.getItem('authToken') || '';
};

const baseApi: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

baseApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseApi;
