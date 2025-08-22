import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart({ data }) {
  const chartData = {
    labels: ["8h", "10h", "12h", "14h", "16h", "18h", "20h"],
    datasets: [
      {
        label: "Thời gian (phút)",
        data: data,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">📈 Thời gian dừng theo giờ</h2>
      <Line data={chartData} />
    </div>
  );
}

export default LineChart;
