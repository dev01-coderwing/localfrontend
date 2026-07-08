import React from "react";
import Navbar from "../../Navbar/Navbar";
import Right from "../layout/Right";
import { useTranslation } from "react-i18next";

import {
  BellOff,
  CircleOff,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

function SafetyTools() {
  const { t } = useTranslation();

  const manageOptions = [
    {
      titleKey: "mute_user_title",
      descKey: "mute_user_desc",
      icon: <BellOff className="w-5 h-5" />,
    },
    {
      titleKey: "block_user_title",
      descKey: "block_user_desc",
      icon: <CircleOff className="w-5 h-5" />,
    },
  ];

  const reportOptionKeys = [
    "harassment",
    "fake_account",
    "other",
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-background)] text-[var(--text-dim)]">

      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 bg-[var(--bg-card)]/10  border border-[var(--border)] rounded-3xl p-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">

              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow">
                <ArrowLeft className="w-5 h-5 text-black" />
              </button>

              <h1 className="text-3xl font-semibold">
                {t('safety.title')}
              </h1>

            </div>

            {/* SAFETY TOOLS */}
            <div className="mb-10">

              <h2 className="text-xl font-semibold mb-1">
                {t('safety.section_title')}
              </h2>

              <p className="text-sm text-[var(--text-dim2)] mb-5">
                {t('safety.subtitle')}
              </p>

              <div className="space-y-4">

                {manageOptions.map((item, index) => (

                  <div
                    key={index}
                    className="border border-[var(--border)] rounded-2xl p-4 flex items-center justify-between hover:bg-[var(--hover)] transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center">
                        {item.icon}
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg">
                          {t(`safety.${item.titleKey}`)}
                        </h3>

                        <p className="text-sm text-[var(--text-dim2)]">
                          {t(`safety.${item.descKey}`)}
                        </p>
                      </div>

                    </div>

                    <ChevronRight className="text-gray-400 w-5 h-5" />

                  </div>

                ))}

              </div>

            </div>

            {/* REPORT SECTION */}
            <div>

              <h2 className="text-xl font-semibold mb-1">
                {t('safety.report_section')}
              </h2>

              <p className="text-sm text-[var(--text-dim2)] mb-5">
                {t('safety.report_subtitle')}
              </p>

              <div className="space-y-3">

                {reportOptionKeys.map((key, index) => (

                  <div
                    key={index}
                    className="border border-[var(--border)] rounded-2xl px-4 py-4 flex items-center justify-between hover:bg-[var(--hover)] transition cursor-pointer"
                  >

                    <h3 className="font-medium">
                      {t(`safety.${key}`)}
                    </h3>

                    <ChevronRight className="text-gray-400 w-5 h-5" />

                  </div>

                ))}

              </div>

            </div>

            {/* BUTTON */}
            <button className="w-full mt-10 py-3 rounded-2xl text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition">
              {t('safety.cancel')}
            </button>

          </div>

          {/* RIGHT SECTION */}
          <aside className="w-full">
            <Right />
          </aside>

        </div>

      </div>

    </div>
  );
}

export default SafetyTools;

