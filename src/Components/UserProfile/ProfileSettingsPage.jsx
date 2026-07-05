import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Right from "./layout/Right";
import { Check, X, ArrowLeft, Clock, HatGlasses } from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "../../api";

const ProfileSettingsPage = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("select"); // "select" | "active" | "expired"
  const [toast, setToast] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(0);

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchOverview = async () => {
    try {
      const response = await api.get("/invisible-mode");
      const data = response.data?.data;
      setOverview(data);
      if (data?.status?.state === "active" || data?.status?.state === "unlimited") {
        setMode("active");
      } else if (data?.status?.state === "expired") {
        setMode("expired");
      } else {
        setMode("select");
      }
    } catch (err) {
      console.log("Invisible mode overview error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const canDoItems = [
    t('accountSettings.view_profiles'),
    t('accountSettings.like_profiles'),
    t('accountSettings.add_to_favorites'),
    t('accountSettings.send_roses'),
  ];

  const cannotSeeItems = [
    t('accountSettings.not_appear'),
    t('accountSettings.last_seen_hidden'),
    t('accountSettings.online_status_hidden'),
  ];

  const plans = overview?.plans || [];
  const currentPlan = plans[selectedPlan];

  const handleActivate = async () => {
    if (!currentPlan) return;

    if (!currentPlan.canAfford) {
      setToast({ type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    try {
      setSubmitting(true);
      const isExtend = overview?.status?.isActive;
      const endpoint = isExtend ? "/invisible-mode/extend" : "/invisible-mode/activate";
      const response = await api.post(endpoint, { planId: currentPlan.id });
      setOverview((prev) => ({
        ...prev,
        meonsBalance: response.data?.data?.meonsBalance ?? prev.meonsBalance,
      }));
      setMode("active");
      await fetchOverview();
    } catch (err) {
      console.log("Activate invisible mode error:", err);
      setToast({ type: "error" });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-background)]">
        <Navbar />
        <p className="text-center text-sm text-[var(--text-dim2)] py-20">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-background)]">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">
          <div className="rounded-[20px] p-8 ">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => window.history.back()}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition"
              >
                <ArrowLeft size={18} className="text-gray-700" />
              </button>

              <h2 className="text-2xl font-semibold text-[var(--text-dim)]">
                {t('accountSettings.title')}
              </h2>
            </div>
            <div className="bg-[var(--bg-background)] p-5 rounded-[32px]">

              <h3 className="text-[var(--text-dim2)] font-semibold mb-4">
                {t('accountSettings.invisible_mode')}
              </h3>

              <div className="bg-[var(--bg-card)]/10 rounded-[32px] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <HatGlasses size={34} className="text-gray-800" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-[var(--text-dim2)]">
                    {t('accountSettings.go_incognito')}
                  </h3>

                  <p className="text-[var(--text-dim2)] text-sm mt-2">
                    {t('accountSettings.go_incognito_desc')}
                  </p>

                  {overview?.status?.isActive && (
                    <p className="text-sm text-green-600 font-semibold mt-3">
                      Active until {overview.status.activeUntilFormatted}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-[var(--bg-background)] rounded-2xl p-5 shadow-sm">
                    <h4 className="font-semibold text-[var(--text-dim)] mb-4">
                      {t('accountSettings.what_you_can_do')}
                    </h4>
                    <div className="space-y-3 text-sm text-[var(--text-dim2)]">
                      {canDoItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 flex items-center justify-center rounded-md bg-green-500 text-white">
                            <Check size={14} />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[var(--bg-background)] rounded-2xl p-5 shadow-sm">
                    <h4 className="font-semibold text-[var(--text-dim2)] mb-4">
                      {t('accountSettings.what_others_cannot')}
                    </h4>
                    <div className="space-y-3 text-sm text-[var(--text-dim2)]">
                      {cannotSeeItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 flex items-center justify-center rounded-md bg-red-500 text-white">
                            <X size={14} />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="mt-8 w-full py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
                >
                  {overview?.status?.isActive
                    ? t('accountSettings.manage_plan')
                    : t('accountSettings.active_invisible')}
                </button>

              </div>
            </div>
          </div>
        </div>

        <div>
          <Right />
        </div>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
          <div className="
            bg-[var(--bg-background)]
             text-[var(--text)]
            w-[480px]
            min-h-[537px]
            max-w-[95%]
            rounded-[20px]
            px-[43px] py-[24px]
            border border-gray-200
            shadow-[0px_20px_60px_rgba(0,0,0,0.1)]
           flex flex-col justify-between
            relative
          ">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <X size={18} className="text-gray-600" />
            </button>

            {mode === "select" && (
              <div className="flex flex-col h-full justify-between  ">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <HatGlasses size={34} className="text-gray-800" />
                  </div>
                </div>

                <h2 className="text-center text-lg font-semibold text-[var(--text-dim2)]">
                  {t('accountSettings.unlock_invisible')}
                </h2>

                <p className="text-center text-sm text-[var(--text-dim2)] mb-6">
                  {t('accountSettings.browse_privately')}
                </p>

                <div className="space-y-4 ">
                  {plans.map((plan, i) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(i)}
                      className={`flex items-center justify-between p-4 rounded-xl border-[1px] cursor-pointer transition text-[var(--text-dim2)] ${
                        selectedPlan === i ? "border-[#FFB4A0] " : "border-gray-200"
                      } ${!plan.canAfford ? "opacity-50" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[10px] bg-[rgba(84,112,255,0.2)] flex items-center justify-center">
                          <Clock size={22} className="text-[#5470FF]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text-dim)]">{plan.label}</p>
                          <p className="text-sm text-[var(--text-dim2)]">{plan.meonsCost} Meons</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedPlan === i ? "border-orange-400" : "border-gray-300"
                      }`}>
                        {selectedPlan === i && <div className="w-2.5 h-2.5 bg-orange-400 rounded-full"></div>}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleActivate}
                  disabled={submitting}
                  className="mt-6 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-400 to-blue-500 disabled:opacity-50"
                >
                  {t('accountSettings.activate_now')}
                </button>

                <p className="text-center text-sm text-gray-400 mt-4">
                  {t('accountSettings.view_meons_balance')}: {overview?.meonsBalance ?? 0}
                </p>
              </div>
            )}

            {mode === "active" && (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <HatGlasses size={34} className="text-gray-800" />
                  </div>
                </div>

                <h2 className="text-center text-2xl font-semibold text-[var(--text-dim)]">
                  {t('accountSettings.invisible_activated')}
                </h2>

                <p className="text-center text-[var(--text-dim2)]">
                  {t('accountSettings.browsing_anonymously')}
                </p>

                <div className="flex justify-center mt-6">
                  <div className="bg-green-100 text-green-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {t('accountSettings.active_until')} {overview?.status?.activeUntilFormatted}
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
                  >
                    {t('accountSettings.continue_browsing')}
                  </button>

                  <p
                    onClick={() => setMode("select")}
                    className="text-center text-[var(--text-dim2)] mt-4 cursor-pointer"
                  >
                    {t('accountSettings.manage_plan')}
                  </p>
                </div>
              </>
            )}

            {mode === "expired" && (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <HatGlasses size={34} className="text-gray-800" />
                  </div>
                </div>

                <h2 className="text-center text-2xl font-semibold text-[var(--text-dim)]">
                  {t('accountSettings.invisible_expired')}
                </h2>

                <p className="text-center text-[var(--text-dim2)] mt-2">
                  {t('accountSettings.now_visible')}
                </p>

                <div className="flex justify-center mt-6">
                  <div className="bg-gray-100 text-gray-500 text-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    {overview?.status?.activeUntilFormatted}
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    onClick={() => setMode("select")}
                    className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
                  >
                    {t('accountSettings.activate_again')}
                  </button>

                  <p
                    onClick={() => setShowModal(false)}
                    className="text-center text-[var(--text-dim2)] mt-4 cursor-pointer"
                  >
                    {t('accountSettings.continue_normally')}
                  </p>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[999]">
          {toast.type === "error" && (
            <div className="flex items-center justify-between gap-4 bg-white px-5 py-3 rounded-xl shadow-lg min-w-[300px]">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <p className="text-sm text-gray-800">
                  {t('accountSettings.not_enough_meons')}
                </p>
              </div>
              <button className="px-3 py-1 text-sm border border-purple-400 text-purple-500 rounded-full">
                {t('accountSettings.top_up')}
              </button>
            </div>
          )}

          {toast.type === "warning" && (
            <div className="bg-white p-4 rounded-xl shadow-lg w-[320px]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EEF1FF] flex items-center justify-center">
                  <Clock className="text-[#5470FF]" size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {t('accountSettings.invisible_ending')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('accountSettings.ending_in')} <span className="text-red-500 font-medium">{t('accountSettings.five_minutes')}</span>
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button className="text-gray-400">{t('accountSettings.dismiss')}</button>
                <button className="px-4 py-1 rounded-md text-white bg-gradient-to-r from-[#D79098] to-[#5F7BF4]">
                  {t('accountSettings.extend')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsPage;
export default ProfileSettingsPage;
