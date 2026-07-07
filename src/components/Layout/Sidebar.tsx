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
  X,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const studentMenuItems = [
  { path: '/student', icon: Home, label: 'Trang chủ' },
  { path: '/student/evaluation', icon: FileText, label: 'Phiếu đánh giá' },
  { path: '/student/evidence', icon: Upload, label: 'Quản lý minh chứng' },
  { path: '/student/history', icon: History, label: 'Lịch sử đánh giá' },
  { path: '/student/results', icon: Award, label: 'Kết quả' },
];

const adminMenuItems = [
  { path: '/admin', icon: BarChart3, label: 'Dashboard' },
  { path: '/admin/student', icon: UserCog, label: 'Quản lý sinh viên' },
  { path: '/admin/faculties', icon: Building2, label: 'Quản lý Khoa' },
  { path: '/admin/majors', icon: GraduationCap, label: 'Quản lý Ngành' },
  { path: '/admin/classes', icon: School, label: 'Quản lý Lớp' },
  { path: '/admin/class-list', icon: Users, label: 'Danh sách lớp' },
  { path: '/admin/import', icon: FileSpreadsheet, label: 'Import danh sách' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const menuItems = user?.role === 'admin' ? adminMenuItems : studentMenuItems;
  const sectionLabel = user?.role === 'admin' ? 'QUẢN TRỊ' : 'SINH VIÊN';

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Đóng menu"
          className="fixed inset-0 z-40 cursor-pointer bg-black/50 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[220px] flex-col bg-[#1A1B2E] shadow-2xl transition-transform duration-200 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Logo header */}
        <div className="relative flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link
            href={user?.role === 'admin' ? '/admin' : '/student'}
            className="flex min-w-0 cursor-pointer items-center gap-2.5"
            onClick={onClose}
          >
            {/* Logo mark */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#3B5BDB] to-[#6741D9] shadow-lg">
              <span className="text-xs font-black text-white">RL</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold leading-tight text-white">Đánh giá Rèn luyện</p>
              <p className="text-[10px] font-medium text-[#A0AEC0]">CSMTS</p>
            </div>
          </Link>
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={onClose}
            className="ui-icon-button cursor-pointer text-[#A0AEC0] hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {/* Section label */}
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-[#4A5568]">
            {sectionLabel}
          </p>

          <div className="space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className={`group relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${isActive
                      ? 'bg-[#3B5BDB] text-white shadow-md shadow-[#3B5BDB]/40'
                      : 'text-[#A0AEC0] hover:bg-white/8 hover:text-white'
                    }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute right-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-l-full bg-white/60" />
                  )}
                  <Icon
                    size={17}
                    className={`shrink-0 transition-transform duration-150 ${isActive ? 'text-white' : 'text-[#718096] group-hover:text-white'
                      }`}
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};
