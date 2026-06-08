import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const submitEmojiRushResultThunk = createAsyncThunk(
  "game/submitEmojiRushResult",

  async (resultData, { rejectWithValue }) => {
    try {
      const response = await api.post("/game/emoji-rush/result", resultData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export const submitSoloGameResultThunk = createAsyncThunk(
  "game/submitSoloResult",

  async (gameData, { rejectWithValue }) => {
    try {
      const response = await api.post("/game/solo/result", gameData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

const gameSlice = createSlice({
  name: "game",

  initialState: {
    loading: false,
    success: false,
    error: null,
    resultData: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(submitSoloGameResultThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(submitSoloGameResultThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.resultData = action.payload;
      })

      .addCase(submitSoloGameResultThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(submitEmojiRushResultThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(submitEmojiRushResultThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.resultData = action.payload;
      })

      .addCase(submitEmojiRushResultThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gameSlice.reducer;
