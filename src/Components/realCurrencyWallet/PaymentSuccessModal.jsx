import React from "react";

import {
  X,
  Check,
} from "lucide-react";

const PaymentSuccessModal = ({ onClose }) => {

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

        {/* TITLE */}
        <h2 className="text-[15px] font-semibold text-[var(--text)]">
          Payment Success
        </h2>

        {/* SUCCESS ICON */}
        <div className="flex justify-center mt-8">

          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
              <Check
                size={30}
                className="text-white"
              />
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div className="text-center mt-5">

          <h3 className="text-[28px] font-bold text-[var(--text)] leading-tight">
            Credit Added
            <br />
            Successfully
          </h3>
        </div>

        {/* DETAILS CARD */}
        <div className="mt-6 bg-[#F7F2FA] rounded-[20px] p-5">

          {/* ROW */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">

            <p className="text-[var(--text-dim2)] text-sm">
              Added Amount
            </p>

            <p className="text-black font-semibold text-sm">
              €50.00
            </p>
          </div>

          {/* ROW */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">

            <p className="text-[var(--text-dim2)] text-sm">
              Updated Balance
            </p>

            <p className="text-black font-semibold text-sm">
              €68.96
            </p>
          </div>

          {/* ROW */}
          <div className="flex items-center justify-between pt-3">

            <p className="text-[var(--text-dim2)] text-sm">
              Transaction ID
            </p>

            <p className="text-black text-xs font-medium">
              TXN-98234105
            </p>
          </div>
        </div>

        {/* RECEIPT PREVIEW */}
        <div className="mt-5 h-[110px] rounded-[18px] bg-[#EADAF7]"></div>

        {/* BUTTON */}
        <button className="w-full mt-5 py-3 rounded-[12px] text-white font-semibold text-sm bg-gradient-to-r from-[#D79098] to-[#5F7BF4] hover:opacity-95 transition">
          Back to wallet
        </button>

        {/* DOWNLOAD */}
        <button className="w-full mt-4 text-center text-sm text-[var(--text-dim)] font-medium">
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;