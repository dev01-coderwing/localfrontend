import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
export const submitBubblePopResultThunk = createAsyncThunk(
  "game/submitBubblePopResult",
  async (result, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/game/bubble-pop/result",
        {
          result, // WIN or LOSS
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState: {
    loading: false,
    bubblePopResult: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitBubblePopResultThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitBubblePopResultThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.bubblePopResult = action.payload;
      })
      .addCase(submitBubblePopResultThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gameSlice.reducer;
