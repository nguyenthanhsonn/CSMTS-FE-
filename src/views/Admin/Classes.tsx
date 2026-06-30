'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { mockClasses, mockMajors, mockFaculties } from '../../services/mockData';
import type { Class, ClassFormValues } from '../../types';
import ModalCreateClass from '../../components/admin/modalCreateClass';
import ModalConfirm from '../../components/common/modalConfirm';
import SearchFilterBar from '../../components/admin/SearchFilterBar';
import DataTable, { type Column } from '../../components/admin/DataTable';

export const AdminClasses = () => {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [facultyFilter, setFacultyFilter] = useState('');
  const [majorFilter, setMajorFilter] = useState('');

  const filteredClasses = classes.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFaculty = facultyFilter ? c.facultyId === facultyFilter : true;
    const matchMajor = majorFilter ? c.majorId === majorFilter : true;

    return matchSearch && matchFaculty && matchMajor;
  });

  const getMajorName = (majorId: string) =>
    mockMajors.find((m) => m.id === majorId)?.name ?? '—';

  const getFacultyName = (facultyId: string) =>
    mockFaculties.find((f) => f.id === facultyId)?.name ?? '—';

  const handleDelete = (id: string) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
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
    ...mockFaculties
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
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!facultyFilter}
          >
            <option value="">Tất cả</option>
            {mockMajors
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

      <ModalCreateClass
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        editData={editingClass}
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
