import { Camera, Trash2 } from "lucide-react";

const CameraListItem = ({ camera, isSelected, onSelect, onDelete }) => (
  <div
    onClick={onSelect}
    className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${
      isSelected
        ? 'border-purple-600 bg-purple-50'
        : 'border-gray-200 hover:border-purple-300'
    }`}
  >
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <Camera size={18} className="text-purple-600" />
        <span className="font-medium">{camera.name}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm('Xóa camera này?')) {
            onDelete();
          }
        }}
        className="text-red-600 hover:bg-red-50 p-1 rounded"
      >
        <Trash2 size={14} />
      </button>
    </div>
    <div className="flex items-center justify-between text-xs">
      <span className={`px-2 py-0.5 rounded ${
        camera.image ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
      }`}>
        {camera.image ? '✓ Có ảnh' : '○ Chưa có ảnh'}
      </span>
      <span className="text-gray-600">
        {camera.zones.length} zones
      </span>
    </div>
  </div>
);
export default CameraListItem;