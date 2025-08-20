const Sidebar = () => {
  const flowStats = [
    { label: 'Tuyến chính:', value: '68% khách hàng', color: 'bg-red-500' },
    { label: 'Tuyến phụ:', value: '22% khách hàng', color: 'bg-yellow-500' },
    { label: 'Tuyến ít:', value: '10% khách hàng', color: 'bg-blue-500' }
  ];

  const heatmapStats = [
    { label: 'Khu thanh toán:', value: '95%', color: 'bg-red-500' },
    { label: 'Kệ đồ uống:', value: '78%', color: 'bg-orange-500' },
    { label: 'Kệ bánh kẹo:', value: '65%', color: 'bg-blue-400' },
    { label: 'Kệ gia dụng:', value: '32%', color: 'bg-cyan-400' }
  ];

  return (
    <div className="w-64 bg-white p-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thống kê luồng</h3>
        <div className="space-y-3">
          {flowStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              <div className="text-sm">
                <span className="text-gray-600">{stat.label}</span>
                <span className="ml-1 font-medium text-gray-800">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Điểm nóng</h3>
        <div className="space-y-3">
          {heatmapStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              <div className="text-sm">
                <span className="text-gray-600">{stat.label}</span>
                <span className="ml-1 font-medium text-gray-800">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;