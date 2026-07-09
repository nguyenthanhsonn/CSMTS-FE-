export type {
  AuthState,
  CaptchaResponse,
  ChangePasswordPayload,
  LoginPayload,
  LoginResponse,
  RefreshTokenPayload,
  RefreshTokenResponse,
  User,
} from './auth.interface';

/** Vai trò tài khoản trong hệ thống. */
export type UserRole = 'student' | 'admin' | 'class_council';
