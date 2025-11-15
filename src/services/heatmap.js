import axiosInstance from "./axios";
BASE_URL = "/heatmap";
const getHeatmapData = async ({storeId , cameraCode , today}) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}`, {
            params: {
                store_id: storeId,
                camera_code: cameraCode,
                date: today
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export {getHeatmapData};    