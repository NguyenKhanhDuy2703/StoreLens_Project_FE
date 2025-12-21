import {
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import EmptyState from '../../../components/common/EmptyState';
import { formatSeconds } from '../../../utils/formatSec';
import { formatCurrency } from '../../../utils/formatCurrency';
const ZonePerformanceTable = ({zonePerformance}) => {

  const isEmpty = !zonePerformance?.zones || zonePerformance?.zones.length === 0;
  
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Hiệu suất theo khu vực</h3>
        <p className="text-sm text-gray-500 mt-1">Phân tích chi tiết từng khu vực trong cửa hàng</p>
      </div>
      {isEmpty ? ( <EmptyState title="Chưa có dữ liệu khu vực" description="Hệ thống chưa ghi nhận dữ liệu khu vực trong thời gian gần đây. Dữ liệu sẽ xuất hiện khi có cập nhật." /> ) : ( <div className="overflow-x-auto">
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
            {zonePerformance?.zones.map((zone, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200">
                <td className="py-4 px-4 text-gray-900 font-semibold text-sm">{zone.category_name}</td>
                <td className="py-4 px-4 text-gray-700 text-sm font-medium">{zone.people_count}</td>
                <td className="py-4 px-4 text-gray-700 text-sm font-medium">{formatSeconds(zone.avg_dwell_time) +"s"}</td>
                <td className="py-4 px-4 text-green-600 font-bold text-sm">{formatCurrency(zone.total_sales_value)}</td>
                <td className="py-4 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-blue-700 font-bold text-sm bg-white shadow-sm">
                    {Math.round(zone.conversion_rate)}%
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
      </div>)}
     
    </div>
  );
};
export default ZonePerformanceTable;