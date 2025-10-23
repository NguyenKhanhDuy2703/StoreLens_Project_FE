import { Camera, MapPin, Image, AlertCircle, Settings } from "lucide-react";
import StatCard from "./StatCard";
const DashboardCameras = ({ cameras = [] }) => {
  const totalZones = cameras.reduce((sum, cam) => sum + cam.zones.length, 0);
  const camerasWithImage = cameras.filter((c) => c.image).length;
  const camerasNeedSetup = cameras.filter(
    (c) => !c.image || c.zones.length === 0
  ).length;
  const updateDataCamera = (camera) => {
    alert(`Cập nhật dữ liệu cho camera: ${camera.name}`);
    console.log("Updating camera data for:", camera);
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Thống kê</h2>
        <div className="text-sm text-gray-500">
          Cập nhật: {new Date().toLocaleDateString("vi-VN")}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Tổng số camera"
          value={cameras.length}
          bgColor="bg-green-50"
          textColor="text-green-600"
          icon={Camera}
        />
        <StatCard
          title="Tổng số zones"
          value={totalZones}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
          icon={MapPin}
        />
        <StatCard
          title="Camera có ảnh"
          value={camerasWithImage}
          bgColor="bg-purple-50"
          textColor="text-purple-600"
          icon={Image}
        />
        <StatCard
          title="Camera chưa setup"
          value={camerasNeedSetup}
          bgColor="bg-orange-50"
          textColor="text-orange-600"
          icon={AlertCircle}
        />
      </div>

      {/* Camera Details */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Camera className="w-5 h-5 mr-2" />
          Chi tiết theo Camera
        </h3>

        {cameras.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Camera className="w-16 h-16 mx-auto mb-3 opacity-30" />
            <p>Chưa có camera nào được thêm</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {cameras.map((cam) => (
              <div
                key={cam.id}
                className="border border-gray-200 rounded-lg p-5 hover:border-purple-400 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50"
              >
                {/* Camera Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800">{cam.name}</h4>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      cam.zones.length > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {cam.zones.length} zones
                  </span>
                </div>

                {/* Camera Status */}
                <div className="flex items-center space-x-4 mb-4 text-sm">
                  <div
                    className={`flex items-center ${
                      cam.image ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <Image className="w-4 h-4 mr-1" />
                    {cam.image ? "Có ảnh" : "Chưa có ảnh"}
                  </div>
                  <div
                    className={`flex items-center ${
                      cam.zones.length > 0 ? "text-blue-600" : "text-orange-500"
                    }`}
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    {cam.zones.length > 0 ? "Đã setup" : "Chưa setup"}
                  </div>
                </div>

                {/* Zones List */}
                {cam.zones.length > 0 ? (
                  <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                    {cam.zones.map((zone) => (
                      <div
                        key={zone.id}
                        className="flex items-center space-x-2 text-sm bg-white rounded p-2 hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className="w-4 h-4 rounded flex-shrink-0 border border-gray-200"
                          style={{ backgroundColor: zone.labelColor }}
                        />
                        <span className="text-gray-700 font-medium truncate flex-1">
                          {zone.name}
                        </span>
                        <span className="text-gray-500 text-xs truncate">
                          {zone.labelName}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 italic mb-4 py-2">
                    Chưa có zone nào được thiết lập
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => updateDataCamera(cam)}
                  className="w-full flex items-center 
                 justify-center space-x-2 bg-purple-600
                  hover:bg-purple-700 text-white font-medium
                   py-2 px-4 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Cập nhật</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCameras;
