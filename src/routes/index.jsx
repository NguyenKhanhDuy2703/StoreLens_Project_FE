import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../features/Dashboard/Dashboard";
import Heatmap from "../features/Heatmap/Heatmap";
import Downtime from "../features/Downtime/Downtime";
import ProductManagement from "../features/ProductManagement/ProductManagement";

import CameraZoneManager from "../features/Map/CameraZoneManager";
import GazeAnalysisDashboard from "../features/Gaze_Analysis/Gaze_Analysis";
import SignInForm from "../features/Authentication/components/SignIn";
import SignUpForm from "../features/Authentication/components/signup";
import AuthenticationLayout from "../features/Authentication/AuthenticationLayout";
import ManagerCameras from "../features/ManagerCamera/ManagerCameras";
import ManagerUser from "../features/ManagerUser/ManagerUsers";
import NotFound from "../components/common/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthenticationLayout />}>
        <Route path="signin" element={<SignInForm />} />
        <Route path="signup" element={<SignUpForm />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="heatmap" element={<Heatmap />} />
        <Route path="thoi-gian-dung" element={<Downtime />} />
        <Route path="diem-tuong-tac" element={<GazeAnalysisDashboard />} />
        <Route path="thiet-lap-khu-vuc" element={<CameraZoneManager />} />
<<<<<<< HEAD
        <Route path="quan-ly-cameras" element={<ManagerCameras />} />
        <Route path="quan-ly-nguoi-dung" element={<ManagerUser />} />       
=======
        <Route path="quan-ly-cameras" element={<ManagerCameras />} />  
        
        <Route path="quan-ly-san-pham" element={<ProductManagement />} />     
>>>>>>> a79b3e9f2a51a256125076035c750db3f17a3fea
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
