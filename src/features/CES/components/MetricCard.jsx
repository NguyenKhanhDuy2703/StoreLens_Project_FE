import React from 'react';
import MetricCard from './MetricCard';

// Dữ liệu cho các thẻ thông số, có thể lấy từ API sau này
const metricsData = [
    { title: "Tổng tương tác", value: "2,847", change: "+12.5%", changeType: "increase", icon: "👆", color: "blue", highlight: true },
    { title: "Điểm CES trung bình", value: "78.5", change: "+5.2%", changeType: "increase", icon: "📊", color: "purple" },
    { title: "Sản phẩm được chạm", value: "156", change: "+8.1%", changeType: "increase", icon: "🛍️", color: "green" },
    { title: "Tỷ lệ chuyển đổi", value: "24.3%", change: "-2.1%", changeType: "decrease", icon: "💰", color: "orange" },
];

const CESMetricsPanel = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric, index) => (
                <MetricCard key={index} {...metric} />
            ))}
        </div>
    );
};

export default CESMetricsPanel;