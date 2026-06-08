import React from "react";

const GoScreen = ({ onStart }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]">
      <div className="relative flex items-center justify-center">
        {/* Concentric Decorative Circles */}
        <div className="absolute w-[180px] h-[180px] rounded-full border border-[var(--accent)] opacity-20 animate-ping duration-[3000ms]"></div>
        <div className="absolute w-[220px] h-[220px] rounded-full border border-[var(--accent)] opacity-10"></div>
        <div className="absolute w-[260px] h-[260px] rounded-full border border-[var(--border)] opacity-20"></div>

        <button
          onClick={onStart}
          className="w-36 h-36 rounded-full bg-[var(--card)] border-2 border-[var(--accent)] flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95 transition-all z-10 group"
        >
          <div className="absolute inset-0 rounded-full border-4 border-[var(--accent-soft)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-5xl font-black text-[var(--text)]">Go!</span>
        </button>
      </div>
    </div>
  );
};

export default GoScreen;
