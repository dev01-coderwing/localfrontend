import React, { useState, useEffect, useCallback, useRef } from "react";
import HeartMemoryReady from "./HeartMemoryReady";
import CardMatchEngine from "./CardMatchEngine";
import HeartMemoryVictory from "./HeartMemoryVictory";
import HeartMemoryGameOver from "./HeartMemoryGameOver";
import { useNavigate } from "react-router-dom";

const CONFIG = {
  duration: 15,
  targetScore: 6, // 6 pairs for 4x3 grid
};

function HeartMemoryGame() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(CONFIG.duration);

  const timerRef = useRef(null);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(CONFIG.duration);
    setStatus("playing");
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  useEffect(() => {
    if (status === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.1) {
            stopTimer();
            setStatus("failed"); // Check win in Engine
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => stopTimer();
  }, [status, stopTimer]);

  const handleWin = useCallback(() => {
    stopTimer();
    setStatus("won");
  }, [stopTimer]);

  const handleExit = () => navigate("/Lanuch");

  return (
    <div className="min-h-screen bg-[var(--bg-background)] flex items-center justify-center p-4 font-sans transition-colors duration-300">
      <div className="w-full max-w-2xl bg-[var(--bg-card)]/10 rounded-[40px] shadow-[0_25px_70px_rgba(0,0,0,0.05)] aspect-square relative overflow-hidden flex flex-col border border-[var(--border)]">

        {status === "idle" && <HeartMemoryReady onStart={startGame} />}

        {status === "playing" && (
          <CardMatchEngine
            score={score}
            setScore={setScore}
            targetScore={CONFIG.targetScore}
            timeLeft={timeLeft}
            totalTime={CONFIG.duration}
            onWin={handleWin}
          />
        )}

        {status === "won" && (
          <HeartMemoryVictory
            score={score}
            onRestart={startGame}
            onClaim={handleExit}
            onClose={handleExit}
          />
        )}

        {status === "failed" && (
          <HeartMemoryGameOver
            score={score}
            onRestart={startGame}
            onClose={handleExit}
          />
        )}

      </div>
    </div>
  );
}

export default HeartMemoryGame;
