import { useState, useRef } from "react";
import { useDispatch } from "react-redux"; 
import { fetchImportInvoice } from "../dashboard.thunk"; 

import {
  Calendar,
  // RefreshCw,
  Download,
  ChevronDown,
  Database,
  Upload,
} from "lucide-react";

// 3. Nhận Props từ Dashboard cha thay vì tự khai báo useState nội bộ
export default function StoreFilter({ 
  selectedStore, 
  setSelectedStore, 
  timeRange, 
  setTimeRange 
}) {
  const dispatch = useDispatch(); // Khởi tạo dispatch
  const fileInputRef = useRef(null); // Tạo Ref cho thẻ input file

  // State loading cho các nút hành động
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
    // Lưu ý: Value phải khớp với Store ID trong Database
    { value: "all", label: "Tất cả cửa hàng" },
    { value: "STORE001", label: "Cửa hàng Hải Châu" },
    { value: "STORE002", label: "Cửa hàng Thanh Khê" },
    { value: "STORE003", label: "Cửa hàng Sơn Trà" },
    { value: "STORE004", label: "Cửa hàng Ngũ Hành Sơn" },
  ];

  // --- LOGIC MỚI: XỬ LÝ IMPORT FILE ---
  
  // 1. Hàm bấm nút "Import POS" -> Kích hoạt thẻ input ẩn
  const handleImportPOS = () => {
    if (selectedStore === "all") {
      alert("⚠️ Vui lòng chọn một cửa hàng cụ thể để Import dữ liệu!");
      return;
    }
    // Reset giá trị input để cho phép chọn lại cùng 1 file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
      fileInputRef.current.click();
    }
  };

  // 2. Hàm xử lý khi người dùng chọn file xong
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate đuôi file Excel
    if (!file.name.match(/\.(xlsx|xls)$/)) {
      alert("❌ Chỉ chấp nhận file Excel (.xlsx, .xls)");
      return;
    }

    setIsImporting(true); // Bật loading

    try {
      // Gọi Redux Thunk gửi file lên Server
      const resultAction = await dispatch(
        fetchImportInvoice({
          storeId: selectedStore,
          file: file,
        })
      );

      // Kiểm tra kết quả trả về từ Backend
      if (fetchImportInvoice.fulfilled.match(resultAction)) {
        const count = resultAction.payload.count;
        alert(`✅ Import thành công ${count} hóa đơn!`);
        // Tại đây bạn có thể gọi thêm logic reload lại Dashboard nếu cần
      } else {
        alert(`❌ Lỗi: ${resultAction.payload}`);
      }
    } catch (error) {
      console.error("Lỗi upload:", error);
      alert("❌ Có lỗi xảy ra khi upload file.");
    } finally {
      setIsImporting(false); // Tắt loading
    }
  };
  // --- KẾT THÚC LOGIC IMPORT ---

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("Đồng bộ dữ liệu thành công!");
    }, 2000);
  };

  const handleExport = () => {
    alert("Đang xuất báo cáo...");
  };

  const ActionButtons = () => (
    <div className="flex gap-3">
      {/* THẺ INPUT FILE ẨN (MAGIC INPUT) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".xlsx, .xls"
      />

      <button
        onClick={handleSync}
        disabled={isSyncing}
        className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition disabled:opacity-50"
      >
        <Database size={18} className={isSyncing ? "animate-spin" : ""} />
        <span className="text-sm font-medium">Đồng bộ</span>
      </button>

      <button
        onClick={handleImportPOS} // Gọi hàm kích hoạt input
        disabled={isImporting}
        className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition disabled:opacity-50"
      >
        {isImporting ? (
          // Hiệu ứng loading
          <Upload size={18} className="animate-bounce" />
        ) : (
          <Upload size={18} />
        )}
        <span className="text-sm font-medium">
          {isImporting ? "Đang xử lý..." : "Import POS"}
        </span>
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