import {configureStore} from "@reduxjs/toolkit";
import dashboardReducer  from "../features/Dashboard/dashboardSlice"
import cameraZonesReducer from "../features/Map/cameraZonesSlice"
import authenSlice from "../features/Authentication/authenSlice"
const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    cameraZones: cameraZonesReducer,
    authen : authenSlice
  },
});
export default store;