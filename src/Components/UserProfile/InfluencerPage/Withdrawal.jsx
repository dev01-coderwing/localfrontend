

// import React, { useState } from "react";
// import { X, ShieldCheck } from "lucide-react";
// import ConfirmWithdrawal from "./ConfirmWithdrawal";

// const Withdrawal = ({
//   availableBalance = 182.5,
//   amount = 100,
//   currency = "€",
//   processingTime = "within 24 hours",
//   minimumWithdraw = 20,
// }) => {
//   // Popup State
//   const [open, setOpen] = useState(true);
//   const [showConfirmWithdrawal, setShowConfirmWithdrawal] = useState(false);

//   // Close Popup
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
      
//       {/* Popup */}
//       <div
//         className="
//         bg-[var(--bg-background)]
//           relative
//           w-[92vw]
//           max-w-[620px]
//           rounded-[22px]
//           bg-[var(--bg)]
//           shadow-2xl
//           border border-[var(--border)]
//           overflow-hidden
//           animate-in fade-in zoom-in duration-200
//         "
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5">
//           <h2 className="text-[16px] sm:text-[18px] font-semibold text-[var(--text-dim)]">
//             Withdraw Amount
//           </h2>

//           {/* Close Button */}
//           <button
//             onClick={() => setOpen(false)}
//             className="
//               flex h-8 w-8 items-center justify-center
//               rounded-full
//            bg-[var(--bg-card)]/10 
//               hover:bg-gray-100
//               text-[var(--text-dim)]
//               transition
//               shrink-0
//             "
//           >
//             <X size={16} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          
//           {/* Balance Card */}
//           <div className="mt-4 sm:mt-5 rounded-2xl bg-[var(--bg-card)]/10  p-3 sm:p-4 border border-[var(--border)]">
//             <p className="text-[11px] sm:text-[12px] font-medium text-[var(--text-dim)]">
//               Available Balance
//             </p>

//             <h1 className="mt-2 text-[28px] sm:text-[34px] font-bold tracking-tight text-[var(--text-dim)] break-words">
//               {currency}
//               {availableBalance.toFixed(2)}
//             </h1>

//             <div className="mt-2 flex items-start gap-1 text-[10px] sm:text-[11px]  text-[var(--text-dim2)] leading-relaxed">
//               <div className="mt-[4px] h-[6px] w-[6px] rounded-full bg-black shrink-0" />
//               <span>
//                 Includes all cleared earnings as of today
//               </span>
//             </div>
//           </div>

          

//           {/* Description */}
//           <p className="mt-3 text-center text-[10px] leading-relaxed  text-[var(--text-dim2)] px-1">
//             By submitting, you agree to our influencer Partnership Terms.
//             Approved codes usually go live {processingTime}.
//           </p>

//           {/* Input */}
//           <div className="mt-4 sm:mt-5">
//             <label className="mb-2 block text-[12px] sm:text-[13px] font-medium text-[var(--text-dim)]">
//               Enter Amount
//             </label>

//             <input
//               type="number"
//               defaultValue={amount}
//               className="
//                 h-[50px] sm:h-[52px]
//                 w-full
//                 rounded-xl
//                 border
//                 border-[var(--border)]
//             bg-[var(--bg-card)]/10 
//                 px-4
//                 text-[14px] sm:text-[15px]
//                 text-[var(--text-dim)]
//                 outline-none
//                 transition
//                 focus:border-[#7b8cff]
//                 focus:ring-4
//                 focus:ring-[#7b8cff]/10
//               "
//             />

//             <p className="mt-2 text-[10px] sm:text-[11px]  text-[var(--text-dim2)]">
//               Minimum withdrawal amount is €{minimumWithdraw}.
//             </p>
//           </div>

//           {/* Verification Box */}
//           <div
//             className="
//               mt-4 sm:mt-5
//               flex
//               gap-3
//               rounded-2xl
//               border
//               border-[var(--border)]
//            bg-[var(--bg-card)]/10 
//               p-3 sm:p-4
//             "
//           >
//             <div className="mt-0.5 shrink-0">
//               <ShieldCheck
//                 size={18}
//                 className=" text-[var(--text-dim)]"
//               />
//             </div>

//             <div className="min-w-0">
//               <h4 className="text-[12px] sm:text-[13px] font-semibold  text-[var(--text-dim)]">
//                 Verification Required
//               </h4>

//               <p className="mt-1 text-[10px] sm:text-[11px] leading-relaxed  text-[var(--text-dim2)]">
//                 First withdrawal requires identity verification. 
//                 Allow 2-5 business days for processing after KYC approval.
//               </p>
//             </div>
//           </div>

//           {/* Continue Button */}
//           <button
//            onClick={() => setShowConfirmWithdrawal(true)}
//             className="
//               mt-4 sm:mt-5
//               h-[46px] sm:h-[48px]
//               w-full
//               rounded-xl
//               bg-gradient-to-r
//               from-[#d8909f]
//               to-[#5d73ff]
//               text-[13px] sm:text-[14px]
//               font-medium
//               text-white
//               shadow-md
//               transition
//               hover:opacity-95
//               active:scale-[0.99]
//             ">
//             Continue to Reveiw
//           </button>

//           {/* Footer */}
//           <div className="mt-4 text-center text-[10px] text-[var(--text-dim2)]">
//             🔒 End-to-end encrypted
//           </div>
//         </div>
//       </div>
      
//       {showConfirmWithdrawal && (
//   <ConfirmWithdrawal
//     onClose={() => setShowConfirmWithdrawal(false)}
//   />
// )}
//     </div>
//   );
// };

// export default Withdrawal;




import React, { useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import ConfirmWithdrawal from "./ConfirmWithdrawal";

const Withdrawal = ({
  availableBalance = 182.5,
  amount = 100,
  currency = "€",
  processingTime = "within 24 hours",
  minimumWithdraw = 20,
  onClose,
}) => {
  const { t } = useTranslation();
  const [showConfirmWithdrawal, setShowConfirmWithdrawal] = useState(false);
  console.log("showConfirmWithdrawal =", showConfirmWithdrawal);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
        {/* Popup */}
        <div
          className="
            bg-[var(--bg-background)]
            relative
            w-[92vw]
            max-w-[620px]
            rounded-[22px]
            shadow-2xl
            border border-[var(--border)]
            overflow-hidden
            animate-in fade-in zoom-in duration-200
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5">
            <h2 className="text-[16px] sm:text-[18px] font-semibold text-[var(--text-dim)]">
              {t('withdrawal.withdraw_amount')}
            </h2>

            <button
              onClick={onClose}
              className="
                flex h-8 w-8 items-center justify-center
                rounded-full
                bg-[var(--bg-card)]/10
                hover:bg-gray-100
                text-[var(--text-dim)]
                transition
                shrink-0
              "
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-5 pb-4 sm:pb-5">
            {/* Balance Card */}
            <div className="mt-4 sm:mt-5 rounded-2xl bg-[var(--bg-card)]/10 p-3 sm:p-4 border border-[var(--border)]">
              <p className="text-[11px] sm:text-[12px] font-medium text-[var(--text-dim)]">
                {t('withdrawal.available_balance')}
              </p>

              <h1 className="mt-2 text-[28px] sm:text-[34px] font-bold tracking-tight text-[var(--text-dim)]">
                {currency}
                {availableBalance.toFixed(2)}
              </h1>

              <div className="mt-2 flex items-start gap-1 text-[10px] sm:text-[11px] text-[var(--text-dim2)] leading-relaxed">
                <div className="mt-[4px] h-[6px] w-[6px] rounded-full bg-black shrink-0" />
                <span>{t('withdrawal.includes_earnings')}</span>
              </div>
            </div>

            <p className="mt-3 text-center text-[10px] leading-relaxed text-[var(--text-dim2)] px-1">
              {t('withdrawal.partnership_terms', { processingTime })}
            </p>

            {/* Amount Input */}
            <div className="mt-4 sm:mt-5">
              <label className="mb-2 block text-[12px] sm:text-[13px] font-medium text-[var(--text-dim)]">
                {t('withdrawal.enter_amount')}
              </label>

              <input
                type="number"
                defaultValue={amount}
                className="
                  h-[50px] sm:h-[52px]
                  w-full
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--bg-card)]/10
                  px-4
                  text-[14px] sm:text-[15px]
                  text-[var(--text-dim)]
                  outline-none
                  transition
                  focus:border-[#7b8cff]
                  focus:ring-4
                  focus:ring-[#7b8cff]/10
                "
              />

              <p className="mt-2 text-[10px] sm:text-[11px] text-[var(--text-dim2)]">
                {t('withdrawal.minimum_withdrawal', { amount: minimumWithdraw })}
              </p>
            </div>

            {/* Verification Box */}
            <div
              className="
                mt-4 sm:mt-5
                flex gap-3
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--bg-card)]/10
                p-3 sm:p-4
              "
            >
              <div className="mt-0.5 shrink-0">
                <ShieldCheck
                  size={18}
                  className="text-[var(--text-dim)]"
                />
              </div>

              <div>
                <h4 className="text-[12px] sm:text-[13px] font-semibold text-[var(--text-dim)]">
                  {t('withdrawal.verification_required')}
                </h4>

                <p className="mt-1 text-[10px] sm:text-[11px] leading-relaxed text-[var(--text-dim2)]">
                  {t('withdrawal.verification_desc')}
                </p>
              </div>
            </div>

            {/* Continue Button */}
            {/* <button
              onClick={() => setShowConfirmWithdrawal(true)} */}


              <button
                onClick={(e) => {
               e.stopPropagation();
                  setShowConfirmWithdrawal(true);
                      }}

              className="
                mt-4 sm:mt-5
                h-[46px] sm:h-[48px]
                w-full
                rounded-xl
                bg-gradient-to-r
                from-[#d8909f]
                to-[#5d73ff]
                text-[13px] sm:text-[14px]
                font-medium
                text-white
                shadow-md
                transition
                hover:opacity-95
                active:scale-[0.99]
              "
            >
              {t('withdrawal.continue_to_review')}
            </button>

            <div className="mt-4 text-center text-[10px] text-[var(--text-dim2)]">
              {t('withdrawal.end_to_end_encrypted')}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Withdrawal Popup */}
      {showConfirmWithdrawal && (
        <ConfirmWithdrawal
          onCancel={() => setShowConfirmWithdrawal(false)}
          onConfirm={() => {
            setShowConfirmWithdrawal(false);
            onClose?.();
          }}
        />
      )}
    </>
  );
};

export default Withdrawal;