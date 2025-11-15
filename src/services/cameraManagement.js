import axiosInstance from "./axios";
const BASE_URL = "/cameraZones";
export const getListCamerasWithZones = async ({type}) => {
    try {
        const response  = await axiosInstance.get(`${BASE_URL}/getListCamera`, {
            params: { type }
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
