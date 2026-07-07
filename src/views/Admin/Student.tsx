'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Lock, Unlock } from 'lucide-react';
import ModalCreateStudent from '../../components/admin/modalCreateStudent';
import { StudentManagementItem, StudentFormValues } from '../../types';
import ModalConfirm from '../../components/common/modalConfirm';
import SearchFilterBar from '../../components/admin/SearchFilterBar';
import DataTable, { type Column } from '../../components/admin/DataTable';
import { API_Admin } from '../../api/API_Admin';
import type { Faculty, Major, Class } from '../../types';

export const AdminUsers = () => {
  const [students, setStudents] = useState<StudentManagementItem[]>([
    { id: '1', username: 'sv001', fullName: 'Nguyễn Văn A', role: 'student', studentCode: '2021001', isActive: true },
    { id: '2', username: 'admin', fullName: 'Quản trị viên', role: 'admin', email: 'admin@uni.vn', isActive: true },
    { id: '3', username: 'sv002', fullName: 'Trần Thị B', role: 'student', studentCode: '2021002', isActive: true },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentFormValues | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Confirmation state
  const [confirmType, setConfirmType] = useState<'delete' | 'lock' | 'unlock' | null>(null);
  const [pendingStudent, setPendingStudent] = useState<StudentManagementItem | null>(null);
  const [lockReason, setLockReason] = useState('');

  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const [usersRes, facsRes, majsRes, clssRes] = await Promise.all([
          API_Admin.getUsers(),
          API_Admin.getFaculties(),
          API_Admin.getMajors(),
          API_Admin.getClasses(),
        ]);

        const data = (usersRes as any).data || usersRes;
        const list = Array.isArray(data) ? data : (data && 'items' in data ? data.items : []);
        const mapped = list.map((u: any) => ({
          id: u.id,
          username: u.email ? u.email.split('@')[0] : 'unknown',
          fullName: u.fullName,
          role: u.role,
          email: u.email,
          phone: u.phone,
          dateOfBirth: u.dateOfBirth,
          studentCode: u.studentCode || '',
          isActive: u.isActive,
        }));
        setStudents(mapped);

        setFaculties((facsRes || []).map((f: any) => ({ id: f.id, code: f.code || '', name: f.name || '', isActive: f.isActive ?? true })));
        setMajors((majsRes || []).map((m: any) => ({ id: m.id, code: m.code || '', name: m.name || '', facultyId: m.facultyId || '', isActive: m.isActive ?? true })));
        setClasses((clssRes || []).map((c: any) => ({ id: c.id, code: c.code || '', name: c.name || '', facultyId: c.facultyId || '', majorId: c.majorId || '', isActive: c.isActive ?? true })));
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((s) => {
    // Only show students, not admins in student management list
    if (s.role !== 'student') return false;

    const matchSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
        ? s.isActive
        : !s.isActive;

    return matchSearch && matchStatus;
  });

  const handleToggleActive = (id: string) => {
    const s = students.find((item) => item.id === id);
    if (!s) return;
    setPendingStudent(s);
    setConfirmType(s.isActive ? 'lock' : 'unlock');
  };

  const handleDelete = (id: string) => {
    const s = students.find((item) => item.id === id);
    if (!s) return;
    setPendingStudent(s);
    setConfirmType('delete');
  };

  const handleConfirmAction = () => {
    if (!pendingStudent || !confirmType) return;

    if (confirmType === 'delete') {
      // TODO: Nối API DELETE /users/:id khi backend hoàn thiện
      setStudents((prev) => prev.filter((s) => s.id !== pendingStudent.id));
    } else {
      // TODO: Nối API PATCH /users/:id/status (khóa/mở khóa) khi backend hoàn thiện
      if (confirmType === 'lock' && lockReason) {
        console.log(`Tài khoản ${pendingStudent.username} bị khóa với lý do: ${lockReason}`);
      }
      setStudents((prev) =>
        prev.map((s) =>
          s.id === pendingStudent.id ? { ...s, isActive: !s.isActive } : s
        )
      );
    }
    setConfirmType(null);
    setPendingStudent(null);
    setLockReason('');
  };

  const handleOpenEdit = (s: StudentManagementItem) => {
    setEditingStudent({
      username: s.username,
      fullName: s.fullName,
      password: '',
      email: s.email ?? '',
      phone: s.phone ?? '',
      dateOfBirth: s.dateOfBirth ?? '',
      studentCode: s.studentCode ?? '',
      facultyId: s.facultyId ?? '',
      majorId: s.majorId ?? '',
      classId: s.classId ?? '',
      admissionYear: s.admissionYear ?? String(new Date().getFullYear()),
      role: s.role,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };

  const handleSubmitModal = async (values: StudentFormValues) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken !== 'mock-access-token') {
      try {
        if (editingStudent) {
          // TODO: Nối API PATCH /users/:id khi backend hoàn thiện
          setStudents((prev) =>
            prev.map((s) =>
              s.username === editingStudent.username
                ? { ...s, ...values }
                : s
            )
          );
        } else {
          // Call API to create a new user on backend
          const res = await API_Admin.createUser(accessToken, {
            email: values.email || `${values.username}@csmts.local`,
            fullName: values.fullName,
            password: values.password || 'password123',
            role: values.role || 'student',
          });
          const created = res.data || res;
          
          const newStudent: StudentManagementItem = {
            id: created.id || String(Date.now()),
            username: created.email ? created.email.split('@')[0] : values.username,
            fullName: created.fullName || values.fullName,
            role: created.role || values.role,
            email: created.email || values.email,
            phone: created.phone || values.phone,
            dateOfBirth: created.dateOfBirth || values.dateOfBirth,
            studentCode: values.studentCode,
            facultyId: values.facultyId,
            majorId: values.majorId,
            classId: values.classId,
            admissionYear: values.admissionYear,
            isActive: created.isActive ?? true,
          };
          setStudents((prev) => [...prev, newStudent]);
        }
        setShowModal(false);
        setEditingStudent(null);
      } catch (err: any) {
        alert(err.message || 'Lỗi xảy ra trong quá trình lưu thông tin người dùng.');
      }
    } else {
      // Mock Fallback flow
      if (editingStudent) {
        setStudents((prev) =>
          prev.map((s) =>
            s.username === editingStudent.username
              ? { ...s, ...values }
              : s
          )
        );
      } else {
        const newStudent: StudentManagementItem = {
          id: String(Date.now()),
          username: values.username,
          fullName: values.fullName,
          role: values.role,
          email: values.email,
          phone: values.phone,
          dateOfBirth: values.dateOfBirth,
          studentCode: values.studentCode,
          facultyId: values.facultyId,
          majorId: values.majorId,
          classId: values.classId,
          admissionYear: values.admissionYear,
          isActive: true,
        };
        setStudents((prev) => [...prev, newStudent]);
      }
      setShowModal(false);
      setEditingStudent(null);
    }
  };

  const columns: Column<StudentManagementItem>[] = [
    {
      key: 'username',
      label: 'Mã đăng nhập',
      width: '25%',
      render: (val) => <span className="text-gray-700">{val as string}</span>,
    },
    {
      key: 'fullName',
      label: 'Họ tên',
      width: '40%',
      render: (val) => <span className="font-medium text-[#1A1B1E]">{val as string}</span>,
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
              : 'bg-red-100 text-red-700'
          }`}
        >
          {val ? 'Hoạt động' : 'Khóa'}
        </span>
      ),
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
            onClick={() => handleToggleActive(row.id)}
            className="p-2 cursor-pointer text-orange-600 hover:bg-orange-50 rounded-lg"
            title={row.isActive ? 'Khóa tài khoản' : 'Mở khóa'}
          >
            {row.isActive ? <Lock size={18} /> : <Unlock size={18} />}
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
    { label: 'Đang khóa', value: 'inactive' },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] p-6 bg-[#F8F9FA]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý sinh viên</h1>
        <button
          onClick={() => { setEditingStudent(null); setShowModal(true); }}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-[#3B5BDB] text-white rounded-lg hover:bg-blue-700 font-semibold text-sm transition"
        >
          <Plus size={16} />
          Thêm sinh viên
        </button>
      </div>

      <SearchFilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={statusFilter}
        onFilterChange={setStatusFilter as any}
        searchPlaceholder="Tìm kiếm sinh viên..."
        filterOptions={filterOptions}
        filterLabel="Trạng thái"
      />

      <div className="flex-1 mt-4">
        <DataTable
          columns={columns}
          data={filteredStudents}
          pageSize={8}
          emptyText="Không tìm thấy kết quả nào"
          minHeight={400}
        />
      </div>

      <ModalCreateStudent
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        editData={editingStudent}
        faculties={faculties}
        majors={majors}
        classes={classes}
      />

      <ModalConfirm
        isOpen={confirmType !== null}
        title={
          confirmType === 'delete'
            ? 'Xác nhận xóa tài khoản'
            : confirmType === 'lock'
            ? 'Xác nhận khóa tài khoản'
            : 'Xác nhận mở khóa tài khoản'
        }
        message={
          confirmType === 'delete'
            ? `Bạn có chắc muốn xóa vĩnh viễn tài khoản của sinh viên ${pendingStudent?.fullName}?`
            : confirmType === 'lock'
            ? `Bạn có chắc muốn tạm khóa tài khoản của sinh viên ${pendingStudent?.fullName}? Sinh viên này sẽ không thể đăng nhập vào hệ thống.`
            : `Xác nhận mở khóa hoạt động trở lại cho sinh viên ${pendingStudent?.fullName}?`
        }
        targetName={pendingStudent?.fullName}
        type={confirmType === 'delete' ? 'danger' : 'warning'}
        hasReasonInput={confirmType === 'lock'}
        reasonValue={lockReason}
        onReasonChange={setLockReason}
        confirmText={
          confirmType === 'delete'
            ? 'Xóa tài khoản'
            : confirmType === 'lock'
            ? 'Khóa tài khoản'
            : 'Mở khóa'
        }
        cancelText="Hủy bỏ"
        onConfirm={handleConfirmAction}
        onCancel={() => {
          setConfirmType(null);
          setPendingStudent(null);
          setLockReason('');
        }}
      />
    </div>
  );
};

export default AdminUsers;
