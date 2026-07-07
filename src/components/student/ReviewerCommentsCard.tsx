import { Calendar } from 'lucide-react';
import { ReviewerCommentsCardProps } from '../../types';

export const ReviewerCommentsCard = ({ reviewerComments }: ReviewerCommentsCardProps) => {
  return (
    <div className="ui-card p-5">
      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3.5 flex items-center gap-1.5 border-b pb-3 border-gray-100">
        <Calendar size={18} className="text-[#3D4A6B]" />
        Nhận xét từ người đánh giá
      </h3>
      <div className="bg-[#EFF6FF] border-l-[3.5px] border-l-[#3B82F6] p-3.5 rounded-r-xl">
        <p className="text-xs font-semibold leading-relaxed text-[#1E40AF]">
          {reviewerComments}
        </p>
      </div>
    </div>
  );
};
