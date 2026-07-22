'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { CustomSelectProps } from '@/types/common';

export const CustomSelect = ({
  value,
  onChange,
  options,
  label,
  required,
  disabled,
  className = 'w-full',
  selectClassName = '',
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedOption = options.find((opt) => opt.id === value);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs font-bold text-gray-600 uppercase mb-1 select-none">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 text-left text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900 flex items-center justify-between h-10 select-none cursor-pointer hover:border-gray-400 transition disabled:bg-gray-100 disabled:opacity-75 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed ${selectClassName}`}
      >
        <span className="truncate">{selectedOption ? selectedOption.name : '-- Chọn --'}</span>
        <ChevronDown size={15} className={`text-gray-400 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-50 mt-1 w-full max-h-56 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-xs text-gray-400 italic">Không có lựa chọn nào</div>
          ) : (
            options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs sm:text-sm transition cursor-pointer ${
                  opt.id === value
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="truncate">{opt.name}</span>
                {opt.id === value && <Check size={14} className="text-blue-600 shrink-0 ml-1.5" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default CustomSelect;
