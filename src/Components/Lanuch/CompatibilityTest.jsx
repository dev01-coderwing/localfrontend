import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";

import {
  getCompatibilityQuestionsThunk,
  submitCompatibilityAnswerThunk,
} from "../Redux/compatibilitySlice";


export default function CompatibilityTest() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const VOICE_INTERVAL = 9;
  const { questions, loading } = useSelector(
    (state) => state.compatibility
  );

  useEffect(() => {
    dispatch(getCompatibilityQuestionsThunk());
  }, [dispatch]);

  useEffect(() => {
    const savedQuestion = localStorage.getItem("resumeQuestion");

    if (savedQuestion) {
      setCurrent(Number(savedQuestion) + 1);
      localStorage.removeItem("resumeQuestion");
    }
  }, []);

  // ✅ Handle option select + auto next
const handleSelect = (option) => {

  const currentQuestion = questions[current];

  setAnswers({
    ...answers,
    [currentQuestion.id]: option,
  });

};

const next = async () => {

  const currentQuestion = questions[current];

  const selectedOption =
    answers[currentQuestion.id];

  if (!selectedOption) return;

  // API CALL
  const result = await dispatch(
    submitCompatibilityAnswerThunk({
      questionId: currentQuestion.id,
      option: selectedOption,
    })
  );

  const nextIndex = current + 1;

  // Last Question
  if (current >= questions.length - 1) {
    navigate("/VoiceAnalysis");
    return;
  }

  // Every 9th Question
  if (nextIndex % VOICE_INTERVAL === 0) {

    localStorage.setItem(
      "resumeQuestion",
      nextIndex
    );

    navigate("/VoiceAnalysis");
    return;
  }

  // Next Question
  setCurrent(nextIndex);
};

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const progress = ((current + 1) / questions.length) * 100;

  // ✅ Redirect after all answers
  useEffect(() => {

    if (
      questions.length > 0 &&
      Object.keys(answers).length === questions.length
    ) {

      setTimeout(() => {

        navigate("/VoiceAnalysis");

      }, 500);
    }

  }, [answers, questions, navigate]);

  return (
    <>
      <Navbar />


      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-background)] px-4">

        <div className="bg-[var(--card)] border border-[var(--border)] text-[var(--text-dim)] w-full max-w-xl rounded-2xl shadow-md p-6">

          {/* Header */}
          <div className="flex items-center gap-2 mb-4">

            <button
              onClick={prev}
              disabled={current === 0}
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-dim)] hover:bg-[var(--hover)] transition"
            >
              <ArrowLeft size={18} />
            </button>

            <h2 className="font-semibold text-lg text-[var(--text-dim)]">
              {t("compatibility.title")}
            </h2>

          </div>

          {/* Progress */}
          <div className="mb-6">

            <p className="text-xs text-[var(--text-dim2)] mb-1">
              {t("compatibility.questionProgress")}
            </p>

            <div className="w-full h-1 bg-[var(--border)] rounded-full">
              <div
                className="h-1 bg-[var(--accent)] rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-xs text-right text-[var(--text-dim2)] mt-1">
              {t("compatibility.progress", { current: current + 1, total: questions.length })}
            </p>

          </div>

          {/* Question */}
          <h3 className="text-lg font-semibold text-center mb-6 text-[var(--text-dim)]">
            {questions[current]?.text}
          </h3>

          {/* Options */}
          <div className="space-y-3">

            {questions[current]?.options?.map((opt, index) => (
              <label
                key={index}
                className={`flex items-center justify-between border rounded-full px-4 py-3 cursor-pointer transition
            ${answers[questions[current]?.id] === opt
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--border)] bg-[var(--bg-card)]/10"
                  }
          `}
              >

                <span className="text-sm text-[var(--text-dim)]">
                  {opt}
                </span>

                <input
                  type="radio"
                  name={`q-${current}`}
                  checked={answers[questions[current]?.id] === opt}
                  onChange={() => handleSelect(opt)}
                  className="accent-[var(--accent)]"
                />

              </label>
            ))}

          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">

            <button
              onClick={prev}
              disabled={current === 0}
              className="px-4 py-2 text-sm bg-[var(--hover)] text-[var(--text-dim)] rounded-lg disabled:opacity-50 flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              {t("compatibility.previous")}
            </button>

            <button
              onClick={next}
              disabled={!answers[questions[current]?.id]}
              className="px-4 py-2 text-sm bg-[var(--accent)] text-white rounded-lg disabled:opacity-50 flex items-center gap-1"
            >
              {t("compatibility.next")}
              <ArrowRight size={16} />
            </button>

          </div>

        </div>
      </div>
    </>
  );
}
