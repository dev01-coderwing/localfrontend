import React from "react";
import { X, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const FreeChatModal = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-[var(--bg-background)] backdrop-blur-sm flex items-center justify-center z-50">

      {/* Modal */}
      <div className="bg-[var(--bg-card)]/10 w-full max-w-md rounded-3xl p-5 shadow-xl relative border border-[var(--border)]">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-dim)] hover:text-[var(--text-dim2)]"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-4 text-[var(--text-dim)]">
          {t('chatInvitation.title')}
        </h2>

        {/* Profile Card */}
        <div className="bg-[var(--bg-card)]/10 rounded-2xl p-5 text-center mb-4">

          {/* Profile Image */}
          <img
            src="https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9"
            alt="profile"
            className="w-24 h-24 rounded-full mx-auto object-cover mb-3 border border-[var(--border)]"
          />

          {/* Name */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-[var(--text-dim)]">Nicole Jennifer</h3>
            <span className="text-blue-500 text-sm">✔</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mb-4">
            {t('chatInvitation.badge')}
          </div>

          {/* Stats */}
          <div className="bg-[var(--bg-card)]/10 rounded-xl p-3 flex justify-around text-sm">
            <div className="flex items-center gap-1">
              ❤️ <span className="text-red-500">35%</span>
            </div>
            <div className="flex items-center gap-1">
              🍑 <span className="text-pink-500">50%</span>
            </div>
            <div className="flex items-center gap-1">
              💀 <span className="text-purple-500">∞</span>
            </div>
          </div>
        </div>

        {/* Policy */}
        <div className="bg-[var(--bg-card)]/10 rounded-2xl p-4 mb-4">
          <div className="flex gap-2 items-start">
            <Info size={18} className="text-[var(--text-dim)] mt-1" />
            <div>
              <h4 className="font-medium text-sm text-[var(--text-dim)]">{t('chatInvitation.policy_title')}</h4>
              <p className="text-xs text-[var(--text-dim2)] leading-relaxed mb-1">
                {t('chatInvitation.policy_desc')}
              </p>
              <span className="text-blue-500   text-xs cursor-pointer">
                {t('chatInvitation.learn_more')}
              </span>
            </div>
          </div>
        </div>

        {/* Send Rose */}
        <div className="flex justify-center mb-4">
          <button className="bg-red-500 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition">
            {t('chatInvitation.send_rose')}
          </button>
        </div>

        {/* Main Button */}
        <button className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-400 to-indigo-500 mb-2">
          {t('chatInvitation.send_invitation')}
        </button>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full text-gray-500 text-sm"
        >
          {t('chatInvitation.cancel')}
        </button>
      </div>
    </div>
  );
};

export default FreeChatModal;
