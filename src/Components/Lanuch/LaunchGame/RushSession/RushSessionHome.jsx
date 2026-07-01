import React from "react";
import { Clock, Target, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Navbar/Navbar";
import { useTranslation } from "react-i18next";

// 🔧 Dynamic Config
const CONFIG = {
    title: "Rush Session",
    subtitle: "Tap Only Positive Emojis",
    emojiImage: "/Image/RushSession.png",
    rules: [
        {
            icon: Clock,
            text: "10 second challenge",
            color: "text-black",
            bg: "bg-red-100",
        },
        {
            icon: Target,
            text: "Tap 20 Positive emojis",
            color: "text-red-500",
            bg: "bg-red-100",
        },
        {
            icon: XCircle,
            text: "Avoid negative emojis",
            color: "text-black",
            bg: "bg-red-100",
        },
    ],
};

export default function RushSession() {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const ruleTexts = [
        t('rushSession.rule_time'),
        t('rushSession.rule_tap'),
        t('rushSession.rule_avoid'),
    ];
    return (
        <div className="min-h-screen bg-[var(--bg-background)] border border-[var(--border)] flex flex-col">

            {/* 🔝 Navbar */}
         <Navbar/>

            {/*  Main Container */}
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-4xl bg-[var(--bg-card)]/10 rounded-3xl shadow-sm py-12 px-6 flex flex-col items-center">

                    {/*  Title */}
                    <h2 className="text-4xl font-bold text-red-500 mb-2">
                        {t('rushSession.title')}
                    </h2>
                    <p className="text-[var(--text-dim)] mb-8">{t('rushSession.subtitle')}</p>

                    {/*  Emoji Image */}
                 

                    {/* 📦 Rules Card */}
                    <div className="bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-2xl shadow-md px-6 py-5 w-full max-w-sm mb-10">
                        <h3 className="text-[var(--text-dim)] font-semibold mb-4">
                            {t('rushSession.game_rules')}
                        </h3>

                        <div className="space-y-4">
                            {CONFIG.rules.map((rule, index) => {
                                const Icon = rule.icon;
                                return (
                                    <div key={index} className="flex items-center gap-3 text-[var(--text-dim2)]">

                                        <div className={`p-2 rounded-full ${rule.bg}`}>
                                            <Icon className="w-4 h-4 text-red-500" />
                                        </div>

                                        <p className={`text-sm font-medium colour-[var(--text-dim2)] ${rule.color}`}>
                                            {ruleTexts[index]}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/*  Button */}
                    <button className="w-full max-w-2xl py-4 rounded-xl text-white font-medium text-lg 
            bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 
            hover:opacity-90 transition"
                        onClick={
                            () => {
                                navigate('/voiceAnalysis/rushsession')
                            }
                        }>
                        {t('rushSession.start_game')}
                    </button>

                </div>
            </div>
        </div>
    );
}