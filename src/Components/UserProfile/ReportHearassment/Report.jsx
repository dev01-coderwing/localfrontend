import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Right from "../layout/Right";
import { useTranslation } from "react-i18next";

import {
  ArrowLeft,
  Upload,
  ShieldAlert,
} from "lucide-react";

function Report() {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-background)] text-[var(--text-dim)]">

      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-3xl p-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">

              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow">
                <ArrowLeft className="w-5 h-5 text-black" />
              </button>

              <h1 className="text-3xl font-semibold">
                {t('report.title')}
              </h1>

            </div>

            {/* Title */}
            <div className="mb-8">

              <h2 className="text-2xl font-semibold mb-2">
                {t('report.section_title')}
              </h2>

              <h3 className="font-medium text-lg mb-1">
                {t('report.context_title')}
              </h3>

              <p className="text-sm text-[var(--text-dim2)] leading-relaxed">
                {t('report.anonymous_note')}
              </p>

            </div>

            {/* Details Input */}
            <div className="mb-8">

              <label className="block text-sm font-medium mb-3">
                {t('report.add_details')}
              </label>

              <textarea
                placeholder={t('report.incident_placeholder')}
                className="w-full h-32 rounded-2xl border border-[var(--border)] bg-[var(--bg-background)] p-4 resize-none outline-none focus:ring-2 focus:ring-purple-400"
              />

            </div>

            {/* Upload Section */}
            <div className="mb-10">

              <h3 className="text-sm font-medium mb-4">
                {t('report.attach_screenshots')}
              </h3>

              <div className="flex gap-4 flex-wrap">

                {/* Upload Box */}
                <label className="w-24 h-24 rounded-2xl border border-dashed border-[var(--border)] flex flex-col items-center justify-center cursor-pointer hover:bg-[var(--hover)] transition">

                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                    <Upload className="w-5 h-5 text-red-400" />
                  </div>

                  <span className="text-xs text-[var(--text-dim2)]">
                    {t('report.upload')}
                  </span>

                  <input
                    type="file"
                    className="hidden"
                  />

                </label>

                {/* Empty Preview Boxes */}
                <div className="w-24 h-24 rounded-2xl border border-[var(--border)] bg-[var(--bg-background)]"></div>

                <div className="w-24 h-24 rounded-2xl border border-[var(--border)] bg-[var(--bg-background)]"></div>

              </div>

            </div>

            {/* Buttons */}
            <div className="space-y-3">

              <button
                onClick={() => setShowPopup(true)}
                className="w-full py-3 rounded-2xl text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
              >
                {t('report.submit_report')}
              </button>

              <button className="w-full py-3 rounded-2xl border border-[#f79174] text-[#f79174] hover:bg-[#f79174]/10 transition">
                {t('report.cancel')}
              </button>

            </div>

          </div>

          {/* RIGHT SECTION */}
          <aside className="w-full">
            <Right />
          </aside>

        </div>

      </div>

      {/* MODAL */}
      {showPopup && (

        <div className="fixed inset-0 bg-[var(--bg-background)] flex items-center justify-center z-50 px-4">

          <div className="bg-[var(--bg-background)] rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">

            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">

              <ShieldAlert className="w-8 h-8 text-red-500" />

            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-[#1B1B4B] mb-3">
              {t('report.modal_title')}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {t('report.modal_desc')}
            </p>

            <p className="text-sm text-purple-500 font-medium mb-6">
              {t('report.user_muted')}
            </p>

            {/* Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-3 rounded-2xl text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
            >
              {t('report.done')}
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Report;
