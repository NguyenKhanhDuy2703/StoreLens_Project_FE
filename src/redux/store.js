import {configureStore} from "@reduxjs/toolkit";
import dashboardReducer  from "../features/Dashboard/dashboardSlice"
const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
export default store;