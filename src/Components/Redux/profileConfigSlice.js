import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

// Placeholder integration point: the backend does not expose a profile
// configuration endpoint yet. Once it does, it should respond with:
// { genderOptions: string[], lookingForOptions: string[], maxPhotos: number }
// Until then this thunk fails silently and the slice below falls back to
// FALLBACK_CONFIG so screens depending on it keep working.
export const getProfileConfig = createAsyncThunk(
  "profileConfig/getProfileConfig",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile/config");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch profile configuration"
      );
    }
  }
);

// Used only until the /profile/config endpoint above exists (or if it errors),
// so dropdowns/limits still render something sensible in the meantime.
const FALLBACK_CONFIG = {
  genderOptions: ["Female", "Male", "Non-binary", "Prefer not to say"],
  lookingForOptions: [
    "Long-term",
    "Friends first",
    "Short-term",
    "Open dating",
    "Still figuring it out",
  ],
  maxPhotos: 5,
};

const profileConfigSlice = createSlice({
  name: "profileConfig",
  initialState: {
    genderOptions: FALLBACK_CONFIG.genderOptions,
    lookingForOptions: FALLBACK_CONFIG.lookingForOptions,
    maxPhotos: FALLBACK_CONFIG.maxPhotos,
    loading: false,
    loaded: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        const data = action.payload?.data ?? action.payload ?? {};
        state.genderOptions = data.genderOptions?.length
          ? data.genderOptions
          : FALLBACK_CONFIG.genderOptions;
        state.lookingForOptions = data.lookingForOptions?.length
          ? data.lookingForOptions
          : FALLBACK_CONFIG.lookingForOptions;
        state.maxPhotos = data.maxPhotos ?? FALLBACK_CONFIG.maxPhotos;
      })
      .addCase(getProfileConfig.rejected, (state, action) => {
        // Endpoint likely doesn't exist yet on the backend - keep the
        // fallback values already in state and just record the error.
        state.loading = false;
        state.loaded = true;
        state.error = action.payload;
      });
  },
});

export default profileConfigSlice.reducer;
