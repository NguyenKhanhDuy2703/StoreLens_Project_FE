import BarChart from "./components/BarChart";
import KpiCard from "./components/KpiCard";
import DashboardHeader from "./components/DashboardHeader";
import AreaDetails from "./components/AreaDetails";    

const dashboardData = {
  kpis: [
    {
      title: "Thời gian dừng lâu nhất",
      value: "4m 32s",
      subtitle: "Kệ mỹ phẩm",
      change: "+15% so với tuần trước",
      changeType: "increase",
      color: "green"
    },
    {
      title: "Thời gian dừng ngắn nhất",
      value: "18s",
      subtitle: "Lối đi chính",
      change: "-8% so với tuần trước",
      changeType: "decrease",
      color: "red"
    },
    {
      title: "Thời gian dừng trung bình",
      value: "1m 47s",
      subtitle: "Toàn cửa hàng",
      change: "+5% so với tuần trước",
      changeType: "increase",
      color: "blue"
    }
  ],
  areaDowntime: [
    { name: "Kệ mỹ phẩm", time: 272, level: "Cao", stops: 234, interactionRate: 78, maxTime: 732 },
    { name: "Kệ quần áo", time: 228, level: "Cao", stops: 189, interactionRate: 65, maxTime: 522 },
    { name: "Kệ điện tử", time: 105, level: "TB", stops: 150, interactionRate: 55, maxTime: 240 },
    { name: "Kệ đồ uống", time: 100, level: "TB", stops: 145, interactionRate: 52, maxTime: 230 },
    { name: "Kệ thực phẩm", time: 95, level: "TB", stops: 130, interactionRate: 51, maxTime: 210 },
    { name: "Kệ bánh kẹo", time: 90, level: "TB", stops: 125, interactionRate: 48, maxTime: 200 },
    { name: "Kệ gia dụng", time: 85, level: "TB", stops: 110, interactionRate: 45, maxTime: 180 },
    { name: "Khu thanh toán", time: 40, level: "TB", stops: 90, interactionRate: 30, maxTime: 90 },
    { name: "Lối đi chính", time: 18, level: "Thấp", stops: 75, interactionRate: 25, maxTime: 45 },
  ].reverse()
};

function ReportPage() {
  return (
    <div className="bg-gray-50 p-6 min-h-screen font-sans">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {dashboardData.kpis.map((kpi, index) => (
          <KpiCard
            key={index}
            {...kpi} 
          />
        ))}
      </div>
      
      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BarChart data={dashboardData.areaDowntime.slice().reverse()} />
        </div>
        <div className="lg:col-span-1">
          <AreaDetails data={dashboardData.areaDowntime} />
        </div>
      </div>
    </div>
  );
}

export default ReportPage;