import React from "react";
import { X, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeartMemoryVictory = ({ score, onClaim, onRestart, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="absolute inset-0 bg-[#FEF9F3]/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-sm bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 relative flex flex-col items-center text-center border border-gray-100">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Heart Icon */}
        <div className="mb-6 mt-4">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-[#E91E63]">
                <Heart className="w-8 h-8 fill-current" />
            </div>
        </div>

        {/* Text Content */}
        <h2 className="text-[32px] font-black text-[#E91E63] mb-1">{t('heartMemory.victory_title')}</h2>
        <p className="text-gray-800 font-bold mb-8 italic">{t('heartMemory.victory_msg')}</p>

        {/* Rewards Section */}
        <div className="w-full bg-pink-50/50 rounded-[24px] p-6 mb-8 border border-pink-100/50">
          <p className="text-[#E91E63] text-[12px] font-bold mb-3 uppercase tracking-widest">{t('heartMemory.rewards_unlocked')}</p>
          <div className="flex items-center justify-center gap-3">
            <img src="/Image/Coin.png" alt="Coin" className="w-8 h-8 object-contain" />
            <span className="text-[28px] font-black text-gray-800">{t('heartMemory.meons_reward')}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={() => navigate("/homepage")}
            className="w-full bg-gradient-to-r from-[#D79098] to-[#5F7BF4] text-white py-4.5 rounded-full font-bold text-lg shadow-[0_10px_25px_rgba(95,123,244,0.3)] hover:opacity-95 transition-all transform active:scale-[0.98]"
          >
            {t('heartMemory.claim_reward')}
          </button>
          <button
            onClick={onRestart}
            className="w-full bg-white border border-[#E91E63]/20 text-gray-400 py-4.5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all transform active:scale-[0.98]"
          >
            {t('heartMemory.play_again')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeartMemoryVictory;


