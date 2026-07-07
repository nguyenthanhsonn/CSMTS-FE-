'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { API_Admin } from '../../api/API_Admin';
import { ClassListStudentItem, Class, Faculty, Major } from '../../types';
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

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<ClassListStudentItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteStudent, setPendingDeleteStudent] = useState<ClassListStudentItem | null>(null);

  // Load all metadata lists on mount
  useEffect(() => {
    const loadMetadata = async () => {
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
        setErrorMsg(err.message || 'Không thể tải thông tin danh mục.');
      } finally {
        setLoading(false);
      }
    };
    loadMetadata();
  }, []);

  const loadStudents = async (classId: string) => {
    if (!classId) {
      setStudents([]);
      return;
    }

    try {
      setStudentsLoading(true);
      setErrorMsg('');
      const data = await API_Admin.getClassStudents(classId);
      const normalized: ClassListStudentItem[] = (data || []).map((s: any) => ({
        id: s.id,
        studentCode: s.studentCode || '',
        fullName: s.fullName || '',
        dateOfBirth: s.dateOfBirth ? s.dateOfBirth.split('T')[0] : '',
        phoneNumber: s.phone || s.phoneNumber || '',
      }));
      setStudents(normalized);
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể tải danh sách sinh viên.');
    } finally {
      setStudentsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents(selectedClass);
  }, [selectedClass]);

  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (student: ClassListStudentItem) => {
    setPendingDeleteStudent(student);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteStudent || !selectedClass || actionLoading) return;

    try {
      setActionLoading(true);
      setErrorMsg('');
      await API_Admin.removeStudentFromClass(selectedClass, pendingDeleteStudent.id);
      setConfirmOpen(false);
      setPendingDeleteStudent(null);
      await loadStudents(selectedClass);
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể xóa sinh viên khỏi lớp.');
      setConfirmOpen(false);
      setPendingDeleteStudent(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddStudentSubmit = async (newStudentData: Omit<ClassListStudentItem, 'id'> & { classId: string }) => {
    if (actionLoading) return;

    try {
      setActionLoading(true);
      setErrorMsg('');

      let studentId = '';
      const searchRes = await API_Admin.getUsers({ keyword: newStudentData.studentCode });
      const usersList = Array.isArray(searchRes)
        ? searchRes
        : searchRes && 'items' in searchRes
        ? (searchRes as any).items
        : [];

      const existingUser = usersList.find(
        (u: any) =>
          u.studentCode === newStudentData.studentCode ||
          u.email?.startsWith(newStudentData.studentCode.toLowerCase())
      );

      if (existingUser) {
        studentId = existingUser.id;
      } else {
        const created = await API_Admin.createUser({
          email: `${newStudentData.studentCode.toLowerCase()}@csmts.local`,
          fullName: newStudentData.fullName,
          role: 'student',
          password: 'password123',
        });
        const createdUser = (created as any).data || created;
        studentId = createdUser.id;
      }

      // Calls assign to class api
      await API_Admin.addStudentToClass(newStudentData.classId, { studentId });

      if (newStudentData.classId === selectedClass) {
        await loadStudents(selectedClass);
      } else {
        const clsName = classes.find(c => c.id === newStudentData.classId)?.name || 'đã chọn';
        alert(`Đã thêm sinh viên vào lớp học ${clsName} thành công!`);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi thêm sinh viên vào lớp. Vui lòng kiểm tra lại mã sinh viên.');
    } finally {
      setActionLoading(false);
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
      render: (val) => {
        try {
          return <span>{val ? new Date(val as string).toLocaleDateString('vi-VN') : '—'}</span>;
        } catch { return <span>{val as string}</span>; }
      },
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

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-xs sm:text-sm font-semibold">
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-2.5 bg-white rounded-xl shadow-sm border p-6">
          <Loader2 className="animate-spin text-blue-600" size={32} />
          <p className="text-xs text-gray-500 font-semibold">Đang tải thông tin danh mục...</p>
        </div>
      ) : (
        <>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer bg-white"
                >
                  <option value="">-- Chọn khoa --</option>
                  {faculties.map((f) => (
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer bg-white"
                >
                  <option value="">-- Chọn ngành --</option>
                  {majors.filter(m => !selectedFaculty || m.facultyId === selectedFaculty).map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Lớp</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer bg-white"
                >
                  <option value="">-- Chọn lớp --</option>
                  {classes.filter(c => !selectedMajor || c.majorId === selectedMajor).map((c) => (
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

              {studentsLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[200px] gap-2">
                  <Loader2 className="animate-spin text-blue-600" size={28} />
                  <p className="text-xs text-gray-400 font-semibold">Đang tải danh sách sinh viên...</p>
                </div>
              ) : (
                <div className="flex-1">
                  <DataTable
                    columns={columns}
                    data={filteredStudents}
                    pageSize={5}
                    emptyText="Không có dữ liệu sinh viên"
                    minHeight={260}
                  />
                </div>
              )}
            </div>
          )}
        </>
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
        classes={classes}
      />
    </div>
  );
};

export default AdminClassList;
