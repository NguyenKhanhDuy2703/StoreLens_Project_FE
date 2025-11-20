import { Save } from "lucide-react";
import ColorPicker from "./ColorPicker";

const CATEGORIES = [
  "Khu vực bán hàng",
  "Khu vực thanh toán",
  "Tủ đông - Tủ mát",
  "Rau - Củ - Quả",
  "Đồ uống",
  "Bánh kẹo",
  "Mỹ phẩm",
  "Gia dụng",
  "Đồ ăn nhanh",
  "Khu vực nhân viên",
];

const ZoneForm = ({ zone, isEditing, onSave, onCancel, onChange , onEdit }) => {
  return (
    <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-lg border-2 border-purple-300">
      <h3 className="font-semibold mb-4 text-purple-900 text-lg">
        {isEditing ? "✏️ Chỉnh sửa Zone" : "➕ Thông tin Zone mới"}
      </h3>
      
      <div className="space-y-4">
        {/* Zone Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Tên Zone
          </label>
          <input
            type="text"
            value={zone?.zoneName || ""}
            onChange={(e) => onChange({ ...zone, zoneName: e.target.value })}
            placeholder="Nhập tên zone..."
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phân loại
          </label>
          <select
            value={zone?.categoryName || ""}
            onChange={(e) => onChange({ ...zone, categoryName: e.target.value })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            <option value="">-- Chọn phân loại --</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Màu sắc
          </label>
          <ColorPicker
            selectedColor={zone?.color || "#3B82F6"}
            onColorChange={(color) => onChange({ ...zone, color: color })}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={!isEditing ? onSave : onEdit }
            disabled={!zone?.zoneName || !zone?.color}
            className="flex-1 bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center font-medium transition-colors shadow-sm"
          >
            <Save size={18} className="mr-2" />
            {isEditing ? "Cập nhật" : "Lưu Zone"}
          </button>
          {isEditing && (
            <button
              onClick={onCancel}
              className="px-6 py-2.5 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition-colors"
            >
              Hủy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZoneForm;