import { createSlice } from "@reduxjs/toolkit";
import {fecthGetStatusMetrics , fetchGetChartData , fetchGetTopProducts , fetchGetZonePerformance ,fetchImportInvoice}from "./dashboard.thunk"
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
    trafficData: {
      chart_data: [],
      isLoading: false,
    },
    topProducts: {
      products: [],
      isLoading: false,
    },
    performaceZone: {
      zones: [],

      isLoading: false,
    },
    importStatus: {
        isLoading: false,
        success: false,
        error: null
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    // handle fecthGetStatusMetrics
    builder.addCase(fecthGetStatusMetrics.pending, (state) => {
      state.metrics.isLoading = true;
    }),
      builder.addCase(fecthGetStatusMetrics.fulfilled, (state, action) => {
        for (const metric of action.payload.statusMetric) {
          const {
            total_visitors,
            total_revenue,
            total_invoices,
            conversion_rate,
            avg_store_dwell_time,
            avg_basket_value,
          } = metric.kpis;
          const { people_current, checkout_length } = metric.realtime;
          const peak_hours = 10;
          state.metrics.totalVisitors = total_visitors;
          state.metrics.totalSales = total_revenue;
          state.metrics.conversionRate = conversion_rate;
          state.metrics.avgOrderValue = avg_basket_value;
          state.metrics.avgSessionDuration = avg_store_dwell_time;
          state.metrics.customerCurrent = people_current;
          state.metrics.checkoutLength = checkout_length;
          state.metrics.peakHours = peak_hours;
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
        for (const chartData of action.payload.dataCharts) {
          state.trafficData.chart_data = [...chartData.chart_data];
        }
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
      const data = action.payload;
      for (const product of data) {
        state.topProducts.products = [...product.top_products];
      }
      state.isLoading = false;
    });
    builder.addCase(fetchGetTopProducts.rejected, (state, action) => {
      console.error(action.payload);
      state.isLoading = false;
    });
    builder.addCase(fetchGetZonePerformance.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGetZonePerformance.fulfilled, (state, action) => {
      const data = action.payload;
      state.performaceZone.zones = data.map((zones) => ({
        people_count: zones.performance.people_count,
        total_sales_value: zones.performance.total_sales_value,
        conversion_rate: zones.performance.conversion_rate,
        avg_dwell_time: zones.performance.avg_dwell_time,
        total_stop_events: zones.performance.total_stop_events,
        category_name: zones.category_name,
      }));
    });
    builder.addCase(fetchGetZonePerformance.rejected, (state, action) => {
      state.isLoading = false;
    });

    // import dux lieeuj 

    builder.addCase(fetchImportInvoice.pending, (state) => {
      state.importStatus.isLoading = true;
      state.importStatus.success = false;
      state.importStatus.error = null;
    });
    builder.addCase(fetchImportInvoice.fulfilled, (state, action) => {
      state.importStatus.isLoading = false;
      state.importStatus.success = true;
      // Có thể reload lại dữ liệu dashboard ngay sau khi import thành công nếu muốn
    });
    builder.addCase(fetchImportInvoice.rejected, (state, action) => {
      state.importStatus.isLoading = false;
      state.importStatus.success = false;
      state.importStatus.error = action.payload; // Message lỗi từ Thunk
    });
  },
});
export default dashboardSlice.reducer;
