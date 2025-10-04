import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import { getPeopleEntrened } from '../../services/dashboard.api';
//  call api 
export const fetchPeopleEntrened = createAsyncThunk(    
    'dashboard/fetchPeopleEntrened',
    async ({store_id, range}, thunkAPI) => {
        try {
            
            const response = await getPeopleEntrened(store_id, range);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

const dashboardSlice = createSlice({
  name: 'dashboard',

  initialState: 
  {
    peopleEntrened: 0,
    loading : false,
   
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPeopleEntrened.pending, (state) => {
        console.log('Fetching people entrened...');
        state.loading = true
      })
      .addCase(fetchPeopleEntrened.fulfilled, (state, action) => {
        console.log(action.payload)
        state.peopleEntrened = action.payload.entered;
        state.loading = false
      })
      .addCase(fetchPeopleEntrened.rejected, (state, action) => {
        console.error('Failed to fetch people entrened:', action.payload.error);
        state.loading = false
      });
  },
}); 
export default dashboardSlice.reducer;
