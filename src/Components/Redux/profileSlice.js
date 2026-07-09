import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/profile/user/${userId}`, {
        headers: {
          "API-KEY": "iameetyou",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch profile"
      );
    }
  }
);
export const getPsychologicalProfile = createAsyncThunk(
  "profile/getPsychologicalProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/profile/psychological", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch psychological profile"
      );
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        `/profile/user/update/${userId}`,
        payload,
        {
          headers: {
            "API-KEY": "iameetyou",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update profile"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
    psychological: null,
    psychologicalLoading: false,
    psychologicalError: null,

    updateLoading: false,
  updateSuccess: false,
  updateError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPsychologicalProfile.pending, (state) => {
        state.psychologicalLoading = true;
      })
      .addCase(getPsychologicalProfile.fulfilled, (state, action) => {
        state.psychologicalLoading = false;
        state.psychological = action.payload?.data || action.payload;
      })
      .addCase(getPsychologicalProfile.rejected, (state, action) => {
        state.psychologicalLoading = false;
        state.psychologicalError = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
  state.updateLoading = true;
  state.updateSuccess = false;
  state.updateError = null;
})

.addCase(updateUserProfile.fulfilled, (state, action) => {
  state.updateLoading = false;
  state.updateSuccess = true;

  // agar backend updated profile return karta hai
  state.profile = action.payload?.data || action.payload;
})

.addCase(updateUserProfile.rejected, (state, action) => {
  state.updateLoading = false;
  state.updateError = action.payload;
});
  },
});

export default profileSlice.reducer;