import { Save } from "lucide-react";
import ColorPicker from "./ColorPicker";

const ZoneForm = ({ zone, isEditing, onSave, onCancel, onChange  , }) =>  {
 
  return (
  <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border-2 border-purple-300">
    <h3 className="font-semibold mb-3 text-purple-900">
      {isEditing ? ' Chỉnh sửa Zone' : ' Thông tin Zone mới'}
    </h3>
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Phân loại</label>
        <input
          type="text"
          placeholder="VD: Thống kê lưu lượng"
          value={zone.labelName}
          onChange={(e) => onChange({ ...zone, labelName: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <ColorPicker
        selectedColor={zone.labelColor}
        onColorChange={(color) => onChange({ ...zone, labelColor: color })}
      />
      <div className="flex space-x-2">
        <button
          onClick={onSave}
          disabled={ !zone.labelName}
          className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 flex items-center justify-center"
        >
          <Save size={16} className="mr-2" />
          {isEditing ? 'Cập nhật Zone' : 'Lưu Zone'}
        </button>
        {isEditing && (
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
        )}
      </div>
    </div>
  </div>
  )
}
export default ZoneForm;