'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import ClassReviewFilterBar, { type ReviewStatusFilter } from '@/components/class_council/ClassReviewFilterBar';
import ClassStatsWidget from '@/components/class_council/ClassStatsWidget';
import StudentReviewTable, { type CouncilStudentReview } from '@/components/class_council/StudentReviewTable';

const mockClassNames: Record<string, string> = {
  cntt01: 'Lớp CNTT01',
  cntt02: 'Lớp CNTT02',
};

const mockStudents: Record<string, CouncilStudentReview[]> = {
  cntt01: [
    { id: 'sv001', code: '2251120001', fullName: 'Nguyễn An Bình', selfScore: 82, status: 'pending' },
    { id: 'sv002', code: '2251120002', fullName: 'Trần Minh Châu', selfScore: 88, status: 'approved' },
    { id: 'sv003', code: '2251120003', fullName: 'Lê Quốc Duy', selfScore: null, status: 'not_submitted' },
    { id: 'sv004', code: '2251120004', fullName: 'Phạm Hoàng Gia Hân', selfScore: 76, status: 'returned' },
    { id: 'sv005', code: '2251120005', fullName: 'Võ Nhật Khang', selfScore: 91, status: 'pending' },
  ],
  cntt02: [
    { id: 'sv101', code: '2251120101', fullName: 'Đỗ Thanh Mai', selfScore: 84, status: 'approved' },
    { id: 'sv102', code: '2251120102', fullName: 'Bùi Gia Phúc', selfScore: null, status: 'not_submitted' },
  ],
};

const getParam = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value ?? '');

export function StudentListView() {
  const router = useRouter();
  const params = useParams();
  const classId = getParam(params.classId);
  const [loading, setLoading] = useState(true);
  const [semester, setSemester] = useState('2025-2026-hk1');
  const [status, setStatus] = useState<ReviewStatusFilter>('all');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    // TODO: nối API lấy danh sách sinh viên và trạng thái phiếu theo lớp/học kỳ.
    const timer = window.setTimeout(() => setLoading(false), 250);
    return () => window.clearTimeout(timer);
  }, [classId, semester]);

  const students = mockStudents[classId] ?? [];
  const filteredStudents = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    return students.filter((student) => {
      const matchStatus = status === 'all' || student.status === status;
      const matchKeyword =
        !normalizedKeyword ||
        student.fullName.toLowerCase().includes(normalizedKeyword) ||
        student.code.toLowerCase().includes(normalizedKeyword);
      return matchStatus && matchKeyword;
    });
  }, [students, status, keyword]);

  const submitted = students.filter((student) => student.selfScore !== null).length;
  const approved = students.filter((student) => student.status === 'approved').length;
  const notSubmitted = students.filter((student) => student.status === 'not_submitted').length;
  const hasPending = students.some((student) => student.status === 'pending');

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => router.push('/class_council')}
            className="mb-2 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#3B5BDB] hover:text-[#4C6EF5]"
          >
            <ArrowLeft size={16} />
            Quay lại danh sách lớp
          </button>
          <h1 className="ui-page-title">{mockClassNames[classId] ?? 'Lớp phụ trách'}</h1>
          <p className="mt-1 text-sm text-[#868E96]">Danh sách sinh viên và trạng thái nộp phiếu.</p>
        </div>
        <button
          type="button"
          disabled={hasPending || students.length === 0}
          title={hasPending ? 'Còn sinh viên ở trạng thái Chờ duyệt chưa xử lý xong.' : undefined}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3B5BDB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4C6EF5] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={16} />
          Gửi cả lớp lên Khoa
        </button>
      </div>

      {loading ? (
        <div className="flex min-h-[360px] flex-col items-center justify-center gap-2.5 rounded-xl border border-[#E9ECEF] bg-white p-6 shadow-sm">
          <Loader2 className="animate-spin text-[#3B5BDB]" size={34} />
          <p className="text-sm font-semibold text-[#868E96]">Đang tải danh sách sinh viên...</p>
        </div>
      ) : (
        <>
          <ClassStatsWidget
            total={students.length}
            submitted={submitted}
            approved={approved}
            notSubmitted={notSubmitted}
          />
          <ClassReviewFilterBar
            semester={semester}
            status={status}
            keyword={keyword}
            onSemesterChange={setSemester}
            onStatusChange={setStatus}
            onKeywordChange={setKeyword}
          />
          <StudentReviewTable
            students={filteredStudents}
            onReview={(studentId) => router.push(`/class_council/${classId}/${studentId}`)}
          />
        </>
      )}
    </div>
  );
}
