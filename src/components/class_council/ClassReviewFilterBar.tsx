'use client';

import { Search } from 'lucide-react';
import CustomSelect from '../common/CustomSelect';

export type ReviewStatusFilter = 'all' | 'not_submitted' | 'pending' | 'approved' | 'returned';

interface ClassReviewFilterBarProps {
  semester: string;
  status: ReviewStatusFilter;
  keyword: string;
  onSemesterChange: (value: string) => void;
  onStatusChange: (value: ReviewStatusFilter) => void;
  onKeywordChange: (value: string) => void;
}

const semesterOptions = [
  { id: '2025-2026-hk1', name: 'HK1 2025-2026' },
  { id: '2024-2025-hk2', name: 'HK2 2024-2025' },
  { id: '2024-2025-hk1', name: 'HK1 2024-2025' },
];

const statusOptions = [
  { id: 'all', name: 'Tất cả' },
  { id: 'not_submitted', name: 'Chưa nộp' },
  { id: 'pending', name: 'Chờ duyệt' },
  { id: 'approved', name: 'Đã duyệt' },
  { id: 'returned', name: 'Trả về' },
];

export default function ClassReviewFilterBar({
  semester,
  status,
  keyword,
  onSemesterChange,
  onStatusChange,
  onKeywordChange,
}: ClassReviewFilterBarProps) {
  return (
    <div className="ui-card p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[220px_220px_1fr]">
        <CustomSelect
          label="Học kỳ"
          value={semester}
          onChange={onSemesterChange}
          options={semesterOptions}
        />
        <CustomSelect
          label="Trạng thái"
          value={status}
          onChange={(value) => onStatusChange(value as ReviewStatusFilter)}
          options={statusOptions}
        />
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-600">Tìm kiếm</label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#868E96]" />
            <input
              value={keyword}
              onChange={(event) => onKeywordChange(event.target.value)}
              className="h-10 w-full rounded-lg border border-[#DEE2E6] bg-white pl-9 pr-3 text-sm text-[#1A1B1E] outline-none transition focus:border-[#4C6EF5] focus:ring-2 focus:ring-[#4C6EF5]/20"
              placeholder="Tìm theo tên hoặc MSSV"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
