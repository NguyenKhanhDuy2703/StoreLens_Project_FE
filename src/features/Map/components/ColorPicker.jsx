const COLOR_PRESETS = [
  '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', 
  '#10B981', '#F59E0B', '#06B6D4', '#84CC16'
];
const ColorPicker = ({ selectedColor, onColorChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">Màu sắc</label>
    <div className="flex space-x-2">
      {COLOR_PRESETS.map(color => (
        <button
          key={color}
          onClick={() => onColorChange(color)}
          className={`w-10 h-10 rounded-lg border-2 transition-all ${
            selectedColor === color
              ? 'border-gray-900 scale-110'
              : 'border-gray-300 hover:scale-105'
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => onColorChange(e.target.value)}
        className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
      />
    </div>
  </div>
);
export default ColorPicker;