// ============================
// Chat.jsx
// ============================

import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";
import LucasModal from "./LucasModal";
import ChatRequest from "./ChatRequest";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatRequests,
  getConversationMessages,
  sendMessageApi,
  getSidebarConversations,
  setOnlineUsers,
} from "../../Components/Redux/chatRequestSlice";
import api from "../../api";
import { getSocket, SOCKET_EVENTS, joinConversationRoom, leaveConversationRoom } from "../../socket";
const apiBaseUrl = import.meta.env.VITE_API_URL?.trim();
const IMAGE_BASE_URL = apiBaseUrl?.replace(/\/api\/v1\/?$/, "");

function Chat() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [showLucas, setShowLucas] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const dispatch = useDispatch();

  const { selectedConversation, loading, error, sidebarConversations, onlineUsers } = useSelector(
    (state) => state.chatRequests
  );

  const currentUser = useSelector((state) => state.auth.user?.id);
  useEffect(() => {
    if (currentUser) {
      dispatch(
        getSidebarConversations(currentUser)
      );
    }
  }, [currentUser, dispatch]);



  const selectedConversationIdRef = useRef(null);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (Number(message.conversationId) === Number(selectedId)) {
                console.log("Fetching conversation:", selectedId);

        dispatch(getConversationMessages(selectedId));
      }
    };

    const handleActiveUsers = ({ users }) => {
      dispatch(setOnlineUsers(users));
    };

    // const handleUserOnline = ({ userId }) => {
    //   dispatch(addOnlineUser(userId));
    // };

    // const handleUserOffline = ({ userId }) => {
    //   dispatch(removeOnlineUser(userId));
    // };

    socket.on("newMessage", handleNewMessage);
    socket.on(
      SOCKET_EVENTS.ACTIVE_USERS,
      ({ users }) => {
        dispatch(
          setOnlineUsers(users)
        );
      }
    );

    // return () => {
    //   socket.off("newMessage", handleNewMessage);
    //   socket.off(SOCKET_EVENTS.ACTIVE_USERS, handleActiveUsers);
    //   socket.off(SOCKET_EVENTS.USER_ONLINE, handleUserOnline);
    //   socket.off(SOCKET_EVENTS.USER_OFFLINE, handleUserOffline);
    // };
  }, [selectedId, dispatch]);

  useEffect(() => {
    if (!selectedConversation) return;

    setMessages(
      selectedConversation.data || []
    );
  }, [selectedConversation]);

  useEffect(() => {
    if (!selectedId) return;

    if (selectedConversationIdRef.current && selectedConversationIdRef.current !== selectedId) {
      leaveConversationRoom(selectedConversationIdRef.current);
    }

    joinConversationRoom(selectedId);
    selectedConversationIdRef.current = selectedId;

    return () => {
      leaveConversationRoom(selectedId);
    };
  }, [selectedId]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleConnect = () => {
      console.log("Socket Connected:", socket.id);
    };

    const handleConnectError = (error) => {
      console.error("Socket connect_error:", error);
    };

    const handleDisconnect = (reason) => {
      console.warn("Socket disconnected:", reason);
    };

    const handleConnectTimeout = () => {
      console.error("Socket connect_timeout");
    };

    console.log("Socket initial status:", {
      connected: socket.connected,
      id: socket.id,
      uri: socket.io?.uri,
    });

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_timeout", handleConnectTimeout);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_timeout", handleConnectTimeout);
    };
  }, []);
  useEffect(() => {
    if (showRequest) {
      dispatch(getChatRequests());
    }
  }, [showRequest, dispatch]);

  const sidebarChats = useMemo(
    () =>
      sidebarConversations.map((item) => {
        const user = item.frontUser;
        const avatar = user?.profileImage
          ? `${IMAGE_BASE_URL}/${user.profileImage}`
          : "https://i.pravatar.cc/150";
        const userId = user?.id;
        return {
          id: item.conversationId,
          userId,
          name: user?.fullName,
          avatar,
          active:
            userId
              ? onlineUsers.some(
                (id) =>
                  Number(id) ===
                  Number(userId)
              )
              : false,
        };
      }),
    [sidebarConversations, onlineUsers]
  );
  useEffect(() => {
    if (sidebarChats.length && !selectedId) {
      setSelectedId(sidebarChats[0].id);
    }
  }, [sidebarChats, selectedId]);
  useEffect(() => {
    if (selectedId) {
      dispatch(
        getConversationMessages(
          selectedId
        )
      );
    }
  }, [selectedId, dispatch]);

  const selectedChat = useMemo(() => {
    if (!selectedConversation)
      return null;

    const user =
      selectedConversation.frontUser;

    const avatar = user?.profileImage
      ? `${IMAGE_BASE_URL}/${user.profileImage}`
      : "https://i.pravatar.cc/150";

    return {
      id:
        selectedConversation.conversationId,
      userId: user?.id,
      name: user?.fullName,
      avatar,
      active: user?.id ? onlineUsers.includes(user.id) : false,
      messages: (
        messages || []
      ).map((msg) => ({
        id: msg.id,
        text: msg.content,
        time: new Date(
          msg.createdAt
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sent:
          msg.senderId ===
          currentUser,
        seen: msg.isRead,
      })),
    };
  }, [
    selectedConversation,
    currentUser,
    apiBaseUrl,
  ]);

  const filtered =
    sidebarChats.filter((c) =>
      c.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat?.messages, selectedId]);

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || !selectedChat) return;

    try {
      await dispatch(
        sendMessageApi({
          conversationId: selectedChat.id,
          content: text,
        })
      ).unwrap();

      dispatch(
        getConversationMessages(
          selectedChat.id
        )
      );

      setInput("");
    } catch (error) {
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
//   console.log({
//     selectedId,
//     conversationId: selectedChat.id,
//     userId: selectedChat.userId,
//     name: selectedChat.name,
// });
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[var(--bg-background)] text-[var(--text-dim)] flex items-center justify-center p-2 sm:p-4">

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)] mx-auto mb-4"></div>
            <p>{t('chat.loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 mb-4">{t('chat.error', { error })}</p>
            <button
              onClick={() => dispatch(getChatRequests())}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90"
            >
              {t('chat.retry')}
            </button>
          </div>
        ) : (
          <div
            className="w-full max-w-4xl bg-[var(--bg-card)]/10 rounded-[2rem] shadow-2xl overflow-hidden flex border border-[var(--border)]"
            style={{ height: "clamp(500px, 80vh, 720px)" }}
          >

            <ChatSidebar
              chats={filtered}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              search={search}
              setSearch={setSearch}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              setShowRequest={setShowRequest}
            />

            <ChatWindow
              selectedChat={selectedChat}
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
              handleKey={handleKey}
              bottomRef={bottomRef}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              activeModal={activeModal}
              setActiveModal={setActiveModal}
              showLucas={showLucas}
              setShowLucas={setShowLucas}
            />
          </div>
        )}

      </div>

      {showLucas && (
        <LucasModal onClose={() => setShowLucas(false)} />
      )}

      {showRequest && (
        <ChatRequest onClose={() => setShowRequest(false)} />
      )}
    </>
  );
}

export default Chat;