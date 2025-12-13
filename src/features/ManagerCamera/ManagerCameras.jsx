import {
  Camera,
  MapPin,
  Image,
  AlertCircle,
  Settings,
  Monitor,
  Wifi,
  Maximize2,
  Grid3x3,
  Power,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCamerasWithZones } from "../Map/ManagerCamera.thunk";
import StatCardManagerCamera from "./components/StatCard";
import {startTrackingAnalysis , stopTrackingAnalysis} from "../../services/analysisTracking.api"
import Loading from "../../components/common/Loading";
const ManagerCameras = () => {
  const camerasWithZone = useSelector((state) => state.cameraZones);
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.authen?.user?.role);
  const cameras = camerasWithZone?.cameras || [];
  const zones = camerasWithZone?.zones || [];
  const [loading , setLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    totalCamera: 0,
    totalZones: 0,
    camerasWithImage: 0,
    camerasNeedSetup: 0,
  });
  const { selectStore } = useSelector((state) => state.user);
  useEffect(() => {
    if (cameras.length > 0 && zones.length > 0) {
      const totalCamera = cameras.length;
      const totalZones = zones.reduce(
        (sum, zone) => sum + (zone.zones?.length || 0),
        0
      );
      const camerasWithImage = zones.filter(
        (zone) => zone.backgroundImage
      ).length;
      const camerasNeedSetup = zones.filter(
        (zone) => !zone.zones || zone.zones.length === 0
      ).length;

      setMetrics({
        totalCamera,
        totalZones,
        camerasWithImage,
        camerasNeedSetup,
      });
    }
  }, [cameras, zones]);



  useEffect(() => {
    if (selectStore.storeId) {
      dispatch(fetchCamerasWithZones(selectStore.storeId));
    } else {
      console.warn("No store selected, cannot fetch cameras.");
    }
  }, [dispatch, selectStore , userRole ]);
  const getCameraWithZoneData = (camera) => {
    const zoneData = zones.find((z) => z.cameraCode === camera.cameraCode);
    return {
      ...camera,
      zones: zoneData || null,
    };
  };
  // Hàm update camera cho admin
  const updateDataCamera = (camera) => {
    console.log("Updating camera:", camera);
    // Implement your update logic here
  };
  const  togggleCameraState = async (  {type , cameraCode} ) => {
    try{
      setTimeout( () => { setLoading(true); } , 500 );
      console.log("Toggling camera state:", type , cameraCode);
      if(type === "start"){
        
        await startTrackingAnalysis( cameraCode );
      } else {

        await stopTrackingAnalysis( cameraCode );
      }
    }
    catch(error){
      console.error("Error toggling camera state:", error);
      alert("❌ Có lỗi xảy ra khi thay đổi trạng thái camera.");
    }finally{
      setTimeout( () => { setLoading(false); } , 500 );
      dispatch(fetchCamerasWithZones(selectStore.storeId));
    }
  }
  if (loading) {
    return (
      <Loading isLoading={loading}   text="Dang xử lý ......"/>
    )
  }
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
      <div className="mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-5 bg-white rounded-xl shadow-sm">
          <StatCardManagerCamera
            title="Tổng số camera"
            value={metrics.totalCamera}
            bgColor="bg-green-50"
            textColor="text-green-600"
            icon={Camera}
          />
          <StatCardManagerCamera
            title="Tổng số zones"
            value={metrics.totalZones}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
            icon={MapPin}
          />
          <StatCardManagerCamera
            title="Camera có ảnh"
            value={metrics.camerasWithImage}
            bgColor="bg-purple-50"
            textColor="text-purple-600"
            icon={Image}
          />
          <StatCardManagerCamera
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
              <p className="text-lg">
                Chưa có camera nào được thêm vào hệ thống
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {cameras.map((camera) => {
                const cam = getCameraWithZoneData(camera);
                const isActive = cam.status === "active";

                return (
                  <div
                    key={cam.cameraCode}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-400 hover:shadow-lg transition-all bg-white flex flex-col"
                  >
                    {/* Camera Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${
                            isActive
                              ? "from-purple-500 to-purple-600"
                              : "from-gray-400 to-gray-500"
                          } rounded-xl flex items-center justify-center shadow-md transition-colors`}
                        >
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {cam.cameraName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Code: {cam.cameraCode}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                            cam.zones?.zones?.length > 0
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {cam.zones?.zones?.length || 0} zones
                        </span>
                        <span
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                            isActive
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-red-100 text-red-700 border border-red-200"
                          }`}
                        >
                          {isActive ? "Đang bật" : "Đã tắt"}
                        </span>
                      </div>
                    </div>

                    {/* Store Info */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center text-sm text-blue-700">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="font-medium">Store ID:</span>
                        <span className="ml-2 font-semibold">
                          {cam.storeId}
                        </span>
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
                          <span>
                            Max: {cam.cameraSpec?.max_resolution?.width}x
                            {cam.cameraSpec?.max_resolution?.height}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Grid3x3 className="w-3 h-3 mr-1.5" />
                          <span>
                            Current: {cam.cameraSpec?.current_resolution?.width}
                            x{cam.cameraSpec?.current_resolution?.height}
                          </span>
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
                              <span className="text-xs">
                                Background available
                              </span>
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
                        {cam.zones?.backgroundImage
                          ? "Có ảnh nền"
                          : "Chưa có ảnh"}
                      </div>
                      <div
                        className={`flex items-center text-sm px-3 py-1.5 rounded-full ${
                          cam.zones?.zones?.length > 0
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "bg-orange-100 text-orange-600 border border-orange-200"
                        }`}
                      >
                        <AlertCircle className="w-4 h-4 mr-1.5" />
                        {cam.zones?.zones?.length > 0
                          ? "Đã setup"
                          : "Chưa setup"}
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
                                  {zone.zoneName}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center mt-0.5">
                                  <span className="truncate">
                                    {zone.categoryName}
                                  </span>
                                  <span className="mx-1">•</span>
                                  <span className="text-gray-400">
                                    {zone.zoneId}
                                  </span>
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

                    {/* Action Buttons - Fixed at Bottom */}
                    <div className="mt-auto pt-4 border-t border-gray-200">
                      {userRole === "admin" ? (
                        <div className="space-y-2">
                          <button
                            onClick={() => updateDataCamera(cam)}
                            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            <Settings size={20} />
                            <span>Cập nhật & Cấu hình</span>
                          </button>
                          <button
                            onClick={() => { togggleCameraState({ type: isActive ? "stop" : "start" , cameraCode: cam.cameraCode})}}
                            className={`w-full flex items-center justify-center space-x-2 font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                              isActive
                                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                            }`}
                          >
                            <Power size={20} />
                            <span>
                              {isActive ? "Tắt Camera" : "Bật Camera"}
                            </span>
                          </button>
                        </div>
                      ) : userRole === "manager" ? (
                        // Nút cho Manager - Bật/Tắt Camera
                        <button
                          onClick={() => { togggleCameraState({ type: isActive ? "stop" : "start" , cameraCode: cam.cameraCode})}}
                          className={`w-full flex items-center justify-center space-x-2 font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                            isActive
                              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                              : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                          }`}
                        >
                          <Power size={20} />
                          <span>{isActive ? "Tắt Camera" : "Bật Camera"}</span>
                        </button>
                      ) : (
                        // Không có quyền
                        <div className="text-center text-gray-500 py-3">
                          <AlertCircle size={20} className="inline mr-2" />
                          Không có quyền thao tác
                        </div>
                      )}
                    </div>
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
