'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { mockClasses, mockMajors, mockFaculties } from '../../services/mockData';
import { ClassListStudentItem } from '../../types';
import ModalConfirm from '../../components/common/modalConfirm';
import SearchFilterBar from '../../components/admin/SearchFilterBar';
import DataTable, { type Column } from '../../components/admin/DataTable';
import ModalAddStudent from '../../components/admin/modalAddStudent';

export const AdminClassList = () => {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [students, setStudents] = useState<ClassListStudentItem[]>([
    { id: '1', studentCode: 'SV001', fullName: 'Nguyễn Văn A', dateOfBirth: '2003-05-15', phoneNumber: '0123456789' },
    { id: '2', studentCode: 'SV002', fullName: 'Trần Thị B', dateOfBirth: '2003-08-20', phoneNumber: '0987654321' },
    { id: '3', studentCode: 'SV003', fullName: 'Lê Văn C', dateOfBirth: '2003-03-10', phoneNumber: '0912345678' },
  ]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteStudent, setPendingDeleteStudent] = useState<ClassListStudentItem | null>(null);

  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (student: ClassListStudentItem) => {
    setPendingDeleteStudent(student);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteStudent) {
      setStudents((prev) => prev.filter((s) => s.id !== pendingDeleteStudent.id));
    }
    setConfirmOpen(false);
    setPendingDeleteStudent(null);
  };

  const handleAddStudentSubmit = (newStudentData: Omit<ClassListStudentItem, 'id'> & { classId: string }) => {
    if (newStudentData.classId === selectedClass) {
      const newStudent: ClassListStudentItem = {
        id: String(Date.now()),
        studentCode: newStudentData.studentCode,
        fullName: newStudentData.fullName,
        dateOfBirth: newStudentData.dateOfBirth,
        phoneNumber: newStudentData.phoneNumber,
      };
      setStudents((prev) => [...prev, newStudent]);
    } else {
      alert(`Đã thêm sinh viên vào lớp học ${mockClasses.find(c => c.id === newStudentData.classId)?.name} thành công!`);
    }
  };

  const columns: Column<ClassListStudentItem>[] = [
    {
      key: 'studentCode',
      label: 'Mã SV',
      width: '20%',
      render: (val) => <span className="font-mono text-sm">{val as string}</span>,
    },
    {
      key: 'fullName',
      label: 'Họ tên',
      width: '35%',
      render: (val) => <span className="font-medium text-[#1A1B1E]">{val as string}</span>,
    },
    {
      key: 'dateOfBirth',
      label: 'Ngày sinh',
      width: '20%',
      render: (val) => <span>{new Date(val as string).toLocaleDateString('vi-VN')}</span>,
    },
    {
      key: 'phoneNumber',
      label: 'Số ĐT',
      width: '15%',
      render: (val) => <span className="text-gray-600">{val as string}</span>,
    },
    {
      key: 'actions',
      label: 'Thao tác',
      width: '10%',
      render: (_, row) => (
        <button
          onClick={() => handleDeleteClick(row)}
          className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg"
          title="Xóa khỏi lớp"
        >
          <Trash2 size={18} />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] p-4 bg-[#F8F9FA] gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Danh sách lớp</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h2 className="text-sm font-semibold mb-3 text-gray-800">Chọn lớp</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Khoa</label>
            <select
              value={selectedFaculty}
              onChange={(e) => {
                setSelectedFaculty(e.target.value);
                setSelectedMajor('');
                setSelectedClass('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="">-- Chọn khoa --</option>
              {mockFaculties.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Ngành</label>
            <select
              value={selectedMajor}
              onChange={(e) => {
                setSelectedMajor(e.target.value);
                setSelectedClass('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="">-- Chọn ngành --</option>
              {mockMajors.filter(m => !selectedFaculty || m.facultyId === selectedFaculty).map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Lớp</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="">-- Chọn lớp --</option>
              {mockClasses.filter(c => !selectedMajor || c.majorId === selectedMajor).map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedClass && (
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Danh sách sinh viên</h2>
            <button
              onClick={() => setAddModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 px-3 py-1.5 bg-[#3B5BDB] text-white rounded-lg hover:bg-blue-700 font-semibold text-xs transition"
            >
              <Plus size={14} />
              Thêm sinh viên
            </button>
          </div>

          <SearchFilterBar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Tìm kiếm sinh viên..."
          />

          <div className="flex-1">
            <DataTable
              columns={columns}
              data={filteredStudents}
              pageSize={5}
              emptyText="Không có dữ liệu sinh viên"
              minHeight={260}
            />
          </div>
        </div>
      )}

      <ModalConfirm
        isOpen={confirmOpen}
        title="Xóa sinh viên khỏi lớp"
        message={`Bạn có chắc chắn muốn xóa sinh viên ${pendingDeleteStudent?.fullName} ra khỏi lớp học hiện tại không?`}
        targetName={pendingDeleteStudent?.fullName}
        type="danger"
        confirmText="Xóa khỏi lớp"
        cancelText="Hủy bỏ"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingDeleteStudent(null);
        }}
      />

      <ModalAddStudent
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddStudentSubmit}
        defaultClassId={selectedClass}
      />
    </div>
  );
};

export default AdminClassList;
