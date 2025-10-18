// src/CameraManagement/CameraManagement.jsx

import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import CameraCard from './components/CameraCard';
import ModalAdd from './components/ModalAdd';
import ModalEdit from './components/ModalEdit';
import ModalDelete from './components/ModalDelete';
import ModalLiveView from './components/ModalLiveView';

// Dữ liệu camera mẫu
const initialCameras = [
  { id: '#001', name: 'Camera góc trái', url: 'rtsp://192.168.1.101:554/stream', status: 'online', uptime: '2h 15m', quality: 'HD' },
  { id: '#002', name: 'Camera quầy thu ngân', url: 'rtsp://192.168.1.102:554/stream', status: 'online', uptime: '4h 32m', quality: '4K' },
  { id: '#003', name: 'Camera cửa ra vào', url: 'rtsp://192.168.1.103:554/stream', status: 'offline', lastSeen: '15 phút', signalStatus: 'Không có tín hiệu' },
  { id: '#004', name: 'Camera kho hàng', url: 'rtsp://192.168.1.104:554/stream', status: 'online', uptime: '1h 45m', quality: 'HD' },
];

const CameraManagement = () => {
  const [cameras, setCameras] = useState(initialCameras);

  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    live: false,
  });
  const [selectedCamera, setSelectedCamera] = useState(null);
  
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  
  // state cho chế độ xem Grid/List 
  const [viewMode, setViewMode] = useState('grid'); 

  
  const handleOpenModal = (modalName, camera = null) => {
    setModalState(prev => ({ ...prev, [modalName]: true }));
    if (camera) setSelectedCamera(camera);
  };

  const handleCloseModals = () => {
    setModalState({ add: false, edit: false, delete: false, live: false });
    setSelectedCamera(null);
  };

  const handleDeleteCamera = () => {
    if (!selectedCamera) return;
    setCameras(prev => prev.filter(c => c.id !== selectedCamera.id));
    handleCloseModals();
  };

  const handleSaveCamera = (cameraId, updatedData) => {
    setCameras(prev => prev.map(c => c.id === cameraId ? { ...c, ...updatedData } : c));
    handleCloseModals();
  };
  
  const handleAddCamera = (newCameraData) => {
    const newCamera = { ...newCameraData, id: `#${Date.now().toString().slice(-4)}`, uptime: '0 phút', status: 'online', quality: 'HD' }; // Đặt status và quality mặc định
    setCameras(prev => [newCamera, ...prev]);
    handleCloseModals();
  };

  // Tính toán số lượng camera tổng và đang hoạt động
  const totalCameras = cameras.length;
  const activeCameras = cameras.filter(c => c.status === 'online').length;
  
  // Lọc và sắp xếp camera dựa trên filterStatus và sortOrder
  const displayedCameras = useMemo(() => {
    let result = [...cameras];
    
    if (filterStatus !== 'all') {
      result = result.filter(camera => camera.status === filterStatus);
    }

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    return result;
  }, [cameras, filterStatus, sortOrder]);


  return (
    <div className="bg-white min-h-screen">
      <Header 
        onAddCameraClick={() => handleOpenModal('add')} 
        totalCameras={totalCameras}
        activeCameras={activeCameras}
      />
      <main className="container mx-auto px-4">
        <FilterBar 
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          viewMode={viewMode}        
          setViewMode={setViewMode}  
        />
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><div className="h-2 w-2 bg-green-500 rounded-full"></div><strong>{cameras.filter(c => c.status === 'online').length}</strong> online</span>
            <span className="flex items-center gap-1.5"><div className="h-2 w-2 bg-red-500 rounded-full"></div><strong>{cameras.filter(c => c.status === 'offline').length}</strong> offline</span>
          </div>
          <div><span>Hiển thị {displayedCameras.length} / {cameras.length} camera</span></div>
        </div>
        
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
          {displayedCameras.map((camera) => (
            <CameraCard
              key={camera.id}
              camera={camera}
              onEdit={() => handleOpenModal('edit', camera)}
              onDelete={() => handleOpenModal('delete', camera)}
              onLiveView={() => handleOpenModal('live', camera)}
              isListView={viewMode === 'list'} 
            />
          ))}
        </div>
      </main>
      
      {/* Các modals */}
      <ModalAdd isOpen={modalState.add} onClose={handleCloseModals} onSubmit={handleAddCamera} />
      <ModalEdit isOpen={modalState.edit} item={selectedCamera} onClose={handleCloseModals} onSave={handleSaveCamera} />
      <ModalDelete isOpen={modalState.delete} item={selectedCamera} onClose={handleCloseModals} onDelete={handleDeleteCamera} />
      <ModalLiveView isOpen={modalState.live} item={selectedCamera} onClose={handleCloseModals} />
    </div>
  );
};

export default CameraManagement;