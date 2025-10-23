import { BarChart3, Camera } from "lucide-react";
const TabNavigation = ({ activeTab, onTabChange }) => (
  <div className="bg-white rounded-lg shadow-sm mb-6">
    <div className="flex border-b">
      <button
        onClick={() => onTabChange('cameras')}
        className={`px-6 py-3 font-medium ${
          activeTab === 'cameras'
            ? 'text-purple-600 border-b-2 border-purple-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <Camera className="inline mr-2" size={18} />
        Khu vực giám sát
      </button>
      <button
        onClick={() => onTabChange('dashboard')}
        className={`px-6 py-3 font-medium ${
          activeTab === 'dashboard'
            ? 'text-purple-600 border-b-2 border-purple-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <BarChart3 className="inline mr-2" size={18} />
        Quản lý camera
      </button>
    </div>
  </div>
);
export default TabNavigation;