import React, { memo, useEffect, useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

const COLORS = [
  { name: "red", class: "bg-red-500", hex: "#EF4444" },
  { name: "blue", class: "bg-blue-500", hex: "#3B82F6" },
  { name: "purple", class: "bg-purple-500", hex: "#A855F7" },
  { name: "gray", class: "bg-gray-400", hex: "#9CA3AF" }
];

const InteractiveCircle = memo(({ circle, isSelected, onClick }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset({
        x: Math.sin((Date.now() / 400) * circle.speed) * 15,
        y: Math.cos((Date.now() / 400) * circle.speed) * 15,
      });
    }, 20);
    return () => clearInterval(interval);
  }, [circle.speed]);

  return (
    <button
      type="button"
      onClick={() => onClick(circle)}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${circle.color.class} rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition-transform duration-150 active:scale-90 hover:scale-105 border-2 border-white/20 select-none cursor-pointer touch-none ${isSelected ? "ring-4 ring-white/80 scale-105 shadow-[0_0_0_10px_rgba(255,255,255,0.2)]" : ""}`}
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

const ColorMatchEngine = ({ score = 0, targetScore = 10, timeLeft = 0, totalTime = 0, onMatch = () => {}, onFail = () => {} }) => {
  const { t } = useTranslation();
  const createCircle = useCallback(() => ({
    id: Math.random().toString(36).substr(2, 9),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    x: Math.random() * 85 + 7.5,
    y: Math.random() * 85 + 7.5,
    size: Math.random() * 15 + 50,
    speed: Math.random() * 1.2 + 0.8,
  }), []);

  const [circles, setCircles] = useState(() => Array.from({ length: 18 }, () => createCircle()));
  const [firstSelectionId, setFirstSelectionId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedCircleIds = useMemo(
    () => [firstSelectionId].filter(Boolean),
    [firstSelectionId]
  );

  const handleCircleClick = useCallback(
    (circle) => {
      if (timeLeft <= 0 || isProcessing) return;
      if (!firstSelectionId) {
        setFirstSelectionId(circle.id);
        return;
      }
      if (circle.id === firstSelectionId) return;

      const firstCircle = circles.find((c) => c.id === firstSelectionId);
      if (!firstCircle) {
        setFirstSelectionId(circle.id);
        return;
      }

      setIsProcessing(true);
      const matched = firstCircle.color.name === circle.color.name;

      if (matched) {
        setCircles((prev) =>
          prev.map((c) =>
            c.id === firstSelectionId || c.id === circle.id ? createCircle() : c
          )
        );
        onMatch();
      } else {
        onFail();
      }

      setFirstSelectionId(null);
      setIsProcessing(false);
    },
    [circles, createCircle, firstSelectionId, isProcessing, onFail, onMatch, timeLeft]
  );

  const scoreLabel = useMemo(
    () => `${score} / ${targetScore}`,
    [score, targetScore]
  );

  return (
    <div className="flex-1 flex flex-col p-8 relative select-none overflow-hidden touch-none">
      <div className="flex justify-between items-start z-20 w-full mb-2">
        <div className="bg-[var(--bg-card)]/10 px-6 py-3 rounded-full border border-[var(--border)]">
          <p className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-wider">{t('bubbleGame.matched')}</p>
          <p className="text-xl font-bold text-[var(--text-dim)]">{scoreLabel}</p>
        </div>

        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="absolute w-full h-full -rotate-90">
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
              className="transition-all duration-1000 linear"
            />
          </svg>
          <span className="text-xs font-bold text-[var(--text-dim)]">
            00:{Math.ceil(timeLeft) < 10 ? `0${Math.ceil(timeLeft)}` : Math.ceil(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none">
          <p className="bg-[var(--bg-card)]/90 px-4 py-2 rounded-full text-xs uppercase tracking-[0.32em] font-bold text-[var(--text-dim)] border border-[var(--border)] shadow-sm">
            {t('bubbleGame.match_instruction')}
          </p>
        </div>

        {circles.map((circle) => (
          <InteractiveCircle
            key={circle.id}
            circle={circle}
            isSelected={selectedCircleIds.includes(circle.id)}
            onClick={handleCircleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorMatchEngine;
export { COLORS };
