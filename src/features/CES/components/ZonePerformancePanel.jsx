import React from 'react';

// Dữ liệu mẫu
const zoneData = [
    { name: "Kệ mỹ phẩm - Tầng 2", description: "Khu vực có tương tác cao nhất", score: 89.2, color: "blue" },
    { name: "Kệ đồ uống - Tầng 1", description: "Tương tác ổn định", score: 76.8, color: "green" },
    { name: "Kệ bánh kẹo - Tầng 1", description: "Cần cải thiện bố trí", score: 65.4, color: "orange" },
    { name: "Quầy thanh toán", description: "Tương tác impulse buying", score: 58.9, color: "purple" },
];

const ZonePerformancePanel = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <span className="text-2xl">🗺️</span>
                <span>Hiệu suất theo khu vực</span>
            </h3>
            <div className="space-y-4">
                {zoneData.map(zone => (
                    <div key={zone.name} className={`flex items-center justify-between p-4 bg-${zone.color}-50 rounded-lg border border-${zone.color}-200`}>
                        <div>
                            <h4 className="font-medium text-gray-900">{zone.name}</h4>
                            <p className="text-sm text-gray-600">{zone.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className={`text-2xl font-bold text-${zone.color}-600`}>{zone.score}</p>
                            <p className="text-xs text-gray-500">Điểm CES</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ZonePerformancePanel;