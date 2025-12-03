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
        
        return response.data.data
    } catch (error) {
        throw error
    }
}

export const importInvoice = async ({ storeId, file }) => {
    try {
        // 1. Tạo FormData
        const formData = new FormData();
        formData.append("file", file);      // Key 'file' khớp với Backend
        formData.append("store_id", storeId); // Key 'store_id' khớp với Backend

        // 2. Gọi API
        // Lưu ý: Backend route là /invoices/import chứ không phải /dashboard
        // Ta không dùng BASE_URL ở đây để tránh sai đường dẫn
        const response = await axiosInstance.post("/invoices/import", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
}
