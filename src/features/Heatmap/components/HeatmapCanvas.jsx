import React from "react";

const HeatmapCanvas=({ heatmapData }) =>{
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Bản đồ nhiệt - Mật độ khách hàng
      </h3>
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm text-green-600 font-medium">Cập nhật trực tiếp</span>
      </div>

      {/* Store Layout */}
      <div className="relative bg-gray-50 rounded-lg border-2 border-gray-300 h-96 mb-4">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="bg-teal-600 w-16 h-2 rounded"></div>
          <div className="text-center text-xs text-gray-600 mt-1">Lối vào</div>
        </div>
        {heatmapData.map((item, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
          >
            <div className="relative">
              <div
                className={`absolute inset-0 transform -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm ${
                  item.intensity >= 1.0
                    ? "bg-red-500"
                    : item.intensity >= 0.8
                    ? "bg-red-400"
                    : item.intensity >= 0.6
                    ? "bg-orange-400"
                    : item.intensity >= 0.4
                    ? "bg-yellow-400"
                    : "bg-blue-300"
                }`}
                style={{
                  width: `${Math.max(40, item.intensity * 80)}px`,
                  height: `${Math.max(25, item.intensity * 50)}px`,
                  opacity: 0.7,
                }}
              />
              <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-800 shadow-sm whitespace-nowrap">
                {item.name}
              </div>
            </div>
          </div>
        ))}

        {/* Store entrance at bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="bg-red-600 w-16 h-2 rounded"></div>
          <div className="text-center text-xs text-gray-600 mt-1">Lối ra</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700 font-bold">Thang đo cường độ</span>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gradient-to-r from-blue-200 via-yellow-300 via-orange-400 to-red-500 h-3 rounded-full min-w-32"></div>
            <span className="text-sm text-gray-600 whitespace-nowrap">0 - 100 người/m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeatmapCanvas;
