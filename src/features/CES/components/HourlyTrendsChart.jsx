import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Dữ liệu và cấu hình cho biểu đồ
const chartData = {
  labels: ['6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
  datasets: [{
    label: 'Số lượng tương tác',
    data: [45, 89, 156, 234, 198, 267, 312, 189, 67],
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    fill: true,
    tension: 0.4,
  }],
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
    x: { grid: { display: false } },
  },
};

const HourlyTrendsChart = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <span className="text-2xl">📈</span>
                <span>Xu hướng tương tác theo giờ</span>
            </h3>
            <div className="relative h-72">
                <Line options={chartOptions} data={chartData} />
            </div>
        </div>
    );
};

export default HourlyTrendsChart;