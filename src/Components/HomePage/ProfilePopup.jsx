import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import Voice from "/Image/Voice-coin.png";
import noto from "/Image/noto-icon.png";
import Heart from "/Image/Heart-icon.png";
import infinite from "/Image/infinet.png";
import { Infinity } from "lucide-react";
import silver from "/Image/silver-icon.png";
import RoseSendAnimation from "./RoseSendAnimation";
import "./ProfilePopup.css";
import { useDispatch } from "react-redux";
import { sendRose } from "../Redux/discoverySlice";
import { sendChatRequest } from "../Redux/chatRequestSlice";
import UpgradeModal from "../Cards/UpgradeModal";
import PremiumInvitationModal from "../Cards/PremiumInvitationModal";

const IMAGE_BASE_URL = import.meta.env.VITE_API_URL?.trim()?.replace(
  /\/api\/v1\/?$/,
  "",
);

const MotionButton = motion.button;

function ProfilePopup({ profile, onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [roseSent, setRoseSent] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [inviteError, setInviteError] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPremiumInviteModal, setShowPremiumInviteModal] = useState(false);
  const [roseAnimId, setRoseAnimId] = useState(null);
  const [roseOrigin, setRoseOrigin] = useState(null);
  const roseButtonRef = useRef(null);

  // TODO(backend): discovery profiles don't yet expose a confirmed tier field.
  // Falls back across the common field names until the API contract is confirmed.
  const isPremiumTarget = Boolean(
    profile?.isPremium ||
    profile?.premium ||
    profile?.subscriptionTier === "premium" ||
    profile?.accountType === "premium" ||
    profile?.tier === "premium",
  );
  const photos =
    profile?.photos?.length > 0
      ? profile.photos.map((photo) => `${IMAGE_BASE_URL}/${photo}`)
      : [
          profile?.profileImage
            ? `${IMAGE_BASE_URL}/${profile.profileImage}`
            : "https://via.placeholder.com/400x520?text=No+Image",
        ];
  const prevPhoto = () =>
    setCurrentPhoto((p) => (p - 1 + photos.length) % photos.length);
  const nextPhoto = () => setCurrentPhoto((p) => (p + 1) % photos.length);
  console.log("Profile:", profile);
console.log("profile.id:", profile.id);
console.log("profile.userId:", profile.userId);
console.log("profile.targetUserId:", profile.targetUserId);
  return (
    <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
      {/* Modal backdrop */}
      <div className="relative w-full max-w-xl bg-[var(--bg-background)] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <span className="text-xl font-bold text-[var(--text-dim)] tracking-tight">
            {t("profilePopup.header")}
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[var(--bg-card)]/10 flex items-center justify-center hover:bg-[var(--hover)] transition-colors"
          >
            <svg
              className="w-4 h-4 text-[var(--text-dim)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex gap-4 px-6 pb-4">
          {/* Left: Photo Card */}
          <div className="relative w-52 h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg group">
            <img
              src={photos[currentPhoto]}
              alt={profile?.fullName}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Nav arrows */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[var(--bg-card)] flex items-center justify-center shadow hover:bg-[var(--hover)] transition-all opacity-0 group-hover:opacity-100"
            >
              <svg
                className="w-3 h-3 text-[var(--text-dim)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[var(--bg-card)] flex items-center justify-center shadow hover:bg-[var(--hover)] transition-all opacity-0 group-hover:opacity-100"
            >
              <svg
                className="w-3 h-3 text-[var(--text-dim)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1">
              {photos.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    i === currentPhoto ? "w-6 bg-white" : "w-3 bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* More options dot */}
            <button className="absolute top-3 right-2 text-[var(--text-dim)] opacity-80 hover:opacity-100">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="19" r="1.5" />
              </svg>
            </button>

            {/* Name & Location */}
            <div className="absolute bottom-3 left-3">
              <div className="flex items-center gap-1">
                <span className="text-[var(--text-dim)] font-bold text-base leading-tight">
                  {" "}
                  {profile?.fullName}
                </span>
                <span className="text-base flex items-center  ">
                  <span className="text-blue-500">
                    <BadgeCheck />
                  </span>
                  <img src={Voice} alt="Voice Coin" className="w-12" />
                  <img src={silver} alt="Noto Icon" className="w-6" />
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <svg
                  className="w-3 h-3 text-[var(--text-dim)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="text-[var(--text-dim2)] text-xs">
                  {profile?.city || t("profilePopup.unknown_city")}
                  {profile?.country ? `, ${profile.country}` : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 min-w-0">
            {/* Match stats */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="flex gap-2 text-[#FF6467]">
                  <img src={Heart} alt="" className="w-8 " /> 80%
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="flex gap-2 text-[#FB64B6]">
                  <img src={noto} alt="" className="w-8" /> 50%
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="flex gap-2  text-[#C27AFF]">
                  <img src={infinite} alt="" className="w-8" />
                  <Infinity className="mt-2" />
                </span>
              </div>
            </div>

            {/* Mood & Quote */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-wider mb-1.5">
                {t("profilePopup.bio_label")}
              </p>
              <p className="text-[var(--text-dim2)] text-sm leading-relaxed">
                {" "}
                {profile?.bio || t("profilePopup.no_bio")}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-3 space-y-3">
          {/* Send Rose + Send Invitation */}
          <div className="flex gap-3">
            <MotionButton
              ref={roseButtonRef}
              onClick={async () => {
                try {
                  await dispatch(sendRose(profile.id)).unwrap();

                  setRoseSent(true);
                  console.log("Clicked");
                  const rect = roseButtonRef.current?.getBoundingClientRect();
                  console.log("Rect:", rect);

                  console.log("roseAnimId", roseAnimId);
                  if (rect) setRoseOrigin(rect);

                  setRoseAnimId(Date.now());
                } catch (error) {}
              }}
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm shadow-md ${
                roseSent
                  ? "bg-red-400 text-white"
                  : "bg-gradient-to-r from-red-300 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 hover:shadow-lg"
              }`}
            >
              <span className="text-base">🌹</span>
              {roseSent
                ? t("profilePopup.rose_sent")
                : t("profilePopup.send_rose")}
            </MotionButton>

            {roseAnimId !== null && (
              <RoseSendAnimation
                key={roseAnimId}
                origin={roseOrigin}
                onComplete={() => setRoseAnimId(null)}
              />
            )}

            <button
              onClick={async () => {
                if (inviteSent) return;

                if (isPremiumTarget) {
                  setShowPremiumInviteModal(true);
                  return;
                }

                setInviteError(null);
                try {
                  await dispatch(sendChatRequest(profile.id)).unwrap();
                  setInviteSent(true);
                } catch (error) {
                  const code = error?.code || error?.error;
                  const message = (error?.message || "").toLowerCase();
                  if (
                    code === "INSUFFICIENT_MEONS" ||
                    message.includes("meon")
                  ) {
                    setShowUpgradeModal(true);
                  } else {
                    setInviteError(
                      error?.message || "Failed to send invitation",
                    );
                  }
                }
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-md ${
                inviteSent
                  ? "bg-purple-400 text-white scale-95"
                  : "bg-gradient-to-r from-pink-400 to-indigo-500 text-white hover:from-pink-500 hover:to-indigo-600 hover:shadow-lg active:scale-95"
              }`}
            >
              {inviteSent
                ? t("profilePopup.invitation_sent")
                : t("profilePopup.send_invitation")}
            </button>
          </div>

          {inviteError && (
            <p className="text-xs text-red-500 text-center">{inviteError}</p>
          )}

          {/* Upgrade Plan */}
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="w-full py-3 rounded-2xl border border-[var(--border)] text-rose-500 font-semibold text-sm hover:bg-rose-50 transition-colors"
          >
            {t("profilePopup.upgrade_plan")}
          </button>
        </div>

        {/* Cancel */}
        <div className="pb-5 text-center">
          <button
            onClick={onClose}
            className="text-gray-500 text-sm hover:text-gray-700 transition-colors font-medium"
          >
            {t("profilePopup.cancel")}
          </button>
        </div>
      </div>

      {showPremiumInviteModal && (
        <PremiumInvitationModal
          profile={profile}
          onClose={() => setShowPremiumInviteModal(false)}
          onSent={() => setInviteSent(true)}
          onInsufficientMeons={() => setShowUpgradeModal(true)}
        />
      )}

      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}
    </div>
  );
}

export default ProfilePopup;
