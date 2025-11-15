import { use, useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { Camera, Upload } from "lucide-react";
import TabNavigation from "./components/TabNavigation";
import CameraSidebar from "./components/CameraSideBar";
import ZoneForm from "./components/ZoneForm";
import DashboardCameras from "./components/DashboardCameras";
import ZonesList from "./components/ZonesList";
import { KonvaImage, ZoneShape, DrawingPoints } from "./components/toolDrawZone";
import {useSelector , useDispatch} from"react-redux";
import { fetchCameraWithZones } from "./cameraZonesSlice";
const CameraZoneManager = () => {
  const [activeTab, setActiveTab] = useState("cameras");
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [drawingPoints, setDrawingPoints] = useState([]);
  const [zoneFormData, setZoneFormData] = useState({ labelName: "", labelColor: "#3B82F6" });
  const [editingZoneId, setEditingZoneId] = useState(null);
  const [showZoneForm, setShowZoneForm] = useState(false);
  const [metricCameraZones , setMetricCameraZones] = useState({ totalCamera:0, totalZones:0, cameraHaveImage:0, cameraNotSettuped:0});
  const stageRef = useRef(null);
  const dispatch = useDispatch();
  const cameraZonesState = useSelector((state) => state.cameraZones);
  useEffect(() => {
     ( () => {
        dispatch( fetchCameraWithZones(""));
     })();
  }, []);
  useEffect(() => {
    if (cameraZonesState.listCameraWithZones.length > 0) {
      setMetricCameraZones({
        totalCamera: cameraZonesState.totalCamera,
        totalZones: cameraZonesState.totalZones,
        cameraHaveImage: cameraZonesState.cameraHaveImage,
        cameraNotSettuped: cameraZonesState.cameraNotSettuped,
      });
      setCameras(cameraZonesState.listCameraWithZones);
    }
  },[cameraZonesState]);
  // --- Upload hình camera ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedCamera) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const updated = cameras.map((c) =>
        c.id === selectedCamera.id ? { ...c, image: event.target.result } : c
      );
      setCameras(updated);
      setSelectedCamera({ ...selectedCamera, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  // --- Xử lý click trên ảnh để vẽ zone ---
  const handleStageClick = (e) => {
    
    if (!selectedCamera?.background_image || drawingPoints.length >= 4) return;
    const pos = e.target.getStage().getPointerPosition();
    console.log(pos);
    const newPoints = [...drawingPoints, pos];
    setDrawingPoints(newPoints);
    if (newPoints.length === 4) setShowZoneForm(true);
  };

  // --- Thay đổi thông tin zone ---
  const handleChangeZone = (updatedZone) => {
    setZoneFormData(updatedZone);
  };

  // --- Lưu zone (thêm hoặc cập nhật) ---
  const handleSaveZone = () => {
    if (!selectedCamera || !zoneFormData.labelName) return;

    if (editingZoneId) {
      // Cập nhật zone
      const updatedZones = selectedCamera.zones.map((z) =>
        z.id === editingZoneId ? { ...z, ...zoneFormData } : z
      );
      updateCameraZones(updatedZones);
    } else if (drawingPoints.length === 4) {
      // Thêm mới zone
      const newZone = {
        ...zoneFormData,
        id: Date.now(),
        points: drawingPoints,
        visible: true,
      };
      updateCameraZones([...selectedCamera.zones, newZone]);
    }

    resetZoneForm();
  };

  // --- Cập nhật danh sách zone cho camera hiện tại ---
  const updateCameraZones = (zones) => {
    const updatedCameras = cameras.map((c) =>
      c.id === selectedCamera.id ? { ...c, zones } : c
    );
    setCameras(updatedCameras);
    setSelectedCamera({ ...selectedCamera, zones });
  };

  // --- Bắt đầu chỉnh sửa zone ---
  const handleEditZone = (zoneId) => {
    const zone = selectedCamera.zones.find((z) => z.id === zoneId);
    if (!zone) return;
    setZoneFormData({ ...zone });
    setEditingZoneId(zoneId);
    setDrawingPoints(zone.points);
    setShowZoneForm(true);
  };

  // --- Xóa zone ---
  const handleDeleteZone = (zoneId) => {
    const updatedZones = selectedCamera.zones.filter((z) => z.id !== zoneId);
    updateCameraZones(updatedZones);
  };

  // --- Reset form ---
  const resetZoneForm = () => {
    setDrawingPoints([]);
    setZoneFormData({ labelName: "", labelColor: "#3B82F6" });
    setEditingZoneId(null);
    setShowZoneForm(false);
  };

  // --- Thêm / Xóa / Chọn camera ---
  const handleAddCamera = () => {
    const newCam = { id: Date.now(), name: `Camera ${cameras.length + 1}`, image: null, zones: [] };
    setCameras([...cameras, newCam]);
  };

  const handleDeleteCamera = (id) => {
    const updated = cameras.filter((c) => c.id !== id);
    setCameras(updated);
    if (selectedCamera?.id === id) setSelectedCamera(null);
  };

  console.log(selectedCamera)
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "cameras" && (
        <div className="grid grid-cols-12 gap-4">
          {/* --- Sidebar Camera --- */}
          <div className="col-span-3">
            <CameraSidebar
              cameras={cameras}
              selectedCamera={selectedCamera}
              onSelectCamera={setSelectedCamera}
              onDeleteCamera={handleDeleteCamera}
              onAddCamera={handleAddCamera}
            />
          </div>

          {/* --- Vùng vẽ Zone --- */}
          <div className="col-span-6 bg-white rounded-lg shadow-sm p-4">
            {selectedCamera  ? (
              <>
                <div className="mb-4 flex justify-center gap-2">
                  {!selectedCamera.background_image && (
                    <label className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer inline-flex items-center gap-2">
                    <Upload size={18} /> Upload Image
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  )}

                  {drawingPoints.length > 0 && (
                    <button onClick={resetZoneForm} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                      Hủy vẽ
                    </button>
                  )}
                </div>

                <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-100">
                  
                  <Stage ref={stageRef} width={selectedCamera.width_frame} height={selectedCamera.height_frame} onClick={handleStageClick} className="cursor-crosshair mx-auto">
                    <Layer>
                      {selectedCamera.background_image && <KonvaImage src={selectedCamera.background_image}  height = {selectedCamera.height_frame}  width ={selectedCamera.width_frame}/>}
                      {selectedCamera.zones.map((zone) => <ZoneShape key={zone.zone_id} zone={zone} />)}
                      <DrawingPoints points={drawingPoints.map(p => [p.x , p.y]).flat()} />
                    </Layer>
                  </Stage>
                </div>

                {(showZoneForm || editingZoneId) && (
                  <div className="mt-4">
                    <ZoneForm
                      zone={zoneFormData}
                      isEditing={!!editingZoneId}
                      onChange={handleChangeZone}
                      onSave={handleSaveZone}
                      onCancel={resetZoneForm}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                <Camera size={48} className="opacity-50 mb-2" />
                <p>Chọn camera từ danh sách bên trái</p>
              </div>
            )}
          </div>

          {/* --- Danh sách Zone --- */}
          <div className="col-span-3  ">
            {selectedCamera && selectedCamera.zones.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-4 ">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Danh sách Zone ({selectedCamera.zones.length})
                </h3>
                <ZonesList zones={selectedCamera.zones} onDelete={handleDeleteZone} onEdit={handleEditZone} />
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "dashboard" && <DashboardCameras cameras={cameras} metricCameraZones = {metricCameraZones} />}
    </div>
  );
};

export default CameraZoneManager;
