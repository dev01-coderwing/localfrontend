import React from "react";
import { X } from "lucide-react";

const ChatRulesModal = ({ onClose,onContinue }) => {
  return (
    <div className="fixed inset-0 bg-[var(--bg-background)] backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-[var(--bg-card)]/10 w-full max-w-md rounded-2xl shadow-xl p-6 relative border border-[var(--border)]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-dim)] hover:text-[var(--text-dim2)]"
        >
          <X size={20} />
        </button>

        {/* Top Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xl">
            🎟️
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-[var(--text-dim)] mb-2">
          Chat invitation Rules
        </h2>
        <p className="text-center text-[var(--text-dim2)] text-sm mb-6">
          Building trust and meaningful connections.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Card 1 */}
          <div className="bg-[var(--bg-card)]/10 rounded-xl p-4 text-center">
            <div className="mb-2 text-xl">🛡️</div>
            <h3 className="font-medium text-sm text-[var(--text-dim)]">Invite to chat</h3>
            <p className="text-xs text-[var(--text-dim2)]    mt-1">
              Every new chat requires an invitation to ensure meaningful
              connections.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[var(--bg-card)]/10 rounded-xl p-4 text-center">
            <div className="mb-2 text-xl">☝️</div>
            <h3 className="font-medium text-sm text-[var(--text-dim)]">Recipient's choice</h3>
            <p className="text-xs text-[var(--text-dim2)] mt-1">
              The recipient must accept or decline your request before you can chat.
            </p>
          </div>
        </div>

        {/* Consent Card */}
        <div className="bg-[var(--bg-card)]/10 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span>👥</span>
            <h3 className="font-medium text-sm text-[var(--text-dim)]">Consent First</h3>
          </div>
          <p className="text-xs text-[var(--text-dim2)]    leading-relaxed">
            Tell us how we can improve your experience.
          </p>
        </div>

        {/* Warning */}
        <div className="bg-red-100 text-red-500 text-xs p-3 rounded-lg mb-4">
          ℹ️ This system prevent harassment and fake profiles.
        </div>

        {/* Button */}
       <button
  onClick={() => {
    onClose();
    onContinue();
  }}
  className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-400 to-indigo-500 hover:opacity-90"
>
  I Understand
</button>
      </div>
    </div>
  );
};

export default ChatRulesModal;
