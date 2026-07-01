import React from "react";
import Navbar from "../../../Navbar/Navbar";
import { Timer, Target, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BubblePairFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const rules = [
    {
      id: 1,
      icon: <Timer className="w-5 h-5 text-[#E91E63]" />,
      text: t('bubbleGame.rule_time'),
    },
    {
      id: 2,
      icon: <Target className="w-5 h-5 text-[#E91E63]" />,
      text: t('bubbleGame.rule_pairs'),
    },
    {
      id: 3,
      icon: <XCircle className="w-5 h-5 text-[#E91E63]" />,
      text: t('bubbleGame.rule_avoid'),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center  p-4 bg-[var(--bg-background)] transition-colors duration-300">
        <div className="w-full max-w-xl bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-12 py-16 text-center relative overflow-hidden">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-semibold text-[#E11D48] leading-tight mb-2 tracking-tight">
              {t('bubbleGame.title')}
            </h1>
            <p className="text-[#E11D48] text-[15px] font-bold tracking-normal opacity-90">
              {t('bubbleGame.subtitle')}
            </p>
          </div>

          {/* Rules Section */}
          <div className="bg-[var(--bg-card)]/10 rounded-[24px] p-8 max-w-[340px] mx-auto mb-16 text-left border border-[var(--border)]">
            <h2 className="text-[var(--text-dim)] text-[11px] font-bold mb-8 uppercase tracking-[0.1em]">
              {t('bubbleGame.game_rules')}
            </h2>
            <div className="space-y-7">
              {rules.map((rule) => (
                <div key={rule.id} className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-full bg-[#FFF1F2] flex items-center justify-center flex-shrink-0 shadow-sm">
                    {rule.icon}
                  </div>
                  <span className="text-[#E11D48] font-bold text-[15px]">
                    {rule.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Start Game Button */}
          <button
            onClick={() => navigate("/voiceAnalysis/colormatch")}
            className="w-full bg-gradient-to-r from-[#D79098] to-[#5F7BF4] text-white py-4.5 rounded-full font-bold text-lg"
          >
            {t('bubbleGame.start_game')}
          </button>
        </div>

      </div>
    </>
  );
}

export default BubblePairFound;
