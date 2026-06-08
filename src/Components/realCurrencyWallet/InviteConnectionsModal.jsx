import React, { useState } from "react";

import {
  X,
  Search,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

const InviteConnectionsModal = ({ onClose }) => {

  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      name: "Sarah",
      time: "Active now",
      img: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      name: "Mark Johnson",
      time: "Active 5m ago",
      img: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      time: "Active 1h ago",
      img: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 4,
      name: "David Chen",
      time: "Active 20m ago",
      img: "https://i.pravatar.cc/100?img=4",
    },
  ];

  return (
    <div className="fixed inset-0 bg-[var(--bg)] backdrop-blur-md flex items-center justify-center z-50 p-4">

      {/* MODAL */}
      <div className="w-full max-w-[500px] bg-[var(--card)] rounded-[24px] p-5 shadow-2xl relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"
        >
          <X size={18} className="text-[var(--text-dim)]" />
        </button>

        {/* TITLE */}
        <h2 className="text-[18px] font-semibold text-[var(--text)]">
          Invite Connections
        </h2>

        {/* SEARCH */}
        <div className="mt-6 relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text)]"
          />

          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[48px] rounded-[14px] border border-gray-200 pl-12 pr-4 outline-none text-sm"
          />
        </div>

        {/* SUCCESS */}
        <div className="mt-4 h-[44px] rounded-full border border-gray-200 flex items-center justify-between px-4">

          <div className="flex items-center gap-2">

            <CheckCircle2
              size={16}
              className="text-black fill-black"
            />

            <span className="text-sm text-[var(--text)]">
              Invite sent successfully
            </span>
          </div>

          <X
            size={16}
            className="text-[var(--text)] cursor-pointer"
          />
        </div>

        {/* USERS */}
        <div className="mt-4">

          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between py-3 border-b border-gray-100"
            >

              {/* LEFT */}
              <div className="flex items-center gap-3">

                <img
                  src={user.img}
                  alt={user.name}
                  className="w-11 h-11 rounded-full object-cover"
                />

                <div>

                  <h3 className="text-[15px] font-medium text-[var(--text)]">
                    {user.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-0.5">

                    <div className="w-2 h-2 rounded-full bg-green-500"></div>

                    <p className="text-xs text-[var(--text-dim)]">
                      {user.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <button className="px-6 h-[38px] rounded-full border border-gray-200 text-sm text-[var(--text-dim)] hover:bg-gray-50 transition">
                Invite
              </button>
            </div>
          ))}
        </div>

        {/* MESSAGE BOX */}
        <div className="mt-6 border border-gray-200 rounded-[18px] p-4">

          <div className="flex items-start gap-3">

            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <MessageSquare
                size={18}
                className="text-black"
              />
            </div>

            <div>

              <h4 className="text-sm font-semibold text-[var(--text)]">
                Message Review
              </h4>

              <p className="text-sm text-[var(--text-dim)] mt-1 leading-6">
                Join me on IAMeetYou . Let's explore more
                together!
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button className="w-full mt-5 h-[52px] rounded-full text-white font-medium bg-gradient-to-r from-[#D79098] to-[#5F7BF4]">
          Send Invite
        </button>
      </div>
    </div>
  );
};

export default InviteConnectionsModal;