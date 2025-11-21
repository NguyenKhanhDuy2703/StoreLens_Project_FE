import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMatrixHeatmap, fetchMetricsHeatmap } from "./heatmap.thunk";
import { formatVietnamTime } from "../../utils/formatVietNam";
const HeatmapSlice = createSlice({
  name: "heatmap",
  initialState: {
    storeId: null,
    camereCode: null,
    infoHeatmapMatrix: [],
    metricHeatmapWithZone: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatrixHeatmap.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMatrixHeatmap.fulfilled, (state, action) => {
        state.infoHeatmapMatrix = [];
        for (const item of action.payload) {
          const matrixHouse = {
            cameraCode: item.camera_code,
            storeId: item.store_id,
            hour: formatVietnamTime(item.time_stamp),
            withMaxtrix: item.width_matrix,
            heightMatrix: item.height_matrix,
            gridSize: item.grid_size,
            withFrame: item.frame_width,
            heightFrame: item.frame_height,
            heatmapMatrix: item.heatmap_matrix,
          };
          state.infoHeatmapMatrix.push(matrixHouse);
        }
        state.isLoading = false;
      })
      .addCase(fetchMatrixHeatmap.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchMetricsHeatmap.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMetricsHeatmap.fulfilled, (state, action) => {
        state.metricHeatmapWithZone = [];
        for (const item of action.payload) {
          const newMetric = {
            cameraCode: item.camera_code,
            storeId: item.store_id,
            zoneId: item.zone_id,
            categoryName: item.category_name,
            Trend: item.trend,
            TraficFlowTimeline: item.traffic_flow_timeline,
          };
          state.metricHeatmapWithZone.push(newMetric);
        }

        state.isLoading = false;
      })
      .addCase(fetchMetricsHeatmap.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default HeatmapSlice.reducer;
