import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";
export const getProfiles = createAsyncThunk(
    "discovery/getProfiles",
    async (_, { rejectWithValue }) => {
        try {
            console.log("API Calling...");

            const token = localStorage.getItem("token");

            const response = await api.get("/discovery/profiles", {
                headers: {
                    "API-KEY": "iameetyou",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("API SUCCESS", response.data);

            return response.data.data.profiles;
        } catch (error) {
            console.log("API ERROR", error);
            console.log("API ERROR RESPONSE", error.response);

            return rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

const discoverySlice = createSlice({
    name: "discovery",
    initialState: {
        profiles: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getProfiles.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfiles.fulfilled, (state, action) => {
                state.loading = false;
                state.profiles = action.payload;
            })
            .addCase(getProfiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default discoverySlice.reducer;