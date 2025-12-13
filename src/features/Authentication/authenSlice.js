import { createSlice } from "@reduxjs/toolkit";
import {
  fecthGetToken,
  fecthLogin,
  fecthSignup,
  fecthLogout
} from "./authen.thunk";

const authenSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    account: null,
    isLoading: false,
    isLogin: null,        
    isChecking: true,      

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fecthGetToken.pending, (state) => {
        state.isChecking = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fecthGetToken.fulfilled, (state, action) => {
        state.isChecking = false;
        state.isLoading = false;
        state.isLogin = true;
        state.user = action.payload.user;
        state.account = action.payload.account;
      })
      .addCase(fecthGetToken.rejected, (state, action) => {
        state.isChecking = false;
        state.isLoading = false;
        state.isLogin = false;
        state.error = action.payload;
      })
      .addCase(fecthLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fecthLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.user = action.payload.user;
        state.account = action.payload.account;
      })
      .addCase(fecthLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.error = action.payload;
      })
      .addCase(fecthSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.account = action.payload.account;
      })
      .addCase(fecthSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fecthLogout.fulfilled, (state) => {
        state.user = null;
        state.account = null;
        state.isLogin = false;
      });
  },
});

export default authenSlice.reducer;
