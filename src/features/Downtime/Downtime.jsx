import React, { use, useEffect } from 'react';
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
import {formatSeconds} from "../../utils/formatSec"

const Downtime = () => {
  const dispatch = useDispatch();
  const { kpis, isLoadingKPI } = useSelector((state) => state.downtime);
 const {informationStores , selectStore } = useSelector((state) => state.user);
  useEffect(() => {
    const params = { storeId: selectStore.storeId , range: "today" };
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
    <div className="w-full max-w-full overflow-x-hidden p-4 md:p-6 pb-20 bg-gray-50 min-h-screen font-sans text-slate-800">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <StatCard 
            title="TG dừng TB lâu nhất" 
            value={formatSeconds(kpis.max.value) } 
            subtitle={kpis.max.zone} 
            change={kpis.max.change} 
            icon={<Clock className="w-6 h-6" />} 
        />
        <StatCard 
            title="TG dừng TB ngắn nhất" 
            value={formatSeconds(kpis.min.value)} 
            subtitle={kpis.min.zone} 
            change={kpis.min.change} 
            icon={<Zap className="w-6 h-6" />} 
        />
        <StatCard 
            title="TB toàn cửa hàng" 
            value={formatSeconds(kpis.avg.value)} 
            subtitle="Tất cả khu vực" 
            change={kpis.avg.change} 
            icon={<BarChart3 className="w-6 h-6" />} 
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 p-2 md:p-4"> 
            <div className="h-[300px] md:h-[400px] lg:h-[450px] w-full"> 
               <BarLineChart />
            </div>
         </div>
         <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"> 
            <div className="h-[400px] lg:h-[450px] w-full overflow-y-auto custom-scrollbar"> 
               <ZoneTableDownTime />
            </div>
         </div>

      </div>
        <div className="w-full mt-6">
          <RevenueEfficiency />
      </div>

    </div>
  );
};

export default Downtime;