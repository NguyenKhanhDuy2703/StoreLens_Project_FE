import {  useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { Camera, Edit3, Upload, Save } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  DrawingPoints,
  KonvaImage,
  ZoneShape,
} from "./components/ToolDrawZone";
import CameraSidebar from "./components/CameraSideBar";
import ZonesList from "./components/ZonesList";
import ZoneForm from "./components/ZoneForm";
import {
  fetchAddZoneForCamera,
  fetchCamerasWithZones,
} from "./ManagerCamera.thunk";
import { addNewZone, deleteZone  , editZone  , addBackgroundImage} from "./cameraZonesSlice";

const CameraZoneManager = () => {
  const [drawingPoints, setDrawingPoints] = useState([]);
  const [showZoneForm, setShowZoneForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const [zoneDraf, setZoneDraf] = useState({});
  const cameraZonesState = useSelector((state) => state.cameraZones);
  const { cameras, zones, selectedCamera , loading , isChange} = cameraZonesState;
  const stageRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    dispatch(fetchCamerasWithZones(""));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedCamera) return;

    setLoadingImage(true);   // bật loading

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target.result;

      const img = new window.Image();
      img.src = imageDataUrl;
      img.onload = () => {
        dispatch(
          addBackgroundImage({
            cameraCode: selectedCamera.cam.cameraCode,
            backgroundImage: imageDataUrl,
          })
        );
        setLoadingImage(false); // tắt loading khi ảnh load xong
      };
    };
    
    reader.readAsDataURL(file);
  };

  const handleClickStage = (e) => {
    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    setDrawingPoints((prev) => {
      const updated = [...prev, pointerPosition];

      if (updated.length === 4) {
        setZoneDraf({
          zoneId: "Z_" + Date.now(),
          cameraCode: selectedCamera.cam.cameraCode,
          zoneName: "",
          categoryName: "Uncategorized",
          color: "#FF0000",
          coordinates: updated.map((p) => [p.x, p.y]),
        });
        setShowZoneForm(true);
      }

      return updated;
    });
  };

  const onChangeZone = (updateZones) => {
    if (!selectedCamera) return;
    setZoneDraf((prev) => ({
      ...prev,
      zoneName: updateZones.zoneName,
      categoryName: updateZones.categoryName,
      color: updateZones.color,
    }));
  };

  const onSaveZone = () => {
    if (!selectedCamera) return;
   
    dispatch(addNewZone(zoneDraf));
    setDrawingPoints([]);
    setShowZoneForm(false);
    setZoneDraf({});
  };

  const updateZoneToServer = () => {
    setIsSaving(true);
    // hỏi xác nhận
    const windowConfirm = window.confirm(
      "Bạn có chắc chắn muốn cập nhật zones lên server không?"
    );
    if (!windowConfirm) {
      setIsSaving(false);
      return;
    }
    dispatch(fetchAddZoneForCamera(selectedCamera.zones));
    setIsSaving(false);
  };

  const handleDeleteZone = (zoneId) => {
    if (!selectedCamera) return;
    dispatch(deleteZone({ cameraCode: selectedCamera.cam.cameraCode, zoneId }));
  };

  const handleOnEdit = (zone) => {
    setZoneDraf((prev) => {
      return { ...prev, ...zone, cameraCode: selectedCamera.cam.cameraCode };
    });
    setShowZoneForm(true);
    setIsEditing(true);
  };

  const onSaveEditZone = () => {
    if (!selectedCamera) return;
    dispatch(editZone({ cameraCode: selectedCamera.cam.cameraCode, zoneData: zoneDraf }));
    setDrawingPoints([]);
    setShowZoneForm(false);
    setZoneDraf({});
  };

  const onCancelDrawZone = () => {
    setIsEditing(false);      
    setShowZoneForm(false);    
    setDrawingPoints([]);    
    setZoneDraf(null);  
  };

  useEffect(() => {
    setDrawingPoints([]);
    setShowZoneForm(false);
    setZoneDraf({});  
  },[selectedCamera]);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 space-y-4 ">
          <CameraSidebar
            cameras={cameras}
            zones={zones}
            onAddCamera={() =>
              alert("Chức năng thêm camera chưa được triển khai")
            }
            onDeleteCamera={() =>
              alert("Chức năng xóa camera chưa được triển khai")
            }
          />
        </div>
        <div className="col-span-9">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {selectedCamera ? (
              <div className="space-y-4">
                {/* Camera Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  {selectedCamera?.cam ? (
                    <div className="flex space-x-2.5 justify-center">
                      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-purple-600 pl-3  ">
                        {selectedCamera.cam.cameraName}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        - Code: {selectedCamera.cam.cameraCode}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        No Camera Selected
                      </h2>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <label className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer inline-flex items-center gap-2 hover:bg-blue-700 transition-colors">
                      <Upload size={18} /> {selectedCamera?.zones?.backgroundImage ? 'Đổi ảnh' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {selectedCamera?.zones?.backgroundImage && (
                      <>
                        {drawingPoints.length > 0 && (
                          <button 
                            onClick={onCancelDrawZone}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md inline-flex items-center gap-2 hover:bg-gray-700 transition-colors font-medium"
                          >
                            <Edit3 size={18} />
                            Hủy vẽ
                          </button>
                        )}
                        <button
                          onClick={updateZoneToServer}
                          disabled={isSaving}
                          className={`px-4 py-2 rounded-md inline-flex items-center gap-2 font-medium transition-colors ${
                            isSaving
                              ? "bg-gray-400 cursor-not-allowed text-white"
                              : "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg"
                          }`}
                        >
                          <Save size={18} />
                          {isSaving ? "Đang lưu..." : "Cập nhật"}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-4">
                  {/* Stage Image - Left 2/3 */}
                  <div className="col-span-5">
                    <div
                      className="w-full border border-gray-200 rounded-lg bg-gray-50 flex justify-center items-center overflow-hidden"
                      style={{ height: "500px" }}
                    >
                      {selectedCamera?.zones?.backgroundImage ? (
                        <Stage
                          width={600}
                          height={500}
                          ref={stageRef}
                          onClick={(e) => handleClickStage(e)}
                          className="cursor-crosshair mx-auto"
                        >
                          <Layer>
                            <KonvaImage
                              src={selectedCamera?.zones?.backgroundImage}
                              width={600}
                              height={500}
                            />
                            {selectedCamera.zones.zones.map((zone, idx) => (
                              <ZoneShape key={idx} zone={zone} />
                            ))}
                            <DrawingPoints
                              points={drawingPoints
                                .map((p) => [p.x, p.y])
                                .flat()}
                            />
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
                        Zones ({selectedCamera?.zones?.zones?.length || 0})
                      </h3>
                      <ZonesList
                        zones={selectedCamera?.zones?.zones}
                        onDelete={handleDeleteZone}
                        onEdit={handleOnEdit}
                      />
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
          {showZoneForm && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <ZoneForm
                cameraCode={selectedCamera.cam.cameraCode}
                zone={zoneDraf}
                onChange={onChangeZone}
                onSave={onSaveZone}
                isEditing={isEditing}
                onEdit={onSaveEditZone}
                onCancel={() => {
                  setIsEditing(false);
                  setShowZoneForm(false);
                  setDrawingPoints([]);
                  setZoneDraf({});
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraZoneManager;