import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Camera, Sparkles, Check } from "lucide-react";
import TakeSelfie from "./TakeSelfie";
import {getVerificationStatus} from "../../Redux/verifySlice";

import { useDispatch,useSelector,} from "react-redux";
import { useTranslation } from "react-i18next";

const verificationSteps = [
  {
    id: 1,
    title: "Take a selfie",
    description: "Quick photo to verify it's you",
    icon: Camera,
  },
  {
    id: 2,
    title: "AI review",
    description: "Verified in less than 2 minutes",
    icon: Sparkles,
  },
];

function GetVerified({ onBack }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
const dispatch = useDispatch();

const {
  statusData,
  statusLoading,
} = useSelector(
  (state) => state.verify
);

useEffect(() => {
  dispatch(getVerificationStatus());
}, [dispatch]);

  const handleStartVerification = () => {
  navigate("/takeselfie");
};
  return (
    <div className="relative h-dvh overflow-hidden">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-5 left-5 z-20 w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Main Content */}
      <div className="h-full flex items-center justify-center px-4 bg-[var(--bg-background)]">
        <div className="w-full max-w-sm p-5 bg-[var(--bg-card)]/10 border border-[var(--border)]">

          {/* Icon */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-[#E8E6F4] flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#4F7FF7] flex items-center justify-center">
                  <Check
                                size={20}
                                className="text-white"
                                strokeWidth={3}
                              />
              </div>
            </div>

            <h1 className="mt-6 text-[34px] font-bold text-[var(--text-dim)]">
              {t('getVerified.get_verified')}
            </h1>

            <p className="text-center text-[var(--text-dim2)] text-sm mt-3 leading-relaxed">
              {t('getVerified.description')}
            </p>
          </div>

          {/* Steps */}
          <div className="mt-10 space-y-4">
            {verificationSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="bg-[var(--bg-background)] border border-[var(--border)] rounded-2xl px-4 py-4 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 ">
                    <div className="w-8 h-8 rounded-full  bg-[var(--bg-card)] flex items-center justify-center text-sm font-medium text-[#475569]">
                      {step.id}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-dim)]">
                        {t(`getVerified.step_${step.id}_title`)}
                      </h3>

                      <p className="text-xs text-[var(--text-dim2)] mt-1">
                        {t(`getVerified.step_${step.id}_desc`)}
                      </p>
                    </div>
                  </div>

                  <Icon
                    size={18}
                    className="text-[var(--text-dim)]"
                  />
                </div>
              );
            })}
          </div>

          {/* Start Verification Button */}
          <button
            onClick={handleStartVerification}
            className="mt-6 w-full h-14 rounded-xl text-white font-semibold bg-gradient-to-r from-[#D68AA3] to-[#566CF5]"
          >
            {t('getVerified.start_verification')}
          </button>

          {/* Footer */}
          <p className="text-center text-[11px] text-[var(--text-dim2)]  mt-4 px-4">
            {t('getVerified.privacy_note')}
          </p>

        </div>
      </div>
    </div>
  );
}

export default GetVerified;
