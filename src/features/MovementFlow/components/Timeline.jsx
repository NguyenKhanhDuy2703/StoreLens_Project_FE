import { useState } from "react";

const Timeline = () => {
  const [currentTime, setCurrentTime] = useState(13);

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Timeline:</span>
        <span className="text-sm font-mono bg-blue-500 text-white px-2 py-1 rounded">
          {currentTime}:00
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full relative transition-all duration-300"
            style={{ width: `${(currentTime / 24) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <button 
          onClick={() => setCurrentTime(Math.max(0, currentTime - 1))}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
        >
          ← Trước
        </button>
        <button 
          onClick={() => setCurrentTime(Math.min(24, currentTime + 1))}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
        >
          Sau →
        </button>
        <button 
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
        >
          Phát
        </button>
      </div>
    </div>
  );
};
export default Timeline;