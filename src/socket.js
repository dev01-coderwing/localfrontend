import { io } from "socket.io-client";

let socket = null;
let currentToken = null;
let currentUserRoomId = null;
let currentConversationRoomId = null;

const SOCKET_URL = (() => {
  const configuredSocketUrl = import.meta.env.VITE_SOCKET_URL?.trim();
  if (configuredSocketUrl) {
    return configuredSocketUrl;
  }

  const apiUrl = import.meta.env.VITE_API_URL?.trim();
  if (!apiUrl) {
    return null;
  }

  try {
    const parsed = new URL(apiUrl);
    return `${parsed.protocol}//${parsed.host}`;
  } catch (err) {
    return apiUrl.replace(/\/api\/.*/, "");
  }
})();

const EVENTS = {
  JOIN_USER_ROOM: "join-user-room",
  JOIN_CONVERSATION_ROOM: "join-conversation-room",
  LEAVE_CONVERSATION_ROOM: "leave-conversation-room",
  USER_ONLINE: "user-online",
  USER_OFFLINE: "user-offline",
  ACTIVE_USERS: "active-users",
};

const createSocketInstance = (token) => {
  if (!SOCKET_URL) {
    console.error("VITE_API_URL is not defined. Socket cannot connect.");
    return null;
  }

  if (!token) {
    console.error("Socket token is required to connect.");
    return null;
  }

  if (socket && currentToken === token) {
    if (!socket.connected) {
      socket.connect();
    }
    return socket;
  }

  if (socket) {
    socket.off();
    socket.disconnect();
    socket = null;
    currentToken = null;
    currentUserRoomId = null;
    currentConversationRoomId = null;
  }

  socket = io(SOCKET_URL, {
    autoConnect: false,
    auth: {
      token,
    },
  });

  currentToken = token;

  socket.on("connect", () => {
    console.log("Socket connect", { id: socket.id, url: SOCKET_URL });

    if (currentUserRoomId) {
      socket.emit(EVENTS.JOIN_USER_ROOM, { userId: currentUserRoomId });
    }

    if (currentConversationRoomId) {
      socket.emit(EVENTS.JOIN_CONVERSATION_ROOM, {
        conversationId: currentConversationRoomId,
      });
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnect", { reason });
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connect_error", error);
  });

  socket.connect();

  return socket;
};

const emitSocketEvent = (event, payload) => {
  if (!socket) {
    console.warn("Socket is not initialized yet.", event, payload);
    return;
  }

  if (socket.connected) {
    socket.emit(event, payload);
    return;
  }

  // Preserve room IDs for reconnect logic.
  if (event === EVENTS.JOIN_USER_ROOM) {
    currentUserRoomId = payload?.userId;
  }
  if (event === EVENTS.JOIN_CONVERSATION_ROOM) {
    currentConversationRoomId = payload?.conversationId;
  }
};

export const connectSocket = (token) => createSocketInstance(token);
export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (!socket) return;

  socket.off();
  socket.disconnect();
  socket = null;
  currentToken = null;
  currentUserRoomId = null;
  currentConversationRoomId = null;
};
export const isConnected = () => socket?.connected ?? false;
export const SOCKET_EVENTS = EVENTS;

export const joinUserRoom = (userId) => {
  if (!userId) {
    return;
  }

  currentUserRoomId = userId;
  emitSocketEvent(EVENTS.JOIN_USER_ROOM, { userId });
};

export const joinConversationRoom = (conversationId) => {
  if (!conversationId) {
    return;
  }

  currentConversationRoomId = conversationId;
  emitSocketEvent(EVENTS.JOIN_CONVERSATION_ROOM, { conversationId });
};

export const leaveConversationRoom = (conversationId) => {
  if (!conversationId || !socket) {
    return;
  }

  if (currentConversationRoomId === conversationId) {
    currentConversationRoomId = null;
  }

  if (socket.connected) {
    socket.emit(EVENTS.LEAVE_CONVERSATION_ROOM, { conversationId });
  }
};

export const createSocket = connectSocket;