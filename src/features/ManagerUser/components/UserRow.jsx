import React from "react";
import {
  Shield,
  CheckCircle,
  XCircle,
  Calendar,
  Lock,
  Unlock,
} from "lucide-react";

 const UserRow = ({ user, handleStatusChange })=> {
  return (
    <tr className="hover:bg-blue-50/30 transition-colors duration-150 group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold uppercase shadow-sm ${
              user.status === "active"
                ? "bg-gradient-to-br from-blue-400 to-blue-600"
                : "bg-gray-400"
            }`}
          >
            {user.fullname.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{user.fullname}</div>
            <div className="text-xs text-gray-400 mt-0.5">
              {user.email}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            user.role === "admin"
              ? "bg-purple-50 text-purple-700 border-purple-200"
              : "bg-indigo-50 text-indigo-700 border-indigo-200"
          }`}
        >
          {user.role === "admin" ? <Shield size={10} className="mr-1" /> : null}
          {user.role === "admin" ? "QUẢN TRỊ VIÊN" : "QUẢN LÝ"}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="text-xs text-gray-500 font-mono">{user.store_id}</span>
      </td>

      <td className="px-6 py-4 text-center">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
            user.status === "active"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {user.status === "active" ? (
            <>
              <CheckCircle size={12} className="mr-1.5" /> Hoạt động
            </>
          ) : (
            <>
              <XCircle size={12} className="mr-1.5" /> Đã khóa
            </>
          )}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-gray-400" />
          {new Date(user.created_at).toLocaleDateString("vi-VN")}
        </div>
        <div className="text-xs text-gray-400 mt-1 pl-5">
          Cập nhật: {new Date(user.updated_at).toLocaleDateString("vi-VN")}
        </div>
      </td>

      <td className="px-6 py-4 text-right">
        {user.status === "active" ? (
          <button
            onClick={() => handleStatusChange(user._id, "active")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 rounded-md text-sm font-medium transition-all shadow-sm hover:shadow"
            title="Khóa tài khoản này"
          >
            <Lock size={14} />
            <span>Khóa</span>
          </button>
        ) : (
          <button
            onClick={() => handleStatusChange(user._id, "inactive")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-green-600 border border-green-200 hover:bg-green-50 hover:border-green-300 rounded-md text-sm font-medium transition-all shadow-sm hover:shadow"
            title="Kích hoạt tài khoản này"
          >
            <Unlock size={14} />
            <span>Kích hoạt</span>
          </button>
        )}
      </td>
    </tr>
  );
}
export default UserRow;
