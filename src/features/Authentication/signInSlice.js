import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginAPI } from "../../services/login.api";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ account, password }, thunkAPI) => {
    try {
      const response = await loginAPI({ account, password });
      return response;
    } catch (error) {
      const errMsg = error?.response?.data?.message || error?.message || "Login failed";
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
