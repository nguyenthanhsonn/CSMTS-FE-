'use client';

import React, { useState, useEffect } from 'react';

export interface Column<T> {
  key: keyof T | 'actions';
  label: string;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  emptyText?: string;
  minHeight?: number;
}

export default function DataTable<T>({
  columns,
  data,
  pageSize = 8,
  emptyText = 'Không có dữ liệu',
  minHeight = 400,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when data changes (e.g. search/filter changes)
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / pageSize) || 1;
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }
    return pages;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const showingStart = data.length ? (currentPage - 1) * pageSize + 1 : 0;
  const showingEnd = Math.min(currentPage * pageSize, data.length);

  // Pad the table with empty rows if the data count is less than pageSize to avoid layout layout jumps/collapsing
  const emptyRowCount = Math.max(0, pageSize - paginatedData.length);

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col flex-1 mt-4"
      style={{ minHeight: minHeight ?? 480 }}
    >
      <div className="w-full flex-1 overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[700px] lg:min-w-full">
          <thead>
            <tr className="bg-[#F8F9FA]">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{ width: col.width }}
                  className="text-left py-4 px-4 font-semibold text-[#495057] border-r border-b border-[#E9ECEF] last:border-r-0 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-[#F8F9FA] transition duration-150">
                {columns.map((col, colIdx) => {
                  const cellValue = col.key !== 'actions' ? row[col.key as keyof T] : undefined;
                  return (
                    <td key={colIdx} className="py-4 px-4 text-[#1A1B1E] max-w-[300px] truncate border-r border-b border-[#E9ECEF] last:border-r-0">
                      {col.render ? col.render(cellValue, row) : (cellValue as any)?.toString() || '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-sm text-[#868E96] border-b border-[#E9ECEF]">
                  {emptyText}
                </td>
              </tr>
            )}
            {/* Render empty rows to keep high layout stretch */}
            {paginatedData.length > 0 &&
              Array.from({ length: emptyRowCount }).map((_, i) => (
                <tr key={`empty-${i}`}>
                  {columns.map((_, colIdx) => (
                    <td key={colIdx} className="px-4 py-4 border-r border-b border-[#E9ECEF]/60 last:border-r-0">
                      &nbsp;
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {data.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-auto">
          {/* Left statistics info */}
          <div className="text-xs sm:text-sm text-[#868E96]">
            Hiển thị <span className="font-semibold text-[#1A1B1E]">{showingStart}-{showingEnd}</span> của <span className="font-semibold text-[#1A1B1E]">{data.length}</span> kết quả
          </div>

          {/* Right pages navigator */}
          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            {/* Prev Button */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#DEE2E6] bg-white text-sm font-medium text-[#495057] transition hover:bg-[#F1F3F5] disabled:cursor-not-allowed disabled:opacity-40"
            >
              &larr;
            </button>

            {/* Page digits */}
            {getPageNumbers().map((page, idx) => {
              if (page === '...') {
                return (
                  <span
                    key={idx}
                    className="flex h-8 w-8 items-center justify-center text-sm text-[#868E96]"
                  >
                    ...
                  </span>
                );
              }

              const isCurrent = page === currentPage;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(page as number)}
                  className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition ${
                    isCurrent
                      ? 'bg-[#3B5BDB] text-white border-none shadow-md shadow-[#3B5BDB]/20'
                      : 'border border-[#DEE2E6] bg-white text-[#495057] hover:bg-[#F1F3F5]'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#DEE2E6] bg-white text-sm font-medium text-[#495057] transition hover:bg-[#F1F3F5] disabled:cursor-not-allowed disabled:opacity-40"
            >
              &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
