import React, { useState } from "react";
import { X, IdCard, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PopupTwo({ closeModal, nextStep, openSelfie }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ✅ selected card state
  const [selectedOption, setSelectedOption] = useState("");

  // ✅ continue button function
  const handleContinue = () => {
    // Selfie flow
    if (selectedOption === "selfie") {
      openSelfie();
      return;
    }

    // Upload ID flow
    nextStep();
  };

  return (
    <>
      {/* ================= MAIN POPUP ================= */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3 sm:px-4 py-4 overflow-y-auto">

        <div className="bg-[var(--bg-background)] w-full max-w-[730px] min-h-[501px] rounded-[20px] border border-gray-200 pt-5 sm:pt-[24px] px-4 sm:px-8 md:px-[43px] pb-6 relative flex flex-col gap-4">

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-[var(--bg-card)]/10 text-[var(--text-dim)] border border-[var(--border)] flex items-center justify-center"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <h2 className="text-[19px] sm:text-[23px] font-bold text-[var(--text-dim)]">
            {t('popupTwo.kyc_verification')}
          </h2>

          {/* Content */}
          <div className="flex flex-col items-center mt-2">

            <h3 className="text-[22px] sm:text-[26px] text-center leading-snug font-bold text-[var(--text-dim)]">
              {t('popupTwo.verify_your_identity')}
            </h3>

            <p className="text-[var(--text-dim2)] text-[14px] sm:text-[17px] mt-3 text-center leading-6">
              {t('popupTwo.description')}
            </p>

            {/* Cards */}
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 mt-5 w-full justify-center">

              {/* Upload ID */}
              <div
                onClick={() => setSelectedOption("id")}
                className={`w-full max-w-[240px] min-h-[145px] border rounded-[20px] bg-[var(--bg-card)]/10 flex flex-col items-center justify-center text-center px-3 py-5 cursor-pointer transition-all duration-300 ${
                  selectedOption === "id"
                    ? "border-[#6F61FF] bg-[#F8F5FF]"
                    : "border-[var(--border)]"
                }`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--bg-background)] border border-[var(--border)] flex items-center justify-center">
                  <IdCard
                    className="text-[var(--text-dim)]"
                    size={24}
                  />
                </div>

                <h4 className="text-[15px] sm:text-[16px] font-semibold text-[var(--text-dim)] mt-4 sm:mt-5">
                  {t('popupTwo.upload_gov_id')}
                </h4>

                <p className="text-[13px] sm:text-[15px] text-[var(--text-dim2)] mt-2">
                  {t('popupTwo.id_types')}
                </p>
              </div>

              {/* Selfie */}
              <div
                onClick={() => setSelectedOption("selfie")}
                className={`w-full max-w-[240px] min-h-[145px] bg-[var(--bg-card)]/10 border rounded-[20px] flex flex-col items-center justify-center text-center px-3 py-5 cursor-pointer transition-all duration-300 ${
                  selectedOption === "selfie"
                    ? "border-[#6F61FF] bg-[#F8F5FF]"
                    : "border-[var(--border)]"
                }`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--bg-background)] flex items-center justify-center border border-[var(--border)]">
                  <Camera
                    className="text-[var(--text-dim)]"
                    size={24}
                  />
                </div>

                <h4 className="text-[15px] sm:text-[16px] font-semibold text-[var(--text-dim)] mt-4 sm:mt-5">
                  {t('popupTwo.take_selfie')}
                </h4>

                <p className="text-[13px] sm:text-[15px] text-[var(--text-dim2)] mt-2">
                  {t('popupTwo.quick_photo')}
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full mt-8 sm:mt-12 py-3 rounded-2xl text-white font-semibold text-[16px] sm:text-[18px] bg-gradient-to-r from-pink-300 to-blue-500"
            >
              {t('popupTwo.continue')}
            </button>

            <p className="text-[var(--text-dim2)] mt-4 text-[13px] sm:text-[15px] text-center leading-6">
              {t('popupTwo.privacy_note')}
            </p>

          </div>
        </div>
      </div>
    </>
  );
}

export default PopupTwo;
