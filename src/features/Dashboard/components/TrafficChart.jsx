import { useState, useEffect } from "react";

const TrafficChart = ({ dataCharts }) => {
  const [chartData, setChartData] = useState({ traffic: [], sales: [] });

  useEffect(() => {
    if (dataCharts?.chart_data && Array.isArray(dataCharts.chart_data)) {
      const traffic = dataCharts.chart_data.map(item => ({
        hour: item.hour,
        value: item.people_count || 0
      }));
      
      const sales = dataCharts.chart_data.map(item => ({
        hour: item.hour,
        value: item.total_revenue || 0
      }));
      
      setChartData({ traffic, sales });
      console.log("chartData set in TrafficChart", { traffic, sales });
    }
  
  }, [dataCharts]);

  // Tạo labels từ dữ liệu thực tế
  const hours = chartData.traffic.map(item => `${item.hour}h`);
  
  // Tính toán scale cho biểu đồ
  const maxTraffic = chartData.traffic.length > 0 
    ? Math.max(...chartData.traffic.map(d => d.value), 10)
    : 100;
  const maxSales = chartData.sales.length > 0
    ? Math.max(...chartData.sales.map(d => d.value), 10000)
    : 1000000;
  
  const getY = (value, max, height = 180) => {
    return 200 - (value / max) * height;
  };

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  // Tạo points cho polyline - điều chỉnh spacing dựa trên số lượng data points
  const getSpacing = () => {
    const totalWidth = 700;
    const numPoints = chartData.traffic.length;
    return numPoints > 1 ? totalWidth / (numPoints - 1) : 0;
  };
  
  const spacing = getSpacing();
  
  const trafficPoints = chartData.traffic.map((d, i) => {
    const x = 50 + i * spacing;
    const y = getY(d.value, maxTraffic);
    return `${x},${y}`;
  }).join(' ');

  const salesPoints = chartData.sales.map((d, i) => {
    const x = 50 + i * spacing;
    const y = getY(d.value, maxSales);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Lưu lượng & Doanh số theo giờ
          </h3>
          <p className="text-sm text-gray-500 mt-1">Phân tích xu hướng trong ngày</p>
        </div>
        <div className="flex gap-5 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 mr-2 shadow-sm"></div>
            <span className="text-gray-600 font-medium">Lưu lượng (người)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mr-2 shadow-sm"></div>
            <span className="text-gray-600 font-medium">Doanh số (VNĐ)</span>
          </div>
        </div>
      </div>

      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 800 240">
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="50"
              y1={20 + i * 45}
              x2="750"
              y2={20 + i * 45}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          ))}

          {chartData.traffic.length > 0 && (
            <>
              <polyline
                points={`50,200 ${trafficPoints} 750,200`}
                fill="url(#greenGradient)"
              />
              <polyline
                points={trafficPoints}
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
              />
            </>
          )}

          {chartData.sales.length > 0 && (
            <>
              <polyline
                points={`50,200 ${salesPoints} 750,200`}
                fill="url(#blueGradient)"
              />
              <polyline
                points={salesPoints}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
              />
            </>
          )}

          {chartData.traffic.map((d, i) => {
            const x = 50 + i * spacing;
            const yTraffic = getY(d.value, maxTraffic);
            const ySales = getY(chartData.sales[i]?.value || 0, maxSales);
            
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={yTraffic}
                  r="5"
                  fill="#22c55e"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="drop-shadow-md cursor-pointer"
                >
                  <title>{`${d.hour}h: ${d.value} người`}</title>
                </circle>
                <circle
                  cx={x}
                  cy={ySales}
                  r="5"
                  fill="#3b82f6"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="drop-shadow-md cursor-pointer"
                >
                  <title>{`${d.hour}h: ${formatCurrency(chartData.sales[i]?.value || 0)} VNĐ`}</title>
                </circle>
              </g>
            );
          })}
        </svg>
        
        <div className="flex justify-between mt-4 px-6 text-xs text-gray-500 font-medium">
          {hours.map((hour, idx) => (
            <span key={idx}>{hour}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficChart;