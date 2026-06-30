'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] flex flex-col justify-between items-center p-4 md:p-8">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeInSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-down {
          animation: fadeInSlideDown 0.5s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
      `}} />

      <div className="flex-1 flex flex-col justify-center items-center gap-6 max-w-md w-full text-center">
        {/* Illustration */}
        <div className="animate-float w-[280px] h-[200px]">
          <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="140" cy="100" r="70" fill="#EDF2FF" />
            <rect x="85" y="45" width="110" height="120" rx="12" fill="#FFFFFF" stroke="#3B5BDB" stroke-width="4" />
            <rect x="100" y="60" width="80" height="70" rx="6" fill="#EDF2FF" />
            <path d="M140 110C140 100 150 95 150 85C150 78 144 72 137 72C130 72 125 76 124 82" stroke="#3B5BDB" stroke-width="6" stroke-linecap="round" />
            <circle cx="140" cy="120" r="4.5" fill="#3B5BDB" />
            <rect x="120" y="165" width="40" height="10" rx="2" fill="#3B5BDB" />
            <path d="M135 155 L135 165 L145 165 L145 155 Z" fill="#3B5BDB" />
          </svg>
        </div>

        {/* Số 404 */}
        <div 
          className="animate-fade-down font-black tracking-tighter leading-none"
          style={{
            fontSize: '120px',
            background: 'linear-gradient(135deg, #3B5BDB, #6741D9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-4px',
          }}
        >
          404
        </div>

        {/* Tiêu đề */}
        <h1 className="text-[24px] font-bold text-[#1A1B1E] leading-tight">
          Trang không tồn tại
        </h1>

        {/* Mô tả */}
        <p className="text-[15px] text-[#868E96] leading-relaxed max-w-[380px]">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
        </p>

        {/* Gợi ý điều hướng */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-[13px] text-[#868E96]">Bạn có thể đến:</span>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-1 bg-[#EDF2FF] text-[#3B5BDB] rounded-full px-4 py-1.5 text-[13px] hover:bg-[#3B5BDB] hover:text-white transition duration-200 font-medium"
            >
              🏠 Trang chủ
            </button>
            <button
              onClick={() => router.push('/student/evaluation')}
              className="flex items-center gap-1 bg-[#EDF2FF] text-[#3B5BDB] rounded-full px-4 py-1.5 text-[13px] hover:bg-[#3B5BDB] hover:text-white transition duration-200 font-medium"
            >
              📋 Phiếu đánh giá
            </button>
            <button
              onClick={() => router.push('/student/profile')}
              className="flex items-center gap-1 bg-[#EDF2FF] text-[#3B5BDB] rounded-full px-4 py-1.5 text-[13px] hover:bg-[#3B5BDB] hover:text-white transition duration-200 font-medium"
            >
              👤 Thông tin cá nhân
            </button>
          </div>
        </div>

        {/* Nút chính */}
        <button
          onClick={() => router.push('/')}
          className="animate-pulse-slow mt-4 bg-[#3B5BDB] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#4C6EF5] transition-all duration-200 hover:-translate-y-[1px]"
          style={{
            boxShadow: '0 4px 12px rgba(59, 91, 219, 0.3)'
          }}
        >
          Quay về trang chủ
        </button>
      </div>

      {/* Footer nhỏ */}
      <footer className="text-[12px] text-[#ADB5BD] mt-auto pt-6">
        Hệ thống Đánh giá Rèn luyện Sinh viên
      </footer>
    </div>
  );
}