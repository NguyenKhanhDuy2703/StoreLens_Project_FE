// Metric Card Component
const MetricCard = ({ icon, title, value, change, trend, subtitle, color }) => {
  const colorClasses = {
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200'
  };

  return (
    <div className={`rounded-xl border-2 ${colorClasses[color]} p-6 transition-all hover:shadow-lg`}>
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-white p-2 shadow-sm">
          {icon}
        </div>
        <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};
export default MetricCard;