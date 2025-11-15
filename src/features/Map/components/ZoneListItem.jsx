import { Edit2, Eye, EyeOff, Trash2 } from "lucide-react";

const ZoneListItem = ({ zone, onToggleVisibility, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white rounded-lg border-2 hover:border-purple-400 hover:shadow-md transition-all">
      {/* Header với tên zone và actions */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div
            className="w-6 h-6 rounded-md flex-shrink-0 border-2 border-white shadow-sm"
            style={{ backgroundColor: zone?.color }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 truncate">
              {zone?.zone_name || 'Unnamed Zone'}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              ID: {zone?.zone_id}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={onToggleVisibility}
            className="text-gray-600 hover:bg-gray-100 p-1.5 rounded transition-colors"
            title={zone?.visible ? 'Ẩn zone' : 'Hiện zone'}
          >
            {zone?.visible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button
            onClick={onEdit}
            className="text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-colors"
            title="Chỉnh sửa"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Xóa zone "${zone?.zone_name}"?`)) {
                onDelete();
              }
            }}
            className="text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors"
            title="Xóa"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Category:</span>
          <span 
            className="px-2 py-1 rounded-full font-medium"
            style={{ 
              backgroundColor: zone?.color + '20',
              color: zone?.color 
            }}
          >
            {zone?.category_name}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Coordinates:</span>
          <span className="text-gray-700 font-mono">
            {zone?.coordinates?.length || 0} points
          </span>
        </div>

        {/* Hiển thị preview tọa độ */}
        {zone?.coordinates && zone.coordinates.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <details className="text-xs">
              <summary className="cursor-pointer text-gray-600 hover:text-gray-900 font-medium">
                View coordinates
              </summary>
              <div className="mt-2 space-y-1 pl-2">
                {zone.coordinates.map((coord, idx) => (
                  <div key={idx} className="text-gray-600 font-mono">
                    P{idx + 1}: ({coord[0]}, {coord[1]})
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>

      {/* Status indicator */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-0.5 rounded-full font-medium ${
            zone?.visible 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {zone?.visible ? 'Visible' : 'Hidden'}
          </span>
        </div>
      </div>
    </div>
  );
}
export default ZoneListItem;