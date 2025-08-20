import React from "react";

const TopCategories=({ topCategories })=> {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-100 px-4 py-3">
        <h4 className="font-bold text-gray-900 text-sm">Top 5 khu vực đông khách</h4>
      </div>
      <div className="p-4 space-y-3">
        {topCategories.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 px-3 rounded border-2"
            style={{
              backgroundColor: category.percentage >= 85 ? "#fee2e2" : "#fef3c7",
              borderColor: category.colorCode || "#ccc",
            }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${category.color}`}></div>
              <span className="text-sm text-gray-800 font-bold">{category.name}</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{category.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopCategories;
