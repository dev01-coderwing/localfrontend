// ============================
// Chat.jsx
// ============================

import { useState, useRef, useEffect, useMemo } from "react";
import Navbar from "../Navbar/Navbar";
import LucasModal from "./LucasModal";
import ChatRequest from "./ChatRequest";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import { getChatRequests } from "../../Components/Redux/chatRequestSlice";
const contacts = [
  {
    id: 1,
    name: "Sarah",
    avatar: "https://i.pravatar.cc/150?img=47",
    lastMessage: "See you tomorrow! 😊",
    time: "2m ago",
    unread: 3,
    active: true,
    messages: [
      { id: 1, text: "Hey! How are you?", time: "10:30 AM", sent: false },
      {
        id: 2,
        text: "Hi! I'm great, thanks! How about you?",
        time: "10:32 AM",
        sent: true,
        seen: true,
      },
      {
        id: 3,
        text: "Doing well! Want to grab coffee sometime?",
        time: "10:35 AM",
        sent: false,
      },
    ],
  },
  {
    id: 2,
    name: "Emma",
    avatar: "https://i.pravatar.cc/150?img=44",
    lastMessage: "That sounds amazing!",
    time: "1h ago",
    unread: 0,
    active: false,
    messages: [
      {
        id: 1,
        text: "Did you see the new movie?",
        time: "9:00 AM",
        sent: false,
      },
      {
        id: 2,
        text: "Not yet, is it good?",
        time: "9:05 AM",
        sent: true,
        seen: true,
      },
      {
        id: 3,
        text: "That sounds amazing!",
        time: "9:10 AM",
        sent: false,
      },
    ],
  },
];

function Chat() {
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [showLucas, setShowLucas] = useState(false);
  const [showRequest, setShowRequest] = useState(false);

  const bottomRef = useRef(null);

  const dispatch = useDispatch();

  const { requests, loading, error } = useSelector(
    (state) => state.chatRequests
  );

  useEffect(() => {
    dispatch(getChatRequests());
  }, [dispatch]);

  // Transform API data to chat format (memoized to prevent infinite loops)
  const transformedChats = useMemo(
    () =>
      requests.map((request) => ({
        id: request.conversationId,
        name: request.otherUser.fullName,
        avatar: request.otherUser.profileImage,
        lastMessage: request.lastMessage || "Say hello! 👋",
        time: new Date(request.updatedAt).toLocaleDateString(),
        unread: 0,
        active: request.otherUser.isVerified,
        isMuted: request.isMuted,
        isVerified: request.otherUser.isVerified,
        messages: [],
      })),
    [requests]
  );

  const [selectedId, setSelectedId] = useState(null);

  // Memoize displayChats to prevent recalculation on every render
  const displayChats = useMemo(
    () => (transformedChats.length > 0 ? transformedChats : contacts),
    [transformedChats]
  );

  // Local state for message updates
  const [localChats, setLocalChats] = useState(() => displayChats);

  // Set first chat as selected when data is loaded
  useEffect(() => {
    if (transformedChats.length > 0 && !selectedId) {
      setSelectedId(transformedChats[0].id);
    }
  }, [transformedChats, selectedId]);

  useEffect(() => {
    setLocalChats(displayChats);
  }, [displayChats]);

  const selectedChat = localChats.find((c) => c.id === selectedId);

  const filtered = localChats.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat?.messages, selectedId]);

  const sendMessage = () => {
    const text = input.trim();

    if (!text) return;

    const now = new Date();

    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setLocalChats((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
            ...c,
            lastMessage: text,
            time: "now",
            messages: [
              ...c.messages,
              {
                id: Date.now(),
                text,
                time,
                sent: true,
                seen: false,
              },
            ],
          }
          : c
      )
    );

    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[var(--bg-background)] text-[var(--text-dim)] flex items-center justify-center p-2 sm:p-4">

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)] mx-auto mb-4"></div>
            <p>Loading chats...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <button 
              onClick={() => dispatch(getChatRequests())}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90"
            >
              Retry
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