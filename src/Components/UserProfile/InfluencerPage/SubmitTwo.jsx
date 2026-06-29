import React from "react";
import { Check } from "lucide-react";

function SubmitTwo({ closePopup }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[3px] p-4">

      {/* Popup Card */}
      <div
        className="
          relative
          w-full
          max-w-[92vw]
          sm:max-w-[420px]
          md:max-w-[460px]
          rounded-[28px]
        bg-[var(--bg-background)]
          shadow-2xl
          px-5 sm:px-6
          pt-7 sm:pt-8
          pb-5 sm:pb-6
          border border-[var(--border)]
        "
      >

        {/* Floating Dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[48px] left-[34%] h-1 w-1 rounded-full bg-pink-300" />
          <div className="absolute top-[28px] left-[48%] h-1.5 w-1.5 rounded-full bg-purple-500" />
          <div className="absolute top-[50px] right-[36%] h-2 w-2 rounded-full bg-blue-400" />
          <div className="absolute top-[78px] left-[30%] h-1.5 w-1.5 rounded-full bg-blue-400" />
          <div className="absolute top-[86px] right-[30%] h-1.5 w-1.5 rounded-full bg-pink-300" />
          <div className="absolute top-[104px] left-[40%] h-2 w-2 rounded-full bg-purple-600" />
        </div>

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="h-[60px] w-[60px] sm:h-[72px] sm:w-[72px] rounded-full bg-[#3f46f0] flex items-center justify-center shadow-lg">
            <div className="h-[28px] w-[28px] rounded-full bg-white flex items-center justify-center">
              <Check size={18} className="text-[#3f46f0] stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 text-center">
          <h2 className="text-[24px] sm:text-[28px] font-semibold text-[var(--text-dim)]">
            Submit Application?
          </h2>

          <p className="mt-4 text-[14px] sm:text-[15px] leading-6 text-[var(--text-dim2)] px-1">
            Your Influencer request will be reviewed within{" "}
            <span className="font-semibold text-[var(--text-dim)] ">
              24–48 hours
            </span>
            . We'll notify you via push notification once your status is updated.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-7 flex flex-col gap-3">

          {/* Confirm Button without onClick */}
          <button
            className="
              w-full
              h-[50px]
              rounded-[12px]
              bg-gradient-to-r
              from-[#d890a0]
              to-[#6279ff]
              text-white
              text-[15px]
              font-semibold
              hover:opacity-95
              transition
            "
          >
            Confirm Submission
          </button>

          <button
            onClick={closePopup}
            className="
              w-full
              h-[50px]
              rounded-[12px]
              border
              border-[var(--border)]
              bg-transparent
              text-white
              text-[15px]
              font-medium
             
              transition
            "
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
}

export default SubmitTwo;