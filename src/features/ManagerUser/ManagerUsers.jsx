import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Search,
} from "lucide-react";
import {
  fetchAllUsers,
  fetchBanUser,
  fetchActivateUser,
} from "./user.thunk";
import StatsCards from "./components/StatsCards";
import UserTable from "./components/UserTable";
function ManagerUser() {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleStatusChange = async (userId, currentStatus) => {
    const action = currentStatus === "active" ? fetchBanUser : fetchActivateUser;
    const actionName = currentStatus === "active" ? "Khóa" : "Kích hoạt";

    try {
      await dispatch(action(userId)).unwrap();
      toast.success(`${actionName} tài khoản thành công!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(err || `Không thể ${actionName.toLowerCase()} tài khoản!`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ToastContainer />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý người dùng
          </h1>
          <p className="text-gray-500">
            Quản lý tài khoản và phân quyền người dùng hệ thống
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email hoặc tài khoản..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* User Table */}
        <UserTable
          users={filteredUsers}
          loading={isLoading}
          handleStatusChange={handleStatusChange}
        />

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm">
              <span className="font-semibold">Lỗi:</span> {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default ManagerUser;