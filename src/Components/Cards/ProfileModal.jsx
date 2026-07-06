import React from "react";
import { X, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProfileModal = ({ profile, onClose }) => {
  const { t } = useTranslation();
  const image =
    profile?.photos?.[0] ||
    profile?.profileImage ||
    "https://via.placeholder.com/300x380?text=No+Image";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      {/* Modal */}
      <div className="bg-white w-full max-w-4xl rounded-3xl p-6 relative shadow-xl border border-purple-200">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-4">{t('profileModal.title')}</h2>

        {/* Content */}
        <div className="flex gap-6">

          {/* Left Image */}
          <div className="relative w-[300px] rounded-2xl overflow-hidden">
            <img
              src={image}
              alt="profile"
              className="w-full h-[380px] object-cover"
            />

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <div className="flex items-center gap-1 text-sm text-gray-200">
                <MapPin size={14} />
                {profile?.city || t('profileModal.unknown_city')}
                {profile?.country ? `, ${profile.country}` : ""}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">

            {/* Stats */}
            <div className="flex gap-6 mb-4 text-sm">
              <span className="flex items-center gap-1 text-red-500">
                ❤️ 35%
              </span>
              <span className="flex items-center gap-1 text-pink-500">
                🍑 50%
              </span>
              <span className="flex items-center gap-1 text-purple-500">
                💀 ∞
              </span>
            </div>

            {/* Mood & Quote */}
            <div className="mb-4">
              <h4 className="font-medium mb-1">{t('profileModal.bio_label')}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {profile?.bio || t('profileModal.no_bio')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-6 flex gap-4">

          <button className="flex-1 bg-red-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg">
            {t('profileModal.send_rose')}
          </button>

          <button className="flex-1 bg-gradient-to-r from-pink-400 to-indigo-500 text-white py-3 rounded-xl shadow-lg">
            {t('profileModal.send_invitation')}
          </button>
        </div>

        {/* Upgrade */}
        <button className="w-full mt-4 border border-orange-300 text-orange-400 py-3 rounded-xl">
          {t('profileModal.upgrade_plan')}
        </button>

        {/* Cancel */}
        <p
          onClick={onClose}
          className="text-center text-gray-500 text-sm mt-3 cursor-pointer"
        >
          {t('profileModal.cancel')}
        </p>

      </div>
    </div>
  );
};

export default ProfileModal;
