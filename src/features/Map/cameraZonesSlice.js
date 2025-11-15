import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListCamerasWithZones } from "../../services/cameraManagement";
export const fetchCameraWithZones = createAsyncThunk(
  "cameraZones/fetchCameraWithZones",
  async (type, thunkAPI) => {
    try {
      const response = await getListCamerasWithZones({ type });
      console.log("Fetched cameras with zones:", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const cameraZonesSlice = createSlice({
  name: "cameraZones",
  initialState: {
    totalCamera: 0,
    totalZones: 0,
    cameraHaveImage: 0,
    cameraNotSettuped: 0,
    listCameraWithZones: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCameraWithZones.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCameraWithZones.fulfilled, (state, action) => {
        state.loading = false;
        state.totalCamera = action.payload.length;
        state.totalCamera = 0;
        state.totalZones = 0;
        state.cameraHaveImage = 0;
        state.cameraNotSettuped = 0;
        state.listCameraWithZones = [];
        for (const item of action.payload) {
          let objtemp = {};
          state.totalZones += item.zones_info.zones.length;
          state.totalCamera += 1;
          if (item.zones_info.background_image) {
            state.cameraHaveImage += 1;
          } else {
            state.cameraNotSettuped += 1;
          }
          const { camera_code, camera_name } = item;
          objtemp["cameraCode"] = camera_code;
          objtemp["cameraName"] = camera_name;
          objtemp["cameraSpec"] = item.camera_spec;
          objtemp["rtspUrl"] = item.rtsp_url;
          objtemp["storeId"] = item.store_id;
          objtemp["zones"] = item.zones_info;
          state.listCameraWithZones.push(objtemp);
        }
      })
      .addCase(fetchCameraWithZones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default cameraZonesSlice.reducer;
