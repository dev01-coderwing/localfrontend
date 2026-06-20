import React, { useState, useEffect, useCallback, useRef } from "react";
import GoScreen from "./GoScreen";
import RushSessionStart from "./RushSessionStart";
import GamePlay from "./GamePlay";
import WinScreen from "./WinScreen";
import TimeUpScreen from "./TimeUpScreen";
import { useNavigate } from "react-router-dom";
import p1ng from "/public/Image/p1.png";
import p2ng from "/public/Image/p2.png";
import p3ng from "/public/Image/p3.png";
import n1ng from "/public/Image/n1.png";
import n2ng from "/public/Image/n2.png";
import n3ng from "/public/Image/n3.png";
const DEFAULT_CONFIG = {
  duration: 15,
  targetScore: 20,
  initialEmojiCount: 18, // Ultra High Density
  refreshInterval: 500, // Ultra Fast Refresh (Streaming Effect)
  positiveRatio: 0.7,
  bonusTime: 0,
  emojis: {
    positive: [p1ng, p2ng, p3ng],
    negative: [n1ng, n2ng, n3ng],
  }
};

function RushSession() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_CONFIG.duration);
  const [emojis, setEmojis] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const timerRef = useRef(null);
  const spawnRef = useRef(null);

  const createEmoji = useCallback(() => {
    const isPositive = Math.random() > (1 - DEFAULT_CONFIG.positiveRatio);
    return {
      id: Math.random().toString(36).substr(2, 9),
      symbol: isPositive
        ? DEFAULT_CONFIG.emojis.positive[Math.floor(Math.random() * DEFAULT_CONFIG.emojis.positive.length)]
        : DEFAULT_CONFIG.emojis.negative[Math.floor(Math.random() * DEFAULT_CONFIG.emojis.negative.length)],
      type: isPositive ? "positive" : "negative",
      x: Math.random() * 88 + 6, // Maximize board usage
      y: Math.random() * 88 + 6,
      size: Math.random() * 12 + 48,
      speed: Math.random() * 0.8 + 0.8, // Ultra Fast potential
    };
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(DEFAULT_CONFIG.duration);
    setEmojis(Array.from({ length: DEFAULT_CONFIG.initialEmojiCount }, () => createEmoji()));
    setStatus("playing");
  }, [createEmoji]);

  const handleEmojiClick = useCallback((emoji) => {
    if (status !== "playing") return;

    // Instant replacement
    setEmojis(prev => prev.map(e => (e.id === emoji.id ? createEmoji() : e)));

    if (emoji.type === "positive") {
      setScore(prev => prev + 1);
      setTimeLeft(prev => Math.min(prev + DEFAULT_CONFIG.bonusTime, DEFAULT_CONFIG.duration + 5));
      setFeedback({ x: emoji.x, y: emoji.y });
      setTimeout(() => setFeedback(null), 300); // Fast feedback
    } else {
      setScore(prev => Math.max(0, prev - 1));
    }
  }, [status, createEmoji]);

  const stopTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
    timerRef.current = null;
    spawnRef.current = null;
  }, []);

  useEffect(() => {
    if (status === "playing") {
      // Main Game Timer
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.1) {
            stopTimers();
            setScore(currentScore => {
              setStatus(currentScore >= DEFAULT_CONFIG.targetScore ? "won" : "failed");
              return currentScore;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Continuous Streaming Spawn (replace 1 or 2 at a time very fast)
      spawnRef.current = setInterval(() => {
        setEmojis(prev => {
          const randomIndex = Math.floor(Math.random() * prev.length);
          const randomIndex2 = Math.floor(Math.random() * prev.length);
          return prev.map((e, idx) =>
            (idx === randomIndex || idx === randomIndex2) ? createEmoji() : e
          );
        });
      }, DEFAULT_CONFIG.refreshInterval);
    }

    return () => stopTimers();
  }, [status, stopTimers, createEmoji, score]);

  const handleExit = () => navigate("/Lanuch");

  return (
    <div className="min-h-screen bg-[var(--bg-background)] flex items-center justify-center p-4  transition-colors duration-300">
      <div className="w-full max-w-xl bg-[var(--bg-card)]/10 rounded-[40px] border border-[var(--border)] aspect-square relative overflow-hidden flex flex-col">

        {status === "idle" && <RushSessionStart onStart={startGame} />}

        {status === "playing" && (
          <GamePlay
            score={score}
            targetScore={DEFAULT_CONFIG.targetScore}
            timeLeft={timeLeft}
            totalTime={DEFAULT_CONFIG.duration}
            emojis={emojis}
            onEmojiClick={handleEmojiClick}
            feedback={feedback}
          />
        )}

        {status === "won" && (
          <WinScreen
            score={score}
            onRestart={startGame}
            onClaim={handleExit}
            onClose={handleExit}
          />
        )}

        {status === "failed" && (
          <TimeUpScreen
            score={score}
            onRestart={startGame}
            onClose={handleExit}
          />
        )}

      </div>
    </div>
  );
}

export default RushSession;
