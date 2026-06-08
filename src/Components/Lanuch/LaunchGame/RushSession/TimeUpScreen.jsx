import React from "react";
import { X, TimerOff } from "lucide-react";

const TimeUpScreen = ({ score, onRestart, onClose }) => {
  return (
    <div className="absolute inset-0 bg-[var(--bg)]/10 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-sm bg-[var(--card)] rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-8 relative flex flex-col items-center text-center border border-[var(--border)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Icon */}
        <div className="mb-6 mt-4">
          <div className="w-20 h-20 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
            <TimerOff className="w-10 h-10" />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-[36px] font-black text-[var(--text-dim)] mb-2">Time Up!</h2>
        <p className="text-[var(--text-dim2)] font-bold mb-8 italic">You tapped</p>

        <div className="mb-8">
          <span className="text-[44px] font-black text-[var(--text-dim)]">{score}</span>
          <span className="text-[32px] font-bold opacity-30 text-[var(--text-dim)]">/20</span>
          <p className="text-[var(--text-dim2)] font-medium mt-2">Try again and beat the<br />clock!</p>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-[#D79098] to-[#5F7BF4] text-white py-4.5 rounded-full font-bold text-lg "
          >
            Try Again
          </button>
          <button
            onClick={onClose}
            className="w-full bg-[var(--card)] border border-[var(--border)] text-[var(--text-dim)] py-4.5 rounded-full "
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeUpScreen;
