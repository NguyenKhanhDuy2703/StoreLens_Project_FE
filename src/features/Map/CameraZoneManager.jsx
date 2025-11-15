import { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { Camera, Edit3, Upload } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCameraWithZones } from "./cameraZonesSlice";
import { DrawingPoints, KonvaImage, ZoneShape } from "./components/toolDrawZone";
import TabNavigation from "./components/TabNavigation";
import CameraSidebar from "./components/CameraSideBar";
import ZonesList from "./components/ZonesList";
import DashboardCameras from "./components/DashboardCameras";
import ZoneForm from "./components/ZoneForm";

const CameraZoneManager = () => {
  const [activeTab, setActiveTab] = useState("cameras");
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [metricCameraZones, setMetricCameraZones] = useState({
    totalCameras: 0,
    totalZones: 0,
    camerasWithImages: 0,
    camerasWithoutSetup: 0,
  });
  const [editingZoneId, setEditingZoneId] = useState(null);
  const [drawingPoints, setDrawingPoints] = useState([]);
  const [showZoneForm, setShowZoneForm] = useState(false);
  const dispatch = useDispatch();
  const cameraZonesState = useSelector((state) => state.cameraZones);
const stageRef = useRef(null);
  useEffect(() => {
    dispatch(fetchCameraWithZones(""));
  }, [dispatch]);

  // Nhận danh sách camera từ Redux
  useEffect(() => {
    if (cameraZonesState.listCameraWithZones?.length > 0) {
      setCameras(cameraZonesState.listCameraWithZones);
      setMetricCameraZones({
        totalCameras: cameraZonesState.totalCamera,
        totalZones: cameraZonesState.totalZones,
        camerasWithImages: cameraZonesState.cameraHaveImage,
        camerasWithoutSetup: cameraZonesState.cameraNotSettuped,
      });
    }
  }, [cameraZonesState]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedCamera) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const updated = cameras.map((c) =>
        c.camera_code === selectedCamera.camera_code
          ? { ...c, background_image: event.target.result }
          : c
      );

      setCameras(updated);
      setSelectedCamera({
        ...selectedCamera,
        background_image: event.target.result,
      });
    };
    reader.readAsDataURL(file);
  };
  const onSelectCamera = (cameraCode) => {
    const cam = cameras.find((c) => c.cameraCode === cameraCode);
    setSelectedCamera(cam || null);
  };
 const handleStageClick = (e) => {
    if (!selectedCamera?.zones.background_image || drawingPoints.length >= 4) return;
    const pos = e.target.getStage().getPointerPosition();
    const newPoints = [...drawingPoints, pos];
    setDrawingPoints(newPoints);
    if (newPoints.length === 4) setShowZoneForm(true);
  };


  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      {/* TAB CAMERAS */}
      {activeTab === "cameras" && (
        <div className="grid grid-cols-12 gap-4">
          {/* Left Side: Tabs + Sidebar Camera */}
          <div className="col-span-3 space-y-4 ">
            {/* Tabs */}
            <TabNavigation
              onChangeTab={(tab) => setActiveTab(tab)}
              activeTab={activeTab}
            />

            {/* Sidebar Camera */}
            <CameraSidebar
              cameras={cameras}
              selectedCamera={selectedCamera}
              onSelectCamera={(camCode) => onSelectCamera(camCode)}
              onAddCamera={() =>
                alert("Chức năng thêm camera chưa được triển khai")
              }
              onDeleteCamera={() =>
                alert("Chức năng xóa camera chưa được triển khai")
              }
            />
          </div>

          {/* Main Content Area */}
          {activeTab === "cameras" && (<div className="col-span-9">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {selectedCamera ? (
                <div className="space-y-4">
                  {/* Camera Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedCamera.cameraName}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Code: {selectedCamera.cameraCode}
                      </p>
                    </div>
                    {!selectedCamera.zones.background_image ? (
                      <label className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer inline-flex items-center gap-2 hover:bg-blue-700 transition-colors">
                        <Upload size={18} /> Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md inline-flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium"
                      >
                        <Edit3 size={18} />
                        Cập nhật Zone
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-7 gap-4">
                    {/* Stage Image - Left 2/3 */}
                    <div className="col-span-5">
                      <div
                        className="w-full border border-gray-200 rounded-lg bg-gray-50 flex justify-center items-center overflow-hidden"
                        style={{ height: "500px" }}
                      >
                        {selectedCamera.zones.background_image ? (
                          <Stage width={600} height={500}
                            onClick={handleStageClick}
                            className="cursor-crosshair mx-auto"
                         
                          >
                            <Layer >
                              <KonvaImage
                                src={selectedCamera.zones.background_image}
                                width={600}
                                height={500}
                              />
                              {selectedCamera.zones.zones.map((zone, idx) => (
                                <ZoneShape key={idx} zone={zone} />
                              ))}
                              <DrawingPoints points={drawingPoints.map(p => [p.x , p.y]).flat()} />
                            </Layer>
                          </Stage>
                        ) : (
                          <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-4">
                              <Camera size={40} className="text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">
                              Chưa có hình camera
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                              Upload ảnh để bắt đầu
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Zones List - Right 1/3 */}
                    <div className="col-span-2">
                      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M12 2L2 7l10 5 10-5-10-5z"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 17l10 5 10-5M2 12l10 5 10-5"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Zones ({selectedCamera.zones.zones?.length || 0})
                        </h3>
                        <ZonesList zones={selectedCamera.zones.zones} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                    <Camera size={48} className="opacity-50" />
                  </div>
                  <p className="text-lg font-medium text-gray-500">
                    Chọn camera từ danh sách
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Chọn camera bên trái để xem chi tiết và quản lý zones
                  </p>
                </div>
              )}
            </div>
            {showZoneForm && (<div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <ZoneForm zone={selectedCamera.zones.zones} />
                </div> )}
          </div>)
          }
        </div>
      )}

      {/* TAB DASHBOARD */}
      {activeTab === "dashboard" && (
       <DashboardCameras cameras={cameras} metricCameraZones={metricCameraZones} />
      )}
    </div>
  );
};

export default CameraZoneManager;
