







import React, { useState } from "react";
import { X, Building2, IdCard, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PopupTwo from "./PopupTwo";
import Selfie from "./Selfie";
import VerificationProgress from "./VerificationProgress";

function VerifyModal({ closeModal }) {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  return (
    <>
      {/* STEP 1 */}
      {step === 1 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3 sm:px-4 py-4 overflow-y-auto">
          
          <div className="bg-[var(--bg-background)] w-full max-w-[480px] min-h-[500px] rounded-[20px] border border-[var(--border)] pt-5 sm:pt-6 px-4 sm:px-8 md:px-[43px] pb-6 relative flex flex-col gap-4">

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[var(--text-dim)]"
            >
              <X size={18} />
            </button>

            {/* Title */}
            <h2 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-dim)]">
              KYC Verification
            </h2>

            {/* Icon */}
            <div className="flex justify-center mt-1 sm:mt-0">
              <div className="w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] border border-[var(--border)] rounded-full bg-[var(--bg-card)]/10 flex items-center justify-center">
                <Building2
                  size={30}
                  className="text-[var(--text-dim)] sm:w-[35px] sm:h-[35px]"
                />
              </div>
            </div>

            {/* Heading */}
            <h3 className="text-center text-[22px] sm:text-[25px] leading-snug font-bold text-[var(--text-dim)]">
              Quick Identity Check
            </h3>

            {/* Description */}
            <p className="text-center text-[13px] sm:text-[15px] leading-6 sm:leading-7 text-[var(--text-dim2)]">
              To keep our community safe and secure, we need to verify your
              identity before your first withdrawal.
            </p>

            {/* Info Box */}
            <div className="bg-[var(--bg-card)]/10 rounded-2xl p-3 sm:p-4 flex items-start gap-3 border border-[var(--border)]">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[var(--bg-background)] border border-[var(--accent)] flex items-center justify-center shrink-0">
                <IdCard
                  className="text-[var(--text-dim)]"
                  size={18}
                />
              </div>

              <div>
                <h4 className="font-semibold text-[14px] sm:text-[15px] text-[var(--text-dim)]">
                  Only Government ID + Selfie required
                </h4>

                <p className="text-[var(--text-dim2)] text-[13px] sm:text-sm mt-1">
                  Takes 1-2 minutes.
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-2xl text-white font-semibold text-[15px] sm:text-[16px] bg-gradient-to-r from-pink-300 to-blue-500 flex items-center justify-center gap-2"
            >
              Start Verification <ArrowRight size={18} />
            </button>

            {/* Later Button */}
            <button
              onClick={closeModal}
              className="w-full text-[14px] sm:text-[15px] text-[var(--text-dim)] font-medium"
            >
              May Be Later
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <PopupTwo
          closeModal={() => setStep(1)}

          // OPEN FULL PAGE
          nextStep={() => navigate("/getverify")}

          // OPEN SELFIE POPUP
          openSelfie={() => setStep(4)}
        />
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <Selfie
          closeModal={() => setStep(2)}

          // OPEN FULL PAGE
          nextStep={() => navigate("/submit")}
        />
      )}

      {/* STEP 6 */}
      {step === 6 && (
        <VerificationProgress
          closeModal={() => setStep(1)}
        />
      )}
    </>
  );
}

export default VerifyModal;