import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer

} from 'recharts';
import { useSelector } from 'react-redux';
import EmptyState from '../../../components/common/EmptyState';

const BarLineChart = () => {
  const downtimeState = useSelector((state) => state.downtime);
  const { data, isLoading } = downtimeState.efficiencyChart || { data: [], isLoading: false };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-xl border border-slate-100 shadow-sm">
        <span className="text-blue-500 font-medium animate-pulse">Đang vẽ biểu đồ...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full  flex items-center justify-center ">
        <EmptyState size='large' />
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-4 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl z-50 min-w-[180px]">
          <p className="text-sm font-bold text-slate-700 mb-3">{label}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-slate-500">Lượng khách</span>
              </div>
              <span className="font-bold text-slate-700">{payload[0].value}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-slate-500">TG dừng</span>
              </div>
              <span className="font-bold text-slate-700">{payload[1].value}p</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full flex flex-col transition-all hover:shadow-md">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">Hiệu suất Thu hút</h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">Tương quan Traffic (Cột) & Dwell Time (Đường)</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
            
            {/* --- SỬ DỤNG THẺ SVG VIẾT THƯỜNG (Không cần import) --- */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.4}/>
              </linearGradient>
              
              <filter id="shadow" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.3"/>
              </filter>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} 
              dy={10} 
            />
            
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              unit="p"
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }} />
            
            <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}/>

            <Bar 
              yAxisId="left" 
              dataKey="traffic" 
              name="Lượng khách"
              barSize={28} 
              fill="url(#barGradient)" 
              radius={[6, 6, 6, 6]} 
              animationDuration={1500}
            />
            
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="dwellTime" 
              name="TG dừng TB" 
              stroke="#F59E0B" 
              strokeWidth={4} 
              dot={{ r: 5, fill: '#fff', stroke: '#F59E0B', strokeWidth: 3 }} 
              activeDot={{ r: 8, strokeWidth: 0, fill: '#F59E0B' }}
              animationDuration={1500}
              filter="url(#shadow)" 
            />

          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarLineChart;