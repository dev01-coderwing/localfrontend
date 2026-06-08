import React from "react";

const GetReadyScreen = ({ onStart }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]">
      <div className="relative flex items-center justify-center">
        {/* Concentric rings with red accent from design */}
        <div className="absolute w-[180px] h-[180px] rounded-full border border-red-500 opacity-20 animate-ping duration-[3000ms]"></div>
        <div className="absolute w-[220px] h-[220px] rounded-full border border-red-500 opacity-10"></div>
        
        <button
          onClick={onStart}
          className="w-44 h-44 rounded-full bg-[var(--card)] border-4 border-red-500/30 flex items-center justify-center shadow-[0_20px_50px_rgba(239,68,68,0.15)] hover:scale-105 active:scale-95 transition-all z-10 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-4xl font-black text-red-500 leading-tight">Get<br />Ready!</span>
        </button>
      </div>
    </div>
  );
};

export default GetReadyScreen;
