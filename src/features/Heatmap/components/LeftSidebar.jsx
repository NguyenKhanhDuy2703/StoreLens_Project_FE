import { Download, RotateCcw } from "lucide-react";
import { useState } from "react";

const LeftSidebar = ({showZones , showFlow , showGrid , opacity ,handleExport , handleReset } ) => {
      const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
      const [selectedStore, setSelectedStore] = useState('STORE001');
      const [selectedCamera, setSelectedCamera] = useState('C01');
  return (
    <>
    {/* Left Sidebar - Controls */}
        <div className="col-span-2 space-y-4">
          {/* Date & Store Selection */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Bộ lọc</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Ngày</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-gray-50 text-gray-900 border border-gray-300 px-2 py-1.5 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 mb-1 block">Cửa hàng</label>
                <select 
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  className="w-full bg-gray-50 text-gray-900 border border-gray-300 px-2 py-1.5 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="STORE001">STORE001</option>
                  <option value="STORE002">STORE002</option>
                  <option value="STORE003">STORE003</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-600 mb-1 block">Camera</label>
                <select 
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="w-full bg-gray-50 text-gray-900 border border-gray-300 px-2 py-1.5 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="C01">C01 - Main</option>
                  <option value="C02">C02 - Side</option>
                </select>
              </div>
            </div>
          </div>

          {/* Visualization Controls */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Hiển thị</h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900">
                <input 
                  type="checkbox" 
                  checked={showZones}
                  onChange={(e) => setShowZones(e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
                Ranh giới khu vực
              </label>
              
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900">
                <input 
                  type="checkbox" 
                  checked={showFlow}
                  onChange={(e) => setShowFlow(e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
                Luồng di chuyển
              </label>

              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900">
                <input 
                  type="checkbox" 
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
                Lưới chia ô
              </label>

              <div className="pt-2 border-t border-gray-200">
                <label className="text-xs text-gray-600 mb-2 block">Độ mờ: {opacity}%</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Mức độ</h3>
            <div className="space-y-2">
              {[
                { label: 'Rất cao', color: 'bg-red-500', range: '80+' },
                { label: 'Cao', color: 'bg-orange-500', range: '60-80' },
                { label: 'TB', color: 'bg-yellow-500', range: '40-60' },
                { label: 'Thấp', color: 'bg-green-500', range: '20-40' },
                { label: 'Rất thấp', color: 'bg-blue-500', range: '0-20' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${item.color}`} />
                  <span className="text-xs text-gray-700 flex-1">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button 
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-white text-sm font-medium transition shadow-sm"
            >
              <Download size={16} />
              Xuất PNG
            </button>
            
            <button 
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg text-gray-700 text-sm font-medium transition"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>
    </>
  )
}
export default LeftSidebar;