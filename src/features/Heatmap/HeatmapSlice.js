import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHeatmapData } from "../../services/heatmap";
const fetchHeatmapData = createAsyncThunk(
  "heatmap/fetchHeatmapData",
  async ({ storeId, cameraCode, range ,  thunkAPI }) => {
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
)

const HeatmapSlice = createSlice({
  name: "heatmap",
  initialState: {
    storeId : null,
    camereCode : null,
    widthMatrix: 15,
    heightMatrix: 9,
    gridSize: 40,
    heatmapMatrix: []
    },
    reducers: {} ,
    extraReducers: (builder) => {
        builder
        .addCase(fetchHeatmapData.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchHeatmapData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.heatmapMatrix = action.payload.heatmap_matrix;
        })
        .addCase(fetchHeatmapData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }

});
export default HeatmapSlice.reducer;