import React from "react";

import {
  X,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const ShareInviteModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-[var(--bg)] backdrop-blur-md flex items-center justify-center z-50 p-4">

      {/* MODAL */}
      <div className="w-full max-w-[500px] bg-[var(--card)] rounded-[24px] p-5 shadow-2xl relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"
        >
          <X size={16} className="bg-[var(--card)]" />
        </button>

        {/* TITLE */}
        <h2 className="text-[18px] font-semibold text-[var(--text)]">
          {t('share.invite_preview.title')}
        </h2>

        {/* CENTER TEXT */}
        <div className="text-center mt-10">

          <h3 className="text-[28px] font-bold text-[var(--text)]">
            {t('share.invite_preview.heading')}
          </h3>

          <p className="text-sm text-[var(--text-dim)] leading-6 mt-3 px-2">
            {t('share.invite_preview.description')}
          </p>
        </div>

        {/* PREVIEW CARD */}
        <div className="mt-6 border border-gray-200 rounded-[18px] p-4">

          {/* HEADER */}
          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-[#E8EAFE] flex items-center justify-center">
              <User
                size={18}
                className="text-[#5F7BF4]"
              />
            </div>

            <div>

              <h4 className="text-sm font-semibold text-[var(--text)]">
                {t('share.invite_preview.preview_message')}
              </h4>

              <p className="text-xs text-[var(--text-dim)]">
                {t('share.invite_preview.to_contacts')}
              </p>
            </div>
          </div>

          {/* MESSAGE BOX */}
          <div className="mt-5 rounded-[16px] bg-gradient-to-r from-[#D79098] to-[#F7D5C8] p-5">

            <p className="text-[16px] leading-8 text-black font-medium">
              {t('share.invite_preview.join_me_on')} <span className="font-bold">IAMeetYou</span>
              {" "}{t('share.invite_preview.first_sub_offer')}
            </p>
          </div>

          {/* AVATARS */}
          <div className="flex items-center mt-4">

            <div className="flex -space-x-2">

              <img
                src="https://i.pravatar.cc/100?img=1"
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />

              <img
                src="https://i.pravatar.cc/100?img=2"
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />

              <div className="w-7 h-7 rounded-full bg-black text-white text-[10px] flex items-center justify-center border-2 border-white">
                +5
              </div>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button className="w-full mt-7 h-[54px] rounded-full text-white font-medium bg-gradient-to-r from-[#D79098] to-[#5F7BF4]">
          {t('share.invite_preview.send_invite')}
        </button>
      </div>
    </div>
  );
};

export default ShareInviteModal;