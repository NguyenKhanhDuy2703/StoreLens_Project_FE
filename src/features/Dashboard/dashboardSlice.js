import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStatusMetrics  , getDataCharts, getTopProducts} from "../../services/dashboard.api";
export const fecthGetStatusMetrics = createAsyncThunk(
  "dashboard/fetchGetStatusMetrics",
  async ({ storeId, range, zoneId, cameraCode, thunkAPI }) => {
    try {
      const response = await getStatusMetrics({
        storeId,
        range,
        zoneId,
        cameraCode,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch status metrics");
    }
  }
);
export const fetchGetChartData = createAsyncThunk(
  "dashboard/fetchGetChartData",
  async ({ storeId, range, zoneId, cameraCode, thunkAPI }) => {
    try {
      const response = await getDataCharts({
        storeId,
        range,
        zoneId,
        cameraCode,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch chart data");
    }
  }
);
export const fetchGetTopProducts = createAsyncThunk(
  "dashboard/fetchGetTopProducts",
  async ({ storeId, range, zoneId, cameraCode, thunkAPI }) => {
    try {
      const response = await getTopProducts({
        storeId,
        range,
        zoneId,
        cameraCode,
      })
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch top products");
    }
  }

)
export const fetchGetZonePerformance = createAsyncThunk(
  "dashboard/fetchGetZonePerformance",
  async ({ storeId, range, zoneId, cameraCode, thunkAPI }) => {
    try {
      const response = await getZonePerformance({
        storeId,
        range,
        zoneId,
        cameraCode,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch zone performance");
    }
  }
)
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    metrics: {
      totalVisitors: 0,
      totalSales: 0,
      conversionRate: 0,
      avgOrderValue: 0,
      avgSessionDuration: 0,
      customerCurrent: 0,
      checkoutLength: 0,
      peakHours: [],
      isLoading: false,
    },
    range: "",
    trafficData:[],
    topProducts: [],
    isLoading: false,
    },
  reducers: {},///

  extraReducers: (builder) => {
      builder.addCase(fecthGetStatusMetrics.pending, (state) => {
      state.metrics.isLoading = true;
    }),
      builder.addCase(fecthGetStatusMetrics.fulfilled, (state, action) => {
        for (const metric of action.payload.statusMetric) {
          const {
            people_count,
            total_invoices,
            total_sales_value,
            conversion_rate,
            avg_dwell_time,
            peak_hour,
            people_current,
            checkoutLength,
          } = metric.performance;
          state.metrics.totalVisitors = people_count;
          state.metrics.totalSales = total_sales_value;
          state.metrics.conversionRate = conversion_rate;
          state.metrics.avgOrderValue = total_sales_value / (total_invoices || 1);
          state.metrics.avgSessionDuration = avg_dwell_time;
          state.metrics.customerCurrent = people_current;
          state.metrics.checkoutLength = checkoutLength;
          state.metrics.peakHours = peak_hour;
        }
        state.range = action.payload.range;
        state.metrics.isLoading = false;
      }),
      builder.addCase(fecthGetStatusMetrics.rejected, (state, action) => {
        console.error(action.payload);
        state.metrics.isLoading = false;
      }),
      // hanle fetchGetChartData
      builder.addCase(fetchGetChartData.pending, (state) => {
        state.metrics.isLoading = true;
      }),
      builder.addCase(fetchGetChartData.fulfilled, (state, action) => {
        state.trafficData = [...action.payload.dataCharts];
        state.metrics.isLoading = false;
      }),
      builder.addCase(fetchGetChartData.rejected, (state, action) => {
        console.error(action.payload);
        state.metrics.isLoading = false;
      });
      // handle fetchGetTopProducts
      builder.addCase(fetchGetTopProducts.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchGetTopProducts.fulfilled, (state, action) => {
        const data =action.payload;
        for (const product of data){
          state.topProducts = [...product.top_products];
        }
        state.isLoading = false;
      });
      builder.addCase(fetchGetTopProducts.rejected, (state, action) => {
        console.error(action.payload);
        state.isLoading = false;
      });
  },
});
export default dashboardSlice.reducer;
