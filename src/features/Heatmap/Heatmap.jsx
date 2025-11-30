import { useState, useEffect } from 'react';
import LeftSidebar from './components/LeftSidebar';
import HeatMapContent from './components/HeatMapContent';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMatrixHeatmap, fetchMetricsHeatmap } from "../Heatmap/heatmap.thunk"

const ZoneHeatmapDashboard = () => {
  const [opacity, setOpacity] = useState(70);
  const [showZones, setShowZones] = useState(true);
  const [showFlow, setShowFlow] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    // dispatch(fetchMatrixHeatmap({ storeId: "STORE001", cameraCode: "C01", range: "today" }));
    // dispatch(fetchMetricsHeatmap({ storeId: "STORE001", cameraCode: "C01", range: "today" }));
  }, [dispatch]);
  
  const dataHeatmap = useSelector((state) => state.heatmap);
  const { infoHeatmapMatrix, metricHeatmapWithZone, isLoading } = dataHeatmap;
  
  const handleExport = () => {
    alert('Tính năng chưa phát triển xong');
  }
  
  const handleReset = () => {
    alert('Tính năng chưa phát triển xong');
  }

  const [metrics, setMetrics] = useState({ totalPeople: 0, avgDwellTime: 0, totalZones: 0 });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Main Layout với gap lớn hơn */}
      <div className="flex gap-6 h-[calc(100vh-3rem)]">
        {/* Left Sidebar - Width cố định */}
        <div className="w-80 flex-shrink-0">
          <LeftSidebar 
            showZones={showZones} 
            showFlow={showFlow} 
            showGrid={showGrid} 
            opacity={opacity} 
            handleExport={handleExport}  
            handleReset={handleReset}
          />
        </div>

        {/* Center - Heatmap chiếm phần còn lại */}
        <div className="flex-1 min-w-0">
          <HeatMapContent heatmap={infoHeatmapMatrix} />
        </div>
      </div>
    </div>
  );
};

export default ZoneHeatmapDashboard;