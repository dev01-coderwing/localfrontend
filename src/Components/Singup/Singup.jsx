import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/authSlice";
import { useTranslation } from "react-i18next";
function Singup() {
  const { t } = useTranslation();
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleConfirm = () => {
    if (!showEmail) {
      setShowEmail(true);
      return;
    }

  if (!agreeTerms) {
    alert("Please agree to the Terms & Privacy Policy.");
    return;
  }

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      alert("Please enter your email");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    dispatch(registerUser(trimmedEmail))
      .unwrap()
      .then(() => {
        setSubmitted(true);

        setTimeout(() => {
          navigate("/otp", {
            state: { email: trimmedEmail },
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center  text-[var(--text-dim)]">
        <div
          className="rounded-3xl shadow-2xl p-8 bg-[var(--card)] w-full max-w-sm mx-4 border border-[var(--border)]"
          style={{ fontFamily: "Poppins" }}
        >
          {/* Header */}
          <div className="text-center mb-7">
            <h1 className="text-3xl leading-snug mb-2">
              {t("signup.headingLine1")}
              <br />
              {t("signup.headingLine2")}
            </h1>

            <p className="text-sm opacity-70  text-[var(--text-dim2)]">
              {t("signup.subheading")}
            </p>
          </div>

          {/* Email Input */}
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out "
            style={{
              maxHeight: showEmail ? "90px" : "0px",
              opacity: showEmail ? 1 : 0,
            }}
          >
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("signup.emailPlaceholder")}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] text-sm outline-none bg-[var(--card)]  text-[var(--text-dim)]"
                autoFocus={showEmail}
              />
            </div>
          </div>
          <div className="flex items-start gap-2 mt-4">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1"
            />

            <label
              htmlFor="agreeTerms"
              className="text-xs opacity-70 cursor-pointer"
            >
              {t("signup.agreementText")}{" "}
              <span className="text-[var(--text-dim2)] hover:underline">
                {t("signup.termsOfService")}
              </span>{" "}
              {t("signup.and")}{" "}
              <span className="text-[var(--text-dim2)] hover:underline">
                {t("signup.privacyPolicy")}
              </span>
            </label>
          </div>
          {/* Confirm Button */}
          {!submitted ? (
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-medium text-sm mb-5 transition hover:opacity-90 active:scale-95 disabled:opacity-50"
              style={{
                background: "linear-gradient(to right, #c084b8, #818cf8)",
              }}
            >
              {loading
                ? t("signup.sending")
                : showEmail
                  ? t("signup.sendVerificationCode")
                  : t("signup.confirm")}
            </button>
          ) : (
            <div className="w-full py-3 rounded-xl text-center text-sm font-medium mb-5 text-green-600 bg-green-50 border border-green-200">
              {t("signup.success")}
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[var(--bg)]" />
            <span className="text-sm opacity-60">{t("signup.or")}</span>
            <div className="flex-1 h-px bg-[var(--bg)]" />
          </div>

          {/* Sign In */}
          <p className="text-center text-sm opacity-70 mb-4">
            {t("signup.alreadyHaveAccount")}{" "}
           <Link
  to="/login"
  className="text-[var(--text-dim2)] font-medium hover:underline"
>
  {t("signup.signIn")}
</Link>
          </p>

          {/* Social Buttons */}
          {/* NOTE: These buttons are decorative placeholders (no onClick/OAuth
              wiring yet). Once Google Login is implemented, its success
              handler should read response.dailyCheckIn and apply it the same
              way Login.jsx does: dispatch(setMeonsBalance(dailyCheckIn.newBalance))
              and toast.success on dailyCheckIn.rewarded === true. */}
          <div className="flex flex-col gap-3 mb-5">
            {[
              {
                labelKey: "signup.continueWithFacebook",
                icon: (
                  <svg
                    className="w-5 h-5 text-[var(--text-dim)]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.258h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                ),
              },
              {
                labelKey: "signup.continueWithGoogle",
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                ),
              },
              {
                labelKey: "signup.continueWithApple",
                icon: (
                  <svg
                    className="w-5 h-5 text-[var(--text-dim)]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701z" />
                  </svg>
                ),
              },
            ].map(({ labelKey, icon }) => (
              <button
                key={labelKey}
                className="w-full py-3 px-4 rounded-xl border border-[var(--border)] flex items-center justify-center gap-3 text-sm text-[var(--text-dim)] hover:opacity-80 transition"
              >
                {icon}
                <span>{t(labelKey)}</span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <p className="text-center text-xs opacity-60">
            {t("signup.agreementText")}{" "}
            <span className=" text-[var(--text-dim2)] cursor-pointer hover:underline">
              {t("signup.termsOfService")}
            </span>{" "}
            {t("signup.and")}{" "}
            <span className=" text-[var(--text-dim2)] cursor-pointer hover:underline">
              {t("signup.privacyPolicy")}
            </span>
          </p>

          {/* Theme Buttons */}
          {/* <div className="flex gap-2 mt-4">
            <button onClick={() => setTheme("light")}>{t("signup.themeLight")}</button>
            <button onClick={() => setTheme("dark")}>{t("signup.themeDark")}</button>
            <button onClick={() => setTheme("bronze")}>{t("signup.themeBronze")}</button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Singup;


