'use client';

import { useState, useEffect, useRef } from 'react';
import { LogOut, Menu, ChevronDown, User, Home, UserCog, Lock } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '../../store/authStore';
import { ChangePasswordModal } from '../auth/changePassword';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useAuthStore();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = user
    ? 'fullName' in user && typeof user.fullName === 'string'
      ? user.fullName
      : user.username
    : undefined;

  // Fix initials to ignore parentheses / brackets (e.g. "(Mock)")
  const cleanName = displayName ? displayName.replace(/\s*\([^)]*\)/g, '').trim() : '';
  const initials = cleanName
    ? cleanName.split(' ').slice(-2).map((n) => n[0]).join('').toUpperCase()
    : 'U';

  const dropdownItems = user?.role === 'admin'
    ? [
        { label: 'Dashboard', href: '/admin', icon: Home },
        { label: 'Quản lý sinh viên', href: '/admin/student', icon: UserCog },
      ]
    : [
        { label: 'Thông tin cá nhân', href: '/student/profile', icon: User },
      ];

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[#E9ECEF] bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.08)] backdrop-blur-sm">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6">

        {/* Left: hamburger */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Mở menu"
            onClick={onMenuClick}
            className="ui-icon-button cursor-pointer text-[#1A1B1E] hover:bg-[#EDF2FF] hover:text-[#3B5BDB] lg:hidden"
          >
            <Menu size={21} />
          </button>
        </div>

        {/* Right: user dropdown */}
        {user && (
          <div className="relative shrink-0" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm focus:outline-none select-none"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3B5BDB] to-[#6741D9] text-xs font-bold text-white shadow-sm">
                {initials}
              </div>
              <span className="hidden max-w-[200px] truncate text-sm font-semibold text-[#1B1C20] sm:block">
                {displayName}
              </span>
              <ChevronDown
                size={15}
                className={`text-[#718096] transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2.5 w-52 origin-top-right rounded-2xl border border-[#E9ECEF] bg-white/95 backdrop-blur-md p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] focus:outline-none animate-in fade-in-0 slide-in-from-top-3 duration-200 ease-out">
                {/* Navigation Items */}
                {dropdownItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 transition-all duration-150 hover:bg-[#EDF2FF]/85 hover:text-[#3B5BDB] active:scale-[0.98]"
                    >
                      <Icon size={16} className="shrink-0 text-gray-500 group-hover:text-[#3B5BDB]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                <div className="my-1.5 border-t border-[#EDF2F7]" />

                {/* Change Password Button */}
                {user.role === 'student' ? (
                  <Link
                    href="/student/profile#change-password"
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 transition-all duration-150 hover:bg-[#EDF2FF]/85 hover:text-[#3B5BDB] active:scale-[0.98]"
                  >
                    <Lock size={16} className="shrink-0 text-gray-500" />
                    <span>Đổi mật khẩu</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      setChangePasswordOpen(true);
                    }}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 transition-all duration-150 hover:bg-[#EDF2FF]/85 hover:text-[#3B5BDB] active:scale-[0.98]"
                  >
                    <Lock size={16} className="shrink-0 text-gray-500" />
                    <span>Đổi mật khẩu</span>
                  </button>
                )}

                <div className="my-1.5 border-t border-[#EDF2F7]" />

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold text-[#C92A2A] transition-all duration-150 hover:bg-[#FFF5F5] active:scale-[0.98]"
                >
                  <LogOut size={16} className="shrink-0" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal 
        isOpen={changePasswordOpen} 
        onClose={() => setChangePasswordOpen(false)} 
      />
    </header>
  );
};
