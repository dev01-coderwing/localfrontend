import React from "react";
import { ArrowLeft, Calendar, Zap, Info } from "lucide-react";
import Right from "./layout/Right";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next";

// ✅ Production Data Object
const LUCAS_DETAILS_DATA = {
  headerTitle: "Lucas Details",
  usage: {
    used: "2h 30m",
    total: "6h 00m",
    percent: 41,
    remaining: "3h 30m remaining this month"
  },
  allocations: [
    {
      id: 1,
      title: "Subscription Time",
      subtitle: "Resets on March 15, 2025",
      value: "3h 30m",
      label: "Monthly Plan",
      icon: Calendar,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: 2,
      title: "Purchased Extra Time",
      subtitle: "Never expires",
      value: "2h 00m",
      label: "Add-on Balance",
      icon: Zap,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
      isPremium: true
    }
  ],
  rules: [
    "Purchased time never expires.",
    "Subscription resets every billing cycle.",
    "Extra time is used only after subscription is depleted."
  ],
  actions: {
    primary: "Got it",
    secondary: "Buy more time"
  }
};

/**
 * Progress Bar Sub-component
 */
const UsageMeter = ({ used, total, percent, remaining }) => {
  const { t } = useTranslation();
  return (
    <article className=" p-6 rounded-[24px] shadow-sm border border-white">
      <div className="flex justify-between items-start mb-5 ">
        <div>
          <p className="text-[10px] font-black text-[var(--text)] uppercase tracking-widest mb-1.5">{t('profileLucasDetails.time_usage')}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black  text-[var(--text)] tracking-tighter">{used}</span>
            <span className="text-sm font-bold  text-[var(--text-dim)]">/ {total}</span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-[10px] font-black border border-purple-100 uppercase tracking-wider">
          {t('profileLucasDetails.used_percent', { percent })}
        </span>
      </div>

      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-400 transition-all duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-right text-[10px] text-[var(--text-dim2)] font-bold uppercase tracking-tight">{remaining}</p>
    </article>
  );
};

/**
 * Allocation Row Component
 */
const AllocationRow = ({ item }) => {
  const { t } = useTranslation();
  const Icon = item.icon;
  return (
    <div className="bg-white p-4 rounded-[22px] flex items-center justify-between shadow-sm border border-white transition-all hover:shadow-md hover:scale-[1.01] cursor-default">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl ${item.bgColor} flex items-center justify-center shrink-0`}>
          <Icon className={`w-6 h-6 ${item.iconColor} ${item.isPremium ? 'fill-current' : ''}`} />
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm leading-tight">{t(`profileLucasDetails.allocation_${item.id}_title`)}</p>
          <p className="text-[11px] text-gray-400 font-medium mt-0.5">{t(`profileLucasDetails.allocation_${item.id}_subtitle`)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-black text-gray-800 text-sm italic tracking-tighter">{item.value}</p>
        <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded mt-1 inline-block ${
          item.isPremium ? 'text-blue-500 bg-blue-50' : 'text-gray-400'
        }`}>
          {t(`profileLucasDetails.allocation_${item.id}_label`)}
        </span>
      </div>
    </div>
  );
};

export default function ProfileLucasDetails() {
  const { t } = useTranslation();
  const { usage, allocations, rules } = LUCAS_DETAILS_DATA;

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
            <h1 className="text-2xl font-black text-[var(--text-dim)] tracking-tight">{t('profileLucasDetails.title')}</h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-lg font-black text-[var(--text-dim)] ml-1">{t('profileLucasDetails.section_title')}</h2>

              <div className="bg-[var(--bg-background)] p-6 md:p-8 rounded-[32px] space-y-6 border border-[var(--border)] shadow-sm">

                <UsageMeter {...usage} />

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-[var(--text-dim2)] uppercase tracking-widest ml-1">{t('profileLucasDetails.plan_allocation')}</p>
                  <div className="space-y-3">
                    {allocations.map((item) => (
                      <AllocationRow key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                <aside className="bg-[var(--bg-background)] p-6 rounded-2xl border border-[var(--border)]">
                   <div className="flex gap-4">
                      <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <ul className="text-[11px] text-[var(--text-dim2)] space-y-2 font-bold leading-relaxed">
                        {rules.map((rule, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-[var(--text-dim2)]">•</span>
                            <span>{t(`profileLucasDetails.rule_${idx + 1}`)}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                </aside>

                <footer className="flex flex-col items-center gap-4 pt-6">
                  <button
                    type="button"
                    className="w-full max-w-sm h-14 rounded-2xl bg-gradient-to-r from-[#DB96A1] to-[#7C81D3] text-white font-black text-sm shadow-lg hover:opacity-90 hover:scale-[1.01] active:scale-95 transition-all duration-200 uppercase tracking-widest"
                  >
                    {t('profileLucasDetails.got_it')}
                  </button>
                  <button
                    type="button"
                    className="text-xs font-black text-[var(--text-dim2)] hover:text-gray-600 uppercase tracking-widest transition-colors py-2"
                  >
                    {t('profileLucasDetails.buy_more_time')}
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
