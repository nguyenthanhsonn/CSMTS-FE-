import { create } from 'zustand';
import { User, Student, Admin } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<Student | Admin>) => void;
}

// Mock users for demo
const mockUsers: (Student | Admin)[] = [
  {
    id: '1',
    username: 'sv001',
    role: 'student',
    isActive: true,
    studentCode: 'SV001',
    fullName: 'Nguyễn Văn A',
    dateOfBirth: '2003-05-15',
    className: 'CNTT K18',
    major: 'Công nghệ thông tin',
    faculty: 'Công nghệ thông tin',
    admissionYear: 2021,
    phoneNumber: '0123456789',
  },
  {
    id: '2',
    username: 'admin',
    role: 'admin',
    isActive: true,
    fullName: 'Quản trị viên',
    email: 'admin@university.edu.vn',
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (username: string, password: string) => {
    // Mock login - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers.find(u => u.username === username);
    if (user && password === '123456') {
      set({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
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
