import React, { useState } from "react";
import { X, Info, Clock, CheckCircle, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { sendChatRequest } from "../Redux/chatRequestSlice";
import { sendRose } from "../Redux/discoverySlice";

const IMAGE_BASE_URL = import.meta.env.VITE_API_URL?.trim()?.replace(/\/api\/v1\/?$/, "");

// Flat platform policy for escrowed premium invitations (see upgradeModal.description).
// This is a fixed display label, not a frontend-computed value.
const ESCROW_MEONS = 20;

const PremiumInvitationModal = ({ profile, onClose, onSent, onInsufficientMeons }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [roseSending, setRoseSending] = useState(false);
  const [roseSent, setRoseSent] = useState(false);

  const photo = profile?.photos?.length > 0
    ? `${IMAGE_BASE_URL}/${profile.photos[0]}`
    : profile?.profileImage
    ? `${IMAGE_BASE_URL}/${profile.profileImage}`
    : "https://via.placeholder.com/400x520?text=No+Image";

  const handleSendRose = async () => {
    if (roseSending || roseSent || !profile?.id) return;
    setRoseSending(true);
    try {
      await dispatch(sendRose(profile.id)).unwrap();
      setRoseSent(true);
    } catch (err) {
      // Rose failures are non-blocking for the invitation flow.
    } finally {
      setRoseSending(false);
    }
  };

  const handleSendInvitation = async () => {
    if (sending || !profile?.id) return;
    setError(null);
    setSending(true);
    try {
      await dispatch(sendChatRequest(profile.id)).unwrap();
      onSent?.();
      onClose?.();
    } catch (err) {
      const code = err?.code || err?.error;
      const message = (err?.message || "").toLowerCase();
      if (code === "INSUFFICIENT_MEONS" || message.includes("meon")) {
        onClose?.();
        onInsufficientMeons?.();
      } else {
        setError(err?.message || "Failed to send invitation");
      }
    } finally {
      setSending(false);
    }
  };

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
            src={photo}
            alt={profile?.fullName}
            className="w-full h-72 object-cover"
          />

          {/* Name Overlay */}
          <div className="absolute bottom-3 left-3 text-white">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{profile?.fullName}</h3>
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
            🪙 {ESCROW_MEONS} Meons
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
                {t('premiumInvitation.policy_desc', {
                  name: profile?.fullName || t('premiumInvitation.policy_desc_fallback'),
                })}
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

        {error && (
          <p className="text-xs text-red-500 text-center mb-3">{error}</p>
        )}

        {/* Send Rose Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleSendRose}
            disabled={roseSending || roseSent}
            className="bg-red-500 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition disabled:opacity-60 disabled:hover:scale-100"
          >
            {roseSent ? t('premiumInvitation.rose_sent') : t('premiumInvitation.send_rose')}
          </button>
        </div>

        {/* Main Button */}
        <button
          onClick={handleSendInvitation}
          disabled={sending}
          className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-400 to-indigo-500 mb-2 disabled:opacity-60"
        >
          {sending ? t('premiumInvitation.sending') : t('premiumInvitation.send_invitation')}
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
