import React from "react";
import { VolumeX, AlertTriangle, Ban } from "lucide-react";
import { useTranslation } from "react-i18next";

const ActionCard = ({ icon, title, desc, primaryText }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 w-[300px] shadow-lg text-center">

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-2">{desc}</p>

      {/* Buttons */}
      <div className="flex justify-between gap-3 mt-6">
        <button className="w-full border border-red-300 text-red-400 py-2 rounded-lg hover:bg-red-50 transition">
          {t('cards.cancel')}
        </button>

        <button className="w-full bg-gradient-to-r from-pink-400 to-blue-500 text-white py-2 rounded-lg hover:opacity-90 transition">
          {primaryText}
        </button>
      </div>
    </div>
  );
};

const Cards = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-[#0b0213] to-black flex items-center justify-center gap-6 flex-wrap p-6">

      {/* Mute */}
      <ActionCard
        icon={<VolumeX className="text-gray-500" />}
        title={t('cards.mute_title')}
        desc={t('cards.mute_desc')}
        primaryText={t('cards.mute_button')}
      />

      {/* Report */}
      <ActionCard
        icon={<AlertTriangle className="text-red-400" />}
        title={t('cards.report_title')}
        desc={t('cards.report_desc')}
        primaryText={t('cards.report_button')}
      />

      {/* Block */}
      <ActionCard
        icon={<Ban className="text-gray-500" />}
        title={t('cards.block_title')}
        desc={t('cards.block_desc')}
        primaryText={t('cards.block_button')}
      />
    </div>
  );
};

export default Cards;
