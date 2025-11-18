import { Camera, MapPin, Image, AlertCircle, Settings, Monitor, Wifi, Maximize2, Grid3x3 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCamerasWithZones } from "../Map/ManagerCamera.thunk";

// StatCard Component
const StatCard = ({ title, value, bgColor, textColor, icon: Icon }) => (
  <div className={`${bgColor} rounded-lg p-4 border-2 border-transparent hover:border-purple-300 transition-all`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
      </div>
      <Icon className={`w-10 h-10 ${textColor} opacity-60`} />
    </div>
  </div>
);

const ManagerCameras = () => {
  const camerasWithZone = useSelector((state) => state.cameraZones);
  const dispatch = useDispatch();

  const cameras = camerasWithZone?.cameras || [];
  const zones = camerasWithZone?.zones || [];

  const [metrics, setMetrics] = useState({
    totalCamera: 0,
    totalZones: 0,
    camerasWithImage: 0,
    camerasNeedSetup: 0,
  });

  // Tính toán metrics từ dữ liệu thực tế
  useEffect(() => {
    if (cameras.length > 0 && zones.length > 0) {
      const totalCamera = cameras.length;
      const totalZones = zones.reduce((sum, zone) => sum + (zone.zones?.length || 0), 0);
      const camerasWithImage = zones.filter(zone => zone.backgroundImage).length;
      const camerasNeedSetup = zones.filter(zone => !zone.zones || zone.zones.length === 0).length;

      setMetrics({
        totalCamera,
        totalZones,
        camerasWithImage,
        camerasNeedSetup,
      });
    }
  }, [cameras, zones]);

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    dispatch(fetchCamerasWithZones(""));
  }, [dispatch]);

  // Hàm ghép dữ liệu camera với zones
  const getCameraWithZoneData = (camera) => {
    const zoneData = zones.find(z => z.cameraCode === camera.cameraCode);
    return {
      ...camera,
      zones: zoneData || null
    };
  };

  const updateDataCamera = (camera) => {
    console.log("Updating camera:", camera);
    // Implement your update logic here
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
      <div className="mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-5 bg-white rounded-xl shadow-sm">
          <StatCard
            title="Tổng số camera"
            value={metrics.totalCamera}
            bgColor="bg-green-50"
            textColor="text-green-600"
            icon={Camera}
          />
          <StatCard
            title="Tổng số zones"
            value={metrics.totalZones}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
            icon={MapPin}
          />
          <StatCard
            title="Camera có ảnh"
            value={metrics.camerasWithImage}
            bgColor="bg-purple-50"
            textColor="text-purple-600"
            icon={Image}
          />
          <StatCard
            title="Camera chưa setup"
            value={metrics.camerasNeedSetup}
            bgColor="bg-orange-50"
            textColor="text-orange-600"
            icon={AlertCircle}
          />
        </div>

        {/* Camera Details */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Camera className="w-6 h-6 mr-2 text-purple-600" />
            Chi tiết Camera
          </h2>

          {cameras.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Camera className="w-20 h-20 mx-auto mb-4 opacity-20" />
              <p className="text-lg">Chưa có camera nào được thêm vào hệ thống</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {cameras.map((camera) => {
                const cam = getCameraWithZoneData(camera);
                
                return (
                  <div
                    key={cam.cameraCode}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-400 hover:shadow-lg transition-all bg-white flex flex-col"
                  >
                    {/* Camera Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{cam.cameraName}</h3>
                          <p className="text-sm text-gray-500">Code: {cam.cameraCode}</p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                          cam.zones?.zones?.length > 0
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {cam.zones?.zones?.length || 0} zones
                      </span>
                    </div>

                    {/* Store Info */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center text-sm text-blue-700">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="font-medium">Store ID:</span>
                        <span className="ml-2 font-semibold">{cam.storeId}</span>
                      </div>
                    </div>

                    {/* Camera Specs */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-2 text-sm font-semibold text-gray-700">
                        <Monitor className="w-4 h-4 mr-2" />
                        Thông số kỹ thuật
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center text-gray-600">
                          <Maximize2 className="w-3 h-3 mr-1.5" />
                          <span>Max: {cam.cameraSpec?.max_resolution?.width}x{cam.cameraSpec?.max_resolution?.height}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Grid3x3 className="w-3 h-3 mr-1.5" />
                          <span>Current: {cam.cameraSpec?.current_resolution?.width}x{cam.cameraSpec?.current_resolution?.height}</span>
                        </div>
                      </div>
                    </div>

                    {/* RTSP URL */}
                    <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center text-sm text-green-700 mb-1">
                        <Wifi className="w-4 h-4 mr-2" />
                        <span className="font-medium">RTSP Stream</span>
                      </div>
                      <code className="text-xs text-green-600 break-all block bg-white px-2 py-1 rounded border border-green-200">
                        {cam.rtspUrl}
                      </code>
                    </div>

                    {/* Zone Frame Info */}
                    {cam.zones?.widthFrame && (
                      <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-indigo-700">
                            <Grid3x3 className="w-4 h-4 mr-2" />
                            <span className="font-medium">Frame Size:</span>
                            <span className="ml-2 font-semibold">
                              {cam.zones.widthFrame} x {cam.zones.heightFrame}
                            </span>
                          </div>
                          {cam.zones.backgroundImage && (
                            <div className="flex items-center text-indigo-600">
                              <Image className="w-4 h-4 mr-1" />
                              <span className="text-xs">Background available</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Camera Status Badges */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`flex items-center text-sm px-3 py-1.5 rounded-full ${
                          cam.zones?.backgroundImage
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        <Image className="w-4 h-4 mr-1.5" />
                        {cam.zones?.backgroundImage ? "Có ảnh nền" : "Chưa có ảnh"}
                      </div>
                      <div
                        className={`flex items-center text-sm px-3 py-1.5 rounded-full ${
                          cam.zones?.zones?.length > 0
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "bg-orange-100 text-orange-600 border border-orange-200"
                        }`}
                      >
                        <AlertCircle className="w-4 h-4 mr-1.5" />
                        {cam.zones?.zones?.length > 0 ? "Đã setup" : "Chưa setup"}
                      </div>
                    </div>

                    {/* Zones List - Fixed Height with Scroll */}
                    <div className="mb-4 flex-1 min-h-[200px] max-h-[300px] flex flex-col">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center flex-shrink-0">
                        <MapPin className="w-4 h-4 mr-1.5" />
                        Danh sách Zones
                      </h4>
                      {cam.zones?.zones?.length > 0 ? (
                        <div className="space-y-2 overflow-y-auto pr-2 flex-1 border border-gray-200 rounded-lg p-3 bg-gray-50">
                          {cam.zones.zones.map((zone, idx) => (
                            <div
                              key={zone.zone_id}
                              className="flex items-center space-x-3 text-sm bg-white rounded-lg p-3 border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all"
                            >
                              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg text-xs font-bold text-gray-600">
                                {idx + 1}
                              </div>
                              <div
                                className="w-6 h-6 rounded-md flex-shrink-0 border-2 border-gray-300 shadow-sm"
                                style={{ backgroundColor: zone.color }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-800 truncate">
                                  {zone.zone_name}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center mt-0.5">
                                  <span className="truncate">{zone.category_name}</span>
                                  <span className="mx-1">•</span>
                                  <span className="text-gray-400">{zone.zone_id}</span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-400">
                                {zone.coordinates?.length || 0} points
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400 italic py-4 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                          Chưa có zone nào được thiết lập
                        </div>
                      )}
                    </div>

                    {/* Action Button - Fixed at Bottom */}
                    <button
                      onClick={() => updateDataCamera(cam)}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-auto flex-shrink-0"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Cập nhật & Cấu hình</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerCameras;