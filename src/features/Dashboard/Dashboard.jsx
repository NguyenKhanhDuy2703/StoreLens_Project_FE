import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Clock,
} from "lucide-react";
import KPICard from "./components/KPICard";
import StatusBar from "./components/StatusBar";
import TrafficChart from "./components/TrafficChart";
import TopProducts from "./components/TopProducts";
import ZonePerformanceTable from "./components/ZonePerformanceTable";
import { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";////
import { fecthGetStatusMetrics, fetchGetChartData  , fetchGetTopProducts} from "./dashboardSlice";/////


// Trang tổng quan chính
const StoreLensDashboard = () => {
  const [storeId, setStoreId] = useState("STORE001");
  const [range, setRange] = useState("today");
  const [zoneId, setZoneId] = useState("Z01");
  const [cameraCode, setCameraCode] = useState("C01");
  const dispatch = useDispatch();
  const {
    totalVisitors,
    totalSales,
    conversionRate,
    avgOrderValue,
    avgSessionDuration,
    customerCurrent,
    checkoutLength,
    peakHours,
    isLoading,
  } = useSelector((state) => state.dashboard.metrics);
  const dataCharts = useSelector((state) => state.dashboard.trafficData);
  const dataProducts = useSelector((state) => state.dashboard.topProducts);

  useEffect(() => {
    (async () => {
      dispatch(fecthGetStatusMetrics({ storeId, range, zoneId, cameraCode }));
      dispatch(fetchGetChartData({ storeId, range, zoneId, cameraCode }))
      dispatch(fetchGetTopProducts({ storeId, range, zoneId, cameraCode }))
    })();
  }, [storeId, range, dispatch]);
 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Thẻ KPI */}
      <div className="grid grid-cols-5 gap-5 mb-8">
        <KPICard
          title="Tổng khách ghé thăm"
          value={totalVisitors}
          subtitle="so với hôm qua"
          trend="up"
          trendValue="+12%"
          icon={Users}
          color="blue"
        />
        <KPICard
          title="Tổng doanh thu"
          value={totalSales}
          subtitle="so với hôm qua"
          trend="up"
          trendValue="+5.2%"
          icon={DollarSign}
          color="green"
        />
        <KPICard
          title="Tỷ lệ chuyển đổi"
          value={`${conversionRate}%`}
          subtitle="khách hàng mua hàng"
          trend="up"
          trendValue="+2.3%"
          icon={ShoppingCart}
          color="purple"
        />
        <KPICard
          title="Giá trị đơn hàng TB"
          value={avgOrderValue.toFixed(2)}
          subtitle="mỗi giao dịch"
          trend="up"
          trendValue="+8.1%"
          icon={TrendingUp}
          color="orange"
        />
        <KPICard
          title="Thời gian ở lại TB"
          value={`${avgSessionDuration}p`}
          subtitle="so với hôm qua"
          trend="up"
          trendValue="+3p"
          icon={Clock}
          color="pink"
        />
      </div>
      <div className="mb-8">
        <StatusBar customerCurrent = {customerCurrent}   checkoutLength = {checkoutLength} peakHours={peakHours}/>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <TrafficChart dataCharts = {dataCharts} />
        <TopProducts  dataProducts = {dataProducts} />
      </div>
      <ZonePerformanceTable />
    </div>
  );
};

export default StoreLensDashboard;

