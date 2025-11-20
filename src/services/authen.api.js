import axiosInstance from "./axios";
const BASE_URL = "/auth";
export const login = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/login`, data);
    return response;
  }
  catch (error) {
    throw new Error("Failed to login");
  }
}
export const signup = async (data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/register`, data);
    return response;
  }
  catch (error) {
    throw new Error("Failed to signup");
  }
};
export const logout = async() => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/logout`);
    return response;
  }
  catch (error) {
    throw new Error("Failed to logout");
  }
};
export const getToken = async() => {  
  try {
    const token = await axiosInstance.get(`gettoken`);
    return token;
  } catch (error) {
    throw new Error("Failed to get token");
  }
};

