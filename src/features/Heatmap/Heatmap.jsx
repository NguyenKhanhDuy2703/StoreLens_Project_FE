import  { useState, useEffect, useRef } from 'react';
import {  Grid3x3, } from 'lucide-react';
import LeftSidebar from './components/LeftSidebar';
import HeatMapContent from './components/HeatMapContent';
import RightSidebard from './components/RightSidebar';
import { useSelector  , useDispatch } from 'react-redux';
import {fetchMatrixHeatmap, fetchMetricsHeatmap} from "../Heatmap/heatmap.thunk"
const ZoneHeatmapDashboard = () => {
  const [opacity, setOpacity] = useState(70);
  const [showZones, setShowZones] = useState(true);
  const [showFlow, setShowFlow] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
 

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchMatrixHeatmap({storeId : "STORE001" , cameraCode : "C01" , range : "today"}));
    dispatch(fetchMetricsHeatmap({storeId : "STORE001" , cameraCode : "C01" , range : "today"}));
  }, [dispatch]);
  const dataHeatmap = useSelector((state) => state.heatmap);
  const { infoHeatmapMatrix , metricHeatmapWithZone, isLoading } = dataHeatmap;
  const handleExport = () => {
    alert('Tính năng chưa phát triển xong');
  }
  const handleReset = () => {
    alert('Tính năng chưa phát triển xong');
  }
const [mestrics, setMetrics] = useState({ totalPeople: 0, avgDwellTime: 0 , totalZones: 0});
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-4">
        <LeftSidebar showZones={showZones} showFlow = {showFlow} showGrid = {showGrid} opacity = {opacity} handleExport = {handleExport}  handleReset={handleReset}/>
        {/* Center - Large Heatmap */}
        <div className="col-span-7">
            <HeatMapContent  heatmap = {infoHeatmapMatrix}/>
        </div>

        {/* Right Sidebar - Zone Stats */}
        <div className="col-span-3">
         <RightSidebard  />
        </div>
      </div>
    </div>
  );
};

export default ZoneHeatmapDashboard;