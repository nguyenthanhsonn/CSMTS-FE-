'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { mockFaculties } from '../../services/mockData';
import type { Faculty, FacultyFormValues } from '../../types';
import ModalCreateFaculty from '../../components/admin/modalCreateFaculty';
import ModalConfirm from '../../components/common/modalConfirm';
import SearchFilterBar from '../../components/admin/SearchFilterBar';
import DataTable, { type Column } from '../../components/admin/DataTable';

export const AdminFaculties = () => {
  const [faculties, setFaculties] = useState<Faculty[]>(mockFaculties);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState('all');

  const filteredFaculties = faculties.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
        ? f.isActive
        : !f.isActive;

    return matchSearch && matchStatus;
  });

  const handleToggleActive = (id: string) => {
    setFaculties((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isActive: !f.isActive } : f))
    );
  };

  const handleDelete = (id: string) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      setFaculties((prev) => prev.filter((f) => f.id !== pendingDeleteId));
    }
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const handleOpenModal = (faculty?: Faculty) => {
    if (faculty) {
      setEditingFaculty(faculty);
    } else {
      setEditingFaculty(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFaculty(null);
  };

  const handleSubmitModal = (values: FacultyFormValues) => {
    if (editingFaculty) {
      setFaculties((prev) =>
        prev.map((f) =>
          f.id === editingFaculty.id
            ? { ...f, code: values.code, name: values.name }
            : f
        )
      );
    } else {
      const newFaculty: Faculty = {
        id: Date.now().toString(),
        code: values.code,
        name: values.name,
        isActive: true,
      };
      setFaculties((prev) => [...prev, newFaculty]);
    }
  };

  const columns: Column<Faculty>[] = [
    {
      key: 'code',
      label: 'Mã khoa',
      width: '20%',
      render: (val) => <span className="font-mono">{val as string}</span>,
    },
    {
      key: 'name',
      label: 'Tên khoa',
      width: '40%',
      render: (val) => <span className="font-medium">{val as string}</span>,
    },
    {
      key: 'isActive',
      label: 'Trạng thái',
      width: '20%',
      render: (val) => (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            val
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {val ? 'Hoạt động' : 'Ẩn'}
        </span>
      ),
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
            onClick={() => handleToggleActive(row.id)}
            className="p-2 cursor-pointer text-orange-600 hover:bg-orange-50 rounded-lg"
            title={row.isActive ? 'Ẩn khoa' : 'Hiện khoa'}
          >
            {row.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
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

  const filterOptions = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Hoạt động', value: 'active' },
    { label: 'Đang ẩn', value: 'inactive' },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] p-6 bg-[#F8F9FA]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Khoa</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-[#3B5BDB] text-white rounded-lg hover:bg-blue-700 font-semibold text-sm transition"
        >
          <Plus size={16} />
          Thêm khoa
        </button>
      </div>

      <SearchFilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        searchPlaceholder="Tìm kiếm khoa..."
        filterOptions={filterOptions}
        filterLabel="Trạng thái"
      />

      <div className="flex-1 mt-4">
        <DataTable
          columns={columns}
          data={filteredFaculties}
          pageSize={8}
          emptyText="Không tìm thấy khoa nào"
          minHeight={400}
        />
      </div>

      <ModalCreateFaculty
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        editData={editingFaculty}
      />

      <ModalConfirm
        isOpen={confirmOpen}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa khoa ${faculties.find((f) => f.id === pendingDeleteId)?.name}? Dữ liệu đã xóa không thể khôi phục.`}
        targetName={faculties.find((f) => f.id === pendingDeleteId)?.name}
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

export default AdminFaculties;
