import { useState } from "react";
import {
  Calendar,
  RefreshCw,
  Download,
  ChevronDown,
  Database,
  Upload,
} from "lucide-react";

export default function StoreFilter() {
  const [timeRange, setTimeRange] = useState("today");
  const [selectedStore, setSelectedStore] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const timeRangeOptions = [
    { value: "today", label: "Hôm nay" },
    { value: "yesterday", label: "Hôm qua" },
    { value: "7days", label: "7 ngày qua" },
    { value: "30days", label: "30 ngày qua" },
    { value: "quarter", label: "Quý này" },
    { value: "year", label: "Năm nay" },
    { value: "custom", label: "Tùy chỉnh" },
  ];

  const storeOptions = [
    { value: "all", label: "Tất cả cửa hàng" },
    { value: "store_01", label: "Cửa hàng Hải Châu" },
    { value: "store_02", label: "Cửa hàng Thanh Khê" },
    { value: "store_03", label: "Cửa hàng Sơn Trà" },
    { value: "store_04", label: "Cửa hàng Ngũ Hành Sơn" },
  ];

  // Actions
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("Đồng bộ dữ liệu thành công!");
    }, 2000);
  };

  const handleImportPOS = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      alert("Import dữ liệu POS thành công!");
    }, 2000);
  };

  const handleExport = () => {
    alert("Đang xuất báo cáo...");
  };

  const ActionButtons = () => (
    <div className="flex gap-3">
      <button
        onClick={handleSync}
        disabled={isSyncing}
        className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition disabled:opacity-50"
      >
        <Database size={18} className={isSyncing ? "animate-spin" : ""} />
        <span className="text-sm font-medium">Đồng bộ</span>
      </button>

      <button
        onClick={handleImportPOS}
        disabled={isImporting}
        className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition disabled:opacity-50"
      >
        <Upload size={18} />
        <span className="text-sm font-medium">Import POS</span>
      </button>
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
      >
        <Download size={18} />
        <span className="text-sm font-medium">Xuất báo cáo</span>
      </button>
    </div>
  );

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3">
      {/* Filters Row */}
      <div className="flex items-end gap-4">
        {/* Store Filter */}
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded"></span>
            Cửa hàng
          </label>
          <div className="relative">
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {storeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-blue-500" />
            Khoảng thời gian
          </label>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {timeRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
        <ActionButtons />
      </div>
    </div>
  );
}
