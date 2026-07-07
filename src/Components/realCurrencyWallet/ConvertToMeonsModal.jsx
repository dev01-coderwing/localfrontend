import React, { useState } from "react";
import { X, Minus, Plus, Info } from "lucide-react";
import { useTranslation } from "react-i18next";



const ConvertToMeonsModal = ({
  onClose,
  onContinue,
}) => {
  const { t } = useTranslation();

  const [amount, setAmount] = useState(10);

  // 1€ = 100 Meons
  const meons = amount * 100;

  return (
    <div className="fixed inset-0 bg-[var(--bg)] backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">

  <div className="w-full max-w-[500px] bg-[var(--card)] rounded-[26px] p-5 shadow-2xl relative animate-scaleIn">

    {/* CLOSE BUTTON */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 w-9 h-9 rounded-full border bg-[var(--bg)] border-gray-200 flex items-center justify-center"
    >
      <X size={16} className="text-[var(--text-dim)]" />
    </button>

    {/* TITLE */}
    <h2 className="text-[18px] font-semibold text-[var(--text)] mb-4">
      {t('wallet.convert_to_meons')}
    </h2>

    {/* TOP CARD */}
    <div
      className="relative h-[140px] rounded-[18px] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('/Image/meonsImg.png')`,
      }}
    >

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* CONTENT */}
      <div className="absolute bottom-4 left-4 text-white">

        <h3 className="text-[22px] font-bold flex items-center gap-1">
          {t('wallet.rate_display')}
          <img
            src={coin}
            className="w-5 h-5 object-contain"
          />
        </h3>

        <p className="text-xs text-white/80 mt-1">
          {t('wallet.live_conversion_rate')}
        </p>
      </div>
    </div>

    {/* ENTER AMOUNT */}
    <div className="mt-5">

      <p className="text-sm font-medium text-[var(--text)] mb-2">
        {t('wallet.enter_amount')}
      </p>

      <div className="border border-gray-200 rounded-[18px] p-5 flex items-center justify-center gap-6">

        {/* MINUS */}
        <button
          onClick={() => {
            if (amount > 1) {
              setAmount(amount - 1);
            }
          }}
          className="w-10 h-10 rounded-full bg-[var(--bg)] flex items-center justify-center"
        >
          <Minus size={16} className="text-[var(--text-dim)]" />
        </button>

        {/* AMOUNT */}
        <div className="text-center">

          <p className="text-xs text-[var(--text-dim)]">
            {t('wallet.store_credit')}
          </p>

          <h2 className="text-[28px] font-bold text-[var(--text)] leading-none mt-1">
            {amount.toFixed(2)}
          </h2>
        </div>

        {/* PLUS */}
        <button
          onClick={() => setAmount(amount + 1)}
          className="w-10 h-10 rounded-full bg-[var(--bg)] flex items-center justify-center"
        >
          <Plus size={16} className="text-[var(--text-dim)]" />
        </button>
      </div>
    </div>

    {/* RECEIVE BOX */}
    <div className="mt-4 border border-gray-200 rounded-[18px] p-4">

      <p className="text-xs text-[var(--text-dim)] text-center mb-2">
        {t('wallet.you_will_receive')}
      </p>

      <div className="flex items-center justify-center gap-2">

        <img
          src={coin}
          alt="coin"
          className="w-8 h-14 "
        />

        <h2 className="text-[34px] font-bold text-[var(--text)] leading-none">
          {meons}
        </h2>
      </div>
    </div>

    {/* NOTICE */}
    <div className="mt-4 border border-gray-200 rounded-[16px] p-3 flex gap-3">

      <div className="mt-0.5">
        <Info size={16} className="text-[var(--text-dim)]" />
      </div>

      <div>
        <h4 className="text-xs font-semibold text-[var(--text)]">
          {t('wallet.important_notice')}
        </h4>

        <p className="text-[11px] text-[var(--text-dim)] leading-4 mt-1">
          {t('wallet.meons_notice')}
        </p>
      </div>
    </div>

    {/* BUTTON */}
  <button
  onClick={onContinue}
  className="w-full mt-6 py-3 rounded-[14px] text-white font-medium text-base bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
>
  {t('wallet.convert_to_meons')}
</button>
  </div>

</div>

  );
};

export default ConvertToMeonsModal;
