import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TrendingUp, AlertTriangle, CheckCircle, Moon, Zap, Star } from 'lucide-react';
import EmptyState from '../../../components/common/EmptyState';

// --- 1. HELPER FUNCTIONS ---
const formatCurrency = (value) => {
  if (!value) return "0 đ";
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);
};

const formatTime = (val) => {
  return val ? `${val} phút` : "0 phút";
};

// Map Type sang Icon và Style
const STATUS_CONFIG = {
  STAR: { 
    label: 'Hiệu quả cao',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100', 
    icon: Star 
  },
  CASH_COW: { 
    label: 'Chốt đơn nhanh',
    color: 'bg-blue-50 text-blue-700 border-blue-100', 
    icon: Zap 
  },
  CRITICAL_WARNING: { 
    label: 'Cần tối ưu',
    color: 'bg-rose-50 text-rose-700 border-rose-100', 
    icon: AlertTriangle 
  },
  POOR: { 
    label: 'Hiệu suất thấp',
    color: 'bg-slate-100 text-slate-600 border-slate-200', 
    icon: Moon 
  },
  NORMAL: { 
    label: 'Hoạt động ổn định',
    color: 'bg-gray-50 text-gray-600 border-gray-200', 
    icon: CheckCircle 
  }
};

const RevenueEfficiencyTable = () => {
  // Lấy dữ liệu từ Redux (state.downtime.revenueTable)
  const { data, benchmarks, isLoading } = useSelector((state) => state.downtime.revenueTable);

  // --- 2. TÍNH TOÁN MAX ĐỂ VẼ THANH BAR ---
  const { maxTime, maxSales } = useMemo(() => {
    if (!data || data.length === 0) return { maxTime: 1, maxSales: 1 };
    return {
      maxTime: Math.max(...data.map(i => i.avgTime)) || 1,
      maxSales: Math.max(...data.map(i => i.totalSales)) || 1
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 p-8 h-full flex flex-col gap-4">
        <div className="h-8 bg-slate-100 rounded w-1/3 animate-pulse"></div>
        {[1, 2, 3, 4].map(i => <div key={i} className="h-12 bg-slate-50 rounded w-full animate-pulse"></div>)}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full  r ">
        <EmptyState size='large'  />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full font-sans">
      
      {/* --- HEADER --- */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Phân Tích Hiệu Quả Kinh Doanh</h3>
          <p className="text-xs text-slate-500 mt-1">Ma trận tương quan giữa Thời gian giữ chân & Doanh thu</p>
        </div>
        
        {/* Hiển thị Benchmark góc phải */}
        <div className="text-right text-xs text-slate-500 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
          <div className="flex justify-between gap-4 mb-1">
            <span>TB Thời gian:</span>
            <span className="font-bold text-slate-700">{benchmarks?.avgTime?.toFixed(1)} phút</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>TB Doanh thu:</span>
            <span className="font-bold text-slate-700">{formatCurrency(benchmarks?.avgSales)}</span>
          </div>
        </div>
      </div>

      {/* --- TABLE CONTENT --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-400 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 w-[20%]">Khu vực</th>
              <th className="px-6 py-4 w-[25%]">Thời gian dừng (Avg)</th>
              <th className="px-6 py-4 w-[25%]">Doanh thu</th>
              <th className="px-6 py-4 w-[15%]">Đánh giá</th>
              <th className="px-6 py-4 w-[15%] text-right">Hành động</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-50">
            {data.map((row, index) => {
              // Lấy config giao diện dựa trên Type từ API
              const statusConfig = STATUS_CONFIG[row.type] || STATUS_CONFIG.NORMAL;
              const StatusIcon = statusConfig.icon;

              // Tính % độ dài thanh bar
              const timePercent = (row.avgTime / maxTime) * 100;
              const salesPercent = (row.totalSales / maxSales) * 100;

              return (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                  
                  {/* 1. Tên Khu vực */}
                  <td className="px-6 py-5 font-semibold text-slate-700">
                    {row.categoryName}
                  </td>

                  {/* 2. Cột Thời gian (Bar Cam) */}
                  <td className="px-6 py-5">
                    <div className="w-full max-w-[160px]">
                      <div className="flex justify-between mb-1.5">
                        <span className="font-semibold text-slate-700">{formatTime(row.avgTime)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-400 rounded-full" 
                          style={{ width: `${timePercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* 3. Cột Doanh thu (Bar Xanh) */}
                  <td className="px-6 py-5">
                    <div className="w-full max-w-[160px]">
                      <div className="flex justify-between mb-1.5">
                        <span className="font-semibold text-slate-700">{formatCurrency(row.totalSales)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${salesPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* 4. Cột Đánh giá (Badge) */}
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${statusConfig.color}`}>
                      <StatusIcon size={13} strokeWidth={2.5} />
                      {/* Nếu Backend trả về text evaluation thì dùng, không thì fallback */}
                      {row.evaluation || statusConfig.label}
                    </div>
                  </td>

                  {/* 5. Cột Hành động (Button) */}
                  <td className="px-6 py-5 text-right">
                    <button className="text-xs font-medium text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 px-3 py-1.5 rounded-md transition-all shadow-sm">
                      {row.action}
                    </button>
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

export default RevenueEfficiencyTable;