import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// =====================
// Upload Selfie
// =====================
export const uploadSelfie = createAsyncThunk(
  "verify/uploadSelfie",
  async (file, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("selfie", file);

      const response = await api.post(
        "/verify/take-selfie",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return {
        data: response.data,
        file,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// =====================
// Detect Face
// =====================
export const detectFace = createAsyncThunk(
  "verify/detectFace",
  async (file, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("selfie", file);

      const response = await api.post(
        "/verify/detect-face",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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

// =====================
// Verification Status
// =====================
export const getVerificationStatus = createAsyncThunk(
  "verify/getVerificationStatus",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/verify/status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

const initialState = {
  loading: false,
  success: false,
  selfieData: null,
  selfieFile: null,

  faceLoading: false,
  faceSuccess: false,
  faceData: null,

  statusLoading: false,
  statusSuccess: false,
  statusData: null,

  error: null,
};

const verifySlice = createSlice({
  name: "verify",
  initialState,

  reducers: {
    resetVerifyState: (state) => {
      state.loading = false;
      state.success = false;
      state.selfieData = null;
      state.selfieFile = null;

      state.faceLoading = false;
      state.faceSuccess = false;
      state.faceData = null;

      state.statusLoading = false;
      state.statusSuccess = false;
      state.statusData = null;

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Upload Selfie
      .addCase(uploadSelfie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadSelfie.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.selfieData = action.payload.data;
        state.selfieFile = action.payload.file;
      })
      .addCase(uploadSelfie.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Detect Face
      .addCase(detectFace.pending, (state) => {
        state.faceLoading = true;
        state.error = null;
      })
      .addCase(detectFace.fulfilled, (state, action) => {
        state.faceLoading = false;
        state.faceSuccess = true;
        state.faceData = action.payload;
      })
      .addCase(detectFace.rejected, (state, action) => {
        state.faceLoading = false;
        state.faceSuccess = false;
        state.error = action.payload;
      })

      // Status
      .addCase(getVerificationStatus.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })
      .addCase(
        getVerificationStatus.fulfilled,
        (state, action) => {
          state.statusLoading = false;
          state.statusSuccess = true;
          state.statusData = action.payload;
        }
      )
      .addCase(
        getVerificationStatus.rejected,
        (state, action) => {
          state.statusLoading = false;
          state.statusSuccess = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetVerifyState } =
  verifySlice.actions;

export default verifySlice.reducer;