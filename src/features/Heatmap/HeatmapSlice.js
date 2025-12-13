import { createSlice } from "@reduxjs/toolkit";
import { fetchMatrixHeatmap } from "./heatmap.thunk";
import { formatVietnamDateHour } from "../../utils/formatVietNam";
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
    startTimeLine : 0,
    endTimeLine : 0,
    timeLine : [],
    currentHeatmap :[],
    isLoading: false,
  },
  reducers: {
    setStatusCurrent: (state, action) => {
      state.statusCurrent = action.payload;
    },
    setCurrentHeatmap : (state , action) => {
      state.currentHeatmap = state.infoHeatmapMatrix.filter (
        (item) => item.timeStamp === action.payload
      )
    
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
        state.timeLine = [];
        for (const item of heatmapData) {
          const {
            camera_code,
            store_id,
            time_stamp,
            grid_size,
            frame_width,
            frame_height,
            heatmap_matrix,
            date
          } = item;
          state.cameraCode = camera_code;
          state.storeId = store_id;
          let newInfor = {
            timeStamp: time_stamp,
            date : formatVietnamDateHour(date),
            gridSize: grid_size,
            frameWidth: frame_width,
            frameHeight: frame_height,
            heatmapMatrix: heatmap_matrix,
            backgroundImage: background_image,
            zones: [...zones],
          };
          state.timeLine.push (time_stamp)
          state.infoHeatmapMatrix.push(newInfor);
        }
        state.currentHeatmap = state.infoHeatmapMatrix.filter( item  => Math.max(...state.timeLine) === item.timeStamp );
        state.startTimeLine = state.infoHeatmapMatrix[0]?.date || 0;
        state.endTimeLine = state.infoHeatmapMatrix[state.infoHeatmapMatrix.length -1]?.date || 0; 
        
        state.isLoading = false;
      })
      .addCase(fetchMatrixHeatmap.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setStatusCurrent , setCurrentHeatmap } = HeatmapSlice.actions;
export default HeatmapSlice.reducer;
