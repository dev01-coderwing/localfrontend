import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// GET QUESTIONS
export const getCompatibilityQuestionsThunk = createAsyncThunk(
  "compatibility/getQuestions",
  async (_, thunkAPI) => {
    try {
      // Récupération de la langue stockée (en minuscule pour correspondre à ta base)
      const lang = localStorage.getItem("i18nextLng") || "fr"; 
      
      const response = await api.get(`/compatibility/questions?lang=${lang}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// SUBMIT ANSWER
export const submitCompatibilityAnswerThunk = createAsyncThunk(
  "compatibility/submitAnswer",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/compatibility/submit", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const compatibilitySlice = createSlice({
  name: "compatibility",
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET QUESTIONS
      .addCase(getCompatibilityQuestionsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompatibilityQuestionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.data;
      })
      .addCase(getCompatibilityQuestionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // SUBMIT ANSWER
      .addCase(submitCompatibilityAnswerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitCompatibilityAnswerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitCompatibilityAnswerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default compatibilitySlice.reducer;
