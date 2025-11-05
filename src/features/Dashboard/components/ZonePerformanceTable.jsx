import {
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
const ZonePerformanceTable = () => {
  const zones = [
    { name: 'Khu vực cửa vào', traffic: 1256, dwellTime: '24p', revenue: '$245k', conversion: '18.5%', trend: 'up' },
    { name: 'Khu thực phẩm tươi sống', traffic: 420, dwellTime: '12p', revenue: '$89k', conversion: '22.0%', trend: 'up' },
    { name: 'Khu mỹ phẩm', traffic: 280, dwellTime: '8p', revenue: '$52k', conversion: '15.0%', trend: 'down' },
    { name: 'Khu đồ uống', traffic: 380, dwellTime: '6p', revenue: '$76k', conversion: '19.5%', trend: 'up' },
    { name: 'Khu thanh toán', traffic: 250, dwellTime: '4p', revenue: '$198k', conversion: '85.0%', trend: 'up' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Hiệu suất theo khu vực</h3>
        <p className="text-sm text-gray-500 mt-1">Phân tích chi tiết từng khu vực trong cửa hàng</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-4 text-gray-600 font-bold text-xs uppercase tracking-wider">Tên khu vực</th>
              <th className="text-left py-4 px-4 text-gray-600 font-bold text-xs uppercase tracking-wider">Lưu lượng</th>
              <th className="text-left py-4 px-4 text-gray-600 font-bold text-xs uppercase tracking-wider">Thời gian TB</th>
              <th className="text-left py-4 px-4 text-gray-600 font-bold text-xs uppercase tracking-wider">Doanh thu</th>
              <th className="text-left py-4 px-4 text-gray-600 font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">Tỷ lệ chuyển đổi</th>
              <th className="text-center py-4 px-4 text-gray-600 font-bold text-xs uppercase tracking-wider">Xu hướng</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200">
                <td className="py-4 px-4 text-gray-900 font-semibold text-sm">{zone.name}</td>
                <td className="py-4 px-4 text-gray-700 text-sm font-medium">{zone.traffic.toLocaleString()}</td>
                <td className="py-4 px-4 text-gray-700 text-sm font-medium">{zone.dwellTime}</td>
                <td className="py-4 px-4 text-green-600 font-bold text-sm">{zone.revenue}</td>
                <td className="py-4 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-blue-700 font-bold text-sm bg-white shadow-sm">
                    {zone.conversion}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  {zone.trend === 'up' ? (
                    <div className="inline-flex items-center justify-center p-2 bg-green-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center p-2 bg-red-50 rounded-lg">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ZonePerformanceTable;