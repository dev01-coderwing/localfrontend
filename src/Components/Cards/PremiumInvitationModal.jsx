import React from "react";
import { X, Info, Clock, CheckCircle, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

const PremiumInvitationModal = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* Modal */}
      <div className="bg-[var(--bg)] w-full max-w-md rounded-3xl p-5 shadow-xl relative border border-purple-200">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-4">
          {t('premiumInvitation.title')}
        </h2>

        {/* Profile Card */}
        <div className="rounded-2xl overflow-hidden border-4 border-green-400 mb-4 relative">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
            alt="profile"
            className="w-full h-72 object-cover"
          />

          {/* Name Overlay */}
          <div className="absolute bottom-3 left-3 text-white">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">Elena</h3>
              <span className="bg-blue-500 text-white text-xs px-1 rounded">
                ✔
              </span>
            </div>
          </div>
        </div>

        {/* Coins Card */}
        <div className="bg-gray-100 rounded-2xl p-5 text-center mb-4">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-xl">
            🔒
          </div>

          <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
            🪙 99 Meons
          </h3>
          <p className="text-gray-500 text-sm">{t('premiumInvitation.service_fee')}</p>
        </div>

        {/* Policy */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-4">
          <div className="flex gap-2 items-start">
            <Info size={18} className="text-gray-500 mt-1" />
            <div>
              <h4 className="font-medium text-sm">{t('premiumInvitation.policy_title')}</h4>
              <p className="text-xs text-gray-500">
                {t('premiumInvitation.policy_desc')}
              </p>
              <span className="text-blue-500 text-xs cursor-pointer">
                {t('premiumInvitation.learn_more')}
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-100 p-4 rounded-xl text-center">
            <Clock className="mx-auto mb-2" size={18} />
            <p className="text-sm font-medium">{t('premiumInvitation.response_time')}</p>
            <p className="text-xs text-gray-500">
              {t('premiumInvitation.response_desc')}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl text-center">
            <CheckCircle className="mx-auto mb-2" size={18} />
            <p className="text-sm font-medium">{t('premiumInvitation.accepted_charged')}</p>
            <p className="text-xs text-gray-500">
              {t('premiumInvitation.accepted_desc')}
            </p>
          </div>
        </div>

        {/* Refund */}
        <div className="bg-gray-100 p-4 rounded-xl flex gap-2 items-start mb-4">
          <RotateCcw size={18} className="mt-1" />
          <div>
            <p className="text-sm font-medium">
              {t('premiumInvitation.declined_refunded')}
            </p>
            <p className="text-xs text-gray-500">
              {t('premiumInvitation.declined_desc')}
            </p>
          </div>
        </div>

        {/* Send Rose Button */}
        <div className="flex justify-center mb-4">
          <button className="bg-red-500 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition">
            {t('premiumInvitation.send_rose')}
          </button>
        </div>

        {/* Main Button */}
        <button className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-400 to-indigo-500 mb-2">
          {t('premiumInvitation.send_invitation')}
        </button>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full text-gray-500 text-sm"
        >
          {t('premiumInvitation.cancel')}
        </button>
      </div>
    </div>
  );
};

export default PremiumInvitationModal;
