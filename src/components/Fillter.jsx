import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const Fillter = () => {
  const [timeFilter, setTimeFilter] = useState('today');
  const [viewType, setViewType] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (   
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left side - Timestamp */}
        <div className="text-sm text-gray-600">
          Cập nhật: <span className="font-medium text-gray-900">{currentTime.toLocaleTimeString('vi-VN')}</span>
        </div>
        
        {/* Right side - Filter controls */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Refresh button */}
          <button 
            className="flex items-center gap-2 rounded-lg border-2 border-green-600 bg-white px-4 py-2 text-sm font-medium text-green-600 shadow-sm transition-all hover:bg-green-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className="h-4 w-4" />
            Đồng bộ dữ liệu
          </button>

          {/* Date filter */}
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none cursor-pointer transition-all"
          >
            <option value="today">Hôm nay</option>
            <option value="yesterday">Hôm qua</option>
            <option value="week">7 ngày</option>
            <option value="month">30 ngày</option>
          </select>
          
          {/* View type filter */}
          <select 
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none cursor-pointer transition-all"
          >
            <option value="all">Tất cả</option>
            <option value="manager">Quản lý</option>
            <option value="staff">Nhân viên</option>
          </select>
          
          {/* Export button */}
          <button className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 active:scale-95 shadow-sm transition-all">
            Xuất báo cáo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fillter;