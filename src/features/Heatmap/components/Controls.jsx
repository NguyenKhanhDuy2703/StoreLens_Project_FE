import React from "react";

const Controls=() => {
  return (
    <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg shadow-sm">
      {/* Bộ lọc bên trái */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400">
            <option>Chi nhánh 1 - Quận 1</option>
            <option>Chi nhánh 2 - Quận 2</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400">
            <option>Hôm nay</option>
            <option>Hôm qua</option>
            <option>7 ngày qua</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bộ lọc bên phải */}
      <div className="flex items-center space-x-6 text-sm">
        {/* Chế độ xem */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Chế độ xem:</span>
          <div className="flex space-x-1">
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs shadow-sm">Toàn cảnh</button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-200 shadow-sm">Theo khu vực</button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-200 shadow-sm">Theo thời gian</button>
          </div>
        </div>

        {/* Nhiệt độ */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Nhiệt độ:</span>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-xs text-gray-600">Lạnh</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-xs text-gray-600">Ấm</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Nóng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Controls;
