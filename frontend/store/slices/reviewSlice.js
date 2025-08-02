import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reviewAPI } from '../../services/api';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await reviewAPI.getReviews(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }
);

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await reviewAPI.createReview(reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create review');
    }
  }
);

const initialState = {
  reviews: [],
  loading: false,
  creating: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.pagination = initialState.pagination;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.data.reviews;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReview.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.creating = false;
        state.reviews.unshift(action.payload.data.review);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviews, clearError } = reviewSlice.actions;

export default reviewSlice.reducer; 