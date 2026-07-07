import { get, post } from './api';

import type {
  CaptchaResponse,
  ChangePasswordPayload,
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
  User,
} from '../types';

/** Lấy mã xác nhận khi đăng nhập. */
async function getCaptcha() {
  return get<CaptchaResponse>('/auth/captcha');
}

/** Đăng nhập tài khoản. */
async function login(email: string, password: string) {
  return post<LoginResponse>('/auth/login', { email, password } satisfies LoginPayload);
}

/** Lấy thông tin tài khoản hiện tại. */
async function getMe() {
  return get<User>('/auth/me');
}

/** Giữ phiên đăng nhập hoạt động. */
async function refreshToken(refreshToken: string) {
  return post<RefreshTokenResponse>('/auth/refresh-token', { refreshToken });
}

/** Đăng xuất tài khoản. */
async function logout(refreshToken: string, _accessToken?: string) {
  return post<null>('/auth/logout', { refreshToken });
}

/** Đổi mật khẩu tài khoản. */
async function changePassword(_accessToken: string, currentPassword: string, newPassword: string) {
  return post<null>('/auth/change-password', { currentPassword, newPassword } satisfies ChangePasswordPayload);
}

/** Lấy thông tin tài khoản cho màn cũ. */
async function getProfile(_accessToken?: string) {
  return getMe();
}

export const API_Auth = {
  getCaptcha,
  login,
  getMe,
  getProfile,
  refreshToken,
  logout,
  changePassword,
};
