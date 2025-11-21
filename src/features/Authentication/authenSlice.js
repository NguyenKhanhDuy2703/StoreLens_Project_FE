import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fecthGetToken, fecthLogin, fecthSignup, fecthLogout } from "./authen.thunk";
const authenSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    account: "",
    isLoading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthGetToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fecthGetToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.account = action.payload.account;
      })
      .addCase(fecthGetToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fecthLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fecthLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.account = action.payload.account;
      })
      .addCase(fecthLogin.rejected, (state, action) => {
        console.log("Login rejected with error:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fecthSignup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fecthSignup.fulfilled, (state, action) => {
        state.isLoading = false;  
        state.user = action.payload.user;
        state.account = action.payload.account;
      }
      )   
      .addCase(fecthSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
      )
      .addCase(fecthLogout.pending, (state) => {
        state.isLoading = true;   
        state.error = null;
      })
      .addCase(fecthLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = "";
        state.account = "";
      })
      .addCase(fecthLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
  });

export default authenSlice.reducer;
