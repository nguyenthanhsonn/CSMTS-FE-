'use client';

import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">
              Hệ thống Đánh giá Rèn luyện
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User size={18} className="text-gray-500" />
              <span className="font-medium">
                {user?.role === 'student' 
                  ? (user as any).fullName 
                  : (user as any).fullName}
              </span>
              <span className="text-gray-500">
                ({user?.role === 'student' ? 'Sinh viên' : 'Quản trị viên'})
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut size={18} />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
