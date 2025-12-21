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
        const formData = new FormData();
        formData.append("file", file);     
        formData.append("store_id", storeId); 
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
export const exportExcelReport = async ({
  storeId,range,managerName,storeAddress,reportConfig,
}) => {

  const payload = {
    store_id: storeId,       
    range,
    startDate: "2025-12-13",  
    endDate: "2025-12-21",
    managerName,
    storeAddress,
    reportConfig: {
      overviewHeaders: reportConfig.overviewHeaders,
      timeHeaders: reportConfig.timeHeaders ?? [], 
      zoneHeaders: reportConfig.zoneHeaders,
      productHeaders: reportConfig.productHeaders,
    }
  };
  return axiosInstance.post("/report/export", payload, {
    responseType: "blob",
  });
};