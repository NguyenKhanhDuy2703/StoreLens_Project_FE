import React from "react";

const TimeAnalysis=({ timeSlots }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h4 className="font-medium text-gray-900 mb-4 text-sm">Phân tích theo giờ</h4>
      <div className="space-y-4">
        {timeSlots.map((slot, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600">{slot.time}</span>
              <span className="text-xs font-bold text-gray-900">{slot.label}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${slot.color}`}
                style={{ width: `${slot.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TimeAnalysis;
