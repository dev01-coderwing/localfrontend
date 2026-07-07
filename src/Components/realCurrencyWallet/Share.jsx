import React from "react";

import {
  X,
  Copy,
  MoreHorizontal,
} from "lucide-react";

import {
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
  FaFacebook,
  FaFacebookMessenger,
} from "react-icons/fa";

import {
  SiSnapchat,
} from "react-icons/si";
import { useTranslation } from "react-i18next";

const ShareInviteLinkModal = ({ onClose }) => {
  const { t } = useTranslation();

  const socials = [
    {
      name: "Instagram",
      icon: <FaInstagram size={24} />,
      bg: "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={24} />,
      bg: "bg-green-500",
    },
    {
      name: "Business\nWhatsApp",
      icon: <FaWhatsapp size={24} />,
      bg: "bg-green-600",
    },
    {
      name: "Snapchat",
      icon: <SiSnapchat size={24} />,
      bg: "bg-yellow-300 text-black",
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane size={24} />,
      bg: "bg-blue-400",
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={24} />,
      bg: "bg-blue-600",
    },
    {
      name: t('share.link_modal.messaging'),
      icon: <FaFacebookMessenger size={24} />,
      bg: "bg-gradient-to-r from-pink-500 to-blue-500",
    },
    {
      name: t('share.link_modal.more'),
      icon: <MoreHorizontal size={22} />,
      bg: "bg-gray-200 text-black",
    },
  ];

  return (
    <div className="fixed inset-0 bg-[var(--bg)] backdrop-blur-md flex items-center justify-center z-50 p-4">

      {/* MODAL */}
      <div className="w-full max-w-[500px] bg-[var(--card)] rounded-[24px] p-5 shadow-2xl relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"
        >
          <X size={16} className="text-[var(--text-dim)]" />
        </button>

        {/* TITLE */}
        <h2 className="text-[18px] font-semibold text-[var(--text)]">
          {t('share.link_modal.title')}
        </h2>

        {/* CARD */}
        <div className="mt-6 border border-gray-200 rounded-[18px] p-4">

          {/* HEADING */}
          <div className="text-center">

            <h3 className="text-[24px] font-bold text-[var(--text)]">
              {t('share.link_modal.heading')}
            </h3>

            <p className="text-sm text-[var(--text-dim)] mt-2 leading-6">
              {t('share.link_modal.friend_gets')} <span className="font-semibold">{t('share.link_modal.ten_percent_off')}</span>.
              {" "}{t('share.link_modal.you_earn')} <span className="font-semibold">{t('share.link_modal.ten_percent_cashback')}</span>.
            </p>
          </div>

          {/* REFERRAL BOX */}
          <div className="mt-5 bg-gray-100 rounded-[18px] p-4 relative">

            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
              {t('share.link_modal.referral_link_label')}
            </p>

            <div className="flex items-center justify-between mt-2">

              <p className="text-sm font-semibold text-black break-all">
                app.link/u/jo...k92
              </p>

              <button className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center shadow-sm">
                <Copy
                  size={18}
                  className="text-gray-700"
                />
              </button>
            </div>

            {/* BANNER */}
            <div className="mt-5 h-[115px] rounded-[18px] bg-gradient-to-r from-[#D8B4FE] to-[#FFD6C9] flex flex-col items-center justify-center">

              <img
                src="/Image/iameetyou.png"
                alt="logo"
                className="w-[90px] object-contain"
              />

              <p className="mt-2 text-[28px] font-semibold bg-gradient-to-r from-[#6D28D9] to-[#EC4899] bg-clip-text text-transparent">
                IAMeetYou
              </p>
            </div>
          </div>
        </div>

        {/* SOCIALS */}
        <div className="mt-5 border border-gray-200 rounded-[18px] p-4">

          <div className="grid grid-cols-4 gap-y-6">

            {socials.map((item, index) => (
              <button
                key={index}
                className="flex flex-col items-center"
              >

                {/* ICON */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white ${item.bg}`}>
                  {item.icon}
                </div>

                {/* TEXT */}
                <p className="text-[10px] text-[var(--text-dim)] text-center mt-2 whitespace-pre-line leading-4">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareInviteLinkModal;