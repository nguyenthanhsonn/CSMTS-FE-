'use client';

import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X, User, Phone, Calendar, School } from 'lucide-react';
import { mockClasses } from '../../services/mockData';
import type { ClassListStudentItem } from '../../types';

interface ModalAddStudentProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<ClassListStudentItem, 'id'> & { classId: string }) => void;
  defaultClassId?: string;
}

interface FormValues {
  studentCode: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  classId: string;
}

const validationSchema = Yup.object({
  studentCode: Yup.string()
    .min(3, 'Tối thiểu 3 ký tự')
    .required('Vui lòng nhập mã sinh viên'),
  fullName: Yup.string()
    .min(2, 'Tối thiểu 2 ký tự')
    .required('Vui lòng nhập họ tên sinh viên'),
  dateOfBirth: Yup.string().required('Vui lòng chọn ngày sinh'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{9,11}$/, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
  classId: Yup.string().required('Vui lòng chọn lớp học'),
});

export default function ModalAddStudent({
  isOpen,
  onClose,
  onSubmit,
  defaultClassId = '',
}: ModalAddStudentProps) {
  const formik = useFormik<FormValues>({
    initialValues: {
      studentCode: '',
      fullName: '',
      dateOfBirth: '',
      phoneNumber: '',
      classId: defaultClassId,
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values: FormValues, { resetForm }: { resetForm: (options?: any) => void }) => {
      onSubmit({
        studentCode: values.studentCode,
        fullName: values.fullName,
        dateOfBirth: values.dateOfBirth,
        phoneNumber: values.phoneNumber,
        classId: values.classId,
      });
      resetForm();
      onClose();
    },
  });

  useEffect(() => {
    if (isOpen) {
      formik.resetForm({
        values: {
          studentCode: '',
          fullName: '',
          dateOfBirth: '',
          phoneNumber: '',
          classId: defaultClassId,
        },
      });
    }
  }, [isOpen, defaultClassId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Thêm sinh viên vào lớp</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-5">
          {/* Mã sinh viên & Họ tên */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Mã sinh viên <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Nhập mã SV (ví dụ: SV004)"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B5BDB] focus:border-transparent outline-none transition"
                  {...formik.getFieldProps('studentCode')}
                />
              </div>
              {formik.errors.studentCode && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.studentCode}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Nhập họ và tên"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B5BDB] focus:border-transparent outline-none transition"
                  {...formik.getFieldProps('fullName')}
                />
              </div>
              {formik.errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.fullName}</p>
              )}
            </div>
          </div>

          {/* Ngày sinh & Số điện thoại */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Ngày sinh <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B5BDB] focus:border-transparent outline-none transition cursor-pointer"
                  {...formik.getFieldProps('dateOfBirth')}
                />
              </div>
              {formik.errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.dateOfBirth}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B5BDB] focus:border-transparent outline-none transition"
                  {...formik.getFieldProps('phoneNumber')}
                />
              </div>
              {formik.errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Chọn lớp học (Từ lớp hiện có) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Lớp học chỉ định <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <School className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B5BDB] focus:border-transparent outline-none transition cursor-pointer bg-white"
                {...formik.getFieldProps('classId')}
              >
                <option value="">-- Chọn lớp học --</option>
                {mockClasses
                  .filter((c) => c.isActive)
                  .map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.code})
                    </option>
                  ))}
              </select>
            </div>
            {formik.errors.classId && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.classId}</p>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#3B5BDB] hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition cursor-pointer"
            >
              Thêm sinh viên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}