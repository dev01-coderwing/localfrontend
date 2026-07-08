import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../Redux/authSlice"; 
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { forgotLoading, forgotError } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError(t('forgotPassword.error_empty'));
      return;
    }

    if (!email.includes("@")) {
      setError(t('forgotPassword.error_invalid'));
      return;
    }

    setError("");

    const res = await dispatch(forgotPassword(email));

    if (res.meta.requestStatus === "fulfilled") {
      //  email pass to OTP page
      navigate("/forgot-otp", { state: { email } });
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-[var(--card)] w-full max-w-md rounded-2xl shadow-md p-8 border border-[var(--border)]">

          {/* Heading */}
          <h1 className="text-2xl  text-[var(--text-dim)] font-semibold text-center mb-2">
            {t('forgotPassword.title')}
          </h1>

          <p className=" text-[var(--text-dim2)] text-center text-sm mb-6">
            {t('forgotPassword.description')}
          </p>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <label className="text-sm font-medium mb-1 block  text-[var(--text-dim)]">
              {t('forgotPassword.email_label')}
            </label>

            <div className="flex items-center border border-[var(--border)] rounded-lg px-3 py-2 mb-1">
              <FiMail className=" text-[var(--text-dim2)] mr-2" />

              <input
                type="email"
                placeholder={t('forgotPassword.email_placeholder')}
                className="w-full outline-none text-sm  text-[var(--text-dim)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <p className="text-xs text-[var(--text-dim2)] mb-3">
              {t('forgotPassword.email_helper')}
            </p>

            {/* Local validation error */}
            {error && (
              <p className="text-red-500 text-xs mb-3">{error}</p>
            )}

            {/* API error */}
            {forgotError && (
              <p className="text-red-500 text-xs mb-3">
                {forgotError.message || t('forgotPassword.error_generic')}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={forgotLoading}
              className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
            >
              {forgotLoading ? t('forgotPassword.btn_sending') : t('forgotPassword.btn_send')}
            </button>

          </form>

          {/* Back to login */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/login")}
              className="text-[var(--text-dim2)]  hover:text-[var(--text-dim)]"
            >
              {t('forgotPassword.back_to_signin')}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs  text-[var(--text-dim)] mt-6">
            {t('forgotPassword.terms_prefix')}
            <span className=" text-[var(--text-dim2)] underline">
              {" "}{t('forgotPassword.terms_of_service')}{" "}
            </span>
            {t('forgotPassword.terms_and')}
            <span className="text-[var(--text-dim2)] underline">
              {" "}{t('forgotPassword.privacy_policy')}
            </span>
          </p>

        </div>
      </div>
    </>
  );
}

export default ForgotPassword;

