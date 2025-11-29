import React from "react";
import { User, CheckCircle, Lock } from "lucide-react";

const StatsCards = ({ stats }) => {
  const cards = [
    { title: "Tổng", value: stats.total, icon: User, color: "blue" },
    { title: "Hoạt động", value: stats.active, icon: CheckCircle, color: "green" },
    { title: "Đã khóa", value: stats.inactive, icon: Lock, color: "red" },
  ];

  const colorClasses = {
    blue: "bg-gradient-to-br from-blue-500 to-blue-600",
    green: "bg-gradient-to-br from-green-500 to-green-600",
    red: "bg-gradient-to-br from-red-500 to-red-600",
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-6"
        >
          {/* Icon lớn */}
          <div
            className={`p-5 rounded-xl ${colorClasses[card.color]} shadow-md flex items-center justify-center`}
          >
            <card.icon className="w-10 h-10 text-white" />
          </div>

          {/* Text lớn */}
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
              {card.title}
            </span>
            <span className="text-3xl md:text-4xl font-bold text-gray-900">{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
