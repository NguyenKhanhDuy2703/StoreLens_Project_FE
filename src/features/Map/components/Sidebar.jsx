import React from "react";
import { Plus, RotateCcw } from "lucide-react";
import CCTV_ICON from "../assets/cctv.png";


const Sidebar = ({ shelfW, setShelfW, shelfH, setShelfH, addShelf, addCamera, resetLayout }) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Cài đặt</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Chiều dài kệ (m)
        </label>
        <input
          type="number"
          step="0.1"
          value={shelfW}
          onChange={(e) => setShelfW(parseFloat(e.target.value) || 1)}
          className="w-full border border-gray-300 rounded p-1 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          min="0.1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Chiều rộng kệ (m)
        </label>
        <input
          type="number"
          step="0.1"
          value={shelfH}
          onChange={(e) => setShelfH(parseFloat(e.target.value) || 1)}
          className="w-full border border-gray-300 rounded p-1 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          min="0.1"
        />
      </div>
      <button
        onClick={addShelf}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded mb-2 hover:bg-purple-700"
      >
        <Plus size={16} /> Thêm kệ
      </button>
      <button
        onClick={addCamera}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 text-white rounded mb-2 hover:bg-gray-800"
      >
        <img src={CCTV_ICON} alt="CCTV" className="w-4 h-4" /> Thêm camera
      </button>
      <button
        onClick={resetLayout}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        <RotateCcw size={16} /> Xóa tất cả
      </button>
    </div>
  );
};

export default Sidebar;
