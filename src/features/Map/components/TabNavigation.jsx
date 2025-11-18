import { LayoutDashboard, Video } from "lucide-react";

const TabNavigation = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: "cameras", label: "Khu vực giám sát", icon: Video },
    { id: "dashboard", label: "Quản lý camera", icon: LayoutDashboard }
  ];

  return (
    <div className="flex gap-2">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;