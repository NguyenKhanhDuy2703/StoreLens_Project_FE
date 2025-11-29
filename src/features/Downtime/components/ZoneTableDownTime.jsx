import React from 'react';
import { useSelector } from 'react-redux';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Hàm format thời gian (2.5 -> 2m 30s)
const formatDuration = (val) => {
  if (!val) return "0s";
  const m = Math.floor(val);
  const s = Math.round((val - m) * 60);
  return `${m}m ${s}s`;
};

const TableDownTime = () => {
  // Lấy dữ liệu từ Redux
  const { list, isLoadingList } = useSelector((state) => state.downtime);

  if (isLoadingList) {
    return <div className="p-6 text-center text-gray-500 bg-white rounded-xl border border-slate-100">Đang tải bảng dữ liệu...</div>;
  }

  if (!list || list.length === 0) {
    return <div className="p-6 text-center text-gray-500 bg-white rounded-xl border border-slate-100">Chưa có dữ liệu bảng.</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-bold text-lg text-slate-800">Bảng dữ liệu chi tiết</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Tên khu vực</th>
              <th className="px-6 py-4">Dwell Time TB (Avg)</th>
              <th className="px-6 py-4 text-center">Tổng số lượt dừng</th>
              <th className="px-6 py-4 text-center">Tổng số người</th>
              <th className="px-6 py-4 text-right">% Thay đổi (vs kỳ trước)</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100">
            {list.map((row) => {
              // Logic màu sắc cho % Thay đổi
              const change = row.percentageChange || 0;
              let badgeClass = "bg-gray-100 text-gray-600";
              let Icon = Minus;

              if (change > 0) {
                badgeClass = "bg-emerald-100 text-emerald-700";
                Icon = TrendingUp;
              } else if (change < 0) {
                badgeClass = "bg-rose-100 text-rose-700";
                Icon = TrendingDown;
              }

              return (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  
                  {/* Tên khu vực */}
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {row.categoryName}
                  </td>

                  {/* Thời gian TB */}
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {formatDuration(row.avgTime)}
                  </td>

                  {/* Số lượt dừng */}
                  <td className="px-6 py-4 text-center text-slate-600">
                    {row.stopCount}
                  </td>

                  {/* Tổng thời gian */}
                  <td className="px-6 py-4 text-center text-slate-600">
                    {row.peopleCount} người
                  </td>

                  {/* % Thay đổi */}
                  <td className="px-6 py-4 text-right">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${badgeClass}`}>
                      <Icon size={12} />
                      {change > 0 ? '+' : ''}{change}%
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDownTime;