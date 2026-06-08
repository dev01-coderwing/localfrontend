import React, { useState } from "react";
import one from "/Image/ai-guide.png";
import two from "/Image/brain.png";
import three from "/Image/assistant-rafiki.png";
import four from "/Image/as.png";
import five from "/Image/data.png";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: one,
    title: "Meet Lucas — your AI dating guide",
    description:
      "Lucas helps you understand real compatibility — beyond photos and first impressions.",
  },
  {
    id: 2,
    image: two,
    title: "The Science Behind IAMeetYou",
    description:
      "Lucas detects the harmony between your choices and your voice to ensure authentic connections.",
  },
  {
    id: 3,
    image: three,
    title: "Beyond words, the frequency of truth.",
    description:
      "Big Five • MBTI • Love Languages • Attachment Styles — Real compatibility, not just swiping.",
  },
  {
    id: 4,
    image: four,
    title: "Your emotional DNA",
    description:
      "Like a compass for the soul, we use your birth data to map how you navigate love and time.",
  },
  {
    id: 5,
    image: five,
    title: "A Sanctuary of Authenticity",
    description:
      "A curated community where every voice is real and every match is intentional.",
  },
];

function Intro() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
  if (current < slides.length - 1) {
    setCurrent(current + 1);
  } else {
    navigate("/Location");
  }
};

  const progress = ((current + 1) / slides.length) * 100;

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-[var(--bg)] text-[var(--text)] px-6">

        <div className="max-w-md w-full text-center">

          {/* Progress bar */}
          <div className="w-full bg-[var(--border)] rounded-full h-2 mb-12">
            <div
              className="h-2 rounded-full bg-[var(--bg-card)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Image */}
          <div className="flex justify-center mb-10">
            <img
              src={slides[current].image}
              alt="slide"
              className="w-72 h-56 object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-dim)]">
            {slides[current].title}
          </h2>

          {/* Description */}
          <p className="text-md mb-8 opacity-70 text-[var(--text-dim2)]">
            {slides[current].description}
          </p>

          {/* Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`h-2 rounded-full transition-all ${
                  current === index
                    ? "w-6 bg-[#F49C8A]"
                    : "w-2 bg-[var(--border)]"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="w-full py-4 rounded-full text-[var(--text)] font-medium
            bg-gradient-to-r from-[#D79098] to-[#5F7BF4]
            hover:opacity-90 transition"
          >
            Next
          </button>

        </div>
      </div>
    </>
  );
}

export default Intro;