import React from "react";
import { X, ChevronDown } from "lucide-react";

const NotificationsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Container */}
      <div className="bg-[#f5f2ee] w-full max-w-md rounded-3xl p-5 shadow-xl relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={onClose} className="bg-white rounded-full p-2">
            <X size={18} />
          </button>
        </div>

        {/* Matches */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Matches</h3>
            <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full">
              2m ago
            </span>
          </div>

          <div className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium text-sm">New Match : Sarah</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>

            <button className="bg-purple-100 text-purple-500 px-3 py-1 rounded-full text-sm">
              View
            </button>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">AI INSIGHTS</h3>

          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                ✨
              </div>

              <div>
                <p className="font-medium text-sm">Lucas AI</p>
                <p className="text-xs text-gray-500">
                  “You compatibility with NTR just went up! She just added
                  photography to her interests.”
                </p>
                <span className="text-purple-500 text-xs cursor-pointer">
                  Analyze profile →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Messages</h3>

          <div className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm">
            <div>
              <p className="font-medium text-sm">Messages</p>
              <p className="text-xs text-gray-500">
                2 unread conversations
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                3
              </span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* System */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">SYSTEM</h3>

          <div className="bg-white rounded-xl p-3 flex gap-3 shadow-sm">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              🛡️
            </div>

            <div>
              <p className="font-medium text-sm">NEW Login detected</p>
              <p className="text-xs text-gray-500">
                A new login form London, UK was detected...
              </p>
            </div>
          </div>
        </div>

        {/* Invitation */}
        <div>
          <h3 className="font-medium mb-2">Invitation</h3>

          {/* Accepted */}
          <div className="bg-white rounded-xl p-3 mb-3 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">Elena Gilbert</p>
                <p className="text-xs text-gray-500">2m ago</p>
              </div>
              <span className="text-green-500 bg-green-100 text-xs px-2 py-1 rounded-full">
                Accepted
              </span>
            </div>

            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-400 to-indigo-500 text-white text-sm">
              Start chatting
            </button>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">Frederick</p>
                <p className="text-xs text-gray-500">1h ago</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 border border-red-300 text-red-400 py-2 rounded-lg text-sm">
                Decline
              </button>
              <button className="flex-1 bg-gradient-to-r from-pink-400 to-indigo-500 text-white py-2 rounded-lg text-sm">
                Accept Invitation
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotificationsModal;