import React, { useState, useEffect, useCallback, memo } from "react";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Optimized Card Component
 * - Implements strict 3D flip structure per user specification
 * - Ensures zero layout shifts and perfect visibility
 */
const Card = memo(({ card, onClick }) => {
  return (
    <div
      className="relative aspect-square w-full [perspective:1000px] cursor-pointer"
      onClick={() => onClick(card)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-200 [transform-style:preserve-3d] ${card.isFlipped || card.isMatched ? "[transform:rotateY(180deg)]" : ""}`}
      >
        {/* BACK SIDE (Initially visible) */}
        <div
          className="absolute inset-0 bg-[#E91E63] rounded-xl flex items-center justify-center shadow-md [backface-visibility:hidden] z-20 border border-[var(--border)]"
        >
          <Heart className="w-8 h-8 text-white/20 fill-current" />
        </div>

        {/* FRONT SIDE (Emoji/Value - Revealed on flip) */}
        <div
          className="absolute inset-0 bg-white rounded-xl flex items-center justify-center shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden] z-10 border border-[#E91E63]/20"
        >
          <span className="text-3xl select-none">{card.value}</span>
        </div>
      </div>
    </div>
  );
});

const CardMatchEngine = ({ onWin, score, setScore, timeLeft, totalTime, targetScore }) => {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize Game
  const initGame = useCallback(() => {
    const uniqueIcons = ["❤️", "🌸", "✨", "🔥", "⚽", "⭐"];
    const pairList = [...uniqueIcons, ...uniqueIcons];

    // Fisher-Yates Shuffle
    const shuffled = [...pairList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setCards(shuffled.map((icon, index) => ({
      id: index,
      value: icon,
      isFlipped: false,
      isMatched: false
    })));
    setFlippedCards([]);
    setIsProcessing(false);
  }, []);

  useEffect(() => {
    if (cards.length === 0) {
      initGame();
    }
  }, [initGame, cards.length]);

  // Handle Interaction
  const handleCardClick = useCallback((clickedCard) => {
    // 1. Logic guards: No multi-processing, no re-clicks, no game over
    if (isProcessing || clickedCard.isFlipped || clickedCard.isMatched || timeLeft <= 0) return;
    if (flippedCards.length >= 2) return;

    // 2. Instant visual flip
    setCards(prev => prev.map(c => c.id === clickedCard.id ? { ...c, isFlipped: true } : c));

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    // 3. Comparison logic
    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [first, second] = newFlipped;

      if (first.value === second.value) {
        // MATCH!
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            (c.id === first.id || c.id === second.id) ? { ...c, isMatched: true, isFlipped: false } : c
          ));
          setScore(s => s + 1);
          setFlippedCards([]);
          setIsProcessing(false);
        }, 120); // Fast resolve
      } else {
        // MISMATCH!
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            (c.id === first.id || c.id === second.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setIsProcessing(false);
        }, 180); // Ultra-fast reset (100-200ms per user request)
      }
    }
  }, [isProcessing, flippedCards, timeLeft, setScore]);

  // Win Condition
  useEffect(() => {
    if (score === targetScore && targetScore > 0) {
      onWin();
    }
  }, [score, targetScore, onWin]);

  return (
    <div className="flex-1 flex flex-col p-6 relative select-none max-w-lg mx-auto w-full bg-[var(--bg-card)]/10">
      {/* Branding */}
      <div className="absolute top-4 left-6">
        <h2 className="text-[var(--text-dim)] font-bold text-sm uppercase opacity-50">{t('heartMemory.brand_label')}</h2>
      </div>

      {/* HUD */}
      <div className="flex justify-between items-start z-10 w-full mb-8 pt-6">
        <div className="bg-[var(--bg-card)]/10 backdrop-blur shadow-sm px-5 py-2 rounded-2xl border border-[var(--border)]">
          <p className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-widest mb-0.5">{t('heartMemory.pairs_found')}</p>
          <p className="text-lg font-black text-[#E91E63]">
            {score} <span className="text-xs opacity-20">/ {targetScore}</span>
          </p>
        </div>

        {/* Timer */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="absolute w-full h-full -rotate-90">
            <circle cx="28" cy="28" r="24" fill="none" stroke="#F1F5F9" strokeWidth="3" />
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="#E91E63"
              strokeWidth="3"
              strokeDasharray="150"
              strokeDashoffset={150 - (150 * Math.max(0, timeLeft)) / totalTime}
              className="transition-all duration-1000 linear"
            />
          </svg>
          <span className="text-[10px] font-black text-[#E91E63]">
            00:{Math.ceil(timeLeft) < 10 ? `0${Math.ceil(timeLeft)}` : Math.ceil(timeLeft)}
          </span>
        </div>
      </div>

      {/* Corrected Grid System */}
      <div className="grid grid-cols-4 gap-4 w-full">
        {cards.map(card => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default CardMatchEngine;
