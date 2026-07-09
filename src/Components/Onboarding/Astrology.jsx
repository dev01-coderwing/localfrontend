import React, { useState } from "react";
const logo = "/Image/IAMeetYou.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAstrologyThunk } from "../Redux/onboardingSlice";
import { useTranslation } from "react-i18next";


const Astrology = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
const dispatch = useDispatch();

  const [astro, setAstro] = useState({
    dob: "",
    time: "",
    place: "",
    zodiac: ""
  });

  const handleChange = (e) => {
    setAstro({ ...astro, [e.target.name]: e.target.value });
  };

  const handleContinue = async () => {

  try {

  await dispatch(
  updateAstrologyThunk(astro)
);

    navigate("/subscription");

  } catch (error) {
  }
};

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
      <div className="h-1 w-full  rounded-full"></div>
    </div>

    {/* Card */}
    <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl shadow">

      <h2 className="text-3xl text-[var(--text-dim)] mb-2">
        {t("astrology.title")}
      </h2>

      <p className="text-sm mb-6 text-[var(--text-dim2)]">
        {t("astrology.subtitle")}
      </p>

      {/* Inputs */}
      <input
        type="date"
        name="dob"
        value={astro.dob}
        onChange={handleChange}
        className="w-full border border-[var(--border)] rounded-lg px-3 py-2 mb-3 bg-[var(--card)] text-[var(--text-dim)]"
      />

      <input
        type="time"
        name="time"
        value={astro.time}
        onChange={handleChange}
        className="w-full border border-[var(--border)] rounded-lg px-3 py-2 mb-3 bg-[var(--card)] text-[var(--text-dim)]"
      />

      <input
        type="text"
        name="place"
        placeholder={t("astrology.birthPlacePlaceholder")}
        value={astro.place}
        onChange={handleChange}
        className="w-full border border-[var(--border)] rounded-lg px-3 py-2 mb-3 bg-[var(--card)] text-[var(--text-dim)] placeholder:text-[var(--text-dim2)]"
      />

      <input
        type="text"
        name="zodiac"
        placeholder={t("astrology.zodiacPlaceholder")}
        value={astro.zodiac}
        onChange={handleChange}
        className="w-full border border-[var(--border)] rounded-lg px-3 py-2 mb-4 bg-[var(--card)] text-[var(--text-dim)] placeholder:text-[var(--text-dim2)]"
      />

      {/* Buttons */}
      <button
        onClick={handleContinue}
        className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-[#D79098] to-[#5F7BF4] mb-2"
      >
        {t("astrology.continue")}
      </button>

      <button
        onClick={handleContinue}
        className="w-full text-sm text-[var(--text-dim2)] hover:opacity-80"
      >
        {t("astrology.skip")}
      </button>

    </div>
  </div>
</div>
  );
};

export default Astrology;
