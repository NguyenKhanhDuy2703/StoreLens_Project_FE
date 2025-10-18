import React from 'react';
import { Search, ChevronDown, LayoutGrid, List, RefreshCw } from 'lucide-react';

// Nhận thêm viewMode và setViewMode 
const FilterBar = ({ filterStatus, setFilterStatus, sortOrder, setSortOrder, viewMode, setViewMode }) => {

  const handleSortToggle = () => {
    if (sortOrder === 'default') setSortOrder('asc');
    else if (sortOrder === 'asc') setSortOrder('desc');
    else setSortOrder('default');
  };

  const getSortLabel = () => {
    if (sortOrder === 'asc') return 'Tên A-Z';
    if (sortOrder === 'desc') return 'Tên Z-A';
    return 'Sắp xếp';
  };

  return (
    <div className="container mx-auto py-4 flex justify-between items-center">
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input type="text" placeholder="Tìm kiếm camera..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div className="flex items-center gap-2">
        {/* Filter Dropdown */}
        <div className="relative">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none cursor-pointer px-4 py-2 border rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            <option value="all">Tất cả</option>
            <option value="online">Đang hoạt động</option>
            <option value="offline">Ngoại tuyến</option>
          </select>
        </div>
        
        {/* Sort Button */}
        <button onClick={handleSortToggle} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
          {getSortLabel()} <ChevronDown size={16} />
        </button>

        {/* << Nút chuyển đổi chế độ xem Grid/List >> */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 transition-colors duration-200 ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 transition-colors duration-200 ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <List size={20} />
          </button>
        </div>
        <button onClick={() => window.location.reload()} className="p-2 border rounded-lg hover:bg-gray-100"><RefreshCw size={20} /></button>
      </div>
    </div>
  );
};

export default FilterBar;