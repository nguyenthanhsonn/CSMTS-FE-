import { create } from 'zustand';
import type { AuthState } from '../types';

import { API_Auth } from '../api/API_Auth';
import { API_Student } from '../api/API_Student';
import type { Student, Admin } from '../types';

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
      let user = profileRes.data || profileRes;

      // If user is a student, fetch their detailed student profile
      if (user.role === 'student') {
        try {
          const studentProfileRes = await API_Student.getProfile(accessToken);
          const studentProfile = studentProfileRes.data || studentProfileRes;
          user = { ...user, ...studentProfile };
        } catch (studentErr) {
          console.error('Failed to fetch detailed student profile:', studentErr);
        }
      }

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
        admissionYear: 2021,
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
      const accessToken = localStorage.getItem('accessToken');
      if (refreshToken && refreshToken !== 'mock-refresh-token') {
        await API_Auth.logout(refreshToken, accessToken || undefined);
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
  updateProfile: async (data: Partial<Student | Admin>) => {
    const accessToken = localStorage.getItem('accessToken');
    
    // Check if it is a real token or mock
    if (accessToken && accessToken !== 'mock-access-token' && useAuthStore.getState().user?.role === 'student') {
      const phone = (data as Student).phone || (data as Student).phoneNumber;
      if (phone) {
        try {
          const updateRes = await API_Student.updateProfile(accessToken, phone);
          const updatedProfile = updateRes.data || updateRes;
          
          set((state) => ({
            user: state.user ? { ...state.user, ...updatedProfile } : null,
          }));
          
          // Also update localStorage
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            localStorage.setItem('user', JSON.stringify({ ...parsedUser, ...updatedProfile }));
          }
          return;
        } catch (error) {
          console.error('Update profile API error:', error);
          throw error;
        }
      }
    }
    
    // Fallback/Mock local update
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      localStorage.setItem('user', JSON.stringify({ ...parsedUser, ...data }));
    }
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
