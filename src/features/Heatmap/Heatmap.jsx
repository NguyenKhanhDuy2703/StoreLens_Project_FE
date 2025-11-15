import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Download, Camera, Grid3x3, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Mock data generator matching ZoneSummary schema
const generateMockZoneData = () => {
  const zones = [
    { zone_id: 'ZONE_001', category_name: 'Khu đồ uống', x: 2, y: 2, width: 5, height: 4, color: 'rgba(59, 130, 246, 0.3)' },
    { zone_id: 'ZONE_002', category_name: 'Khu bánh kẹo', x: 8, y: 4, width: 5, height: 4, color: 'rgba(239, 68, 68, 0.3)' },
    { zone_id: 'ZONE_003', category_name: 'Khu thực phẩm tươi', x: 15, y: 2, width: 4, height: 5, color: 'rgba(34, 197, 94, 0.3)' },
    { zone_id: 'ZONE_004', category_name: 'Quầy thanh toán', x: 15, y: 8, width: 4, height: 3, color: 'rgba(249, 115, 22, 0.3)' }
  ];

  return zones.map(zone => ({
    date: new Date(),
    store_id: 'STORE_001',
    zone_id: zone.zone_id,
    camera_code: 'CAM_MAIN_001',
    category_name: zone.category_name,
    performance: {
      people_count: Math.floor(Math.random() * 200) + 50,
      total_sales_value: Math.floor(Math.random() * 50000000) + 10000000,
      total_invoices: Math.floor(Math.random() * 100) + 20,
      conversion_rate: (Math.random() * 50 + 20).toFixed(1),
      avg_dwell_time: (Math.random() * 10 + 2).toFixed(1),
      total_stop_events: Math.floor(Math.random() * 150) + 30,
      top_product_id: `PRD_${Math.floor(Math.random() * 1000)}`,
      peak_hour: Math.floor(Math.random() * 12) + 9
    },
    trend: ['up', 'down', 'steady'][Math.floor(Math.random() * 3)],
    geometry: zone
  }));
};

const generateMockHeatmapData = (width, height, zoneData) => {
  const matrix = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      let value = Math.random() * 10;
      
      // Apply heat based on zone performance
      zoneData.forEach(zone => {
        const { x, y, width: zw, height: zh } = zone.geometry;
        if (j >= x && j < x + zw && i >= y && i < y + zh) {
          const intensity = zone.performance.people_count / 2;
          value += intensity * (Math.random() * 0.5 + 0.5);
        }
      });
      
      row.push(Math.min(100, value));
    }
    matrix.push(row);
  }
  return matrix;
};

const ZoneHeatmapDashboard = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [opacity, setOpacity] = useState(70);
  const [showZones, setShowZones] = useState(true);
  const [showFlow, setShowFlow] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStore, setSelectedStore] = useState('STORE_001');
  
  const [zoneData, setZoneData] = useState(generateMockZoneData());
  const [heatmapData, setHeatmapData] = useState({
    width_matrix: 20,
    height_matrix: 12,
    grid_size: 40,
    heatmap_matrix: []
  });

  useEffect(() => {
    const matrix = generateMockHeatmapData(20, 12, zoneData);
    setHeatmapData(prev => ({ ...prev, heatmap_matrix: matrix }));
  }, [zoneData]);

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp size={16} className="text-green-600" />;
    if (trend === 'down') return <TrendingDown size={16} className="text-red-600" />;
    return <Minus size={16} className="text-gray-400" />;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // Get color based on heatmap value
  const getHeatColor = (value) => {
    if (value < 20) return `rgba(59, 130, 246, ${opacity / 100})`;
    if (value < 40) return `rgba(34, 197, 94, ${opacity / 100})`;
    if (value < 60) return `rgba(234, 179, 8, ${opacity / 100})`;
    if (value < 80) return `rgba(249, 115, 22, ${opacity / 100})`;
    return `rgba(239, 68, 68, ${opacity / 100})`;
  };

  // Draw heatmap on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width_matrix, height_matrix, grid_size, heatmap_matrix } = heatmapData;

    canvas.width = width_matrix * grid_size;
    canvas.height = height_matrix * grid_size;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw heatmap cells
    heatmap_matrix.forEach((row, i) => {
      row.forEach((value, j) => {
        ctx.fillStyle = getHeatColor(value);
        ctx.fillRect(j * grid_size, i * grid_size, grid_size, grid_size);
      });
    });

    // Draw zones if enabled
    if (showZones) {
      zoneData.forEach(zone => {
        const { x, y, width, height, color } = zone.geometry;
        ctx.strokeStyle = color.replace('0.3', '0.8');
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 4]);
        ctx.strokeRect(
          x * grid_size,
          y * grid_size,
          width * grid_size,
          height * grid_size
        );
        
        // Draw zone label background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(x * grid_size + 5, y * grid_size + 5, 140, 24);
        
        // Draw zone label
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(zone.category_name, x * grid_size + 10, y * grid_size + 22);
      });
      ctx.setLineDash([]);
    }

    // Draw movement flow paths if enabled
    if (showFlow) {
      const flowPaths = [
        { path: [[3, 2], [5, 3], [8, 5], [10, 6]], color: '#06b6d4' },
        { path: [[2, 4], [4, 5], [7, 7], [9, 8]], color: '#8b5cf6' },
        { path: [[16, 3], [17, 5], [16, 8]], color: '#f59e0b' }
      ];

      flowPaths.forEach(flow => {
        ctx.strokeStyle = flow.color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        flow.path.forEach((point, idx) => {
          const x = point[0] * grid_size + grid_size / 2;
          const y = point[1] * grid_size + grid_size / 2;
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Draw arrow
        const lastPoint = flow.path[flow.path.length - 1];
        const secondLastPoint = flow.path[flow.path.length - 2];
        if (lastPoint && secondLastPoint) {
          const angle = Math.atan2(
            lastPoint[1] - secondLastPoint[1],
            lastPoint[0] - secondLastPoint[0]
          );
          const arrowX = lastPoint[0] * grid_size + grid_size / 2;
          const arrowY = lastPoint[1] * grid_size + grid_size / 2;
          
          ctx.beginPath();
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(
            arrowX - 12 * Math.cos(angle - Math.PI / 6),
            arrowY - 12 * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(
            arrowX - 12 * Math.cos(angle + Math.PI / 6),
            arrowY - 12 * Math.sin(angle + Math.PI / 6)
          );
          ctx.stroke();
        }
      });
    }

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= width_matrix; i++) {
      ctx.beginPath();
      ctx.moveTo(i * grid_size, 0);
      ctx.lineTo(i * grid_size, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= height_matrix; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * grid_size);
      ctx.lineTo(canvas.width, i * grid_size);
      ctx.stroke();
    }
  }, [heatmapData, opacity, showZones, showFlow, zoneData]);

  // Playback control
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % 100);
        setZoneData(generateMockZoneData());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleExport = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `zone-heatmap-${selectedStore}-${selectedDate}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const totalPeople = zoneData.reduce((sum, zone) => sum + zone.performance.people_count, 0);
  const totalSales = zoneData.reduce((sum, zone) => sum + zone.performance.total_sales_value, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <Grid3x3 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Store<span className="text-purple-600">Lens</span> - Zone Heatmap Analysis
            </h1>
            <p className="text-gray-500">Phân tích chi tiết từng khu vực trong cửa hàng</p>
          </div>
        </div>
      </div>

      {/* Controls Panel */}
      <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Date Selector */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Ngày phân tích</label>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-gray-50 text-gray-900 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Store Selector */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Cửa hàng</label>
            <select 
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full bg-gray-50 text-gray-900 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="STORE_001">STORE_001 - Chi nhánh Đà Nẵng</option>
              <option value="STORE_002">STORE_002 - Chi nhánh Hà Nội</option>
              <option value="STORE_003">STORE_003 - Chi nhánh TP.HCM</option>
            </select>
          </div>

          {/* Camera Selector */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Camera</label>
            <select 
              className="w-full bg-gray-50 text-gray-900 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="CAM_MAIN_001">CAM_MAIN_001 - Camera chính</option>
              <option value="CAM_SIDE_001">CAM_SIDE_001 - Camera phụ</option>
            </select>
          </div>

          {/* Opacity Control */}
          <div>
            <label className="text-sm text-gray-700 mb-2 block font-medium">Độ mờ heatmap: {opacity}%</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
        </div>

        {/* Toggles and Controls */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showFlow}
              onChange={(e) => setShowFlow(e.target.checked)}
              className="w-4 h-4 accent-purple-600"
            />
            <span className="text-sm">Hiển thị luồng di chuyển</span>
          </label>
          <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showZones}
              onChange={(e) => setShowZones(e.target.checked)}
              className="w-4 h-4 accent-purple-600"
            />
            <span className="text-sm">Hiển thị ranh giới khu vực</span>
          </label>
          <button 
            onClick={handleExport}
            className="ml-auto flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white font-medium transition shadow-sm"
          >
            <Download size={16} />
            Xuất PNG
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 text-white shadow-md">
          <div className="text-sm opacity-90 mb-1">Tổng lượt khách</div>
          <div className="text-3xl font-bold">{totalPeople}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white shadow-md">
          <div className="text-sm opacity-90 mb-1">Tổng doanh thu</div>
          <div className="text-2xl font-bold">{formatCurrency(totalSales)}</div>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-white shadow-md">
          <div className="text-sm opacity-90 mb-1">Số khu vực</div>
          <div className="text-3xl font-bold">{zoneData.length}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-4 text-white shadow-md">
          <div className="text-sm opacity-90 mb-1">Tỷ lệ chuyển đổi TB</div>
          <div className="text-3xl font-bold">
            {(zoneData.reduce((sum, z) => sum + parseFloat(z.performance.conversion_rate), 0) / zoneData.length).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Heatmap Canvas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="relative overflow-auto" style={{ maxHeight: '70vh' }}>
              <canvas 
                ref={canvasRef}
                className="w-full rounded-lg shadow-md"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>

            {/* Playback Controls */}
            <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-4 mb-3">
                <button 
                  onClick={() => setCurrentFrame(Math.max(0, currentFrame - 1))}
                  className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition"
                >
                  <SkipBack size={20} className="text-gray-700" />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition shadow-sm"
                >
                  {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
                </button>
                <button 
                  onClick={() => setCurrentFrame(Math.min(99, currentFrame + 1))}
                  className="p-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition"
                >
                  <SkipForward size={20} className="text-gray-700" />
                </button>
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-sm text-gray-600 whitespace-nowrap">09:00</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="100"
                    value={currentFrame}
                    onChange={(e) => setCurrentFrame(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <span className="text-sm text-gray-600 whitespace-nowrap">21:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Stats Panel */}
        <div className="space-y-4">
          {/* Zone Details */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm max-h-[80vh] overflow-y-auto">
            <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2 sticky top-0 bg-white pb-2">
              <Grid3x3 size={18} />
              Chi tiết từng khu vực
            </h3>
            <div className="space-y-3">
              {zoneData.map((zone, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">{zone.category_name}</div>
                      <div className="text-xs text-gray-500">{zone.zone_id}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(zone.trend)}
                      <span className="text-xs text-gray-600 capitalize">{zone.trend}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-500 text-xs mb-1">Lượt khách</div>
                      <div className="font-bold text-gray-800">{zone.performance.people_count}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-1">Doanh thu</div>
                      <div className="font-bold text-gray-800 text-xs">{formatCurrency(zone.performance.total_sales_value)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-1">Hóa đơn</div>
                      <div className="font-bold text-gray-800">{zone.performance.total_invoices}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-1">Tỷ lệ CV</div>
                      <div className="font-bold text-gray-800">{zone.performance.conversion_rate}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-1">TG ở lại TB</div>
                      <div className="font-bold text-gray-800">{zone.performance.avg_dwell_time} phút</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-1">Giờ cao điểm</div>
                      <div className="font-bold text-gray-800">{zone.performance.peak_hour}:00</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Sự kiện dừng lại</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (zone.performance.total_stop_events / 200) * 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{zone.performance.total_stop_events} lần</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-gray-800 font-semibold mb-3">Mức độ tập trung</h3>
            <div className="space-y-2">
              {[
                { label: 'Rất cao', color: 'bg-red-500', range: '80-100' },
                { label: 'Cao', color: 'bg-orange-500', range: '60-80' },
                { label: 'Trung bình', color: 'bg-yellow-500', range: '40-60' },
                { label: 'Thấp', color: 'bg-green-500', range: '20-40' },
                { label: 'Rất thấp', color: 'bg-blue-500', range: '0-20' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${item.color}`} />
                  <span className="text-sm text-gray-700 flex-1">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneHeatmapDashboard;