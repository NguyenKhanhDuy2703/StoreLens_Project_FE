import React from 'react';
import MetricCard from './MetricCard';

// Dữ liệu đã được cập nhật với màu sắc, icon, và style riêng cho từng thẻ
const metricsData = [
    {
        title: "Tổng số lần nhìn",
        value: "8,524",
        change: "+15%",
        changeType: "increase",
        icon: "👀",
        bgColor: "bg-blue-50", // Nền xanh nhạt
        valueColor: "text-blue-600", // Chữ xanh dương
        iconBgColor: "bg-white" // Nền icon màu trắng
    },
    {
        title: "Thời gian nhìn TB",
        value: "6.8s",
        change: "+5%",
        changeType: "increase",
        icon: "⏱️",
        valueColor: "text-purple-600", // Chữ màu tím
        iconBgColor: "bg-purple-100",
        bgColor: "bg-purple-50" // THÊM DÒNG NÀY: Nền tím nhạt
    },
    {
        title: "SP được nhìn nhiều nhất",
        value: "Coca-Cola",
        subValue: "1,842 lượt nhìn",
        icon: "🥤",
        valueColor: "text-green-600", // Chữ màu xanh lá
        iconBgColor: "bg-green-100",
        bgColor: "bg-green-50" // THÊM DÒNG NÀY: Nền xanh lá nhạt
    },
    {
        title: "Tỷ lệ chú ý -> mua",
        value: "27%",
        change: "+3.2%",
        changeType: "increase",
        icon: "💰",
        valueColor: "text-orange-600", // Chữ màu cam
        iconBgColor: "bg-orange-100",
        bgColor: "bg-orange-50" // THÊM DÒNG NÀY: Nền cam nhạt
    },
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