import { useState, useEffect } from 'react';
import { Users, TrendingUp, ShoppingCart, Clock, RefreshCw} from 'lucide-react';
import ZoneDetails from './components/ZoneDetails';
import TrafficFlowChart from './components/TrafficFlowChart';
import TopProductsTable from './components/TopProductsTable';
import MetricCard from './components/MetricCard';
import StatusItem from './components/StatusItem';

// Main Dashboard Component
const StoreLensDashboard = () => {
  

  // Simulated data - in real app, fetch from API
  const metrics = {
    visitorsIn: { value: 1256, change: 12, trend: 'up' },
    visitorsOut: { value: 1189, change: 8, trend: 'up' },
    inStore: { value: 67, status: 'normal' },
    avgDwellTime: { value: '24m', change: 3, trend: 'up' },
    conversionRate: { value: '18.5%', change: 2.3, trend: 'up' },
    avgBasketSize: { value: '₫245k', change: 5.2, trend: 'up' },
    peakHour: { value: '18:00-19:00', capacity: '85%' },
    checkoutQueue: { value: 3, avgWait: '4m' }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
    
      {/* Key Metrics Grid */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<Users className="h-6 w-6 text-green-600" />}
          title="Khách vào hôm nay"
          value={metrics.visitorsIn.value.toLocaleString()}
          change={`+${metrics.visitorsIn.change}%`}
          trend="up"
          subtitle="so với hôm qua"
          color="green"
        />
        
        <MetricCard
          icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
          title="Tỷ lệ chuyển đổi"
          value={metrics.conversionRate.value}
          change={`+${metrics.conversionRate.change}%`}
          trend="up"
          subtitle="khách mua/tổng khách"
          color="blue"
        />
        
        <MetricCard
          icon={<ShoppingCart className="h-6 w-6 text-purple-600" />}
          title="Giá trị giỏ hàng TB"
          value={metrics.avgBasketSize.value}
          change={`+${metrics.avgBasketSize.change}%`}
          trend="up"
          subtitle="so với hôm qua"
          color="purple"
        />
        
        <MetricCard
          icon={<Clock className="h-6 w-6 text-orange-600" />}
          title="Thời gian lưu trú TB"
          value={metrics.avgDwellTime.value}
          change={`+${metrics.avgDwellTime.change}m`}
          trend="up"
          subtitle="so với hôm qua"
          color="orange"
        />
      </div>

      {/* Real-time Status Bar */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white shadow-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatusItem 
            label="Khách trong cửa hàng"
            value={metrics.inStore.value}
            status={metrics.inStore.status}
          />
          <StatusItem 
            label="Hàng đợi thanh toán"
            value={`${metrics.checkoutQueue.value} người`}
            status={metrics.checkoutQueue.value > 5 ? 'warning' : 'normal'}
            detail={`Chờ TB: ${metrics.checkoutQueue.avgWait}`}
          />
          <StatusItem 
            label="Giờ cao điểm"
            value={metrics.peakHour.value}
            status="info"
            detail={`Công suất: ${metrics.peakHour.capacity}`}
          />
          <StatusItem 
           label="Cảnh báo"
            value="Khu mỹ phẩm"
            status="warning"
            detail="Khách đông, cần hỗ trợ"
            />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Traffic Flow Chart & Products Table */}
        <div className="space-y-6 lg:col-span-2">
          <TrafficFlowChart />
          <TopProductsTable />
        </div>
        
        {/* Zone Details */}
        <div>
          <ZoneDetails />
        </div>
      </div>
    </div>
  );
};






export default StoreLensDashboard;