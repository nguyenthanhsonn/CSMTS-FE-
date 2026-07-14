'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Search } from 'lucide-react';
import { API_Admin } from '../../api/API_Admin';
import DataTable, { type Column } from '../../components/admin/DataTable';
import { useToast } from '../../components/common/ToastProvider';
import type { AdminEvaluationItem } from '../../types';
import { getUserFriendlyError, toArray } from '../../utils/adminData';

type EvaluationRow = AdminEvaluationItem & {
  studentName: string;
  className: string;
  classScore: number | null;
  finalScore?: number | null;
};

const normalizeStatus = (status?: string) => String(status || '').toLowerCase();

const statusConfig = {
  draft: { label: 'Đang điền', className: 'bg-gray-100 text-gray-700' },
  submitted: { label: 'Chờ lớp duyệt', className: 'bg-yellow-100 text-yellow-700' },
  class_approved: { label: 'Chờ quản trị viên phê duyệt', className: 'bg-blue-100 text-blue-700' },
  finalized: { label: 'Đã hoàn tất', className: 'bg-green-100 text-green-700' },
  rejected: { label: 'Bị trả về', className: 'bg-red-100 text-red-700' },
} as const;

function mapEvaluationRow(item: any): EvaluationRow {
  const student = item.student || item.user || item.studentUser || {};
  const classInfo = item.class || item.studentClass || item.classInfo || item.student?.class || {};

  return {
    ...item,
    id: item.id,
    studentId: item.studentId || item.student?.id || '',
    studentName: item.studentName || student.fullName || item.fullName || '—',
    className: item.className || classInfo.code || classInfo.name || item.classCode || '—',
    classScore: item.classScore ?? item.review?.classScore ?? null,
    finalScore: item.finalScore ?? null,
    status: item.status || 'class_approved',
  };
}

export function AdminEvaluations() {
  const toast = useToast();
  const [evaluations, setEvaluations] = useState<EvaluationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationRow | null>(null);
  const [finalScore, setFinalScore] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadEvaluations = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const response = await API_Admin.getAdminEvaluations({ status: 'class_approved' });
      setEvaluations(toArray(response as any).map(mapEvaluationRow));
    } catch (err) {
      setErrorMsg(getUserFriendlyError(err, 'Không thể tải danh sách phiếu chờ duyệt. Vui lòng thử lại sau.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvaluations();
  }, [loadEvaluations]);

  const filteredEvaluations = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    if (!normalizedKeyword) return evaluations;

    return evaluations.filter((item) =>
      [item.studentName, item.className, String(item.classScore ?? '')]
        .join(' ')
        .toLowerCase()
        .includes(normalizedKeyword)
    );
  }, [evaluations, keyword]);

  const openFinalizeModal = (evaluation: EvaluationRow) => {
    setSelectedEvaluation(evaluation);
    setFinalScore(String(evaluation.finalScore ?? evaluation.classScore ?? ''));
  };

  const closeFinalizeModal = () => {
    if (submitting) return;
    setSelectedEvaluation(null);
    setFinalScore('');
  };

  const handleFinalize = async () => {
    if (!selectedEvaluation) return;

    const trimmedScore = finalScore.trim();
    const parsedScore = trimmedScore === '' ? undefined : Number(trimmedScore);
    if (parsedScore !== undefined && (!Number.isFinite(parsedScore) || parsedScore < 0 || parsedScore > 100)) {
      toast.error('Điểm cuối phải nằm trong khoảng 0 đến 100.');
      return;
    }

    try {
      setSubmitting(true);
      await API_Admin.finalizeEvaluation(selectedEvaluation.id, parsedScore === undefined ? {} : { finalScore: parsedScore });
      toast.success('Đã phê duyệt phiếu đánh giá.');
      closeFinalizeModal();
      await loadEvaluations();
    } catch (err) {
      toast.error(getUserFriendlyError(err, 'Không thể phê duyệt phiếu. Vui lòng thử lại sau.'));
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<EvaluationRow>[] = [
    {
      key: 'studentName',
      label: 'Sinh viên',
      width: '34%',
      render: (value) => <span className="font-semibold text-[#1A1B1E]">{value}</span>,
    },
    {
      key: 'className',
      label: 'Lớp',
      width: '18%',
      render: (value) => <span className="font-mono text-sm font-semibold text-[#3B5BDB]">{value}</span>,
    },
    {
      key: 'classScore',
      label: 'Điểm lớp',
      width: '16%',
      render: (value) => <span className="font-bold text-[#1A1B1E]">{value ?? '—'}</span>,
    },
    {
      key: 'status',
      label: 'Trạng thái',
      width: '18%',
      render: (value) => {
        const config = statusConfig[normalizeStatus(value) as keyof typeof statusConfig] || statusConfig.class_approved;
        return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${config.className}`}>{config.label}</span>;
      },
    },
    {
      key: 'actions',
      label: 'Thao tác',
      width: '14%',
      render: (_, row) => (
        <button
          type="button"
          onClick={() => openFinalizeModal(row)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0B3A82] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#104E92]"
        >
          <CheckCircle2 size={14} />
          Phê duyệt
        </button>
      ),
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col bg-[#F8F9FA] p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Duyệt đánh giá rèn luyện</h1>
          <p className="mt-1 text-sm font-medium text-[#868E96]">Các phiếu đã được Lớp/CVHT duyệt và đang chờ quản trị viên phê duyệt cuối.</p>
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#868E96]" size={18} />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Tìm sinh viên, lớp..."
            className="w-full rounded-xl border border-[#DEE2E6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#1A1B1E] outline-none focus:border-[#4C6EF5] focus:ring-2 focus:ring-[#4C6EF5]/20"
          />
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[360px] flex-col items-center justify-center gap-2.5 rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-sm">
          <Loader2 className="animate-spin text-[#3B5BDB]" size={34} />
          <p className="text-sm font-semibold text-[#868E96]">Đang tải danh sách phiếu chờ duyệt...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredEvaluations}
          pageSize={8}
          emptyText="Không có phiếu nào đang chờ quản trị viên phê duyệt"
          minHeight={420}
          showSummary={false}
          paginationAlign="left"
        />
      )}

      {selectedEvaluation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-[#1A1B1E]">Phê duyệt phiếu đánh giá</h2>
            <p className="mt-1 text-sm font-medium text-[#868E96]">{selectedEvaluation.studentName} - {selectedEvaluation.className}</p>

            <label className="mt-5 block text-sm font-bold text-[#495057]">
              Điểm cuối
              <input
                type="number"
                min={0}
                max={100}
                value={finalScore}
                onChange={(event) => setFinalScore(event.target.value)}
                placeholder={selectedEvaluation.classScore === null ? 'Nhập điểm cuối' : String(selectedEvaluation.classScore)}
                className="mt-2 w-full rounded-xl border border-[#DEE2E6] px-3 py-2.5 text-sm font-semibold text-[#1A1B1E] outline-none focus:border-[#4C6EF5] focus:ring-2 focus:ring-[#4C6EF5]/20"
              />
            </label>
            <p className="mt-2 text-xs font-medium text-[#868E96]">Để trống nếu muốn BE tự lấy điểm lớp làm điểm cuối.</p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeFinalizeModal}
                disabled={submitting}
                className="cursor-pointer rounded-lg border border-[#DEE2E6] bg-white px-4 py-2 text-sm font-semibold text-[#495057] transition hover:bg-[#F8F9FA] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleFinalize}
                disabled={submitting}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#0B3A82] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#104E92] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting && <Loader2 className="animate-spin" size={15} />}
                Phê duyệt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEvaluations;
