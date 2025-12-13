import "react-toastify/dist/ReactToastify.css";
import {
  Shield,
  CheckCircle,
  XCircle,
  Calendar,
  Lock,
  Unlock,
} from "lucide-react";

const UserRow = ({ user, handleStatusChange }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-sm ${
              user.status === "active"
                ? "bg-gradient-to-br from-blue-500 to-blue-600"
                : "bg-gradient-to-br from-gray-400 to-gray-500"
            }`}
          >
            {user.fullname.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {user.fullname}
            </p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {user.role === "admin" && <Shield size={12} />}
          {user.role === "admin" ? "Quản trị viên" : "Quản lý"}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-gray-600 font-mono">{user.store_id}</span>
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
            user.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.status === "active" ? (
            <>
              <CheckCircle size={13} /> Hoạt động
            </>
          ) : (
            <>
              <XCircle size={13} /> Đã khóa
            </>
          )}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Calendar size={14} className="text-gray-400" />
          {new Date(user.created_at).toLocaleDateString("vi-VN")}
        </div>
        <p className="text-xs text-gray-400 mt-1 ml-5">
          Cập nhật: {new Date(user.updated_at).toLocaleDateString("vi-VN")}
        </p>
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-end">
          {user.status === "active" ? (
            <button
              onClick={() => handleStatusChange(user._id, "active")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow"
            >
              <Lock size={14} />
              Khóa
            </button>
          ) : (
            <button
              onClick={() => handleStatusChange(user._id, "inactive")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-green-600 border border-green-200 hover:bg-green-50 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow"
            >
              <Unlock size={14} />
              Kích hoạt
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
export default UserRow;