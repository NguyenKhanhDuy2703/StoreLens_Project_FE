import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategories,
    getProducts,
} from "../../services/product.api";
 export const fetchGetCategories = createAsyncThunk(
    "productManagement/fetchGetCategories",
    async ({ storeId, thunkAPI }) => {
      try {
        const response = await getCategories(storeId);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch categories");
      }
    }
 )
 export const fetchGetProducts = createAsyncThunk(
    "productManagement/fetchGetProducts",
    async ({ storeId, page, limit, thunkAPI }) => {
        try {
            const response = await getProducts({storeId, page, limit});
           
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch products");
        }
    }
 )
