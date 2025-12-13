import axiosInstance from "/src/services/axios.js";
import { isBase64Image, isURLImage } from "/src/utils/checkImg.js";

const BASE_URL = "/cameraZones";

export const getListCamerasWithZones = async ( storeId ) => {
  try {
    console.log("Fetching cameras for storeId:", storeId);
    const response = await axiosInstance.get(`${BASE_URL}`, { params: { storeId } });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
function base64ToBlob(base64) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);

  for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);

  return new Blob([u8arr], { type: mime });
}
export const postZoneforCamera = async (zone) => {
  try {
    
    const formData = new FormData();
    const img = zone.zones.background_image;
    if (isBase64Image(img)) {
      formData.append("background_image", base64ToBlob(img), "background_image.png");
    } 
    else if (isURLImage(img)) {
      formData.append("background_image_url", img); 
    } 
    else {
      throw new Error("Invalid image format");
    }

    formData.append("width_frame", zone.zones.width_frame);
    formData.append("height_frame", zone.zones.height_frame);
    formData.append("zones", zone.zones.zones); 

    const response = await axiosInstance.post(
      `${BASE_URL}/${zone.cameraCode}/zones`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data;

  } catch (error) {
    console.error("Error in postZoneforCamera:", error);
    throw error;
  }
};
