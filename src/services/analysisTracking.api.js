const BASE_URL = '/tracking';
import axiosInstance from './axios';
export const startTrackingAnalysis = async ( cameraCode ) => {
  try {
    console.log("Starting tracking analysis for camera:", cameraCode);
    const response = await axiosInstance.get(`${BASE_URL}/startTracking`, { params: {  cameraCode } });
    return response.data;
  } catch (error) {
    console.error("Error in startTrackingAnalysis:", error);
    throw error;
  }
}
export const stopTrackingAnalysis = async ( cameraCode ) => {

  try {
    console.log("Stopping tracking analysis for camera:", cameraCode);
    const response = await axiosInstance.get(`${BASE_URL}/stopTracking`, { params: {  cameraCode } });
    console.log("stopTrackingAnalysis response:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
}
