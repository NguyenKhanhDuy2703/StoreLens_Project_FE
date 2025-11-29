import {configureStore} from "@reduxjs/toolkit";
import dashboardReducer  from "../features/Dashboard/dashboardSlice"
import productReducer from "../features/ProductManagement/productSlice"
import cameraZonesReducer from "../features/Map/cameraZonesSlice"
import authenSlice from "../features/Authentication/authenSlice"
import storesSlice from "../features/Authentication/storesSlice"
import heatmapReducer from "../features/Heatmap/HeatmapSlice"
import downtimeReducer from "../features/Downtime/downtimeSlice";
const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    products: productReducer,
    cameraZones: cameraZonesReducer,
    authen : authenSlice,
    heatmap :heatmapReducer,
    stores : storesSlice,
    downtime: downtimeReducer,
  },
});
export default store;