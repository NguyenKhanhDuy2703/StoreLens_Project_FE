import React from 'react';
import { X, Video } from 'lucide-react';

export default function ModalLiveView({ isOpen, item, onClose }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl w-full max-w-4xl relative">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            <span className="text-red-500 mr-2">●</span>
            Live: <span className="font-normal">{item.name}</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Video Placeholder */}
        <div className="p-4">
          <div className="bg-black aspect-video w-full flex flex-col items-center justify-center text-gray-500 rounded">
            <Video size={64} />
            <p className="mt-4 text-lg">Luồng video trực tiếp sẽ hiển thị ở đây</p>
            <p className="text-sm font-mono mt-2">{item.url}</p>
          </div>
        </div>
      </div>
    </div>
  );
}