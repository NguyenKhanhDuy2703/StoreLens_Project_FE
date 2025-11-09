import axiosInstance from "./axios";
const BASE_URL = "/auth";
export const login = async ({ account, password }) => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/login?account=${account}&password=${password}`
    );
    console.log("Login response:", response.data);
    return response.data;  
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || { message: error.message };
  }
};
