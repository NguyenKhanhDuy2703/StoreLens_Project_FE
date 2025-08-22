import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import KpiCard from "./components/KpiCard";

const reportData = {
  areas: [
    { name: "Kệ thực phẩm", time: 200 },
    { name: "Kệ bánh kẹo", time: 150 },
    { name: "Kệ gia dụng", time: 120 },
    { name: "Khu thanh toán", time: 80 },
    { name: "Lối đi chính", time: 40 }
  ],
  hourly: [1.5, 2.0, 2.3, 2.1, 1.8, 1.2, 0.8],
  interaction: {
    stopRate: 68,
    avgEngagement: 74,
    conversion: 42
  }
};

function ReportPage() {
  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📊 Báo cáo cửa hàng</h1>

      <BarChart data={reportData.areas} />
      <LineChart data={reportData.hourly} />

      <div className="grid grid-cols-3 gap-4 mt-6">
        <KpiCard title="Tỷ lệ dừng lại" value={reportData.interaction.stopRate} color="text-blue-600" />
        <KpiCard title="Tương tác trung bình" value={reportData.interaction.avgEngagement} color="text-green-600" />
        <KpiCard title="Chuyển đổi mua hàng" value={reportData.interaction.conversion} color="text-purple-600" />
      </div>
    </div>
  );
}

export default ReportPage;
