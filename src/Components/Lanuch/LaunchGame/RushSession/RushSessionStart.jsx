import React from "react";
import { Timer, Target, XCircle } from "lucide-react";

const RushSessionStart = ({ onStart }) => {
  return (
    <div className="absolute inset-0 bg-[var(--card)] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Game Logo/Header */}
      <div className="text-center mb-10">
        <h1 className=" font-black text-[var(--text-dim)] leading-tight mb-1">Rush Session</h1>
        <p className="text-[var(--text-dim2)] font-bold text-sm uppercase tracking-widest opacity-80">Top Only Positive Emojis</p>
      </div>

      {/* Floating Emojis Decor */}
      <div className="relative w-full h-40 mb-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="text-6xl animate-bounce" style={{ animationDuration: '3s' }}>😊</span>
        </div>
        <div className="absolute left-[30%] top-1/4 animate-pulse">
            <span className="text-3xl">😄</span>
        </div>
        <div className="absolute right-[30%] top-1/3 animate-pulse" style={{ animationDelay: '1s' }}>
            <span className="text-4xl">😎</span>
        </div>
        <div className="absolute left-[40%] bottom-0 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
            <span className="text-4xl">❤️</span>
        </div>
        <div className="absolute right-[35%] bottom-4 opacity-30 grayscale rotate-12">
            <span className="text-3xl">💔</span>
        </div>
        <div className="absolute right-[20%] top-1/2 opacity-20 text-xl grayscale">
            <span className="">😢</span>
        </div>
      </div>

      {/* Game Rules Card */}
      <div className="w-full max-w-sm bg-[var(--bg-card)]/10 rounded-[32px] p-8  border border-[var(--border)] mb-12">
        <h3 className="text-[var(--text-dim2)]  text-xs uppercase tracking-widest mb-6">Game Rules</h3>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400">
              <Timer className="w-4 h-4 fill-current" />
            </div>
            <p className="text-[var(--text-dim2)] font-black text-sm uppercase">10 second challenge</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400">
              <Target className="w-4 h-4" />
            </div>
            <p className="text-[#EE2B4B] font-black text-sm uppercase">Tap 20 Positive emojis</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400">
              <XCircle className="w-4 h-4" />
            </div>
            <p className="text-[var(--text-dim2)] font-black text-sm uppercase">Avoid negative emojis</p>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="w-full max-w-sm bg-gradient-to-r from-[#D79098] to-[#5F7BF4] text-white py-5 rounded-2xl font-black text-lg "
      >
        Start Game
      </button>
    </div>
  );
};

export default RushSessionStart;
