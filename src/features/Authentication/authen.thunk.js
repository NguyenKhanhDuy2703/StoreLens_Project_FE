import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, getToken, signup } from "../../services/authen.api";
export const fecthGetToken = createAsyncThunk(
  "auth/getToken",
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      return (await token).data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message||"Failed to get token");
    }
  }
);
export const fecthLogin = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
   const response = await login(data); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue( error?.message);
    }
  }
);
export const fecthSignup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const response = await signup(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to signup");
    }
  }
);
export const fecthLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logout();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message|| "Failed to logout");
    }
  }
);
