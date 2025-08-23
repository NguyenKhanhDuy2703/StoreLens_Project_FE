import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Dữ liệu và cấu hình cho biểu đồ
const chartData = {
  datasets: [{
    data: [51.2, 31.3, 17.5],
    backgroundColor: ['#3b82f6', '#10b981', '#f97316'],
    borderWidth: 0,
    cutout: '70%',
  }],
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

// Dữ liệu cho danh sách chi tiết
const interactionDetails = [
    { type: "Chạm nhẹ", description: "Khách hàng chạm vào sản phẩm", value: "1,456", percentage: "51.2%", color: "blue" },
    { type: "Cầm lên", description: "Khách hàng cầm sản phẩm lên", value: "892", percentage: "31.3%", color: "green" },
    { type: "Đặt lại", description: "Khách hàng đặt sản phẩm lại", value: "499", percentage: "17.5%", color: "orange" },
];

const InteractionTypesPanel = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <span className="text-2xl">🎯</span>
                    <span>Loại tương tác</span>
                </h3>
            </div>
            
            <div className="relative h-48 mb-6">
                <Doughnut data={chartData} options={chartOptions} />
            </div>
            
            <div className="space-y-4">
                {interactionDetails.map(item => (
                    <div key={item.type} className={`flex items-center justify-between p-3 bg-${item.color}-50 rounded-lg`}>
                        <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 bg-${item.color}-500 rounded-full`}></div>
                            <div>
                                <p className="font-medium text-gray-900">{item.type}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold text-${item.color}-600`}>{item.value}</p>
                            <p className="text-xs text-gray-500">{item.percentage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InteractionTypesPanel;