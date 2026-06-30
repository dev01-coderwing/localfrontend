// import React from "react";
// import { X, Building2, Check } from "lucide-react";

// const ConfirmWithdrawal = ({
//   open = true,
//   onClose = () => {},
//   amount = 100,
//   currency = "€",
//   bankName = "Bank Detail",
//   accountNumber = "**** 1234",
//   onConfirm = () => {},
//   onCancel = () => {},
// }) => {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
//   <div
//   className="
//     relative
//     w-[92vw]
//     max-w-[620px]
//     rounded-[22px]
//     bg-white
//     shadow-2xl
//     border border-[#ececec]
//     overflow-hidden
//     animate-in fade-in zoom-in duration-200
//   "
// >
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 pt-5">
//           <h2 className="text-[15px] font-medium text-[#5f5f5f]">
//             Confirm Withdrawal
//           </h2>

//           <button
//             onClick={onClose}
//             className="
//               flex h-7 w-7 items-center justify-center
//               rounded-full
//               text-[#6b6b6b]
//               hover:bg-gray-100
//               transition
//             "
//           >
//             <X size={15} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-5 pb-5">
//           {/* Success Icon */}
//           <div className="mt-2 flex flex-col items-center justify-center">
//             <div className="relative flex items-center justify-center">
//               {/* Decorative dots */}
//               <div className="absolute h-[90px] w-[90px] rounded-full border border-dashed border-[#6C63FF]/20" />

//               {/* Main Circle */}
//               <div
//                 className="
//                   relative
//                   z-10
//                   flex
//                   h-[78px]
//                   w-[78px]
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-[#5B61F6]
//                   shadow-lg
//                 "
//               >
//                 <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
//                   <Check
//                     size={18}
//                     strokeWidth={3}
//                     className="text-[#5B61F6]"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Title */}
//             <h1 className="mt-5 text-[26px] font-bold text-[#1f1f1f]">
//               Confirm Withdrawal
//             </h1>

//             <p className="mt-2 max-w-[260px] text-center text-[12px] leading-relaxed text-[#8b8b8b]">
//               Please review your payout details carefully before finalizing the
//               transaction.
//             </p>
//           </div>

//           {/* Amount Card */}
//           <div className="mt-6 rounded-2xl bg-[#f8ece9] p-4">
//             <p className="text-[12px] font-medium text-[#5d5d5d]">
//               Withdrawal Amount
//             </p>

//             <h2 className="mt-2 text-[36px] font-bold tracking-tight text-[#1e1e1e]">
//               {currency}
//               {amount.toFixed(2)}
//             </h2>

//             {/* Bank Detail */}
//             <div
//               className="
//                 mt-4
//                 flex
//                 items-center
//                 gap-3
//                 rounded-xl
//                 bg-white
//                 px-4
//                 py-3
//                 border
//                 border-[#efefef]
//               "
//             >
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f7f7f7]">
//                 <Building2 size={18} className="text-[#1f1f1f]" />
//               </div>

//               <div>
//                 <h4 className="text-[13px] font-semibold text-[#1f1f1f]">
//                   {bankName}
//                 </h4>

//                 <p className="text-[11px] text-[#8a8a8a]">
//                   {accountNumber}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Confirm Button */}
//           <button
//             onClick={onConfirm}
//             className="
//               mt-5
//               h-[48px]
//               w-full
//               rounded-xl
//               bg-gradient-to-r
//               from-[#d58fa0]
//               to-[#5e73ff]
//               text-[14px]
//               font-medium
//               text-white
//               shadow-md
//               transition
//               hover:opacity-95
//               active:scale-[0.99]
//             "
//           >
//             Confirm Payout
//           </button>

//           {/* Cancel Button */}
//           <button
//             onClick={onCancel}
//             className="
//               mt-3
//               h-[48px]
//               w-full
//               rounded-xl
//               border
//               border-[#f1d4d8]
//               bg-white
//               text-[14px]
//               font-medium
//               text-[#d09aa4]
//               transition
//               hover:bg-[#fff8f8]
//             "
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmWithdrawal;



// import React, { useState } from "react";
// import { X, Building2, Check } from "lucide-react";

// const ConfirmWithdrawal = ({
//   amount = 100,
//   currency = "€",
//   bankName = "Bank Detail",
//   accountNumber = "**** 1234",
//   onConfirm = () => {},
//   onCancel = () => {},
// }) => {
//   // Popup State
//   const [open, setOpen] = useState(true);

//   // Close Popup
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      
//       <div
//         className="
//           relative
//           w-[92vw]
//           max-w-[620px]
//           rounded-[22px]
//           bg-[var(--bg-background)]
//           shadow-2xl
//           border border-[var(--border)]
//           overflow-hidden
//           animate-in fade-in zoom-in duration-200
//         "
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 pt-5">
//           <h2 className="text-[15px] font-medium text-[var(--text-dim)]">
//             Confirm Withdrawal
//           </h2>

//           {/* Close Button */}
//           <button
//             onClick={() => setOpen(false)}
//             className="
//               flex h-7 w-7 items-center justify-center
//               rounded-full
//               text-[var(--text-dim)]
//               hover:bg-gray-100
//               transition
//             "
//           >
//             <X size={15} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-5 pb-5">
          
//           {/* Success Icon */}
//           <div className="mt-2 flex flex-col items-center justify-center">
//             <div className="relative flex items-center justify-center">
              
//               {/* Decorative dots */}
//               <div className="absolute h-[90px] w-[90px] rounded-full border border-dashed border-[#6C63FF]/20" />

//               {/* Main Circle */}
//               <div
//                 className="
//                   relative
//                   z-10
//                   flex
//                   h-[78px]
//                   w-[78px]
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-[#5B61F6]
//                   shadow-lg
//                 "
//               >
//                 <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
//                   <Check
//                     size={18}
//                     strokeWidth={3}
//                     className="text-[#5B61F6]"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Title */}
//             <h1 className="mt-5 text-[26px] font-bold text-[var(--text-dim)]">
//               Confirm Withdrawal
//             </h1>

//             <p className="mt-2 max-w-[260px] text-center text-[12px] leading-relaxed text-[var(--text-dim2)]">
//               Please review your payout details carefully before finalizing the
//               transaction.
//             </p>
//           </div>

//           {/* Amount Card */}
//           <div className="mt-6 rounded-2xl  p-4 border border-[var(--border)] bg-[var(--bg-card)]/10">
//             <p className="text-[12px] font-medium text-[var(--text-dim)]">
//               Withdrawal Amount
//             </p>

//             <h2 className="mt-2 text-[36px] font-bold tracking-tight text-[var(--text-dim)]">
//               {currency}
//               {amount.toFixed(2)}
//             </h2>

//             {/* Bank Detail */}
//             <div
//               className="
//                 mt-4
//                 flex
//                 items-center
//                 gap-3
//                 rounded-xl
//                 text-[var(--text-dim)]
//                 px-4
//                 py-3
//                 bg-[var(--bg-background)]
//                 border
//                 border-[var(--accent)]
//               "
//             >
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-background)] border border-[var(--accent)]">
//                 <Building2 size={18} className="text-[var(--text-dim)]" />
//               </div>

//               <div>
//                 <h4 className="text-[13px] font-semibold text-[var(--text-dim)]">
//                   {bankName}
//                 </h4>

//                 <p className="text-[11px] text-[var(--text-dim2)] ">
//                   {accountNumber}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Confirm Button */}
//           <button
//             onClick={onConfirm}
//             className="
//               mt-5
//               h-[48px]
//               w-full
//               rounded-xl
//               bg-gradient-to-r
//               from-[#d58fa0]
//               to-[#5e73ff]
//               text-[14px]
//               font-medium
//               text-white
//               shadow-md
//               transition
//               hover:opacity-95
//               active:scale-[0.99]
//             "
//           >
//             Confirm Payout
//           </button>

//           {/* Cancel Button */}
//           <button
//             onClick={() => {
//               onCancel();
//               setOpen(false);
//             }}
//             className="
//               mt-3
//               h-[48px]
//               w-full
//               rounded-xl
//               border
//               border-[var(--border)]
//                text-[14px]
//               font-medium
//               text-[var(--text-dim)]
//               transition
//               hover:bg-[var(--bg)]
//             "
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmWithdrawal;









// import React from "react";
// import { X, Building2, Check } from "lucide-react";

// const ConfirmWithdrawal = ({
//   amount = 100,
//   currency = "€",
//   bankName = "Bank Detail",
//   accountNumber = "**** 1234",
//   onConfirm = () => {},
//   onCancel = () => {},
// }) => {
//   return (
//     <div
//       className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//       onClick={onCancel}
//     >
//       {/* POPUP CARD */}
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="
//           relative
//           w-[92vw]
//           max-w-[620px]
//           rounded-[22px]
//           bg-[var(--bg-background)]
//           shadow-2xl
//           border border-[var(--border)]
//           overflow-hidden
//           animate-in fade-in zoom-in duration-200
//         "
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 pt-5">
//           <h2 className="text-[15px] font-medium text-[var(--text-dim)]">
//             Confirm Withdrawal
//           </h2>

//           <button
//             onClick={onCancel}
//             className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--text-dim)] hover:bg-gray-100"
//           >
//             <X size={15} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-5 pb-5">
          
//           {/* Success Icon */}
//           <div className="mt-2 flex flex-col items-center justify-center">
//             <div className="relative flex items-center justify-center">
//               <div className="absolute h-[90px] w-[90px] rounded-full border border-dashed border-[#6C63FF]/20" />

//               <div className="relative z-10 flex h-[78px] w-[78px] items-center justify-center rounded-full bg-[#5B61F6] shadow-lg">
//                 <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
//                   <Check size={18} strokeWidth={3} className="text-[#5B61F6]" />
//                 </div>
//               </div>
//             </div>

//             <h1 className="mt-5 text-[26px] font-bold text-[var(--text-dim)]">
//               Confirm Withdrawal
//             </h1>

//             <p className="mt-2 max-w-[260px] text-center text-[12px] text-[var(--text-dim2)]">
//               Please review your payout details carefully before finalizing the transaction.
//             </p>
//           </div>

//           {/* Amount */}
//           <div className="mt-6 rounded-2xl p-4 border border-[var(--border)] bg-[var(--bg-card)]/10">
//             <p className="text-[12px] font-medium text-[var(--text-dim)]">
//               Withdrawal Amount
//             </p>

//             <h2 className="mt-2 text-[36px] font-bold text-[var(--text-dim)]">
//               {currency}{amount.toFixed(2)}
//             </h2>

//             {/* Bank */}
//             <div className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 bg-[var(--bg-background)] border border-[var(--border)]">
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)]">
//                 <Building2 size={18} />
//               </div>

//               <div>
//                 <h4 className="text-[13px] font-semibold text-[var(--text-dim)]">
//                   {bankName}
//                 </h4>
//                 <p className="text-[11px] text-[var(--text-dim2)]">
//                   {accountNumber}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Confirm */}
//           <button
//             onClick={onConfirm}
//             className="mt-5 h-[48px] w-full rounded-xl bg-gradient-to-r from-[#d58fa0] to-[#5e73ff] text-white font-medium"
//           >
//             Confirm Payout
//           </button>

//           {/* Cancel */}
//           <button
//             onClick={onCancel}
//             className="mt-3 h-[48px] w-full rounded-xl border border-[var(--border)] text-[var(--text-dim)]"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmWithdrawal;




import React from "react";
import { X, Building2, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const ConfirmWithdrawal = ({
  amount = 100,
  currency = "€",
  bankName = "Bank Detail",
  accountNumber = "**** 1234",
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onCancel}
    >
      {/* Popup Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-[92vw]
          max-w-[620px]
          rounded-[22px]
          bg-[var(--bg-background)]
          shadow-2xl
          border border-[var(--border)]
          overflow-hidden
          animate-in fade-in zoom-in duration-200
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5">
          <h2 className="text-[15px] font-medium text-[var(--text-dim)]">
            {t('confirmWithdrawal.confirm_withdrawal')}
          </h2>

          <button
            onClick={onCancel}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-full
              text-[var(--text-dim)]
              hover:bg-[var(--bg-card)]/20
              transition
            "
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pb-5">
          {/* Success Icon */}
          <div className="mt-2 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-[90px] w-[90px] rounded-full border border-dashed border-[#6C63FF]/20" />

              <div className="relative z-10 flex h-[78px] w-[78px] items-center justify-center rounded-full bg-[#5B61F6] shadow-lg">
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
                  <Check
                    size={18}
                    strokeWidth={3}
                    className="text-[#5B61F6]"
                  />
                </div>
              </div>
            </div>

            <h1 className="mt-5 text-[26px] font-bold text-[var(--text-dim)]">
              {t('confirmWithdrawal.confirm_withdrawal')}
            </h1>

            <p className="mt-2 max-w-[280px] text-center text-[12px] text-[var(--text-dim2)]">
              {t('confirmWithdrawal.review_payout')}
            </p>
          </div>

          {/* Amount Card */}
          <div className="mt-6 rounded-2xl p-4 border border-[var(--border)] bg-[var(--bg-card)]/10">
            <p className="text-[12px] font-medium text-[var(--text-dim)]">
              {t('confirmWithdrawal.withdrawal_amount')}
            </p>

            <h2 className="mt-2 text-[36px] font-bold text-[var(--text-dim)]">
              {currency}
              {amount.toFixed(2)}
            </h2>

            {/* Bank Details */}
            <div className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 bg-[var(--bg-background)] border border-[var(--border)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)]">
                <Building2 size={18} />
              </div>

              <div>
                <h4 className="text-[13px] font-semibold text-[var(--text-dim)]">
                  {bankName}
                </h4>

                <p className="text-[11px] text-[var(--text-dim2)]">
                  {accountNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="
              mt-5
              h-[48px]
              w-full
              rounded-xl
              bg-gradient-to-r
              from-[#d58fa0]
              to-[#5e73ff]
              text-white
              font-medium
              hover:opacity-95
              transition
            "
          >
            {t('confirmWithdrawal.confirm_payout')}
          </button>

          {/* Cancel Button */}
          <button
            onClick={onCancel}
            className="
              mt-3
              h-[48px]
              w-full
              rounded-xl
              border border-[var(--border)]
              text-[var(--text-dim)]
              hover:bg-[var(--bg-card)]/10
              transition
            "
          >
            {t('confirmWithdrawal.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWithdrawal;