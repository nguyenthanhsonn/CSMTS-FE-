'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GraduationCap, Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { API_Auth } from '../../api/API_Auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { UserRole } from '../../types/common';
import { getUserFriendlyError } from '../../utils/errorHelper';
import { useToast } from '../../components/common/ToastProvider';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required('Vui lòng nhập tên đăng nhập'),
  password: Yup.string()
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .max(50, 'Mật khẩu tối đa 50 ký tự')
    .required('Vui lòng nhập mật khẩu'),
  captchaCode: Yup.string()
    .trim()
    .required('Vui lòng nhập mã captcha'),
});

export default function Login() {
  const [error, setError] = useState('');
  const [captchaId, setCaptchaId] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const loginMock = useAuthStore((state) => state.loginMock);
  const wrongCaptchaCountRef = useRef(0);
  const toast = useToast();

  const loadCaptcha = async () => {
    try {
      setCaptchaLoading(true);
      const captcha = await API_Auth.getCaptcha();
      setCaptchaId(captcha.captchaId || '');
      setCaptchaImage(captcha.image || '');
    } catch (err: any) {
      setError(err.message || 'Không thể tải mã captcha. Vui lòng thử lại.');
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const getRoleHome = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'class_council':
        return '/class_council';
      case 'student':
      default:
        return '/student';
    }
  };

  const handleMockLogin = (role: UserRole) => {
    loginMock(role);
    router.push(getRoleHome(role));
  };

  const formik = useFormik<Yup.InferType<typeof LoginSchema>>({
    initialValues: {
      username: '',
      password: '',
      captchaCode: '',
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
        const usernameLower = values.username.trim().toLowerCase();

        // Check if mock credentials are used
        if (usernameLower === 'student' || usernameLower === 'student.test2') {
          loginMock('student');
          router.push('/student');
          return;
        } else if (usernameLower === 'admin') {
          loginMock('admin');
          router.push('/admin');
          return;
        } else if (usernameLower === 'council' || usernameLower === 'class_council' || usernameLower === 'gvcn') {
          loginMock('class_council');
          router.push('/class_council');
          return;
        }

        if (!captchaId) {
          setError('Vui lòng tải lại mã captcha.');
          await loadCaptcha();
          return;
        }

        const success = await login(values.username, values.password, captchaId, values.captchaCode);
        if (success) {
          const user = useAuthStore.getState().user;
          router.push(user?.role ? getRoleHome(user.role) : '/student');
        } else {
          setError('Tên đăng nhập hoặc mật khẩu không đúng');
        }
      } catch (err: any) {
        const errMessage = err.message || '';
        const isCaptchaError =
          errMessage.toLowerCase().includes('captcha') ||
          errMessage.includes('xác thực') ||
          errMessage.includes('mã') ||
          (err.errors && JSON.stringify(err.errors).toLowerCase().includes('captcha'));

        if (isCaptchaError) {
          formik.setFieldError('captchaCode', 'Mã captcha không đúng, vui lòng nhập lại');
          formik.setFieldValue('captchaCode', '');
          await loadCaptcha();
          
          wrongCaptchaCountRef.current += 1;
          if (wrongCaptchaCountRef.current >= 3) {
            wrongCaptchaCountRef.current = 0;
            toast.error('Bạn đã nhập sai nhiều lần, mã captcha mới đã được tạo.');
          }
        } else {
          setError(getUserFriendlyError(err, 'Đã xảy ra lỗi. Vui lòng thử lại.'));
          formik.setFieldValue('captchaCode', '');
          await loadCaptcha();
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
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
              <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Nhập tên đăng nhập"
                  autoComplete="username"
                  {...formik.getFieldProps('username')}
                />
              </div>
              {formik.errors.username && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã captcha
              </label>
              <div className="flex flex-row items-center gap-3 w-full">
                {/* Left: Input box */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    className={`w-full px-4 py-3 border rounded-xl uppercase focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 ${
                      formik.touched.captchaCode && formik.errors.captchaCode
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 animate-shake'
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder=""
                    autoComplete="off"
                    {...formik.getFieldProps('captchaCode')}
                    onChange={(e) => {
                      formik.handleChange(e);
                      // Clear captcha error automatically when user edits
                      if (formik.errors.captchaCode) {
                        formik.setFieldError('captchaCode', undefined);
                      }
                    }}
                  />
                </div>

                {/* Right: Captcha image & refresh button */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex h-12 w-[140px] items-center justify-center overflow-hidden rounded-xl bg-white select-none relative">
                    {captchaImage ? (
                      <Image
                        src={captchaImage}
                        alt="Captcha"
                        width={140}
                        height={48}
                        unoptimized
                        className="max-h-full max-w-full object-contain rounded-lg"
                      />
                    ) : (
                      <span className="text-[10px] font-semibold text-gray-400">
                        {captchaLoading ? '...' : 'Trống'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Validation Error Message */}
              {formik.touched.captchaCode && formik.errors.captchaCode && (
                <p className="text-red-500 text-xs font-medium mt-1.5 flex items-center gap-1 animate-fade-in">
                  <span>{formik.errors.captchaCode}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting || captchaLoading}
              className="w-full bg-[#3B5BDB] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          {/* Quick Mock Login Panel */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 text-center mb-3 tracking-wider uppercase">
              Đăng nhập nhanh (Mock)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleMockLogin('student')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-200 group cursor-pointer"
              >
                <User className="text-gray-500 group-hover:text-blue-600 mb-1" size={18} />
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleMockLogin('class_council')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-200 group cursor-pointer"
              >
                <ShieldCheck className="text-gray-500 group-hover:text-blue-600 mb-1" size={18} />
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">Council</span>
              </button>
              <button
                type="button"
                onClick={() => handleMockLogin('admin')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-all duration-200 group cursor-pointer"
              >
                <Lock className="text-gray-500 group-hover:text-blue-600 mb-1" size={18} />
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
