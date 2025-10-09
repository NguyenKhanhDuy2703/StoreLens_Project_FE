import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


// Hàm để xác định màu cho từng thanh
const getBarColor = (timeInSeconds) => {
  if (timeInSeconds > 200) return 'rgba(52, 211, 153, 1)'; // Green
  if (timeInSeconds > 80) return 'rgba(251, 191, 36, 1)';  // Amber
  return 'rgba(239, 68, 68, 1)'; // Red
};

// Hàm định dạng thời gian từ giây sang "Xm Ys"
const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0s";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    let result = '';
    if (m > 0) result += `${m}m `;
    if (s > 0 || m === 0) result += `${s}s`;
    return result.trim();
}

function BarChart({ data }) {
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        label: "Thời gian dừng (giây)",
        data: data.map(d => d.time),
        backgroundColor: data.map(d => getBarColor(d.time)),
        barThickness: 20,
        borderRadius: 4,
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.x !== null) {
                        label += formatTime(context.parsed.x);
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        x: {
            beginAtZero: true,
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                callback: function(value, _index, _ticks) {
                    return formatTime(value); 
                }
            }
        },
        y: {
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                font: {
                    size: 14,
                }
            }
        }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-1">Thời gian dừng trung bình theo khu vực</h2>
      <p className="text-sm text-gray-500 mb-4">Dữ liệu hôm nay (9:00 - 21:00)</p>
      <div className="relative h-[450px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default BarChart;