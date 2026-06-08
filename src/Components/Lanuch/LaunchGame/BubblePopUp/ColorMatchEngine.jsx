import React, { memo, useEffect, useState, useCallback, useRef } from "react";

const COLORS = [
  { name: "red", class: "bg-red-500", hex: "#EF4444" },
  { name: "blue", class: "bg-blue-500", hex: "#3B82F6" },
  { name: "purple", class: "bg-purple-500", hex: "#A855F7" },
  { name: "gray", class: "bg-gray-400", hex: "#9CA3AF" }
];

const TargetCircle = memo(({ color }) => (
  <div className="flex flex-col items-center gap-2">
    <p className="text-red-500 text-xs font-black uppercase tracking-widest">Match</p>
    <div className={`w-14 h-14 rounded-full ${color.class} shadow-[0_10px_25px_rgba(0,0,0,0.1)] border-4 border-white animate-pulse`}></div>
  </div>
));

const InteractiveCircle = memo(({ circle, onClick }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset({
        x: Math.sin(Date.now() / 400 * circle.speed) * 15,
        y: Math.cos(Date.now() / 400 * circle.speed) * 15,
      });
    }, 20);
    return () => clearInterval(interval);
  }, [circle.speed]);

  return (
    <button
      onClick={() => onClick(circle)}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${circle.color.class} rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.1)] transition-transform duration-75 active:scale-75 hover:scale-110 border-2 border-white/20 select-none cursor-pointer touch-none`}
      style={{
        left: `${circle.x}%`,
        top: `${circle.y}%`,
        transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
        width: `${circle.size}px`,
        height: `${circle.size}px`,
      }}
    />
  );
});

const ColorMatchEngine = ({ score, targetScore, timeLeft, totalTime, targetColor, onMatch, onFail }) => {
  const [circles, setCircles] = useState([]);
  const spawnRef = useRef(null);

  const createCircle = useCallback(() => ({
    id: Math.random().toString(36).substr(2, 9),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    x: Math.random() * 85 + 7.5,
    y: Math.random() * 85 + 7.5,
    size: Math.random() * 15 + 50,
    speed: Math.random() * 1.2 + 0.8,
  }), []);

  // Sync circles on mount/status
  useEffect(() => {
    setCircles(Array.from({ length: 18 }, () => createCircle()));
  }, [createCircle]);

  // Background Streaming Spawn
  useEffect(() => {
    spawnRef.current = setInterval(() => {
      setCircles(prev => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const randomIndex2 = Math.floor(Math.random() * prev.length);
        return prev.map((c, idx) => 
          (idx === randomIndex || idx === randomIndex2) ? createCircle() : c
        );
      });
    }, 250);
    return () => clearInterval(spawnRef.current);
  }, [createCircle]);

  const handleCircleClick = (circle) => {
    // Instant replacement
    setCircles(prev => prev.map(c => (c.id === circle.id ? createCircle() : c)));
    
    if (circle.color.name === targetColor.name) {
      onMatch();
    } else {
      onFail(); // Optional penalty or just ignore
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 relative select-none overflow-hidden touch-none">
      {/* HUD & Target */}
      <div className="flex justify-between items-start z-20 w-full mb-2">
        <div className="bg-[var(--bg-card)]/10  px-6 py-3 rounded-full border border-[var(--border)]">
          <p className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider">Matched</p>
          <p className="text-xl font-bold text-[var(--text-dim)]">
            {score} <span className="opacity-40 font-medium text-[var(--text-dim)]">/ {targetScore}</span>
          </p>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 top-6">
            <TargetCircle color={targetColor} />
        </div>

        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="absolute w-full h-full -rotate-90 ">
            <circle cx="32" cy="32" r="28" fill="none" stroke="var(--border)" strokeWidth="4" />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#EF4444"
              strokeWidth="4"
              strokeDasharray="176"
              strokeDashoffset={176 - (176 * Math.max(0, timeLeft)) / totalTime}
              className="transition-all duration-1000 linear text-[var(--text-dim)]"
            />1
          </svg>
          <span className="text-xs font-bold text-[var(--text-dim)]">00:{Math.ceil(timeLeft) < 10 ? `0${Math.ceil(timeLeft)}` : Math.ceil(timeLeft)}</span>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 relative">
        {circles.map((circle) => (
          <InteractiveCircle key={circle.id} circle={circle} onClick={handleCircleClick} />
        ))}
      </div>
    </div>
  );
};

export default ColorMatchEngine;
export { COLORS };
