import { useState, useEffect, useRef } from "react"; 
import { Search, Bell, User, Settings, Video, UserPlus, LogOut } from "lucide-react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { fecthLogout } from "../features/Authentication/authen.thunk";

const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(user?.role); 
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const handleLogout = async () => {
  try {
    await dispatch(fecthLogout()).unwrap();
    dispatch({ type: "authen/resetState" });
    toast.success("Đăng xuất thành công!");
    setTimeout(() => {
      navigate("/auth/signin");
    }, 500);
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Đăng xuất thất bại, thử lại!");
  }
};
  const MenuItem = ({ icon: Icon, label, onClick, danger }) => (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2.5 text-left flex items-center space-x-3 hover:bg-${danger ? "red" : "gray"}-50 transition-colors`}
    >
      <Icon className={`h-5 w-5 ${danger ? "text-red-600" : "text-gray-600"}`} />
      <span className={`text-sm font-medium ${danger ? "text-red-600" : "text-gray-700"}`}>{label}</span>
    </button>
  );
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-20">
      <ToastContainer />
      <div className="mx-auto px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center space-x-3 flex-shrink-0">
            <img src="/src/assets/logo.png" alt="StoreLens Logo" className="w-32 h-32" />
          </div>

          <Navbar />

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="search" 
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
              placeholder="Nhập từ khóa tìm kiếm..." 
            />
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
          

            <div className="w-px h-6 bg-gray-200"></div>

            <div className="relative" ref={menuRef}>
              <div className="flex items-center space-x-2.5 cursor-pointer hover:opacity-75 transition-opacity" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">{user?.name?.charAt(0) || "A"}</div>
                <span className="font-medium text-gray-700 text-sm hidden sm:block">{userRole}</span>
                <svg className={`h-4 w-4 text-gray-600 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-30">
                  <MenuItem icon={User} label="Thông tin tài khoản" />
                  <MenuItem icon={Settings} label="Cài đặt" />
                  {userRole === "admin" && (
                    <>
                      <div className="my-2 border-t border-gray-200"></div>
                      <MenuItem icon={Video} label="Quản lý Camera" />
                      <MenuItem icon={UserPlus} label="Quản lý tài khoản " />
                    </>
                  )}
                  <div className="my-2 border-t border-gray-200"></div>
                  <MenuItem icon={LogOut} label="Đăng xuất" danger onClick={handleLogout} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
