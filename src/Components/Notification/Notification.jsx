import React from "react";
import { X, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const NotificationsModal = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Container */}
      <div className="bg-[#f5f2ee] w-full max-w-md rounded-3xl p-5 shadow-xl relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t('notification.title')}</h2>
          <button onClick={onClose} className="bg-white rounded-full p-2">
            <X size={18} />
          </button>
        </div>

        {/* Matches */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{t('notification.matches')}</h3>
            <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full">
              {t('notification.time_2m_ago')}
            </span>
          </div>

          <div className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium text-sm">{t('notification.new_match', { name: 'Sarah' })}</p>
                <p className="text-xs text-gray-500">{t('notification.time_2min_ago')}</p>
              </div>
            </div>

            <button className="bg-purple-100 text-purple-500 px-3 py-1 rounded-full text-sm">
              {t('notification.view')}
            </button>
          </div>
        </div>

        {/* AI Insights */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">{t('notification.ai_insights')}</h3>

          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                ✨
              </div>

              <div>
                <p className="font-medium text-sm">{t('notification.lucas_ai')}</p>
                <p className="text-xs text-gray-500">
                  {t('notification.lucas_ai_msg')}
                </p>
                <span className="text-purple-500 text-xs cursor-pointer">
                  {t('notification.analyze_profile')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">{t('notification.messages')}</h3>

          <div className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm">
            <div>
              <p className="font-medium text-sm">{t('notification.messages')}</p>
              <p className="text-xs text-gray-500">
                {t('notification.unread_conversations', { n: 2 })}
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
          <h3 className="font-medium mb-2">{t('notification.system')}</h3>

          <div className="bg-white rounded-xl p-3 flex gap-3 shadow-sm">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              🛡️
            </div>

            <div>
              <p className="font-medium text-sm">{t('notification.new_login')}</p>
              <p className="text-xs text-gray-500">
                {t('notification.new_login_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Invitation */}
        <div>
          <h3 className="font-medium mb-2">{t('notification.invitation')}</h3>

          {/* Accepted */}
          <div className="bg-white rounded-xl p-3 mb-3 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">Elena Gilbert</p>
                <p className="text-xs text-gray-500">{t('notification.time_2m_ago')}</p>
              </div>
              <span className="text-green-500 bg-green-100 text-xs px-2 py-1 rounded-full">
                {t('notification.accepted')}
              </span>
            </div>

            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-400 to-indigo-500 text-white text-sm">
              {t('notification.start_chatting')}
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
                <p className="text-xs text-gray-500">{t('notification.time_1h_ago')}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 border border-red-300 text-red-400 py-2 rounded-lg text-sm">
                {t('notification.decline')}
              </button>
              <button className="flex-1 bg-gradient-to-r from-pink-400 to-indigo-500 text-white py-2 rounded-lg text-sm">
                {t('notification.accept_invitation')}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotificationsModal;