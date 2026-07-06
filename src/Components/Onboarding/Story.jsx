import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Image/IAMeetYou.png";
import { useDispatch } from "react-redux";
import { updateStoryThunk } from "../Redux/onboardingSlice";
import { useTranslation } from "react-i18next";

const Story = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bio, setBio] = useState("");

  const handleContinue = async () => {

    try {

      const storyData = {
        bio,
      };

      await dispatch(
        updateStoryThunk(storyData)
      );

      navigate("/Photos");

    } catch (error) {
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center   px-4">

      <div className="w-full max-w-md">

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
          <div className="h-1 w-3/5 bg-orange-500 rounded-full"></div>
        </div>

        {/* Card */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl mb-2  text-[var(--text-dim)]">
            {t("story.title")}
          </h2>

          {/* Textarea */}
         {/* Mood & Quote */}
<textarea
  placeholder={t("story.bioPlaceholder")}
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  maxLength={300}
  className="w-full border border-[var(--border)] rounded-lg px-3 py-2 h-24 mb-4 bg-[var(--card)] text-[var(--text-dim)] placeholder:text-[var(--text-dim2)]"
/>

{/* Button */}
<button
  onClick={handleContinue}
  className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
>
  {t("story.continue")}
</button>

        </div>
      </div>
    </div>
  );
};


export default Story;
