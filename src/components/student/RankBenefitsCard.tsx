import { Award } from 'lucide-react';
import { RankBenefitsCardProps } from '../../types';

export const RankBenefitsCard = ({ rating }: RankBenefitsCardProps) => {
  return (
    <div className="ui-card p-5 bg-gradient-to-r from-emerald-50/50 to-blue-50/50 border-emerald-100">
      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
        <Award className="text-emerald-600" size={16} />
        Lợi ích xếp loại {rating}
      </h3>
      <ul className="text-xs font-semibold text-gray-600 space-y-2">
        <li className="flex items-center gap-2">
          <span className="text-emerald-500 text-sm">✓</span> Ưu tiên xét học bổng khuyến khích học tập
        </li>
        <li className="flex items-center gap-2">
          <span className="text-emerald-500 text-sm">✓</span> Ưu tiên giới thiệu việc làm và thực tập doanh nghiệp
        </li>
        <li className="flex items-center gap-2">
          <span className="text-emerald-500 text-sm">✓</span> Xét khen thưởng và biểu dương cuối năm học
        </li>
        <li className="flex items-center gap-2">
          <span className="text-emerald-500 text-sm">✓</span> Điểm cộng ưu thế trong hồ sơ xét tuyển sau đại học
        </li>
      </ul>
    </div>
  );
};
