import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AdminActivityFeedCardProps } from '../../types';

export const AdminActivityFeedCard = ({ activities, activityLabelColor }: AdminActivityFeedCardProps) => {
  return (
    <section className="ui-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#1A1B1E]">Hoạt động gần đây</h2>
        <Link
          href="/admin/student"
          className="flex items-center gap-1 text-sm font-semibold text-[#3B5BDB] transition-colors hover:text-[#4C6EF5]"
        >
          Xem tất cả <ArrowRight size={14} />
        </Link>
      </div>
      <div className="relative space-y-4">
        {/* Timeline line */}
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-[#E9ECEF]" />
        {activities.map((activity, index) => (
          <div key={index} className="relative flex items-start gap-4">
            <span
              className={`relative z-10 mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-white ${activity.color}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${activityLabelColor[activity.label] ?? 'bg-gray-100 text-gray-600'}`}>
                  {activity.label}
                </span>
                <p className="text-sm font-semibold text-[#1A1B1E]">{activity.content}</p>
              </div>
              <p className="mt-0.5 text-xs text-[#868E96]">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
