import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// UPDATE LANGUAGE API
export const updateLanguage = createAsyncThunk(
  "language/updateLanguage",
  async ({ userId, language }, { rejectWithValue }) => {
    try {
      // Validate userId before making API call
      if (!userId) {
        return rejectWithValue({ 
          message: "User not authenticated. Please login first.",
          status: 401 
        });
      }

      const token = localStorage.getItem("token");

      const response = await api.put(
        `/profile/user/update/${userId}/language`,
        {
          language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;

    } catch (error) {

      return rejectWithValue(error.response?.data);
    }
  }
);

const languageSlice = createSlice({
  name: "language",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(updateLanguage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateLanguage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })

      .addCase(updateLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default languageSlice.reducer;