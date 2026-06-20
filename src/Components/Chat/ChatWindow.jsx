// ============================
// ChatWindow.jsx
// ============================
import { useDispatch } from "react-redux";
import {
  muteConversation,
  blockUser,
  reportUser,
} from "../../Components/Redux/chatRequestSlice";
function Avatar({ src, name, size = "md", active = false }) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-11 h-11",
  };

  return (
    <div className="relative flex-shrink-0">
      <img
        src={src}
        alt={name}
        className={`${sizeMap[size]} rounded-full object-cover border border-[var(--border)]`}
      />


      {active && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[var(--card)] rounded-full" />
      )}
    </div>
  );
}

function MessageBubble({ msg }) {
  return (
    <div className={`flex ${msg.sent ? "justify-end" : "justify-start"} mb-4`}>

      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.sent
          ? "bg-[var(--accent)] text-[var(--text-dim)] rounded-br-sm"
          : "bg-[var(--bg-card)]/10 text-[var(--text-dim)] border border-[var(--border)] rounded-bl-sm"
          }`}
      >

        <p>{msg.text}</p>

        <div className="flex items-center gap-1 mt-1.5">
          <span className="text-[10px]">{msg.time}</span>
        </div>
      </div>
    </div>
  );
}

const ActionModal = ({ type, onClose, selectedChat }) => {
  const dispatch = useDispatch();

  const data = {
    mute: {
      title: selectedChat?.isMuted
        ? "Unmute Conversation"
        : "Mute Conversation",

      btn: selectedChat?.isMuted
        ? "Unmute"
        : "Mute",
    },
    report: {
      title: "Report User",
      btn: "Report",
    },
    block: {
      title: "Block User",
      btn: "Block",
    },
  };

  const current = data[type];

  const handleAction = () => {
    if (type === "mute") {
      dispatch(
        muteConversation({
          conversationId: selectedChat.id,
          isMuted: !selectedChat.isMuted,
        })
      );
    }
    if (type === "block") {
      dispatch(blockUser(selectedChat.userId));
    }

    if (type === "report") {
      dispatch(
        reportUser({
          reportedId: selectedChat.userId,
          reason: "Spam",
        })
      );
    }
    console.log("selectedChat =>", selectedChat);
    onClose();
  };
  console.log("ChatWindow Rendered");
  console.log(selectedChat);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-background)] rounded-2xl p-6 w-[320px]">
        <h2 className="text-lg font-semibold">
          {current.title}
        </h2>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="w-full border py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleAction}
            className="w-full bg-gradient-to-r from-pink-400 to-blue-500 text-white py-2 rounded-lg"
          >
            {current.btn}
          </button>
        </div>
      </div>
    </div>
  );
};

function Sparkles({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"
      />
    </svg>
  );
}

function ChatWindow({
  selectedChat,
  input,
  setInput,
  sendMessage,
  handleKey,
  bottomRef,
  setSidebarOpen,
  menuOpen,
  setMenuOpen,
  activeModal,
  setActiveModal,
  setShowLucas,

}) {
  console.log("selectedChat", selectedChat);
  // Handle when no chat is selected
  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-w-0">
        <div className="text-center">
          <h3 className="text-xl font-bold text-[var(--text-dim)] mb-2">
            Select a chat to start
          </h3>
          <p className="text-[var(--text-dim2)]">
            Choose a conversation from the sidebar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">

      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">

        <div className="flex items-center gap-3">

          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <Avatar
            src={selectedChat.avatar}
            name={selectedChat.name}
            size="lg"
            active={selectedChat.active}
          />

          <div>
            <h2 className="font-bold text-[var(--text-dim)]">
              {selectedChat.name}
            </h2>

            <p className="text-xs text-[var(--text-dim2)]">
              {selectedChat.active ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="relative">

          <button onClick={() => setMenuOpen(!menuOpen)}>
            ⋮
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-[var(--bg-background)] rounded-xl shadow-lg border z-50">

              <button
                onClick={() => {
                  setActiveModal("mute");
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2"
              >
                {selectedChat?.isMuted ? "Unmute" : "Mute"}
              </button>

              <button
                onClick={() => {
                  setActiveModal("report");
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2"
              >
                Report
              </button>

              <button
                onClick={() => {
                  setActiveModal("block");
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-red-500"
              >
                Block
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-6 py-6 ">

        {Array.isArray(selectedChat.messages) ? (
          selectedChat.messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))
        ) : (
          <p className="text-sm text-[var(--text-dim2)]">No messages yet.</p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ASK LUCAS */}
      <div className="flex justify-center pb-4">

        <button
          onClick={() => setShowLucas(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-5 py-2.5 rounded-full"
        >
          <Sparkles className="w-4 h-4" />
          Ask Lucas
        </button>
      </div>

      {/* INPUT */}
      <div className="px-6 pb-6 pt-2 border-t border-[var(--border)]">

        <div className="flex items-center gap-3 bg-[var(--bg-card)]/10 rounded-3xl px-4 py-3 border border-[var(--border)]">

          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 bg-transparent outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-full bg-[var(--accent)] text-white"
          >
            ➤
          </button>
        </div>
      </div>

      {activeModal && (
        <ActionModal
          type={activeModal}
          onClose={() => setActiveModal(null)}
          selectedChat={selectedChat}
        />
      )}
    </div>
  );
}

export default ChatWindow;