import React, { useState, useMemo } from "react";
import { ArrowLeft, Sparkles, Star, Heart, MessageSquare } from "lucide-react";
import Right from "./layout/Right";
import Navbar from "../Navbar/Navbar";
 
// ✅ Dynamic Configuration
const NOTIFICATION_CONFIG = {
  headerTitle: "Notification Preferences",
  subTitle: "Alert Settings",
  footerNote: "Adjust how you receive alerts from IAMeetYou. We recommend keeping AI insights enabled to maximize your matching potential.",
  settings: [
    {
      id: "lucas_ai",
      title: "Lucas AI",
      desc: "Smart tips and conversation starters",
      icon: Sparkles,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-400",
    },
    {
      id: "subscription_updates",
      title: "Subscription Updates",
      desc: "Premium status and exclusive offers",
      icon: Star,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      isFill: true
    },
    {
      id: "new_matches",
      title: "New Matches",
      desc: "When you have a mutual connection",
      icon: Heart,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
    },
    {
      id: "messages",
      title: "Messages",
      desc: "Direct messages from your connections",
      icon: MessageSquare,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-500",
    }
  ]
};
 
/**
 * Optimized Toggle Component
 */
const Toggle = ({ enabled, onToggle, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={enabled}
    aria-label={`Toggle ${label}`}
    onClick={onToggle}
    className={`w-12 h-6 rounded-full transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-orange-200 ${enabled ? 'bg-orange-400' : 'bg-gray-200'
      }`}
  >
    <div
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${enabled ? 'translate-x-[24px]' : 'translate-x-0'
        }`}
    />
  </button>
);
 
/**
 * Notification Item Component
 */
const NotificationItem = ({ item, isEnabled, onToggle, isLast }) => {
  const Icon = item.icon;
  return (
    <div className={`flex items-center justify-between p-4  bg-[var(--bg-background)]  border border-transparent hover:border-orange-100 rounded-2xl transition-all duration-200 ${!isLast ? 'mb-2' : ''}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-6 h-6 ${item.iconColor} ${item.isFill ? 'fill-current' : ''}`} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold  text-[var(--text)] text-sm leading-tight">{item.title}</span>
          <span className="text-xs text-[var(--text-dim2)] font-medium mt-0.5">{item.desc}</span>
        </div>
      </div>
      <Toggle
        enabled={isEnabled}
        onToggle={() => onToggle(item.id)}
        label={item.title}
      />
    </div>
  );
};
 
export default function ProfileNotification() {
  const [enabledIds, setEnabledIds] = useState(new Set());
 
  const handleToggle = (id) => {
    setEnabledIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
 
  const renderedItems = useMemo(() => (
    NOTIFICATION_CONFIG.settings.map((item, idx) => (
      <NotificationItem
        key={item.id}
        item={item}
        isEnabled={enabledIds.has(item.id)}
        onToggle={handleToggle}
        isLast={idx === NOTIFICATION_CONFIG.settings.length - 1}
      />
    ))
  ), [enabledIds]);
 
  return (
    <div>
      <Navbar />
 
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <section className="bg-[var(--bg-background)] rounded-[24px] p-6 md:p-10 shadow-inner overflow-hidden">
 
          <header className="flex items-center gap-4 mb-8">
            <button
              type="button"
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition border border-gray-100 group"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <h1 className="text-2xl font-semibold">Setting</h1>
          </header>
 
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <article className="bg-[var(--bg-card)]/10 p-6 md:p-8 rounded-[32px] border border-[var(--border)] shadow-sm">
                <div className="mb-8 ">
                  <h2 className="text-[18px]  font-medium mb-2">{NOTIFICATION_CONFIG.headerTitle}</h2>
                  <p className="text-sm  text-black-500 font-semibold text-[16px]">{NOTIFICATION_CONFIG.subTitle}</p>
                </div>
 
                <div className="space-y-1 ">
                  {renderedItems}
                </div>
 
                <footer className="mt-16 text-center justify-center ">
                  <p className="text-[12px] text-black-400 mx-auto opacity-80">
                    {NOTIFICATION_CONFIG.footerNote}
                  </p>
                </footer>
              </article>
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
 