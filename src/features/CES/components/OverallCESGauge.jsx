import React, { useState, useEffect } from 'react';

const OverallCESGauge = () => {
    const finalScore = 78.5;
    const [displayScore, setDisplayScore] = useState(0);
    const [strokeOffset, setStrokeOffset] = useState(314.16);

    useEffect(() => {
        // Animation cho số điểm
        let currentScore = 0;
        const increment = finalScore / 75; // 75 steps for ~1.5s animation
        const timer = setInterval(() => {
            currentScore += increment;
            if (currentScore >= finalScore) {
                currentScore = finalScore;
                clearInterval(timer);
            }
            setDisplayScore(currentScore);
        }, 20);
        
        // Animation cho vòng cung của đồng hồ
        const circumference = 314.16;
        const finalOffset = circumference - (finalScore / 100) * circumference;

        const animationTimeout = setTimeout(() => {
            setStrokeOffset(finalOffset);
        }, 100);

        // Cleanup function
        return () => {
            clearInterval(timer);
            clearTimeout(animationTimeout);
        };
    }, [finalScore]);

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <span className="text-2xl">📊</span>
                    <span>Điểm CES Tổng thể</span>
                </h3>
            </div>

            {/* Gauge Chart Container */}
            <div className="relative flex-grow flex items-center justify-center my-4">
                <svg className="absolute top-0 left-0 w-full h-full" width="100%" height="100%" viewBox="0 0 300 200">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%" style={{stopColor: '#ef4444'}} />
                           <stop offset="60%" style={{stopColor: '#eab308'}} />
                           <stop offset="80%" style={{stopColor: '#22c55e'}} />
                           <stop offset="100%" style={{stopColor: '#10b981'}} />
                        </linearGradient>
                    </defs>
                    {/* Background Arc */}
                    <path 
                        d="M 50 150 A 100 100 0 0 1 250 150" 
                        stroke="#e5e7eb" 
                        strokeWidth="20" 
                        fill="none" 
                        strokeLinecap="round"
                    />
                    {/* Progress Arc */}
                    <path 
                        d="M 50 150 A 100 100 0 0 1 250 150" 
                        stroke="url(#gaugeGradient)" 
                        strokeWidth="20" 
                        fill="none" 
                        strokeLinecap="round"
                        style={{ 
                            strokeDasharray: 314.16, 
                            strokeDashoffset: strokeOffset,
                            transition: 'stroke-dashoffset 1.5s ease-in-out'
                        }}
                    />
                </svg>
                
                {/* Score Display (Centered) */}
                <div className="text-center">
                    <div className="text-5xl font-bold text-blue-600" style={{fontFeatureSettings: '"tnum"'}}>
                        {displayScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 tracking-wider">Điểm CES</div>
                </div>
            </div>

            {/* Chú thích điểm */}
            <div className="space-y-3 mt-auto">
                 <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2">
                         <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                         <span className="text-sm font-medium text-blue-800">Tốt (60-79)</span>
                    </div>
                    <span className="text-sm text-blue-600 font-semibold">Hiện tại</span>
                </div>
                 <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-700">Tuyệt vời (80-100)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverallCESGauge;