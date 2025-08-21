import React from "react";
import Controls from "./components/Controls";
import HeatmapCanvas from "./components/HeatmapCanvas";
import TopCategories from "./components/TopCategories";
import TemperatureStats from "./components/TemperatureStats";
import TimeAnalysis from "./components/TimeAnalysis";
import Timeline from "./../MovementFlow/components/Timeline";


const Heatmap=()=> {
    const heatmapData = [
        { name: "Thịt bò đặc", x: 15, y: 20, intensity: 0.4 },
        { name: "Gạo nàng", x: 35, y: 18, intensity: 0.9 },
        { name: "Bánh kẹo", x: 55, y: 20, intensity: 0.7 },
        { name: "Gia đồng", x: 75, y: 18, intensity: 0.3 },
        { name: "Mỹ phẩm", x: 15, y: 35, intensity: 0.2 },
        { name: "Gạo lúa", x: 35, y: 35, intensity: 0.6 },
        { name: "Sữa trẻ", x: 55, y: 35, intensity: 0.4 },
        { name: "Nước uống", x: 75, y: 35, intensity: 0.3 },
        { name: "Khu thanh toán", x: 45, y: 65, intensity: 1.0 },
    ];

    const topCategories = [
        { name: "Khu thanh toán", percentage: 95, color: "bg-red-500", colorCode: "#ef4444" },
        { name: "Kệ đồ uống", percentage: 87, color: "bg-red-500", colorCode: "#ef4444" },
        { name: "Lối vào", percentage: 72, color: "bg-yellow-500", colorCode: "#f59e0b" },
        { name: "Kệ bánh kẹo", percentage: 68, color: "bg-yellow-500", colorCode: "#f59e0b" },
        { name: "Kệ quần áo", percentage: 54, color: "bg-yellow-500", colorCode: "#f59e0b" },
    ];

    const timeSlots = [
        { time: "9:00 - 12:00", value: 85, color: "bg-yellow-400", label: "Ấm" },
        { time: "12:00 - 18:00", value: 95, color: "bg-red-500", label: "Nóng" },
        { time: "18:00 - 21:00", value: 75, color: "bg-yellow-400", label: "Ấm" },
    ];

    return (
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Controls />

                <div className="flex gap-6">
                    <div className="flex-1">
                        <HeatmapCanvas heatmapData={heatmapData} />
                        <Timeline />
                    </div>

                    {/* Sidebar */}
                    <div className="w-80 space-y-6">
                        <TopCategories topCategories={topCategories} />
                        <TemperatureStats />
                        <TimeAnalysis timeSlots={timeSlots} />
                        
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Heatmap;
