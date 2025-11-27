import axiosInstance from './axios'
const BASE_URL = "/downtime"
export const getDwellTimeOverview = async ({ storeId, range }) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/overview`, {
            params: { store_id: storeId, range }
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
export const getZoneChart = async ({ storeId, range }) => {
    try {
        // Gọi đúng endpoint backend bạn vừa viết
        const response = await axiosInstance.get(`${BASE_URL}/chart-sum-pt`, {
            params: { store_id: storeId, range }
        });
        return response.data.data; 
    } catch (error) {
        throw error;
    }
};
export const getZonePerformance = async ({ storeId , range }) =>{
   try {
        // Gọi đúng endpoint backend bạn vừa viết
        const response = await axiosInstance.get(`${BASE_URL}/performance`, {
            params: { store_id: storeId, range }
        });
        return response.data.data; 
    } catch (error) {
        throw error;
    }
};
export const getRevenueEfficiencyTable = async ({ storeId , range }) =>{
   try {
        // Gọi đúng endpoint backend bạn vừa viết
        const response = await axiosInstance.get(`${BASE_URL}/revennue-efficiency`, {
            params: { store_id: storeId, range }
        });
        return response.data.data; 
    } catch (error) {
        throw error;
    }
};