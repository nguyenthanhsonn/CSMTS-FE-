import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';

import type { RefreshTokenResponse } from '../types';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api/v1';

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

interface ApiErrorPayload {
  message?: string;
  errors?: unknown;
}

interface AuthRetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
}

type LegacyApiData<T> = T & { data?: T };

function getStoredToken(key: 'accessToken' | 'refreshToken') {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(key);
}

function setStoredToken(key: 'accessToken' | 'refreshToken', value?: string) {
  if (typeof window === 'undefined' || !value) {
    return;
  }

  localStorage.setItem(key, value);
}

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getStoredToken('accessToken');

  if (token && token !== 'mock-access-token') {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorPayload>) => {
    const originalRequest = error.config as AuthRetryConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh
    ) {
      originalRequest._retry = true;
      const refreshToken = getStoredToken('refreshToken');

      if (refreshToken && refreshToken !== 'mock-refresh-token') {
        const refreshResponse = await axiosInstance.post<ApiResponse<RefreshTokenResponse>>(
          '/auth/refresh-token',
          { refreshToken },
          { skipAuthRefresh: true } as AxiosRequestConfig
        );
        const tokenData = refreshResponse.data.data;

        setStoredToken('accessToken', tokenData.accessToken);
        setStoredToken('refreshToken', tokenData.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;

        return axiosInstance(originalRequest);
      }
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      'Không thể kết nối tới máy chủ. Vui lòng thử lại.';
    const apiError = new Error(message) as Error & { errors?: unknown; statusCode?: number };
    apiError.errors = error.response?.data?.errors;
    apiError.statusCode = error.response?.status;

    throw apiError;
  }
);

export async function request<T>(config: AxiosRequestConfig): Promise<LegacyApiData<T>> {
  const res = await axiosInstance<ApiResponse<T>>(config);
  return res.data.data as LegacyApiData<T>;
}

export function get<T>(url: string, config?: AxiosRequestConfig) {
  return request<T>({ ...config, url, method: 'GET' });
}

export function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return request<T>({ ...config, url, method: 'POST', data });
}

export function patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return request<T>({ ...config, url, method: 'PATCH', data });
}

export function del<T>(url: string, config?: AxiosRequestConfig) {
  return request<T>({ ...config, url, method: 'DELETE' });
}

export function buildQueryParams<T extends object>(params?: T) {
  return Object.fromEntries(
    Object.entries(params || {}).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
}
