import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Clock,
} from "lucide-react";
import KPICard from "./components/KPICard";
import TrafficChart from "./components/TrafficChart";
import TopProducts from "./components/TopProducts";
import ZonePerformanceTable from "./components/ZonePerformanceTable";
import { useEffect, useState } from "react";
import currency from "currency.js";
import { useDispatch, useSelector } from "react-redux"; ////
import {
  fecthGetStatusMetrics,
  fetchGetChartData,
  fetchGetTopProducts,
  fetchGetZonePerformance,
} from "./dashboard.thunk"; 
import StoreFilter from "./components/Fillter";
import { formatCurrency } from "../../utils/formatCurrency";
const StoreLensDashboard = () => {
  const [storeId, setStoreId] = useState("");
  const [range, setRange] = useState("today");
  const dispatch = useDispatch();
  const {
    totalVisitors,
    totalSales,
    conversionRate,
    avgOrderValue,
    avgSessionDuration,
    isLoading,
  } = useSelector((state) => state.dashboard.metrics);
  const dataCharts = useSelector((state) => state.dashboard.trafficData);
  const dataProducts = useSelector((state) => state.dashboard.topProducts);
  const zonePerformance = useSelector(
    (state) => state.dashboard.performaceZone
  );
  const {informationStores} = useSelector((state) => state.user);
  if (informationStores.length > 0 && !storeId) {
    setStoreId(informationStores[0].store_id);
  }
  useEffect(() => {
    if (!storeId) return;
    (async () => {
      dispatch(fecthGetStatusMetrics({ storeId, range }));
      dispatch(fetchGetChartData({ storeId, range }));
      dispatch(fetchGetTopProducts({ storeId, range }));
      dispatch(fetchGetZonePerformance({ storeId, range }));
    })();
    
  }, [storeId, range]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <StoreFilter informationStores = {informationStores}/>
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
          value={formatCurrency(totalSales)}
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
          value={formatCurrency(avgOrderValue)}
          subtitle="mỗi giao dịch"
          trend="up"
          trendValue="+8.1%"
          icon={TrendingUp}
          color="orange"
        />
        <KPICard
          title="Thời gian ở lại TB"
          value={`${avgSessionDuration}s`}
          subtitle="so với hôm qua"
          trend="up"
          trendValue="+3p"
          icon={Clock}
          color="pink"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:flex-[2]">
          <TrafficChart dataCharts={dataCharts} />
        </div>
        <div className="lg:flex-[1]">
          <TopProducts dataProducts={dataProducts} />
        </div>
      </div>
      <ZonePerformanceTable zonePerformance={zonePerformance} />
    </div>
  );
};

export default StoreLensDashboard;
