import React from "react";

const TemperatureStats=()=> {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h4 className="font-bold text-gray-900 mb-4 text-sm">Thống kê nhiệt độ</h4>
      <div className="space-y-3 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Vùng nóng nhất:</span>
          <span className="font-bold">Khu thanh toán</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Nhiệt độ trung bình:</span>
          <span className="font-bold">64°</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tổng điểm nóng:</span>
          <span className="font-bold">8 vùng</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Vùng lạnh nhất:</span>
          <span className="font-bold">Kệ gia dụng</span>
        </div>
      </div>
    </div>
  );
};
export default TemperatureStats;
