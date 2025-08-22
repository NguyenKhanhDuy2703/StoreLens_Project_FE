
import React, { useEffect, useRef, useState } from "react";
import { Plus, Circle, Dot, Edit2, Eye, Trash2 } from "lucide-react";
import CameraItem from "./components/CameraItem";
import ShelfLabel from "./components/ShelfLabel";
import ROIBox from "./components/ROIBox";

const camerasSeed = [
  { id: 1, name: "Camera Lối vào", area: "Cửa chính", status: "Hoạt động", active: true },
  { id: 2, name: "Camera Kệ Bánh kẹo", area: "Tầng 1", status: "Hoạt động" },
  { id: 3, name: "Camera Khu thanh toán", area: "Quầy thu ngân", status: "Hoạt động" },
  { id: 4, name: "Camera Kệ Mỹ phẩm", area: "Tầng 2", status: "Hoạt động" },
  { id: 5, name: "Camera Kệ Mỹ phẩm", area: "Tầng 2", status: "Hoạt động" },
  { id: 6, name: "Camera Tổng quan", area: "Toàn cửa hàng", status: "Hoạt động" }
];

function IconBtn({ children, label, danger }) {
  return (
    <button
      title={label}
      className={`p-2 rounded-lg border text-gray-700 hover:bg-gray-50 transition ${
        danger ? "border-red-200 hover:bg-red-50 text-red-600" : "border-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

export default function ROI() {
  const [cameras, setCameras] = useState(camerasSeed);
  const [roi, setRoi] = useState({ x: 20, y: 22, w: 22, h: 16, label: "Kệ Khuyến mãi", sub: "Kệ A" });
  const [dragging, setDragging] = useState(null);
  const frameRef = useRef(null);

  const getBounds = () => frameRef.current?.getBoundingClientRect();

  const onMouseDownROI = (e, type) => {
    e.stopPropagation();
    setDragging({ type, startX: e.clientX, startY: e.clientY, start: { ...roi } });
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const b = getBounds();
    if (!b) return;

    const dxPx = e.clientX - dragging.startX;
    const dyPx = e.clientY - dragging.startY;
    const dxPct = (dxPx / b.width) * 100;
    const dyPct = (dyPx / b.height) * 100;

    if (dragging.type === "move") {
      setRoi((prev) => ({
        ...prev,
        x: Math.min(100 - prev.w, Math.max(0, dragging.start.x + dxPct)),
        y: Math.min(100 - prev.h, Math.max(0, dragging.start.y + dyPct)),
      }));
    } else if (dragging.type === "se") {
      const newW = Math.max(6, dragging.start.w + dxPct);
      const newH = Math.max(6, dragging.start.h + dyPct);
      setRoi((prev) => ({
        ...prev,
        w: Math.min(100 - prev.x, newW),
        h: Math.min(100 - prev.y, newH),
      }));
    }
  };

  const onMouseUp = () => setDragging(null);

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  });

  const activateCamera = (id) => {
    setCameras((prev) => prev.map((c) => ({ ...c, active: c.id === id })));
  };

  const addROI = () => {
    alert("Thêm Vùng mới – demo. Kéo/resize khung trong khung hình trực tiếp để chỉnh.");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-white sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
            <Dot className="text-white" />
          </div>
          <div>
            <div className="text-xl font-semibold">Thiết lập Vùng quan tâm</div>
            <div className="text-sm text-gray-500 -mt-0.5">Tạo và quản lý các vùng phân tích trên camera cửa hàng</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-2 text-emerald-600"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> Trực tiếp</span>
          <button onClick={addROI} className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow">
            <Plus className="w-4 h-4" /> Thêm Vùng mới
          </button>
          <button className="px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50">Hướng dẫn</button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
        <aside className="col-span-3">
          <div className="text-sm font-semibold text-gray-700 mb-3">Danh sách Camera</div>
          <div className="text-xs text-gray-500 mb-4">Chọn camera để thiết lập ROI</div>
          {cameras.map((c) => (
            <CameraItem key={c.id} item={c} onClick={() => activateCamera(c.id)} />
          ))}
        </aside>

        <main className="col-span-9">
          <div className="mb-3">
            <div className="text-sm font-semibold text-gray-700">Camera Lối vào – Khung hình trực tiếp</div>
            <div className="text-xs text-gray-500">Nhấp vào \"＋ Thêm Vùng mới\" để bắt đầu vẽ ROI</div>
          </div>

          {/* Live Frame */}
          <div
            ref={frameRef}
            className="relative w-full h-[420px] rounded-2xl bg-slate-800/95 border border-slate-700 overflow-hidden shadow-lg"
          >
            <div className="absolute inset-6 border border-slate-600 rounded-xl" />

            {/* Shelves */}
            <ShelfLabel style={{ position: "absolute", left: "18%", top: "28%" }}>Kệ hàng A</ShelfLabel>
            <ShelfLabel style={{ position: "absolute", left: "45%", top: "28%" }}>Kệ hàng B</ShelfLabel>
            <ShelfLabel style={{ position: "absolute", left: "73%", top: "28%" }}>Kệ hàng C</ShelfLabel>

            <ShelfLabel style={{ position: "absolute", left: "36%", top: "45%", width: "40%", textAlign: "center" }}>Khu thanh toán</ShelfLabel>
            <ShelfLabel style={{ position: "absolute", left: "43%", top: "62%", width: "34%", textAlign: "center" }}>Khu thanh toán</ShelfLabel>

            {/* Markers */}
            <div className="absolute left-[22%] bottom-10 flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full" />
              <span className="text-emerald-400 text-xs">Lối vào</span>
            </div>
            <div className="absolute right-8 bottom-6">
              <span className="w-4 h-4 bg-red-500 rounded-full inline-block" />
            </div>

            <ROIBox roi={roi} setRoi={setRoi} onMouseDownROI={onMouseDownROI} />
          </div>

          {/* ROI List */}
          <section className="mt-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Circle className="w-3 h-3 text-blue-600" /> Danh sách Vùng quan tâm <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">1 vùng</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Quản lý các vùng đã tạo cho camera này</p>

            <div className="mt-3 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="p-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium">Kệ Khuyến mãi</div>
                  <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-3">
                    <span>Tag: 15/01/2025 – 14:30</span>
                    <span>Diện tích: ~{Math.round(roi.w * roi.h)} px² (tương đối)</span>
                    <span>Trạng thái: <span className="text-emerald-600">Đang theo dõi</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IconBtn label="Xem"><Eye className="w-4 h-4" /></IconBtn>
                  <IconBtn label="Sửa"><Edit2 className="w-4 h-4" /></IconBtn>
                  <IconBtn label="Xoá" danger><Trash2 className="w-4 h-4" /></IconBtn>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
