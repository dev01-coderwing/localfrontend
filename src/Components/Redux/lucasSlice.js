import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getLucasHistory = createAsyncThunk(
  "lucas/getHistory",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/lucas/lab/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const lucasSlice = createSlice({
  name: "lucas",
  initialState: {
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getLucasHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLucasHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.data || action.payload;
      })
      .addCase(getLucasHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default lucasSlice.reducer;