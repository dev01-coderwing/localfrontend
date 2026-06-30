import React from "react";
import { X, Building2, IdCard, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

function PopupOne({ closeModal, goNext }) {
  const { t } = useTranslation();
  return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-[var(--bg)]  w-[480px] h-[500px] rounded-[20px] border border-gray-200 pt-[24px] pr-[43px] pb-[24px] pl-[43px] relative flex flex-col gap-4">

      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-5 right-5 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"
      >
        <X size={18} />
      </button>

      {/* Title */}
      <h2 className="text-[21px] font-bold text-[var(--text)]">
        {t('popupOne.kyc_verification')}
      </h2>

      {/* Icon */}
      <div className="flex justify-center mt-0">
        <div className="w-[78px] h-[78px] rounded-full bg-[#F5EFFF] flex items-center justify-center">
          <Building2 size={35} className="text-[#1B1B3D]" />
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-center text-[25px] font-bold text-[var(--text)]">
        {t('popupOne.quick_identity_check')}
      </h3>

      {/* Description */}
      <p className="text-center text-[var(--text-dim)] text-[15px] leading-7">
        {t('popupOne.description')}
      </p>

      {/* Info Box */}
      <div className="bg-[var(--card)] rounded-2xl p-4 flex items-start gap-3 border border-[var(--border)] ">
        <div className="w-11 h-11 rounded-xl bg-[var(--bg)] flex items-center justify-center shrink-0">
          <IdCard className="text-[#7B61FF]" size={18} />
        </div>
        <div>
          <h4 className="font-semibold text-[var(--text)] text-[15px]">
            {t('popupOne.only_gov_id')}
          </h4>
          <p className="text-[var(--text-dim)] text-sm mt-1">{t('popupOne.takes_minutes')}</p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={goNext}
        className="w-full py-2 rounded-2xl text-white font-semibold text-[16px] bg-gradient-to-r from-pink-300 to-blue-500 flex items-center justify-center gap-2"
      >
        {t('popupOne.start_verification')} <ArrowRight size={18} />
      </button>

      {/* Later Button */}
      <button
        onClick={closeModal}
        className="w-full text-[var(--text-dim)]  font-medium text-[15px]"
      >
        {t('popupOne.may_be_later')}
      </button>
    </div>
    </div>
  );
}

export default PopupOne;
