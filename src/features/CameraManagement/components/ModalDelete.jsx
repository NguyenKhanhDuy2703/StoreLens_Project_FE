import React from "react";


export default function ModalDelete({ isOpen, item, onClose, onDelete }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0 w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900">⚠️ Xác nhận xóa</h3>
              <p className="text-sm text-gray-600">Hành động này không thể hoàn tác</p>
            </div>
          </div>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6">
            <p className="text-sm text-red-800">
              Bạn có chắc chắn muốn xóa camera <strong>"{item.name}"</strong> không?
            </p>
          </div>
          <div className="flex space-x-4">
            <button onClick={onClose} className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">Hủy bỏ</button>
            <button onClick={onDelete} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium shadow-lg">Xóa camera</button>
          </div>
        </div>
      </div>
    </div>
  );
}