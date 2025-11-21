import axiosInstance from "./axios"; // import axios đã config sẵn
const BASE_URL = "/stores"; 

export const getAllStores = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/getAllStores`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};
