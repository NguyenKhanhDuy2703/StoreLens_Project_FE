import { useState, useEffect } from "react";
import EmptyState from "../../../components/common/EmptyState";

const TrafficChart = ({ dataCharts }) => {
  const [chartData, setChartData] = useState({ traffic: [], sales: [] });

  useEffect(() => {
    if (dataCharts?.chart_data && Array.isArray(dataCharts.chart_data)) {
      const traffic = dataCharts.chart_data.map((item) => ({
        hour: item.hour,
        value: item.people_count || 0,
      }));
      const sales = dataCharts.chart_data.map((item) => ({
        hour: item.hour,
        value: item.total_revenue || 0,
      }));
      setChartData({ traffic, sales });
    }
  }, [dataCharts]);
  const hours = chartData.traffic.map((item) => `${item.hour}h`);
  const maxTraffic =
    chartData.traffic.length > 0
      ? Math.max(...chartData.traffic.map((d) => d.value), 10)
      : 100;
  const maxSales =
    chartData.sales.length > 0
      ? Math.max(...chartData.sales.map((d) => d.value), 10000)
      : 1000000;
  const getY = (value, max, height = 200) => {
    return 220 - (value / max) * height;
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

  const getSpacing = () => {
    const totalWidth = 700;
    const numPoints = chartData.traffic.length;
    return numPoints > 1 ? totalWidth / (numPoints - 1) : 0;
  };

  const spacing = getSpacing();

  const trafficPoints = chartData.traffic
    .map((d, i) => {
      const x = 50 + i * spacing;
      const y = getY(d.value, maxTraffic);
      return `${x},${y}`;
    })
    .join(" ");

  const salesPoints = chartData.sales
    .map((d, i) => {
      const x = 50 + i * spacing;
      const y = getY(d.value, maxSales);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1.5">
            Lưu lượng & Doanh số theo giờ
          </h3>
          <p className="text-sm text-gray-500">Phân tích xu hướng trong ngày</p>
        </div>

        <div className="flex gap-6 bg-gray-50 rounded-xl px-5 py-3 border border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-green-500 ring-2 ring-green-100"></div>
            <span className="text-sm font-medium text-gray-700">Lưu lượng</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-100"></div>
            <span className="text-sm font-medium text-gray-700">Doanh số</span>
          </div>
        </div>
      </div>

      {dataCharts?.chart_data.length === 0 ? (
        <EmptyState  title="Chưa có dữ liệu mới" description="Hệ thống chưa ghi nhận dữ liệu trong thời gian gần đây. Dữ liệu sẽ xuất hiện khi có cập nhật." />
      ) : (
        <div className="relative bg-gradient-to-b from-gray-50/50 to-white rounded-xl p-6">
          <svg
            className="w-full"
            viewBox="0 0 800 280"
            style={{ height: "400px" }}
          >
            <defs>
              <linearGradient
                id="greenGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="blueGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="3"
                  floodOpacity="0.1"
                />
              </filter>
            </defs>

            {/* Grid lines with Y-axis labels */}
            {[0, 1, 2, 3, 4].map((i) => {
              const yPos = 20 + i * 50;
              const trafficValue = Math.round(maxTraffic * (1 - i / 4));
              const salesValue = formatCurrency(maxSales * (1 - i / 4));

              return (
                <g key={i}>
                  <line
                    x1="50"
                    y1={yPos}
                    x2="750"
                    y2={yPos}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                  {/* Traffic labels (left) */}
                  <text
                    x="35"
                    y={yPos + 5}
                    textAnchor="end"
                    className="text-xs fill-green-600"
                    style={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    {trafficValue}
                  </text>
                  {/* Sales labels (right) */}
                  <text
                    x="765"
                    y={yPos + 5}
                    textAnchor="start"
                    className="text-xs fill-blue-600"
                    style={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    {salesValue}
                  </text>
                </g>
              );
            })}

            {/* Traffic data */}
            {chartData.traffic.length > 0 && (
              <>
                <polyline
                  points={`50,220 ${trafficPoints} 750,220`}
                  fill="url(#greenGradient)"
                />
                <polyline
                  points={trafficPoints}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#shadow)"
                />
              </>
            )}

            {/* Sales data */}
            {chartData.sales.length > 0 && (
              <>
                <polyline
                  points={`50,220 ${salesPoints} 750,220`}
                  fill="url(#blueGradient)"
                />
                <polyline
                  points={salesPoints}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#shadow)"
                />
              </>
            )}

            {/* Data points */}
            {chartData.traffic.map((d, i) => {
              const x = 50 + i * spacing;
              const yTraffic = getY(d.value, maxTraffic);
              const ySales = getY(chartData.sales[i]?.value || 0, maxSales);
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={yTraffic}
                    r="6"
                    fill="#22c55e"
                    stroke="#ffffff"
                    strokeWidth="3"
                    filter="url(#shadow)"
                    className="cursor-pointer transition-all hover:r-8"
                  >
                    <title>{`${d.hour}h: ${d.value} người`}</title>
                  </circle>
                  <circle
                    cx={x}
                    cy={ySales}
                    r="6"
                    fill="#3b82f6"
                    stroke="#ffffff"
                    strokeWidth="3"
                    filter="url(#shadow)"
                    className="cursor-pointer transition-all hover:r-8"
                  >
                    <title>{`${d.hour}h: ${formatCurrency(
                      chartData.sales[i]?.value || 0
                    )} VNĐ`}</title>
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-6 px-6">
            {hours.map((hour, idx) => (
              <div key={idx} className="text-center">
                <div className="text-sm font-bold text-gray-700">{hour}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficChart;
