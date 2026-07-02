import React, { useState } from "react";

import {
  X,
  Plus,
  CreditCard,
  Wallet,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const PaymentMethodModal = ({
  onClose,
  onContinue,
}) => {
  const { t } = useTranslation();

  const [selectedMethod, setSelectedMethod] =
    useState("card");

  return (
    <div className="fixed inset-0 bg-[var(--bg)] backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">

  {/* MODAL */}
  <div className="w-full max-w-[500px] bg-[var(--card)] rounded-[28px] p-6 shadow-2xl relative animate-scaleIn">

    {/* CLOSE */}
    <button
      onClick={onClose}
      className="absolute top-5 right-5 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
    >
      <X size={18} className="text-[var(--text-dim)]" />
    </button>

    {/* TOP TITLE */}
    <h2 className="text-[18px] font-bold text-[var(--text)]">
      {t('payment.method.top_title')}
    </h2>

    {/* CENTER TEXT */}
    <div className="text-center mt-8">

      <h3 className="text-[20px] font-bold text-[var(--text)]">
        {t('payment.method.title')}
      </h3>

      <p className="text-[var(--text-dim)] text-sm mt-2">
        {t('payment.method.subtitle')}
      </p>
    </div>

    {/* PAYMENT OPTIONS */}
    <div className="mt-8 space-y-4">

      {/* ADD CARD */}
      <div className="border border-gray-200 rounded-[20px] p-4 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Plus size={20} className="text-blue-500" />
          </div>

          <h4 className="text-[15px] font-medium text-[var(--text)]">
            {t('payment.method.add_new_card')}
          </h4>
        </div>

        <button className="px-3 py-1 rounded-full bg-purple-100 text-purple-500 font-semibold text-xs">
          {t('payment.method.add')}
        </button>
      </div>

      {/* CARD OPTION */}
      <div
        onClick={() => setSelectedMethod("card")}
        className={`border rounded-[20px] p-4 flex items-center justify-between cursor-pointer transition
          
          ${
            selectedMethod === "card"
              ? "border-blue-400 shadow-sm"
              : "border-gray-200"
          }
        `}
      >

        <div className="flex items-center gap-4">

          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <CreditCard
              size={18}
              className="text-blue-500"
            />
          </div>

          <div>
            <h4 className="text-[15px] font-medium text-[var(--text)]">
              {t('payment.method.credit_debit_card')}
            </h4>

            <p className="text-[var(--text-dim)] text-xs mt-1">
              {t('payment.method.visa_ending')}
            </p>
          </div>
        </div>

        {/* RADIO */}
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${
              selectedMethod === "card"
                ? "border-blue-500"
                : "border-gray-300"
            }
          `}
        >
          {selectedMethod === "card" && (
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          )}
        </div>
      </div>

      {/* PAYPAL */}
      <div
        onClick={() => setSelectedMethod("paypal")}
        className={`border rounded-[20px] p-4 flex items-center justify-between cursor-pointer transition
          
          ${
            selectedMethod === "paypal"
              ? "border-blue-400 shadow-sm"
              : "border-gray-200"
          }
        `}
      >

        <div className="flex items-center gap-4">

          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Wallet
              size={18}
              className="text-blue-500"
            />
          </div>

          <div>
            <h4 className="text-[15px] font-medium text-[var(--text)]">
              {t('payment.method.paypal')}
            </h4>

            <p className="text-[var(--text-dim)] text-xs mt-1">
              {t('payment.method.paypal_desc')}
            </p>
          </div>
        </div>

        {/* RADIO */}
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${
              selectedMethod === "paypal"
                ? "border-blue-500"
                : "border-gray-300"
            }
          `}
        >
          {selectedMethod === "paypal" && (
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          )}
        </div>
      </div>
    </div>

    {/* PAY BUTTON */}
    <button
  onClick={onContinue}
  className="w-full mt-10 py-3 rounded-[14px] text-white text-base font-semibold bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
>
  {t('payment.method.pay_now')}
</button>
  </div>
</div>
  );
};

export default PaymentMethodModal;