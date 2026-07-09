// ============================
// ChatSidebar.jsx
// ============================
import { useTranslation } from "react-i18next";

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

function ChatSidebar({
  chats,
  selectedId,
  setSelectedId,
  search,
  setSearch,
  sidebarOpen,
  setSidebarOpen,
  setShowRequest,
}) {
  const { t } = useTranslation();
  console.log("Sidebar Chats:", chats);
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[var(--bg-background)] z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-30
          w-72 bg-[var(--bg-card)]/10 flex flex-col
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          border-r border-[var(--border)]
        `}
      >

        <div className="px-5 pt-6 pb-4">

          <div className="flex items-center justify-between mb-6">

            <h1 className="text-2xl font-bold text-[var(--text-dim)]">
              {t('chatSidebar.title')}
            </h1>

            <button
              onClick={() => setShowRequest(true)}
              className="w-10 h-10 rounded-full bg-[var(--bg-background)] border border-[var(--border)] flex items-center justify-center"
            >
              +
            </button>
          </div>

          <input
            type="text"
            placeholder={t('chatSidebar.search_placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-2xl text-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">

          {chats.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                    console.log("Clicked:", c);

                setSelectedId(c.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-4 rounded-3xl transition-all text-left ${
                selectedId === c.id
                  ? "bg-[var(--accent-soft)]"
                  : "hover:bg-[var(--hover)]"
              }`}
            >

              <Avatar
                src={c.avatar}
                name={c.name}
                active={c.active}
              />

              <div className="flex-1 min-w-0">

                <div className="flex items-center justify-between">

                  <span className="font-bold text-[var(--text-dim)]">
                    {c.name}
                  </span>

                  <span className="text-xs text-[var(--text-dim2)]">
                    {c.time}
                  </span>
                </div>

                <div className="flex items-center justify-between">

                  <p className="text-sm truncate text-[var(--text-dim2)]">
                    {c.lastMessage}
                  </p>

                  {c.unread > 0 && (
                    <span className="w-5 h-5 bg-[var(--accent)] text-white text-[10px] rounded-full flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

export default ChatSidebar;