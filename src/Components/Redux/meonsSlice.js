import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getMeonBalanceThunk = createAsyncThunk(
  "meon/getBalance",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/meons/balance");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export const spendMeonsThunk = createAsyncThunk(
  "meons/spendMeons",

  async (spendData, { rejectWithValue }) => {
    try {
      const response = await api.post("/meons/spend", spendData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export const getTransactionsThunk = createAsyncThunk(
  "meons/getTransactions",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/meons/transactions");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const meonSlice = createSlice({
  name: "meon",

  initialState: {
    loading: false,
    balance: null,
    error: null,
    transactions: [],
  },

  reducers: {
    // Applies a newBalance value (e.g. from a login/session-start
    // dailyCheckIn response) directly to the store, without refetching.
    setMeonsBalance: (state, action) => {
      state.balance = {
        ...state.balance,
        data: {
          ...state.balance?.data,
          meons: action.payload,
        },
      };
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getMeonBalanceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMeonBalanceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })

      .addCase(getMeonBalanceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SPEND MEONS
      .addCase(spendMeonsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(spendMeonsThunk.fulfilled, (state, action) => {
        state.loading = false;

        // UPDATE BALANCE IN UI INSTANTLY
        if (state.balance?.data?.meons) {
          state.balance.data.meons -= action.meta.arg.amount;
        }
      })

      .addCase(spendMeonsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET TRANSACTIONS
      .addCase(getTransactionsThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTransactionsThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.transactions = action.payload;
      })

      .addCase(getTransactionsThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { setMeonsBalance } = meonSlice.actions;

export default meonSlice.reducer;
