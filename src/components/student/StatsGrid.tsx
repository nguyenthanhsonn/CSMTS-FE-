import { StatsGridProps } from '../../types';

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="ui-card p-5 transition-all duration-150 hover:translate-y-[-2px] hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${stat.bg} ${stat.iconColor}`}>
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">{stat.label}</span>
                <p className="text-3xl font-semibold text-[#1A1B1E] leading-none mt-1">{stat.value}</p>
              </div>
            </div>
            <p className={`mt-3.5 text-xs font-semibold ${stat.trendColor}`}>{stat.trend}</p>
          </div>
        );
      })}
    </div>
  );
};
