import axiosInstance from "./axios"
export const getAsyncAPI = async ({storeId , range}) => {
    try {
        const urlAsyncStore = "dataSynchronization"
        const urlAsyncZone = "dataSynchronization/zone"
       const resStore = await axiosInstance.get(urlAsyncStore, {
            params: {
                storeId: storeId,
                date : range
            }
        })
        const resZone = await axiosInstance.get(urlAsyncZone, {
            params: {
                storeId: storeId,
                date : range
            }
        })
        return { resStore , resZone };
    } catch (error) {
        console.error("Error in getAsyncAPI:", error);
        throw error;
    }
}