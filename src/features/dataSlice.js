import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('https://66cc14004290b1c4f19bd1fc.mockapi.io/data');
  return response.json();
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    removeItem: (state, action) => {
      state.data = state.data.filter((item, index) => index !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default dataSlice.reducer;

export const { removeItem } = dataSlice.actions;

export const selectData = (state) => state.data.data;
export const selectLoading = (state) => state.data.loading;
export const selectError = (state) => state.data.error;
