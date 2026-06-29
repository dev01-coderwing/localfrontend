// import { useState } from "react";
// import { Mic } from "lucide-react";
// import VoiceConsentModal from "./VoiceConsentModal";

// export default function VoiceAnalysis() {
//   const [showModal, setShowModal] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [time, setTime] = useState(0);

//   // 🎤 Start recording AFTER consent
//   const startRecording = () => {
//     setIsRecording(true);
//     let t = 0;

//     const interval = setInterval(() => {
//       t++;
//       setTime(t);

//       if (t === 10) {
//         clearInterval(interval);
//         setIsRecording(false);
//       }
//     }, 1000);
//   };

//   // 👉 Mic click → open modal
//   const handleMicClick = () => {
//     setShowModal(true);
//   };

//   // 👉 After Agree
//   const handleAgree = () => {
//     setShowModal(false);
//     startRecording();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f5f2ee]">
//       <div className="bg-[var(--bg)] w-full max-w-xl rounded-2xl shadow-md p-6 text-center">

//         {/* Header */}
//         <div className="flex items-center gap-2 mb-4">
//           <button className="text-gray-500">←</button>
//           <h2 className="font-semibold text-lg">Voice Analysis</h2>
//         </div>

//         {/* Progress */}
//         <div className="mb-6">
//           <p className="text-xs text-gray-500 mb-1">Question progress</p>
//           <div className="w-full h-1 bg-gray-200 rounded-full">
//             <div className="h-1 bg-orange-400 w-[15%] rounded-full"></div>
//           </div>
//           <p className="text-xs text-right text-gray-400 mt-1">
//             10 of 230
//           </p>
//         </div>

//         {/* Question */}
//         <div className="bg-purple-100 text-gray-700 rounded-xl py-6 px-4 mb-6">
//           "What's your ideal way to spend a weekend?"
//         </div>

//         {/* Wave */}
//         <div className="mb-6">
//           {isRecording ? (
//             <div className="flex justify-center gap-1">
//               {[...Array(15)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="w-1 bg-purple-500 animate-pulse"
//                   style={{ height: `${10 + Math.random() * 20}px` }}
//                 />
//               ))}
//             </div>
//           ) : (
//             <p className="text-purple-400">••••••••••••••</p>
//           )}
//         </div>

//         {/* Timer */}
//         {isRecording && (
//           <p className="text-sm text-gray-500 mb-3">
//             00:{time < 10 ? `0${time}` : time}
//           </p>
//         )}

//         {/* Mic Button */}
//         <div className="flex flex-col items-center">
//           <button
//             onClick={handleMicClick}
//             className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-[var(--text)] shadow-lg"
//           >
//             <Mic size={24} />
//           </button>

//           <p className="text-xs text-gray-500 mt-3">Tap to record</p>
//           <p className="text-[10px] text-gray-400">
//             Minimum 5 seconds required
//           </p>
//         </div>
//       </div>

//       {/* ✅ Modal */}
//       {showModal && (
//         <VoiceConsentModal
//           onClose={() => setShowModal(false)}
//           onAgree={handleAgree}
//         />
//       )}
//     </div>
//   );
// }

// import { useState } from "react";
// import { Mic } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import VoiceConsentModal from "./VoiceConsentModal";
// import Navbar from "../../Navbar/Navbar";

// const GAMES = [
//   { name: "rush-session", path: "/voiceAnalysis/rushsessionhome" },
//   { name: "bubble-pop-love", path: "/VoiceAnalysis/colormatchhome" },
//   { name: "emoji-match", path: "/voiceAnalysis/heartmemoryhome" },
// ];

// export default function VoiceAnalysis() {
//   const [showModal, setShowModal] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [time, setTime] = useState(0);

//   const navigate = useNavigate();

//   // 🎯 Redirect Logic
//   const handleGameRedirect = () => {
//     const lastGame = localStorage.getItem("lastGame");

//     const availableGames = GAMES.filter(
//       (game) => game.name !== lastGame
//     );

//     const randomGame =
//       availableGames[Math.floor(Math.random() * availableGames.length)];

//     localStorage.setItem("lastGame", randomGame.name);

//     navigate(randomGame.path);
//   };

//   // 🎤 Start recording AFTER consent
//   const startRecording = () => {
//     setIsRecording(true);
//     let t = 0;

//     const interval = setInterval(() => {
//       t++;
//       setTime(t);

//       if (t === 10) {
//         clearInterval(interval);
//         setIsRecording(false);

//         // 🚀 REDIRECT AFTER 10s
//         setTimeout(() => {
//           handleGameRedirect();
//         }, 500); // small delay for UX
//       }
//     }, 1000);
//   };

//   // 👉 Mic click → open modal
//   const handleMicClick = () => {
//     setShowModal(true);
//   };

//   // 👉 After Agree
//   const handleAgree = () => {
//     setShowModal(false);
//     startRecording();
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
//         <div className="bg-[var(--card)] w-full max-w-xl rounded-2xl shadow-lg p-6 text-center">

//           {/* Header */}
//           <div className="flex items-center gap-2 mb-4">
//             <button className="text-gray-500">←</button>
//             <h2 className="font-semibold text-lg">Voice Analysis</h2>
//           </div>

//           {/* Progress */}
//           <div className="mb-6">
//             <p className="text-xs text-gray-500 mb-1">Question progress</p>
//             <div className="w-full h-1 bg-gray-200 rounded-full">
//               <div className="h-1 bg-orange-400 w-[15%] rounded-full"></div>
//             </div>
//             <p className="text-xs text-right text-gray-400 mt-1">
//               10 of 230
//             </p>
//           </div>

//           {/* Question */}
//           <div className="bg-purple-100 text-gray-700 rounded-xl py-6 px-4 mb-6">
//             "What's your ideal way to spend a weekend?"
//           </div>

//           {/* Wave */}
//           <div className="mb-6">
//             {isRecording ? (
//               <div className="flex justify-center gap-1">
//                 {[...Array(15)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-1 bg-purple-500 animate-pulse"
//                     style={{ height: `${10 + Math.random() * 20}px` }}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-purple-400">••••••••••••••</p>
//             )}
//           </div>

//           {/* Timer */}
//           {isRecording && (
//             <p className="text-sm text-gray-500 mb-3">
//               00:{time < 10 ? `0${time}` : time}
//             </p>
//           )}

//           {/* Mic Button */}
//           <div className="flex flex-col items-center">
//             <button
//               onClick={handleMicClick}
//               className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg"
//             >
//               <Mic size={24} />
//             </button>

//             <p className="text-xs text-gray-500 mt-3">Tap to record</p>
//             <p className="text-[10px] text-gray-400">
//               Minimum 5 seconds required
//             </p>
//           </div>
//         </div>

//         {/* Modal */}
//         {showModal && (
//           <VoiceConsentModal
//             onClose={() => setShowModal(false)}
//             onAgree={handleAgree}
//           />
//         )}
//       </div>
//     </>
//   );
// }



import { useState } from "react";
import { Mic, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VoiceConsentModal from "./VoiceConsentModal";
import Navbar from "../../Navbar/Navbar";
import { useTranslation } from "react-i18next";

const GAMES = [
  { name: "rush-session", path: "/voiceAnalysis/rushsessionhome" },
  { name: "bubble-pop-love", path: "/VoiceAnalysis/colormatchhome" },
  { name: "emoji-match", path: "/voiceAnalysis/heartmemoryhome" },
];

export default function VoiceAnalysis() {
  const [showModal, setShowModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);

  const navigate = useNavigate();
  const { t } = useTranslation();

  // 🎯 Redirect Logic
  const handleGameRedirect = () => {
    const lastGame = localStorage.getItem("lastGame");

    const availableGames = GAMES.filter(
      (game) => game.name !== lastGame
    );

    const randomGame =
      availableGames[Math.floor(Math.random() * availableGames.length)];

    localStorage.setItem("lastGame", randomGame.name);

    navigate(randomGame.path);
  };

  // 🎤 Start recording AFTER consent
  const startRecording = () => {
    setIsRecording(true);
    let t = 0;

    const interval = setInterval(() => {
      t++;
      setTime(t);

      if (t === 10) {
        clearInterval(interval);
        setIsRecording(false);

        // 🚀 REDIRECT AFTER 10s
        setTimeout(() => {
          handleGameRedirect();
        }, 500); // small delay for UX
      }
    }, 1000);
  };

  // 👉 Mic click → open modal
  const handleMicClick = () => {
    setShowModal(true);
  };

  // 👉 After Agree
  const handleAgree = () => {
    setShowModal(false);
    startRecording();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-background)] ">
        <div className="bg-[var(--bg-card)]/10 w-full max-w-xl rounded-2xl shadow-lg p-6 text-center">

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">

            <button
              onClick={() => window.history.back()}
              className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-dim)] hover:bg-[var(--hover)] transition"
            >
              <ArrowLeft size={18} />
            </button>

            <h2 className="font-semibold text-lg text-[var(--text-dim)]">
              {t("voice.title")}
            </h2>

          </div>

          {/* Progress */}
          <div className="mb-6 bg-[var(--bg-card)]/10 p-4 rounded-xl">
            <p className="text-xs text-[var(--text-dim2)] mb-1">{t("voice.questionProgress")}</p>
            <div className="w-full h-1 bg-[var(--border)] rounded-full">
              <div className="h-1 bg-[var(--accent)] rounded-full" style={{ width: "15%" }}></div>
            </div>
            <p className="text-xs text-right text-[var(--text-dim2)] mt-1">
              {t("voice.progressText")}
            </p>
          </div>

          {/* Question */}
          <div className="bg-[var(--card)] text-[var(--text-dim)] rounded-xl py-6 px-4 mb-6">
            {t("voice.sampleQuestion")}
          </div>

          {/* Wave */}
          <div className="mb-6">
            {isRecording ? (
              <div className="flex justify-center gap-1">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-purple-500 animate-pulse"
                    style={{ height: `${10 + Math.random() * 20}px` }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-purple-400">••••••••••••••</p>
            )}
          </div>

          {/* Timer */}
          {isRecording && (
            <p className="text-sm text-[var(--text-dim)] mb-3">
              00:{time < 10 ? `0${time}` : time}
            </p>
          )}

          {/* Mic Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleMicClick}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg"
            >
              <Mic size={24} />
            </button>

            <p className="text-xs text-[var(--text-dim)] mt-3">{t("voice.tapToRecord")}</p>
            <p className="text-[10px] text-[var(--text-dim2)]">
              {t("voice.minimumSeconds")}
            </p>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <VoiceConsentModal
            onClose={() => setShowModal(false)}
            onAgree={handleAgree}
          />
        )}
      </div>
    </>
  );
}
