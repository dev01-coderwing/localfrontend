import React, { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const BoostFlowModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(30 * 60); // 30 min in seconds

  // ⏱ countdown
  useEffect(() => {
    if (step !== 2) return;

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  const formatTime = () => {
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    return `00:${m}:${s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      
      <div className="w-[380px] rounded-2xl bg-[var(--card)] text-[var(--text)] p-6 relative shadow-xl">

        {/* Close */}
        <button onClick={onClose} className="absolute right-4 top-4">
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-200 to-orange-200">
            <Zap className="text-orange-500" />
          </div>
        </div>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
            <h2 className="text-center text-xl font-semibold">
              {t('boostFlow.step1_title')}
            </h2>

            <p className="text-center text-gray-500 text-sm mt-1">
              {t('boostFlow.step1_desc')}
            </p>

            {/* Plan */}
            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 h-12 bg-black rounded-lg"></div>

              <div>
                <p className="font-medium text-sm">{t('boostFlow.plan_name')}</p>
                <p className="text-purple-600 font-semibold text-sm">
                  349 Meons
                </p>
                <p className="text-xs text-gray-500">
                  {t('boostFlow.plan_priority')}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 p-3 border rounded-xl text-xs text-gray-500 bg-gray-50">
              {t('boostFlow.info_text')}
            </div>

            {/* Button */}
            <button
              onClick={() => setStep(2)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-indigo-500 text-white font-medium"
            >
              {t('boostFlow.confirm_btn')}
            </button>

            <p
              onClick={onClose}
              className="text-center text-sm text-gray-500 mt-3 cursor-pointer"
            >
              {t('boostFlow.maybe_later')}
            </p>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            <h2 className="text-center text-xl font-semibold">
              {t('boostFlow.step2_title')}
            </h2>

            <p className="text-center text-gray-500 text-sm mt-1">
              {t('boostFlow.step2_desc')}
            </p>

            {/* Timer Card */}
            <div className="mt-4 p-4 rounded-xl bg-purple-100 text-center">
              <p className="text-xs text-purple-600 mb-1">{t('boostFlow.live_timer')}</p>
              <p className="text-xs text-gray-500">{t('boostFlow.timer_remaining')}</p>

              <h1 className="text-2xl font-bold mt-1">
                {formatTime()}
              </h1>
            </div>

            {/* Buttons */}
            <button className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-indigo-500 text-white font-medium">
              {t('boostFlow.view_performance')}
            </button>

            <p className="text-center text-sm text-gray-500 mt-3 cursor-pointer">
              {t('boostFlow.go_to_explorer')}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default BoostFlowModal;
