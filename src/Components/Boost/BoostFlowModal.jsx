import React, { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";

const BoostFlowModal = ({ isOpen, onClose }) => {
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
              Ready to boost?
            </h2>

            <p className="text-center text-gray-500 text-sm mt-1">
              Increase your profile to more people in your area instantly.
            </p>

            {/* Plan */}
            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 h-12 bg-black rounded-lg"></div>

              <div>
                <p className="font-medium text-sm">30 minutes Boost</p>
                <p className="text-purple-600 font-semibold text-sm">
                  349 Meons
                </p>
                <p className="text-xs text-gray-500">
                  Priority visibility for the next hour.
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 p-3 border rounded-xl text-xs text-gray-500 bg-gray-50">
              Boost increases visibility only. Matches require mutual likes.
            </div>

            {/* Button */}
            <button
              onClick={() => setStep(2)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-indigo-500 text-white font-medium"
            >
              Confirm & Start Boost
            </button>

            <p
              onClick={onClose}
              className="text-center text-sm text-gray-500 mt-3 cursor-pointer"
            >
              May be Later
            </p>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            <h2 className="text-center text-xl font-semibold">
              You're Boosted!
            </h2>

            <p className="text-center text-gray-500 text-sm mt-1">
              Your profile now has priority visibility in Explorer & Labs.
            </p>

            {/* Timer Card */}
            <div className="mt-4 p-4 rounded-xl bg-purple-100 text-center">
              <p className="text-xs text-purple-600 mb-1">● Live Timer</p>
              <p className="text-xs text-gray-500">Timer Remaining</p>

              <h1 className="text-2xl font-bold mt-1">
                {formatTime()}
              </h1>
            </div>

            {/* Buttons */}
            <button className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-400 to-indigo-500 text-white font-medium">
              View Performance
            </button>

            <p className="text-center text-sm text-gray-500 mt-3 cursor-pointer">
              Go to Explorer
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default BoostFlowModal;

