import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
const TrafficCharts = () => {
  // Hourly traffic data
  const hourlyData = [
    { time: '6h', entry: 50, exit: 45 },
    { time: '7h', entry: 80, exit: 70 },
    { time: '8h', entry: 120, exit: 100 },
    { time: '9h', entry: 180, exit: 160 },
    { time: '10h', entry: 240, exit: 220 },
    { time: '11h', entry: 260, exit: 240 },
    { time: '12h', entry: 280, exit: 260 },
    { time: '13h', entry: 300, exit: 280 },
    { time: '14h', entry: 320, exit: 300 },
    { time: '15h', entry: 310, exit: 290 },
    { time: '16h', entry: 290, exit: 280 },
    { time: '17h', entry: 250, exit: 270 },
    { time: '18h', entry: 180, exit: 200 },
    { time: '19h', entry: 150, exit: 170 },
    { time: '20h', entry: 120, exit: 140 }
  ];

  // Weekly trend data
  const weeklyData = [
    { day: 'T2', dayFull: 'Thứ 2', value: 1200, growth: -5.2 },
    { day: 'T3', dayFull: 'Thứ 3', value: 1350, growth: 12.5 },
    { day: 'T4', dayFull: 'Thứ 4', value: 1180, growth: -12.6 },
    { day: 'T5', dayFull: 'Thứ 5', value: 1420, growth: 20.3 },
    { day: 'T6', dayFull: 'Thứ 6', value: 1680, growth: 18.3 },
    { day: 'T7', dayFull: 'Thứ 7', value: 1890, growth: 12.5 },
    { day: 'CN', dayFull: 'Chủ nhật', value: 1450, growth: -23.3 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{`Thời gian: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name === 'entry' ? 'Khách vào' : 'Khách ra'}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{data.dayFull}</p>
          <p className="text-sm text-blue-600">Lượt khách: {data.value.toLocaleString()}</p>
          <p className={`text-sm ${data.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
            Tăng trưởng: {data.growth > 0 ? '+' : ''}{data.growth}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="px-6 pb-6">
      {/* Charts arranged horizontally - both on same row */}
      <div className="flex gap-6 w-full">
        {/* Hourly Traffic Chart - Takes up 60% width */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100" style={{ minWidth: '0', flex: '3' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Lưu lượng theo giờ</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 font-medium">Khách vào</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 font-medium">Khách ra</span>
              </div>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6b7280" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="entry" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#10b981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="exit" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Khách vào cao nhất:</span>
              <span className="font-semibold text-green-600">320 (14h)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Khách ra cao nhất:</span>
              <span className="font-semibold text-blue-600">300 (14h)</span>
            </div>
          </div>
        </div>

        {/* Weekly Trend Chart - Takes up 40% width */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100" style={{ minWidth: '0', flex: '2' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Xu hướng 7 ngày</h3>
            <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              Tổng: {weeklyData.reduce((sum, item) => sum + item.value, 0).toLocaleString()} lượt
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  stroke="#6b7280" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value/1000).toFixed(1)}k`}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar 
                  dataKey="value" 
                  radius={[8, 8, 0, 0]}
                  fill="url(#gradient)"
                >
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Cao nhất:</span>
              <span className="font-semibold text-blue-600">T7 - 1,890</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thấp nhất:</span>
              <span className="font-semibold text-gray-600">T4 - 1,180</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrafficCharts;