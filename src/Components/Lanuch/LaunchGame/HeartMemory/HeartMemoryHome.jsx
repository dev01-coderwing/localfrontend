import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// 🔧 Config (fully dynamic)
const GAME_CONFIG = {
    title: "Heart Memory",
    subtitle: "Find All Matching Love Pairs",
    time: 10,
    totalCards: 12,
    pairs: 6,
    previewIcon: "❤️",
    rules: [
        { icon: "⏱", text: "10 second challenge" },
        { icon: "🧩", text: "12 cards (6 Matching Pairs)" },
        { icon: "🎯", text: "Find all pairs before time runs out" },
    ],
};

export default function HeartMemoryHome() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const ruleTexts = [
        t('heartMemory.rule_time'),
        t('heartMemory.rule_cards'),
        t('heartMemory.rule_goal'),
    ];
    const previewCards = React.useMemo(
        () => Array.from({ length: GAME_CONFIG.totalCards }),
        []
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-background)] p-4">

            {/* Main Container */}
            <div className="bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-3xl p-8 w-full max-w-md text-center shadow-md">

                {/* ❤️ Icon */}
                <div className="text-5xl mb-3">{GAME_CONFIG.previewIcon}</div>

                <h1 className="text-3xl font-semibold text-red-500 mb-2">
                    {t('heartMemory.title')}
                </h1>

                {/* Subtitle */}
                <p className="text-sm text-[var(--text-dim2)] mb-8">
                    {t('heartMemory.subtitle')}
                </p>

                <div className="grid grid-cols-4 gap-4 mb-8">
                    {previewCards.map((_, i) => (
                        <div
                            key={i}
                            className="aspect-square rounded-full bg-red-400 flex items-center justify-center shadow-sm"
                        >
                            <span className="text-lg opacity-40">
                                {GAME_CONFIG.previewIcon}
                            </span>
                        </div>
                    ))}
                </div>

                {/* 📊 Rules (Dynamic) */}
                <div className="bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-xl p-4 text-left text-sm mb-8 shadow-sm">
                    <p className="font-semibold mb-3 text-[var(--text-dim)]">
                        {t('heartMemory.game_rules')}
                    </p>

                    <div className="space-y-2 text-[var(--text-dim2)]">
                        {GAME_CONFIG.rules.map((rule, index) => (
                            <p key={index} className="flex items-center gap-2">
                                <span>{rule.icon}</span>
                                <span>{ruleTexts[index]}</span>
                            </p>
                        ))}
                    </div>
                </div>

                {/* 🎮 Button */}
                <button
                    onClick={
                        () => {
                            navigate("/voiceAnalysis/heartmemory")
                        }
                    }
                    className="w-full py-3 rounded-full bg-gradient-to-r from-pink-400 to-blue-500 text-white font-medium hover:opacity-90 active:scale-95 transition"
                >
                    {t('heartMemory.play_memory')}
                </button>
            </div>
        </div>
    );
}