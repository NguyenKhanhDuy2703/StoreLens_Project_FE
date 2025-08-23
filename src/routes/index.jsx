// import { Routes, Route } from "react-router-dom";
// import MovementFlow from "../features/MovementFlow/MovementFlow";
// import Dashboard from "../features/Dashboard/Dashboard";
// import Heatmap from "../features/Heatmap/Heatmap";
// import MainLayout from "../layouts/MainLayout";
// const AppRouter = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<MainLayout />} />
//       <Route path="/MovementFlow" element={<MovementFlow />} />
//       <Route path="/Dashboard" element={<Dashboard />} />
//       <Route path="/Heatmap" element={<Heatmap />} />
//     </Routes>
//   );
// };

// export default AppRouter;

// src/routes/index.jsx

import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../features/Dashboard/Dashboard";
import MovementFlow from "../features/MovementFlow/MovementFlow";
import Heatmap from "../features/Heatmap/Heatmap";
import Downtime from "../features/Downtime/Downtime";
import ROI from "../features/ROI/ROI";
import CES from "../features/CES/CES";

// (Các component giả lập cho các chức năng chưa code)
const ThoiGianDung = () => <div className="p-4">Nội dung chức năng Thời gian dừng</div>;
const VungQuanTam = () => <div className="p-4">Nội dung chức năng Vùng quan tâm</div>;
const DiemTuongTac = () => <div className="p-4">Nội dung chức năng Điểm tương tác</div>;


const AppRouter = () => {
  return (
    <Routes>
      {/* Route cha: Luôn hiển thị MainLayout */}
      <Route path="/" element={<MainLayout />}>
        {/* Các Route con sẽ được render bên trong <Outlet /> của MainLayout */}
        
        {/* 'index' có nghĩa là component mặc định khi path là "/" */}
        <Route index element={<Dashboard />} />
        
        {/* Các trang con khác */}
        <Route path="movement-flow" element={<MovementFlow />} />
        <Route path="heatmap" element={<Heatmap />} />
        <Route path="thoi-gian-dung" element={<Downtime />} />
        <Route path="vung-quan-tam" element={<ROI />} />
        <Route path="diem-tuong-tac" element={<CES />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
