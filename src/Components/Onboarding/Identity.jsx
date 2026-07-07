import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Image/IAMeetYou.png";
import { useTranslation } from "react-i18next";

const VALID_IDENTITIES = ["male", "female", "other"];

const Identity = () => {
  const { t } = useTranslation();
  const [identity, setIdentity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidIdentity = VALID_IDENTITIES.includes(identity);

  console.log("[Identity] initial identity value:", identity);
  console.log("[Identity] continue button enabled:", isValidIdentity);

  const handleChange = (e) => {
    const value = e.target.value;
    setIdentity(value);
    setError("");
    console.log("[Identity] selected identity on change:", value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("[Identity] identity value before navigation:", identity);

    if (!isValidIdentity) {
      setError(t("identity.validationError"));
      return;
    }

    navigate("/BasicInfo");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-[var(--text)] px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="items-center mb-8 justify-center flex gap-2">
          <img
            src={logo}
            alt="logo"
            className="h-10 object-contain"
          />
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[var(--border)] rounded-full mb-8">
          <div className="h-1 w-1/7 bg-orange-500 rounded-full"></div>
        </div>

        {/* Card */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl mb-2  text-[var(--text-dim)]">
            {t("identity.title")}
          </h2>

          <p className="text-sm mb-6 opacity-70  text-[var(--text-dim2)]">
            {t("identity.subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <select
              value={identity}
              onChange={handleChange}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--bg)] text-[var(--text-dim)]"
            >
              <option className="bg-[var(--bg)] text-[var(--text-dim)]" value="" disabled hidden>
                {t("identity.selectPlaceholder")}
              </option>

              <option className="bg-[var(--bg)] text-[var(--text-dim)]" value="male">
                {t("identity.male")}
              </option>

              <option className="bg-[var(--bg)] text-[var(--text-dim)]" value="female">
                {t("identity.female")}
              </option>

              <option className="bg-[var(--bg)] text-[var(--text-dim)]" value="other">
                {t("identity.other")}
              </option>
            </select>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={!isValidIdentity}
              className="w-full mt-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[#D79098] to-[#5F7BF4] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
            >
              {t("identity.continue")}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Identity;
