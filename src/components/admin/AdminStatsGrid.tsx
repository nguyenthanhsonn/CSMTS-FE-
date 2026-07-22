import { AdminStatsGridProps } from '../../types';

export const AdminStatsGrid = ({ stats }: AdminStatsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`ui-card group flex items-center gap-3 border-t-[3px] p-3.5 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 ${stat.borderColor}`}
          >
            <div className={`flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} transition-transform duration-200 group-hover:scale-110`}>
              <Icon size={18} className="sm:hidden" />
              <Icon size={24} className="hidden sm:block" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-[13px] font-medium text-[#868E96] leading-tight">{stat.label}</p>
              <p className="mt-0.5 text-[22px] sm:text-[30px] font-bold leading-none text-[#1A1B1E]">{stat.value}</p>
              <p className="mt-0.5 text-[11px] sm:text-xs text-[#ADB5BD]">{stat.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

