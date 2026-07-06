import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Animation from "../Animation/Animation";
import { LoginUser } from "../Redux/authSlice";
import { connectSocket } from "../../socket";
 import { useTranslation } from "react-i18next";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  // ✅ Redux state
  const { loading, error: reduxError } = useSelector((state) => state.auth);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
 const { t } = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // ✅ Validation
    if (!email || !password) {
        setError(t("login.validation.fill_fields"));
      return;
    }
 
    if (!email.includes("@")) {
        setError(t("login.validation.valid_email"));
      return;
    }
 
    setError("");
 
    try {
      // 🔥 DISPATCH API
      const resultAction = await dispatch(
        LoginUser({ email, password })
      );

      if (LoginUser.fulfilled.match(resultAction)) {
        connectSocket(resultAction.payload.token);

        navigate("/homepage");
      }
    } catch (err) {
    }
  };
 
  return (
    <>

      <Animation>
        <div className="min-h-screen flex items-center justify-center  px-4">
          <div className="bg-[var(--card)] w-full max-w-md rounded-2xl shadow-2xl p-7 border border-[var(--border)]">
 
            {/* Heading */}
            <h1 className="text-4xl  text-[var(--text-dim)] text-center mb-2">
          {t("login.title")}
            </h1>
 
            <p className="text-center text-sm opacity-70 mb-6 text-[var(--text-dim2)]">
            {t("login.description")}
            </p>
 
            <form onSubmit={handleSubmit}>
 
              {/* Email */}
              <label className="text-sm mb-1 block text-[var(--text-dim)]">{t("login.email")}</label>
 
              <div className="flex items-center border border-[var(--border)] rounded-lg px-3 py-2 mb-4">
                <FiMail className="opacity-60 mr-2" />
 
                <input
                  type="email"
placeholder={t("login.enter_email")}
                  className="w-full outline-none text-sm bg-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
 
              {/* Password */}
              <label className="text-sm mb-1 block text-[var(--text-dim)]">{t("login.password")}</label>
 
              <div className="flex items-center border border-[var(--border)] rounded-lg px-3 py-2 mb-2">
                <FiLock className="opacity-60 mr-2" />
 
                <input
                  type={showPassword ? "text" : "password"}
placeholder={t("login.enter_password")}
                  className="w-full outline-none text-sm bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
 
                <button
                  type="button"
                  className="text-xs text-[var(--text-dim2)]"
                  onClick={() => setShowPassword(!showPassword)}
                >
{showPassword ? t("login.hide") : t("login.show")}
                </button>
              </div>
 
              {/* Forgot password */}
              <div className="text-right mb-4">
                <button
                  type="button"
                  onClick={() => navigate("/forgot")}
                  className="text-[var(--text-dim2)] text-sm"
                >
                  Forgot Password?
                </button>
              </div>
 
              {/* Local error */}
              {error && (
                <p className="text-red-500 text-xs mb-2">{reduxError.message || t("login.failed")}</p>
              )}
 
              {/* Redux error */}
              {reduxError && (
                <p className="text-red-500 text-xs mb-2">
                  {reduxError.message || "Login failed"}
                </p>
              )}
 
              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-white text-sm font-semibold bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
              >
              {loading ? t("login.logging_in") : t("login.login")}  
              </button>
 
            </form>
          </div>
        </div>
      </Animation>
    </>
  );
}
 
export default Login;