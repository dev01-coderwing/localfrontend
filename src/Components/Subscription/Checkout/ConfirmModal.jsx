import React from "react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
 <div className="fixed inset-0 bg-[var(--bg-background)]  flex justify-center items-center  px-4">

<div className="bg-[var(--bg-background)] border border-[var(--border)] rounded-2xl w-full max-w-[350px] p-6 text-center shadow-lg">
    {/* Success Icon */}
    <div className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
      ✓
    </div>

    {/* Heading */}
    <h2 className="text-lg font-semibold mb-2 text-[var(--text-dim)]">
      {t("subscription.confirmSubscription")}
    </h2>

    {/* Description */}
    <p className="text-[var(--text-dim2)] text-sm mb-4 leading-relaxed">
      {t("subscription.confirmQuestion")}
    </p>

    {/* Confirm Button */}
    <button
      onClick={() => navigate("/Lanuch")}
      className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-400 to-blue-500 shadow-md hover:opacity-90 transition"
    >
      {t("subscription.confirm")}
    </button>

    {/* Cancel */}
    <button
      onClick={onCancel}
      className="mt-3 text-[var(--text-dim2)] text-sm hover:text-[var(--text-dim)] transition"
    >
      {t("subscription.cancel")}
    </button>

  </div>
</div>
  );
};

export default ConfirmModal;


