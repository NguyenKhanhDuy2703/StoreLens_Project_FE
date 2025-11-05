import React, { useState } from 'react';
import { Eye, Users, TrendingUp, TrendingDown, Calendar, MapPin, ChevronDown, Target, Activity } from 'lucide-react';

const GazeAnalysisDashboard = () => {
  const [selectedDate, setSelectedDate] = useState('2025-10-25');
  const [selectedCamera, setSelectedCamera] = useState('all');

  // Data từ Analysis_area_camera + Heatmap_points (chỉ đếm số lần phát hiện hướng nhìn)
  const gazeZones = [
    { 
      id_area: 1,
      id_camera: 1,
      area_name: 'Khu vực đồ uống',
      enabled: true,
      gazeDetectionCount: 2847, // Số lần phát hiện hướng nhìn vào khu vực này
      peoplePassedBy: 1523, // Từ Person_tracking
      peakHour: '18h',
      trend: 12
    },
    { 
      id_area: 2,
      id_camera: 1,
      area_name: 'Khu vực snack',
      enabled: true,
      gazeDetectionCount: 1923,
      peoplePassedBy: 1245,
      peakHour: '14h',
      trend: -5
    },
    { 
      id_area: 3,
      id_camera: 2,
      area_name: 'Quầy thanh toán',
      enabled: true,
      gazeDetectionCount: 3156,
      peoplePassedBy: 2134,
      peakHour: '12h',
      trend: 8
    },
    { 
      id_area: 4,
      id_camera: 2,
      area_name: 'Khu vực mỹ phẩm',
      enabled: true,
      gazeDetectionCount: 1245,
      peoplePassedBy: 876,
      peakHour: '16h',
      trend: 15
    },
    { 
      id_area: 5,
      id_camera: 1,
      area_name: 'Khu vực bánh kẹo',
      enabled: true,
      gazeDetectionCount: 1678,
      peoplePassedBy: 1098,
      peakHour: '15h',
      trend: -3
    }
  ];

  // Data từ Heatmap_points theo giờ (chỉ count số lần phát hiện)
  const gazeByHour = [
    { hour: '6h', detectionCount: 145 },
    { hour: '8h', detectionCount: 289 },
    { hour: '10h', detectionCount: 456 },
    { hour: '12h', detectionCount: 734 },
    { hour: '14h', detectionCount: 589 },
    { hour: '16h', detectionCount: 867 },
    { hour: '18h', detectionCount: 1012 },
    { hour: '20h', detectionCount: 698 },
    { hour: '22h', detectionCount: 287 }
  ];

  const cameras = [
    { id_camera: 1, camera_name: 'Camera 01 - Khu vực chính' },
    { id_camera: 2, camera_name: 'Camera 02 - Quầy thanh toán' },
    { id_camera: 3, camera_name: 'Camera 03 - Lối vào' }
  ];

  const maxGazeHourly = Math.max(...gazeByHour.map(d => d.detectionCount));
  const totalGazeCount = gazeZones.reduce((sum, z) => sum + z.gazeDetectionCount, 0);

  // Tính tỷ lệ chuyển đổi (attention rate): có bao nhiêu % người đi qua nhìn vào khu vực
  const calculateAttentionRate = (gazeCount, passedBy) => {
    if (passedBy === 0) return 0;
    return Math.min(((gazeCount / passedBy) * 100), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <Eye className="text-blue-600" size={36} />
                Phân tích Hướng Nhìn Khách Hàng
              </h1>
              <p className="text-slate-600 mt-2">Theo dõi số lần khách hàng nhìn vào các khu vực trong cửa hàng</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <select 
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="all">Tất cả camera</option>
                  {cameras.map(cam => (
                    <option key={cam.id_camera} value={cam.id_camera}>{cam.camera_name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Gaze Zones Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {gazeZones.map((zone) => {
            const attentionRate = calculateAttentionRate(zone.gazeDetectionCount, zone.peoplePassedBy);
            return (
              <div 
                key={zone.id_area}
                className="bg-white rounded-xl shadow-sm p-6 border-2 border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <Target className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{zone.area_name}</h3>
                      <span className="text-sm text-slate-500">Camera {zone.id_camera}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {zone.trend > 0 ? (
                      <TrendingUp size={20} className="text-green-600" />
                    ) : (
                      <TrendingDown size={20} className="text-red-600" />
                    )}
                    <span className={`text-sm font-semibold ${zone.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {zone.trend > 0 ? '+' : ''}{zone.trend}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye size={16} className="text-blue-600" />
                      <span className="text-slate-600 text-xs">Lượt nhìn</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800">{zone.gazeDetectionCount.toLocaleString()}</div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={16} className="text-purple-600" />
                      <span className="text-slate-600 text-xs">Người qua</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-800">{zone.peoplePassedBy.toLocaleString()}</div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="text-slate-600 text-xs mb-2">Cao điểm</div>
                    <div className="text-2xl font-bold text-slate-800">{zone.peakHour}</div>
                  </div>
                </div>

                {/* Tỷ lệ thu hút và Tỷ lệ chú ý */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-blue-700 font-medium mb-1">Tỷ lệ thu hút</div>
                    <div className="text-xl font-bold text-blue-800">
                      {attentionRate.toFixed(0)}%
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      Trong số người đi qua
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-xs text-green-700 font-medium mb-1">Tỷ lệ so với tổng</div>
                    <div className="text-xl font-bold text-green-800">
                      {((zone.gazeDetectionCount / totalGazeCount) * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      Trong tất cả khu vực
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600 font-medium">Mức độ thu hút</span>
                    <span className="text-slate-800 font-bold">{attentionRate.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        attentionRate >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                        attentionRate >= 50 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                        'bg-gradient-to-r from-orange-500 to-yellow-500'
                      }`}
                      style={{ width: `${Math.min(attentionRate, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gaze Activity by Hour */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Activity className="text-blue-600" size={24} />
              Lượt Phát Hiện Hướng Nhìn Theo Giờ
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Số lần hệ thống phát hiện khách hàng nhìn vào các khu vực trong cửa hàng
            </p>
          </div>
          <div className="grid grid-cols-9 gap-4">
            {gazeByHour.map((data, idx) => {
              const isPeakHour = data.detectionCount >= maxGazeHourly * 0.8;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-full flex flex-col items-center gap-2 mb-2">
                    <div className={`text-xs font-semibold ${isPeakHour ? 'text-red-600' : 'text-slate-600'}`}>
                      {data.detectionCount}
                    </div>
                    <div 
                      className={`w-full rounded-t-lg transition-all cursor-pointer relative group ${
                        isPeakHour 
                          ? 'bg-gradient-to-t from-red-600 to-red-400 hover:from-red-700 hover:to-red-500' 
                          : 'bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500'
                      }`}
                      style={{ height: `${(data.detectionCount / maxGazeHourly) * 120}px`, minHeight: '20px' }}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {data.detectionCount} lượt phát hiện
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-semibold ${isPeakHour ? 'text-red-700' : 'text-slate-700'}`}>
                    {data.hour}
                  </div>
                  {isPeakHour && (
                    <div className="text-xs text-red-600 font-semibold">Cao điểm</div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-t from-blue-600 to-blue-400"></div>
              <span className="text-slate-600">Hoạt động bình thường</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-t from-red-600 to-red-400"></div>
              <span className="text-slate-600">Giờ cao điểm (≥80% max)</span>
            </div>
          </div>
        </div>

        {/* Gaze Comparison Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-6">So sánh Chi tiết Các Khu Vực</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Khu vực</th>
                  <th className="text-center py-3 px-4 text-slate-700 font-semibold">Camera</th>
                  <th className="text-center py-3 px-4 text-slate-700 font-semibold">Lượt nhìn</th>
                  <th className="text-center py-3 px-4 text-slate-700 font-semibold">Người qua</th>
                  <th className="text-center py-3 px-4 text-slate-700 font-semibold">Tỷ lệ thu hút</th>
                  <th className="text-center py-3 px-4 text-slate-700 font-semibold">Cao điểm</th>
                  <th className="text-center py-3 px-4 text-slate-700 font-semibold">Xu hướng</th>
                </tr>
              </thead>
              <tbody>
                {gazeZones.sort((a, b) => b.gazeDetectionCount - a.gazeDetectionCount).map((zone) => {
                  const attentionRate = calculateAttentionRate(zone.gazeDetectionCount, zone.peoplePassedBy);
                  return (
                    <tr key={zone.id_area} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-800">{zone.area_name}</div>
                      </td>
                      <td className="py-4 px-4 text-center text-slate-600">#{zone.id_camera}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-bold text-slate-800">{zone.gazeDetectionCount.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-semibold text-slate-800">{zone.peoplePassedBy.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          attentionRate >= 80 ? 'bg-green-100 text-green-700' :
                          attentionRate >= 50 ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {attentionRate.toFixed(0)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-slate-600">{zone.peakHour}</td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {zone.trend > 0 ? (
                            <TrendingUp size={18} className="text-green-600" />
                          ) : (
                            <TrendingDown size={18} className="text-red-600" />
                          )}
                          <span className={`font-semibold ${zone.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {zone.trend > 0 ? '+' : ''}{zone.trend}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GazeAnalysisDashboard;