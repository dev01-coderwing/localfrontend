import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const updateBasicInfoThunk = createAsyncThunk(
  "onboarding/updateBasicInfo",

  async (formData, { rejectWithValue }) => {

    try {

      const res = await api.put(
        "/onboarding/basic-info",
        formData
      );

      return res.data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data || "Error"
      );

    }
  }
);

export const updateLocationThunk = createAsyncThunk(
  "onboarding/updateLocation",

  async (formData, { rejectWithValue }) => {

    try {

      const res = await api.put(
        "/onboarding/location",
        formData
      );

      return res.data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data || "Error"
      );

    }
  }
);


export const updateStoryThunk = createAsyncThunk(
  "onboarding/updateStory",

  async (formData, { rejectWithValue }) => {

    try {

      const res = await api.put(
        "/onboarding/story",
        formData
      );

      return res.data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data || "Error"
      );

    }
  }
);

export const uploadPhotosThunk = createAsyncThunk(
  "onboarding/uploadPhotos",

  async (formData, { rejectWithValue }) => {

    try {

      const res = await api.post(
        "/onboarding/photos",
        formData
      );

      return res.data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data || "Error"
      );

    }
  }
);

export const updateAstrologyThunk = createAsyncThunk(
  "onboarding/updateAstrology",

  async (astroData, { rejectWithValue }) => {

    try {

      const res = await api.put(
        "/onboarding/astrology",
        astroData
      );

      return res.data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data || "Error"
      );

    }
  }
);

export const updateReligionThunk = createAsyncThunk(
  "onboarding/updateReligion",

  async (religionData, { rejectWithValue }) => {

    try {

      const res = await api.put(
        "/onboarding/religion",
        religionData
      );

      return res.data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data || "Error"
      );

    }
  }
);


const onboardingSlice = createSlice({
  name: "onboarding",

  initialState: {
    loading: false,
    success: false,
    error: null,

    location: null,
    basicInfo: null,
    story: null,
    photos: null,
    religion: null,
    astrology: null,
  },

  reducers: {},
  extraReducers: (builder) => {

    builder

      // BASIC INFO
      .addCase(updateBasicInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateBasicInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.basicInfo = action.payload;
      })

      .addCase(updateBasicInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      // LOCATION
      .addCase(updateLocationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateLocationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.location = action.payload;
      })

      .addCase(updateLocationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      // STORY
      .addCase(updateStoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateStoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.story = action.payload;
      })

      .addCase(updateStoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      // PHOTOS
      .addCase(uploadPhotosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(uploadPhotosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.photos = action.payload;
      })

      .addCase(uploadPhotosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      // RELIGION
      .addCase(updateReligionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateReligionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.religion = action.payload;
      })

      .addCase(updateReligionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      // ASTROLOGY
      .addCase(updateAstrologyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateAstrologyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.astrology = action.payload;
      })

      .addCase(updateAstrologyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
});

export default onboardingSlice.reducer;
