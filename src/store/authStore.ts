import { create } from 'zustand';
import type { AuthState } from '../types';

import { API_Auth } from '../api/API_Auth';
import type { Student, Admin } from '../types';

function normalizeProfile(profile: any) {
  const student = profile?.student;
  const classInfo = student?.class;
  const major = student?.major;
  const faculty = student?.faculty;

  return {
    ...profile,
    studentCode: profile?.studentCode ?? student?.studentCode,
    enrolledAt: profile?.enrolledAt ?? student?.enrolledAt,
    class: profile?.class ?? classInfo,
    className: profile?.className ?? classInfo?.name,
    major: profile?.major ?? major,
    faculty: profile?.faculty ?? faculty,
    admissionYear: profile?.admissionYear ?? classInfo?.enrollmentYear,
    phoneNumber: profile?.phoneNumber ?? profile?.phone,
    managedClasses: profile?.managedClasses ?? [],
    managedFaculties: profile?.managedFaculties ?? [],
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isHydrated: false,
  hydrateAuth: () => {
    if (typeof window === 'undefined') {
      set({ isHydrated: true });
      return;
    }

    const storedUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (storedUser && accessToken && refreshToken) {
      try {
        const user = JSON.parse(storedUser);
        set({ user, isAuthenticated: true, isHydrated: true });
        return;
      } catch {
        localStorage.removeItem('user');
      }
    }

    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, isAuthenticated: false, isHydrated: true });
  },
  login: async (username: string, password: string, captchaId: string, captchaCode: string) => {
    try {
      const result = await API_Auth.login(username, password, captchaId, captchaCode);
      // Support nested "data" wrapper if any
      const data = result.data || result;
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      if (!accessToken) {
        throw new Error('Access Token không tồn tại');
      }

      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      const profileRes = await API_Auth.getProfile(accessToken);
      const user = normalizeProfile(profileRes.data || profileRes);

      set({ user, isAuthenticated: true, isHydrated: true });
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },
  loginMock: (role) => {
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
      set({ user: mockStudent, isAuthenticated: true, isHydrated: true });
      localStorage.setItem('user', JSON.stringify(mockStudent));
      localStorage.setItem('accessToken', 'mock-access-token');
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    } else if (role === 'admin') {
      const mockAdmin = {
        id: 'admin-id-123',
        username: 'admin',
        fullName: 'Hệ thống Quản trị (Mock)',
        role: 'admin' as const,
        email: 'admin@csmts.local',
        isActive: true,
      };
      set({ user: mockAdmin, isAuthenticated: true, isHydrated: true });
      localStorage.setItem('user', JSON.stringify(mockAdmin));
      localStorage.setItem('accessToken', 'mock-access-token');
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    } else {
      const mockClassCouncil = {
        id: 'class-council-id-123',
        username: 'gvcn',
        fullName: 'Giảng viên Chủ nhiệm (Mock)',
        role: 'class_council' as const,
        email: 'gvcn@csmts.local',
        isActive: true,
      };
      set({ user: mockClassCouncil, isAuthenticated: true, isHydrated: true });
      localStorage.setItem('user', JSON.stringify(mockClassCouncil));
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
      set({ user: null, isAuthenticated: false, isHydrated: true });
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  refreshProfile: async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken || accessToken === 'mock-access-token') {
      return;
    }

    const profileRes = await API_Auth.getProfile(accessToken);
    const refreshedProfile = normalizeProfile(profileRes.data || profileRes);

    set((state) => ({
      user: state.user ? { ...state.user, ...refreshedProfile } : refreshedProfile,
      isAuthenticated: true,
      isHydrated: true,
    }));

    const storedUser = localStorage.getItem('user');
    let parsedUser = {};
    try {
      parsedUser = storedUser ? JSON.parse(storedUser) : {};
    } catch {
      parsedUser = {};
    }
    localStorage.setItem('user', JSON.stringify({ ...parsedUser, ...refreshedProfile }));
  },
  updateProfile: async (data: Partial<Student | Admin>) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && accessToken !== 'mock-access-token') {
      try {
        const hasPhone = Object.prototype.hasOwnProperty.call(data, 'phone');
        const hasPhoneNumber = Object.prototype.hasOwnProperty.call(data, 'phoneNumber');
        const payload = {
          fullName: (data as any).fullName,
          phone: hasPhone ? (data as any).phone : hasPhoneNumber ? (data as any).phoneNumber : undefined,
          dateOfBirth: (data as any).dateOfBirth,
        };
        const updateRes = await API_Auth.updateProfile(accessToken, payload);
        const updatedProfile = normalizeProfile(updateRes.data || updateRes);

        set((state) => ({
          user: state.user ? { ...state.user, ...updatedProfile } : null,
        }));

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
