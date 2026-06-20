



import React, { useEffect, useState } from 'react';
import AddBankPopup from "./AddBankPopup";
import InfluencerWallet from './InfluencerWallet';
import { X } from "lucide-react";

const WalletPopup = ({ 
  isOpen = true, 
  onClose = () => {}, 
  balance = "82.50", 
  isSubscriptionActive = true,
  kycStatus = "Pending",
  onAddBankClick = () => {}, 
  onKycClick = () => {},
  onWalletDetailsClick = () => {}
}) => {

  // ONLY ADDED STATE
  const [openBankPopup, setOpenBankPopup] = useState(false);
  const [openWalletPopup, setOpenWalletPopup] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // SWITCH TO BANK POPUP (no UI change logic)
  if (openBankPopup) {
    return (
      <AddBankPopup
        onClose={() => setOpenBankPopup(false)}
      />
    );
  }

  if (openWalletPopup) {
  return (
    <InfluencerWallet
      onClose={() => setOpenWalletPopup(false)}
    />
  );
}



  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[380px] sm:max-w-md bg-[var(--bg-background)]  border border-[var(--border)]  rounded-[32px] p-6 shadow-2xl border border-white/5 transform transition-all flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
          {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 border boreder-[var(--border)] rounded-full p-1 shadow text-[var(--text-dim)]"
                >
                  <X size={18} />
                </button>
        
        {/* HEADER (UNCHANGED EXACTLY) */}
        <div className="flex flex-wrap items-center gap-2">
          {isSubscriptionActive && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#283d2c] text-[#4ade80] rounded-full text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full"></span>
              Subscription Active
            </div>
          )}
          <div className="inline-flex items-center px-3 py-1 bg-white/10 text-white/40 rounded-full text-xs font-medium tracking-wide">
            Active Balance
          </div>
        </div>

        {/* BALANCE (UNCHANGED) */}
        <div className="flex flex-col gap-0.5">
          <span className="text-xs sm:text-sm font-medium text-[var(--text-dim2)] tracking-wide">
            Available for withdrawal
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-dim)] tracking-tight mt-1">
            € {balance}
          </h2>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3.5">
          
          {/* ADD BANK (ONLY FUNCTION ADDED HERE) */}
          <button 
            onClick={() => setOpenBankPopup(true)}
            className="w-full flex items-center justify-between p-3 bg-[var(--bg-card)]/10  border border-[var(--border)] rounded-2xl shadow-sm  active:scale-[0.99] transition-all duration-150 group text-left focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <div className="w-9.5 h-9.5 border border-[var(--border)] bg-[var(--bg-background)] rounded-full flex items-center justify-center text-[var(--text-dim)] shrink-0">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V10M12 21V10M5 21V10M3 21h18M3 10h18M12 3L3 10h18l-9-7z" />
                </svg>
              </div>
              <span className="font-bold text-[var(--text-dim)] tracking-wide text-sm sm:text-base">
                Add Bank Details
              </span>
            </div>
            <svg className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* KYC (FULL ORIGINAL UI RESTORED — NOTHING REMOVED) */}
          <div className="relative pt-1.5">
            <div className="absolute -top-0.5 left-5 z-10 px-2.5 py-0.5 bg-[#8b5cf6] text-white text-[10px] font-bold rounded-md uppercase tracking-wider shadow-sm">
              {kycStatus}
            </div>
            
            <button 
              onClick={onKycClick}
              className="w-full flex items-center justify-between p-3 bg-[var(--bg-card)]/10  border border-[var(--border)]  rounded-2xl shadow-sm active:scale-[0.99] transition-all duration-150 group text-left focus:outline-none"
            >
              <div className="flex items-center gap-3 ">
                <div className="w-9.5 h-9.5 border border-[var(--border)] bg-[var(--bg-background)] rounded-full flex items-center justify-center text-[var(--text-dim)]  shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a3 3 0 100-6 3 3 0 000 6zm5.657-1.343a7 7 0 00-7.314 0" />
                  </svg>
                </div>

                <div className="flex flex-col gap-0.5 pr-2 ">
                  <span className="font-bold text-[var(--text-dim)] tracking-wide text-sm sm:text-base">
                    KYC Verification
                  </span>
                  <p className="text-[11px] sm:text-xs text-[var(--text-dim2)] font-medium leading-tight max-w-[210px] sm:max-w-xs">
                    To unlock withdrawals, complete a quick identity check.
                  </p>
                </div>
              </div>

              <svg className="w-4 h-4 text-neutral-400 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

        {/* FOOTER (UNCHANGED) */}
        <div className="mt-1">
          <button 
            // onClick={onWalletDetailsClick}
             onClick={() => setOpenWalletPopup(true)}
            className="w-full py-3.5 text-center text-white font-semibold tracking-wide text-sm md:text-base bg-gradient-to-r from-[#d2909b] via-[#ad89d3] to-[#6676ee] rounded-full border border-white/10 shadow-lg hover:brightness-105 active:scale-[0.98] transition-all duration-150"
          >
            Wallet Details
          </button>
        </div>

      </div>
    </div>
  );
};

export default WalletPopup;





