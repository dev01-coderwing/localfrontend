import React from "react";
import { X, TimerOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const GameOverScreen = ({ score, onRestart, onClose }) => {
  const { t } = useTranslation();
  const handleExit = async () => {
  await dispatch(
    submitBubblePopResultThunk("LOSS")
  );

  onClose();
};
  return (
    <div className="absolute inset-0 bg-[var(--bg)]/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-sm bg-[var(--card)] rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.12)] p-10 relative flex flex-col items-center text-center border border-[var(--border)]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Timer Off Icon */}
        <div className="mb-6 mt-2">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
            <TimerOff className="w-10 h-10" />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-[38px] font-black text-red-500 mb-2">{t('bubbleGame.time_up')}</h2>

        <div className="mb-8 mt-4">
            <p className="text-[var(--text-dim2)] font-bold mb-2 italic">{t('bubbleGame.you_matched')}</p>
            <div className="flex items-baseline justify-center gap-1">
                <span className="text-[48px] font-black text-[var(--text-dim)]">{score}</span>
                <span className="text-[28px] font-bold  text-[var(--text-dim)]">{t('bubbleGame.out_of_pairs')}</span>
            </div>
            <p className="text-[var(--text-dim2)] font-medium mt-4">{t('bubbleGame.be_faster')}</p>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-4">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-red-400 to-purple-500 text-white py-5 rounded-full font-bold text-lg shadow-[0_12px_30px_rgba(239,68,68,0.25)] hover:opacity-95 transition-all transform active:scale-[0.98]"
          >
            {t('bubbleGame.try_again')}
          </button>
          <button
 onClick={handleExit}
           className="w-full bg-[var(--card)] border border-[var(--border)] text-[var(--text-dim)] py-5 rounded-full font-bold text-lg hover:bg-[var(--hover)] transition-all transform active:scale-[0.98]"
          >
            {t('bubbleGame.exit')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
