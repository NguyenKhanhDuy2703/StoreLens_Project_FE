import { AlertCircle, X } from "lucide-react";

const ConfirmationModal = ({ isOpen, message, onYes, onNo, yesText = "Có", noText = "Không" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onNo}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-orange-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Xác nhận</h3>
          </div>
          <button
            onClick={onNo}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 text-base leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onNo}
            className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            {noText}
          </button>
          <button
            onClick={onYes}
            className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            {yesText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;