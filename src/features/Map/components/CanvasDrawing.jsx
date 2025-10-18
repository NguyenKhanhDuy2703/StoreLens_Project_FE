import { Camera, X } from "lucide-react";

const CanvasDrawing = ({ 
  camera, 
  drawingPoints, 
  onCanvasClick, 
  onImageUpload,
  onCancelDrawing,
  canvasRef,
  imageRef
}) => (
  <>
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-lg font-semibold">{camera.name}</h2>
        <p className="text-xs text-gray-500">
          {camera.zones.length} zones đã tạo
        </p>
      </div>
      <div className="space-x-2">
        <label className="bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-700 inline-flex items-center">
          <Camera size={16} className="mr-2" />
          {camera.image ? 'Đổi ảnh' : 'Thêm ảnh'}
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </label>
        {drawingPoints.length > 0 && (
          <button
            onClick={onCancelDrawing}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 inline-flex items-center"
          >
            <X size={16} className="mr-2" />
            Hủy vẽ
          </button>
        )}
      </div>
    </div>

    {camera.image && (
      <img
        ref={imageRef}
        src={camera.image}
        alt="Camera"
        className="hidden"
      />
    )}

    <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-900">
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        onClick={onCanvasClick}
        className="w-full cursor-crosshair"
        style={{ display: camera.image ? 'block' : 'none' }}
      />
      {!camera.image && (
        <div className="flex items-center justify-center h-96">
          <div className="text-center text-gray-400">
            <Camera size={48} className="mx-auto mb-2" />
            <p>Tải ảnh lên để bắt đầu vẽ zone</p>
          </div>
        </div>
      )}
    </div>

    {camera.image && drawingPoints.length < 4 && (
      <div className="mt-4 text-sm bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="font-medium text-blue-900 mb-1">📍 Hướng dẫn vẽ zone:</p>
        <p className="text-blue-700">
          {drawingPoints.length === 0 && 'Click 4 điểm trên ảnh để tạo vùng zone (polygon)'}
          {drawingPoints.length > 0 && 
            `Đã đánh dấu ${drawingPoints.length}/4 điểm. Click ${4 - drawingPoints.length} điểm nữa.`}
        </p>
      </div>
    )}
  </>
);
export default CanvasDrawing;