import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const SuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-background)] w-full max-w-sm rounded-2xl shadow-xl p-6 text-center">

        {/* Icon */}
        <div className="w-16 h-16 mx-auto bg-indigo-500 text-[var(--text)] flex items-center justify-center rounded-full text-2xl">
          ✓
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold mt-4 text-[var(--text-dim)]">
          Confirm Subscription
        </h2>

        <p className="text-sm text-[var(--text-dim2)] mt-2">
          Are you sure you want to proceed with your selected plan?
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full mt-5 py-3 rounded-xl text-[var(--text)] font-medium bg-gradient-to-r from-pink-400 to-blue-500"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
const PaymentModal = () => {
  const [method, setMethod] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed inset-0  flex items-center justify-center z-50 pt-28 bg-[var(--bg-background)]">
        <div className="bg-[var(--bg-card)]/10 border border-[var(--border)] w-full max-w-md rounded-2xl shadow-xl p-6 relative">

          {/* Close Button */}
          <button className="absolute top-4 right-4 text-[var(--text-dim2)] hover:text-[var(--text-dim)] transition">
            ✕
          </button>

          {/* Header */}
          <h2 className="text-sm text-[var(--text-dim2)]">
            Secure Checkout
          </h2>

          <h1 className="text-xl font-semibold mt-1 text-[var(--text-dim)]">
            Payment Method
          </h1>

          <p className="text-sm text-[var(--text-dim2)] mt-1">
            Select your preferred method for premium access
          </p>

          {/* Tabs */}
          <div className="flex bg-[var(--bg-background)] border border-[var(--border)] rounded-xl p-1 mt-4">

            <button
              onClick={() => setMethod("card")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
        ${method === "card"
                  ? "bg-purple-500 text-white"
                  : "text-[var(--text-dim2)]"
                }`}
            >
              Card
            </button>

            <button
              onClick={() => setMethod("apple")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
        ${method === "apple"
                  ? "bg-purple-500 text-white"
                  : "text-[var(--text-dim2)]"
                }`}
            >
              Apple Pay
            </button>

          </div>

          {/* Card Form */}
          {method === "card" && (
            <div className="mt-4 border border-[var(--border)] bg-[var(--bg-background)] rounded-xl p-4">

              {/* Card Icons */}
              <div className="flex gap-2 mb-3">

                <span className="border border-[var(--border)] bg-[var(--bg-card)]/10 text-[var(--text-dim)] px-3 py-1 rounded text-xs">
                  VISA
                </span>

                <span className="border border-[var(--border)] bg-[var(--bg-card)]/10 text-[var(--text-dim)] px-3 py-1 rounded text-xs">
                  MasterCard
                </span>

              </div>

              {/* Card Number */}
              <input
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                className="w-full border border-[var(--border)] bg-[var(--bg-card)]/10 text-[var(--text-dim)] placeholder:text-[var(--text-dim2)] rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              {/* Expiry & CVC */}
              <div className="flex gap-2">

                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 border border-[var(--border)] bg-[var(--bg-card)]/10 text-[var(--text-dim)] placeholder:text-[var(--text-dim2)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <input
                  type="text"
                  placeholder="CVC"
                  className="w-1/2 border border-[var(--border)] bg-[var(--bg-card)]/10 text-[var(--text-dim)] placeholder:text-[var(--text-dim2)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

              </div>

            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={() => setShowSuccess(true)}
            className="bg-gradient-to-r from-pink-400 to-blue-500 text-white px-4 py-3 rounded-xl w-full mt-5 font-medium shadow-md hover:opacity-90 transition"
          >
            Pay
          </button>

          {/* Footer */}
          <div className="mt-5 border-t border-[var(--border)] pt-4 text-center">

            <p className="text-sm font-medium text-[var(--text-dim)]">
              Secure Stripe Checkout
            </p>

            <p className="text-xs text-[var(--text-dim2)]">
              encryption active
            </p>

            <div className="flex justify-around mt-3 text-S text-[var(--text-dim2)]">
              <span> ENCRYPTED</span>
              <span> BANK GRADE</span>
              <span> PRIVATE</span>
            </div>

            <p className="text-[10px] text-[var(--text-dim2)] mt-3 leading-relaxed">
              By completing this purchase you agree to our Terms of Service.
              Your data is protected under privacy framework.
            </p>

          </div>

          {showSuccess && (
            <SuccessPopup
              onClose={() => navigate("/Lanuch")}
            />
          )}

        </div>
      </div>

    </>
  );
};

export default PaymentModal;