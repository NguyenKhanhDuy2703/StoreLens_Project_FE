// src/CameraManagement/components/CameraCard.jsx

import React from 'react';
import { Video, Edit, Trash2, AlertTriangle, WifiOff } from 'lucide-react';

// << Nhận thêm prop isListView >>
const CameraCard = ({ camera, onEdit, onDelete, onLiveView, isListView }) => {
  const { name, id, url, status, uptime, quality, lastSeen, signalStatus } = camera;

  const statusConfig = {
    online: {
      borderColor: 'border-green-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      label: 'Đang kết nối',
      tag: <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">LIVE</span>,
    },
    offline: {
      borderColor: 'border-red-500',
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      label: 'Mất kết nối',
      tag: <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">OFFLINE</span>,
    },
  };

  const currentStatus = statusConfig[status];

  return (
    // << Thêm shadow-md và điều chỉnh layout dựa trên isListView >>
    <div className={`
      border-t-4 ${currentStatus.borderColor} bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300
      ${isListView ? 'flex flex-row items-center p-4' : 'flex flex-col'}
    `}>
      <div className={`relative bg-gray-200 aspect-video rounded-md flex-shrink-0
          ${isListView ? 'w-48 h-28 mr-4' : 'w-full rounded-t-md'}
        flex items-center justify-center`}>
        {status === 'online' ? <Video className="h-12 w-12 text-gray-400" /> : <div className="w-full h-full bg-black/50 flex items-center justify-center"><Video className="h-12 w-12 text-gray-500" /></div>}
        <div className={`absolute top-2 right-2 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${currentStatus.bgColor} ${currentStatus.textColor}`}><span className={`h-2 w-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>{currentStatus.label}</div>
        {currentStatus.tag}
      </div>

      <div className={`p-4 flex-grow flex ${isListView ? 'flex-row justify-between items-center w-full' : 'flex-col'}`}>
        <div className={isListView ? "flex flex-col" : ""}>
            <div className={`flex min-h-[3.5rem] ${isListView ? 'flex-col items-start' : 'justify-between items-start'}`}>
                <h3 className="text-lg font-bold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500 font-mono">ID: {id}</p>
            </div>
            <p className="text-xs text-gray-500 bg-gray-100 p-1 rounded font-mono truncate my-2">{url}</p>

            <div className="text-sm text-gray-600 mt-2 flex-grow min-h-[3.5rem]">
              {status === 'online' && <div className="flex justify-between items-center"><span>Hoạt động: {uptime}</span><span>Chất lượng: {quality}</span></div>}
              {status === 'offline' && <div className="flex flex-col gap-2 mt-2"><div className="flex items-center gap-2 text-red-600"><AlertTriangle size={16}/><span>Mất kết nối {lastSeen}</span></div><div className="flex items-center gap-2 text-gray-500"><WifiOff size={16}/><span>{signalStatus}</span></div></div>}
            </div>
        </div>

        <div className={`mt-4 pt-4 border-t flex gap-2 ${isListView ? 'border-none mt-0 pt-0 ml-4' : ''}`}>
            <button onClick={onLiveView} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold transition-colors">
                <i class="fas fa-play mr-2"></i>
                Xem trực tiếp
            </button>
            <button onClick={onEdit} className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg">
                <Edit size={20}/>
            </button>
             <button onClick={onDelete} className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
                <Trash2 size={20}/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCard;