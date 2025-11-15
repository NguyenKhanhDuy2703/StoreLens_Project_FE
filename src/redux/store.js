import {configureStore} from "@reduxjs/toolkit";
import dashboardReducer  from "../features/Dashboard/dashboardSlice"
import cameraZonesReducer from "../features/Map/cameraZonesSlice"
const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    cameraZones: cameraZonesReducer,
   
  },
});
export default store;