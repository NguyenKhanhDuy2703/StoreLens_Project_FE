import "react-toastify/dist/ReactToastify.css";
import {
  CheckCircle,
  Lock,
  User,
 
} from "lucide-react";


// StatsCards Component
const StatsCards = ({ stats }) => {
  const cards = [
    { title: "Tổng số", value: stats.total, icon: User, color: "blue" },
    { title: "Hoạt động", value: stats.active, icon: CheckCircle, color: "green" },
    { title: "Đã khóa", value: stats.inactive, icon: Lock, color: "red" },
  ];

  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {card.title}
              </p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div
              className={`p-4 rounded-xl bg-gradient-to-br ${colorClasses[card.color]} shadow-md`}
            >
              <card.icon className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StatsCards;