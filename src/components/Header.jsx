import { useState, useEffect, useRef } from "react"; 
import { Search, Bell, User, Settings, Video, UserPlus, LogOut, AlertTriangle, CheckCircle, Info } from "lucide-react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fecthLogout } from "../features/Authentication/authenSlice";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [userRole, setUserRole] = useState(user?.role || "admin"); 
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Phát hiện khách hàng mới", message: "Có 3 khách hàng mới vào cửa hàng", time: "5 phút trước", isRead: false, type: "info" },
    { id: 2, title: "Cảnh báo Camera", message: "Camera số 2 mất kết nối", time: "15 phút trước", isRead: false, type: "warning" },
    { id: 3, title: "Báo cáo hàng ngày", message: "Báo cáo phân tích đã sẵn sàng", time: "1 giờ trước", isRead: true, type: "success" }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const menuRef = useRef(null);
  const notificationRef = useRef(null);
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
    toast.error("Đăng xuất thất bại, thử lại!");
  }
};

  // Click ngoài menu/notification để đóng
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setIsNotificationOpen(false);
    };
    if (isMenuOpen || isNotificationOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isNotificationOpen]);

  const markAsRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, isRead: true })));

  const getNotificationIcon = (type) => {
    const iconProps = { className: "h-5 w-5" };
    const containerClass = "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0";
    switch(type) {
      case "warning": return <div className={`${containerClass} bg-yellow-100`}><AlertTriangle {...iconProps} className="text-yellow-600" /></div>;
      case "success": return <div className={`${containerClass} bg-green-100`}><CheckCircle {...iconProps} className="text-green-600" /></div>;
      default: return <div className={`${containerClass} bg-blue-100`}><Info {...iconProps} className="text-blue-600" /></div>;
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
            <div className="relative" ref={notificationRef}>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && <span className="absolute top-1.5 right-1 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse"></span>}
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-30">
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Thông báo</h3>
                    {unreadCount > 0 && <button onClick={markAllAsRead} className="text-xs text-purple-600 hover:text-purple-700 font-medium">Đánh dấu tất cả đã đọc</button>}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? notifications.map(notif => (
                      <div key={notif.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${!notif.isRead ? "bg-purple-50" : ""}`} onClick={() => markAsRead(notif.id)}>
                        <div className="flex space-x-3">
                          {getNotificationIcon(notif.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <p className={`text-sm font-medium text-gray-900 ${!notif.isRead ? "font-semibold" : ""}`}>{notif.title}</p>
                              {!notif.isRead && <span className="h-2 w-2 bg-purple-600 rounded-full flex-shrink-0 mt-1.5"></span>}
                            </div>
                            <p className="text-sm text-gray-600 mt-0.5">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <Bell className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm">Không có thông báo mới</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

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
                      <MenuItem icon={UserPlus} label="Tạo tài khoản" />
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
