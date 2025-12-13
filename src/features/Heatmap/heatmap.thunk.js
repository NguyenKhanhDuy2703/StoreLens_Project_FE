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
      console.log("Fetched heatmap data:", response);
      return response;
    } catch (error) {
      console.error("Error fetching heatmap data:", error);
      return thunkAPI.rejectWithValue("Failed to fetch heatmap data");
    }
  }
);

export { fetchMatrixHeatmap  };
