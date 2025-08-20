const MainChart = () => {
  return (
    <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6 relative">
      {/* Flow Chart SVG */}
      <svg viewBox="0 0 800 500" className="w-full h-96">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Entry point */}
        <rect x="350" y="20" width="100" height="30" rx="4" fill="#10b981" stroke="#065f46" strokeWidth="2"/>
        <text x="400" y="38" textAnchor="middle" className="fill-white text-sm font-medium">Lối vào</text>
        
        {/* Flow paths */}
        {/* Main path (red) */}
        <path d="M400 50 Q500 100 450 150 Q400 200 350 250 Q300 300 400 350" 
              stroke="#ef4444" strokeWidth="6" fill="none" opacity="0.8"/>
        
        {/* Secondary path (yellow) */}
        <path d="M400 50 Q300 100 350 150 Q400 200 450 250 Q500 300 400 350" 
              stroke="#eab308" strokeWidth="4" fill="none" opacity="0.8"/>
        
        {/* Minor path (blue) */}
        <path d="M400 50 Q250 150 200 250 Q300 350 400 350" 
              stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.8"/>
        
        {/* Store sections */}
        <rect x="120" y="120" width="80" height="40" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
        <text x="160" y="143" textAnchor="middle" className="fill-gray-700 text-xs">Kệ thực phẩm</text>
        
        <rect x="480" y="120" width="80" height="40" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
        <text x="520" y="143" textAnchor="middle" className="fill-gray-700 text-xs">Kệ đồ uống</text>
        
        <rect x="680" y="120" width="80" height="40" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
        <text x="720" y="143" textAnchor="middle" className="fill-gray-700 text-xs">Kệ bánh kẹo</text>
        
        <rect x="120" y="240" width="80" height="40" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
        <text x="160" y="263" textAnchor="middle" className="fill-gray-700 text-xs">Kệ gia dụng</text>
        
        <rect x="480" y="240" width="80" height="40" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
        <text x="520" y="263" textAnchor="middle" className="fill-gray-700 text-xs">Kệ sữa phẩm</text>
        
        <rect x="680" y="240" width="80" height="40" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
        <text x="720" y="263" textAnchor="middle" className="fill-gray-700 text-xs">Kệ quần áo</text>
        
        {/* Checkout area */}
        <rect x="340" y="380" width="120" height="40" rx="4" fill="#a855f7" stroke="#581c87" strokeWidth="2"/>
        <text x="400" y="403" textAnchor="middle" className="fill-white text-sm font-medium">Khu thanh toán</text>
        
        {/* Exit point */}
        <rect x="350" y="450" width="100" height="30" rx="4" fill="#ef4444" stroke="#991b1b" strokeWidth="2"/>
        <text x="400" y="468" textAnchor="middle" className="fill-white text-sm font-medium">Lối ra</text>
        
        {/* Flow indicators with percentages */}
        <circle cx="450" cy="100" r="12" fill="#ef4444" opacity="0.9"/>
        <text x="450" y="105" textAnchor="middle" className="fill-white text-xs font-bold">68%</text>
        
        <circle cx="350" cy="100" r="10" fill="#eab308" opacity="0.9"/>
        <text x="350" y="104" textAnchor="middle" className="fill-white text-xs font-bold">22%</text>
        
        <circle cx="250" cy="150" r="8" fill="#3b82f6" opacity="0.9"/>
        <text x="250" y="154" textAnchor="middle" className="fill-white text-xs font-bold">10%</text>
      </svg>
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg border border-gray-200">
        <div className="text-xs text-gray-600 mb-2">Mật độ:</div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span>Thấp</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Trung bình</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Cao</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainChart;