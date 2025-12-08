import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { message } from 'antd';
import Cookies from 'js-cookie';
import { refreshToken } from '../services/authService';
import { expiresToken } from '#/shared/constants/expises';

const baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.withCredentials = true;

// Tạo một instance cho việc gửi dữ liệu dạng form
export const formDataAxios = axios.create({
  baseURL,
  headers: {
    ['Content-Type']: 'multipart/form-data',
  },
});

// Tạo một instance cho việc gửi dữ liệu dạng JSON
export const jsonAxios = axios.create({
  baseURL,
  headers: {
    ['Content-Type']: 'application/json',
  },
});

// Request interceptor
jsonAxios.interceptors.request.use(
  config => {
    const token = Cookies.get('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Request interceptor
formDataAxios.interceptors.request.use(
  config => {
    const token = Cookies.get('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
jsonAxios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = Cookies.get('refreshToken');
        if (!refresh) throw new Error('Missing refresh token');
        const response = await refreshToken(refresh);

        const { accessToken } = response.data.data;
        Cookies.set('accessToken', accessToken, {
          expires: expiresToken.accessToken,
        });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return jsonAxios(originalRequest);
      } catch (error) {
        Cookies.remove('user');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
