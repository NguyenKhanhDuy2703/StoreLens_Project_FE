import { useState, useRef, useCallback, useMemo } from "react"; // Thêm useCallback, useMemo
import { useDispatch, useSelector } from "react-redux";
import { fetchExportReport, fetchImportInvoice } from "../dashboard.thunk";
import {
  Calendar,
  Download,
  ChevronDown,
  Database,
  Upload,
} from "lucide-react";
import { getAsyncAPI } from "../../../services/asyn.api";
import { setSelectStore } from "../../ManagerUser/userSlice";
import toast from "react-hot-toast";
import useBackgroundSync from "../../../utils/useBackgroundSync"; // Import Hook
import { STORE_REPORT_CONFIG } from "../../../constants/reportConfig";
export default function StoreFilter({ selectedStore, informationStores }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [timeRange, setTimeRange] = useState("today");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const timeRangeOptions = [
    { value: "today", label: "Hôm nay" },
    { value: "yesterday", label: "Hôm qua" },
    { value: "7days", label: "7 ngày qua" },
    { value: "30days", label: "30 ngày qua" },
    { value: "quarter", label: "Quý này" },
    { value: "year", label: "Năm nay" },
  ];
  const {  selectStore } = useSelector((state) => state.user || {});
  // 1. Helper để lấy StoreID hiện tại an toàn
  const currentStoreId = useMemo(() => {
    try {
      if (!selectedStore) return informationStores?.[0]?.store_id;
      const parsed = typeof selectedStore === 'string' ? JSON.parse(selectedStore) : selectedStore;
      return parsed.storeId || informationStores?.[0]?.store_id;
    } catch (e) {
      return informationStores?.[0]?.store_id;
    }
  }, [selectedStore, informationStores]);

  // 2. Định nghĩa hàm sync dữ liệu (Dùng chung cho cả Auto và Manual)
  const syncData = useCallback(async () => {
    if (!currentStoreId) return;
    setIsSyncing(true)
    try {
      await getAsyncAPI({ storeId: currentStoreId, range: timeRange });
    } catch (error) {
      console.error("Lỗi đồng bộ dữ liệu:", error);
      setIsSyncing(false);
    }finally {
      setIsSyncing(false);
    }
  }, [currentStoreId, timeRange]);

  // 3. Kích hoạt Hook chạy nền 
  useBackgroundSync(syncData, 60);
  // 4. Xử lý nút bấm thủ công (Manual Sync)
  const handleManualSync = async () => {
    setIsSyncing(true);
    await syncData(); // Gọi lại hàm logic ở trên
    setIsSyncing(false);
    toast.success("✅ Đồng bộ dữ liệu thành công!");
  };

  // --- Các hàm xử lý Import/Export giữ nguyên ---
  const handleImportPOS = () => {
    if (!currentStoreId) { 
       alert("⚠️ Vui lòng chọn một cửa hàng cụ thể để Import dữ liệu!");
       return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls)$/)) {
      alert("❌ Chỉ chấp nhận file Excel (.xlsx, .xls)");
      return;
    }

    setIsImporting(true);

    try {
      const resultAction = await dispatch(
        fetchImportInvoice({
          storeId: selectedStore, // Lưu ý: API import có thể cần chuỗi JSON gốc hoặc ID, tùy BE
          file: file,
        })
      );

      if (fetchImportInvoice.fulfilled.match(resultAction)) {
        const count = resultAction.payload.count;
        alert(`✅ Import thành công ${count} hóa đơn!`);
        // Sau khi import xong, có thể muốn sync lại dữ liệu ngay lập tức
        handleManualSync(); 
      } else {
        alert(`❌ Lỗi: ${resultAction.payload}`);
      }
    } catch (error) {
      console.error("Lỗi upload:", error);
      alert("❌ Có lỗi xảy ra khi upload file.");
    } finally {
      setIsImporting(false);
    }
  };
  const getCurrentStoreId = () => {
    try {
      if (selectStore) {
        if (typeof selectStore === 'object') {
           return selectStore.storeId;
        }
        const parsed = JSON.parse(selectStore);
        return parsed.storeId;
      }
      if (informationStores && informationStores.length > 0) {
        return informationStores[0].store_id;
      }
    } catch (error) {
      console.error("Lỗi lấy Store ID:", error);
    }
    return null;
  };
  const handleExport = async () => {
    const storeIdToExport = getCurrentStoreId();

    if (!storeIdToExport) {
      toast.error("⚠️ Vui lòng chọn một cửa hàng để xuất báo cáo!");
      return;
    }
    const currentStoreData = informationStores?.find(s => s.store_id === storeIdToExport);
    const managerName = currentStoreData?.manager_infor?.name || "Quản lý cửa hàng";
    const storeAddress = currentStoreData?.address || "Địa chỉ chưa cập nhật";

    console.log("📤 Đang gửi yêu cầu xuất báo cáo:", { storeIdToExport, managerName });

    setIsExporting(true);
    const toastId = toast.loading("Đang tạo báo cáo Excel...");

    try {
      const resultAction = await dispatch(
        fetchExportReport({
          storeId: storeIdToExport,
          range: timeRange,
          managerName: managerName,   // Gửi tên quản lý
          storeAddress: storeAddress, // Gửi địa chỉ
          reportConfig: STORE_REPORT_CONFIG,
        })
      );
      if (fetchExportReport.fulfilled.match(resultAction)) {
        const { data, headers } = resultAction.payload;
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
      
        let fileName = `BaoCao_${storeIdToExport}_${timeRange}.xlsx`;
        const contentDisposition = headers["content-disposition"];
        if (contentDisposition) {
           const match = contentDisposition.match(/filename="?([^"]+)"?/);
           if (match && match[1]) fileName = match[1];
        }

        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success("✅ Xuất báo cáo thành công!", { id: toastId });
      } else {
        toast.error(`❌ Lỗi Server: ${resultAction.payload?.message || "Không xác định"}`, { id: toastId });
      }
    } catch (error) {
      console.error("Lỗi Export:", error);
      toast.error("❌ Có lỗi xảy ra khi xuất file.", { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };


  const selectStoreFillter = (e) => {
    dispatch(setSelectStore(JSON.parse(e)));
  };

  const ActionButtons = () => (
    <div className="flex gap-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".xlsx, .xls"
      />

      <button
        onClick={handleManualSync} // Đổi thành hàm handleManualSync mới
        disabled={isSyncing}
        className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition disabled:opacity-50"
      >
        <Database size={18} className={isSyncing ? "animate-spin" : ""} />
        <span className="text-sm font-medium">Đồng bộ</span>
      </button>
      
      {/* ... Nút Import POS và Export giữ nguyên ... */}
      <button
        onClick={handleImportPOS}
        disabled={isImporting}
        className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition disabled:opacity-50"
      >
        {isImporting ? (
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
              value={selectedStore} // Đảm bảo value này khớp với logic onChange
              onChange={(e) => selectStoreFillter(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {informationStores?.map((option) => (
                <option
                  key={option.store_id}
                  value={JSON.stringify({
                    storeId: option.store_id,
                    storeName: option.store_name,
                  })}
                >
                  {option.store_name}
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