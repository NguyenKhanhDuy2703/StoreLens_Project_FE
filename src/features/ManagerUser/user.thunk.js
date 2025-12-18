import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, banUser, activateUser , getListStoreForUser } from "../../services/user.api";

// Lấy danh sách user
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await getAllUsers();
      return res.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Ban user
export const fetchBanUser = createAsyncThunk(
  "user/fetchBanUser",
  async (userId, thunkAPI) => {
    try {
      const res = await banUser(userId);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Kích hoạt user
export const fetchActivateUser = createAsyncThunk(
  "user/fetchActivateUser",
  async (userId, thunkAPI) => {
    try {
      const res = await activateUser(userId);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchListStoreForUser = createAsyncThunk(
  "user/fetchListStoreForUser",
  async ({email , role}, thunkAPI) => {  
    try {
      const res = await getListStoreForUser({email,role});
      return  res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
