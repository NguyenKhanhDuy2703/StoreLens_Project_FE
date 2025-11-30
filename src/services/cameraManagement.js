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
        console.log("Posting zone for camera:", zone);
        const formData = new FormData();
        formData.append('background_image', zone.zones.background_image);
        formData.append('width_frame', zone.zones.width_frame);
        formData.append('height_frame', zone.zones.height_frame);
        formData.append('zones', zone.zones.zones);
        const cameraCode = zone.cameraCode;
        const response = await axiosInstance.post(`${BASE_URL}/${cameraCode}/zones`,  formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
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