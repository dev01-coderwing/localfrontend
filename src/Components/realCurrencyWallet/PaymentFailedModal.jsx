import React from "react";

import {
  X,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const PaymentFailedModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-[var(--bg)] backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">

      {/* MODAL */}
      <div className="w-full max-w-[500px] bg-[var(--card)] rounded-[24px] p-5 shadow-2xl relative animate-scaleIn">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"
        >
          <X size={16} className="text-[var(--text)]" />
        </button>

        {/* TOP TITLE */}
        <h2 className="text-[15px] font-semibold text-[var(--text)]">
          {t('payment.failed.top_title')}
        </h2>

        {/* ERROR ICON */}
        <div className="flex justify-center mt-8">

          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">

            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
              <AlertCircle
                size={30}
                className="text-white"
              />
            </div>
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center mt-5">

          <h3 className="text-[28px] font-bold text-[var(--text)]">
            {t('payment.failed.title')}
          </h3>

          <p className="text-[var(--text-dim)] text-sm leading-6 mt-3 px-4">
            {t('payment.failed.description')}
          </p>
        </div>

        {/* PREVIEW BOX */}
        <div className="mt-8 h-[110px] rounded-[18px] bg-[#EADAF7]"></div>

        {/* RETRY BUTTON */}
        <button className="w-full mt-8 py-3 rounded-[12px] text-white font-semibold text-sm bg-gradient-to-r from-[#D79098] to-[#5F7BF4] hover:opacity-95 transition">
          {t('payment.failed.retry')}
        </button>

        {/* CHANGE PAYMENT */}
        <button className="w-full mt-5 text-center text-sm text-[var(--text-dim)] font-medium">
          {t('payment.failed.change_method')}
        </button>
      </div>
    </div>
  );
};

export default PaymentFailedModal;