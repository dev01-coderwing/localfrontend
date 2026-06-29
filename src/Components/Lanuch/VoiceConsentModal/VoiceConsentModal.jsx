import { useState } from "react";
import voice from "/Image/voice.png?url";
import { useTranslation } from "react-i18next";
export default function VoiceConsentModal({ onClose, onAgree }) {
    const { t } = useTranslation();
    return (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="bg-[var(--bg-background)] w-[350px] rounded-2xl p-6 text-center relative">
 
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400"
                >
                    ✕
                </button>
 
                <div className="w-18 h-18 mx-auto mb-3 bg-purple-100 text-purple-500 flex items-center justify-center rounded-full">
                    <img src={voice} alt="Voice" />
                </div>
 
                <h3 className="font-semibold mb-2">{t("voiceConsent.title")}</h3>

                <p className="text-xs text-[var(--text-dim)] mb-4">
                    {t("voiceConsent.description")}
                </p>
                <div className="flex  text-sm justify-evenly text-[var(--text-dim2)]"><p>{t("voiceConsent.secureProcessing")}</p>   <p>{t("voiceConsent.autoDeletion")}</p></div>
                <p className="text-xs text-[var(--text-dim2)] mb-5 text-center mt-5">{t("voiceConsent.endToEnd")}</p>

                <div className="bg-purple-100 text-[var(--text-dim2)] rounded-xl py-6 px-4 mb-6 text-sm">
                    {t("voiceConsent.agreementText")}
                </div>
                <button
                    onClick={onAgree}
                    className="w-full py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-[var(--text)] mb-2"
                >
                    {t("voiceConsent.agreeButton")}
                </button>

                <button

                    className="w-full py-2 rounded-full border border-orange-400  text-orange-400 mb-2"
                >
                    {t("voiceConsent.textModeButton")}
                </button>

                <button onClick={onClose} className="text-sm text-gray-400">
                    {t("voiceConsent.cancel")}
                </button>
            </div>
        </div>
    );
}