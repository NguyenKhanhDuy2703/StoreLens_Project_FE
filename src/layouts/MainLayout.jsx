import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fecthGetToken } from "../features/Authentication/authen.thunk";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isLogin, isChecking } = useSelector(
    (state) => state.authen
  );

  // Lấy token khi layout load
  useEffect(() => {
    dispatch(fecthGetToken());
  }, [dispatch]);

  // Redirect chỉ khi xác định isLogin = false
  useEffect(() => {
    if (!isChecking && isLogin === false) {
      navigate("/auth/signin");
    }
  }, [isChecking, isLogin, navigate]);
  // Trong lúc đang kiểm tra token → show loading
  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-700"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header user={user} />
      <main className="flex-grow w-full mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="bg-white rounded-lg">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
