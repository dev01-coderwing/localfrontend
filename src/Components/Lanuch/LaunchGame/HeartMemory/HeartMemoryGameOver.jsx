import React from "react";
import { X, HeartOff } from "lucide-react";

const HeartMemoryGameOver = ({ score, onRestart, onClose }) => {
  return (
    <div className="absolute inset-0 bg-[var(--bg-card)]/10 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-sm bg-[var(--bg-card)]/10 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 relative flex flex-col items-center text-center border border-[var(--border)]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[var(--text-dim)] hover:text-[var(--text-foreground)] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Heart Off Icon */}
        <div className="mb-6 mt-4">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-card)]/10 flex items-center justify-center text-[var(--text-dim)]">
            <HeartOff className="w-8 h-8" />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-[32px] font-black text-[#E91E63] mb-6">Time Up!</h2>
        
        <div className="mb-8">
            <div className="inline-block bg-[var(--bg-card)]/10 px-4 py-1.5 rounded-full border border-[var(--border)] mb-4">
                <span className="text-[var(--text-dim)] bg-[var(--bg-card)]/10 font-bold text-xs uppercase">You found {score} out of 6 pairs</span>
            </div>
            
            <p className="text-[var(--text-dim)] font-medium text-sm leading-relaxed px-4">
                Love takes time, but your memory can be faster!<br />
                <span className="font-bold text-[var(--text-dim2)]">Try Again and sharpen your memory!</span>
            </p>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-[#D79098] to-[#5F7BF4] text-white py-4.5 rounded-full font-bold text-lg shadow-[0_10px_25px_rgba(95,123,244,0.3)] hover:opacity-95 transition-all transform active:scale-[0.98]"
          >
            Try Again
          </button>
          <button
            onClick={onClose}
            className="w-full bg-white border border-[#E91E63]/20 text-gray-400 py-4.5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all transform active:scale-[0.98]"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeartMemoryGameOver;
