import axiosInstance  from "./axios"
const BASE_URL = "/dashboard"

export const getStatusMetrics = async ({ storeId , range }) => {
    try {
        const response = await axiosInstance.get(BASE_URL + "/statusMetrics", {
            params : { store_id : storeId , range  }
        })
        return response.data.data

    } catch (error) {
        throw error
    }

}
 
export const getDataCharts = async ({ storeId, range  }) => {
    try {
        const response = await axiosInstance.get(BASE_URL + "/dataCharts", {
            params: { store_id: storeId, range   }
        })
        return response.data.data
    } catch (error) {
        throw error
    }
}

export const getTopProducts = async ({ storeId, range  }) => {
    try {
        const response = await axiosInstance.get(BASE_URL + "/topProducts", {
            params: { store_id : storeId , range   }
        })
        
        return response.data.data
    }
    catch (error) {
        console.error("Error fetching top products:", error);
        throw error
    }
}

export const getZonePerformance = async ({ storeId, range  }) => {
    try {
        const response = await axiosInstance.get(BASE_URL + "/performanceZones", {
            params: { store_id : storeId, range    }
        })
        console.log("Zone Performance data from API:", response.data.data);
        return response.data.data
    } catch (error) {
        throw error
    }
}
