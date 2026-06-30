import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Gift, Lock, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import PromoCodeList from "./PromoCodeList";
import ReferralPopup from "./ReferralPopup";
import PromoCodeModal from "./PromoCodeModal";

import Navbar from "../../Navbar/Navbar";
import Right from "../layout/Right";
import WalletPopup from "./WalletPopup";

function InfluencerDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [showPromoCodeList, setShowPromoCodeList] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);

  const promoData = {
    code: "YOURCODE15",
    discount: "15%",
    commission: "10%",
  };

  const statsData = [
    { title: "Total Referrals", value: "124", growth: "+18% this month" },
    { title: "Active Now", value: "42", growth: "+3% this month" },
    { title: "Total Earnings", value: "€608", growth: "+24%" },
  ];

  const activityData = [
    { name: "John Dawson", time: "2 hours ago", amount: "+€14.99" },
    { name: "NTR Patel", time: "5 hours ago", amount: "+€18.00" },
  ];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(promoData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShareCode = async () => {
    if (navigator.share) {
      await navigator.share({
        title: t('influencerDashboard.share_title'),
        text: t('influencerDashboard.share_text', { code: promoData.code, discount: promoData.discount }),
      });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* CENTERED CONTAINER */}
      <div className="max-w-[1450px] mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-5 bg-[var(--bg-background)] ">

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start">

          {/* LEFT CONTENT */}
          <main className="min-w-0">

            <div className="rounded-[26px] border border-[var(--border)]  bg-[var(--bg-card)]/10 p-4 sm:p-5 md:p-6">

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-6">
                <button
                 onClick={() => navigate(-1)}
                className="h-10 w-10  text-[var(--text-dim)] rounded-full  border border-[var(--border)] flex items-center bg-[var(--bg-background)] justify-center shrink-0">
                  <ArrowLeft size={18} />
                </button>

                <h1 className="text-[22px] sm:text-[28px] font-semibold text-[var(--text-dim)]">
                  {t('influencerDashboard.setting')}
                </h1>
              </div>

              <h2 className="text-[16px] font-semibold mb-5 text-[var(--text-dim2)]">
                {t('influencerDashboard.influencer_dashboard')}
              </h2>

              {/* STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                {statsData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[var(--bg-card)]/10 rounded-[18px] border border-[var(--border)] p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-7 w-7 rounded-full bg-[var(--bg-card)]/10 flex items-center justify-center border border-[var(--border)] text-[var(--text-dim)]">
                        <User size={15} />
                      </div>

                      <span className="text-[13px] text-[var(--text-dim2)]">
                        {t(`influencerDashboard.stat_${index}_title`)}
                      </span>
                    </div>

                    <h3 className="text-[34px] font-semibold text-[var(--text-dim)]">
                      {item.value}
                    </h3>

                    <p className="text-[13px] text-green-500 mt-1">
                      ↗ {item.growth}
                    </p>
                  </div>
                ))}
              </div>

              {/* PROMO CARD */}
              <div className="bg-[var(--bg-card)]/10  border border-[var(--border)] rounded-[22px] p-5 mb-5">

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[18px] font-semibold text-[var(--text-dim)]">
                      {t('influencerDashboard.promo_code')}
                    </h3>

                    <p className="text-[13px] text-[var(--text-dim2)] mt-1">
                      {t('influencerDashboard.your_promo_code')}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowPromoCodeList(true)}
                  className="text-[13px] font-medium text-[#4F6BFF] hover:underline">
                    {t('influencerDashboard.view_all')}
                  </button>
                </div>


                <div className="flex flex-col lg:flex-row gap-3">

                  {/* CODE BOX */}
                  <div
                   onClick={() => setShowPromoModal(true)}
                  className="flex-1 h-[68px] rounded-[18px] text-[var(--text-dim2)] border border-[var(--border)] flex items-center justify-center px-4 bg-[var(--bg-background)] ">
                    <span className="text-[28px] font-semibold tracking-wide">
                      {promoData.code}
                    </span>
                  </div>

                  {/* COPY */}
                  <button
                    onClick={handleCopyCode}
                    className="h-[68px] px-7 rounded-[18px] bg-[#f1cb08] flex items-center justify-center gap-2 font-medium"
                  >
                    <Copy size={18} />
                    {copied ? t('influencerDashboard.copied') : t('influencerDashboard.copy_code')}
                  </button>

                  {/* SHARE */}
                  <button
                    onClick={handleShareCode}
                    className="h-[68px] w-[68px] rounded-[18px] bg-[#e8b933] flex items-center justify-center shrink-0"
                  >
                    <Gift size={20} />
                  </button>
                </div>
              </div>

              {/* ELIGIBILITY */}
              <div className="bg-[var(--bg-card)]/10  border border-[var(--border)] rounded-[22px] p-5 mb-5">
                {/*
                <h3 className="text-[18px] font-semibold text-[var(--text-dim)]">
                  Eligibility Progress
                </h3> */}
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-semibold text-[var(--text-dim)]">
                    {t('influencerDashboard.eligibility_progress')}
                  </h3>

                  <span className="text-[13px] font-medium text-[var(--text-dim)]">
                    {t('influencerDashboard.needed')}
                  </span>
                </div>

                <p className="text-[14px] text-[var(--text-dim2)] mt-2">
                  {t('influencerDashboard.reach_milestones')}
                </p>

                <div className="h-[10px] rounded-full bg-[#f4d5cb] overflow-hidden mt-4">
                  <div className="w-[60%] h-full bg-[#f3a58f]" />
                </div>

                <div
                  onClick={() => setShowWalletPopup(true)}
                  className="mt-5  border border-[var(--border)] bg-[var(--bg-background)]    rounded-[18px] p-4 flex items-center gap-4">

                  <div className="h-12 w-12 rounded-full border text-[var(--text-dim)] border-[var(--border)] bg-[var(--bg-background)] flex items-center justify-center shrink-0">
                    <Lock size={20} />
                  </div>

                  <div>
                    <h4 className="text-[15px] font-semibold text-[var(--text-dim)]">
                      {t('influencerDashboard.unlock_bank_withdrawals')}
                    </h4>

                    <p className="text-[13px] text-[var(--text-dim2)] mt-1">
                      {t('influencerDashboard.maintain_referrals')}
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTIVITY */}
              <div className=" border border-[var(--border)]  bg-[var(--bg-card)]/10 rounded-[22px] p-5">

                {/* <h3 className="text-[18px] font-semibold mb-4 text-[var(--text-dim)]">
              Recent Activity
            </h3> */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-semibold text-[var(--text-dim)]">
                    {t('influencerDashboard.recent_activity')}
                  </h3>

                  <button
                    onClick={() => setShowReferralPopup(true)}
                   className="text-[13px] font-medium text-[#4F6BFF] hover:underline">
                    {t('influencerDashboard.view_all')}
                  </button>
                </div>

                <div className="space-y-3">
                  {activityData.map((item, index) => (
                    <div
                      key={index}
                      className=" border border-[var(--accnt)] bg-[var(--bg-background)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3  rounded-[16px] p-4"
                    >
                      <div className="flex items-center gap-3  ">
                        <div className="h-11 w-11 rounded-full bg-[var(--bg-card)]/10  text-[var(--text-dim)] flex items-center justify-center border  border-[var(--border)] ">
                          <User size={18} />
                        </div>

                        <div>
                          <h4 className="text-[15px] font-medium text-[var(--text-dim)]">
                            {item.name}
                          </h4>

                          <p className="text-[13px] text-[var(--text-dim2)]">
                            {item.time}
                          </p>
                        </div>
                      </div>

                      <h4 className="text-[16px] font-semibold text-green-500">
                        {item.amount}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="w-full xl:w-[320px] shrink-0">
            <div className="xl:sticky xl:top-5">
              <Right />
            </div>
          </aside>
        </div>
      </div>
      {showWalletPopup && (
  <WalletPopup
    onClose={() => setShowWalletPopup(false)}
  />
)}

      {showPromoCodeList && (
  <PromoCodeList
    onClose={() => setShowPromoCodeList(false)}
  />
)}

{showReferralPopup && (
  <ReferralPopup
    onClose={() => setShowReferralPopup(false)}
  />
)}

{showPromoModal && (
  <PromoCodeModal
    onClose={() => setShowPromoModal(false)}
  />
)}



    </div>
  );
}

export default InfluencerDashboard;
