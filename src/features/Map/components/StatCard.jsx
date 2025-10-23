const StatCard = ({ title, value, bgColor, textColor }) => (
  <div className={`${bgColor} p-4 rounded-lg`}>
    <p className="text-sm text-gray-600">{title}</p>
    <p className={`text-3xl font-bold ${textColor}`}>{value}</p> 
  </div>
);
export default StatCard;