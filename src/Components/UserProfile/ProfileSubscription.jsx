import React from "react";
import { ArrowLeft, Infinity, Sparkles, Eye } from "lucide-react";
import Right from "./layout/Right";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next";

// ✅ Production Data Structure
const SUBSCRIPTION_DATA = {
  planName: "IAMeetYou Gold",
  status: "ACTIVE",
  renewalDate: "Feb 12, 2026",
  price: "$14.99",
  billingCycle: "/month",
  features: [
    {
      id: 1,
      title: "Unlimited Likes",
      desc: "Send as many likes as you want, no daily limits.",
      icon: Infinity,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500"
    },
    {
      id: 2,
      title: "AI Insights",
      desc: "Personalized profile analysis to boost your matches.",
      icon: Sparkles,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      id: 3,
      title: "See Who Likes You",
      desc: "Reveal everyone who's already swiped right on you.",
      icon: Eye,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500"
    }
  ],
  actions: {
    upgrade: "Upgrade Plan",
    manage: "Manage Billing",
    cancel: "Cancel Subscription"
  }
};

/**
 * Feature Card Sub-component
 */
const FeatureItem = ({ feature, isLast }) => {
  const { t } = useTranslation();
  const Icon = feature.icon;
  return (
    <div className={`flex items-center  gap-4 p-4 transition-colors hover:bg-gray-50/50 ${!isLast ? 'border-b border-[var(--border)]' : ''}`}>
      <div className={`w-12 h-12 rounded-full ${feature.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
        <Icon className={`w-6 h-6 ${feature.iconColor}`} />
      </div>
      <div>
        <p className="font-bold text-gray-800 text-sm leading-tight">{t(`profileSubscription.feature_${feature.id}_title`)}</p>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">{t(`profileSubscription.feature_${feature.id}_desc`)}</p>
      </div>
    </div>
  );
};

export default function ProfileSubscription() {
  const { t } = useTranslation();
  const { planName, status, renewalDate, price, billingCycle, features } = SUBSCRIPTION_DATA;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <section className="bg-[var(--bg)] rounded-[24px] p-6 md:p-10 shadow-inner">

          <header className="flex items-center gap-4 mb-8">
            <button
              type="button"
              aria-label={t('profileLanguage.go_back')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition border border-gray-100 group"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <h1 className="text-2xl font-bold">{t('profileSubscription.title')}</h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">


              <div className="bg-[var(--card)] p-6 md:p-8 rounded-[32px] space-y-6 border border-white/40 shadow-sm">
                <h2 className="text-lg font-semibold text-[var(--text)] ml-1">{t('profileSubscription.section_title')}</h2>
                {/* Premium Plan Card */}
                <article className="bg-gradient-to-br from-[#497BEB] to-[#E33175] p-8 rounded-[24px] text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform duration-500" />

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full w-fit backdrop-blur-sm border border-white/10">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-[10px] font-black tracking-widest uppercase">{t('profileSubscription.current_plan')}</span>
                      </div>

                      <div>
                        <h3 className="text-3xl font-black mb-1 drop-shadow-sm">{planName}</h3>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-400 text-[9px] font-black px-1.5 py-0.5 rounded text-white tracking-[0.2em] shadow-sm uppercase">{status}</span>
                          <span className="text-xs font-bold opacity-90">{t('profileSubscription.renews', { date: renewalDate })}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black tracking-tight">{price}</span>
                      <span className="text-lg font-bold opacity-80 tracking-tighter">{billingCycle}</span>
                    </div>
                  </div>
                </article>

                {/* Features Section */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t('profileSubscription.your_features')}</p>

                  <div className="bg-white rounded-[24px] p-2 border border-white shadow-sm">
                    {features.map((feature, index) => (
                      <FeatureItem
                        key={feature.id}
                        feature={feature}
                        isLast={index === features.length - 1}
                      />
                    ))}
                  </div>
                </div>

                {/* Styled Footer Actions */}
                <div className="flex flex-col items-center gap-4 pt-6">
                  <button
                    type="button"
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#DB96A1] to-[#7C81D3] text-white font-black text-sm shadow-lg hover:opacity-90 hover:scale-[1.01] active:scale-95 transition-all duration-200"
                  >
                    {t('profileSubscription.upgrade_plan')}
                  </button>
                  <button
                    type="button"
                    className="w-full h-14 rounded-2xl bg-white border-2 border-[#FFB4A0]/30 text-[#FFB4A0] font-black text-sm hover:bg-[#FFB4A0]/5 active:scale-95 transition-all duration-200"
                  >
                    {t('profileSubscription.manage_billing')}
                  </button>
                  <button
                    type="button"
                    className="text-xs font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors py-2"
                  >
                    {t('profileSubscription.cancel_subscription')}
                  </button>
                </div>

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
