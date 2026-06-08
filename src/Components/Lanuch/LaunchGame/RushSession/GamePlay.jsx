import React, { memo, useEffect, useState } from "react";

const EmojiButton = memo(({ emoji, onClick }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      // Ultra-fluid and fast drift
      setOffset({
        x: Math.sin(Date.now() / 400 * emoji.speed) * 20,
        y: Math.cos(Date.now() / 400 * emoji.speed) * 20,
      });
    }, 20); // 50fps movement
    return () => clearInterval(interval);
  }, [emoji.speed]);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(emoji);
      }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-75 transition-transform duration-75 bg-[var(--bg-card)]/10 rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.1)] flex items-center justify-center border border-[var(--border)] z-10 select-none cursor-pointer touch-none"
      style={{
        left: `${emoji.x}%`,
        top: `${emoji.y}%`,
        transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
        width: `${emoji.size}px`,
        height: `${emoji.size}px`,
        fontSize: `${emoji.size * 0.6}px`
      }}
    >
      {emoji.symbol}
    </button>
  );
});

const GamePlay = ({ score, targetScore, timeLeft, totalTime, emojis, onEmojiClick, feedback }) => {
  return (
    <div className="flex-1 flex flex-col p-8 relative select-none overflow-hidden touch-none">
      {/* HUD */}
      <div className="flex justify-between items-start z-10 w-full mb-2">
        <div className="bg-[var(--bg-card)]/10 shadow-[0_5px_15px_rgba(0,0,0,0.04)] px-6 py-3 rounded-full border border-[var(--border)]">
          <p className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider">Positive Taps</p>
          <p className="text-xl font-bold text-[var(--text-dim2)]">
            {score} <span className="opacity-40 font-medium  ">/ {targetScore}</span>
          </p>
        </div>

        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="absolute w-full h-full -rotate-90">
            <circle cx="32" cy="32" r="28" fill="none" stroke="var(--border)" strokeWidth="4" />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeDasharray="176"
              strokeDashoffset={176 - (176 * Math.max(0, timeLeft)) / totalTime}
              className="transition-all duration-1000 linear border border-[var(--accent)] rounded-full"
            />
          </svg>
          <span className="text-xs font-bold text-[var(--text-dim2)]">00:{Math.ceil(timeLeft) < 10 ? `0${Math.ceil(timeLeft)}` : Math.ceil(timeLeft)}</span>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 relative">
        {emojis.map((emoji) => (
          <EmojiButton key={emoji.id} emoji={emoji} onClick={onEmojiClick} />
        ))}

        {feedback && (
          <div
            className="absolute text-[var(--accent)] font-bold text-5xl animate-ping pointer-events-none z-30 drop-shadow-lg"
            style={{ left: `${feedback.x}%`, top: `${feedback.y - 18}%` }}
          >
            +1
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePlay;
