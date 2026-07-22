import { MessageSquare } from 'lucide-react';
import { ReviewerCommentsCardProps } from '../../types';

export const ReviewerCommentsCard = ({ reviewerComments }: ReviewerCommentsCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
          <MessageSquare size={14} className="text-indigo-600" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">Nhận xét từ người đánh giá</h3>
      </div>

      {/* Comment block — left border accent, white bg */}
      <div className="border-l-[3px] border-indigo-500 bg-white pl-4 pr-2 py-0.5">
        <p className="text-sm leading-relaxed text-slate-600">
          {reviewerComments}
        </p>
      </div>
    </div>
  );
};
