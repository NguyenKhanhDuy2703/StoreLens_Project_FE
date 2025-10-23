// Traffic Flow Chart Component
const TrafficFlowChart = () => {
  const hours = ['6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'];
  const dataIn = [45, 120, 180, 240, 280, 320, 380, 340, 180];
  const dataOut = [40, 110, 170, 230, 270, 310, 370, 330, 175];

  const maxValue = Math.max(...dataIn, ...dataOut);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Lưu lượng theo giờ</h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Khách vào</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-600">Khách ra</span>
          </div>
        </div>
      </div>
      
      <div className="relative h-64">
        <svg className="h-full w-full" viewBox="0 0 900 250">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 50 + 25}
              x2="900"
              y2={i * 50 + 25}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Lines */}
          <polyline
            points={dataIn.map((val, i) => `${i * 100 + 50},${225 - (val / maxValue) * 200}`).join(' ')}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
          />
          <polyline
            points={dataOut.map((val, i) => `${i * 100 + 50},${225 - (val / maxValue) * 200}`).join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          
          {/* Points */}
          {dataIn.map((val, i) => (
            <circle
              key={`in-${i}`}
              cx={i * 100 + 50}
              cy={225 - (val / maxValue) * 200}
              r="4"
              fill="#10b981"
            />
          ))}
          {dataOut.map((val, i) => (
            <circle
              key={`out-${i}`}
              cx={i * 100 + 50}
              cy={225 - (val / maxValue) * 200}
              r="4"
              fill="#3b82f6"
            />
          ))}
          
          {/* X-axis labels */}
          {hours.map((hour, i) => (
            <text
              key={hour}
              x={i * 100 + 50}
              y="245"
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {hour}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};
export default TrafficFlowChart;