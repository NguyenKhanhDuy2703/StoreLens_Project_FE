import axiosInstance from "./axios";
const BASE_URL = "/heatmap";
const getHeatmapData = async ({ storeId, cameraCode, range }) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}`, {
      params: {
        store_id: storeId,
        camera_code: cameraCode,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
const getMetricsHeatmap = async ({ storeId, cameraCode, range }) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/metrics`, {
      params: {
        store_id: storeId,
        camera_code: cameraCode,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export { getHeatmapData, getMetricsHeatmap };
