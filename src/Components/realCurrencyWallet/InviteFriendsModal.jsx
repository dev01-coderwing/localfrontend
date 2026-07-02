import React from "react";

import {
  X,
  User,
  UserPlus,
  Star,
  Share2,
  MessageSquareText,
  ChevronRight,
  Copy,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const InviteFriendsModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-[var(--bg)] backdrop-blur-md flex items-center justify-center z-50 p-4">

      {/* MODAL */}
      <div className="w-full max-w-[640px] bg-[var(--card)] rounded-[26px] p-6 shadow-2xl relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"
        >
          <X size={18} className="text-[var(--text)]" />
        </button>

        {/* TITLE */}
        <h2 className="text-[18px] font-semibold text-[var(--text)]">
          {t('share.invite_friends.title')}
        </h2>

        {/* HERO CARD */}
        <div className="mt-6 h-[130px] rounded-[24px] bg-gradient-to-b from-[#FFF6F5] to-[#FFD9CF] flex items-center justify-around">

          {/* LEFT */}
          <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center">
            <User size={20} />
          </div>

          {/* CENTER */}
          <div className="w-16 h-16 rounded-full bg-[#E7DDFB] flex items-center justify-center">
            <Star
              size={30}
              className="text-[#5F7BF4] fill-[#5F7BF4]"
            />
          </div>

          {/* RIGHT */}
          <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center">
            <UserPlus size={20} />
          </div>
        </div>

        {/* MAIN TEXT */}
        <div className="text-center mt-5">

          <h3 className="text-[20px] font-bold text-[var(--text)]">
            {t('share.invite_friends.heading')}
          </h3>

          <p className="text-sm text-[var(--text-dim)] mt-2">
            {t('share.invite_friends.description')}
          </p>
        </div>

        {/* OFFER CARD */}
        <div className="mt-5 border border-gray-200 rounded-[22px] p-6 text-center">

          <p className="text-xs font-semibold tracking-wide text-[var(--text)]">
            {t('share.invite_friends.special_offer')}
          </p>

          <h2 className="mt-4 text-[20px] font-bold text-[var(--text)]">
            {t('share.invite_friends.you')} <span className="text-[#7C3AED]">{t('share.invite_friends.both')}</span> {t('share.invite_friends.get')}
          </h2>

          <div className="flex items-center justify-center gap-2 mt-1">

            <span className="text-[50px] font-black text-[#6D28D9] leading-none">
              10%
            </span>

            <div className="text-left leading-5">
              <p className="text-[30px] font-bold text-[var(--text)]">
                {t('share.invite_friends.benefit')}
              </p>

              <p className="text-[30px] font-bold text-[var(--text)]">
                {t('share.invite_friends.on_premium')}
              </p>
            </div>
          </div>

          <p className="text-sm text-[var(--text-dim)] mt-4">
            {t('share.invite_friends.applied_note')}
          </p>
        </div>

        {/* QUICK INVITE */}
        <div className="mt-5">

          <h4 className="text-sm font-semibold text-[var(--text)] mb-3">
            {t('share.invite_friends.quick_invite')}
          </h4>

          <div className="grid grid-cols-2 gap-4">

            {/* SHARE LINK */}
            <button className="border border-gray-200 rounded-[18px] p-4 flex items-center justify-between hover:bg-gray-500 transition">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-[var(--bg)] flex items-center justify-center">
                  <Share2 size={18} />
                </div>

                <span className="text-sm font-semibold text-[var(--text-dim)]">
                  {t('share.invite_friends.share_link')}
                </span>
              </div>

              <ChevronRight
                size={18}
                className="text-gray-400"
              />
            </button>

            {/* CHAT */}
            <button className="border border-gray-200 rounded-[18px] p-4 flex items-center justify-between hover:bg-gray-500 transition">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-[var(--bg)] flex items-center justify-center">
                  <MessageSquareText size={18} />
                </div>

                <span className="text-sm font-semibold text-[var(--text-dim)]">
                  {t('share.invite_friends.chat_invite')}
                </span>
              </div>

              <ChevronRight
                size={18}
                className="text-gray-400"
              />
            </button>
          </div>
        </div>

        {/* CODE + BUTTON */}
        <div className="mt-5 flex gap-3">

          {/* CODE */}
          <div className="flex-1 h-[54px] rounded-full border border-[#B784F7] bg-[#F4EBFF] flex items-center justify-between px-6">

            <span className="text-[#6D28D9] font-semibold">
              IAM-NTR-2026
            </span>

            <Copy
              size={18}
              className="text-[#6D28D9]"
            />
          </div>

          {/* BUTTON */}
                 <button
  onClick={() => setShowInviteFriends(true)}
  className="flex-1 h-[54px]  py-3 rounded-full bg-gradient-to-r from-[#D79098] to-[#5F7BF4] text-white font-medium"
>
  {t('share.invite_friends.invite_button')}
</button>
        </div>

        {/* FOOTER */}
        <p className="text-[11px] text-gray-400 text-center mt-8 leading-5">
          {t('share.invite_friends.footer')}
        </p>
      </div>
    </div>
  );
};

export default InviteFriendsModal;