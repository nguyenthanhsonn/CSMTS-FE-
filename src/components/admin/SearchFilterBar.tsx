'use client';

import React from 'react';
import { Search } from 'lucide-react';

export interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  searchPlaceholder: string;
  filterOptions?: { label: string; value: string }[];
  filterLabel?: string;
  children?: React.ReactNode;
}

export default function SearchFilterBar({
  searchValue,
  onSearchChange,
  filterValue = 'all',
  onFilterChange,
  searchPlaceholder,
  filterOptions,
  filterLabel = 'Trạng thái',
  children,
}: SearchFilterBarProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">

      {/* Search Input Box */}
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {filterOptions && onFilterChange && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">{filterLabel}:</span>
            <select
              value={filterValue}
              onChange={(e) => onFilterChange(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {filterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
