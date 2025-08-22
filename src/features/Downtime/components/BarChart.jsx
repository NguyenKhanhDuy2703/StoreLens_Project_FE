import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ data }) {
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        label: "Thời gian (giây)",
        data: data.map(d => d.time),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">⏱ Thời gian dừng tại các khu vực</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default BarChart;
