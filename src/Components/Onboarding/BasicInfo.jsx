import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Image/IAMeetYou-logo2.png";
import { useDispatch } from "react-redux";
import { updateBasicInfoThunk } from "../Redux/onboardingSlice";
import { useTranslation } from "react-i18next";

const BasicInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    pronouns: "",
    interested: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleContinue = async () => {

    try {

      const result = await dispatch(
        updateBasicInfoThunk(formData)
      );

      console.log(result);

      navigate("/story");

    } catch (error) {

      console.log(error);

    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center   px-4">

      <div className="w-full max-w-md">

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
          <div className="h-1 w-2/6 bg-orange-500 rounded-full"></div>
        </div>

        {/* Card */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl mb-2  text-[var(--text-dim)]">{t("basicInfo.title")}</h2>

          <p className="text-sm mb-6 opacity-70  text-[var(--text-dim2)]">
            {t("basicInfo.subtitle")}
          </p>

  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">

  {/* Name */}
  <input
    type="text"
    name="name"
    placeholder={t("basicInfo.namePlaceholder")}
    value={formData.name}
    onChange={handleChange}
    className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card)] text-[var(--text-dim)] placeholder:text-[var(--text-dim2)]"
  />

  {/* DOB */}
  <input
    type="date"
    name="dob"
    value={formData.dob}
    onChange={handleChange}
    className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card)] text-[var(--text-dim)]"
  />

  {/* Pronouns */}
  <input
    type="text"
    name="pronouns"
    placeholder={t("basicInfo.pronounsPlaceholder")}
    value={formData.pronouns}
    onChange={handleChange}
    className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card)] text-[var(--text-dim)] placeholder:text-[var(--text-dim2)]"
  />

  {/* Interested */}
  <div className="flex gap-3">
    {["Men", "Women", "Everyone"].map((item) => (
      <button
        key={item}
        type="button"
        onClick={() =>
          setFormData({ ...formData, interested: item })
        }
        className={`flex-1 border border-[var(--border)] rounded-lg py-2 transition
        ${
          formData.interested === item
            ? "bg-orange-500 text-white"
            : "bg-[var(--card)] text-[var(--text-dim)]"
        }`}
      >
        {t(`basicInfo.${item.toLowerCase()}`)}
      </button>
    ))}
  </div>

  {/* Button */}
  <button
    type="button"
    onClick={handleContinue}
    className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
  >
    {t("basicInfo.continue")}
  </button>

</form>

        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
