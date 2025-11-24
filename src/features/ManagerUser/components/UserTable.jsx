import React from "react";
import UserRow from "./UserRow";
import { Search } from "lucide-react";

const UserTable = ({ users, loading, handleStatusChange })=> {
  if (loading) {
    return (
      <div className="p-12 text-center flex flex-col items-center text-gray-400">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p>Đang tải danh sách người dùng...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500">
        <Search size={48} className="mx-auto mb-3 text-gray-300" />
        <p className="text-lg">Không tìm thấy người dùng nào</p>
        <p className="text-sm">Thử thay đổi từ khóa tìm kiếm</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <th className="px-6 py-4">Thông tin tài khoản</th>
              <th className="px-6 py-4">Vai trò</th>
              <th className="px-6 py-4">Mã cửa hàng</th>
              <th className="px-6 py-4 text-center">Trạng thái</th>
              <th className="px-6 py-4">Ngày tạo</th>
              <th className="px-6 py-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                handleStatusChange={handleStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
        <span>Hiển thị {users.length} kết quả</span>
      </div>
    </div>
  );
}
export default UserTable;
