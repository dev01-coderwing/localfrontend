import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/";
export const getChatRequests = createAsyncThunk(
    "chat/getRequests",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            // Try /chat/conversations endpoint (seems to match your data structure)
            const response = await api.get(
                "/chat/requests",
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


export const getSidebarConversations = createAsyncThunk(
    "chat/getSidebarConversations",
    async (userId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get(
                `/chat/users/${userId}/conversations`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch conversations"
            );
        }
    }
);

export const getConversationMessages = createAsyncThunk(
    "chat/getConversationMessages",
    async (conversationId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get(
                `/chat/conversations/${conversationId}/messages`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch messages"
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

export const sendMessageApi = createAsyncThunk(
    "chat/sendMessage",
    async ({ conversationId, content }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                `/chat/conversations/${conversationId}/messages`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to send message"
            );
        }
    }
);
const chatRequestSlice = createSlice({
    name: "chatRequests",
    initialState: {
        requests: [],
        sidebarConversations: [],
        selectedConversation: null,
        onlineUsers: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetChatState: (state) => {
            state.requests = [];
            state.sidebarConversations = [];
            state.selectedConversation = null;
            state.onlineUsers = [];
            state.loading = false;
            state.error = null;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = Array.isArray(action.payload)
                ? action.payload
                : [];
        },
        addOnlineUser: (state, action) => {
            const userId = action.payload;
            if (userId == null) return;
            const alreadyOnline = state.onlineUsers.some(
                (id) => String(id) === String(userId)
            );
            if (!alreadyOnline) {
                state.onlineUsers.push(userId);
            }
        },
        removeOnlineUser: (state, action) => {
            const userId = action.payload;
            if (userId == null) return;
            state.onlineUsers = state.onlineUsers.filter(
                (id) => String(id) !== String(userId)
            );
        },
    },
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
                    (item) => item.id !== action.payload && item._id !== action.payload
                );
            })

            .addCase(declineChatRequest.fulfilled, (state, action) => {
                state.requests = state.requests.filter(
                    (item) => item.id !== action.payload && item._id !== action.payload
                );
            })

            .addCase(muteConversation.fulfilled, (state, action) => {
                const { conversationId, isMuted } = action.payload;

                const conversation = state.conversations?.find(
                    (item) => item.conversationId === conversationId
                );

                if (conversation) {
                    conversation.isMuted = isMuted;
                }
            })

            .addCase(blockUser.fulfilled, (state, action) => {
                state.conversations = state.conversations.filter(
                    (item) => item.otherUser?.id !== action.payload
                );
            })

            .addCase(reportUser.fulfilled, (state) => {
                state.error = null;
            })

            .addCase(sendMessageApi.fulfilled, (state, action) => {
                console.log("Message Sent", action.payload);
            })

            .addCase(getSidebarConversations.pending, (state) => {
                state.loading = true;
            })

            .addCase(getSidebarConversations.fulfilled, (state, action) => {
                state.loading = false;
                state.sidebarConversations = action.payload;
            })

            .addCase(getSidebarConversations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getConversationMessages.fulfilled, (state, action) => {
                state.selectedConversation = action.payload;
            }
            )
    },
});

export const {
    resetChatState,
    setOnlineUsers,
} = chatRequestSlice.actions;
export default chatRequestSlice.reducer;
