import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatCard = ({ title, value, subtitle, change, icon }) => {
  // Logic màu sắc
  let theme = { color: "text-slate-500 bg-slate-100", Icon: Minus };

  if (change > 0) {
    theme = { color: "text-emerald-700 bg-emerald-100 border-emerald-200", Icon: TrendingUp };
  } else if (change < 0) {
    theme = { color: "text-rose-700 bg-rose-100 border-rose-200", Icon: TrendingDown };
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        {/* Icon tròn */}
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          {icon}
        </div>
        {/* Badge % */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${theme.color}`}>
          <theme.Icon size={12} strokeWidth={3} />
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
        <div className="text-3xl font-bold text-slate-800">{value}</div>
        <div className="text-xs font-medium text-slate-400 mt-2">
          {subtitle || "Chưa có dữ liệu"}
        </div>
      </div>
    </div>
  );
};

export default StatCard;