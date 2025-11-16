import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {login , logout ,getToken , signup  } from "../../services/authen.api"
export const fecthGetToken = createAsyncThunk(
  "auth/getToken",
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to get token");
    }
  }
);
export  const fecthLogin = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await login ();
      return response.data;
    }
    catch (error) {
      return thunkAPI.rejectWithValue("Failed to login");
    }
  }
);
export  const fecthSignup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const response = await signup ();
      return response.data;
    }
    catch (error) {
      return thunkAPI.rejectWithValue("Failed to signup");
    }
  }
);
export  const fecthLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logout ();
      return response.data;
    }
    catch (error) {
      return thunkAPI.rejectWithValue("Failed to logout");
    }
  }
);
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
  });

export default authenSlice.reducer;
