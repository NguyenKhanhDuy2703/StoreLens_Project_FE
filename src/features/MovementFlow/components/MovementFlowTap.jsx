import { BarChart3, ChevronDown } from "lucide-react";
import { useState } from "react";

const MovementFlowtap = () => {
  const [selectedBranch, setSelectedBranch] = useState('Chi nhánh 1 - Quận 1');
  const [selectedPeriod, setSelectedPeriod] = useState('Hôm qua');

  return (
    <div className="flex gap-4 mb-6">
      <div className="relative">
        <select 
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Chi nhánh 1 - Quận 1</option>
          <option>Chi nhánh 2 - Quận 2</option>
          <option>Chi nhánh 3 - Quận 3</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
      
      <div className="relative">
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Hôm qua</option>
          <option>Tuần này</option>
          <option>Tháng này</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
      
      <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
        <BarChart3 className="w-4 h-4" />
        Phát lại luồng
      </button>
    </div>
  );
};
export default MovementFlowtap;
