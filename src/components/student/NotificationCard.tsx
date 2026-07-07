import { Bell } from 'lucide-react';
import { NotificationCardProps } from '../../types';

export const NotificationCard = ({ notifications }: NotificationCardProps) => {
  return (
    <section className="ui-card p-5 h-full flex flex-col lg:col-span-2">
      <div className="mb-4 flex items-center justify-between shrink-0">
        <h2 className="text-sm sm:text-base font-bold text-[#1A1B1E] flex items-center gap-2">
          <Bell size={18} className="text-[#3D4A6B]" /> Thông báo & Yêu cầu
        </h2>
      </div>
      <div className="space-y-3 overflow-y-auto pr-1 flex-1 max-h-[300px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        {notifications.map((notif, i) => (
          <div key={i} className={`flex items-start gap-3 rounded-xl border-l-[3.5px] p-3.5 ${notif.borderColor} ${notif.bg}`}>
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notif.dot}`} />
            <div className="min-w-0">
              <p className={`text-xs font-bold ${notif.textColor}`}>{notif.title}</p>
              <p className={`mt-0.5 text-[11px] font-semibold leading-relaxed ${notif.descColor}`}>
                {notif.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
