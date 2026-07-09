import { useState } from "react";
import { useTranslation } from "react-i18next";

const tones = ["Playful", "Curious", "Gentle"];

function LucasModal({ onClose }) {
  const { t } = useTranslation();
  const [activeTone, setActiveTone] = useState("Playful");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [visibleCards, setVisibleCards] = useState([0, 1, 2]);

  const suggestions = {
    Playful: [
      t('lucasModal.suggestion_playful_0'),
      t('lucasModal.suggestion_playful_1'),
      t('lucasModal.suggestion_playful_2'),
    ],
    Curious: [
      t('lucasModal.suggestion_curious_0'),
      t('lucasModal.suggestion_curious_1'),
      t('lucasModal.suggestion_curious_2'),
    ],
    Gentle: [
      t('lucasModal.suggestion_gentle_0'),
      t('lucasModal.suggestion_gentle_1'),
      t('lucasModal.suggestion_gentle_2'),
    ],
  };

  const starters = {
    Playful: t('lucasModal.starter_playful'),
    Curious: t('lucasModal.starter_curious'),
    Gentle: t('lucasModal.starter_gentle'),
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setVisibleCards([]);
    setTimeout(() => {
      setVisibleCards([0]);
      setTimeout(() => {
        setVisibleCards([0, 1]);
        setTimeout(() => {
          setVisibleCards([0, 1, 2]);
          setIsRegenerating(false);
        }, 150);
      }, 150);
    }, 400);
  };

  const handleTone = (tone) => {
    setActiveTone(tone);
    setVisibleCards([]);
    setTimeout(() => setVisibleCards([0, 1, 2]), 200);
  };
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[var(--bg-background)] text-[var(--text-dim)]  rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-md">
                  <span className="text-[var(--text-dim)] text-lg font-bold">L</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <p className="text-[var(--text-dim)] font-semibold text-sm leading-tight">{t('lucasModal.coach_title')}</p>
                <p className="text-[var(--text-dim2)] text-xs">{t('lucasModal.coach_subtitle')}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--bg-card)]/10 transition text-[var(--text-dim)] hover:text-[var(--text-dim2)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12 " />
              </svg>
            </button>
          </div>

          {/* Tone Tabs */}
          <div className="px-5 pb-3 flex gap-2">
            {tones.map((tone) => (
              <button
                key={tone}
                onClick={() => handleTone(tone)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${activeTone === tone
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md scale-105"
                    : "bg-[var(--bg-card)]/10 text-[var(--text-dim)] "
                  }`}
              >
                {t('lucasModal.tone_' + tone.toLowerCase())}
              </button>
            ))}
          </div>

          {/* Conversation Starter */}
          <div className="mx-4 mb-3 bg-[var(--bg-card)]/10 rounded-2xl px-4 py-3 flex items-start gap-2.5">
            <span className="mt-0.5 text-base">💬</span>
            <div>
              <p className="text-[var(--text-dim)] text-xs font-bold mb-0.5 tracking-wide uppercase">{t('lucasModal.conversation_starter_label')}</p>
              <p className="text-[var(--text-dim2)] text-sm leading-snug">{starters[activeTone]}</p>
            </div>
          </div>

          {/* Suggestion Cards */}
          <div className="px-4 pb-4 space-y-2.5 min-h-[220px]">
            {suggestions[activeTone].map((text, i) => (
              <div
                key={`${activeTone}-${i}`}
                className={`bg-[var(--bg-card)]/10 border-l-4 border-purple-400 rounded-xl px-4 py-3 transition-all duration-300 ${visibleCards.includes(i)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                  }`}
              >
                <p className="text-[var(--text-dim2)] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Regenerate Button */}
          <div className="px-5 pb-5 flex justify-end">
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t('lucasModal.regenerate')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LucasModal