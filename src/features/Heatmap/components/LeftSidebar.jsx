import { Download, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatusCurrent } from "../HeatmapSlice";
const LeftSidebar = ({

  selectedDate,
  setSelectedDate,
  selectedStore,
  setSelectedStore,
  selectedCamera,
  setSelectedCamera,
  handleExport,
  handleReset,
}) => {
  const {grid , zone , opacity} = useSelector((state) => state.heatmap.statusCurrent);
  const dispatch = useDispatch();
  const setShowZones = (value) => {
    dispatch(setStatusCurrent({grid , zone : value , opacity}));
  };
  const setOpacity = (value) => {
    dispatch(setStatusCurrent({grid , zone , opacity : value}));
  }
  const setShowGrid = (value) => {
    dispatch(setStatusCurrent({grid : value , zone , opacity}));
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Date & Store Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Bộ lọc
          </h3>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Ngày
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-gray-50 text-gray-900 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Cửa hàng
            </label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full bg-gray-50 text-gray-900 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            >
              <option value="STORE001">STORE001</option>
              <option value="STORE002">STORE002</option>
              <option value="STORE003">STORE003</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-700">
              Camera
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full bg-gray-50 text-gray-900 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            >
              <option value="C01">C01 - Main</option>
              <option value="C02">C02 - Side</option>
            </select>
          </div>
        </div>

        {/* Visualization Controls */}
        <div className="pt-4 border-t border-gray-200 space-y-3">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Hiển thị
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={zone}
                onChange={(e) => setShowZones(e.target.checked)}
                className="w-4 h-4 accent-purple-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                Ranh giới khu vực
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={grid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="w-4 h-4 accent-purple-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
                Lưới chia ô
              </span>
            </label>
          </div>

          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-700">Độ mờ</label>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                {opacity}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onInput={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
        </div>

        
      </div>
      {/* Action Buttons - Fixed at bottom */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
        <button
          onClick={handleExport}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition shadow-sm font-medium text-sm"
        >
          <Download size={16} />
          Xuất PNG
        </button>
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg transition font-medium text-sm"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
