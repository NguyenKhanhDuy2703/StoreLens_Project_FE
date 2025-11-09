import {configureStore} from "@reduxjs/toolkit";
import dashboardReducer  from "../features/Dashboard/dashboardSlice"
import loginReducer  from "../features/Authentication/signInSlice"
const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: loginReducer,
  },
});
export default store;