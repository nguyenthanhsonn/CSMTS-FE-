'use client';

import { Search, ChevronDown } from 'lucide-react';
import type { SearchFilterBarProps } from '@/types/admin';

export default function SearchFilterBar({
  searchValue,
  onSearchChange,
  filterValue = 'all',
  onFilterChange,
  searchPlaceholder,
  filterOptions,
  filterLabel = 'Trạng thái',
  children,
  variant = 'card',
}: SearchFilterBarProps) {
  return (
    <div className={
      variant === 'inline'
        ? 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end'
        : 'bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4'
    }>

      {/* Search Input Box */}
      <div className="relative w-full sm:w-[280px]">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none shadow-sm transition bg-white"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {filterOptions && onFilterChange && (
          <div className="relative">
            <select
              value={filterValue}
              onChange={(e) => onFilterChange(e.target.value)}
              className="appearance-none rounded-xl border border-gray-200 bg-white pl-4 pr-10 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm cursor-pointer min-w-[160px]"
            >
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {filterLabel === 'Trạng thái' ? `Trạng thái: ${opt.label}` : `${filterLabel}: ${opt.label}`}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
