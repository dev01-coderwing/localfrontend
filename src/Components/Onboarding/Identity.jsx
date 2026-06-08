import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Image/IAMeetYou.png";

const Identity = () => {
  const [identity, setIdentity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(identity);
    navigate("/BasicInfo");
  };

  return (
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
          <div className="h-1 w-1/7 bg-orange-500 rounded-full"></div>
        </div>

        {/* Card */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl mb-2  text-[var(--text-dim)]">
            Choose your identity
          </h2>

          <p className="text-sm mb-6 opacity-70  text-[var(--text-dim2)]">
            Select your preferred choice
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <select
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--bg)] text-[var(--text-dim)]"
            >
              <option className="bg-[var(--bg)] text-[var(--text-dim)]" value="">
                Select identity
              </option>

              <option className="bg-[var(--bg)] text-[var(--text-dim)]" value="male">
                Male
              </option>

              <option className="bg-[var(--bg)] text-[var(--text-dim)]" value="female">
                Female
              </option>

              <option className="bg-[var(--bg)] text-[var(--text-dim)]" value="couple">
                Couple
              </option>
            </select>

            <button
              type="submit"
              className="w-full mt-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[#D79098] to-[#5F7BF4] hover:opacity-90"
            >
              Continue
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Identity;  