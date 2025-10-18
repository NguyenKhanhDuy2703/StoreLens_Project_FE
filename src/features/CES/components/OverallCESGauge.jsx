import React, { useState, useEffect } from 'react';

const OverallCESGauge = () => {
    const finalScore = 82.3;
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        let currentScore = 0;
        const increment = finalScore / 75; 
        const timer = setInterval(() => {
            currentScore += increment;
            if (currentScore >= finalScore) {
                currentScore = finalScore;
                clearInterval(timer);
            }
            setDisplayScore(currentScore);
        }, 20);

        return () => clearInterval(timer);
    }, [finalScore]);
    
    const percentage = finalScore / 100;
    const circumference = 2 * Math.PI * 45; // 2 * pi * r
    const offset = circumference - percentage * circumference * 0.5; // * 0.5 for semi-circle

    // Điều chỉnh màu sắc cho phù hợp với biểu đồ
    const scoreLevels = [
        { name: 'Rất thu hút (80-100)', color: 'green', active: finalScore >= 80, status: 'Hiện tại' },
        { name: 'Tốt (60-79)', color: 'blue', active: finalScore >= 60 && finalScore < 80, status: 'Ổn định' },
        { name: 'Trung bình (40-59)', color: 'yellow', active: finalScore >= 40 && finalScore < 60, status: 'Cần cải thiện' },
        { name: 'Thấp (0-39)', color: 'red', active: finalScore < 40, status: 'Cần hành động' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gaze Engagement Score</h3>
            
            <div className="relative flex-grow flex items-center justify-center my-4">
                <svg className="w-full h-full" viewBox="0 0 100 60">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" /> {/* Red */}
                            <stop offset="40%" stopColor="#facc15" /> {/* Yellow */}
                            <stop offset="60%" stopColor="#3b82f6" /> {/* Blue */}
                            <stop offset="80%" stopColor="#10b981" /> {/* Green */}
                        </linearGradient>
                    </defs>
                    <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
                    <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="url(#gaugeGradient)" strokeWidth="10" strokeLinecap="round"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: offset,
                            transition: 'stroke-dashoffset 1.5s ease-in-out'
                        }}
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center top-1/2 -translate-y-1/2 mt-2">
                    <span className="text-5xl font-bold text-blue-600">{displayScore.toFixed(1)}</span>
                    <span className="text-lg font-semibold text-gray-700">Gaze Score</span>
                </div>
            </div>

            <div className="space-y-3 mt-auto">
                {scoreLevels.map(level => {
                    // Tinh chỉnh lại một chút màu yellow để đẹp hơn
                    const dotColor = level.color === 'yellow' ? 'bg-yellow-400' : `bg-${level.color}-500`;
                    return (
                        <div key={level.name} className={`flex items-center justify-between p-3 rounded-lg ${level.active ? `bg-${level.color}-50 border border-${level.color}-200` : 'bg-gray-50 border border-transparent'}`}>
                            <div className="flex items-center space-x-3">
                                {/* ---- THAY ĐỔI CHÍNH NẰM Ở ĐÂY ---- */}
                                {/* Giờ đây chấm tròn sẽ luôn có màu, không phụ thuộc vào active */}
                                <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                                <span className={`text-sm font-medium ${level.active ? `text-${level.color}-800` : 'text-gray-600'}`}>
                                    {level.name} 
                                </span>
                            </div>
                            {level.active && <span className={`text-sm text-${level.color}-700 font-semibold`}>{level.status}</span>}
                            {!level.active && <span className="text-sm text-gray-500">{level.status}</span>}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default OverallCESGauge;