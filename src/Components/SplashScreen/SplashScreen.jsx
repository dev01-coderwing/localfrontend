import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '/Image/IAMeetYou.png'
export default function SplashScreen() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [dynamicBubbles, setDynamicBubbles] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const rafId = useRef(null);
 const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/LanguagePage"); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);
  // Check for reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Parallax animation loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateBubbles = () => {
      setCurrentPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1,
      }));
      rafId.current = requestAnimationFrame(updateBubbles);
    };

    rafId.current = requestAnimationFrame(updateBubbles);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [mousePos, prefersReducedMotion]);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle dynamic random bubble generator
  useEffect(() => {
    const createBubble = () => {
      const size = Math.random() * 200 + 100;
      const id = Date.now() + Math.random();
      const animNum = Math.floor(Math.random() * 3) + 1;
      const animDuration = Math.random() * 10 + 15;
      const delay = Math.random() * 5;
      const hasArc = Math.random() > 0.5;

      
      const newBubble = {
        id,
        size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `floatBubble${animNum} ${animDuration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        hasArc,
        rotate: `${Math.random() * 360}deg`,
        opacity: 1,
      };

      setDynamicBubbles((prev) => [...prev, newBubble]);

      // Soft expiration & cleanup
      setTimeout(() => {
        setDynamicBubbles((prev) =>
          prev.map((b) => (b.id === id ? { ...b, opacity: 0 } : b))
        );
        setTimeout(() => {
          setDynamicBubbles((prev) => prev.filter((b) => b.id !== id));
        }, 2000);
      }, 60000);
    };

    // Stagger initial bubbles
    const initialTimers = [
      setTimeout(() => createBubble(), 1000),
      setTimeout(() => createBubble(), 4000),
      setTimeout(() => createBubble(), 7000),
    ];

    // Dynamic generations every 10 seconds
    const interval = setInterval(createBubble, 10000);

    return () => {
      initialTimers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  // Handle Space key simulation for redirect
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFadingOut(true);
        console.log("Simulated home redirection triggered...");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Visibility API to pause loops when window loses focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Calculate parallax offsets based on bubble speed factors
  const getBubbleTransform = (factor) => {
    if (prefersReducedMotion) return 'none';
    const offsetX = (currentPos.x - 0.5) * factor;
    const offsetY = (currentPos.y - 0.5) * factor;
    return `translate(${offsetX}px, ${offsetY}px)`;
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden flex justify-center items-start pt-[25vh] select-none
        ${isFadingOut ? 'animate-[fadeOut_0.8s_ease-out_forwards] motion-reduce:animate-[fadeOutSimple_0.3s_ease-out_forwards]' : ''}
      `}
      style={{
        background: `
          radial-gradient(ellipse 150% 100% at 20% 10%, rgba(54, 69, 255, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse 120% 80% at 80% 30%, rgba(158, 90, 158, 0.3) 0%, transparent 60%),
          radial-gradient(ellipse 100% 60% at 60% 80%, rgba(232, 180, 160, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse 80% 100% at 90% 90%, rgba(255, 180, 160, 0.3) 0%, transparent 40%),
          linear-gradient(180deg, #121850 0%, #1A2366 50%, #0A0F3C 100%)
        `
      }}
    >
      {/* Dynamic Keyframes Styling Injection */}
      <style>{`
        @keyframes floatBubble1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, 30px) scale(1.05); }
          66% { transform: translate(-30px, -20px) scale(0.98); }
        }
        @keyframes floatBubble2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-40px, 40px) scale(1.08) rotate(10deg); }
        }
        @keyframes floatBubble3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -30px) scale(1.03); }
          50% { transform: translate(-20px, -50px) scale(1.06); }
          75% { transform: translate(40px, 20px) scale(0.97); }
        }
        // @keyframes floatBubble5 {
        //   0%, 100% { transform: translate(0, 0) scale(1); }
        //   25% { transform: translate(-40px, 20px) scale(1.1); }
        //   75% { transform: translate(40px, -30px) scale(0.9); }
        // }
        @keyframes logoFadeIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes titleFadeIn { to { opacity: 1; } }
        @keyframes subtitleFadeIn { to { opacity: 0.8; } }
        @keyframes loaderFadeIn { to { opacity: 1; } }
        @keyframes floatMain { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes loaderPulse { 0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; } 40% { transform: scale(1.2); opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } }
        @keyframes fadeOutSimple { to { opacity: 0; } }

        // .bubble-glow::before {
        //   content: ''; position: absolute; top: -5%; left: -5%; width: 110%; height: 110%; border-radius: 50%;
        //   background: radial-gradient(circle at 30% 30%, transparent 45%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.3) 52%, rgba(255, 255, 255, 0.1) 54%, transparent 60%);
        //   transform: rotate(-45deg);
        // }
        // .bubble-glow::after {
        //   content: ''; position: absolute; bottom: 10%; right: 10%; width: 30%; height: 30%; border-radius: 50%;
        //   background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 70%);
        //   filter: blur(5px);
        // }
      `}</style>

      {/* Bubble Layer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">

        {/* Bubble 1 */}
        <div
          className="absolute rounded-full backdrop-blur-[2px] bubble-glow transition-transform duration-200 ease-out w-[500px] h-[500px] -top-[200px] -left-[150px]"
          style={{
            transform: getBubbleTransform(5),
            animation: prefersReducedMotion ? 'none' : 'floatBubble1 25s ease-in-out infinite',
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)'
          }}
        >
          <div className="absolute border-2 border-solid border-transparent border-b-white/35 border-l-white/35 rounded-full blur-[1px] w-[480px] h-[480px] top-2.5 left-2.5 rotate-[45deg]" />
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_0%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.1)_70%,transparent_80%)]" />
        </div>

        {/* Bubble 2 */}
        <div
          className="absolute rounded-full backdrop-blur-[2px] bubble-glow transition-transform duration-200 ease-out w-[400px] h-[400px] top-[20%] -right-[100px]"
          style={{
            transform: getBubbleTransform(10),
            animation: prefersReducedMotion ? 'none' : 'floatBubble2 20s ease-in-out infinite',
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)'
          }}
        >
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_0%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.1)_70%,transparent_80%)]" />
        </div>

        {/* Bubble 3 */}
        <div
          className="absolute rounded-full backdrop-blur-[2px] bubble-glow transition-transform duration-200 ease-out w-[600px] h-[600px] -bottom-[300px] left-[30%]"
          style={{
            transform: getBubbleTransform(15),
            animation: prefersReducedMotion ? 'none' : 'floatBubble3 30s ease-in-out infinite',
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)'
          }}
        >
          <div className="absolute border-2 border-solid border-transparent border-b-white/35 border-l-white/35 rounded-full blur-[1px] w-[580px] h-[580px] top-2.5 left-2.5 -rotate-[30deg]" />
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_0%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.1)_70%,transparent_80%)]" />
        </div>

        {/* Bubble 5 */}
        <div
          className="absolute rounded-full backdrop-blur-[2px] bubble-glow transition-transform duration-200 ease-out w-[250px] h-[250px] top-[70%] right-[10%]"
          style={{
            transform: getBubbleTransform(20),
            animation: prefersReducedMotion ? 'none' : 'floatBubble5 18s ease-in-out infinite',
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)'
          }}
        >
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_0%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.1)_70%,transparent_80%)]" />
        </div>

        {/* Generated Dynamic Bubble Stream */}
        {dynamicBubbles.map((bub) => (
          <div
            key={bub.id}
            className="absolute rounded-full backdrop-blur-[2px] bubble-glow transition-all duration-[2000ms] ease-out"
            style={{
              width: `${bub.size}px`,
              height: `${bub.size}px`,
              left: bub.left,
              top: bub.top,
              opacity: bub.opacity,
              animation: prefersReducedMotion ? 'none' : bub.animation,
              animationDelay: bub.animationDelay,
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)'
            }}
          >
            <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_0%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.1)_70%,transparent_80%)]" />
            {bub.hasArc && (
              <div
                className="absolute border-2 border-solid border-transparent border-b-white/35 border-l-white/35 rounded-full blur-[1px] top-2.5 left-2.5"
                style={{
                  width: `${bub.size - 20}px`,
                  height: `${bub.size - 20}px`,
                  transform: `rotate(${bub.rotate})`
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Main Branding Center Container */}
      <div className="relative z-10 text-center animate-[logoFadeIn_2s_ease-out_forwards]">
        <svg
          className="mx-auto drop-shadow-[0_0_25px_rgba(54,69,255,0.6)] drop-shadow-[0_0_40px_rgba(232,180,160,0.3)] animate-[floatMain_6s_ease-in-out_2.5s_infinite] motion-reduce:animation-none"
          viewBox="0 0 400 200"
          xmlns="http://www.w3.org/2000/svg"
          width="600"
          height="300"
        >
          <defs>
            <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3645FF', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#5A6FFF', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#7B88FF', stopOpacity: 1 }} />
            </linearGradient>

            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#E8B4A0', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#FFB4A0', stopOpacity: 1 }} />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g transform="translate(200, 100)">
            <g>
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 5 12"
                to="360 5 12"
                dur="10s"
                repeatCount="indefinite"
              />
              <path
                d="M -25 5 C -25 -15, -10 -30, 5 -30 C 20 -30, 35 -15, 35 5 L 35 20 C 35 35, 20 45, 5 45 C -10 45, -25 35, -25 20 Z"
                fill="none"
                stroke="url(#mainGradient)"
                strokeWidth="3"
                opacity="0.9"
                filter="url(#glow)"
              />
            </g>

            <g>
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 5 12"
                to="-360 5 12"
                dur="12s"
                repeatCount="indefinite"
              />
              <path
                d="M -15 12 C -15 -5, 0 -20, 15 -20 C 30 -20, 45 -5, 45 12 L 45 25 C 45 40, 30 50, 15 50 C 0 50, -15 40, -15 25 Z"
                fill="none"
                stroke="url(#accentGradient)"
                strokeWidth="3"
                opacity="0.8"
                filter="url(#glow)"
              />
            </g>

            <circle cx="5" cy="12" r="4" fill="#FFFFFF" opacity="0.9" >
              {/* filter="url(#glow) */}
              <animate
                attributeName="r"
                values="4;6;4"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>

        {/* <h1 className="text-white font-sans text-[60px] font-normal my-2.5 opacity-0 text-shadow animate-[titleFadeIn_1s_ease-out_1.5s_forwards] [text-shadow:0_0_20px_rgba(255,255,255,0.4)]">
          <span className="font-medium">IA</span>
          <span className="text-[#E8B4A0] font-light">Meet</span>
          <span className="font-medium">You</span>
        </h1> */}

        <img src={logo} alt="IAMeetYou Logo" className="mx-auto w-[300px] h-auto" />

    <p className="text-white font-sans text-base font-light tracking-[2px]">
  CONNECTEZ DIFFÉREMMENT
</p>
      </div>

      {/* Absolute Bottom Loader */}
      <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex gap-2.5 opacity-0 animate-[loaderFadeIn_1s_ease-out_2s_forwards]">
        <div className="w-2.5 h-2.5 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-[loaderPulse_1.5s_ease-in-out_infinite] [animation-delay:0s] motion-reduce:animate-none" />
        <div className="w-2.5 h-2.5 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-[loaderPulse_1.5s_ease-in-out_infinite] [animation-delay:0.2s] motion-reduce:animate-none" />
        <div className="w-2.5 h-2.5 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-[loaderPulse_1.5s_ease-in-out_infinite] [animation-delay:0.4s] motion-reduce:animate-none" />
      </div>
    </div>
  );
}

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from "react-router-dom";
// export default function SplashScreen() {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
//   const [dynamicBubbles, setDynamicBubbles] = useState([]);
//   const [isFadingOut, setIsFadingOut] = useState(false);
//   const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

//   const rafId = useRef(null);
//  const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/LanguagePage"); 
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [navigate]);
//   // Check for reduced motion preferences
//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
//     setPrefersReducedMotion(mediaQuery.matches);

//     const handleChange = (e) => setPrefersReducedMotion(e.matches);
//     mediaQuery.addEventListener('change', handleChange);
//     return () => mediaQuery.removeEventListener('change', handleChange);
//   }, []);

//   // Parallax animation loop
//   useEffect(() => {
//     if (prefersReducedMotion) return;

//     const updateBubbles = () => {
//       setCurrentPos((prev) => ({
//         x: prev.x + (mousePos.x - prev.x) * 0.1,
//         y: prev.y + (mousePos.y - prev.y) * 0.1,
//       }));
//       rafId.current = requestAnimationFrame(updateBubbles);
//     };

//     rafId.current = requestAnimationFrame(updateBubbles);
//     return () => {
//       if (rafId.current) cancelAnimationFrame(rafId.current);
//     };
//   }, [mousePos, prefersReducedMotion]);

//   // Track mouse movement
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePos({
//         x: e.clientX / window.innerWidth,
//         y: e.clientY / window.innerHeight,
//       });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Handle dynamic random bubble generator
//   useEffect(() => {
//     const createBubble = () => {
  

//       const newBubble = {
//         id,
//         size,
//         left: `${Math.random() * 100}%`,
//         top: `${Math.random() * 100}%`,
//         // animation: `floatBubble${animNum} ${animDuration}s ease-in-out infinite`,
//         // animationDelay: `${delay}s`,
//         hasArc,
//         rotate: `${Math.random() * 360}deg`,
//         opacity: 1,
//       };

//       setDynamicBubbles((prev) => [...prev, newBubble]);

//       // Soft expiration & cleanup
//       setTimeout(() => {
//         setDynamicBubbles((prev) =>
//           prev.map((b) => (b.id === id ? { ...b, opacity: 0 } : b))
//         );
//         setTimeout(() => {
//           setDynamicBubbles((prev) => prev.filter((b) => b.id !== id));
//         }, 2000);
//       }, 60000);
//     };

//     // Stagger initial bubbles
//     const initialTimers = [
//       setTimeout(() => createBubble(), 1000),
//       setTimeout(() => createBubble(), 4000),
//       setTimeout(() => createBubble(), 7000),
//     ];

//     // Dynamic generations every 10 seconds
//     const interval = setInterval(createBubble, 10000);

//     return () => {
//       initialTimers.forEach(clearTimeout);
//       clearInterval(interval);
//     };
//   }, []);

//   // Handle Space key simulation for redirect
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.code === 'Space') {
//         e.preventDefault();
//         setIsFadingOut(true);
//         console.log("Simulated home redirection triggered...");
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   // Handle Visibility API to pause loops when window loses focus
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden && rafId.current) {
//         cancelAnimationFrame(rafId.current);
//       }
//     };
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, []);

//   // Calculate parallax offsets based on bubble speed factors
//   // const getBubbleTransform = (factor) => {
//   //   if (prefersReducedMotion) return 'none';
//   //   const offsetX = (currentPos.x - 0.5) * factor;
//   //   const offsetY = (currentPos.y - 0.5) * factor;
//   //   return `translate(${offsetX}px, ${offsetY}px)`;
//   // };

//   return (
//   <div className="relative w-screen h-screen overflow-hidden flex justify-center items-center"
//       style={{
//         background: `
//           radial-gradient(ellipse 150% 100% at 20% 10%, rgba(54, 69, 255, 0.4) 0%, transparent 50%),
//           radial-gradient(ellipse 120% 80% at 80% 30%, rgba(158, 90, 158, 0.3) 0%, transparent 60%),
//           radial-gradient(ellipse 100% 60% at 60% 80%, rgba(232, 180, 160, 0.4) 0%, transparent 50%),
//           radial-gradient(ellipse 80% 100% at 90% 90%, rgba(255, 180, 160, 0.3) 0%, transparent 40%),
//           linear-gradient(180deg, #121850 0%, #1A2366 50%, #0A0F3C 100%)
//         `
//       }}
//     >
//       {/* Dynamic Keyframes Styling Injection */}
//       <style>{`
//         @keyframes floatBubble1 {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(50px, 30px) scale(1.05); }
//           66% { transform: translate(-30px, -20px) scale(0.98); }
//         }
//         @keyframes floatBubble2 {
//           0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
//           50% { transform: translate(-40px, 40px) scale(1.08) rotate(10deg); }
//         }
//         @keyframes floatBubble3 {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           25% { transform: translate(30px, -30px) scale(1.03); }
//           50% { transform: translate(-20px, -50px) scale(1.06); }
//           75% { transform: translate(40px, 20px) scale(0.97); }
//         }
//         // @keyframes floatBubble5 {
//         //   0%, 100% { transform: translate(0, 0) scale(1); }
//         //   25% { transform: translate(-40px, 20px) scale(1.1); }
//         //   75% { transform: translate(40px, -30px) scale(0.9); }
//         // }
//         @keyframes logoFadeIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
//         @keyframes titleFadeIn { to { opacity: 1; } }
//         @keyframes subtitleFadeIn { to { opacity: 0.8; } }
//         @keyframes loaderFadeIn { to { opacity: 1; } }
//         @keyframes floatMain { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
//         @keyframes loaderPulse { 0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; } 40% { transform: scale(1.2); opacity: 1; } }
//         @keyframes fadeOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } }
//         @keyframes fadeOutSimple { to { opacity: 0; } }

//         // .bubble-glow::before {
//         //   content: ''; position: absolute; top: -5%; left: -5%; width: 110%; height: 110%; border-radius: 50%;
//         //   background: radial-gradient(circle at 30% 30%, transparent 45%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.3) 52%, rgba(255, 255, 255, 0.1) 54%, transparent 60%);
//         //   transform: rotate(-45deg);
//         // }
//         // .bubble-glow::after {
//         //   content: ''; position: absolute; bottom: 10%; right: 10%; width: 30%; height: 30%; border-radius: 50%;
//         //   background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 70%);
//         //   filter: blur(5px);
//         // }
//       `}</style>

//       {/* Bubble Layer */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none">

//         {/* Bubble 1 */}
//         <div
//           className="absolute rounded-full backdrop-blur-[2px] bubble-glow transition-transform duration-200 ease-out w-[500px] h-[500px] -top-[200px] -left-[150px]"
//           style={{
//             // transform: getBubbleTransform(5),
//             // animation: prefersReducedMotion ? 'none' : 'floatBubble1 25s ease-in-out infinite',
//             background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)'
//           }}
//         >
//           <div className="absolute border-2 border-solid border-transparent border-b-white/35 border-l-white/35 rounded-full blur-[1px] w-[480px] h-[480px] top-2.5 left-2.5 rotate-[45deg]" />
//           <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_0%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.1)_70%,transparent_80%)]" />
//         </div>

//         {/* Bubble 2 */}
//         <div
//           className="absolute rounded-full backdrop-blur-[2px] bubble-glow transition-transform duration-200 ease-out w-[400px] h-[400px] top-[20%] -right-[100px]"
//           style={{
//             // transform: getBubbleTransform(10),
//             // animation: prefersReducedMotion ? 'none' : 'floatBubble2 20s ease-in-out infinite',
//             background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)'
//           }}
//         >
//           <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_0%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.1)_70%,transparent_80%)]" />
//         </div>

//         {/* Bubble 3 */}
//         <div
//           className="absolute rounded-full backdrop-blur-[2px] bubble-glow transition-transform duration-200 ease-out w-[600px] h-[600px] -bottom-[300px] left-[30%]"
//           style={{
//             // transform: getBubbleTransform(15),
//             // animation: prefersReducedMotion ? 'none' : 'floatBubble3 30s ease-in-out infinite',
//             background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)'
//           }}
//         >
//           <div className="absolute border-2 border-solid border-transparent border-b-white/35 border-l-white/35 rounded-full blur-[1px] w-[580px] h-[580px] top-2.5 left-2.5 -rotate-[30deg]" />
//           <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_0%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.1)_70%,transparent_80%)]" />
//         </div>

//         {/* Bubble 5 */}
//         <div
//           className="absolute rounded-full backdrop-blur-[2px] bubble-glow transition-transform duration-200 ease-out w-[250px] h-[250px] top-[70%] right-[10%]"
//           style={{
//             // transform: getBubbleTransform(20),
//             // animation: prefersReducedMotion ? 'none' : 'floatBubble5 18s ease-in-out infinite',
//             background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)'
//           }}
//         >
//           <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_0%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.1)_70%,transparent_80%)]" />
//         </div>

//         {/* Generated Dynamic Bubble Stream */}
//         {dynamicBubbles.map((bub) => (
//           <div
//             key={bub.id}
//             className="absolute rounded-full backdrop-blur-[2px] bubble-glow transition-all duration-[2000ms] ease-out"
//             style={{
//               width: `${bub.size}px`,
//               height: `${bub.size}px`,
//               left: bub.left,
//               top: bub.top,
//               opacity: bub.opacity,
//               animation: prefersReducedMotion ? 'none' : bub.animation,
//               animationDelay: bub.animationDelay,
//               background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)'
//             }}
//           >
//             <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full bg-[radial-gradient(circle_at_70%_70%,transparent_0%,rgba(255,255,255,0.05)_60%,rgba(255,255,255,0.1)_70%,transparent_80%)]" />
//             {bub.hasArc && (
//               <div
//                 className="absolute border-2 border-solid border-transparent border-b-white/35 border-l-white/35 rounded-full blur-[1px] top-2.5 left-2.5"
//                 style={{
//                   width: `${bub.size - 20}px`,
//                   height: `${bub.size - 20}px`,
//                   transform: `rotate(${bub.rotate})`
//                 }}
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Main Branding Center Container */}
//       <div className="relative z-10 text-center ">
//         <svg
// className="mx-auto "         
//  viewBox="0 0 400 200"
//           xmlns="http://www.w3.org/2000/svg"
//           width="600"
//           height="300"
//         >
//           <defs>
//             <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" style={{ stopColor: '#3645FF', stopOpacity: 1 }} />
//               <stop offset="50%" style={{ stopColor: '#5A6FFF', stopOpacity: 1 }} />
//               <stop offset="100%" style={{ stopColor: '#7B88FF', stopOpacity: 1 }} />
//             </linearGradient>

//             <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" style={{ stopColor: '#E8B4A0', stopOpacity: 1 }} />
//               <stop offset="100%" style={{ stopColor: '#FFB4A0', stopOpacity: 1 }} />
//             </linearGradient>

//             <filter id="glow">
//               <feGaussianBlur stdDeviation="4" result="coloredBlur" />
//               <feMerge>
//                 <feMergeNode in="coloredBlur" />
//                 <feMergeNode in="SourceGraphic" />
//               </feMerge>
//             </filter>
//           </defs>

//           <g transform="translate(200, 100)">
//             <g>
//               <animateTransform
//                 attributeName="transform"
//                 attributeType="XML"
//                 type="rotate"
//                 from="0 5 12"
//                 to="360 5 12"
//                 // dur="10s"  
//                 // repeatCount="indefinite"
//               />
//               <path
//                 d="M -25 5 C -25 -15, -10 -30, 5 -30 C 20 -30, 35 -15, 35 5 L 35 20 C 35 35, 20 45, 5 45 C -10 45, -25 35, -25 20 Z"
//                 fill="none"
//                 stroke="url(#mainGradient)"
//                 strokeWidth="3"
//                 opacity="0.9"
//                 filter="url(#glow)"
//               />
//             </g>

//             <g>
//               <animateTransform
//                 attributeName="transform"
//                 attributeType="XML"
//                 type="rotate"
//                 from="0 5 12"
//                 to="-360 5 12"
//                 // dur="12s"
//                 // repeatCount="indefinite"
//               />
//               <path
//                 d="M -15 12 C -15 -5, 0 -20, 15 -20 C 30 -20, 45 -5, 45 12 L 45 25 C 45 40, 30 50, 15 50 C 0 50, -15 40, -15 25 Z"
//                 fill="none"
//                 stroke="url(#accentGradient)"
//                 strokeWidth="3"
//                 opacity="0.8"
//                 filter="url(#glow)"
//               />
//             </g>

//             <circle cx="5" cy="12" r="4" fill="#FFFFFF" opacity="0.9" >
//               {/* filter="url(#glow) */}
//               <animate
//                 attributeName="r"
//                 values="4;6;4"
//                 // dur="3s"
//                 // repeatCount="indefinite" 
//               />
//             </circle>
//           </g>
//         </svg>

//        <h1 className="text-white text-5xl mt-6">
//     <span className="font-medium">IA</span>
//     <span className="text-[#E8B4A0]">Meet</span>
//     <span className="font-medium">You</span>
//   </h1>


//         <p className="text-white/80 mt-2 tracking-[2px]">
//     CONNECTEZ DIFFÉREMMENT
//   </p>
//       </div>

//       {/* Absolute Bottom Loader */}
//       <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex gap-2.5 opacity-0 animate-[loaderFadeIn_1s_ease-out_2s_forwards]">
//         <div className="w-2.5 h-2.5 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-[loaderPulse_1.5s_ease-in-out_infinite] [animation-delay:0s] motion-reduce:animate-none" />
//         <div className="w-2.5 h-2.5 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-[loaderPulse_1.5s_ease-in-out_infinite] [animation-delay:0.2s] motion-reduce:animate-none" />
//         <div className="w-2.5 h-2.5 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-[loaderPulse_1.5s_ease-in-out_infinite] [animation-delay:0.4s] motion-reduce:animate-none" />
//       </div>
//     </div>
//   );
// }