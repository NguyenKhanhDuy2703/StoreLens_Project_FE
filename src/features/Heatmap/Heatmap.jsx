import  { useState, useEffect, useRef } from 'react';
import {  Grid3x3, } from 'lucide-react';
import LeftSidebar from './components/LeftSidebar';
import HeatMapContent from './components/HeatMapContent';
import RightSidebard from './components/RightSidebar';

const ZoneHeatmapDashboard = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [opacity, setOpacity] = useState(70);
  const [showZones, setShowZones] = useState(true);
  const [showFlow, setShowFlow] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [zoneData, setZoneData] = useState([
    
  ]);
  const [heatmapData, setHeatmapData] = useState({
    width_matrix: 15,
    height_matrix: 9,
    grid_size: 40,
    heatmap_matrix: []
  });
  const handleExport = () => {
    alert('Tính năng chưa phát triển xong');
  }
  const handleReset = () => {
    alert('Tính năng chưa phát triển xong');
  }
const [mestrics, setMetrics] = useState({ totalPeople: 0, avgDwellTime: 0 , totalZones: 0});
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg">
              <Grid3x3 className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Store<span className="text-purple-600">Lens</span>
              </h1>
              <p className="text-xs text-gray-500">Zone Heatmap Analysis</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-lg px-4 py-2 border border-gray-200 shadow-sm">
              <div className="text-xs text-gray-500">Tổng khách</div>
              <div className="text-xl font-bold text-gray-800">{mestrics.totalPeople}</div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 border border-gray-200 shadow-sm">
              <div className="text-xs text-gray-500">TG TB</div>
              <div className="text-xl font-bold text-gray-800">{mestrics.avgDwellTime}<span className="text-sm text-gray-500">m</span></div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 border border-gray-200 shadow-sm">
              <div className="text-xs text-gray-500">Khu vực</div>
              <div className="text-xl font-bold text-gray-800">{mestrics.totalZones}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-4">
        <LeftSidebar showZones={showZones} showFlow = {showFlow} showGrid = {showGrid} opacity = {opacity} handleExport = {handleExport}  handleReset={handleReset}/>

        {/* Center - Large Heatmap */}
        <div className="col-span-7">
            <HeatMapContent containerRef ={containerRef} zoom = {zoom}/>
        </div>

        {/* Right Sidebar - Zone Stats */}
        <div className="col-span-3">
         <RightSidebard zoneData={zoneData} />
        </div>
      </div>
    </div>
  );
};

export default ZoneHeatmapDashboard;