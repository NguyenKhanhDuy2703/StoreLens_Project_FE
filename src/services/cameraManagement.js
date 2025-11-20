import axiosInstance from "./axios";
const BASE_URL = "/cameraZones";
export const getListCamerasWithZones = async ({type}) => {
    try {
        const response  = await axiosInstance.get(`${BASE_URL}`, {
            params: { type }
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const postZoneforCamera = async (zone) => {
    try {  
        const cameraCode = zone.cameraCode;
        const response = await axiosInstance.post(`${BASE_URL}/${cameraCode}/zones`, zone.zones );
        return response.data;
    } catch (error) {
        console.error("Error in postZoneforCamera:", error);
        throw error;
    }

}
export const deleteZoneForCamera = async (cameraCode, zoneId) => {
    try {
        // const response = await axiosInstance.delete(`${BASE_URL}/${cameraCode}/zones/${zoneId}`);   
        return response.data;
    } catch (error) {
        throw error;
    }
}