import React from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const UpgradeModal = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[var(--bg)] w-full max-w-md rounded-3xl p-5 shadow-xl relative border border-purple-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-center text-xl font-semibold mb-3">
          {t("upgradeModal.title")}
        </h2>

        <p className="text-center text-sm text-gray-500 mb-5">
          {t("upgradeModal.description")}
        </p>

        <button
          onClick={() => navigate("/Subscription")}
          className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-400 to-indigo-500 mb-2"
        >
          {t("upgradeModal.cta")}
        </button>

        <button onClick={onClose} className="w-full text-gray-500 text-sm">
          {t("upgradeModal.cancel")}
        </button>
      </div>
    </div>
  );
};

export default UpgradeModal;
