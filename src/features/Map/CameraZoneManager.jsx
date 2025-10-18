import { useRef, useState  , useEffect} from "react";

import TabNavigation from "../Map/components/TabNavigation";
import CameraSidebar from "../Map/components/CameraSideBar";
import CanvasDrawing from "../Map/components/CanvasDrawing";
import ZonesList from "../Map/components/ZonesList";
import DashboardCameras from "./components/DashboardCameras";
import { Camera } from "lucide-react";
import ZoneForm from "./components/ZoneForm";

const CameraZoneManager = () => {
  const [activeTab, setActiveTab] = useState('cameras');
  const [cameras, setCameras] = useState([
    { id: 1, name: 'Camera 1', image: null, zones: [] },
  ]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [drawingPoints, setDrawingPoints] = useState([]);
  const [newZone, setNewZone] = useState({ 
    name: '', 
    labelName: '', 
    labelColor: '#3B82F6' 
  });
  const [showZoneForm, setShowZoneForm] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // Canvas drawing logic
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    if (selectedCamera?.image) {
      const img = imageRef.current;
      if (img) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }
    
    // Draw existing zones
    const zones = selectedCamera?.zones || [];

    zones.forEach((zone) => {
      if (!zone.visible) return;
      // bắt đầu một path mới vẽ đa giác
      ctx.beginPath();
      // moveTo điểm đầu tiên
      ctx.moveTo(zone.points[0].x, zone.points[0].y);
      // lock qua các điểm còn lại => nối lại bằng lineTo
      zone.points.forEach((point, i) => {
        if (i > 0) ctx.lineTo(point.x, point.y);
      });
      ctx.closePath();

      ctx.strokeStyle = zone.labelColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = zone.labelColor + '22';

      ctx.fill();
      
      const centerX = zone.points.reduce((sum, p) => sum + p.x, 0) / 4;
      const centerY = zone.points.reduce((sum, p) => sum + p.y, 0) / 4;
      

      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

      ctx.fillRect(centerX - 60, centerY - 25, 120, 40);
      
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(zone.name, centerX, centerY - 5);
      
      ctx.fillStyle = zone.labelColor;
      ctx.font = '12px Arial';
      ctx.fillText(zone.labelName, centerX, centerY + 10);
    });
    
    // Draw current drawing points
    drawingPoints.forEach((point, idx) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#EF4444';
      ctx.fill();
      ctx.strokeStyle = '#FFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(idx + 1, point.x, point.y + 4);
      
      if (idx > 0) {
        ctx.beginPath();
        ctx.moveTo(drawingPoints[idx - 1].x, drawingPoints[idx - 1].y);
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
    
    // Close the polygon if we have 4 points
    if (drawingPoints.length === 4) {
      ctx.beginPath();
      ctx.moveTo(drawingPoints[3].x, drawingPoints[3].y);
      ctx.lineTo(drawingPoints[0].x, drawingPoints[0].y);
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (selectedCamera) {
          const updatedCameras = cameras.map(cam => 
            cam.id === selectedCamera.id 
              ? { ...cam, image: event.target.result }
              : cam
          );
          setCameras(updatedCameras);
          setSelectedCamera({ ...selectedCamera, image: event.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e) => {
    if (!selectedCamera?.image || drawingPoints.length >= 4) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDrawingPoints([...drawingPoints, { x, y }]);
    
    if (drawingPoints.length === 3) {
      setShowZoneForm(true);
    }
  };

  const saveZone = () => {
    if (drawingPoints.length === 4 && newZone.name && newZone.labelName && selectedCamera) {
      const zone = {
        id: Date.now(),
        name: newZone.name,
        labelName: newZone.labelName,
        labelColor: newZone.labelColor,
        points: [...drawingPoints],
        visible: true
      };
      
      const updatedCameras = cameras.map(cam =>
        cam.id === selectedCamera.id
          ? { ...cam, zones: [...cam.zones, zone] }
          : cam
      );
      
      setCameras(updatedCameras);
      setSelectedCamera({ ...selectedCamera, zones: [...selectedCamera.zones, zone] });
      resetZoneForm();
    }
  };

  const updateZone = () => {
    if (!editingZone || !selectedCamera) return;
    
    const updatedCameras = cameras.map(cam =>
      cam.id === selectedCamera.id
        ? {
            ...cam,
            zones: cam.zones.map(z =>
              z.id === editingZone.id ? { ...z, ...newZone } : z
            )
          }
        : cam
    );
    
    setCameras(updatedCameras);
    setSelectedCamera(updatedCameras.find(c => c.id === selectedCamera.id));
    setEditingZone(null);
    resetZoneForm();
  };

  const resetZoneForm = () => {
    setDrawingPoints([]);
    setNewZone({ name: '', labelName: '', labelColor: '#3B82F6' });
    setShowZoneForm(false);
    setEditingZone(null);
  };

  const deleteZone = (zoneId) => {
    if (!selectedCamera) return;
    
    const updatedCameras = cameras.map(cam =>
      cam.id === selectedCamera.id
        ? { ...cam, zones: cam.zones.filter(z => z.id !== zoneId) }
        : cam
    );
    
    setCameras(updatedCameras);
    setSelectedCamera(updatedCameras.find(c => c.id === selectedCamera.id));
  };
  // hiển thị  bật / ẩn zone
  const toggleZoneVisibility = (zoneId) => {
    if (!selectedCamera) return;
    
    const updatedCameras = cameras.map(cam =>
      cam.id === selectedCamera.id
        ? {
            ...cam,
            zones: cam.zones.map(z =>
              z.id === zoneId ? { ...z, visible: !z.visible } : z
            )
          }
        : cam
    );
    
    setCameras(updatedCameras);
    setSelectedCamera(updatedCameras.find(c => c.id === selectedCamera.id));
  };

  const addCamera = () => {
    const newCam = {
      id: Date.now(),
      name: `Camera ${cameras.length + 1}`,
      image: null,
      zones: []
    };
    setCameras([...cameras, newCam]);
  };

  const deleteCamera = (camId) => {
    setCameras(cameras.filter(c => c.id !== camId));
    if (selectedCamera?.id === camId) {
      setSelectedCamera(null);
    }
  };

  const updateDataCamera = (updatedCamera) => {
    console.log("Updating camera data:", updatedCamera);
  }
  useEffect(() => {
    drawCanvas();
  }, [drawingPoints, selectedCamera]);

  useEffect(() => {
    if (imageRef.current && selectedCamera?.image) {
      imageRef.current.onload = drawCanvas;
    }
  }, [selectedCamera?.image]);

  return (
    <div className="min-h-screen full-w bg-gray-50 p-4">
      <div className="full-w mx-auto">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'cameras' && (
          <div className="grid grid-cols-3 gap-6">
            <CameraSidebar
              cameras={cameras}
              selectedCamera={selectedCamera}
              onSelectCamera={setSelectedCamera}
              onAddCamera={addCamera}
              onDeleteCamera={deleteCamera}
            />

            <div className="col-span-2 bg-white rounded-lg shadow-sm p-4">
              {selectedCamera ? (
                <>
                  <CanvasDrawing
                    camera={selectedCamera}
                    drawingPoints={drawingPoints}
                    onCanvasClick={handleCanvasClick}
                    onImageUpload={handleImageUpload}
                    onCancelDrawing={resetZoneForm}
                    canvasRef={canvasRef}
                    imageRef={imageRef}
                  />

                  {(showZoneForm || editingZone) && (
                    <ZoneForm
                      zone={newZone}
                      isEditing={!!editingZone}
                      onSave={editingZone ? updateZone : saveZone}
                      onCancel={resetZoneForm}
                      onChange={setNewZone}
                    />
                  )}

                  {selectedCamera.zones.length > 0 && (
                    <ZonesList
                      zones={selectedCamera.zones}
                      onToggleVisibility={toggleZoneVisibility}
                      onEdit={(zone) => {
                        setEditingZone(zone);
                        setNewZone({
                          name: zone.name,
                          labelName: zone.labelName,
                          labelColor: zone.labelColor
                        });
                      }}
                      onDelete={deleteZone}
                    />
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-400">
                  <div className="text-center">
                    <Camera size={48} className="mx-auto mb-2" />
                    <p>Chọn camera từ danh sách bên trái</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && <DashboardCameras cameras={cameras} updateDataCamera = {updateDataCamera} />}
      </div>
    </div>
  );
};

export default CameraZoneManager;