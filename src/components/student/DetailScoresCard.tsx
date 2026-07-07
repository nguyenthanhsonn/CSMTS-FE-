import { Award } from 'lucide-react';
import { DetailScoresCardProps } from '../../types';

export const DetailScoresCard = ({ scoreBreakdown }: DetailScoresCardProps) => {
  return (
    <div className="ui-card p-5 h-full flex flex-col justify-between">
      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-5 flex items-center gap-1.5 border-b pb-3 border-gray-100">
        <Award size={18} className="text-[#3D4A6B]" /> Chi tiết điểm
      </h3>
      <div className="space-y-5">
        {scoreBreakdown.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-gray-50 rounded text-gray-500">
                    <Icon size={14} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                </div>
                <span className={`text-xs font-bold ${item.textColor}`}>
                  {item.score}/{item.max}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${(item.score / item.max) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
