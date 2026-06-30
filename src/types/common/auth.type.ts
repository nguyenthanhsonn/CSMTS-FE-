import type { Student } from '../student/student-user.type';
import type { Admin } from '../admin/admin-user.type';

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  loginMock: (role: 'student' | 'admin') => void;
  logout: () => void;
  updateProfile: (data: Partial<Student | Admin>) => void;
}
