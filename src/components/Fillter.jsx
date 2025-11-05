import { useState } from "react";
import { RefreshCw, Calendar } from "lucide-react";
const Fillter = () => {
  const [timeRange, setTimeRange] = useState("today");
  const [selectedZone, setSelectedZone] = useState("display1");
  const [selectedCamera, setSelectedCamera] = useState("cam1");
  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          {/* Time Range Filter */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer pr-6"
            >
              <option value="today">Hôm nay</option>
              <option value="yesterday">Hôm qua</option>
              <option value="week">7 ngày qua</option>
              <option value="month">30 ngày qua</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm nay</option>
            </select>
          </div>

          {/* Zone Filter */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
              Khu vực:
            </span>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer pr-6"
            >
              <option value="display1">Kệ trưng bày 1</option>
              <option value="entrance">Lối vào</option>
              <option value="display2">Kệ trưng bày 2</option>
              <option value="checkout">Quầy thanh toán</option>
              <option value="promo">Khu khuyến mãi</option>
            </select>
          </div>

          {/* Camera Filter */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
              Camera:
            </span>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer pr-6"
            >
              <option value="cam1">Camera 1 - Cửa chính</option>
              <option value="cam2">Camera 2 - Khu A</option>
              <option value="cam3">Camera 3 - Khu B</option>
              <option value="cam4">Camera 4 - Thanh toán</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Refresh Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:shadow-md transition-all">
            <RefreshCw className="w-4 h-4" />
            Làm mới
          </button>
          {/* Export Button */}
          <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5">
            Xuất báo cáo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fillter;
