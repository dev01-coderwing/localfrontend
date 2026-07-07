import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api"; // apna axios instance

export const applyFilterThunk = createAsyncThunk(
  "filter/apply",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.put("/filter", payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Something went wrong",
        }
      );
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
  appliedFilter: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyFilterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyFilterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.appliedFilter =
          action.payload?.appliedFilter || action.payload?.filter || action.meta.arg;
      })
      .addCase(applyFilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default filterSlice.reducer;