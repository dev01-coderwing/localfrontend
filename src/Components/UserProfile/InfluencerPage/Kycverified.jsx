import {React,useState }from "react";
import { useTranslation } from "react-i18next";
import InfluencerWallet from './InfluencerWallet';
import { X } from "lucide-react";

import {
  CheckCircle2,
  Landmark,
  ChevronRight,
  ShieldCheck,
  Wallet,
} from "lucide-react";


const Kycverified = ({
  isOpen = true,
  onClose = () => {},
  balance = "82.50",
  currency = "€",
  bankName = "Bank Detail",
  accountNumber = "**** 1234",
  isVerified = true,
  onWalletClick = () => {},
  onBankClick = () => {},
  onKycClick = () => {},
}) => {
  const { t } = useTranslation();
   const [openWalletPopup, setOpenWalletPopup] = useState(false);

  if (!isOpen) return null;

  if (openWalletPopup) {
  return (
    <InfluencerWallet
      onClose={() => setOpenWalletPopup(false)}
    />
  );
}
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
      onClick={onClose}
    >
      {/* Popup */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-[480px]
          rounded-[28px]
          bg-[var(--bg-background)]
          p-5
          sm:p-6
          shadow-2xl
          overflow-hidden
        "
      >
 {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 border boreder-[var(--border)] rounded-full p-1 shadow text-[var(--text-dim)]"
        >
          <X size={18} />
        </button>


        {/* Top Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div
            className="
              flex items-center gap-1.5
              px-3 py-1.5
              rounded-full
              bg-[#4caf50]/20
              text-[#5CFF72]
              text-[12px]
              sm:text-[13px]
              font-semibold
            "
          >
            <span className="w-2 h-2 rounded-full bg-[#5CFF72]" />
            {t('kycVerified.subscription_active')}
          </div>

          <div
            className="
              flex items-center gap-1.5
              px-3 py-1.5
              rounded-full
              bg-white/10
              text-[var(--text-dim)]
              text-[12px]
              sm:text-[13px]
              font-semibold
            "
          >
            <Wallet size={13} />
            {t('kycVerified.active_balance')}
          </div>
        </div>

        {/* Balance */}
        <div className="mb-7">
          <p className="  text-[var(--text-dim)] text-[15px] sm:text-[16px] font-semibold mb-2">
            {t('kycVerified.available_for_withdrawal')}
          </p>

          <h2 className="text-[var(--text-dim)] text-[42px] sm:text-[48px] font-bold tracking-tight">
            {currency} {balance}
          </h2>
        </div>

        {/* Bank Card */}
        <button
          onClick={onBankClick}
          className="
            w-full
            bg-[var(--bg-card)]/10
            rounded-[24px]
            px-4 py-4
            flex items-center justify-between
            shadow-md
            mb-5
            border border-[var(--border)]
            transition
            hover:scale-[1.01]
          "
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className="
                w-12 h-12
                rounded-full
                 bg-[var(--bg-background)]
                border border-[var(--border)]
                flex items-center justify-center
                shrink-0
              "
            >
              <Landmark className="text-[var(--text-dim)]" size={24} />
            </div>

            {/* Text */}
            <div className="text-left">
              <h3 className="text-[var(--text-dim)] text-[18px] font-bold leading-none">
                {bankName}
              </h3>

              <p className="text-[var(--text-dim2)] text-[15px] mt-1">
                {accountNumber}
              </p>
            </div>
          </div>

          <ChevronRight className="text-[#666]" size={24} />
        </button>

        {/* KYC Card */}
        <div className="relative mb-5">
          {/* Verified Badge */}
          {isVerified && (
            <div
              className="
                absolute
                -top-3
                left-5
                z-10
                px-3 py-1
                rounded-full
                bg-[#4CAF50]
                text-white
                text-[13px]
                font-semibold
                shadow-md
              "
            >
              {t('kycVerified.verified')}
            </div>
          )}

          <button
            onClick={onKycClick}
            className="
              w-full
             bg-[var(--bg-card)]/10
             border border-[var(--border)]
              rounded-[24px]
              px-4 py-3
              flex items-center justify-between
              shadow-md
              transition
              hover:scale-[1.01]
            "
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className="
                  w-12 h-12
                  rounded-full
                   bg-[var(--bg-background)]
                  border border-[var(--border)]
                  flex items-center justify-center
                  shrink-0
                "
              >
                <ShieldCheck className="text-[var(--text-dim)]" size={24} />
              </div>

              {/* Text */}
              <div className="text-left">
                <h3 className="text-[var(--text-dim)] text-[18px] font-bold">
                  {t('kycVerified.kyc_verification')}
                </h3>

                <p
                  className="
                    text-[var(--text-dim2)]
                    text-[15px]
                    leading-6
                    max-w-[230px]
                  "
                >
                  {t('kycVerified.unlock_withdrawals')}
                </p>
              </div>
            </div>

            <ChevronRight className="text-[#666]" size={24} />
          </button>
        </div>

        {/* Wallet Button */}
        <button
          onClick={() => setOpenWalletPopup(true)}
          className="
            w-full
            h-[61px]
            rounded-full
            text-white
            text-[28px]
            sm:text-[21px]
            font-semibold
            bg-gradient-to-r
            from-[#d79aac]
            to-[#5f7cff]
            shadow-lg
            transition
            hover:opacity-95
            active:scale-[0.99]
          "
        >
          {t('kycVerified.wallet_details')}
        </button>
      </div>
    </div>
  );
};

export default Kycverified;
