import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
export const getProfiles = createAsyncThunk(
  "discovery/getProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/discovery/profiles", {
        headers: {
          "API-KEY": "iameetyou",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data.profiles;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const sendRose = createAsyncThunk(
  "discovery/sendRose",
  async (targetUserId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/discovery/rose",
        { targetUserId },
        {
          headers: {
            "API-KEY": "iameetyou",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
const discoverySlice = createSlice({
  name: "discovery",
  initialState: {
    profiles: [],
    loading: false,
    error: null,

    roseLoading: false,
    roseSuccess: false,
    roseError: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(getProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send Rose
.addCase(sendRose.pending, (state) => {
    state.roseLoading = true;
    state.roseSuccess = false;
    state.roseError = null;
})
.addCase(sendRose.fulfilled, (state) => {
    state.roseLoading = false;
    state.roseSuccess = true;
})
.addCase(sendRose.rejected, (state, action) => {
    state.roseLoading = false;
    state.roseError = action.payload;
})
  },
});

export default discoverySlice.reducer;
