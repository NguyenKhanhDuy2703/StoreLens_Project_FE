const DropdownIcon = () => (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
);

function DashboardHeader() {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left side filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2">
            <span className="text-sm font-medium text-gray-700">Chi nhánh 1 - Quận 1</span>
            <DropdownIcon />
          </div>
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2">
            <span className="text-sm font-medium text-gray-700">Hôm nay</span>
            <DropdownIcon />
          </div>
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2">
            <span className="text-sm font-medium text-gray-700">Tất cả khung giờ</span>
            <DropdownIcon />
          </div>
        </div>
        
        {/* Right side button */}
        <button className="flex items-center gap-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Xuất báo cáo
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;