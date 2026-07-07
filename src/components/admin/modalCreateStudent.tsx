'use client';

import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X, User, Lock, Mail, Phone, Calendar, BookOpen, Building2, School, GraduationCap } from 'lucide-react';
import type { Class, Faculty, Major, StudentFormValues } from '../../types';

interface ModalCreateStudentProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: StudentFormValues) => void;
  editData?: StudentFormValues | null;
  faculties?: Faculty[];
  majors?: Major[];
  classes?: Class[];
}

const currentYear = new Date().getFullYear();
const admissionYears = Array.from({ length: 10 }, (_, i) => String(currentYear - i));

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Tối thiểu 3 ký tự')
    .max(50, 'Tối đa 50 ký tự')
    .required('Vui lòng nhập mã đăng nhập'),
  fullName: Yup.string()
    .min(2, 'Tối thiểu 2 ký tự')
    .max(100, 'Tối đa 100 ký tự')
    .required('Vui lòng nhập họ tên'),
  password: Yup.string()
    .min(6, 'Tối thiểu 6 ký tự')
    .max(50, 'Tối đa 50 ký tự')
    .required('Vui lòng nhập mật khẩu'),
  email: Yup.string().email('Email không hợp lệ').optional(),
  phone: Yup.string()
    .matches(/^[0-9]{9,11}$/, 'Số điện thoại không hợp lệ')
    .optional(),
  dateOfBirth: Yup.string().optional(),
  studentCode: Yup.string().required('Vui lòng nhập mã sinh viên'),
  facultyId: Yup.string().required('Vui lòng chọn khoa'),
  majorId: Yup.string().required('Vui lòng chọn ngành'),
  classId: Yup.string().required('Vui lòng chọn lớp'),
  admissionYear: Yup.string().required('Vui lòng chọn năm trúng tuyển'),
  role: Yup.string().oneOf(['student', 'admin']).required(),
});

const defaultValues: StudentFormValues = {
  username: '',
  fullName: '',
  password: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  studentCode: '',
  facultyId: '',
  majorId: '',
  classId: '',
  admissionYear: String(currentYear),
  role: 'student',
};

export default function ModalCreateStudent({
  isOpen,
  onClose,
  onSubmit,
  editData,
  faculties = [],
  majors = [],
  classes = [],
}: ModalCreateStudentProps) {
  const isEdit = !!editData;

  const formik = useFormik<StudentFormValues>({
    initialValues: editData ?? defaultValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: StudentFormValues, { resetForm }: { resetForm: (options?: any) => void }) => {
      onSubmit(values);
      resetForm();
      onClose();
    },
  });

  // Reset form khi mở modal mới hoặc chuyển qua edit
  useEffect(() => {
    if (isOpen) {
      formik.resetForm({ values: editData ?? defaultValues });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, editData]);

  // Lọc ngành theo khoa, lớp theo ngành
  const filteredMajors = majors.filter((m) => m.facultyId === formik.values.facultyId);
  const filteredClasses = classes.filter(
    (c) => c.facultyId === formik.values.facultyId && c.majorId === formik.values.majorId
  );

  // Reset ngành + lớp khi đổi khoa
  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue('facultyId', e.target.value);
    formik.setFieldValue('majorId', '');
    formik.setFieldValue('classId', '');
  };

  // Reset lớp khi đổi ngành
  const handleMajorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue('majorId', e.target.value);
    formik.setFieldValue('classId', '');
  };

  if (!isOpen) return null;

  const Field = ({
    label,
    name,
    icon: Icon,
    required,
    children,
  }: {
    label: string;
    name: string;
    icon: React.ElementType;
    required?: boolean;
    children: React.ReactNode;
  }) => {
    const error = formik.errors[name as keyof StudentFormValues];
    return (
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#1A1B1E]">
          <span className="mr-1 inline-flex items-center gap-1.5">
            <Icon size={13} className="text-[#3B5BDB]" />
            {label}
          </span>
          {required && <span className="text-[#C92A2A]">*</span>}
        </label>
        {children}
        {error && <p className="mt-1 text-xs text-[#C92A2A]">{error}</p>}
      </div>
    );
  };

  const inputCls = (name: string) => {
    const hasError = !!formik.errors[name as keyof StudentFormValues];
    return `w-full rounded-lg border px-3 py-2.5 text-sm text-[#1A1B1E] outline-none transition-all duration-150 focus:ring-2 ${
      hasError
        ? 'border-[#C92A2A] focus:ring-[#C92A2A]/20'
        : 'border-[#DEE2E6] focus:border-[#4C6EF5] focus:ring-[#4C6EF5]/20'
    }`;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 cursor-pointer bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E9ECEF] bg-white px-6 py-4">
            <div>
              <h2 className="text-lg font-bold text-[#1A1B1E]">
                {isEdit ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên mới'}
              </h2>
              <p className="mt-0.5 text-xs text-[#868E96]">
                {isEdit ? 'Cập nhật thông tin sinh viên' : 'Điền đầy đủ thông tin để tạo tài khoản'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#868E96] transition hover:bg-[#F8F9FA] hover:text-[#1A1B1E]"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="px-6 py-5 space-y-5">



            {/* Section: Thông tin đăng nhập */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#868E96]">Thông tin đăng nhập</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Mã đăng nhập" name="username" icon={User} required>
                  <input
                    type="text"
                    className={inputCls('username')}
                    placeholder="vd: sv001"
                    {...formik.getFieldProps('username')}
                  />
                </Field>
                <Field label="Mật khẩu" name="password" icon={Lock} required>
                  <input
                    type="password"
                    className={inputCls('password')}
                    placeholder="Tối thiểu 6 ký tự"
                    {...formik.getFieldProps('password')}
                  />
                </Field>
              </div>
            </div>

            {/* Section: Thông tin cá nhân */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#868E96]">Thông tin cá nhân</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Mã sinh viên" name="studentCode" icon={GraduationCap} required>
                  <input
                    type="text"
                    className={inputCls('studentCode')}
                    placeholder="vd: 2021001234"
                    {...formik.getFieldProps('studentCode')}
                  />
                </Field>
                <Field label="Họ và tên" name="fullName" icon={User} required>
                  <input
                    type="text"
                    className={inputCls('fullName')}
                    placeholder="Nguyễn Văn A"
                    {...formik.getFieldProps('fullName')}
                  />
                </Field>
                <Field label="Ngày sinh" name="dateOfBirth" icon={Calendar}>
                  <input
                    type="date"
                    className={inputCls('dateOfBirth')}
                    {...formik.getFieldProps('dateOfBirth')}
                  />
                </Field>
                <Field label="Số điện thoại" name="phone" icon={Phone}>
                  <input
                    type="tel"
                    className={inputCls('phone')}
                    placeholder="0901234567"
                    {...formik.getFieldProps('phone')}
                  />
                </Field>
                <Field label="Email" name="email" icon={Mail}>
                  <input
                    type="email"
                    className={`${inputCls('email')} sm:col-span-2`}
                    placeholder="email@example.com"
                    {...formik.getFieldProps('email')}
                  />
                </Field>
              </div>
            </div>

            {/* Section: Thông tin học tập */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#868E96]">Thông tin học tập</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Năm trúng tuyển" name="admissionYear" icon={Calendar} required>
                  <select className={inputCls('admissionYear')} {...formik.getFieldProps('admissionYear')}>
                    {admissionYears.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Khoa" name="facultyId" icon={Building2} required>
                  <select
                    className={inputCls('facultyId')}
                    value={formik.values.facultyId}
                    onChange={handleFacultyChange}
                  >
                    <option value="">-- Chọn khoa --</option>
                    {faculties.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Ngành / Chuyên ngành" name="majorId" icon={BookOpen} required>
                  <select
                    className={inputCls('majorId')}
                    value={formik.values.majorId}
                    onChange={handleMajorChange}
                    disabled={!formik.values.facultyId}
                  >
                    <option value="">-- Chọn ngành --</option>
                    {filteredMajors.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Lớp" name="classId" icon={School} required>
                  <select
                    className={inputCls('classId')}
                    {...formik.getFieldProps('classId')}
                    disabled={!formik.values.majorId}
                  >
                    <option value="">-- Chọn lớp --</option>
                    {filteredClasses.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-3 border-t border-[#E9ECEF] pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-lg border border-[#DEE2E6] bg-white px-5 py-2.5 text-sm font-semibold text-[#495057] transition hover:bg-[#F8F9FA]"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#3B5BDB] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4C6EF5] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isEdit ? 'Cập nhật' : 'Thêm sinh viên'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}