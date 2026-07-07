import { TrendingUp } from 'lucide-react';
import { ResultBannerProps } from '../../types';

export const ResultBanner = ({ semester, academicYear, rating, totalScore, rankBadgeClass }: ResultBannerProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3D4A6B] to-[#2A3550] text-white shadow-sm p-6 sm:p-8 border border-gray-800/10 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left side info */}
      <div className="relative z-10 space-y-3.5 max-w-md text-center md:text-left">
        <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-sm">
          {semester} — Năm học {academicYear}
        </span>
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold leading-tight">Kết quả đánh giá rèn luyện</h2>
          <p className="text-xs text-white/70 leading-relaxed mt-1">
            Điểm số rèn luyện chính thức đã được Hội đồng Khoa phê duyệt và xác nhận.
          </p>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${rankBadgeClass(rating)}`}>
            Xếp loại: {rating}
          </span>
          <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-emerald-500/20">
            <TrendingUp size={13} />
            <span>+6đ kỳ trước</span>
          </div>
        </div>
      </div>

      {/* Right side circular progress */}
      <div className="relative flex items-center justify-center h-28 w-28 shrink-0 md:mr-4">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="48"
            className="text-white/10"
            strokeWidth="7"
            stroke="currentColor"
            fill="transparent"
          />
          <circle
            cx="56"
            cy="56"
            r="48"
            className="text-white"
            strokeWidth="7"
            strokeDasharray={2 * Math.PI * 48}
            strokeDashoffset={2 * Math.PI * 48 * (1 - totalScore / 100)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-3xl font-bold tracking-tight">{totalScore}</span>
          <span className="text-[10px] block opacity-85 mt-0.5 font-bold">/100đ</span>
        </div>
      </div>

      <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-white/5 blur-xl" />
    </div>
  );
};
