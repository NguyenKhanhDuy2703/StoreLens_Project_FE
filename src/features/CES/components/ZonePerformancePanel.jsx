import React from 'react';

const zoneData = [
    { name: "Kệ đồ uống - Tầng 1", description: "Khu vực được nhìn nhiều nhất", score: "92.1", avgTime: "7.2s/lượt nhìn", color: "blue" },
    { name: "Kệ mỹ phẩm - Tầng 2", description: "Thời gian nhìn dài", score: "87.3", avgTime: "8.5s/lượt nhìn", color: "green" },
    { name: "Kệ bánh kẹo - Tầng 1", description: "Cần cải thiện vị trí", score: "71.2", avgTime: "5.8s/lượt nhìn", color: "orange" },
    { name: "Quầy thanh toán", description: "Ánh nhìn impulse buying", score: "64.8", avgTime: "4.2s/lượt nhìn", color: "purple" },
];

const ZonePerformancePanel = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm  p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Hiệu suất ánh nhìn theo khu vực
            </h3>
            <div className="space-y-4">
                {zoneData.map(zone => (
                    <div key={zone.name} className={`flex items-center justify-between p-4 bg-${zone.color}-50 rounded-lg`}> {/* Removed border-${zone.color}-200 */}
                        <div>
                            <h4 className="font-medium text-gray-900">{zone.name}</h4>
                            <p className="text-sm text-gray-600">{zone.description}</p>
                            <p className="text-xs text-gray-500 mt-1">TB: {zone.avgTime}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className={`text-3xl font-bold text-${zone.color}-600`}>{zone.score}</p>
                            <p className="text-xs text-gray-500">Gaze Score</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ZonePerformancePanel;