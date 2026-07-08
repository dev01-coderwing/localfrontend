 
import React, { useState } from "react";
import { FiLock } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";
import Navbar from "../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setPassword } from "../Redux/authSlice"; // ✅ correct import
import { useTranslation } from "react-i18next";

function Password() {
  const { t } = useTranslation();
  const [password, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
 
  // ✅ email from previous step
const email = location.state?.email || localStorage.getItem("email");
  // 🔴 Safety check
  if (!email) {
    return (
      <div className="text-center mt-20 text-red-500">
        {t('password.email_missing')}
      </div>
    );
  }
 
  // Password validations
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
 
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
 
  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!passwordsMatch) {
      alert(t('password.error_mismatch'));
      return;
    }
 
    try {
      const res = await dispatch(
        setPassword({
          email,
          password,
          confirmPassword,
        })
      ).unwrap();

      // ✅ redirect after success
      navigate("/login");
 
    } catch (err) {
      console.error("Password Error:", err);
      alert(err?.message || t('password.error_generic'));
    }
  };
 
  return (
    <>
      <Navbar />
 
      <div className="min-h-screen flex items-center justify-center  px-4">
 
        <div className="bg-[var(--card)] rounded-2xl shadow-md w-full max-w-md p-7 border border-[var(--border)]">
 
          <h1 className="text-2xl text-center mb-2  text-[var(--text-dim)]">
            {t('password.title')}
          </h1>

          <p className="text-center text-sm mb-6 opacity-70  text-[var(--text-dim2)]">
            {t('password.description')}
          </p>
 
          <form onSubmit={handleSubmit}>
 
            {/* New Password */}
            <label className="text-sm mb-1 block  text-[var(--text-dim)]">{t('password.new_password_label')}</label>
 
            <div className="flex items-center border border-[var(--border)] rounded-lg px-3 py-2 mb-4">
              <FiLock className="opacity-60 mr-2 text-sm" />
 
              <input
                type="password"
                placeholder={t('password.new_password_placeholder')}
                className="w-full outline-none text-sm bg-transparent text-[var(--text)]"
                value={password}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
 
            {/* Confirm Password */}
            <label className="text-sm mb-1 block">{t('password.confirm_password_label')}</label>
 
            <div className="flex items-center border border-[var(--border)] rounded-lg px-3 py-2 mb-2">
              <FiLock className="opacity-60 mr-2 text-sm" />
 
              <input
                type="password"
                placeholder={t('password.confirm_password_placeholder')}
                className="w-full outline-none text-sm bg-transparent  text-[var(--text-dim)]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
 
            {!passwordsMatch && confirmPassword && (
              <p className="text-red-500 text-xs mb-3">
                {t('password.error_mismatch')}
              </p>
            )}
 
            {/* Password Rules */}
            <div className="space-y-2 mb-6 text-sm">
 
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 flex items-center justify-center rounded ${minLength ? "bg-[var(--text)] text-[var(--bg)]" : "bg-[var(--border)]"}`}>
                  {minLength && <IoCheckmark size={14} />}
                </div>
                <p className="opacity-70  text-[var(--text-dim2)]">{t('password.rule_min_length')}</p>
              </div>
 
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 flex items-center justify-center rounded ${hasUppercase ? "bg-[var(--text)] text-[var(--bg)]" : "bg-[var(--border)]"}`}>
                  {hasUppercase && <IoCheckmark size={14} />}
                </div>
                <p className="opacity-70  text-[var(--text-dim2)]">{t('password.rule_uppercase')}</p>
              </div>
 
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 flex items-center justify-center rounded ${hasNumber ? "bg-[var(--text)] text-[var(--bg)]" : "bg-[var(--border)]"}`}>
                  {hasNumber && <IoCheckmark size={14} />}
                </div>
                <p className="opacity-70">{t('password.rule_number')}</p>
              </div>
 
            </div>
 
            <button
              disabled={!(minLength && hasUppercase && hasNumber && passwordsMatch)}
              className="w-full py-3 rounded-lg text-[var(--text)] text-sm font-semibold bg-gradient-to-r from-[#D79098] to-[#5F7BF4] disabled:opacity-50"
            >
              {t('password.btn_confirm')}
            </button>
 
          </form>
 
        </div>
      </div>
    </>
  );
}
 
export default Password;


