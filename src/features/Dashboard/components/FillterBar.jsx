import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FilterBar = () => {
  const [selectedBranch, setSelectedBranch] = useState('Tất cả chi nhánh');
  const [selectedPeriod, setSelectedPeriod] = useState('Hôm nay');

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between gap-6">
        {/* Left side - All filters in one horizontal line */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[180px] font-medium"
            >
              <option>Tất cả chi nhánh</option>
              <option>Chi nhánh Quận 1</option>
              <option>Chi nhánh Quận 2</option>
              <option>Chi nhánh Quận 3</option>
              <option>Chi nhánh Quận 7</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px] font-medium"
            >
              <option>Hôm nay</option>
              <option>Hôm qua</option>
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
              <option>Tháng này</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          
          <button className="bg-[#2563EB]   text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm">
            Áp dụng
          </button>
        </div>
        
        {/* Right side - Update time */}
        <div className="text-sm text-gray-500 whitespace-nowrap">
          Cập nhật: {new Date().toLocaleTimeString('vi-VN')}
        </div>
      </div>
    </div>
  );
};
export default FilterBar;