import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../features/Dashboard/Dashboard";
import Heatmap from "../features/Heatmap/Heatmap";
import Downtime from "../features/Downtime/Downtime";

import CameraZoneManager from "../features/Map/CameraZoneManager";
import GazeAnalysisDashboard from "../features/Gaze_Analysis/Gaze_Analysis";
import SignIn from "../features/Authentication/components/SignIn";
import SignUp from "../features/Authentication/components/signup";
import AuthenticationLayout from "../features/Authentication/AuthenticationLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthenticationLayout />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="heatmap" element={<Heatmap />} />
        <Route path="thoi-gian-dung" element={<Downtime />} />
        <Route path="diem-tuong-tac" element={<GazeAnalysisDashboard />} />
        <Route path="quan-ly-cameras" element={<CameraZoneManager />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
