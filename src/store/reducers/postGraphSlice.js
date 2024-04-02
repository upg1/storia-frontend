import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  graphData: null,
  isLoading: false,
  error: null,
};

const fetchPostGraphData = createAsyncThunk(
  'posts/fetchPostGraphData',
  async () => {
    try {
      const response = await fetch('http://localhost:3333/influencers');
      if (!response.ok) {
        throw new Error('Failed to fetch graph data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const postGraphSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setGraphData: (state, action) => {
      state.graphData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostGraphData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostGraphData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.graphData = action.payload;
      })
      .addCase(fetchPostGraphData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setGraphData } = postGraphSlice.actions;
export {fetchPostGraphData}
export default postGraphSlice.reducer;