
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import SubmitTwo from './SubmitTwo';
import Kycverified from './Kycverified';

const AddBankPopup = ({
  isOpen = true,
  onClose = () => {},
  onSubmit = () => {},
  initialName
}) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);

  // Local Form States
  const [accountHolder, setAccountHolder] = useState(initialName ?? user?.fullName ?? '');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');

  // Submit Popup State
  // const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showKycVerified, setShowKycVerified] = useState(false);

  // Escape + body scroll
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

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      accountHolder,
      accountNumber,
      bankName
    });


    // Open KYC Verified popup
setShowKycVerified(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-[620px] bg-[var(--bg-background)] rounded-[32px] pt-4 pb-3 px-5 md:pt-5 md:pb-4 md:px-6 shadow-2xl transform transition-all flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Header Title & Close Icon */}
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-lg md:text-xl font-bold text-[var(--text-dim)] tracking-wide">
              {t('addBankPopup.add_bank_details')}
            </h3>

            {/* WORKING CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full border bg-[var(--bg-card)]/10 hover: text-[var(--text-dim)] transition-colors"
              aria-label="Close layout"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Central Brand Header */}
          <div className="flex flex-col items-center text-center mb-3">
            <div className="hidden sm:flex w-10 h-10 bg-[var(--bg-card)] rounded-full items-center justify-center text-neutral-900 mb-1.5 shadow-inner shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V10M12 21V10M5 21V10M3 21h18M3 10h18M12 3L3 10h18l-9-7z" />
              </svg>
            </div>

            <h4 className="text-base md:text-lg font-bold text-[var(--text-dim)] tracking-wide leading-none">
              {t('addBankPopup.payout_details')}
            </h4>

            <p className="text-[11px] sm:text-xs font-medium text-[var(--text-dim2)] mt-1 max-w-sm">
              {t('addBankPopup.complete_registration')}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2.5 border border-[var(--border)]  bg-[var(--bg-card)]/10  rounded-2xl p-3.5"
          >

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {/* Account Holder */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] sm:text-xs font-bold text-[var(--text-dim)] tracking-wide ">
                  {t('addBankPopup.account_holder_name')}
                </label>

                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-[var(--text-dim)] ">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z"/>
                    </svg>
                  </span>

                  <input
                    type="text"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[var(--bg-background)]  text-[var(--text-dim)]  border border-[var(--border)] rounded-xl text-xs sm:text-sm font-medium placeholder- focus:outline-none transition-colors"
                    placeholder={t('addBankPopup.enter_name')}
                    required
                  />
                </div>
              </div>

              {/* Account Number */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] sm:text-xs font-bold text-[var(--text-dim)] tracking-wide">
                  {t('addBankPopup.account_number')}
                </label>

                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-[var(--text-dim)]">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </span>

                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[var(--bg-background)] border border-[var(--border)] rounded-xl text-xs sm:text-sm font-medium text-[var(--text-dim)] placeholder- focus:outline-none focus:border-[var] transition-colors"
                    placeholder={t('addBankPopup.enter_account_number')}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bank Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] sm:text-xs font-bold text-[var(--text-dim)] tracking-wide">
                {t('addBankPopup.bank_name')}
              </label>

              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-[var(--text-dim)]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V10M12 21V10M5 21V10M3 21h18M3 10h18M12 3L3 10h18l-9-7z" />
                  </svg>
                </span>

                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-[var(--border)] text-[var(--text-dim)] bg-[var(--bg-background)] rounded-xl text-xs sm:text-sm font-medium  placeholder- focus:outline-none focus:border-neutral-400 transition-colors"
                  placeholder={t('addBankPopup.enter_bank_name')}
                  required
                />
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex gap-2 p-2 bg-[var(--card)] rounded-xl border border-[var(--border)] text-[10px] sm:text-[11px] text-[var(--text-dim)] font-medium leading-normal">
              <div className="w-3.5 h-3.5 border border-[var(--border)] rounded-full bg-[var(--card)] flex items-center justify-center text-[var(--text-dim)] shrink-0 mt-0.5 text-[9px] font-bold">
                i
              </div>

              <p className='text-[var(--text-dim2)]'>
                {t('addBankPopup.disclaimer_text')}{" "}
                <a href="#privacy" className="text-[var(--text-dim)] hover:underline">
                  {t('addBankPopup.privacy_policy')}
                </a>
              </p>
            </div>

            {/* Button */}
            <div className="flex flex-col gap-1.5 mt-0.5">
              <button
                type="submit"
                className="w-full py-2.5 text-center text-white font-semibold tracking-wide text-sm bg-gradient-to-r from-[#d2909b] via-[#ad89d3] to-[#6676ee] rounded-full shadow-md hover:brightness-105 active:scale-[0.99] transition-all duration-150"
              >
                {t('addBankPopup.save_bank_account')}
              </button>

              <div className="flex items-center justify-center gap-1 text-[9px] font-bold text-[var(--text-dim)] uppercase tracking-wider">
                <svg className="w-2.5 h-2.5 text-[var(--text-dim)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>

                {t('addBankPopup.end_to_end_encrypted')}
              </div>
            </div>
          </form>
        </div>
      </div>

     {showKycVerified && (
  <Kycverified
    onClose={() => setShowKycVerified(false)}
  />
)}
    </>
  );
};

export default AddBankPopup;


