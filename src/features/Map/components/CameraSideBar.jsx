import { Plus } from "lucide-react";
import CameraListItem from "./CameraListItem";

const CameraSidebar = ({ cameras = [], selectedCamera, onSelectCamera, onAddCamera, onDeleteCamera }) => 
{
   return (
   <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Danh sách camera</h2>
      <button
        onClick={onAddCamera}
        className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-purple-700 flex items-center"
      >
        <Plus size={16} className="mr-1" /> Thêm
      </button>
    </div>
    <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
      {cameras.map(cam => (
        <CameraListItem
          key={cam.id}
          camera={cam}
          isSelected={selectedCamera?.id === cam.id}
          onSelect={() => onSelectCamera(cam)}
          onDelete={() => onDeleteCamera(cam.id)}
        />
      ))}
    </div>
  </div>
 )
}

export default CameraSidebar;