import { useState, useEffect, useRef } from "react";
import { Search, Bell, User, Settings, Video, UserPlus, LogOut } from "lucide-react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState("admin");
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/auth/signin');
  };

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const MenuItem = ({ icon: Icon, label, onClick, danger, path }) => (
    <button 
      onClick={() => {
        if (path) {
          navigate(path);
          setIsMenuOpen(false);
        } else if (onClick) {
          onClick();
        }
      }}
      className={`w-full px-4 py-2.5 text-left hover:bg-${danger ? 'red' : 'gray'}-50 transition-colors flex items-center space-x-3`}
    >
      <Icon className={`h-5 w-5 ${danger ? 'text-red-600' : 'text-gray-600'}`} />
      <span className={`text-sm font-medium ${danger ? 'text-red-600' : 'text-gray-700'}`}>
        {label}
      </span>
    </button>
  );

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="mx-auto px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <img src="/src/assets/logo.png" alt="StoreLens Logo" className="w-32 h-32" />
          </div>

          <Navbar />
          
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Type to search..."
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Notification Button - Icon Only */}
            <button 
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                3
              </span>
            </button>

            <div className="w-px h-6 bg-gray-200"></div>

            {/* User Menu */}
            <div className="relative" ref={menuRef}>
              <div
                className="flex items-center space-x-2.5 cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                  A
                </div>
                <span className="font-medium text-gray-700 text-sm hidden sm:block">{userRole}</span>
                <svg
                  className={`h-4 w-4 text-gray-600 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-30">
                  <MenuItem icon={User} label="Thông tin tài khoản" />
                  <MenuItem icon={Settings} label="Cài đặt" />
                  
                  <div className="my-2 border-t border-gray-200"></div>
                  <MenuItem icon={Video} label="Quản lý Camera" path="/quan-ly-cameras" />
                  <MenuItem icon={UserPlus} label="Tạo tài khoản" />
                  
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