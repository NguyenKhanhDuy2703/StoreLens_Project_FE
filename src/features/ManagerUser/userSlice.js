import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers, fetchBanUser, fetchActivateUser , fetchListStoreForUser } from "./user.thunk";

const initialState = {
  users: [],
  informationStores: [],
  selectStore: {
    storeId:"",
    storeName:""
  },
  cameraSelected: "",
  listcaermaCodes: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectStore: (state, action) => {
      const { storeId, storeName } = action.payload;
      state.selectStore.storeId = storeId
      state.selectStore.storeName = storeName
    }
  },
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
      })
      .addCase(fetchListStoreForUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchListStoreForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.informationStores = action.payload.listStore;
        if (action.payload.role === "admin") {
          state.selectStore.storeId = "admin";
          state.selectStore.storeName = "admin";
          return;
        }
        const {store_id, store_name} = action.payload.listStore[0]|| {};
        state.cameraSelected = action.payload.listcameraCodes[0] || "";
        state.listcaermaCodes = action.payload.listcameraCodes || [];
        state.selectStore.storeId = store_id || "";
        state.selectStore.storeName = store_name || "";

      })
      .addCase(fetchListStoreForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});
export const { setSelectStore } = userSlice.actions;
export default userSlice.reducer;
