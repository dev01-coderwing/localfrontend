import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Image/IAMeetYou.png";
import { useDispatch } from "react-redux";
import { updateReligionThunk } from "../Redux/onboardingSlice";
import { useTranslation } from "react-i18next";

const Religion = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
const dispatch = useDispatch();

  const [religion, setReligion] = useState("");

const handleContinue = async () => {

  try {

    const religionData = {
      religion,
    };

    await dispatch(
  updateReligionThunk(religionData)
);

    navigate("/astrology");

  } catch (error) {
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center ">

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
          <div className="h-1 w-4/5 bg-orange-500 rounded-full"></div>
        </div>

        {/* Card */}
        <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl shadow">

          <h2 className="text-xl mb-2 text-[var(--text-dim)] font-semibold">
            {t("religion.title")}
          </h2>

          <p className="text-sm mb-6 opacity-70 text-[var(--text-dim2)]">
            {t("religion.subtitle")}
          </p>

          {/* Select */}
          <select
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 mb-4 bg-[var(--bg-card)]/10 text-[var(--text-dim2)]"
          >
            <option value="">{t("religion.preferNotToSpecify")}</option>
            <option value="Christian">{t("religion.christian")}</option>
            <option value="Muslim">{t("religion.muslim")}</option>
            <option value="Hindu">{t("religion.hindu")}</option>
            <option value="Buddhist">{t("religion.buddhist")}</option>
          </select>

          {/* Skip */}
          <button
            onClick={handleContinue}
            className="w-full mb-3 border border-[var(--border)] rounded-lg py-2 text-[var(--text-dim2)] hover:opacity-80"
          >
            {t("religion.skip")}
          </button>

          {/* Continue */}
          <button
           onClick={handleContinue}
            className="w-full py-2 rounded-lg text-[var(--text)] bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
          >
            {t("religion.continue")}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Religion;
