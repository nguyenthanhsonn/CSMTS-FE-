'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Edit, Loader2, Lock, Plus, Power, Unlock } from 'lucide-react';
import { API_Admin } from '../../api/API_Admin';
import type { AdminSemester, SemesterPayload } from '../../types';
import DataTable, { type Column } from '../../components/admin/DataTable';
import ModalConfirm from '../../components/common/modalConfirm';
import { getUserFriendlyError, toArray } from '../../utils/adminData';
import { useAdminUrlState } from '../../utils/adminUrlState';

type SemesterFormState = {
  year: string;
  semester: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

const defaultForm: SemesterFormState = {
  year: String(new Date().getFullYear()),
  semester: 'HK1',
  startDate: '',
  endDate: '',
  isActive: false,
};

const semesterLabels: Record<string, string> = {
  HK1: 'Học kỳ 1',
  HK2: 'Học kỳ 2',
  SUMMER: 'Học kỳ hè',
};

const toDateInput = (value?: string | null) => {
  if (!value) return '';
  return value.split('T')[0] || '';
};

const formatDate = (value?: string | null) => {
  if (!value) return '—';
  try {
    return new Intl.DateTimeFormat('vi-VN').format(new Date(value));
  } catch {
    return value;
  }
};

const normalizeSemester = (item: any): AdminSemester => ({
  id: item.id || '',
  year: Number(item.year) || new Date().getFullYear(),
  academicYear: item.academicYear || `${item.year}-${Number(item.year) + 1}`,
  semester: item.semester || 'HK1',
  semesterName: item.semesterName || semesterLabels[item.semester] || item.semester,
  name: item.name,
  startDate: item.startDate || '',
  endDate: item.endDate || '',  isActive: item.isActive ?? false,
  hasEvaluationForms: item.hasEvaluationForms ?? false,
});

const validateSemesterForm = (values: SemesterFormState) => {
  if (!values.year.trim() || Number.isNaN(Number(values.year))) return 'Vui lòng nhập năm bắt đầu hợp lệ.';
  if (!values.semester) return 'Vui lòng chọn học kỳ.';
  if (!values.startDate) return 'Vui lòng chọn ngày bắt đầu.';
  if (!values.endDate) return 'Vui lòng chọn ngày kết thúc.';

  if (new Date(values.startDate).getTime() > new Date(values.endDate).getTime()) {
    return 'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc.';
  }

  return '';
};

function SemesterModal({
  open,
  editing,
  onClose,
  onSubmit,
  loading,
}: {
  open: boolean;
  editing: AdminSemester | null;
  onClose: () => void;
  onSubmit: (payload: SemesterPayload) => void;
  loading: boolean;
}) {
  const [values, setValues] = useState<SemesterFormState>(defaultForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setError('');
    setValues(
      editing
        ? {
            year: String(editing.year),
            semester: editing.semester,
            startDate: toDateInput(editing.startDate),
            endDate: toDateInput(editing.endDate),
            isActive: editing.isActive,
          }
        : defaultForm
    );
  }, [editing, open]);

  if (!open) return null;

  const setField = (key: keyof SemesterFormState, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const validationError = validateSemesterForm(values);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit({
      year: Number(values.year),
      semester: values.semester,
      startDate: values.startDate,
      endDate: values.endDate,
      isActive: values.isActive,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{editing ? 'Sửa học kỳ' : 'Tạo học kỳ mới'}</h2>
          </div>
          <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-500 hover:bg-gray-100">
            Đóng
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-gray-700">
            Năm bắt đầu
            <input
              value={values.year}
              onChange={(e) => setField('year', e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Học kỳ
            <select
              value={values.semester}
              onChange={(e) => setField('semester', e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="HK1">Học kỳ 1</option>
              <option value="HK2">Học kỳ 2</option>
              <option value="SUMMER">Học kỳ hè</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Ngày bắt đầu
            <input
              type="date"
              value={values.startDate}
              onChange={(e) => setField('startDate', e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </label>
          <label className="text-sm font-semibold text-gray-700">
            Ngày kết thúc
            <input
              type="date"
              value={values.endDate}
              onChange={(e) => setField('endDate', e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </label>
          {!editing && (
            <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={values.isActive}
                onChange={(e) => setField('isActive', e.target.checked)}
                className="h-4 w-4"
              />
              Mở học kỳ sau khi tạo
            </label>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-[#0B3A82] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#104E92] disabled:opacity-60"
          >
            {loading ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </div>
  );
}

export const AdminSemesters = () => {
  const { getPage, getValue, setQuery } = useAdminUrlState({ status: 'all' });
  const [semesters, setSemesters] = useState<AdminSemester[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [yearFilter, setYearFilter] = useState(() => getValue('year'));
  const [statusFilter, setStatusFilter] = useState(() => getValue('status', 'all'));
  const [page, setPage] = useState(() => getPage());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSemester, setEditingSemester] = useState<AdminSemester | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<AdminSemester | null>(null);

  const loadSemesters = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await API_Admin.getSemesters({
        page: 1,
        limit: 100,
        year: yearFilter ? Number(yearFilter) : undefined,
        isActive: statusFilter === 'all' ? undefined : statusFilter === 'active',
      });
      setSemesters(toArray((data as any)?.items || data).map(normalizeSemester));
    } catch (err: any) {
      setErrorMsg(getUserFriendlyError(err, 'Không thể tải danh sách học kỳ.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSemesters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearFilter, statusFilter]);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 8 }, (_, index) => String(currentYear - 2 + index));
  }, []);

  const handleOpenCreate = () => {
    setEditingSemester(null);
    setModalOpen(true);
  };

  const handleOpenEdit = async (semester: AdminSemester) => {
    try {
      setActionLoading(true);
      setErrorMsg('');
      const detail = await API_Admin.getSemesterById(semester.id);
      setEditingSemester(normalizeSemester(detail));
      setModalOpen(true);
    } catch (err: any) {
      setErrorMsg(getUserFriendlyError(err, 'Không thể tải chi tiết học kỳ.'));
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmit = async (payload: SemesterPayload) => {
    try {
      setActionLoading(true);
      setErrorMsg('');
      if (editingSemester) {
        await API_Admin.updateSemester(editingSemester.id, payload);
      } else {
        await API_Admin.createSemester(payload);
      }
      setModalOpen(false);
      setEditingSemester(null);
      await loadSemesters();
    } catch (err: any) {
      setErrorMsg(getUserFriendlyError(err, 'Không thể lưu học kỳ. Vui lòng kiểm tra lại thông tin.'));
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmToggle = async () => {
    if (!confirmTarget) return;

    try {
      setActionLoading(true);
      setErrorMsg('');
      await API_Admin.toggleSemesterActive(confirmTarget.id, { isActive: !confirmTarget.isActive });
      setConfirmTarget(null);
      await loadSemesters();
    } catch (err: any) {
      setErrorMsg(getUserFriendlyError(err, 'Không thể cập nhật trạng thái học kỳ.'));
    } finally {
      setActionLoading(false);
    }
  };

  const handleYearChange = (value: string) => {
    setYearFilter(value);
    setPage(1);
    setQuery({ year: value, page: null }, { resetPage: true });
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
    setQuery({ status: value, page: null }, { resetPage: true });
  };

  const columns: Column<AdminSemester>[] = [
    {
      key: 'academicYear',
      label: 'Năm học',
      width: '15%',
      render: (value) => <span className="font-semibold text-gray-900">{value as string}</span>,
    },
    {
      key: 'semester',
      label: 'Học kỳ',
      width: '12%',
      render: (_, row) => <span>{row.semesterName || semesterLabels[row.semester] || row.semester}</span>,
    },
    {
      key: 'startDate',
      label: 'Bắt đầu',
      width: '14%',
      render: (value) => <span>{formatDate(value as string)}</span>,
    },
    {
      key: 'endDate',
      label: 'Kết thúc',
      width: '14%',
      render: (value) => <span>{formatDate(value as string)}</span>,
    },
    {
      key: 'isActive',
      label: 'Trạng thái',
      width: '15%',
      render: (value) => (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${value ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
          {value ? <Unlock size={13} /> : <Lock size={13} />}
          {value ? 'Đang mở' : 'Đã khóa'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Thao tác',
      width: '24%',
      render: (_, row) => (
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleOpenEdit(row)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50"
          >
            <Edit size={14} />
            Sửa
          </button>
          <button
            onClick={() => setConfirmTarget(row)}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${row.isActive ? 'text-amber-700 hover:bg-amber-50' : 'text-emerald-700 hover:bg-emerald-50'}`}
          >
            <Power size={14} />
            {row.isActive ? 'Đóng kỳ' : 'Mở kỳ này'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="relative flex flex-col px-4 sm:px-6 py-4 sm:py-6 bg-[#F8F9FA] pb-28 sm:pb-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Quản lý Học kỳ</h1>
          <p className="mt-1 text-sm text-gray-500">Tạo, chỉnh sửa và mở/đóng kỳ đánh giá rèn luyện.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={yearFilter}
            onChange={(e) => handleYearChange(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">Năm: Tất cả</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}-{Number(year) + 1}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">Trạng thái: Tất cả</option>
            <option value="active">Đang mở</option>
            <option value="inactive">Đã khóa</option>
          </select>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-2.5">
          <Loader2 className="animate-spin text-blue-600" size={32} />
          <p className="text-xs font-semibold text-gray-500">Đang tải danh sách học kỳ...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={semesters}
          pageSize={10}
          emptyText="Chưa có học kỳ nào"
          showSummary={false}
          paginationAlign="left"
          currentPage={page}
          onPageChange={(nextPage) => {
            setPage(nextPage);
            setQuery({ page: nextPage === 1 ? null : nextPage });
          }}
        />
      )}

      <button
        onClick={handleOpenCreate}
        className="fixed bottom-8 right-8 z-20 flex cursor-pointer items-center gap-2 rounded-full bg-[#0B3A82] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#104E92]"
      >
        <Plus size={18} />
        Tạo học kỳ mới
      </button>

      <SemesterModal
        open={modalOpen}
        editing={editingSemester}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={actionLoading}
      />

      <ModalConfirm
        isOpen={Boolean(confirmTarget)}
        title={confirmTarget?.isActive ? 'Đóng học kỳ' : 'Mở học kỳ này'}
        message={
          confirmTarget?.isActive
            ? 'Đóng học kỳ này sẽ khóa toàn bộ phiếu đánh giá thuộc học kỳ đó. Sinh viên sẽ không thể chỉnh sửa phiếu nữa. Tiếp tục?'
            : 'Mở học kỳ này sẽ tự động khóa toàn bộ phiếu đánh giá của học kỳ đang mở hiện tại. Sinh viên sẽ không thể chỉnh sửa phiếu cũ nữa. Tiếp tục?'
        }
        type="warning"
        confirmText={confirmTarget?.isActive ? 'Đóng kỳ' : 'Mở kỳ'}
        cancelText="Hủy"
        onConfirm={handleConfirmToggle}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
};

export default AdminSemesters;
