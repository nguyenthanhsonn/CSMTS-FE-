'use client';

import { ClipboardCheck } from 'lucide-react';

export type StudentReviewStatus = 'not_submitted' | 'pending' | 'approved' | 'returned';

export interface CouncilStudentReview {
  id: string;
  code: string;
  fullName: string;
  selfScore: number | null;
  status: StudentReviewStatus;
}

interface StudentReviewTableProps {
  students: CouncilStudentReview[];
  onReview: (studentId: string) => void;
}

const statusMeta: Record<StudentReviewStatus, { label: string; className: string }> = {
  not_submitted: { label: 'Chưa nộp', className: 'bg-[#F1F3F5] text-[#495057]' },
  pending: { label: 'Chờ duyệt', className: 'bg-[#FFF9DB] text-[#E67700]' },
  approved: { label: 'Đã duyệt', className: 'bg-[#EBFBEE] text-[#2F9E44]' },
  returned: { label: 'Trả về', className: 'bg-[#FFF5F5] text-[#C92A2A]' },
};

export function getReviewStatusMeta(status: StudentReviewStatus) {
  return statusMeta[status];
}

export default function StudentReviewTable({ students, onReview }: StudentReviewTableProps) {
  return (
    <div className="ui-card flex min-h-[430px] flex-col overflow-hidden">
      <div className="w-full flex-1 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="bg-[#F8F9FA]">
              <th className="border-b border-r border-[#E9ECEF] px-4 py-4 text-left font-semibold text-[#495057]">Mã SV</th>
              <th className="border-b border-r border-[#E9ECEF] px-4 py-4 text-left font-semibold text-[#495057]">Họ tên</th>
              <th className="border-b border-r border-[#E9ECEF] px-4 py-4 text-left font-semibold text-[#495057]">SV tự chấm</th>
              <th className="border-b border-r border-[#E9ECEF] px-4 py-4 text-left font-semibold text-[#495057]">Trạng thái</th>
              <th className="border-b border-[#E9ECEF] px-4 py-4 text-left font-semibold text-[#495057]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const status = statusMeta[student.status];
              return (
                <tr key={student.id} className="transition hover:bg-[#F8F9FA]">
                  <td className="border-b border-r border-[#E9ECEF] px-4 py-4 font-semibold text-[#1A1B1E]">{student.code}</td>
                  <td className="border-b border-r border-[#E9ECEF] px-4 py-4 text-[#1A1B1E]">{student.fullName}</td>
                  <td className="border-b border-r border-[#E9ECEF] px-4 py-4 text-[#1A1B1E]">{student.selfScore ?? '-'}</td>
                  <td className="border-b border-r border-[#E9ECEF] px-4 py-4">
                    <span className={`ui-badge ${status.className}`}>{status.label}</span>
                  </td>
                  <td className="border-b border-[#E9ECEF] px-4 py-4">
                    {student.selfScore === null ? (
                      <span className="text-[#868E96]">-</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onReview(student.id)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#3B5BDB] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#4C6EF5]"
                      >
                        <ClipboardCheck size={15} />
                        Chấm
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {students.length === 0 && (
              <tr>
                <td colSpan={5} className="border-b border-[#E9ECEF] px-4 py-12 text-center text-sm text-[#868E96]">
                  Không có sinh viên phù hợp với bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
