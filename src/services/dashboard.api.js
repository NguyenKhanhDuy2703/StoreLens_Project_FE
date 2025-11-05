import axiosInstance  from "./axios"
const BASE_URL = "/dashboard"

export const getStatusMetrics = async ({ storeId , range , zoneId , cameraCode}) => {
    try {
       
        const response = await axiosInstance.get(BASE_URL + "/statusMetrics", {
            params : { store_id : storeId , range , zone_id : zoneId , camera_code : cameraCode }
        })
        console.log("response data", response.data.data)
        return response.data.data

    } catch (error) {
        throw error
    }

}
export const getDataCharts = async ({ storeId, range , zoneId , cameraCode }) => {
    try {
        const response = await axiosInstance.get(BASE_URL + "/dataCharts", {
            params: { store_id: storeId, range , zone_id : zoneId , camera_code : cameraCode  }
        })
        return response.data.data
    } catch (error) {
        throw error
    }
}

export const getTopProducts = async ({ storeId, range , zoneId , cameraCode }) => {
    try {
        const response = await axiosInstance.get(BASE_URL + "/topProducts", {
            params: { store_id : storeId , range , zone_id : zoneId , camera_code : cameraCode  }
        })
        
        return response.data.data
    }
    catch (error) {
        console.error("Error fetching top products:", error);
        throw error
    }
}

export const getZonePerformance = async ({ storeId, range , zoneId , cameraCode }) => {
    try {
        const response = await axiosInstance.get(BASE_URL + "/zonePerformance", {
            params: { storeId, range  , zone_id : zoneId , camera_code : cameraCode  }
        })
        return response.data
    } catch (error) {
        throw error
    }
}
