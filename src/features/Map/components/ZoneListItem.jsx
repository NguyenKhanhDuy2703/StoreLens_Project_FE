import { Edit2, Eye, Trash2 } from "lucide-react";

const ZoneListItem = ({ zone, onToggleVisibility, onEdit, onDelete }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:border-purple-300 transition-all">
    <div className="flex items-center space-x-3 flex-1">
      <div
        className="w-4 h-4 rounded flex-shrink-0"
        style={{ backgroundColor: zone.labelColor }}
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{zone.name}</p>
        <p className="text-xs text-gray-600 truncate">{zone.labelName}</p>
      </div>
    </div>
    <div className="flex items-center space-x-1">
      <button
        onClick={onToggleVisibility}
        className="text-gray-600 hover:bg-gray-200 p-2 rounded"
        title={zone.visible ? 'Ẩn zone' : 'Hiện zone'}
      >
        {zone.visible ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
      <button
        onClick={onEdit}
        className="text-blue-600 hover:bg-blue-50 p-2 rounded"
        title="Chỉnh sửa"
      >
        <Edit2 size={16} />
      </button>
      <button
        onClick={() => {
          if (window.confirm('Xóa zone này?')) {
            onDelete();
          }
        }}
        className="text-red-600 hover:bg-red-50 p-2 rounded"
        title="Xóa"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);
export default ZoneListItem;