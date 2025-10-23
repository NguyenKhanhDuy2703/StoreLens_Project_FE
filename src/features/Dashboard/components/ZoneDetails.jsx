// Zone Details Component
const ZoneDetails = () => {
  const zones = [
    { name: 'Lối vào', visitors: 350, engagement: 'High', color: 'bg-red-500' },
    { name: 'Khu mỹ phẩm', visitors: 280, engagement: 'High', color: 'bg-orange-500' },
    { name: 'Khu thực phẩm', visitors: 420, engagement: 'High', color: 'bg-green-500' },
    { name: 'Khu đồ uống', visitors: 180, engagement: 'Mid', color: 'bg-yellow-500' },
    { name: 'Quầy thanh toán', visitors: 250, engagement: 'Mid', color: 'bg-blue-500' }
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Chi tiết theo khu vực</h2>
      <div className="space-y-4">
        {zones.map((zone, index) => (
          <div key={index} className="rounded-lg border border-gray-200 p-4 hover:border-blue-300">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${zone.color}`}></div>
                <span className="font-medium text-gray-900">{zone.name}</span>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                zone.engagement === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {zone.engagement}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Lượt ghé: {zone.visitors}</span>
              <span className="text-gray-600">{Math.floor((zone.visitors / 1256) * 100)}% tổng số</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div 
                className={`h-2 rounded-full ${zone.color}`}
                style={{ width: `${(zone.visitors / 420) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ZoneDetails;