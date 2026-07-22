'use client';

import { useState, useRef, useEffect } from 'react';
import { Plus, Upload, ChevronUp, UserPlus } from 'lucide-react';
import type { AddActionsDropdownProps } from '@/types/admin';

export const AddActionsDropdown = ({
  onAddStudent,
  onImportExcel,
  onAddUser,
}: AddActionsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài hoặc bấm phím Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Nút kích hoạt chính (style xanh đậm, bo tròn pill giống nút Thêm người dùng cũ) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#0B3A82] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition-all duration-200 hover:bg-[#104E92] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#0B3A82]/50"
      >
        <Plus size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
        <span>Thêm mới</span>
        <ChevronUp size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu (Pop-up hướng lên trên vì vị trí nút ở fixed góc dưới màn hình) */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute bottom-full right-0 mb-3.5 w-64 origin-bottom-right rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-900/15 ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150 ease-out z-50"
        >
          <div className="px-3 py-2 border-b border-slate-100 mb-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Tác vụ quản lý</p>
          </div>

          <div className="space-y-1">
            {/* Action 1: Thêm sinh viên */}
            <button
              type="button"
              role="menuitem"
              onClick={() => handleAction(onAddStudent)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-50/80 active:bg-blue-100/60"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100/70 text-blue-600">
                <Plus size={16} />
              </div>
              <div className="text-left min-w-0">
                <p className="font-semibold text-blue-700">Thêm sinh viên</p>
                <p className="text-[10px] font-normal text-blue-500/80 truncate">Tạo thủ công 1 sinh viên</p>
              </div>
            </button>

            {/* Action 2: Nhập sinh viên từ Excel */}
            <button
              type="button"
              role="menuitem"
              onClick={() => handleAction(onImportExcel)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-50/80 active:bg-emerald-100/60"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100/70 text-emerald-600">
                <Upload size={16} />
              </div>
              <div className="text-left min-w-0">
                <p className="font-semibold text-emerald-700">Nhập sinh viên từ Excel</p>
                <p className="text-[10px] font-normal text-emerald-600/80 truncate">Import hàng loạt từ file Excel</p>
              </div>
            </button>

            {/* Action 3: Thêm người dùng */}
            <button
              type="button"
              role="menuitem"
              onClick={() => handleAction(onAddUser)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100/80 active:bg-slate-200/60"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0B3A82]">
                <UserPlus size={16} />
              </div>
              <div className="text-left min-w-0">
                <p className="font-semibold text-slate-800">Thêm người dùng</p>
                <p className="text-[10px] font-normal text-slate-500 truncate">Tạo tài khoản quản trị / cố vấn</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
