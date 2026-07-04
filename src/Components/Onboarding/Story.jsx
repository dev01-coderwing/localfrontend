import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Image/IAMeetYou.png";
import { useDispatch } from "react-redux";
import { updateStoryThunk } from "../Redux/onboardingSlice";
import { useTranslation } from "react-i18next";

const MOOD_QUOTE_MAX_LENGTH = 300;

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
      console.log("Sending Story:", storyData);
      const result = await dispatch(
        updateStoryThunk(storyData)
      );
      console.log(result);
      navigate("/Photos");
    } catch (error) {
      console.log("STORY API ERROR:", error);
      console.log(error.response);
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

          {/* Mood & Quote (remplace l'ancienne bio libre) */}
          <textarea
            placeholder={t("story.bioPlaceholder")}
            value={bio}
            maxLength={MOOD_QUOTE_MAX_LENGTH}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-[var(--border)] rounded-lg px-3 py-2 h-24 mb-1 bg-[var(--card)] text-[var(--text-dim)] placeholder:text-[var(--text-dim2)]"
          />
          <p className="text-xs text-[var(--text-dim2)] text-right mb-4">
            {bio.length}/{MOOD_QUOTE_MAX_LENGTH}
          </p>

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
