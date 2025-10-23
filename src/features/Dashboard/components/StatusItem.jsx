import { Activity, AlertCircle } from "lucide-react";

// Status Item Component
const StatusItem = ({ label, value, status, detail }) => {
  const getStatusIcon = () => {
    if (status === 'warning') return <AlertCircle className="h-5 w-5 text-yellow-300" />;
    if (status === 'normal') return <Activity className="h-5 w-5 text-green-300" />;
    return <Activity className="h-5 w-5 text-blue-300" />;
  };

  return (
    <div className="flex items-center gap-3">
      {getStatusIcon()}
      <div>
        <p className="text-xs text-blue-100">{label}</p>
        <p className="text-lg font-bold">{value}</p>
        {detail && <p className="text-xs text-blue-100">{detail}</p>}
      </div>
    </div>
  );
};
export default StatusItem;