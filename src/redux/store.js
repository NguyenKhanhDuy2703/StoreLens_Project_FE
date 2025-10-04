import {configureStore} from "@reduxjs/toolkit";
import dashboardSlide from"./dashboard/dashboard"
const store = configureStore({
  reducer: {
    dashboard: dashboardSlide,
    
  },
});
export default store;