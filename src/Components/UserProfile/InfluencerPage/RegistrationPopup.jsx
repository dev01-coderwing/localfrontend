


import React, { useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import SubmitApplication from "./SubmitApplication";

function RegistrationPopup({ closePopup }) {
  const { t } = useTranslation();
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  const agreementData = [
    {
      title: "Accept Influencer Term",
      desc: "I have read and agree to the general terms of service and influencer conduct guidelines.",
    },
    {
      title: "Accept Commission Policy",
      desc: "I agree to the payout schedule and performance-based commission structure.",
    },
    {
      title: "KYC verification requirement",
      desc: "I understand identity verification is mandatory for payouts.",
    },
  ];

  const handleSubmit = () => {
    // closePopup(); // closes current popup
    setShowSubmitPopup(true); // opens next popup
  };

  return (
    <>
      <div className="fixed border border-[var(--border)] inset-0 z-50 flex items-center justify-center  bg-black/60  backdrop-blur-[3px] p-2 sm:p-4">

        {/* Popup Card */}
        <div
          className="
          text-[var(--text)]
            relative
            w-full
            max-w-[90vw]
            sm:max-w-[500px]
            md:max-w-[540px]
            lg:max-w-[580px]
            bg-[var(--bg)]
            rounded-[18px]
            sm:rounded-[22px]
            shadow-2xl
            border
            border-[var(--border)]
            max-h-[95vh]
            overflow-hidden
            bg-[var(--bg-background)]
          "
        >
          {/* Header */}
          <div className="px-4 sm:px-5 pt-2 pb-1">

            {/* Top Row */}
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-[16px] sm:text-[18px] font-semibold  text-[var(--text-dim)]">
                {t('registrationPopup.influencer_registration')}
              </h2>

              <button
                onClick={closePopup}
                className="h-8 w-8 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-gray-100 transition shrink-0 bg-[var(--bg-card)]/10 "
              >
                <X size={16} className="text-[var(--text-dim)]" />
              </button>
            </div>

            {/* Center Text */}
            <div className="mt-2 text-center">
              <h3 className="text-[18px] sm:text-[22px] md:text-[24px] font-semibold text-[var(--text-dim)]">
                {t('registrationPopup.join_the_elite')}
              </h3>

              <p className="mt-1 text-[12px] sm:text-[13px]  text-[var(--text-dim2)] leading-5">
                {t('registrationPopup.complete_registration')}
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-4 sm:px-5 pb-3">

            {/* Personal Info */}
            <div className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)]/10  p-3">

              <div className="flex items-center gap-2 mb-3">
                <div className="h-5 w-5 rounded-full bg-[#eef2ff] flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-[#6675f7]" />
                </div>

                <h4 className="text-[14px] sm:text-[15px] font-semibold  text-[var(--text-dim)]">
                  {t('registrationPopup.personal_info')}
                </h4>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Full Name */}
                <div className="w-full">
                  <label className="text-[12px] font-medium  text-[var(--text-dim)] block mb-1">
                    {t('registrationPopup.full_name')}
                  </label>

                  <input
                    type="text"
                    placeholder={t('registrationPopup.full_name_placeholder')}
                    className="
                    text-[var(--text-dim)]
                      w-full
                      h-[40px]
                      sm:h-[42px]
                      rounded-[12px]
                     border border-[var(--border)]
                    bg-[var(--bg-background)]
                      px-3
                      text-[13px]
                      outline-none
                      focus:border-[#6675f7]
                    "
                  />
                </div>

                {/* Email */}
                <div className="w-full">
                  <label className="text-[12px] font-medium text-[var(--text-dim)] block mb-1">
                    {t('registrationPopup.email_address')}
                  </label>

                  <input
                    type="email"
                    placeholder={t('registrationPopup.email_placeholder')}
                    className="
                      w-full
                       text-[var(--text-dim)]
                      h-[40px]
                      sm:h-[42px]
                      rounded-[12px]
                      border border-[var(--border)]
                      px-3
                      text-[13px]
                      outline-none
                      focus:border-[#6675f7]
                      bg-[var(--bg-background)]
                    "
                  />
                </div>
              </div>
            </div>

            {/* Agreement Section */}
            <div className="mt-2 rounded-[16px] border border-[var(--border)] p-3  bg-[var(--bg-card)]/10 ">

              <div className="flex items-center gap-2 mb-3">
                <div className="h-5 w-5 rounded-full bg-[#fff1e6] flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-[#ff9d4d]" />
                </div>

                <h4 className="text-[14px] sm:text-[15px] font-semibold  text-[var(--text-dim)]">
                  {t('registrationPopup.agreement')}
                </h4>
              </div>

              <div className="flex flex-col gap-2">
                {agreementData.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 accent-[var(--accent)] shrink-0"
                    />

                    <div className="min-w-0">
                      <h5 className="text-[13px] font-semibold text-[var(--text-dim)] ">
                        {t(`registrationPopup.agreement_${index}_title`)}
                      </h5>

                      <p className="text-[11px] sm:text-[12px] text-[var(--text-dim2)]  mt-0.5 leading-4">
                        {t(`registrationPopup.agreement_${index}_desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="
                mt-2
                w-full
                h-[42px]
                rounded-[12px]
                bg-gradient-to-r
                from-[#d68d9d]
                to-[#6279ff]
                text-white
                text-[14px]
                font-semibold
                hover:opacity-95
                transition
              "
            >
              {t('registrationPopup.submit_application')}
            </button>
          </div>
        </div>
      </div>

      {/* Submit Application Popup */}
      {showSubmitPopup && (
        <SubmitApplication
          closePopup={() => setShowSubmitPopup(false)}
        />
      )}
    </>
  );
}

export default RegistrationPopup;
