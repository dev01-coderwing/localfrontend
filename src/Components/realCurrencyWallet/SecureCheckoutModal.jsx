import React, { useState } from "react";

import {
  X,
  ShieldCheck,
  Lock,
  Landmark,
  EyeOff,
} from "lucide-react";

const SecureCheckoutModal = ({
  onClose,
  onSuccess,
}) => {

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  return (
    <div className="fixed inset-0 bg-[var(--bg)] backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">

      {/* MODAL */}
      <div className="w-full max-w-[500px] bg-[var(--card)] rounded-[24px] p-5 shadow-2xl relative animate-scaleIn">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
        >
          <X size={16} className="text-[var(--text-dim)]" />
        </button>

        {/* TOP */}
        <h3 className="text-[15px] font-semibold text-[var(--text)] ">
          Secure Checkout
        </h3>

        {/* TITLE */}
        <div className="mt-4">

          <h2 className="text-[24px] font-bold text-[var(--text)]">
            Payment Method
          </h2>

          <p className="text-xs text-[var(--text-dim)] mt-1">
            Select your preferred method for premium access
          </p>
        </div>

        {/* TABS */}
        <div className="mt-5 flex bg-gray-100 rounded-[12px] p-1 w-fit">

          <button
            onClick={() => setPaymentMethod("card")}
            className={`px-8 py-2.5 rounded-[10px] text-xs font-semibold transition
              
              ${
                paymentMethod === "card"
                  ? "bg-gradient-to-r from-[#B14EFF] to-[#8B5CF6] text-white shadow-md"
                  : "text-gray-700"
              }
            `}
          >
            Card
          </button>

          <button
            onClick={() => setPaymentMethod("apple")}
            className={`px-8 py-2.5 rounded-[10px] text-xs font-semibold transition
              
              ${
                paymentMethod === "apple"
                  ? "bg-gradient-to-r from-[#B14EFF] to-[#8B5CF6] text-white shadow-md"
                  : "text-gray-700"
              }
            `}
          >
            Apple Pay
          </button>
        </div>

        {/* PAYMENT BOX */}
        <div className="mt-5 border border-gray-200 rounded-[18px] p-4">

          {/* CARD LOGOS */}
          <div className="flex items-center gap-2">

            <div className="px-3 py-1.5 border border-gray-200 rounded-full text-xs font-bold text-blue-900">
              VISA
            </div>

            <div className="px-3 py-1.5 border border-gray-200 rounded-full text-xs font-bold text-red-500">
              mastercard
            </div>
          </div>

          {/* INPUTS */}
          <div className="mt-4">

            <label className="text-xs font-medium text-[var(--text)]">
              Card Number
            </label>

            <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full mt-2 h-[42px] rounded-[12px] border border-gray-200 px-4 outline-none text-sm"
            />
          </div>

          {/* ROW */}
         
       <div className="grid grid-cols-2 gap-3 mt-3">

  <input
    type="text"
    placeholder="MM/YY"
    className="w-full h-[42px] rounded-[12px] border border-gray-200 px-4 outline-none text-sm"
  />

  <input
    type="text"
    placeholder="CVC"
    className="w-full h-[42px] rounded-[12px] border border-gray-200 px-4 outline-none text-sm"
  />
</div>
          {/* PAY BUTTON */}
          <button
  onClick={onSuccess}
  className="w-full mt-4 py-3 rounded-[12px] text-white font-semibold text-sm bg-gradient-to-r from-[#D79098] to-[#5F7BF4] hover:opacity-95 transition"
>
  Pay €44.99
</button>
        </div>

        {/* STRIPE */}
        <div className="mt-5 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={16}
              className="text-gray-700"
            />

            <div>
              <h4 className="text-xs font-semibold text-[var(--text)]">
                Secure Stripe Checkout
              </h4>

              <p className="text-[10px] text-[var(--text-dim)]">
                encryption active
              </p>
            </div>
          </div>

          <div className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-[9px] font-semibold">
            PCI COMPLIANT
          </div>
        </div>

        {/* FEATURES */}
        <div className="mt-5 border-t border-gray-200 pt-4 flex justify-between text-center">

          {/* ITEM */}
          <div className="flex flex-col items-center gap-2">

            <div className="w-7 h-7 rounded-full bg-[var(--bg)] flex items-center justify-center">
              <Lock size={14} />
            </div>

            <p className="text-[10px] font-semibold text-[var(--text-dim)]">
              ENCRYPTED
            </p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-center gap-2">

            <div className="w-7 h-7 rounded-full bg-[var(--bg)] flex items-center justify-center">
              <Landmark size={14} />
            </div>

            <p className="text-[10px] font-semibold text-[var(--text-dim)]">
              BANK GRADE
            </p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-center gap-2">

            <div className="w-7 h-7 rounded-full bg-[var(--bg)] flex items-center justify-center">
              <EyeOff size={14} />
            </div>

            <p className="text-[10px] font-semibold text-[var(--text-dim)]">
              PRIVATE
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-[10px] text-[var(--text-dim)] text-center leading-5 mt-5 px-2">
          By completing this purchase you agree to our Terms of Service.
          Your data is protected under IAMeetYou's privacy framework.
        </p>
      </div>
    </div>
  );
};

export default SecureCheckoutModal;