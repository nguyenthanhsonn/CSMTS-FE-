import { request } from './api';

export const API_Auth = {
  login: async (email: string, password: string) => {
    return request<any>(
      '/auth/login',
      {
        method: 'POST',
        body: { email, password },
      },
      'đăng nhập tài khoản'
    );
  },

  getProfile: async (accessToken: string) => {
    return request<any>(
      '/auth/me',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      'lấy thông tin tài khoản'
    );
  },

  refreshToken: async (refreshToken: string) => {
    return request<any>(
      '/auth/refresh-token',
      {
        method: 'POST',
        body: { refreshToken },
      },
      'làm mới phiên đăng nhập'
    );
  },

  logout: async (refreshToken: string) => {
    return request<any>(
      '/auth/logout',
      {
        method: 'POST',
        body: { refreshToken },
      },
      'đăng xuất tài khoản'
    );
  },

  changePassword: async (accessToken: string, currentPassword: string, newPassword: string) => {
    return request<any>(
      '/auth/change-password',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: { currentPassword, newPassword },
      },
      'đổi mật khẩu'
    );
  },
};
