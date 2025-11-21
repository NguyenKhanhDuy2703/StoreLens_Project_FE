import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStatusMetrics,
  getDataCharts,
  getTopProducts,
  getZonePerformance,
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
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch zone performance");
    }
  }
);