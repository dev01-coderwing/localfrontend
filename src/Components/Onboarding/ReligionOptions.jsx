import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Image/IAMeetYou-logo2.png";
import { useTranslation } from "react-i18next";

const religions = [
  "Christian",
  "Muslim",
  "Hindu",
  "Buddhist"
];

const ReligionOptions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  return (
   <div className="min-h-screen flex items-center justify-center">

  <div className="w-full max-w-md px-4">

    {/* Logo */}
    <div className="items-center mb-8 justify-center flex gap-2">
      <img
        src={logo}
        alt="logo"
        className="h-10 object-contain"
      />
    </div>

    {/* Progress */}
    <div className="h-1 bg-[var(--border)] rounded-full mb-8">
      <div className="h-1 w-5/6  rounded-full"></div>
    </div>

    {/* Card */}
    <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl shadow">

      <h2 className="text-xl text-[var(--text-dim)] mb-2">
        {t("religionOptions.title")}
      </h2>

      <p className="text-sm mb-6 text-[var(--text-dim2)]">
        {t("religionOptions.subtitle")}
      </p>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {religions.map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`w-full border border-[var(--border)] rounded-lg py-2 transition
            ${
              selected === item
                ? "bg-orange-500 text-white"
                : "bg-[var(--card)] text-[var(--text-dim)]"
            }`}
          >
            {t(`religionOptions.${item.toLowerCase()}`)}
          </button>
        ))}
      </div>

      {/* Skip */}
      <button
        onClick={() => navigate("/astrology")}
        className="w-full mb-3 border border-[var(--border)] rounded-lg py-2 bg-[var(--card)] text-[var(--text-dim)] hover:opacity-80"
      >
        {t("religionOptions.skip")}
      </button>

      {/* Continue */}
      <button
        onClick={() => navigate("/astrology")}
        className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
      >
        {t("religionOptions.continue")}
      </button>

    </div>
  </div>
</div>
  );
};

export default ReligionOptions;
