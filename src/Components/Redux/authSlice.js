import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { disconnectSocket } from "../../socket";
import { resetChatState } from "./chatRequestSlice";

// Initialize user from localStorage
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { rejectWithValue }) => {
    try {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (isLoggedIn === "true" && userData && token) {
        const user = JSON.parse(userData);
        return { user, token };
      }

      return null;
    } catch (error) {
      console.error("Error initializing auth:", error);
      return rejectWithValue("Failed to initialize authentication");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/user/register",
        {
          email,
          role: "user",
        },
        {
          headers: {
            "API-KEY": "iameetyou",
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);



export const setverfiy = createAsyncThunk(
  "auth/setverify",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/user/verify-otp",
        {
          email,
          otp, // important
        },
        {
          headers: {
            "API-KEY": "iameetyou",
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const setPassword = createAsyncThunk(
  "auth/setPassword",
  async ({ email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/user/set-password",
        {
          email,
          password, // ✅ important
          confirmPassword, // ✅ important
        },
        {
          headers: {
            "API-KEY": "iameetyou",
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "API-KEY": "iameetyou",
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const sessionStartThunk = createAsyncThunk(
  "auth/sessionStart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/session-start");

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/forgot-password/request-password-reset",
        { email },
        {
          headers: {
            "API-KEY": "iameetyou",
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const LogoutUser = createAsyncThunk(
  "auth/LogoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Optional API call
      // await api.post("/user/logout");

      disconnectSocket();
      dispatch(resetChatState());

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    success: false,
    error: null,
    user: null, // Will be set by initializeAuth
    token: null, // Will be set by initializeAuth

    forgotLoading: false,
    forgotSuccess: false,
    forgotError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null; // 🔥 reset error
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //setverfiy

    builder
      .addCase(setverfiy.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null; // 🔥 reset error
      })
      .addCase(setverfiy.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(setverfiy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //setPassword

    builder
      .addCase(setPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null; // 🔥 reset error
      })
      .addCase(setPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(setPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //LoginUser
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null; // 🔥 reset error
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // ✅ only user object store karo
        state.user = action.payload.user;

        // ✅ token alag store karo
        state.token = action.payload.token;

        // ✅ localStorage save
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("isLoggedIn", "true");
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // 🔥 set error from payload      
      });

    //LogoutUser
    builder
      .addCase(LogoutUser.pending, (state) => {
        state.loading = true;
        state.error = null; // 🔥 reset error
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.loading = false;
        state.success = false; // ✅ reset success on logout
        state.user = null; // ✅ clear user data
        state.token = null; // ✅ clear token
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; //  set error from payload
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.forgotLoading = true;
        state.forgotError = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotLoading = false;
        state.forgotSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotLoading = false;
        state.forgotError = action.payload;
      });

    // Initialize Auth
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          // Store token in Redux state if needed for other components
          state.token = action.payload.token;
          state.success = true;
        }
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        console.error("Auth initialization failed:", action.payload);
      });
  },
});

export default authSlice.reducer;