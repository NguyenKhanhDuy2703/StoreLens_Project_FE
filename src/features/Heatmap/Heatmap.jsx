import { useState, useEffect } from 'react';
import LeftSidebar from './components/LeftSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMatrixHeatmap } from "../Heatmap/heatmap.thunk"
import HeatmapCanvas from './components/HeatMapContent';

const ZoneHeatmapDashboard = () => {
  

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchMatrixHeatmap({ storeId: "STORE001", cameraCode: "C01", range: "today" }));
  }, [dispatch]);
  
  const dataHeatmap = useSelector((state) => state.heatmap);
  const {infoHeatmapMatrix , storeId , cameraCode , isLoading  , timeLine  , startTimeLine} = dataHeatmap;

  const handleExport = () => {
    alert('Tính năng chưa phát triển xong');
  }
  
  const handleReset = () => {
    alert('Tính năng chưa phát triển xong');
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Main Layout với gap lớn hơn */}
      <div className="flex gap-6 h-[calc(100vh-3rem)]">
        {/* Left Sidebar - Width cố định */}
        <div className="w-80 flex-shrink-0">
          <LeftSidebar 
            handleExport={handleExport}  
            handleReset={handleReset}
            selectedDate={startTimeLine}
            selectedStore={storeId}
            selectedCamera={cameraCode}
          />
        </div>

        {/* Center - Heatmap chiếm phần còn lại */}
        <div className="flex-1 min-w-0">
          <HeatmapCanvas infoHeatmapMatrix={infoHeatmapMatrix}  storeId = {storeId} cameraCode = {cameraCode} isLoading = {isLoading}  timeLine = {timeLine} />
        </div>
      </div>
    </div>
  );
};

export default ZoneHeatmapDashboard;