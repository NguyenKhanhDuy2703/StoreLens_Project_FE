import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStores } from "../../services/store.api";

export const fetchAllStores = createAsyncThunk(
  "stores/fetchAllStores",
  async (_, thunkAPI) => {
    try {
      const data = await getAllStores();
      return data; // data là mảng stores [{store_id, store_name}, ...]
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch stores");
    }
  }
);

const storesSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStores.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stores = action.payload;
      })
      .addCase(fetchAllStores.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default storesSlice.reducer;
