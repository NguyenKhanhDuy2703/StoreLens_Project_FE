import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StatsCards from "./components/StatsCards";
import UserTable from "./components/UserTable";

import {
    fetchAllUsers,
    fetchBanUser,
    fetchActivateUser,
} from "./user.thunk";

export default function ManagerUser() {
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
            toast.success(`Đã ${actionName.toLowerCase()} tài khoản thành công!`, {
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
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 w-full">
            <ToastContainer />

            {/* StatsCards full-width */}
            <div className="w-full p-4 md:p-8 bg-gray-100">
                <StatsCards stats={stats} />
            </div>

            {/* Table full-width */}
            <div className="w-full p-4 md:p-8">
                <UserTable
                    users={filteredUsers}
                    loading={isLoading}
                    handleStatusChange={handleStatusChange}
                />

                {error && (
                    <p className="text-red-500 mt-4">
                        Lỗi: {error}
                    </p>
                )}
            </div>
        </div>
    );
}
