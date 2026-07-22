import { DetailScoresCardProps } from '../../types';

/** Map icon component type (passed from parent) — renders icon in accent color */
export const DetailScoresCard = ({ scoreBreakdown }: DetailScoresCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-slate-800">Chi tiết điểm</h3>
      </div>

      {/* Score rows */}
      <div className="flex flex-col gap-4 flex-1">
        {scoreBreakdown.map((item, index) => {
          const Icon = item.icon;
          const pct = Math.round((item.score / item.max) * 100);

          // Compute indigo opacity shade based on ratio: high → full, low → lighter
          const opacityClass =
            pct >= 85 ? 'bg-indigo-600' :
            pct >= 70 ? 'bg-indigo-500' :
            pct >= 55 ? 'bg-indigo-400' :
            pct >= 40 ? 'bg-indigo-300' :
                        'bg-indigo-200';

          return (
            <div key={index} className="space-y-2">
              {/* Label row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-50 text-slate-400">
                    <Icon size={13} />
                  </div>
                  <span className="text-xs font-medium text-slate-600">{item.label}</span>
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-sm font-semibold text-slate-800">{item.score}</span>
                  <span className="text-xs text-slate-400">/{item.max}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${opacityClass}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer: total hint */}
      <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">Tổng điểm tối đa</span>
        <span className="text-xs font-semibold text-slate-500">100 điểm</span>
      </div>
    </div>
  );
};
