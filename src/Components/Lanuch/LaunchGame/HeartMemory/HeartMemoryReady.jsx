import React from "react";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeartMemoryReady = ({ onStart }) => {
  const { t } = useTranslation();
  return (
    <div className="absolute inset-0 flex flex-col bg-[var(--bg-card)]/10">
      {/* Brand Header */}
      <div className="p-8 text-left">
        <h2 className="text-[var(--text-dim)] font-bold text-lg">{t('heartMemory.brand_label')}</h2>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <button
          onClick={onStart}
          className="relative flex items-center justify-center group hover:scale-105 transition-transform duration-300 active:scale-95"
        >
          {/* Heart Outline Shape */}
          <div className="relative">
            <Heart
              className="w-48 h-48 text-[#E91E63] stroke-[1.5]"
              fill="none"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[32px] font-black text-[#E91E63] mt-[-4px]">{t('heartMemory.ready_text')}</span>
            </div>
          </div>

          {/* Subtle Decorative Aura */}
          <div className="absolute inset-0 bg-[#E91E63]/5 blur-3xl rounded-full scale-150 -z-10 group-hover:bg-[#E91E63]/10 transition-colors"></div>
        </button>
      </div>
    </div>
  );
};

export default HeartMemoryReady;
