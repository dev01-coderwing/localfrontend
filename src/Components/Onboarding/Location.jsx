import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Image/iameetyou.png";
import { useDispatch } from "react-redux";
import { updateLocationThunk } from "../Redux/onboardingSlice";
import { useTranslation } from "react-i18next";

const Location = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    country: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleContinue = async (e) => {

  e.preventDefault();

  try {

   await dispatch(
  updateLocationThunk(formData)
);

    navigate("/identity");

  } catch (error) {
  }
};

  return (
    <>
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
            <div className="h-1 w-1/8 bg-orange-500 rounded-full"></div>
          </div>

          {/* Card */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl mb-2  text-[var(--text-dim)]">
              {t("location.title")}
            </h2>

            <p className="text-sm mb-6 opacity-70  text-[var(--text-dim2)]">
              {t("location.subtitle")}
            </p>

            <form onSubmit={handleContinue} className="space-y-4">

              {/* Country */}
              <div>
                <label className="text-sm opacity-70  text-[var(--text-dim)]">
                  {t("location.country")}
                </label>

                <input
                  type="text"
                  name="country"
                  placeholder={t("location.countryPlaceholder")}
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-[var(--border)] rounded-lg px-3 py-2 mt-1 bg-[var(--card)]  text-[var(--text-dim)] "
                />
              </div>

              {/* City */}
              <div>
                <label className="text-sm opacity-70">
                  {t("location.city")}
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder={t("location.cityPlaceholder")}
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-[var(--border)] rounded-lg px-3 py-2 mt-1 bg-[var(--card)]  text-[var(--text-dim)] "
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full mt-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[#D79098] to-[#5F7BF4] hover:opacity-90"
              >
                {t("location.continue")}
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
