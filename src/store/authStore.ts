import { create } from 'zustand';
import type { AuthState } from '../types';

import { API_Auth } from '../api/API_Auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (username: string, password: string) => {
    try {
      const result = await API_Auth.login(username, password);
      // Support nested "data" wrapper if any
      const data = result.data || result;
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      if (!accessToken) {
        throw new Error('Access Token không tồn tại');
      }

      // Fetch profile using the token
      const profileRes = await API_Auth.getProfile(accessToken);
      const user = profileRes.data || profileRes;

      set({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },
  loginMock: (role: 'student' | 'admin') => {
    if (role === 'student') {
      const mockStudent = {
        id: 'student-id-123',
        username: 'student.test2',
        fullName: 'Nguyễn Sinh Viên (Mock)',
        role: 'student' as const,
        email: 'student.test2@csmts.local',
        studentCode: 'SV99999',
        className: 'CNTT K18',
        dateOfBirth: '2003-01-01',
        phoneNumber: '0987654321',
        admissionYear: '2021',
        isActive: true,
      };
      set({ user: mockStudent, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(mockStudent));
      localStorage.setItem('accessToken', 'mock-access-token');
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    } else {
      const mockAdmin = {
        id: 'admin-id-123',
        username: 'admin',
        fullName: 'Hệ thống Quản trị (Mock)',
        role: 'admin' as const,
        email: 'admin@csmts.local',
        isActive: true,
      };
      set({ user: mockAdmin, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(mockAdmin));
      localStorage.setItem('accessToken', 'mock-access-token');
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    }
  },
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await API_Auth.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  updateProfile: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
}));

// Check for existing session on load
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      useAuthStore.setState({ user, isAuthenticated: true });
    } catch (e) {
      localStorage.removeItem('user');
    }
  }
}
