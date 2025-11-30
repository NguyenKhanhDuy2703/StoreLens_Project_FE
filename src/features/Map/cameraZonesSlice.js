import { createSlice, current } from "@reduxjs/toolkit";
import { fetchCamerasWithZones , fetchAddZoneForCamera } from "./ManagerCamera.thunk";
const cameraZonesSlice = createSlice({
  name: "cameraZones",
  initialState: {
    cameras: [] ,
    zones: [],
    selectedCamera: [],
    loading: false,
    error: null,
  },
  reducers : {
    setSlectedCamera(state, action) {
      state.selectedCamera = action.payload;
    },
    addNewZone(state, action) {
      const newZone = action.payload;
     const checkZoneSet = state.zones.find( (z) => z.cameraCode === newZone.cameraCode );
      if (checkZoneSet) {
        state.zones.push(newZone);
      }else {
        throw new Error("Camera not found for adding zone");
      }
      if (state.selectedCamera.cam.cameraCode === newZone.cameraCode) {
        state.selectedCamera.zones.zones.push(newZone);
      }
      console.log("State after adding new zone: ", current(state));
    },
    deleteZone(state, action) {
      const { cameraCode, zoneId } = action.payload;
      const checkZone = state.zones.find( (z) => z.cameraCode === cameraCode );
      let tempZones = checkZone.zones.filter( (z) => z.zoneId !== zoneId );
      if (checkZone) {
        checkZone.zones = tempZones;
      }else {
        throw new Error("Camera not found for deleting zone");
      }
      if (state.selectedCamera.cam.cameraCode === cameraCode) {
        state.selectedCamera.zones.zones = tempZones
      }
    }, 
    editZone(state, action) {
      const { cameraCode, zoneData } = action.payload;
      const checkZone = state.zones.find( (z) => z.cameraCode === cameraCode );
      if (checkZone) {
        const zoneIndex = checkZone.zones.findIndex( (z) => z.zoneId === zoneData.zoneId );
        if (zoneIndex !== -1) {
          checkZone.zones[zoneIndex] = zoneData;
        }
      }else {
        throw new Error("Camera not found for editing zone");
      } 
      if (state.selectedCamera.cam.cameraCode === cameraCode) {
        const selectedZoneIndex = state.selectedCamera.zones.zones.findIndex( (z) => z.zoneId === zoneData.zoneId );
        if (selectedZoneIndex !== -1) {
          state.selectedCamera.zones.zones[selectedZoneIndex] = zoneData;
        } 
      }
    },
    addBackgroundImage(state, action) {
      const { cameraCode, backgroundImage } = action.payload;
      const checkZone = state.zones.find( (z) => z.cameraCode === cameraCode );
      if (checkZone) {
        checkZone.backgroundImage = backgroundImage;
      }else {
        throw new Error("Camera not found for adding background image");
      }
      state.selectedCamera.zones.backgroundImage = backgroundImage;
      console.log("State after adding background image: ", current(state));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamerasWithZones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamerasWithZones.fulfilled, (state, action) => {
        state.loading = false;
        state.cameras = action.payload.cameras;
        state.zones = action.payload.zones;
      })
      .addCase(fetchCamerasWithZones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAddZoneForCamera.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddZoneForCamera.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchAddZoneForCamera.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }

});
export const { setSlectedCamera  ,addNewZone , deleteZone , editZone , addBackgroundImage} = cameraZonesSlice.actions;
export default cameraZonesSlice.reducer;
