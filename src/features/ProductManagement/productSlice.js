import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../services/product.api'; 

// Khởi tạo trạng thái ban đầu cho các bộ lọc
const initialState = {
    products: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false, 
    error: null,
    
    // TRẠNG THÁI LỌC
    filters: {
        store_id: 'STORE001',             
        status: 'all',      
        categories: '',     
        id: ''          
    }
};

// =========================================================
// ASYNC THUNK
// =========================================================
export const fetchProducts = createAsyncThunk(    
    'product/fetchProducts',
    async (params, thunkAPI) => {
        try {
            const response = await getProducts(params);
            return response; 
        } catch (error) {
            return thunkAPI.rejectWithValue({ 
                message: 'Failed to fetch products', 
                error: error.message 
            });
        }
    }
);


// =========================================================
// SLICE
// =========================================================
const productSlice = createSlice({
    name: 'product',
    initialState,

    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            // ------------------------------------
            // Khi API đang chờ (PENDING)
            // ------------------------------------
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true; 
                state.error = null;
            })
            // ------------------------------------
            // Khi API thành công (FULFILLED)
            // ------------------------------------
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log('Product list fetched successfully.');
                const payload = action.payload;
                
                state.products = payload.data || [];
                if (payload.pagination) {
                    state.totalItems = payload.pagination.totalItems;
                }
                else {
                    state.totalItems = state.products.length;
                }
                state.loading = false;
            })
            // ------------------------------------
            // Khi API thất bại (REJECTED)
            // ------------------------------------
            .addCase(fetchProducts.rejected, (state, action) => {
                console.error('Failed to fetch products:', action.payload.error);
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Lỗi không xác định.';
                state.products = []; 
            });
    },
}); 

export const { setFilters, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;