import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getDwellTimeOverview,
  getZoneChart,
  getZonePerformance, 
  getRevenueEfficiencyTable
} from "../../services/downtime.api";
export const fetchDowntimeKPI = createAsyncThunk(
  "downtime/fetchKPI", 
  async ({ storeId, range }, { rejectWithValue }) => {
    try {
      const response = await getDwellTimeOverview({ storeId, range });
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi tải dữ liệu KPI");
    }
  }
);
export const fetchEfficiencyStats = createAsyncThunk(
  "downtime/fetchchart", 
  async ({ storeId, range }, { rejectWithValue }) => {
    try {
      const response = await getZoneChart({ storeId, range });
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi tải biểu đồ");
    }
  }
);
export const fetchDowntimeList = createAsyncThunk(
  "downtime/fetchList", 
  async ({ storeId, range }, { rejectWithValue }) => {
    try {
      const response = await getZonePerformance({ storeId, range });
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi tải danh sách chi tiết");
    }
  }
);


export const fetchRevenueEfficiency = createAsyncThunk(
  "downtime/fetchRevenueEfficiency", 
  async ({ storeId, range }, { rejectWithValue }) => {
    try {
      const response = await getRevenueEfficiencyTable({ storeId, range });
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi tải danh sách chi tiết");
    }
  }
);

const initialState = {

  kpis: {
    avg: { value: 0, change: 0 },
    min: { value: 0, zone: "N/A", change: 0 },
    max: { value: 0, zone: "N/A", change: 0 },
  },
  isLoadingKPI: false,

  efficiencyChart: {
    data: [],
    isLoading: false,
  },

  list: [],
  isLoadingList: false,

  revenueTable: {
    data: [],
    benchmarks: { avgTime: 0, avgSales: 0 },
    isLoading: false
  },

  error: null,
};

const downtimeSlice = createSlice({
  name: "downtime",
  initialState,
  reducers: {
    resetDowntimeState: (state) => {
      state.list = [];
      state.efficiencyChart.data = [];
      state.error = null;
      state.revenueTable.data = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDowntimeKPI.pending, (state) => {
        state.isLoadingKPI = true;
        state.error = null;
      })
      .addCase(fetchDowntimeKPI.fulfilled, (state, action) => {
        const data = action.payload;
        if (data) {
            state.kpis.avg = data.average_dwell_all_zones || { value: 0, change: 0 };
            state.kpis.min = data.shortest_avg_dwell || { value: 0, zone: "N/A", change: 0 };
            state.kpis.max = data.longest_avg_dwell || { value: 0, zone: "N/A", change: 0 };
        }
        state.isLoadingKPI = false;
      })
      .addCase(fetchDowntimeKPI.rejected, (state, action) => {
        state.isLoadingKPI = false;
        state.error = action.payload;
      }) 
      .addCase(fetchEfficiencyStats.pending, (state) => {
        state.efficiencyChart.isLoading = true;
      })
      .addCase(fetchEfficiencyStats.fulfilled, (state, action) => {
        const data = action.payload;
        state.efficiencyChart.data = data.chart || [];
        state.efficiencyChart.isLoading = false;
      })
      .addCase(fetchEfficiencyStats.rejected, (state) => {
        state.efficiencyChart.isLoading = false;
      })
      .addCase(fetchDowntimeList.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(fetchDowntimeList.fulfilled, (state, action) => {
        const data = action.payload;
        
        if (data && data.list) {
            state.list = data.list.map((item) => ({
              id: item._id || Math.random(),
              categoryName: item.category_name,
              avgTime: item.performance.avg_dwell_time,
              stopCount: item.performance.total_stop_events,
              stopDuration: item.performance.total_stop_time,
              peopleCount: item.performance.people_count,
              totalSales: item.performance.total_sales_value || 0, 
              percentageChange: item.percentage_change
            }));
        }
        state.isLoadingList = false;
      })
      .addCase(fetchDowntimeList.rejected, (state, action) => {
        state.isLoadingList = false;
        console.error("List Error:", action.payload);
      })
      .addCase(fetchRevenueEfficiency.pending, (state) => {
         state.revenueTable.isLoading = true;
      })
      .addCase(fetchRevenueEfficiency.fulfilled, (state, action) => {
         const data = action.payload;
         if (data?.list) {
             state.revenueTable.data = data.list.map(item => ({
                 categoryName: item.categoryName,
                 totalSales: item.totalSales,
                 peopleCount: item.peopleCount,
                 avgTime: item.avgTime,
                 evaluation: item.evaluation,
                 action: item.action,
                 type: item.type
             }));
         }
         if (data?.benchmarks) {
             state.revenueTable.benchmarks = data.benchmarks;
         }
         state.revenueTable.isLoading = false;
      })
      .addCase(fetchRevenueEfficiency.rejected, (state) => {
         state.revenueTable.isLoading = false;
      });
  },
});

export const { resetDowntimeState } = downtimeSlice.actions;
export default downtimeSlice.reducer;