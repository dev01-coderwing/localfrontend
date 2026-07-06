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

const meonSlice = createSlice({
  name: "meon",

  initialState: {
    loading: false,
    balance: null,
    error: null,
    transactions: [],
  },

  reducers: {},

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

// TODO(backend): Daily Login reward endpoint does not exist yet.
// Requested contract (to confirm with backend team):
//   POST /meons/daily-reward/claim
//     body:     { planName: string }               // e.g. "Privilège"
//     response: { data: { meons: number, amount: number, claimedAt: string } }
//   Server should be the source of truth for "already claimed today" (e.g.
//   reject with 409 / a specific error code if the user already claimed),
//   since the frontend no longer tracks this via localStorage.
// Until this route exists in the backend, calls to this thunk will 404 and
// useDailyMeonsReward will simply stay in a non-eligible state.
export const claimDailyMeonsRewardThunk = createAsyncThunk(
  "meons/claimDailyReward",

  async (rewardData, { rejectWithValue }) => {
    try {
      const response = await api.post("/meons/daily-reward/claim", rewardData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export default meonSlice.reducer;
