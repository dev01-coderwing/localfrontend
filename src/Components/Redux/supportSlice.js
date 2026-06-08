// Redux/supportSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const ContactSupportApi = createAsyncThunk(
    "support/contact",
    async ({ subject, message }, { rejectWithValue }) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            const token = user?.token;

            const response = await api.post(
                `/support/contact`,
                {
                    fullName: user?.user?.name,
                    email: user?.user?.email,
                    subject,
                    message,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data || "Something went wrong"
            );
        }
    }
);

export const SubmitFeedbackApi = createAsyncThunk(
    "feedback/submit",
    async ({ category, message, rating }, { rejectWithValue }) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            const token = user?.token;

            const response = await api.post(
                `/feedback/submit`,
                {
                    category,
                    message,
                    rating,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data || "Something went wrong"
            );
        }
    }
);

// Get All FAQ
export const GetFaqsearchApi = createAsyncThunk(
    "faq/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/faq`);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data || "Something went wrong"
            );
        }
    }
);

// Search + Category Filter FAQ
export const GetFaqApi = createAsyncThunk(
    "faq/search",
    async ({ search = "", category = "" }, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `/faq?search=${search}&category=${category}`
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data || "Something went wrong"
            );
        }
    }
);

// Get FAQ Categories
export const GetFaqCategoriesApi = createAsyncThunk(
    "faq/categories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/faq/categories`);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data || "Something went wrong"
            );
        }
    }
);

const supportSlice = createSlice({
    name: "support",

    initialState: {
        loading: false,
        success: false,
        error: null,

        faqs: [],
        faqCategories: [],
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // Contact Support
            .addCase(ContactSupportApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(ContactSupportApi.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })

            .addCase(ContactSupportApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Submit Feedback
            .addCase(SubmitFeedbackApi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(SubmitFeedbackApi.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })

            .addCase(SubmitFeedbackApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All FAQ
            .addCase(GetFaqsearchApi.pending, (state) => {
                state.loading = true;
            })

            .addCase(GetFaqsearchApi.fulfilled, (state, action) => {
                state.loading = false;
                state.faqs = action.payload?.data || [];
            })

            .addCase(GetFaqsearchApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Search FAQ
            .addCase(GetFaqApi.pending, (state) => {
                state.loading = true;
            })

            .addCase(GetFaqApi.fulfilled, (state, action) => {
                state.loading = false;
                state.faqs = action.payload?.data || [];
            })

            .addCase(GetFaqApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // FAQ Categories
            .addCase(GetFaqCategoriesApi.pending, (state) => {
                state.loading = true;
            })

            .addCase(GetFaqCategoriesApi.fulfilled, (state, action) => {
                state.loading = false;
                state.faqCategories = action.payload?.data || [];
            })

            .addCase(GetFaqCategoriesApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default supportSlice.reducer;