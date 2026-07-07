import { AdminStatsGridProps } from '../../types';

export const AdminStatsGrid = ({ stats }: AdminStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`ui-card group flex items-center gap-4 border-t-[3px] p-5 transition-all duration-200 hover:-translate-y-0.5 ${stat.borderColor}`}
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} transition-transform duration-200 group-hover:scale-110`}>
              <Icon size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[#868E96]">{stat.label}</p>
              <p className="mt-0.5 text-[30px] font-bold leading-none text-[#1A1B1E]">{stat.value}</p>
              <p className="mt-1 text-xs text-[#ADB5BD]">{stat.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
