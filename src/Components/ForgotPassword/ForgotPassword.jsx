import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../Redux/authSlice"; //  correct import

function ForgotPassword() {
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
      setError("Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email address");
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
            Forgot your password?
          </h1>

          <p className=" text-[var(--text-dim2)] text-center text-sm mb-6">
            No worries! Enter your registered email and we’ll help you reset it.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <label className="text-sm font-medium mb-1 block  text-[var(--text-dim)]">
              Email ID
            </label>

            <div className="flex items-center border border-[var(--border)] rounded-lg px-3 py-2 mb-1">
              <FiMail className=" text-[var(--text-dim2)] mr-2" />

              <input
                type="email"
                placeholder="Enter email ID"
                className="w-full outline-none text-sm  text-[var(--text-dim)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <p className="text-xs text-[var(--text-dim2)] mb-3">
              Enter your registered email id
            </p>

            {/* Local validation error */}
            {error && (
              <p className="text-red-500 text-xs mb-3">{error}</p>
            )}

            {/* API error */}
            {forgotError && (
              <p className="text-red-500 text-xs mb-3">
                {forgotError.message || "Something went wrong"}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={forgotLoading}
              className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
            >
              {forgotLoading ? "Sending..." : "Send Verification Code"}
            </button>

          </form>

          {/* Back to login */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/login")}
              className="text-[var(--text-dim2)]  hover:text-[var(--text-dim)]"
            >
              Back to Sign In
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs  text-[var(--text-dim)] mt-6">
            By continuing, you agree to our
            <span className=" text-[var(--text-dim2)] underline">
              {" "}Terms of Service{" "}
            </span>
            and
            <span className="text-[var(--text-dim2)] underline">
              {" "}Privacy Policy
            </span>
          </p>

        </div>
      </div>
    </>
  );
}

export default ForgotPassword;