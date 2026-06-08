import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Image/IAMeetYou.png";
import { useDispatch } from "react-redux";
import { updateReligionThunk } from "../Redux/onboardingSlice";
const Religion = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();

  const [religion, setReligion] = useState("");

const handleContinue = async () => {

  try {

    const religionData = {
      religion,
    };

    console.log("Sending Religion:", religionData);

    const result = await dispatch(
  updateReligionThunk(religionData)
);

console.log(result);

    navigate("/astrology");

  } catch (error) {

    console.log("RELIGION API ERROR:", error);

    console.log(error.response);

  }
};

  return (
    <div className="min-h-screen flex items-center justify-center ">

      <div className="w-full max-w-md px-4">

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
          <div className="h-1 w-4/5 bg-orange-500 rounded-full"></div>
        </div>

        {/* Card */}
        <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl shadow">

          <h2 className="text-xl mb-2 text-[var(--text-dim)] font-semibold">
            Religion
          </h2>

          <p className="text-sm mb-6 opacity-70 text-[var(--text-dim2)]">
            This is optional and helps with compatibility
          </p>

          {/* Select */}
          <select
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 mb-4 bg-[var(--bg-card)]/10 text-[var(--text-dim2)]"
          >
            <option value="">Prefer not to specify</option>
            <option value="Christian">Christian</option>
            <option value="Muslim">Muslim</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddhist">Buddhist</option>
          </select>

          {/* Skip */}
          <button
            onClick={handleContinue}
            className="w-full mb-3 border border-[var(--border)] rounded-lg py-2 text-[var(--text-dim2)] hover:opacity-80"
          >
            No, skip this step
          </button>

          {/* Continue */}
          <button
           onClick={handleContinue}
            className="w-full py-2 rounded-lg text-[var(--text)] bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
          >
            Continue
          </button>

        </div>
      </div>
    </div>
  );
};

export default Religion;