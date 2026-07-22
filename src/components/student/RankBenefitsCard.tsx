import { RankBenefitsCardProps } from '../../types';

const BENEFITS = [
  'Ưu tiên xét học bổng khuyến khích học tập',
  'Ưu tiên giới thiệu việc làm và thực tập doanh nghiệp',
  'Xét khen thưởng và biểu dương cuối năm học',
  'Điểm cộng ưu thế trong hồ sơ xét tuyển sau đại học',
];

export const RankBenefitsCard = ({ rating }: RankBenefitsCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
          {/* Trophy icon — outline, single color */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-slate-800">
          Lợi ích xếp loại{' '}
          <span className="font-semibold text-indigo-600">{rating}</span>
        </h3>
      </div>

      {/* Benefits list */}
      <ul className="space-y-3">
        {BENEFITS.map((benefit, i) => (
          <li key={i} className="flex items-start gap-3">
            {/* Outline check icon — indigo */}
            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-indigo-300 bg-indigo-50">
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2 6 5 9 10 3" />
              </svg>
            </div>
            <span className="text-xs leading-relaxed text-slate-600">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
