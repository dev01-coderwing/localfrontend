import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api"; // tumhara axios instance

export const submitEmojiRushResultThunk = createAsyncThunk(
  "game/submitEmojiRushResult",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/game/emoji-rush/result",
        payload
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
    resultData: null,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(submitEmojiRushResultThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(submitEmojiRushResultThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.resultData = action.payload;
      })

      .addCase(submitEmojiRushResultThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gameSlice.reducer;