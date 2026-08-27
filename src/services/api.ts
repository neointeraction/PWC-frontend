import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';

const BASE_URL = import.meta.env.API_BASE_URL || 'http://localhost:4000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true, // required to send/receive the httpOnly refreshToken cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - inject JWT token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const isAuthEndpoint = (url?: string) =>
  !!url && (url.includes('/auth/login') || url.includes('/auth/refresh') || url.includes('/auth/logout'));

// Response interceptor - on a 401 from a non-auth call, try refreshing the access
// token once (rotates the httpOnly refresh cookie) and retry; otherwise clear the
// session and bounce to login. A failed /auth/login itself is left to the caller
// (Login page) to display, not treated as a session expiry.
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (error.response?.status !== 401 || !originalRequest || isAuthEndpoint(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      useAuthStore.getState().clearSession();
      window.location.href = '/login';
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    try {
      const { data } = await apiClient.post<{ accessToken: string }>('/auth/refresh');
      useAuthStore.getState().setToken(data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearSession();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }
);
