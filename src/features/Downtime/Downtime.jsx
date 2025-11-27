import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, Zap, BarChart3 } from 'lucide-react';

// 1. Import Actions
import { 
  fetchDowntimeKPI, 
  fetchEfficiencyStats, 
  fetchDowntimeList,
  fetchRevenueEfficiency
} from './downtimeSlice';

// 2. Import Components
import StatCard from './components/StatCard';
import BarLineChart from './components/BarLineChart';
import ZoneTableDownTime from './components/ZoneTableDownTime';
import RevenueEfficiency from './components/RevenueEfficiencyTable';


// Hàm format thời gian
const formatTime = (val) => {
  if (!val) return "0m 0s";
  const m = Math.floor(val);
  const s = Math.round((val - m) * 60);
  return `${m}m ${s}s`;
};

const Downtime = () => {
  const dispatch = useDispatch();
  const { kpis, isLoadingKPI } = useSelector((state) => state.downtime);

  useEffect(() => {
    const params = { storeId: "STORE001", range: "today" };
    dispatch(fetchDowntimeKPI(params));
    dispatch(fetchEfficiencyStats(params));
    dispatch(fetchDowntimeList(params));
    dispatch(fetchRevenueEfficiency(params));
  }, [dispatch]);

  if (isLoadingKPI) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 text-blue-600 font-medium">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    // FIX 1: Thêm overflow-x-hidden để ngăn trang bị trượt ngang ngoài ý muốn
    <div className="w-full max-w-full overflow-x-hidden p-4 md:p-6 pb-20 bg-gray-50 min-h-screen font-sans text-slate-800">
      
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">Phân tích thời gian dừng</h1>
        <p className="text-sm text-slate-500 mt-1">Tổng quan hiệu suất giữ chân khách hàng</p>
      </div>

      {/* --- HÀNG 1: KPI --- */}
      {/* FIX 2: Giữ nguyên grid, nhưng đảm bảo các card co giãn tốt */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <StatCard 
            title="TG dừng TB lâu nhất" 
            value={formatTime(kpis.max.value)} 
            subtitle={kpis.max.zone} 
            change={kpis.max.change} 
            icon={<Clock className="w-6 h-6" />} 
        />
        <StatCard 
            title="TG dừng TB ngắn nhất" 
            value={formatTime(kpis.min.value)} 
            subtitle={kpis.min.zone} 
            change={kpis.min.change} 
            icon={<Zap className="w-6 h-6" />} 
        />
        <StatCard 
            title="TB toàn cửa hàng" 
            value={formatTime(kpis.avg.value)} 
            subtitle="Tất cả khu vực" 
            change={kpis.avg.change} 
            icon={<BarChart3 className="w-6 h-6" />} 
        />
      </div>

      {/* --- HÀNG 2: CHARTS & LEADERBOARD --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
         {/* Cột Trái: Biểu đồ */}
         {/* FIX 3: Thay vì fix cứng 450px, ta dùng min-h và chiều cao linh hoạt theo màn hình */}
         {/* bg-white và rounded nên đặt ở đây để tạo khung chứa rõ ràng */}
         <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 p-2 md:p-4"> 
            <div className="h-[300px] md:h-[400px] lg:h-[450px] w-full"> 
               <BarLineChart />
            </div>
         </div>

         {/* Cột Phải: Bảng Xếp Hạng Top 3 */}
         {/* FIX 4: Thêm flex flex-col để nội dung bên trong tự dàn đều, tránh bị cắt cụt nếu quá dài */}
         <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"> 
            <div className="h-[400px] lg:h-[450px] w-full overflow-y-auto custom-scrollbar"> 
               <ZoneTableDownTime />
            </div>
         </div>

      </div>

      {/* --- HÀNG 3: BẢNG CHI TIẾT --- */}
      {/* FIX 5: Quan trọng nhất - Bọc bảng trong overflow-x-auto để bảng có thể cuộn ngang trên mobile */}
        <div className="w-full mt-6">
          <RevenueEfficiency />
      </div>

    </div>
  );
};

export default Downtime;