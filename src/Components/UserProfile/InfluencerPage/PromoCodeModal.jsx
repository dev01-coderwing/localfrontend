




import React, { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import SubmitPromoCode from "./SubmitPromoCode";

const PromoCodeModal = ({ open = true, onClose = () => {} }) => {
  
  const [code, setCode] = useState("YUORCODE15");
  const [showSubmitPromoCode, setShowSubmitPromoCode] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3">
      
      <div
        className="
          w-full max-w-md
          bg-[var(--bg-background)] rounded-2xl shadow-xl relative overflow-hidden
          max-h-[95vh]
        "
      >

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 border boreder-[var(--border)] rounded-full p-1 shadow text-[var(--text-dim)]"
        >
          <X size={18} />
        </button>

        {/* Header Image */}
        <div className="w-full flex justify-center pt-5">
          <img
            src="./Image/promo.png"
            alt="Promo Code"
            className="w-40 sm:w-52 object-contain"
          />
        </div>

        {/* Title */}
        <div className="text-center mt-3 px-6 text-[var(--text-dim)]">
          <h2 className="text-xl font-semibold ">Create Promo Code</h2>
        </div>

        {/* Form */}
        <div className="px-6 mt-4 space-y-3 ">

          {/* Code Name */}
          <div>
            <label className="text-sm font-medium text-[var(--text-dim)]">
              Code Name
            </label>

            <div className="relative mt-1">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border border-[var(--border)] text-[var(--text-dim2)]  rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <div className="absolute right-3 top-2.5 flex items-center gap-1 text-green-600 text-xs">
                <CheckCircle size={14} />
                Available
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div>
            <label className="text-sm  text-[var(--text-dim)]">Live Preview</label>
            <div className="mt-1 w-full border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-dim2)] font-semibold">
              {code}
            </div>
          </div>

          {/* Info Box */}
          <div className=" border border-[var(--border)] rounded-lg p-3 text-sm  text-[var(--text-dim2)]">
            <div className="font-medium text-[var(--text-dim)] ">Client Discount</div>
            Commission rates are fixed and applied automatically to your earning dashboard.
          </div>

          {/* Feature Tags */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs px-3 py-1 border border-[var(--border)] text-[var(--text-dim)] rounded-full">
              Secure Payouts
            </span>
            <span className="text-xs px-3 py-1  border border-[var(--border)] text-[var(--text-dim)] rounded-full">
              Real-time analytics
            </span>
          </div>

          {/* Button */}
          <button 
            onClick={() => setShowSubmitPromoCode(true)}
          className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-pink-400 to-indigo-500 hover:opacity-90 transition">
            Submit for Approval
          </button>

          <p className="text-[10px] text-center text-[var(--text-dim2)] pb-4">
            By submitting, you agree to our Influencer Partnership Terms. Approved codes usually go live within 24 hours.
          </p>

        </div>
      </div>
      {showSubmitPromoCode && (
  <SubmitPromoCode
    closeModal={() => setShowSubmitPromoCode(false)}
  />
)}
    </div>
  );
};

export default PromoCodeModal;