import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGetCategories , fetchGetProducts } from "./products.thunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    limit : 10,
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    prevPage(state) {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }},
    nextPage(state) {
        if (state.currentPage < state.totalPages) {
            state.currentPage += 1;
        }}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.totalItems = action.payload.pagination.totalProducts;
        state.totalPages = action.payload.pagination.totalPages;
        state.currentPage = action.payload.pagination.page;
        state.limit = action.payload.pagination.limit;
      }
        )
        .addCase(fetchGetProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        })

      .addCase(fetchGetCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchGetCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { prevPage , nextPage } = productSlice.actions;
export default productSlice.reducer;
