import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/";
export const getChatRequests = createAsyncThunk(
    "chat/getRequests",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            // Try /chat/conversations endpoint (seems to match your data structure)
            const response = await api.get(
                "/chat/conversations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);
export const acceptChatRequest = createAsyncThunk(
    "chat/acceptRequest",
    async (requestId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                `/chat/requests/${requestId}/accept`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return requestId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to accept request"
            );
        }
    }
);

export const declineChatRequest = createAsyncThunk(
    "chat/declineRequest",
    async (requestId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                `/chat/requests/${requestId}/decline`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return requestId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to decline request"
            );
        }
    }
);
export const getConversations = createAsyncThunk(
    "chat/getConversations",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get(
                "/chat/conversations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);
export const muteConversation = createAsyncThunk(
    "chat/muteConversation",
    async ({ conversationId, isMuted }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                `/chat/conversations/${conversationId}/mute`,
                { isMuted },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return { conversationId, isMuted };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to mute conversation"
            );
        }
    }
);

export const blockUser = createAsyncThunk(
    "chat/blockUser",
    async (blockedId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/chat/user/block",
                { blockedId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return blockedId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to block user"
            );
        }
    }
);


export const reportUser = createAsyncThunk(
    "chat/reportUser",
    async ({ reportedId, reason }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/chat/user/report",
                {
                    reportedId,
                    reason,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to report user"
            );
        }
    }
);
const chatRequestSlice = createSlice({
    name: "chatRequests",
    initialState: {
        requests: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChatRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChatRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload;
            })
            .addCase(getChatRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(acceptChatRequest.fulfilled, (state, action) => {
                state.requests = state.requests.filter(
                    (item) => item.id !== action.payload
                );
            })

            .addCase(declineChatRequest.fulfilled, (state, action) => {
                state.requests = state.requests.filter(
                    (item) => item.id !== action.payload
                );
            })

            .addCase(muteConversation.fulfilled, (state, action) => {
                const { conversationId, isMuted } = action.payload;

                const conversation = state.conversations?.find(
                    (item) => item.id === conversationId
                );

                if (conversation) {
                    conversation.isMuted = isMuted;
                }
            })

            .addCase(blockUser.fulfilled, (state, action) => {
                state.conversations = state.conversations.filter(
                    (item) => item.userId !== action.payload
                );
            })

            .addCase(reportUser.fulfilled, (state) => {
                state.error = null;
            })
    },
});

export default chatRequestSlice.reducer;