import React from 'react';

const MetricCard = ({ title, value, change, changeType, icon, color, highlight }) => {
    const isIncrease = changeType === 'increase';
    
    // Ánh xạ màu sắc tới các class của Tailwind
    const colorClasses = {
        blue: { text: 'text-blue-600', bg: 'bg-blue-100' },
        purple: { text: 'text-purple-600', bg: 'bg-purple-100' },
        green: { text: 'text-green-600', bg: 'bg-green-100' },
        orange: { text: 'text-orange-600', bg: 'bg-orange-100' },
    };

    return (
        <div className={`metric-card p-6 rounded-xl ${highlight ? 'highlight' : ''}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className={`text-3xl font-bold ${colorClasses[color]?.text || 'text-gray-900'}`}>{value}</p>
                    <p className={`text-sm ${isIncrease ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           {isIncrease ? (
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                           ) : (
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                           )}
                        </svg>
                        {change}
                    </p>
                </div>
                <div className={`w-12 h-12 ${colorClasses[color]?.bg || 'bg-gray-100'} rounded-full flex items-center justify-center`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
        </div>
    );
};

export default MetricCard;