'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { mockMajors, mockFaculties } from '../../services/mockData';
import type { Major, MajorFormValues } from '../../types';
import ModalCreateMajor from '../../components/admin/modelCreateMajor';
import ModalConfirm from '../../components/common/modalConfirm';
import SearchFilterBar from '../../components/admin/SearchFilterBar';
import DataTable, { type Column } from '../../components/admin/DataTable';

export const AdminMajors = () => {
  const [majors, setMajors] = useState<Major[]>(mockMajors);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [facultyFilter, setFacultyFilter] = useState('');

  const filteredMajors = majors.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFaculty = facultyFilter ? m.facultyId === facultyFilter : true;

    return matchSearch && matchFaculty;
  });

  const handleDelete = (id: string) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      setMajors((prev) => prev.filter((m) => m.id !== pendingDeleteId));
    }
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const getFacultyName = (facultyId: string) => {
    return mockFaculties.find((f) => f.id === facultyId)?.name || '';
  };

  const handleOpenModal = (major?: Major) => {
    if (major) {
      setEditingMajor(major);
    } else {
      setEditingMajor(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMajor(null);
  };

  const handleSubmitModal = (values: MajorFormValues) => {
    if (editingMajor) {
      setMajors((prev) =>
        prev.map((m) =>
          m.id === editingMajor.id
            ? { ...m, code: values.code, name: values.name, facultyId: values.facultyId }
            : m
        )
      );
    } else {
      const newMajor: Major = {
        id: Date.now().toString(),
        code: values.code,
        name: values.name,
        facultyId: values.facultyId,
        isActive: true,
      };
      setMajors((prev) => [...prev, newMajor]);
    }
  };

  const columns: Column<Major>[] = [
    {
      key: 'code',
      label: 'Mã ngành',
      width: '20%',
      render: (val) => <span className="font-mono">{val as string}</span>,
    },
    {
      key: 'name',
      label: 'Tên ngành',
      width: '40%',
      render: (val) => <span className="font-medium">{val as string}</span>,
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
      width: '20%',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenModal(row)}
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
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Ngành học</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-[#3B5BDB] text-white rounded-lg hover:bg-blue-700 font-semibold text-sm transition"
        >
          <Plus size={16} />
          Thêm ngành
        </button>
      </div>

      <SearchFilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={facultyFilter}
        onFilterChange={setFacultyFilter}
        searchPlaceholder="Tìm kiếm ngành học..."
        filterOptions={facultyFilterOptions}
        filterLabel="Khoa"
      />

      <div className="flex-1 mt-4">
        <DataTable
          columns={columns}
          data={filteredMajors}
          pageSize={8}
          emptyText="Không tìm thấy ngành học nào"
          minHeight={400}
        />
      </div>

      <ModalCreateMajor
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        editData={editingMajor}
      />

      <ModalConfirm
        isOpen={confirmOpen}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa ngành học ${majors.find((m) => m.id === pendingDeleteId)?.name}? Tất cả các lớp thuộc ngành học này cũng có thể bị ảnh hưởng.`}
        targetName={majors.find((m) => m.id === pendingDeleteId)?.name}
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

export default AdminMajors;
