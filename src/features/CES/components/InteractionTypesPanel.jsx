import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
    datasets: [{
        // Cập nhật màu sắc để khớp với hình ảnh: Xanh dương, Cam, Xanh lá, Tím
        data: [3200, 2450, 1900, 974], // Đã cập nhật data cho khớp với tổng số lượt nhìn trong hình
        backgroundColor: ['#2563EB', '#F97316', '#10B981', '#A855F7'], // Blue, Orange, Green, Purple
        borderWidth: 0,
        cutout: '70%',
    }],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
};

// Cập nhật dữ liệu gazeTypes với màu nền, màu chữ và icon tương ứng
const gazeTypes = [
    { type: "Nhìn lướt", description: "Thoáng qua, rồi đi tiếp", value: "3,200", percentage: "38%", color: "blue", bgColor: "bg-blue-50", textColor: "text-blue-600", dotColor: "bg-blue-500" }, // Màu xanh dương
    { type: "Nhìn ngắn", description: "Nhìn ≤ 5 giây", value: "2,450", percentage: "29%", color: "green", bgColor: "bg-green-50", textColor: "text-green-600", dotColor: "bg-green-500" }, // Màu xanh lá cây
    { type: "Nhìn lâu", description: "Nhìn > 5 giây, quan tâm cao", value: "1,900", percentage: "22%", color: "orange", bgColor: "bg-orange-50", textColor: "text-orange-600", dotColor: "bg-orange-500" }, // Màu cam
    { type: "Tập trung", description: "Nhìn chăm chú 1 sản phẩm", value: "974", percentage: "11%", color: "purple", bgColor: "bg-purple-50", textColor: "text-purple-600", dotColor: "bg-purple-500" }, // Màu tím
];

const InteractionTypesPanel = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-md text-sm">📊</span> {/* Thêm icon nhỏ */}
                    <span>Loại hướng nhìn</span>
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Chi tiết</button>
            </div>
            
            <div className="relative h-48 mb-4">
                <Doughnut data={chartData} options={chartOptions} />
            </div>
            
            <div className="space-y-3 mb-4">
                {gazeTypes.map(item => (
                    // Áp dụng màu nền (bgColor), bo góc và padding cho mỗi item
                    <div key={item.type} className={`flex items-center justify-between p-3 rounded-lg ${item.bgColor}`}>
                        <div className="flex items-center space-x-3">
                            {/* Sử dụng dotColor cho chấm tròn */}
                            <div className={`w-3 h-3 ${item.dotColor} rounded-full`}></div>
                            <div>
                                <p className="font-medium text-gray-800">{item.type}</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            {/* Sử dụng textColor cho giá trị số */}
                            <p className={`font-bold ${item.textColor}`}>{item.value}</p>
                            <p className="text-xs text-gray-500">{item.percentage}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Cập nhật phần Thông tin chi tiết */}
            <div className="bg-purple-50 text-purple-800 p-4 rounded-lg text-sm flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                    <span className="text-xl">💡</span> {/* Icon bóng đèn */}
                    <p className="font-semibold text-gray-900">Thông tin chi tiết</p> {/* Tiêu đề màu đen, in đậm */}
                </div>
                
                <ul className="list-disc list-inside space-y-1 text-xs text-purple-700"> {/* Danh sách màu tím */}
                    <li>65% khách nhìn lâu (&gt;5s) có xu hướng dừng lại</li>
                    <li>40% khách tập trung nhìn sẽ tiến tới khu vực đó</li>
                    <li>Thời gian nhìn TB toàn cửa hàng: 6.8s</li>
                    <li>Vị trí hot nhất: Kệ đồ uống tầng 1</li>
                </ul>
            </div>
        </div>
    );
};

export default InteractionTypesPanel;