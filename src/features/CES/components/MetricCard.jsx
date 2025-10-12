import React from 'react';

// Component đã được cập nhật để nhận props màu sắc động
const MetricCard = ({ title, value, subValue, change, changeType, icon, iconBgColor, bgColor, valueColor }) => {
    const isIncrease = changeType === 'increase';
    const hasChange = changeType === 'increase' || changeType === 'decrease';

    return (
        // Sử dụng bgColor prop, nếu không có thì mặc định là 'bg-white'
        // Tăng độ bo góc thành 'rounded-2xl'
        <div className={`${bgColor || 'bg-white'} p-6 rounded-2xl shadow-sm`}>
            <div className="flex items-center justify-between">
                <div>
                    {/* Đổi màu chữ tiêu đề thành gray-500 cho nhạt hơn */}
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    
                    {/* Sử dụng valueColor prop, nếu không có thì mặc định là 'text-gray-900' */}
                    <p className={`text-3xl font-bold ${valueColor || 'text-gray-900'}`}>{value}</p>
                    
                    {change && (
                         <p className={`text-sm text-green-600 flex items-center mt-1`}>
                            {hasChange && (
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isIncrease ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                                    )}
                                </svg>
                            )}
                            {change}
                        </p>
                    )}
                     {subValue && (
                        <p className="text-sm text-gray-500 mt-1">{subValue}</p>
                     )}
                </div>
                {/* Giảm kích thước icon container và đổi thành bo góc vuông */}
                <div className={`w-10 h-10 ${iconBgColor || 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                    <span className="text-xl">{icon}</span>
                </div>
            </div>
        </div>
    );
};

export default MetricCard;