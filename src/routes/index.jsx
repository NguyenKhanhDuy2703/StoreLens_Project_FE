import { Routes, Route } from "react-router-dom";
import MovementFlow from "../features/MovementFlow/MovementFlow";
import Dashboard from "../features/Dashboard/Dashboard";
import Heatmap from "../features/Heatmap/Heatmap";
import ROI from "../features/ROI/ROI";
import Downtime from "../features/Downtime/Downtime";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/MovementFlow" element={<MovementFlow />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Heatmap" element={<Heatmap />} />
      <Route path="/ROI" element={<ROI />} />
      <Route path="/Downtime" element={<Downtime />} />
    </Routes>
  );
};

export default AppRouter;
