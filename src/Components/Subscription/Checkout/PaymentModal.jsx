import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SuccessPopup = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-background)] w-full max-w-sm rounded-2xl shadow-xl p-6 text-center">

        {/* Icon */}
        <div className="w-16 h-16 mx-auto bg-indigo-500 text-[var(--text)] flex items-center justify-center rounded-full text-2xl">
          ✓
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold mt-4 text-[var(--text-dim)]">
          {t("subscription.confirmSubscription")}
        </h2>

        <p className="text-sm text-[var(--text-dim2)] mt-2">
          {t("subscription.confirmQuestion")}
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full mt-5 py-3 rounded-xl text-[var(--text)] font-medium bg-gradient-to-r from-pink-400 to-blue-500"
        >
          {t("subscription.confirm")}
        </button>
      </div>
    </div>
  );
};

const PaymentModal = () => {
  const { t } = useTranslation();
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
            {t("subscription.secureCheckout")}
          </h2>

          <h1 className="text-xl font-semibold mt-1 text-[var(--text-dim)]">
            {t("subscription.paymentMethod")}
          </h1>

          <p className="text-sm text-[var(--text-dim2)] mt-1">
            {t("subscription.paymentSubtitle")}
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
              {t("subscription.cardTab")}
            </button>

            <button
              onClick={() => setMethod("apple")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all
        ${method === "apple"
                  ? "bg-purple-500 text-white"
                  : "text-[var(--text-dim2)]"
                }`}
            >
              {t("subscription.applePayTab")}
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
            {t("subscription.pay")}
          </button>

          {/* Footer */}
          <div className="mt-5 border-t border-[var(--border)] pt-4 text-center">

            <p className="text-sm font-medium text-[var(--text-dim)]">
              {t("subscription.secureStripe")}
            </p>

            <p className="text-xs text-[var(--text-dim2)]">
              {t("subscription.encryptionActive")}
            </p>

            <div className="flex justify-around mt-3 text-S text-[var(--text-dim2)]">
              <span> {t("subscription.encrypted")}</span>
              <span> {t("subscription.bankGrade")}</span>
              <span> {t("subscription.private")}</span>
            </div>

            <p className="text-[10px] text-[var(--text-dim2)] mt-3 leading-relaxed">
              {t("subscription.purchaseTerms")}
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
