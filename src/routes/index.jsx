import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../features/Dashboard/Dashboard";
import MovementFlow from "../features/MovementFlow/MovementFlow";
import Heatmap from "../features/Heatmap/Heatmap";
import Downtime from "../features/Downtime/Downtime";

import CameraZoneManager from "../features/Map/CameraZoneManager";
import AuthenticationLayout from "../layouts/authenticationLayout";
import SignInForm from "../features/Authentication/SignInForm";
import GazeAnalysisDashboard from "../features/Gaze_Analysis/Gaze_Analysis";



const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthenticationLayout />} >
        <Route path="login" element= {<SignInForm />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="movement-flow" element={<MovementFlow />} /> */}
        <Route path="heatmap" element={<Heatmap />} />
        <Route path="thoi-gian-dung" element={<Downtime />} />
        {/* <Route path="vung-quan-tam" element={<ROI />} /> */}
        <Route path="diem-tuong-tac" element={<GazeAnalysisDashboard />} />
        <Route path="quan-ly-cameras" element={<CameraZoneManager />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
