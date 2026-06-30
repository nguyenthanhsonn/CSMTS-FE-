'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không đúng định dạng')
    .required('Vui lòng nhập email'),
  password: Yup.string()
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .max(50, 'Mật khẩu tối đa 50 ký tự')
    .required('Vui lòng nhập mật khẩu'),
});

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const loginMock = useAuthStore((state) => state.loginMock);

  const handleQuickLogin = (role: 'student' | 'admin') => {
    try {
      loginMock(role);
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/student');
      }
    } catch (err: any) {
      setError(err.message || 'Đăng nhập nhanh thất bại');
    }
  };

  const formik = useFormik<Yup.InferType<typeof LoginSchema>>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (
      values: Yup.InferType<typeof LoginSchema>,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      setError('');
      try {
        const success = await login(values.email, values.password);
        if (success) {
          const user = useAuthStore.getState().user;
          if (user?.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/student');
          }
        } else {
          setError('Email hoặc mật khẩu không đúng');
        }
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <GraduationCap className="text-blue-600" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Đánh giá Rèn luyện Sinh viên
            </h1>
            {/* <p className="text-gray-600 mt-2">
              Đăng nhập để tiếp tục
            </p> */}
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="name@example.com"
                  {...formik.getFieldProps('email')}
                />
              </div>
              {formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Nhập mật khẩu"
                  {...formik.getFieldProps('password')}
                />
              </div>
              {formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#3B5BDB] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 font-semibold">Đăng nhập nhanh</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-[#3B5BDB] bg-[#EDF2FF] rounded-lg hover:bg-[#DBE4FF] transition cursor-pointer border border-[#C5D3FF]"
              >
                Sinh viên (Mock)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-[#6741D9] bg-[#F3F0FF] rounded-lg hover:bg-[#EAE4FF] transition cursor-pointer border border-[#E1D6FF]"
              >
                Admin (Mock)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
