import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
const rose = "/Image/rose.png";

const MotionDiv = motion.div;
const MotionSpan = motion.span;

const PARENT_DURATION = 1.9; 

function Sparkles({ count = 10 }) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 70,
      delay: Math.random() * 0.35,
      size: 4 + Math.random() * 6,
      drift: (Math.random() - 0.5) * 40,
    }))
  );

  return (
    <>
      {particles.map((p) => (
        <MotionSpan
          key={p.id}
          className="rose-sparkle"
          style={{ left: `calc(50% + ${p.x}px)`, width: p.size, height: p.size }}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [-10, -140, -240],
            x: [0, p.drift, p.drift * 1.6],
            scale: [0, 1, 0.2],
          }}
          transition={{ duration: 1.3, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

function ImpactBurst() {
  return (
    <MotionDiv
      className="rose-impact"
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: [0, 1, 0], scale: [0.3, 1.4, 1.8] }}
      transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
    >
      💖
    </MotionDiv>
  );
}


export default function RoseSendAnimation({ origin, onComplete }) {
  if (!origin) return null;

  const anchorStyle = {
    top: origin.top,
    left: origin.left + origin.width / 2,
  };

  return createPortal(
    <MotionDiv
  className="rose-fly-wrap"
  style={{
    ...anchorStyle,
    position: "fixed",
    zIndex: 2147483647,
  }}
      initial={{ x: "-50%", y: 0, scale: 0.6, rotate: 0, opacity: 1 }}
      animate={{
        x: ["-50%", "-68%", "-32%", "-50%"],
        y: [0, -150, -300, -430],
        scale: [0.6, 1.15, 1.05, 0.5],
        rotate: [0, -16, 14, 0],
        opacity: [1, 1, 0.9, 0],
      }}
      transition={{
        duration: PARENT_DURATION,
        times: [0, 0.32, 0.63, 1],
        ease: [0.22, 0.61, 0.36, 1], // whoosh: quick launch, soft settle
      }}
      onAnimationComplete={onComplete}
    >
      <span className="rose-glow" />
      <img src={rose} alt="" className="rose-fly-img" draggable={false} />
      <Sparkles />
      <ImpactBurst />
    </MotionDiv>,
    document.body
  );
}
