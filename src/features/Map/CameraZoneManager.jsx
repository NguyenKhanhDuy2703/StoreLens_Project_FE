import { useEffect, useRef, useState, useMemo } from "react";
// Import Image as KonvaImageLib
import { Stage, Layer, Image as KonvaImageLib } from "react-konva";
// Thêm icon HelpCircle
import { Camera, Edit3, Upload, Save, AlertTriangle, XCircle, HelpCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import useImage from "use-image";

import {
  DrawingPoints,
  ZoneShape,
} from "./components/ToolDrawZone";
import CameraSidebar from "./components/CameraSideBar";
import ZonesList from "./components/ZonesList";
import ZoneForm from "./components/ZoneForm";
// Import Modal mới tạo
import ZoneGuideModal from "./components/ZoneGuideModal"; 

import {
  fetchAddZoneForCamera,
  fetchCamerasWithZones,
} from "./ManagerCamera.thunk";
import { addNewZone, deleteZone, editZone, addBackgroundImage } from "./cameraZonesSlice";

// ... (Giữ nguyên các hàm helper như calculatePolygonArea và BackgroundImage) ...
// --- Helper: Tính diện tích đa giác ---
const calculatePolygonArea = (points) => {
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }
  return Math.abs(area / 2);
};

const BackgroundImage = ({ src, onImageLoad }) => {
  const cleanSrc = src?.split("\n")[0].trim();
  const [image] = useImage(cleanSrc, "anonymous");

  useEffect(() => {
    if (image && onImageLoad) {
      onImageLoad({ width: image.width, height: image.height });
    }
  }, [image, onImageLoad]);

  if (!image) return null;
  return <KonvaImageLib image={image} />;
};

const CameraZoneManager = () => {
  const [drawingPoints, setDrawingPoints] = useState([]);
  const [showZoneForm, setShowZoneForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [warnings, setWarnings] = useState([]);
  
  // State điều khiển Modal Hướng dẫn
  const [showGuide, setShowGuide] = useState(true); // Mặc định hiện lên khi vào trang

  const dispatch = useDispatch();
  const [zoneDraf, setZoneDraf] = useState({});
  const cameraZonesState = useSelector((state) => state.cameraZones);
  const { cameras, zones, selectedCamera } = cameraZonesState;
  
  const stageRef = useRef(null);
  const containerRef = useRef(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const { selectStore } = useSelector((state) => state.user);

  useEffect(() => {
    if (selectStore?.storeId) {
      dispatch(fetchCamerasWithZones(selectStore?.storeId));
    }
  }, [dispatch, selectStore]);

  // ... (Giữ nguyên các useEffect resize container) ...
  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
  }, []);

  const scale = useMemo(() => {
    if (imageSize.width === 0 || imageSize.height === 0 || containerSize.width === 0) return 1;
    const scaleX = containerSize.width / imageSize.width;
    const scaleY = containerSize.height / imageSize.height;
    return Math.min(scaleX, scaleY);
  }, [imageSize, containerSize]);

  // ... (Giữ nguyên handleImageUpload, handleClickStage, logic save/edit/delete) ...
  // (Phần code logic nghiệp vụ này giữ y nguyên như lần trước)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedCamera) return;
    setLoadingImage(true);
    setWarnings([]);
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target.result;
      const img = new window.Image();
      img.src = imageDataUrl;
      img.onload = () => {
         const ratio = img.width / img.height;
         const targetRatio = 16 / 9;
         if (Math.abs(ratio - targetRatio) > 0.3) {
            setWarnings(prev => [...prev, {
                type: 'warning',
                text: `Lưu ý: Tỷ lệ ảnh (${ratio.toFixed(2)}) khác xa chuẩn 16:9. Hãy dùng ảnh gốc từ Camera.`
            }]);
         }
         setImageSize({ width: img.width, height: img.height });
         dispatch(addBackgroundImage({ cameraCode: selectedCamera.cam.cameraCode, backgroundImage: imageDataUrl }));
         setLoadingImage(false);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleClickStage = (e) => {
    const stage = stageRef.current;
    const pointerPosition = stage.getRelativePointerPosition();
    if (!pointerPosition) return;
    setDrawingPoints((prev) => {
      const updated = [...prev, pointerPosition];
      if (updated.length === 4) {
        const area = calculatePolygonArea(updated);
        const totalImageArea = imageSize.width * imageSize.height;
        const areaPercentage = (area / totalImageArea) * 100;
        if (areaPercentage < 1) {
             setWarnings(prev => [...prev, { type: 'error', text: `Cảnh báo: Vùng vẽ quá nhỏ (${areaPercentage.toFixed(2)}%). Hãy vẽ rộng hơn.` }]);
        } else {
            setWarnings(prev => prev.filter(w => !w.text.includes("Vùng vẽ quá nhỏ")));
        }
        const normalizedCoords = updated.map((p) => [ Number((p.x / imageSize.width).toFixed(4)), Number((p.y / imageSize.height).toFixed(4)) ]);
        setZoneDraf({ zoneId: "Z_" + Date.now(), cameraCode: selectedCamera.cam.cameraCode, zoneName: "", categoryName: "Uncategorized", color: "#FF0000", coordinates: normalizedCoords });
        setShowZoneForm(true);
      }
      if (updated.length > 4) return prev;
      return updated;
    });
  };

  const onChangeZone = (updateZones) => {
    if (!selectedCamera) return;
    setZoneDraf((prev) => ({ ...prev, ...updateZones }));
  };
  const onSaveZone = () => {
    if (!selectedCamera) return;
    dispatch(addNewZone(zoneDraf));
    setDrawingPoints([]);
    setShowZoneForm(false);
    setZoneDraf({});
    setWarnings([]);
  };
  const updateZoneToServer = () => {
    setIsSaving(true);
    if (!window.confirm("Bạn có chắc chắn muốn cập nhật zones lên server không?")) { setIsSaving(false); return; }
    dispatch(fetchAddZoneForCamera(selectedCamera.zones));
    setIsSaving(false);
  };
  const handleDeleteZone = (zoneId) => {
    if (!selectedCamera) return;
    dispatch(deleteZone({ cameraCode: selectedCamera.cam.cameraCode, zoneId }));
  };
  const handleOnEdit = (zone) => {
    setZoneDraf((prev) => ({ ...prev, ...zone, cameraCode: selectedCamera.cam.cameraCode }));
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
    setWarnings([]);
  };
  useEffect(() => {
    setDrawingPoints([]);
    setShowZoneForm(false);
    setZoneDraf({});
    setWarnings([]);
  }, [selectedCamera]);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 relative">
      
      {/* --- MODAL HƯỚNG DẪN --- */}
      <ZoneGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 space-y-4 ">
          <CameraSidebar
            cameras={cameras}
            zones={zones}
            onAddCamera={() => alert("Chức năng thêm camera chưa được triển khai")}
            onDeleteCamera={() => alert("Chức năng xóa camera chưa được triển khai")}
          />
        </div>

        <div className="col-span-9">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {selectedCamera ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex space-x-2.5 justify-center">
                    <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-purple-600 pl-3">
                      {selectedCamera?.cam?.cameraName}
                    </h2>
                    
                    {/* Nút bật lại Hướng dẫn */}
                    <button 
                        onClick={() => setShowGuide(true)}
                        className="text-gray-400 hover:text-blue-600 transition-colors ml-2"
                        title="Xem hướng dẫn vẽ Zone"
                    >
                        <HelpCircle size={20} />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <label className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer inline-flex items-center gap-2 hover:bg-blue-700 transition-colors">
                      <Upload size={18} /> {selectedCamera?.zones?.backgroundImage ? 'Đổi ảnh' : 'Upload Image'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    {selectedCamera?.zones?.backgroundImage && (
                      <>
                        {drawingPoints.length > 0 && (
                          <button onClick={onCancelDrawZone} className="px-4 py-2 bg-gray-600 text-white rounded-md inline-flex items-center gap-2 hover:bg-gray-700 transition-colors font-medium">
                            <Edit3 size={18} /> Hủy vẽ
                          </button>
                        )}
                        <button onClick={updateZoneToServer} disabled={isSaving} className={`px-4 py-2 rounded-md inline-flex items-center gap-2 font-medium transition-colors ${isSaving ? "bg-gray-400 cursor-not-allowed text-white" : "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg"}`}>
                          <Save size={18} /> {isSaving ? "Đang lưu..." : "Cập nhật"}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Vùng hiển thị cảnh báo (Warning Box) */}
                {warnings.length > 0 && (
                    <div className="space-y-2 mb-2 animate-fadeIn">
                        {warnings.map((w, index) => (
                            <div key={index} className={`flex items-start gap-2 p-3 rounded-md text-sm border ${w.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                {w.type === 'error' ? <XCircle size={18} className="mt-0.5" /> : <AlertTriangle size={18} className="mt-0.5" />}
                                <span>{w.text}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-7 gap-4">
                  <div className="col-span-5">
                    <div
                      ref={containerRef}
                      className="w-full border border-gray-200 rounded-lg bg-gray-50 flex justify-center items-center overflow-hidden relative shadow-inner"
                      style={{ height: "500px" }}
                    >
                      {/* Hint text khi chưa vẽ */}
                      {selectedCamera?.zones?.backgroundImage && drawingPoints.length === 0 && (
                          <div className="absolute top-2 left-2 z-10 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none flex items-center gap-2">
                              <Edit3 size={12}/> Click 4 điểm để tạo vùng mới
                          </div>
                      )}

                      {selectedCamera?.zones?.backgroundImage ? (
                        <Stage
                          width={imageSize.width * scale}   
                          height={imageSize.height * scale} 
                          scaleX={scale}                    
                          scaleY={scale}
                          ref={stageRef}
                          onClick={handleClickStage}
                          className="cursor-crosshair mx-auto shadow-lg"
                        >
                          <Layer>
                            <BackgroundImage 
                                src={selectedCamera?.zones?.backgroundImage} 
                                onImageLoad={setImageSize} 
                            />
                            {selectedCamera.zones.zones.map((zone, idx) => (
                              <ZoneShape key={idx} zone={zone} scale={scale} imageSize={imageSize} />
                            ))}
                            <DrawingPoints
                              points={drawingPoints.map((p) => [p.x, p.y]).flat()}
                              scale={scale}
                            />
                          </Layer>
                        </Stage>
                      ) : (
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-4">
                            <Camera size={40} className="text-gray-400" />
                          </div>
                          <p className="text-gray-500 font-medium">Chưa có hình camera</p>
                          <p className="text-sm text-gray-400 mt-1">Vui lòng upload ảnh Snapshot (16:9)</p>
                          <button onClick={() => setShowGuide(true)} className="mt-4 text-blue-600 hover:underline text-sm">Xem hướng dẫn</button>
                        </div>
                      )}
                    </div>
                    {imageSize.width > 0 && (
                        <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
                            <span>Res: {imageSize.width} x {imageSize.height} px</span>
                            <span>Scale: {scale.toFixed(2)}x</span>
                        </div>
                    )}
                  </div>
                  
                  <div className="col-span-2">
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 h-full flex flex-col">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                         Zones ({selectedCamera?.zones?.zones?.length || 0})
                      </h3>
                      <div className="flex-1 overflow-y-auto">
                        <ZonesList
                            zones={selectedCamera?.zones?.zones}
                            onDelete={handleDeleteZone}
                            onEdit={handleOnEdit}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                  <Camera size={48} className="opacity-50" />
                </div>
                <p className="text-lg font-medium text-gray-500">Chọn camera từ danh sách</p>
              </div>
            )}
          </div>
          
          {showZoneForm && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg animate-fadeIn">
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
                  setWarnings([]);
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