import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Hàm tiện ích để tạo màu gradient cho nền biểu đồ
const createGradient = (ctx, area) => {
    const colorStart = 'rgba(59, 130, 246, 0.3)';
    const colorEnd = 'rgba(59, 130, 246, 0)';
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, colorEnd);
    gradient.addColorStop(1, colorStart);
    return gradient;
};

const chartData = {
    labels: ['6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
    datasets: [
        {
            label: 'Số lượt nhìn',
            data: [200, 450, 700, 920, 750, 850, 1150, 1000, 400],
            borderColor: '#3b82f6',
            borderWidth: 2.5,
            fill: true,
            backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return null;
                return createGradient(ctx, chartArea);
            },
            tension: 0.4,
            yAxisID: 'y',
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#3b82f6',
            pointBorderWidth: 2,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 3,
        },
        {
            label: 'Thời gian nhìn TB (s)',
            data: [6.0, 6.5, 7.2, 8.0, 7.0, 7.5, 8.8, 8.2, 6.5],
            borderColor: '#10b981',
            borderWidth: 2.5,
            backgroundColor: 'transparent',
            fill: false,
            tension: 0.4,
            yAxisID: 'y1',
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#10b981',
            pointBorderWidth: 2,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 3,
        }
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: window.devicePixelRatio || 1,
    
    // --- THÊM KHỐI NÀY ĐỂ TẠO KHOẢNG CÁCH ---
    layout: {
        padding: {
            top: 20 // Tạo ra 20px khoảng trống ở phía trên, đẩy biểu đồ xuống
        }
    },

    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: {
            position: 'top',
            align: 'start',
            labels: {
                usePointStyle: true,
                boxWidth: 8,
                font: { size: 12 },
                padding: 20,
            }
        },
        tooltip: {
            backgroundColor: '#fff',
            titleColor: '#333',
            bodyColor: '#666',
            borderColor: '#ddd',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
            displayColors: true,
            boxPadding: 4,
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        if (context.dataset.yAxisID === 'y1') {
                            label += context.parsed.y.toFixed(1) + ' s';
                        } else {
                            label += context.parsed.y;
                        }
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            beginAtZero: true,
            title: {
                display: true,
                text: 'Số lượt nhìn',
                font: { size: 12, weight: '500' },
            },
            ticks: { font: { size: 11 } },
            grid: { color: 'rgba(0, 0, 0, 0.08)' }
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            min: 5.0,
            max: 9.0,
            title: {
                display: true,
                text: 'Thời gian nhìn (giây)',
                font: { size: 12, weight: '500' },
            },
            ticks: { font: { size: 11 } },
            grid: { drawOnChartArea: false },
        },
        x: {
            ticks: { font: { size: 11 } },
            grid: { display: false },
        },
    },
};

const HourlyTrendsChart = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-md text-sm">📈</span>
                <span>Xu hướng ánh nhìn theo giờ</span>
            </h3>
            <div className="relative h-72">
                <Line options={chartOptions} data={chartData} />
            </div>
        </div>
    );
};

export default HourlyTrendsChart;