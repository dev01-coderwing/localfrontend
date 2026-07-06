// src/redux/slices/bannerSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeasonalBanners = createAsyncThunk(
  "banner/getSeasonalBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL?.trim()}/banner/seasonal`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getSeasonalBanners.pending, (state) => {
        state.loading = true;
      })

      .addCase(getSeasonalBanners.fulfilled, (state, action) => {
        state.loading = false;

        // API ke according change kar lena
        state.banners =
          action.payload.data ||
          action.payload.banners ||
          action.payload;
      })

      .addCase(getSeasonalBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bannerSlice.reducer;