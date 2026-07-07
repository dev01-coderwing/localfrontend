import React from "react";
import { Check, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Complete({
  userName,
  age = 25,
  trustScore = 100,
  profileImage,
  onGoToProfile,
}) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const displayName = userName ?? user?.fullName ?? "";
  return (
    <div className="min-h-dvh bg-[var(--bg-background)] overflow-hidden">
      <div className="max-w-md mx-auto h-dvh flex flex-col px-4 py-4">

        {/* Content Card */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[var(--bg-card)]/10 rounded-3xl px-6 py-6">

          {/* Success Icon */}
          <div className="w-24 h-24 rounded-full bg-[#E5E7EB] flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#4F7DF3] flex items-center justify-center">
              <Check
                size={24}
                className="text-white"
                strokeWidth={3}
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-[28px] font-bold text-[var(--text-dim)] mt-4 text-center whitespace-nowrap">
            {t('complete.verification_complete')}
          </h1>

          {/* Description */}
          <p className="text-center text-[var(--text-dim2)] text-sm leading-6 mt-3 max-w-[320px]">
            {t('complete.description')}
          </p>

          {/* Profile Card */}
          <div className="mt-4 bg-[var(--bg-card)] rounded-2xl shadow-lg p-3 w-[140px]">

            <div className="bg-white rounded-xl overflow-hidden">
              <img
                src={
                  profileImage ||
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43"
                }
                alt="Profile"
                className="w-full h-32 object-cover"
              />
            </div>

            <div className="mt-2 flex items-center gap-1">
              <span className="text-[var(--text-dim)] text-sm font-semibold truncate">
                {displayName}, {age}
              </span>

              <div className="w-4 h-4 rounded-full bg-[#4F7DF3] flex items-center justify-center shrink-0">
                <Check
                  size={10}
                  className="text-white"
                  strokeWidth={3}
                />
              </div>
            </div>

          </div>

          {/* Trust Score */}
          <div className="mt-4 bg-[var(--bg-card)]/20 rounded-xl shadow-sm px-4 py-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
              <Heart
                size={14}
                className="text-pink-500 fill-pink-500"
              />
            </div>

            <span className="text-sm font-semibold text-[var(--text-dim)]">
              {t('complete.trust_score', { score: trustScore })}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={onGoToProfile}
            className="w-full mt-6 h-11 rounded-lg text-white font-medium bg-gradient-to-r from-[#D58AA2] to-[#566CF5]"
          >
            {t('complete.go_to_profile')}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Complete;
