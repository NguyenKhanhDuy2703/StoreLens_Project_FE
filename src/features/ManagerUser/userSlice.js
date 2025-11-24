import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers, fetchBanUser, fetchActivateUser } from "./user.thunk";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- fetchAllUsers ---
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // --- fetchBanUser ---
    builder
      .addCase(fetchBanUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBanUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.map(u =>
          u._id === action.payload._id ? action.payload : u
        );
      })
      .addCase(fetchBanUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // --- fetchActivateUser ---
    builder
      .addCase(fetchActivateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchActivateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.map(u =>
          u._id === action.payload._id ? action.payload : u
        );
      })
      .addCase(fetchActivateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
