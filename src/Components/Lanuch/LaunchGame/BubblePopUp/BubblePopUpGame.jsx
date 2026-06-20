import React, { useState, useEffect, useCallback, useRef } from "react";
import GetReadyScreen from "./GetReadyScreen";
import ColorMatchEngine from "./ColorMatchEngine";
import VictoryScreen from "./VictoryScreen";
import GameOverScreen from "./GameOverScreen";
import { useNavigate } from "react-router-dom";

const CONFIG = {
  duration: 15,
  targetScore: 10, // As shown in design "8 out of 12"
};

function BubblePopUpGame() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle"); // "idle" | "playing" | "won" | "failed"
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(CONFIG.duration);
  const timerRef = useRef(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const startGame = useCallback(() => {
    stopTimer();
    setScore(0);
    setTimeLeft(CONFIG.duration);
    setStatus("playing");
  }, [stopTimer]);

  useEffect(() => {
    if (status === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.1) {
            stopTimer();
            setScore(currentScore => {
              setStatus(currentScore >= CONFIG.targetScore ? "won" : "failed");
              return currentScore;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => stopTimer();
  }, [status, stopTimer]);

  const handleMatch = useCallback(() => {
    setScore((prev) => {
      const nextScore = prev + 1;
      if (nextScore >= CONFIG.targetScore) {
        stopTimer();
        setStatus("won");
      }
      return nextScore;
    });
  }, [stopTimer]);

  const handleExit = () => navigate("/Lanuch");

  return (
    <div className="min-h-screen bg-[var(--bg-background)] flex items-center justify-center p-4 font-sans transition-colors duration-300">
      <div className="w-full max-w-2xl bg-[var(--card)] rounded-[40px] shadow-[0_25px_70px_rgba(0,0,0,0.05)] aspect-square relative overflow-hidden flex flex-col border border-[var(--border)]">
        
        {status === "idle" && <GetReadyScreen onStart={startGame} />}

        {status === "playing" && (
          <ColorMatchEngine 
            score={score}
            targetScore={CONFIG.targetScore}
            timeLeft={timeLeft}
            totalTime={CONFIG.duration}
            onMatch={handleMatch}
            onFail={() => {}} // No penalty requested
          />
        )}

        {status === "won" && (
          <VictoryScreen 
            score={score} 
            onRestart={startGame} 
            onClaim={handleExit} 
            onClose={handleExit} 
          />
        )}

        {status === "failed" && (
          <GameOverScreen 
            score={score} 
            onRestart={startGame} 
            onClose={handleExit} 
          />
        )}

      </div>
    </div>
  );
}

export default BubblePopUpGame;
