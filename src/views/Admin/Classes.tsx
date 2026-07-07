'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { API_Admin } from '../../api/API_Admin';
import type { Class, ClassFormValues, Faculty, Major } from '../../types';
import ModalCreateClass from '../../components/admin/modalCreateClass';
import ModalConfirm from '../../components/common/modalConfirm';
import SearchFilterBar from '../../components/admin/SearchFilterBar';
import DataTable, { type Column } from '../../components/admin/DataTable';

export const AdminClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [facultyFilter, setFacultyFilter] = useState('');
  const [majorFilter, setMajorFilter] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const [facs, majs, clss] = await Promise.all([
        API_Admin.getFaculties(),
        API_Admin.getMajors(),
        API_Admin.getClasses(),
      ]);

      setFaculties((facs || []).map((f: any) => ({ id: f.id, code: f.code || '', name: f.name || '', isActive: f.isActive ?? true })));
      setMajors((majs || []).map((m: any) => ({ id: m.id, code: m.code || '', name: m.name || '', facultyId: m.facultyId || '', isActive: m.isActive ?? true })));
      setClasses((clss || []).map((c: any) => ({ id: c.id, code: c.code || '', name: c.name || '', facultyId: c.facultyId || '', majorId: c.majorId || '', isActive: c.isActive ?? true })));
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể tải thông tin danh mục lớp học.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredClasses = classes.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFaculty = facultyFilter ? c.facultyId === facultyFilter : true;
    const matchMajor = majorFilter ? c.majorId === majorFilter : true;

    return matchSearch && matchFaculty && matchMajor;
  });

  const getMajorName = (majorId: string) =>
    majors.find((m) => m.id === majorId)?.name ?? '—';

  const getFacultyName = (facultyId: string) =>
    faculties.find((f) => f.id === facultyId)?.name ?? '—';

  const handleDelete = (id: string) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    // TODO: Nối API DELETE /admin/classes/:id khi backend hoàn thiện
    if (pendingDeleteId) {
      setClasses((prev) => prev.filter((c) => c.id !== pendingDeleteId));
    }
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const handleOpenEdit = (cls: Class) => {
    setEditingClass(cls);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClass(null);
  };

  const handleSubmitModal = (values: ClassFormValues) => {
    // TODO: Nối API POST /admin/classes (tạo mới) và PATCH /admin/classes/:id (chỉnh sửa) khi backend hoàn thiện
    if (editingClass) {
      setClasses((prev) =>
        prev.map((c) =>
          c.id === editingClass.id ? { ...c, ...values } : c
        )
      );
    } else {
      const newClass: Class = {
        id: String(Date.now()),
        code: values.code,
        name: values.name,
        facultyId: values.facultyId,
        majorId: values.majorId,
        isActive: true,
      };
      setClasses((prev) => [...prev, newClass]);
    }
  };

  const columns: Column<Class>[] = [
    {
      key: 'code',
      label: 'Mã lớp',
      width: '15%',
      render: (val) => <span className="font-mono text-sm text-[#3B5BDB]">{val as string}</span>,
    },
    {
      key: 'name',
      label: 'Tên lớp',
      width: '30%',
      render: (val) => <span className="font-medium">{val as string}</span>,
    },
    {
      key: 'majorId',
      label: 'Ngành',
      width: '20%',
      render: (val) => <span className="text-gray-600">{getMajorName(val as string)}</span>,
    },
    {
      key: 'facultyId',
      label: 'Khoa',
      width: '20%',
      render: (val) => <span className="text-gray-600">{getFacultyName(val as string)}</span>,
    },
    {
      key: 'actions',
      label: 'Thao tác',
      width: '15%',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-2 cursor-pointer text-blue-600 hover:bg-blue-50 rounded-lg"
            title="Chỉnh sửa"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg"
            title="Xóa"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const facultyFilterOptions = [
    { label: 'Tất cả', value: '' },
    ...faculties
      .filter((f) => f.isActive)
      .map((f) => ({ label: f.name, value: f.id })),
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] p-6 bg-[#F8F9FA]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Lớp</h1>
        <button
          onClick={() => { setEditingClass(null); setShowModal(true); }}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-[#3B5BDB] text-white rounded-lg hover:bg-blue-700 font-semibold text-sm transition"
        >
          <Plus size={16} />
          Thêm lớp
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-xs sm:text-sm font-semibold">
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-2.5">
          <Loader2 className="animate-spin text-blue-600" size={32} />
          <p className="text-xs text-gray-500 font-semibold">Đang tải danh sách lớp học...</p>
        </div>
      ) : (
        <>
          <SearchFilterBar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            filterValue={facultyFilter}
            onFilterChange={(val) => {
              setFacultyFilter(val);
              setMajorFilter(''); // Reset major on faculty change
            }}
            searchPlaceholder="Tìm kiếm lớp..."
            filterOptions={facultyFilterOptions}
            filterLabel="Khoa"
          >
            {/* Major Filter select dropdown inside children */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Ngành:</span>
              <select
                value={majorFilter}
                onChange={(e) => setMajorFilter(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 bg-white"
                disabled={!facultyFilter}
              >
                <option value="">Tất cả</option>
                {majors
                  .filter((m) => m.isActive && (!facultyFilter || m.facultyId === facultyFilter))
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
              </select>
            </div>
          </SearchFilterBar>

          <div className="flex-1 mt-4">
            <DataTable
              columns={columns}
              data={filteredClasses}
              pageSize={8}
              emptyText="Không tìm thấy lớp nào"
              minHeight={400}
            />
          </div>
        </>
      )}

      <ModalCreateClass
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        editData={editingClass}
        faculties={faculties}
        majors={majors}
      />

      <ModalConfirm
        isOpen={confirmOpen}
        title="Xác nhận xóa"
        message={`Bạn có chắc muốn xóa lớp học ${classes.find((c) => c.id === pendingDeleteId)?.name}? Tất cả dữ liệu của lớp bao gồm cả sinh viên sẽ bị mất.`}
        targetName={classes.find((c) => c.id === pendingDeleteId)?.name}
        type="danger"
        confirmText="Xóa ngay"
        cancelText="Hủy bỏ"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingDeleteId(null);
        }}
      />
    </div>
  );
};

export default AdminClasses;
