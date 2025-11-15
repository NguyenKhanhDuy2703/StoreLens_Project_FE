import { Camera } from "lucide-react";

// Camera Sidebar Component (imported)
const CameraSidebar = ({ cameras, selectedCamera, onSelectCamera, onAddCamera, onDeleteCamera }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 h-full">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Danh sách camera</h2>
        <button
          onClick={onAddCamera}
          className="bg-purple-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-purple-700 transition-colors"
        >
          + Thêm
        </button>
      </div>
      <div className="space-y-2.5">
        {cameras.length > 0 ? (
          cameras.map(cam => {
            const isSelected = selectedCamera?.cameraCode === cam.cameraCode;
            return (
              <div
                key={cam.cameraCode}
                onClick={() => onSelectCamera(cam.cameraCode)}
                className={`p-3 rounded-md cursor-pointer border transition-all ${
                  isSelected
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-100 rounded-md">
                      <Camera size={16} className="text-purple-600" />
                    </div>
                    <span className="font-medium text-gray-800">{cam.cameraName}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-gray-100">
                  <span className="px-2 py-1 rounded-md font-medium bg-green-50 text-green-700">
                    ✓ Có ảnh
                  </span>
                  <span className="text-gray-600 font-medium">{cam?.zones?.zones?.length || 0} zones</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
              <Camera size={28} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 font-medium">Chưa có camera nào</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CameraSidebar;