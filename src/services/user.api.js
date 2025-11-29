import axiosInstance from "./axios";

const BASE_URL = "/users";

// Lấy tất cả user
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/getAll`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to get users");
  }
};

// Ban user
export const banUser = async (userId) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/ban/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to ban user");
  }
};

// Kích hoạt user
export const activateUser = async (userId) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/activate/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to activate user");
  }
};
