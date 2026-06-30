'use client';

import { LogOut, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '../../store/authStore';

interface HeaderProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  '/student': 'Trang chủ',
  '/student/profile': 'Thông tin cá nhân',
  '/student/evaluation': 'Phiếu đánh giá',
  '/student/evidence': 'Quản lý minh chứng',
  '/student/history': 'Lịch sử đánh giá',
  '/student/results': 'Kết quả',
  '/admin': 'Dashboard',
  '/admin/users': 'Quản lý sinh viên',
  '/admin/faculties': 'Quản lý Khoa',
  '/admin/majors': 'Quản lý Ngành',
  '/admin/classes': 'Quản lý Lớp',
  '/admin/class-list': 'Danh sách lớp',
  '/admin/import': 'Import danh sách',
};

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] ?? 'Dashboard';

  const displayName = user
    ? 'fullName' in user && typeof user.fullName === 'string'
      ? user.fullName
      : user.username
    : undefined;

  const initials = displayName
    ? displayName.split(' ').slice(-2).map((n) => n[0]).join('').toUpperCase()
    : 'U';

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[#E9ECEF] bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.08)] backdrop-blur-sm">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6">

        {/* Left: hamburger + breadcrumb */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Mở menu"
            onClick={onMenuClick}
            className="ui-icon-button cursor-pointer text-[#1A1B1E] hover:bg-[#EDF2FF] hover:text-[#3B5BDB] lg:hidden"
          >
            <Menu size={21} />
          </button>

          <div className="min-w-0">
            <h1 className="text-lg font-bold text-[#1A1B1E] tracking-tight">{pageTitle}</h1>
          </div>
        </div>

        {/* Right: user + logout */}
        {user && (
          <div className="flex shrink-0 items-center gap-3">
            {/* Avatar + Name Link */}
            <Link
              href="/student/profile"
              className="flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-1.5 transition duration-150 hover:bg-gray-100 hover:shadow-sm"
              title="Xem thông tin cá nhân"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3B5BDB] to-[#6741D9] text-xs font-bold text-white shadow-sm">
                {initials}
              </div>
              <span className="hidden max-w-[130px] truncate text-sm font-semibold text-[#1B1C20] sm:block">
                {displayName}
              </span>
            </Link>

            {/* Logout button */}
            <button
              onClick={logout}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-[#FFD4D4] bg-[#FFF5F5] text-[#C92A2A] transition hover:bg-[#C92A2A] hover:text-white"
              title="Đăng xuất"
              type="button"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
