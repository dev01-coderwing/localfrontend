import React from "react";
import Navbar from "../Navbar/Navbar";
import Brain1 from "../../../public/Image/Brain1.png";
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Lanuch() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-background)] p-4 font-sans">

        <div className="w-full max-w-xl bg-[var(--card)] text-[var(--text)] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-12 text-center relative overflow-hidden">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full bg-[var(--bg-card)]/10  text-[#E91E63] mb-8">
            <BadgeCheck className="w-4 h-4 fill-[var(--accent)] text-white" />
            <span className="opacity-80">{t("launch.badge")}</span>
          </div>

          {/* Avatar Circle */}
          <div className="relative flex justify-center mb-10">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#A855F7] via-[#EC4899] to-[#FB923C] flex items-center justify-center shadow-[0_10px_30px_rgba(236,72,153,0.3)] relative border-[5px] border-[var(--card)]">
              <img src={Brain1} alt="Brain AI" className="w-15 h-15 drop-shadow-md" />

              {/* Floating Tag 1 */}
              <div className="absolute -right-20 top-4 bg-[var(--bg-card)]/10 shadow-[0_8px_20px_rgba(0,0,0,0.08)] p-1 px-2 rotate-[-2deg] rounded-xl flex items-center gap-2 border border-[var(--border)]">
                <div className="w-6 h-6 rounded-full bg-[#F0FDF4] flex items-center justify-center">
                  <img src="/Image/voice.png" alt="" className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[7px] text-[var(--text-dim)] font-bold uppercase tracking-wider leading-none">{t("launch.voiceSyncLabel")}</p>
                  <p className="text-[10px] font-bold text-[var(--text-dim2)] leading-tight">{t("launch.voiceSyncValue")}</p>
                </div>
              </div>

              {/* Floating Tag 2 */}
              <div className="absolute -left-20 bottom-0  bg-[var(--bg-card)]/10 shadow-[0_8px_20px_rgba(0,0,0,0.08)] p-1 px-2 rotate-[2deg] rounded-xl flex items-center gap-2 border border-[var(--border)]">
                <div className="w-6 h-6 rounded-full bg-[#FFF1F2] flex items-center justify-center">
                  <img src="/Image/HeartIconLaunch.png" alt="" className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[7px] text-[var(--text-dim)] font-bold uppercase tracking-wider leading-none">{t("launch.emotionalToneLabel")}</p>
                  <p className="text-[10px] font-bold text-[var(--text-dim2)] leading-tight">{t("launch.emotionalToneValue")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-[28px] font-bold text-[var(--text-dim)] mb-4">
            {t("launch.title")}
          </h2>

          {/* Description */}
          <div className="max-w-sm mx-auto">
            <p className="text-[var(--text-dim2)] text-sm leading-[1.6] mb-8 font-medium">
              {t("launch.descriptionPart1")}
              <br /><br />
              {t("launch.descriptionPart2")}
            </p>
          </div>

          {/* Button */}
          <button className="bg-gradient-to-r from-[#D79098] to-[#5F7BF4] text-white px-10 py-2 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:opacity-95 transition-all transform hover:scale-[1.02] active:scale-[0.98] font-semibold flex items-center gap-2 mx-auto"
            onClick={
              () => {
                navigate("/CompatibilityTest")
              }
            }>
            {t("launch.begin")}
            <span className="text-xl">→</span>
          </button>

        </div>
      </div>
    </>
  );
}

export default Lanuch;
