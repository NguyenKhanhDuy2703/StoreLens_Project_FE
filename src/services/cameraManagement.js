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
function base64ToBlob(base64) {
    // Tách phần header (data:image/png;base64,...) ra khỏi dữ liệu
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1]; // Tự động lấy mime type (ví dụ image/png)
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    // Trả về Blob với mime type chính xác
    return new Blob([u8arr], {type:mime});
}
export const postZoneforCamera = async (zone) => {
    try {  
        const formData = new FormData();
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
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