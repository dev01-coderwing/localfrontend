// import React, { useState, useEffect } from 'react';

// const Animation = ({ children }) => {
//     const [theme, setTheme] = useState(localStorage.getItem('selectedTheme') || 'dark');

//     const themes = [
//         { id: 'dark', name: 'Dark', gradient: 'linear-gradient(135deg, #121850, #0A0F3C)' },
//         { id: 'rose-lilas-theme', name: 'Rose Lilas', gradient: 'linear-gradient(135deg, #FFE4E1, #F8F8FF)' },
//         { id: 'noir-bronze-theme', name: 'Noir Bronze', gradient: 'linear-gradient(135deg, #0A0A0A, #000000)' },
//     ];

//     const applyTheme = (themeName) => {
//         setTheme(themeName);
//         localStorage.setItem('selectedTheme', themeName);
//     };

//     useEffect(() => {
//         // Remove all theme classes first
//         document.body.classList.remove('dark', 'rose-lilas-theme', 'noir-bronze-theme');

//         // Add current theme class
//         document.body.classList.add(theme);
//     }, [theme]);

//     const backgroundStyle = {
//         background: `
//             radial-gradient(ellipse 150% 100% at 20% 10%, var(--gradient-1) 0%, transparent 50%),
//             radial-gradient(ellipse 120% 80% at 80% 30%, var(--gradient-2) 0%, transparent 60%),
//             linear-gradient(180deg, var(--linear-1) 0%, var(--linear-2) 50%, var(--linear-3) 100%)
//         `,
//         transition: 'background 0.5s ease',
//     };

//     return (
//         <div style={backgroundStyle} className="relative min-h-screen w-full font-sans overflow-x-hidden">
//             {/* Animated Background Layer */}
//             <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
//                 <div className="absolute rounded-full backdrop-blur-[1.5px] w-[40vmax] h-[40vmax] -top-[10vh] -left-[10vw] animate-bubble-1 bubble-glow opacity-60">
//                     <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] rounded-full rotate-45 bubble-reflex"></div>
//                 </div>
//                 <div className="absolute rounded-full backdrop-blur-[1.5px] w-[30vmax] h-[30vmax] top-[50vh] -right-[15vw] animate-bubble-2 bubble-glow opacity-50">
//                     <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] rounded-full rotate-45 bubble-reflex"></div>
//                 </div>
//                 <div className="absolute rounded-full backdrop-blur-[1.5px] w-[50vmax] h-[50vmax] -bottom-[15vh] left-[20vw] animate-bubble-3 bubble-glow opacity-40">
//                     <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] rounded-full rotate-45 bubble-reflex"></div>
//                 </div>
//             </div>

//             {/* Theme Selector - Fixed to stay on top */}
//             <div className="fixed top-20 right-5 z-[9999] flex gap-2">
//                 {themes.map((t) => (
//                     <span
//                         key={t.id}
//                         onClick={() => applyTheme(t.id)}
//                         className={`w-6 h-6 rounded-full cursor-pointer border border-black/10 transition-all duration-300 shadow-md hover:scale-125 ${theme === t.id ? 'scale-125 ring-2 ring-[var(--primary-blue)]' : ''}`}
//                         style={{ background: t.gradient }}
//                         title={t.name}
//                     ></span>
//                 ))}
//             </div>

//             {/* Content Layer */}
//             <div className="relative z-10 w-full min-h-screen">
//                 {children}
//             </div>

//             <style>{`
//                 .bubble-glow {
//                     box-shadow: inset 0 0 25px var(--bubble-shadow-1), inset 10px 0 30px var(--bubble-shadow-2);
//                 }
//                 .bubble-reflex {
//                     background: radial-gradient(circle at 35% 35%, var(--bubble-reflex) 0%, rgba(255, 255, 255, 0.4) 10%, transparent 30%);
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Animation;

// import React, { useMemo } from "react";

// const Animation = ({ children }) => {
//   // 🎨 only visual overlay (theme already global hai)
//   const backgroundStyle = {
//     background: `
//       radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 40%),
//       radial-gradient(circle at 80% 30%, rgba(255,255,255,0.06), transparent 50%)
//     `,
//     transition: "background 0.5s ease",
//   };

//   // bubbles config
//   const BUBBLE_SIZE = 80;
//   const cols = 4;
//   const rows = 3;
//   const gapX = 100 / cols;
//   const gapY = 100 / rows;

//   const bubbles = useMemo(() =>
//     [...Array(cols * rows)].map((_, i) => ({
//       id: i,
//       left: `${(i % cols) * gapX + Math.random() * (gapX - 10)}%`,
//       top: `${Math.floor(i / cols) * gapY + Math.random() * (gapY - 10)}%`,
//       delay: `${(i * 0.5).toFixed(1)}s`,
//       duration: `${(12 + Math.random() * 6).toFixed(1)}s`,
//     })),
//   []);

//   return (
//     <div className="relative min-h-screen w-full overflow-x-hidden" style={backgroundStyle}>
      
//       {/* 🟢 Floating bubbles */}
//       <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
//         {bubbles.map((b) => (
//           <div
//             key={b.id}
//             className="bubble"
//             style={{
//               width: `${BUBBLE_SIZE}px`,
//               height: `${BUBBLE_SIZE}px`,
//               left: b.left,
//               top: b.top,
//               animationDelay: b.delay,
//               animationDuration: b.duration,
//             }}
//           >
//             <div className="bubble-reflex" />
//           </div>
//         ))}
//       </div>

//       {/* Main content */}
//       <div className="relative z-10 w-full min-h-screen">
//         {children}
//       </div>

//       {/* CSS */}
//       <style>{`
//         .bubble {
//           position: absolute;
//           border-radius: 50%;
//           animation: floatBubble linear infinite;
//           opacity: 0.55;

//           background: radial-gradient(
//             circle at 32% 30%,
//             rgba(255,255,255,0.55) 0%,
//             rgba(255,255,255,0.10) 35%,
//             transparent 65%
//           );
//           border: 1px solid rgba(255,255,255,0.22);
//           backdrop-filter: blur(5px);
//         }

//         @keyframes floatBubble {
//           0%   { transform: translateY(0px) }
//           50%  { transform: translateY(-30px) }
//           100% { transform: translateY(0px) }
//         }

//         .bubble-reflex {
//           position: absolute;
//           inset: 0;
//           border-radius: 50%;
//           background: radial-gradient(
//             circle at 30% 28%,
//             rgba(255,255,255,0.8),
//             transparent 40%
//           );
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Animation;

import React, { useState, useEffect } from 'react';
import { useTheme } from "../../ThemeContext";

export default function Animation({ children }) {
  // --- States ---
  // const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('fr');
  const [flag, setFlag] = useState('🇫🇷');
const { theme, setTheme } = useTheme();
  // --- Theme Definitions (Mapping CSS variables into dynamic styles) ---
  const themes = {
    light: {
      gradient1: 'rgba(173, 216, 230, 0.5)', gradient2: 'rgba(255, 192, 203, 0.4)',
      linear1: '#F0F8FF', linear2: '#FEF9F3', linear3: '#F5F5DC',
      bubbleShadow1: 'rgba(221, 160, 221, 0.25)', bubbleShadow2: 'rgba(255, 192, 203, 0.25)',
      bubbleReflex: 'rgba(255, 255, 255, 0.8)', primaryBlue: '#3645FF',
      textPrimary: '#2C3E50', textSecondary: '#34495E',
      uiCardBg: 'rgba(255, 255, 255, 0.95)', uiBorder: 'rgba(52, 73, 94, 0.2)',
      inputBg: '#ffffff', inputBorder: '#BDC3C7', dotBg: 'linear-gradient(135deg, #F0F8FF, #FEF9F3)'
    },
    // 'dark-theme': {
    //   gradient1: 'rgba(54, 69, 255, 0.4)', gradient2: 'rgba(158, 90, 158, 0.3)',
    //   linear1: '#121850', linear2: '#1A2366', linear3: '#0A0F3C',
    //   bubbleShadow1: 'rgba(173, 216, 230, 0.2)', bubbleShadow2: 'transparent',
    //   bubbleReflex: 'rgba(255, 255, 255, 0.6)', primaryBlue: '#3645FF',
    //   textPrimary: '#E0E0FF', textSecondary: '#B0B0E0',
    //   uiCardBg: 'rgba(28, 28, 40, 0.85)', uiBorder: 'rgba(255, 255, 255, 0.15)',
    //   inputBg: 'rgba(255, 255, 255, 0.1)', inputBorder: 'rgba(255, 255, 255, 0.3)', dotBg: 'linear-gradient(135deg, #121850, #0A0F3C)'
    // },
    // 'forest-theme': {
    //   gradient1: 'rgba(0, 48, 24, 0.6)', gradient2: 'rgba(13, 61, 35, 0.5)',
    //   linear1: '#0D2818', linear2: '#1C4532', linear3: '#04251A',
    //   bubbleShadow1: 'rgba(129, 199, 132, 0.25)', bubbleShadow2: 'rgba(76, 175, 80, 0.2)',
    //   bubbleReflex: 'rgba(255, 255, 255, 0.8)', primaryBlue: '#2ECC71',
    //   textPrimary: '#90EE90', textSecondary: '#7FDD7F',
    //   uiCardBg: 'rgba(21, 71, 52, 0.85)', uiBorder: 'rgba(6, 95, 70, 0.4)',
    //   inputBg: 'rgba(255, 255, 255, 0.1)', inputBorder: 'rgba(46, 204, 113, 0.5)', dotBg: 'linear-gradient(135deg, #0D2818, #04251A)'
    // },
    'deep-blue-theme': {
      gradient1: 'rgba(25, 25, 112, 0.6)', gradient2: 'rgba(72, 61, 139, 0.5)',
      linear1: '#191970', linear2: '#000080', linear3: '#00008B',
      bubbleShadow1: 'rgba(123, 104, 238, 0.3)', bubbleShadow2: 'rgba(65, 105, 225, 0.3)',
      bubbleReflex: 'rgba(255, 255, 255, 0.6)', primaryBlue: '#7B68EE',
      textPrimary: '#E6E6FA', textSecondary: '#C0C0F0',
      uiCardBg: 'rgba(28, 28, 40, 0.85)', uiBorder: 'rgba(255, 255, 255, 0.15)',
      inputBg: 'rgba(255, 255, 255, 0.1)', inputBorder: 'rgba(123, 104, 238, 0.5)', dotBg: 'linear-gradient(135deg, #191970, #000080)'
    },
    // 'rose-lilas-theme': {
    //   gradient1: 'rgba(255, 182, 193, 0.6)', gradient2: 'rgba(221, 160, 221, 0.5)',
    //   linear1: '#FFE4E1', linear2: '#FFF0F5', linear3: '#F8F8FF',
    //   bubbleShadow1: 'rgba(255, 182, 193, 0.3)', bubbleShadow2: 'rgba(221, 160, 221, 0.3)',
    //   bubbleReflex: 'rgba(255, 255, 255, 0.8)', primaryBlue: '#D8A0D8',
    //   textPrimary: '#4A4A4A', textSecondary: '#6A6A6A',
    //   uiCardBg: 'rgba(255, 255, 255, 0.95)', uiBorder: 'rgba(221, 160, 221, 0.3)',
    //   inputBg: '#ffffff', inputBorder: '#DDA0DD', dotBg: 'linear-gradient(135deg, #FFE4E1, #F8F8FF)'
    // },
    'noir-bronze-theme': {
      gradient1: 'rgba(205, 127, 50, 0.4)', gradient2: 'rgba(184, 115, 51, 0.3)',
      linear1: '#0A0A0A', linear2: '#1A1A1A', linear3: '#000000',
      bubbleShadow1: 'rgba(205, 127, 50, 0.3)', bubbleShadow2: 'rgba(218, 165, 32, 0.2)',
      bubbleReflex: 'rgba(255, 255, 255, 0.6)', primaryBlue: '#CD7F32',
      textPrimary: '#DAA520', textSecondary: '#CD7F32',
      uiCardBg: 'rgba(20, 20, 20, 0.85)', uiBorder: 'rgba(205, 127, 50, 0.4)',
      inputBg: 'rgba(255, 255, 255, 0.05)', inputBorder: 'rgba(218, 165, 32, 0.5)', dotBg: 'linear-gradient(135deg, #0A0A0A, #000000)'
    }
  };

const current = themes[theme] || themes.light;
  // Load theme preference on mount
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('selectedTheme');
  //   if (savedTheme && themes[savedTheme]) {
  //     setTheme(savedTheme);
  //   }
  // }, []);

  // Update localStorage when theme updates
const applyTheme = (themeName) => {
  setTheme(themeName);
};

  // Handle language updates to automatically update flags
  const handleLanguageChange = (e) => {
    const val = e.target.value;
    setLanguage(val);
    setFlag(val === 'fr' ? '🇫🇷' : '🇬🇧');
  };

  // Dynamic Background configuration based on the current theme variables
  const backgroundStyle = {
    backgroundImage: `
      radial-gradient(ellipse 150% 100% at 20% 10%, ${current.gradient1} 0%, transparent 50%),
      radial-gradient(ellipse 120% 80% at 80% 30%, ${current.gradient2} 0%, transparent 60%),
      linear-gradient(180deg, ${current.linear1} 0%, ${current.linear2} 50%, ${current.linear3} 100%)
    `,
  };

  // Glassmorphic Organic Bubble Base Style
  const bubbleStyle = {
    boxShadow: `inset 0 0 25px ${current.bubbleShadow1}, inset 10px 0 30px ${current.bubbleShadow2}`,
  };

  return (
    <div 
      style={backgroundStyle} 
      className="w-screen min-h-screen font-sans overflow-x-hidden relative flex items-center justify-center transition-all duration-500 ease-in-out"
    >
      {/* ====== INJECTED ANIMATIONS (For continuous smooth keyframe translation) ====== */}
      <style>{`
        @keyframes floatBubble1 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(30px,50px)} 66%{transform:translate(-20px,-40px)} }
        @keyframes floatBubble2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,40px)} }
        @keyframes floatBubble3 { 0%,100%{transform:translate(0,0)} 25%{transform:translate(30px,-30px)} 50%{transform:translate(-20px,-50px)} 75%{transform:translate(40px,20px)} }
        .animate-bubble1 { animation: floatBubble1 25s infinite ease-in-out; }
        .animate-bubble2 { animation: floatBubble2 20s infinite ease-in-out; }
        .animate-bubble3 { animation: floatBubble3 30s infinite ease-in-out; }
        .bubble-reflex::before {
          content: ''; position: absolute; top: -10%; left: -10%; width: 120%; height: 120%; border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, ${current.bubbleReflex} 0%, rgba(255, 255, 255, 0.4) 10%, transparent 30%);
          transform: rotate(45deg);
        }
      `}</style>

      {/* ====== 1. BACKGROUND BUBBLES ====== */}
      <div className="fixed top-0 left-0 w-full height-full z-0 pointer-events-none">
        <div 
          style={bubbleStyle} 
          className="absolute rounded-full bg-transparent backdrop-blur-[1.5px] bubble-reflex w-[25vmax] h-[25vmax] -top-[10vh] -left-[10vw] animate-bubble1"
        />
        <div 
          style={bubbleStyle} 
          className="absolute rounded-full bg-transparent backdrop-blur-[1.5px] bubble-reflex w-[25vmax] h-[25vmax] top-[50vh] -right-[15vw] animate-bubble2"
        />
        <div 
          style={bubbleStyle} 
          className="absolute rounded-full bg-transparent backdrop-blur-[1.5px] bubble-reflex w-[25vmax] h-[25vmax] -bottom-[15vh] left-[20vw] animate-bubble3"
        />

             <div 
          style={bubbleStyle} 
          className="absolute rounded-full bg-transparent backdrop-blur-[1.5px] bubble-reflex w-[25vmax] h-[25vmax] -bottom-[vh] right-[20vw] animate-bubble3"
        />
  <div 
          style={bubbleStyle} 
          className="absolute rounded-full bg-transparent backdrop-blur-[1.5px] bubble-reflex w-[25vmax] h-[25vmax] -bottom-[100vh] -left-[10vw] animate-bubble1"
        />
        
      </div>
      
      {/* ====== 2. THEME SELECTOR ====== */}
      {/* <div className="fixed top-5 right-5 z-50 flex gap-2">
        {Object.keys(themes).map((themeKey) => (
          <span
            key={themeKey}
            onClick={() => applyTheme(themeKey)}
            style={{ background: themes[themeKey].dotBg }}
            className={`w-7 h-7 rounded-full cursor-pointer border border-black/10 transition-all duration-300 shadow-md hover:scale-110 
              ${theme === themeKey ? 'scale-110' : ''}`}
            className={theme === themeKey ? "w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-300 shadow-md scale-110" : "w-7 h-7 rounded-full cursor-pointer border border-black/10 transition-all duration-300 shadow-md hover:scale-110"}
            style={{
              background: themes[themeKey].dotBg,
              borderColor: theme === themeKey ? current.primaryBlue : 'rgba(0,0,0,0.1)',
              boxShadow: theme === themeKey ? `0 0 0 3px ${current.primaryBlue}` : '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
        ))}
      </div> */}
      {/* ====== PAGE CONTENT ====== */}
      <div className="relative z-10 w-full">
        {children}
      </div> 
  
    </div>
  );
}