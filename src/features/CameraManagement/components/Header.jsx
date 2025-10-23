import React from 'react';
import { Video } from 'lucide-react';
import StatsBox from './StatsBox';

const Header = ({ onAddCameraClick, totalCameras, activeCameras }) => {
  return (
    <div className="bg-white  p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-white/90 p-3 rounded-lg">
            <Video className="h-8 w-8 text-indigo-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black ">Quản Lý Camera</h1>
            <p className="text-indigo-200">Hệ thống giám sát thông minh</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <StatsBox label="Tổng Camera" value={totalCameras} valueColor="text-gray-800" />
          <StatsBox label="Đang hoạt động" value={activeCameras} valueColor="text-green-600" />
          <button
            onClick={onAddCameraClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            + Thêm Camera
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;