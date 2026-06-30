import React from "react";
import Navbar from "../Navbar/Navbar";
import Right from "../../Components/UserProfile/layout/Right";
import ConvertToMeonsModal from "./ConvertToMeonsModal";
import PaymentMethodModal from "./PaymentMethodModal";
import SecureCheckoutModal from "./SecureCheckoutModal";
import PaymentSuccessModal from "./PaymentSuccessModal";
import PaymentFailedModal from "./PaymentFailedModal";
import InviteFriendsModal from "./InviteFriendsModal";
import InviteConnectionsModal from "./InviteConnectionsModal";
import ShareInviteModal from "./ShareInviteModal";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  ArrowLeft,
  Heart,
  Star,
  Eye,
  Clock3,
  FileText,
  UserPlus,
  BadgePercent,
  Gift,
} from "lucide-react";



const RealCurrencyWallet = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const earnItems = [
    {
      icon: <UserPlus size={18} />,
      title: "Invite a friend",
      desc: "Share your unique referral link",
    },
    {
      icon: <Heart size={18} />,
      title: "Friend subscribes",
      desc: "When they join the premium community",
    },
    {
      icon: <Gift size={18} />,
      title: "Friend gets 10% discount",
      desc: "An instant welcome gift for them",
    },
    {
      icon: <BadgePercent size={18} />,
      title: "You earn 10% cashback",
      desc: "Credited directly to this wallet",
    },
  ];

  const usageItems = [
    {
      icon: <Heart size={18} className="text-pink-500" />,
      label: "buy Meons",
      bg: "bg-pink-100",
    },
    {
      icon: <Star size={18} className="text-blue-500" />,
      label: "Upgrade Subscription",
      bg: "bg-blue-100",
    },
    {
      icon: <Eye size={18} className="text-purple-500" />,
      label: "Lucascope",
      bg: "bg-purple-100",
    },
    {
      icon: <Clock3 size={18} className="text-yellow-500" />,
      label: "Q-Bonus / Lucas Time",
      bg: "bg-yellow-100",
    },
    {
      icon: <FileText size={18} className="text-gray-500" />,
      label: "Letters",
      bg: "bg-gray-100",
    },
  ];

 const [showConvertModal, setShowConvertModal] =
  useState(false);

const [showPaymentMethod, setShowPaymentMethod] =
  useState(false);

const [showSecureCheckout, setShowSecureCheckout] =
  useState(false);

const [showPaymentSuccess, setShowPaymentSuccess] =
  useState(false);

const [showPaymentFailed, setShowPaymentFailed] =
  useState(false);

const [showInviteFriends, setShowInviteFriends] =
  useState(false);

const [showInviteConnections, setShowInviteConnections] =
  useState(false);

const [showShareInvite, setShowShareInvite] =
  useState(false);
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2">

          <div className="bg-[var(--card)] rounded-[24px] p-6 shadow-sm border border-[var(--border)]">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6">

              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full bg-[var(--bg)] flex items-center justify-center shadow-sm"
              >
                <ArrowLeft size={18} />
              </button>

              <h2 className="text-2xl font-semibold text-[var(--text)]">
                {t('realCurrencyWallet.setting')}
              </h2>
            </div>

            {/* TITLE */}
            <h3 className="text-sm font-semibold text-[var(--text-dim)] mb-4">
              {t('realCurrencyWallet.real_currency_wallet')}
            </h3>

            {/* WALLET CARD */}
       {/* WALLET CARD */}
<div className="relative overflow-hidden rounded-[22px] h-[220px] bg-black p-6 flex flex-col justify-between">

  {/* BACKGROUND IMAGE */}
  <img
    src="/Image/addbalacebackground.png"
    alt="wallet-bg"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/35"></div>

  {/* CONTENT */}
  <div className="relative z-10">

    <p className="text-white/70 text-xs tracking-wide">
      {t('realCurrencyWallet.available_balance')}
    </p>

    <h1 className="text-5xl font-bold text-white mt-2">
      € 18.96
    </h1>
  </div>

  {/* BUTTON */}
  <div className="relative z-10 flex justify-end">
    <button
  onClick={() => setShowConvertModal(true)}
  className="px-4 py-2 rounded-full bg-[#4F6EF7] text-white text-sm"
>
  {t('realCurrencyWallet.add_balance')}
</button>
  </div>
</div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-2 gap-4 mt-5">

              <button className="py-3 rounded-full bg-gradient-to-r from-[#D79098] to-[#5F7BF4] text-white font-medium">
                {t('realCurrencyWallet.use_in_store')}
              </button>

              <button
  onClick={() => setShowConvertModal(true)}
  className="py-3 rounded-full border border-purple-300 text-purple-500 font-medium"
>
  {t('realCurrencyWallet.convert_to_meons')}
</button>
            </div>

            {/* HOW TO EARN */}
            <div className="mt-8">

              <h4 className="text-sm font-semibold text-[var(--text-dim)] mb-4">
                {t('realCurrencyWallet.how_to_earn')}
              </h4>

              <div className="bg-[var(--bg)] rounded-[22px] p-6 border border-[var(--border)]">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                  {earnItems.map((item, index) => (
                    <div
                      key={index}
                      className="text-center flex flex-col items-center"
                    >

                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                        {item.icon}
                      </div>

                      <h4 className="text-sm font-semibold text-[var(--text)]">
                        {t(`realCurrencyWallet.earn_${index}_title`)}
                      </h4>

                      <p className="text-[11px] text-[var(--text-dim)] mt-1 leading-4">
                        {t(`realCurrencyWallet.earn_${index}_desc`)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* INVITE BUTTON */}
                <button
  onClick={() => setShowInviteFriends(true)}
  className="w-full mt-8 py-3 rounded-full bg-gradient-to-r from-[#D79098] to-[#5F7BF4] text-white font-medium"
>
  {t('realCurrencyWallet.invite_friends')}
</button>
              </div>
            </div>

            {/* WHERE YOU CAN USE */}
            <div className="mt-8">

              <h4 className="text-sm font-semibold text-[var(--text-dim)] mb-4">
                {t('realCurrencyWallet.where_can_use')}
              </h4>

              <div className="bg-[var(--bg)] rounded-[22px] p-6 border border-[var(--border)]">

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

                  {usageItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center"
                    >

                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${item.bg}`}
                      >
                        {item.icon}
                      </div>

                      <p className="text-xs font-medium text-[var(--text)] leading-4">
                        {t(`realCurrencyWallet.use_${index}_label`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div>
          <Right />
        </div>
      </div>
{/* CONVERT */}
{showConvertModal && (
  <ConvertToMeonsModal
    onClose={() => setShowConvertModal(false)}
    onContinue={() => {
      setShowConvertModal(false);
      setShowPaymentMethod(true);
    }}
  />
)}

{/* PAYMENT METHOD */}
{showPaymentMethod && (
  <PaymentMethodModal
    onClose={() => setShowPaymentMethod(false)}
    onContinue={() => {
      setShowPaymentMethod(false);
      setShowSecureCheckout(true);
    }}
  />
)}

{/* SECURE CHECKOUT */}
{showSecureCheckout && (
  <SecureCheckoutModal
    onClose={() => setShowSecureCheckout(false)}
    onSuccess={() => {
      setShowSecureCheckout(false);
      setShowPaymentSuccess(true);
    }}
    onFailed={() => {
      setShowSecureCheckout(false);
      setShowPaymentFailed(true);
    }}
  />
)}

{/* PAYMENT SUCCESS */}
{showPaymentSuccess && (
  <PaymentSuccessModal
    onClose={() => setShowPaymentSuccess(false)}
  />
)}

{/* PAYMENT FAILED */}
{showPaymentFailed && (
  <PaymentFailedModal
    onClose={() => setShowPaymentFailed(false)}
  />
)}

{/* INVITE FRIENDS */}
{showInviteFriends && (
  <InviteFriendsModal
    onClose={() => setShowInviteFriends(false)}
  />
)}

{/* INVITE CONNECTIONS */}
{showInviteConnections && (
  <InviteConnectionsModal
    onClose={() => setShowInviteConnections(false)}
  />
)}

{/* SHARE INVITE */}
{showShareInvite && (
  <ShareInviteModal
    onClose={() => setShowShareInvite(false)}
  />
)}

    </div>
  );
};

export default RealCurrencyWallet;
