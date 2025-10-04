

import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../features/Dashboard/Dashboard";
import MovementFlow from "../features/MovementFlow/MovementFlow";
import Heatmap from "../features/Heatmap/Heatmap";
import Downtime from "../features/Downtime/Downtime";
import ROI from "../features/ROI/ROI";
import CES from "../features/CES/CES";
import Map from "../features/Map/Map";
// (Các component giả lập cho các chức năng chưa code)
const ThoiGianDung = () => <div className="p-4">Nội dung chức năng Thời gian dừng</div>;
const VungQuanTam = () => <div className="p-4">Nội dung chức năng Vùng quan tâm</div>;
const DiemTuongTac = () => <div className="p-4">Nội dung chức năng Điểm tương tác</div>;




const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="movement-flow" element={<MovementFlow />} />
        <Route path="heatmap" element={<Heatmap />} />
        <Route path="thoi-gian-dung" element={<Downtime />} />
        <Route path="vung-quan-tam" element={<ROI />} />
        <Route path="diem-tuong-tac" element={<CES />} />
        <Route path="map" element={<Map />} />
      </Route>

    </Routes>
  );
};

export default AppRouter;
