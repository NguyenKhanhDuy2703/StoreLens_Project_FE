import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStatusMetrics,
  getDataCharts,
  getTopProducts,
  getZonePerformance,
  importInvoice,
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
// ==== import invoice
export const fetchImportInvoice = createAsyncThunk(
  "dashboard/fetchImportInvoice",
  async ({ storeId, file }, thunkAPI) => {
    try {
      const response = await importInvoice({
        storeId,
        file,
      });
      return response; // Trả về data thành công
    } catch (error) {
      // Lấy message lỗi từ backend trả về
      const message = error.response?.data?.message || "Import thất bại";
      return thunkAPI.rejectWithValue(message);
    }
  }
);