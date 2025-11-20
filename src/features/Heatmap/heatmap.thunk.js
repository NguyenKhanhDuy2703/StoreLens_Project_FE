import { createAsyncThunk } from "@reduxjs/toolkit";
import { getHeatmapData  , getMetricsHeatmap} from "../../services/heatmap";
const fetchMatrixHeatmap = createAsyncThunk(
  "heatmap/fetchHeatmapData",
  async ({ storeId, cameraCode, range, thunkAPI }) => {
    try {
      const response = await getHeatmapData({
        storeId,
        cameraCode,
        range,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch heatmap data");
    }
  }
);
const fetchMetricsHeatmap = createAsyncThunk(
  "heatmap/fetchMetricsHeatmap",
  async ({ storeId, cameraCode, range, thunkAPI }) => {
    try {
      const response = await getMetricsHeatmap({
        storeId,
        cameraCode,
        range,
      });
      
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch heatmap data");
    }
  }
);
export { fetchMatrixHeatmap ,fetchMetricsHeatmap };
