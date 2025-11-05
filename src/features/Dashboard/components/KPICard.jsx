import { TrendingDown, TrendingUp } from "lucide-react";

// Thẻ KPI
const KPICard = ({ title, value, subtitle, trend, trendValue, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
    green: 'bg-gradient-to-br from-green-500 to-green-600',
    purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
    orange: 'bg-gradient-to-br from-orange-500 to-orange-600',
    pink: 'bg-gradient-to-br from-pink-500 to-pink-600',
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]} shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div
            className={`flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
              trend === 'up' 
                ? 'bg-green-50 text-green-600' 
                : 'bg-red-50 text-red-600'
            }`}
          >
            {trend === 'up' ? (
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 mr-1" />
            )}
            {trendValue}
          </div>
        )}
      </div>
      <div className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">{title}</div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-400 text-xs font-medium">{subtitle}</div>
    </div>
  );
};
export default KPICard;