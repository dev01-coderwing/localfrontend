
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Sparkles } from "lucide-react";
import {detectFace,} from "../../Redux/verifySlice";
import { useDispatch,useSelector,} from "react-redux";
import { useTranslation } from "react-i18next";

function Identify() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
const dispatch = useDispatch();

const { selfieFile } = useSelector(
  (state) => state.verify
);
useEffect(() => {
  const detect = async () => {
    try {
      if (selfieFile) {
        await dispatch(
          detectFace(selfieFile)
        ).unwrap();
      }
    } catch (error) {
      console.log(
        "Face Detection Error:",
        error
      );
    }
  };

  detect();
}, [dispatch, selfieFile]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const isCompleted = progress === 100;

  return (
    <div className="h-dvh bg-[var(--bg-background)] overflow-hidden">
      <div className="w-full h-full flex flex-col px-4 pt-4 pb-4 ">

        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/takeselfie")}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0"
          >
            <ChevronLeft size={18} />
          </button>

          <h2 className="text-[18px] font-semibold text-[var(--text-dim)]">
            {t('identify.identity_verification')}
          </h2>
        </div>

        {/* Content */}
        <div className="mx-auto  flex flex-col items-center bg-[var(--bg-card)]/10  px-6 py-8 w-full max-w-md">

          <p className="text-[12px] text-[var(--text-dim2)]">
            {t('identify.step_2_of_2')}
          </p>

          <h1 className="text-[24px] sm:text-[30px] font-bold text-[var(--text-dim)] mt-2 text-center whitespace-nowrap">
            {t('identify.verifying_details')}
          </h1>

          <p className="text-center text-[var(--text-dim2)] text-sm mt-3 leading-6 max-w-[300px]">
            {t('identify.description')}
          </p>

          {/* Animated Icon */}
          <div className="mt-12 animate-pulse">
            <Sparkles
              size={100}
              className="text-[#F6A18E]"
              strokeWidth={1.8}
            />
          </div>

{/* Progress Section */}
        <div className="mt-20 flex flex-col items-center">

          {/* Progress Bar */}
          <div className="w-[340px] h-1.5 bg-[#E8D8D2] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F6A18E] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Text */}
          <div className="flex justify-between items-center mt-4 w-[310px]">
            <span className="text-[10px] text-[var(--text-dim2)]">
              {isCompleted
                ? t('identify.scanning_successful')
                : t('identify.scanning_identity')}
            </span>

            <span className="text-[10px] text-[var(--text-dim2)] font-medium">
              {progress}%
            </span>
          </div>

          {/* Continue Button */}
          {isCompleted && (
            <button
              onClick={() => navigate("/complete")}
              className="w-[330px] h-11 mt-5 rounded-lg text-white font-medium bg-gradient-to-r from-[#D58AA2] to-[#566CF5]"
            >
              {t('identify.continue')}
            </button>
          )}

        </div>
       </div>
      </div>
    </div>
  );
}

export default Identify;
