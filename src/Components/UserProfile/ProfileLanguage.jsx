import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import Right from "./layout/Right";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next";

const LANGUAGES_CONFIG = [
  { id: "en", name: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { id: "fr", name: "Français", flag: "https://flagcdn.com/w40/fr.png" },
  { id: "es", name: "Español", flag: "https://flagcdn.com/w40/es.png" },
  { id: "de", name: "Deutsch", flag: "https://flagcdn.com/w40/de.png" },
  { id: "it", name: "Italiano", flag: "https://flagcdn.com/w40/it.png" },
  { id: "pt", name: "Português", flag: "https://flagcdn.com/w40/pt.png" },
  { id: "ja", name: "日本語", flag: "https://flagcdn.com/w40/jp.png" },
  { id: "ko", name: "한국어", flag: "https://flagcdn.com/w40/kr.png" },
  { id: "zh", name: "中文", flag: "https://flagcdn.com/w40/cn.png" },
];

const LanguageRow = ({ lang, isSelected, onSelect }) => (
  <button
    type="button"
    role="radio"
    aria-checked={isSelected}
    onClick={() => onSelect(lang.id)}
    className={`w-full  flex items-center justify-between p-4 rounded-xl transition-all duration-200 border-2 ${
      isSelected
        ? "bg-[var(--bg-card)]/10 border-[var(--border)]  shadow-md"
        : "bg-[var(--bg-card)]/10 border-transparent hover:border-gray-100 hover:bg-white"
    }`}
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-7 overflow-hidden rounded shadow-sm border border-gray-100">
        <img
          src={lang.flag}
          alt={`${lang.name} flag`}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="font-bold text-sm text-[var(--text-dim)]">        {lang.name}
      </span>
    </div>
    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
      isSelected ? "bg-orange-400 scale-100" : "bg-gray-100 scale-90"
    }`}>
      {isSelected && <Check className="w-4 h-4 text-white stroke-[3px]" />}
    </div>
  </button>
);

export default function ProfileLanguage() {
  const { t, i18n } = useTranslation();
  const [selectedId, setSelectedId] = React.useState(i18n.language || "en");
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    i18n.changeLanguage(selectedId);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-background)]">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <section className="bg-[var(--bg-card)]/10 rounded-[24px] p-6 md:p-10 shadow-inner">

          <header className="flex items-center gap-4 mb-8">
            <button
              type="button"
              aria-label={t('profileLanguage.go_back')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition border border-gray-100 group"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <h1 className="text-2xl font-black text-[var(--text)] tracking-tight">{t('profileLanguage.title')}</h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-lg font-black text-[var(--text-dim)] ml-1">{t('profileLanguage.section_title')}</h2>

              <div className="bg-[var(--bg)]  p-6 md:p-8 rounded-[32px] border border-[var(--border)] shadow-sm">
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-3  "
                  role="radiogroup"
                  aria-label={t('profileLanguage.select_language_label')}
                >
                  {LANGUAGES_CONFIG.map((lang) => (
                    <LanguageRow
                      key={lang.id}
                      lang={lang}
                      isSelected={selectedId === lang.id}
                      onSelect={setSelectedId}
                    />
                  ))}
                </div>

                <footer className="mt-16 flex justify-center">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="w-full max-w-sm h-14 rounded-2xl bg-gradient-to-r from-[#DB96A1] to-[#7C81D3] text-white font-black text-sm shadow-lg hover:opacity-90 hover:scale-[1.01] active:scale-95 transition-all duration-200 uppercase tracking-widest"
                  >
                    {saved ? "✓" : t('profileLanguage.save_changes')}
                  </button>
                </footer>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <Right />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
