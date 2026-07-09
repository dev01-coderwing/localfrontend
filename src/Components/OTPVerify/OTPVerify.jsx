import React, { useState, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setverfiy } from "../Redux/authSlice";
import { useTranslation } from "react-i18next";

const OTPVerify = () => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get email dynamically
  const email = location.state?.email;

  //  Safety check
  if (!email) {
    return (
      <div className="text-center mt-20 text-red-500">
        {t('otp.email_missing')}
      </div>
    );
  }

  // Handle input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // Submit handler with dispatch
  const handleSubmit = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      alert(t('otp.alert_incomplete'));
      return;
    }

    try {
      const res = await dispatch(
        setverfiy({
          email,
          otp: otpValue,
        })
      ).unwrap();

      localStorage.setItem("email", email); //  add this
      //   navigate("/create-password");
      navigate("/create-password", {
        state: { email }
      });
    } catch (err) {
      console.error("Verify Error:", err);
      alert(err?.message || t('otp.alert_failed'));
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center text-[var(--text)] px-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg w-full max-w-lg p-8 text-center">

          <h1 className="text-2xl mb-2 text-[var(--text-dim)]">
            {t('otp.title')}
          </h1>

          <p className="text-sm mb-6 opacity-70 text-[var(--text-dim2)]">
            {t('otp.sent_to')}
            <br />
            <span className="font-semibold underline">
              {email}
            </span>
          </p>

          <p className="text-left text-sm mb-2 text-[var(--text-dim)]">
            {t('otp.enter_otp')}
          </p>

          <div className="flex justify-between gap-2 mb-3  ">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                ref={(el) => (inputs.current[index] = el)}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border border-[var(--border)]  rounded-lg text-center text-lg bg-[var(--card)] text-[var(--text-dim)]"
              />
            ))}
          </div>

          <p className="text-sm mb-6 opacity-70">
            {t('otp.resend_prefix')}
            <span className="text-blue-500 cursor-pointer ml-1">
              {t('otp.resend')}
            </span>
          </p>

          {/*  Submit button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg text-[var(--text)] font-medium bg-gradient-to-r from-[#D79098] to-[#5F7BF4] hover:opacity-90"
          >
            {t('otp.submit')}
          </button>

          <p className="text-xs mt-5 opacity-60 text-[var(--text-dim)]">
            {t('otp.terms_prefix')}
            <span className="text-blue-500 underline"> {t('otp.terms_of_service')} </span>
            {t('otp.terms_and')}
            <span className="text-blue-500 underline"> {t('otp.privacy_policy')}</span>
          </p>

        </div>
      </div>
    </>
  );
};

export default OTPVerify;