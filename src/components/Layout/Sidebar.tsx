'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  FileText,
  Upload,
  History,
  Award,
  Users,
  Building2,
  GraduationCap,
  School,
  UserCog,
  BarChart3,
  FileSpreadsheet,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const studentMenuItems = [
  { path: '/student', icon: Home, label: 'Trang chủ' },
  { path: '/student/profile', icon: Users, label: 'Thông tin cá nhân' },
  { path: '/student/evaluation', icon: FileText, label: 'Phiếu đánh giá' },
  { path: '/student/evidence', icon: Upload, label: 'Quản lý minh chứng' },
  { path: '/student/history', icon: History, label: 'Lịch sử đánh giá' },
  { path: '/student/results', icon: Award, label: 'Kết quả' },
];

const adminMenuItems = [
  { path: '/admin', icon: BarChart3, label: 'Dashboard' },
  { path: '/admin/users', icon: UserCog, label: 'Quản lý User' },
  { path: '/admin/faculties', icon: Building2, label: 'Quản lý Khoa' },
  { path: '/admin/majors', icon: GraduationCap, label: 'Quản lý Ngành' },
  { path: '/admin/classes', icon: School, label: 'Quản lý Lớp' },
  { path: '/admin/class-list', icon: Users, label: 'Danh sách lớp' },
  { path: '/admin/import', icon: FileSpreadsheet, label: 'Import danh sách' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const menuItems = user?.role === 'admin' ? adminMenuItems : studentMenuItems;

  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
