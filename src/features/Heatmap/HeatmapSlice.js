import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMatrixHeatmap, fetchMetricsHeatmap } from "./heatmap.thunk";
import { formatVietnamTime } from "../../utils/formatVietNam";
const HeatmapSlice = createSlice({
  name: "heatmap",
  initialState: {
    cameraCode: "",
    storeId: "",
    infoHeatmapMatrix: [],
    statusCurrent : {
      grid : true,
      zone : true,
      opacity : 70
    },
    isLoading: false,
  },
  reducers: {
    setStatusCurrent: (state, action) => {
      state.statusCurrent = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatrixHeatmap.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMatrixHeatmap.fulfilled, (state, action) => {
       
        const heatmapData = action.payload.heatmap;
        const { background_image, zones } = action.payload.zone_information;
        state.infoHeatmapMatrix = [];
        for (const item of heatmapData) {
          const {
            camera_code,
            store_id,
            time_stamp,
            grid_size,
            frame_width,
            frame_height,
            heatmap_matrix,
          } = item;
          state.cameraCode = camera_code;
          state.storeId = store_id;
          let newInfor = {
            timeStamp: formatVietnamTime(time_stamp),
            gridSize: grid_size,
            frameWidth: frame_width,
            frameHeight: frame_height,
            heatmapMatrix: heatmap_matrix,
            backgroundImage: background_image,
            zones: [...zones],
          };
          state.infoHeatmapMatrix.push(newInfor);
           state.isLoading = false;
        }
      })
      .addCase(fetchMatrixHeatmap.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setStatusCurrent } = HeatmapSlice.actions;
export default HeatmapSlice.reducer;
