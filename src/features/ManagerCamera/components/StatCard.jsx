const StatCardManagerCamera = ({ title, value, bgColor, textColor, icon: Icon }) => (
  <div className={`${bgColor} rounded-lg p-4 border-2 border-transparent hover:border-purple-300 transition-all`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
      </div>
      <Icon className={`w-10 h-10 ${textColor} opacity-60`} />
    </div>
  </div>
);
export default StatCardManagerCamera;