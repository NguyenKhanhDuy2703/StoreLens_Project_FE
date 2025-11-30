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

    // Trạng thái auth
    isLogin: null,         // null = chưa biết, true = login, false = chưa login
    isChecking: true,      // đang kiểm tra token

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // 🔹 Kiểm tra token
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

      // 🔹 Login
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

      // 🔹 Sign up
      .addCase(fecthSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.account = action.payload.account;
      })
      .addCase(fecthSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Logout
      .addCase(fecthLogout.fulfilled, (state) => {
        state.user = null;
        state.account = null;
        state.isLogin = false;
      });
  },
});

export default authenSlice.reducer;
