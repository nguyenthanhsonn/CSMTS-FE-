import type { Admin } from '../admin/admin-user.type';
import type { Student } from '../student/student-user.type';
import type { UserRole } from './auth.type';

/** Thông tin người dùng đăng nhập. */
export interface User {
  id: string;
  username: string;
  role: UserRole;
  isActive: boolean;
}

/** Mã xác nhận đăng nhập. */
export interface CaptchaResponse {
  captchaId: string;
  image: string;
}

/** Thông tin dùng để đăng nhập. */
export interface LoginPayload {
  email: string;
  password: string;
  captchaId?: string;
  captchaCode?: string;
}

/** Thông tin nhận được sau khi đăng nhập. */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user?: User;
}

/** Thông tin dùng để giữ phiên đăng nhập. */
export interface RefreshTokenPayload {
  refreshToken: string;
}

/** Thông tin phiên đăng nhập mới. */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

/** Thông tin dùng để đổi mật khẩu. */
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

/** Trạng thái đăng nhập trong ứng dụng. */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  loginMock: (role: 'student' | 'admin') => void;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Student | Admin>) => Promise<void>;
}
