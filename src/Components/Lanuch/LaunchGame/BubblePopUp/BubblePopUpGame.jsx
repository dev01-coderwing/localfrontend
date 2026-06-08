import React, { useState, useEffect, useCallback, useRef } from "react";
import GetReadyScreen from "./GetReadyScreen";
import ColorMatchEngine, { COLORS } from "./ColorMatchEngine";
import VictoryScreen from "./VictoryScreen";
import GameOverScreen from "./GameOverScreen";
import { useNavigate } from "react-router-dom";

const CONFIG = {
  duration: 15,
  targetScore: 12, // As shown in design "8 out of 12"
};

function BubblePopUpGame() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle"); // "idle" | "playing" | "won" | "failed"
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(CONFIG.duration);
  const [targetColor, setTargetColor] = useState(COLORS[0]);
  
  const timerRef = useRef(null);

  const selectNewTarget = useCallback(() => {
    setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(CONFIG.duration);
    selectNewTarget();
    setStatus("playing");
  }, [selectNewTarget]);

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

  const handleMatch = () => {
    setScore(prev => {
      const newScore = prev + 1;
      // Change target color occasionally to keep it challenging
      if (newScore % 3 === 0) selectNewTarget();
      return newScore;
    });
  };

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
            targetColor={targetColor}
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
