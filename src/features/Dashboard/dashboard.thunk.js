import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStatusMetrics,
  getDataCharts,
  getTopProducts,
  getZonePerformance,
  importInvoice,
  exportExcelReport,
} from "../../services/dashboard.api";
export const fecthGetStatusMetrics = createAsyncThunk(
  "dashboard/fetchGetStatusMetrics",
  async ({ storeId, range, thunkAPI }) => {
    try {
      const response = await getStatusMetrics({
        storeId,
        range,
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch status metrics");
    }
  }
);
export const fetchGetChartData = createAsyncThunk(
  "dashboard/fetchGetChartData",
  async ({ storeId, range, thunkAPI }) => {
    try {
      const response = await getDataCharts({
        storeId,
        range,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch chart data");
    }
  }
);
export const fetchGetTopProducts = createAsyncThunk(
  "dashboard/fetchGetTopProducts",
  async ({ storeId, range, thunkAPI }) => {
    try {
      const response = await getTopProducts({
        storeId,
        range,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch top products");
    }
  }
);
export const fetchGetZonePerformance = createAsyncThunk(
  "dashboard/fetchGetZonePerformance",
  async ({ storeId, range, thunkAPI }) => {
    try {
      const response = await getZonePerformance({
        storeId,
        range,
      });
      console
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch zone performance");
    }
  }
);

export const fetchImportInvoice = createAsyncThunk(
  "dashboard/fetchImportInvoice",
  async ({ storeId, file }, thunkAPI) => {
    try {
      const response = await importInvoice({
        storeId,
        file,
      });
      return response; 
    } catch (error) {
      const message = error.response?.data?.message || "Import thất bại";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const fetchExportReport = createAsyncThunk(
  "dashboard/fetchExportReport",
  async ({ storeId, range, managerName, storeAddress, reportConfig , thunkAPI }) => {
    try {
      const response = await exportExcelReport({
        storeId,        
        range,
        managerName,    
        storeAddress,  
        reportConfig
      });
      return {
          data: response.data,
          headers: response.headers
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Xuất báo cáo thất bại");
    }
  }
);