import React from 'react';

const StatsBox = ({ label, value, valueColor }) => {
  return (
    //  Nền trắng, bóng đổ, và màu chữ mặc định 
    <div className="bg-white rounded-lg p-4 text-center w-50 shadow-lg">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
};

export default StatsBox;