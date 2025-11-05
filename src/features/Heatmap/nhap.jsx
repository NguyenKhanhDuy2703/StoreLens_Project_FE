import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ZoomIn, ZoomOut, RotateCcw, Eye, Timer, TrendingUp, AlertCircle } from 'lucide-react';

// Filter Bar Component
const FilterBar = ({ selectedCamera, setSelectedCamera, selectedDate, setSelectedDate }) => {
  const cameras = [
    { id: 1, name: 'Camera 1 - Lối vào chính' },
    { id: 2, name: 'Camera 2 - Khu vực sản phẩm trung tâm' },
    { id: 3, name: 'Camera 3 - Quầy thanh toán' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bản đồ nhiệt & Thời gian dừng chân</h1>
          <p className="text-sm text-gray-500 mt-1">Phân tích hành vi di chuyển và tương tác khách hàng</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <select 
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cameras.map(camera => (
                <option key={camera.id} value={camera.id}>{camera.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Heatmap Viewer with Enhanced Features
const HeatmapViewer = ({ zoom, setZoom }) => {
  const [showGrid, setShowGrid] = useState(true);
  const [intensity, setIntensity] = useState(70);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Bản đồ nhiệt - Mật độ & Di chuyển</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Độ rõ:</span>
            <input 
              type="range" 
              min="30" 
              max="100" 
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="w-24"
            />
            <span className="text-gray-900 font-medium">{intensity}%</span>
          </div>
          
          <div className="h-6 w-px bg-gray-300"></div>
          
          <button 
            onClick={() => setShowGrid(!showGrid)}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              showGrid ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Lưới
          </button>
          
          <div className="flex items-center gap-1 border border-gray-300 rounded-lg">
            <button 
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <ZoomOut className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm text-gray-600 px-2">{zoom}%</span>
            <button 
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <ZoomIn className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <button 
            onClick={() => setZoom(100)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Heatmap Canvas */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: '600px' }}>
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <div className="relative w-full h-full max-w-5xl mx-auto">
            {/* Grid overlay */}
            {showGrid && (
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-0 opacity-20">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-gray-500"></div>
                ))}
              </div>
            )}

            {/* Store layout zones */}
            <div className="absolute top-12 left-12 w-40 h-28 border-2 border-dashed border-blue-400/50 rounded-lg bg-blue-500/10">
              <span className="absolute top-2 left-2 text-xs text-blue-300 font-medium">Lối vào</span>
            </div>

            <div className="absolute top-12 right-12 w-40 h-28 border-2 border-dashed border-green-400/50 rounded-lg bg-green-500/10">
              <span className="absolute top-2 left-2 text-xs text-green-300 font-medium">Kệ đồ uống</span>
            </div>

            <div className="absolute top-1/2 left-1/4 w-48 h-36 border-2 border-dashed border-purple-400/50 rounded-lg bg-purple-500/10 transform -translate-y-1/2">
              <span className="absolute top-2 left-2 text-xs text-purple-300 font-medium">Kệ trung tâm</span>
            </div>

            <div className="absolute top-1/2 right-1/4 w-44 h-32 border-2 border-dashed border-orange-400/50 rounded-lg bg-orange-500/10 transform -translate-y-1/2">
              <span className="absolute top-2 left-2 text-xs text-orange-300 font-medium">Quầy snack</span>
            </div>

            <div className="absolute bottom-12 right-12 w-48 h-32 border-2 border-dashed border-red-400/50 rounded-lg bg-red-500/10">
              <span className="absolute top-2 left-2 text-xs text-red-300 font-medium">Quầy thanh toán</span>
            </div>

            {/* Heatmap gradients - representing customer density */}
            <div 
              className="absolute top-1/4 left-1/3 w-56 h-48 bg-gradient-radial from-red-500 via-orange-500 to-transparent rounded-full blur-3xl"
              style={{ opacity: intensity / 100 }}
            ></div>
            
            <div 
              className="absolute top-1/3 right-1/3 w-48 h-40 bg-gradient-radial from-orange-500 via-yellow-500 to-transparent rounded-full blur-3xl"
              style={{ opacity: intensity / 100 * 0.8 }}
            ></div>
            
            <div 
              className="absolute bottom-1/4 right-1/4 w-64 h-52 bg-gradient-radial from-red-600 via-orange-600 to-transparent rounded-full blur-3xl"
              style={{ opacity: intensity / 100 * 0.9 }}
            ></div>
            
            <div 
              className="absolute bottom-1/3 left-1/4 w-40 h-36 bg-gradient-radial from-yellow-500 via-green-500 to-transparent rounded-full blur-2xl"
              style={{ opacity: intensity / 100 * 0.6 }}
            ></div>

            <div 
              className="absolute top-1/2 left-1/2 w-52 h-44 bg-gradient-radial from-orange-600 via-yellow-600 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: intensity / 100 * 0.7 }}
            ></div>

            {/* Movement flow paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#60a5fa" />
                </marker>
              </defs>
              
              <path 
                d="M 150 100 Q 300 200 500 300" 
                stroke="#60a5fa" 
                strokeWidth="3" 
                fill="none" 
                strokeDasharray="10,5"
                markerEnd="url(#arrowhead)"
              />
              <path 
                d="M 150 100 Q 450 150 700 200" 
                stroke="#34d399" 
                strokeWidth="2" 
                fill="none" 
                strokeDasharray="10,5"
                markerEnd="url(#arrowhead)"
              />
              <path 
                d="M 500 300 L 850 500" 
                stroke="#fbbf24" 
                strokeWidth="3" 
                fill="none" 
                strokeDasharray="10,5"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-xl">
          <div className="text-sm font-semibold text-white mb-3">Chú thích</div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded"></div>
              <span className="text-xs text-gray-300">Thấp (0-30%)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded"></div>
              <span className="text-xs text-gray-300">Trung bình (30-70%)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
              <span className="text-xs text-gray-300">Cao (70-100%)</span>
            </div>
            <div className="h-px bg-gray-700 my-2"></div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-6 h-0.5 bg-blue-400"></div>
                <div className="w-2 h-2 border-2 border-blue-400 rotate-45"></div>
              </div>
              <span className="text-xs text-gray-300">Lộ trình di chuyển</span>
            </div>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="absolute top-6 right-6 bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-xl">
          <div className="text-xs text-gray-400 mb-2">Thống kê camera này</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-8">
              <span className="text-xs text-gray-300">Khách qua:</span>
              <span className="text-sm font-bold text-white">347</span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-xs text-gray-300">Đang có:</span>
              <span className="text-sm font-bold text-green-400">12</span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-xs text-gray-300">TG TB:</span>
              <span className="text-sm font-bold text-yellow-400">3:24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Zone Dwell Time Analysis
const ZoneDwellTimeAnalysis = () => {
  const zones = [
    { 
      id: 1,
      name: 'Quầy thanh toán',
      avgTime: '4:15',
      totalVisits: 347,
      uniqueVisitors: 298,
      engagementScore: 95,
      trend: '+8%',
      color: 'red',
      peakHours: '12:00-13:00, 18:00-19:00'
    },
    { 
      id: 2,
      name: 'Kệ trung tâm',
      avgTime: '3:42',
      totalVisits: 412,
      uniqueVisitors: 289,
      engagementScore: 87,
      trend: '+12%',
      color: 'orange',
      peakHours: '10:00-11:00, 17:00-18:00'
    },
    { 
      id: 3,
      name: 'Kệ đồ uống',
      avgTime: '2:58',
      totalVisits: 289,
      uniqueVisitors: 245,
      engagementScore: 78,
      trend: '+5%',
      color: 'yellow',
      peakHours: '14:00-15:00, 19:00-20:00'
    },
    { 
      id: 4,
      name: 'Quầy snack',
      avgTime: '2:23',
      totalVisits: 234,
      uniqueVisitors: 198,
      engagementScore: 65,
      trend: '-2%',
      color: 'green',
      peakHours: '16:00-17:00'
    },
    { 
      id: 5,
      name: 'Lối vào',
      avgTime: '0:45',
      totalVisits: 567,
      uniqueVisitors: 487,
      engagementScore: 45,
      trend: '+3%',
      color: 'blue',
      peakHours: '08:00-09:00, 18:00-19:00'
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      red: 'bg-red-500 text-red-700 bg-red-50 border-red-200',
      orange: 'bg-orange-500 text-orange-700 bg-orange-50 border-orange-200',
      yellow: 'bg-yellow-500 text-yellow-700 bg-yellow-50 border-yellow-200',
      green: 'bg-green-500 text-green-700 bg-green-50 border-green-200',
      blue: 'bg-blue-500 text-blue-700 bg-blue-50 border-blue-200',
    };
    return colors[color].split(' ');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Phân tích thời gian dừng theo khu vực</h3>
          <p className="text-sm text-gray-500 mt-1">Thống kê chi tiết từng zone trong cửa hàng</p>
        </div>
      </div>

      <div className="space-y-4">
        {zones.map((zone) => {
          const [dotColor, textColor, bgColor, borderColor] = getColorClasses(zone.color);
          
          return (
            <div 
              key={zone.id} 
              className={`border ${borderColor} rounded-lg p-5 ${bgColor} hover:shadow-md transition-all cursor-pointer`}
            >
              {/* Zone Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${dotColor}`}></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{zone.peakHours}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  zone.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {zone.trend}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">TG dừng TB</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{zone.avgTime}</div>
                </div>

                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Eye className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">Lượt ghé</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{zone.totalVisits}</div>
                </div>

                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Timer className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">Khách unique</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{zone.uniqueVisitors}</div>
                </div>

                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">Điểm tương tác</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{zone.engagementScore}</div>
                </div>
              </div>

              {/* Engagement Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Mức độ tương tác</span>
                  <span className="font-medium text-gray-900">{zone.engagementScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${dotColor} transition-all duration-500`}
                    style={{ width: `${zone.engagementScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Comparison Widget
const DwellTimeComparison = () => {
  const comparisonData = [
    { zone: 'Thanh toán', today: 4.25, yesterday: 3.92, change: 8 },
    { zone: 'Kệ TT', today: 3.70, yesterday: 3.30, change: 12 },
    { zone: 'Đồ uống', today: 2.97, yesterday: 2.83, change: 5 },
    { zone: 'Snack', today: 2.38, yesterday: 2.43, change: -2 },
    { zone: 'Lối vào', today: 0.75, yesterday: 0.73, change: 3 },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">So sánh thời gian dừng</h3>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Hôm nay</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span className="text-gray-600">Hôm qua</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {comparisonData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{item.zone}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-900 font-semibold">{item.today.toFixed(2)}m</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                  item.change > 0 
                    ? 'bg-green-100 text-green-700' 
                    : item.change < 0 
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {item.change > 0 ? '+' : ''}{item.change}%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gray-300 rounded-full"
                  style={{ width: `${(item.yesterday / 5) * 100}%` }}
                ></div>
              </div>
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(item.today / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Insights Panel
const InsightsPanel = () => {
  const insights = [
    {
      type: 'success',
      icon: TrendingUp,
      title: 'Kệ trung tâm tăng 12%',
      description: 'Thời gian dừng chân tăng đáng kể so với hôm qua. Có thể do sắp xếp sản phẩm mới.',
      action: 'Xem chi tiết'
    },
    {
      type: 'warning',
      icon: AlertCircle,
      title: 'Quầy snack giảm nhẹ',
      description: 'Lượt ghé thăm giảm 2% so với hôm qua. Cân nhắc điều chỉnh vị trí hoặc khuyến mãi.',
      action: 'Xem gợi ý'
    },
    {
      type: 'info',
      icon: Clock,
      title: 'Giờ cao điểm: 12-13h',
      description: 'Thời gian dừng chân cao nhất trong ngày tại khu vực thanh toán.',
      action: 'Xem lịch sử'
    }
  ];

  const getIconBg = (type) => {
    const colors = {
      success: 'bg-green-100 text-green-600',
      warning: 'bg-yellow-100 text-yellow-600',
      info: 'bg-blue-100 text-blue-600'
    };
    return colors[type];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Nhận xét thông minh</h3>
      
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconBg(insight.type)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    {insight.action} →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Component
export default function HeatmapDwellTimePage() {
  const [selectedCamera, setSelectedCamera] = useState(1);
  const [selectedDate, setSelectedDate] = useState('2025-10-24');
  const [zoom, setZoom] = useState(100);

  return (
    <div className="min-h-screen bg-gray-50">
      <FilterBar 
        selectedCamera={selectedCamera}
        setSelectedCamera={setSelectedCamera}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="p-6 space-y-6">
        {/* Main Heatmap */}
        <HeatmapViewer zoom={zoom} setZoom={setZoom} />

        {/* Zone Analysis & Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ZoneDwellTimeAnalysis />
          </div>
          <div className="space-y-6">
            <DwellTimeComparison />
            <InsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}