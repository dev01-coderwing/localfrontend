import React, { useState, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setverfiy } from "../Redux/authSlice";

function ForgotOtp() {
     const [otp, setOtp] = useState(new Array(6).fill(""));
      const inputs = useRef([]);
     
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const location = useLocation();
     
      //  Get email dynamically
      const email = location.state?.email;
     
      //  Safety check
      if (!email) {
        return (
          <div className="text-center mt-20 text-red-500">
            Email                                                                                                                                                                                                                                                                                                                                                                                                                                   missing, please go back and register again.
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
     
      //  Submit handler with dispatch
      const handleSubmit = async () => {
        const otpValue = otp.join("");
     
        if (otpValue.length !== 6) {
          alert("Please enter complete OTP");
          return;
        }
     
        try {
          const res = await dispatch(
            setverfiy({
              email,
              otp: otpValue,
            })
          ).unwrap();
     
          console.log("Verify Success:", res);
     
    localStorage.setItem("email", email); // ✅ add this    
  
              navigate("/otp", {
          state: { email }
        });
        } catch (err) {
          console.error("Verify Error:", err);
          alert(err?.message || "OTP verification failed");
        }
      };
     
  return (
    <>
    
     <Navbar />
 
      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg w-full max-w-lg p-8 text-center">
 
          <h1 className="text-4xl mb-2  text-[var(--text-dim)]">
            Verification Code
          </h1>
 
          <p className="text-sm  text-[var(--text-dim2)] mb-6 opacity-70">
            We’ve sent a 6-digit verification code to
            <br />
            <span className="font-semibold underline">
              {email}
            </span>
          </p>
 
          <p className="text-left text-sm mb-2  text-[var(--text-dim)]">
            Enter OTP
          </p>
 
          <div className="flex justify-between gap-2 mb-3">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                ref={(el) => (inputs.current[index] = el)}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border border-[var(--border)] rounded-lg text-center  text-[var(--text-dim)] text-lg bg-[var(--card)] text-[var(--text)]"
              />
            ))}
          </div>
 
          <p className="text-sm mb-6 opacity-70">
            Didn’t receive the code?
            <span className="text-[var(--text-dim2)] cursor-pointer ">
              Resend OTP
            </span>
          </p>
 
          {/* ✅ Submit button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-[#D79098] to-[#5F7BF4] hover:opacity-90"
          >
            Submit
          </button>
 
          <p className="text-xs mt-5 opacity-60  text-[var(--text-dim)]">
            By continuing, you agree to our
            <span className="text-[var(--text-dim2)] underline"> Terms of Service </span>
            and
            <span className="text-[var(--text-dim2)] underline"> Privacy Policy</span>
          </p>
 
        </div>
      </div>

    </>
  )
}

export default ForgotOtp