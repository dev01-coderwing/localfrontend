
// import React, { useRef, useState, useEffect } from "react";
// import { X, User, ShieldCheck } from "lucide-react";

// function Selfie({ closeModal }) {
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);

//   const [image, setImage] = useState(null);
//   const [cameraOpen, setCameraOpen] = useState(false);

//   // ================= STATES =================
//   const isIdle = !cameraOpen && !image;
//   const isCamera = cameraOpen && !image;
//   const isCaptured = !!image;

//   // ================= OPEN CAMERA =================
//   const openCamera = () => setCameraOpen(true);

//   // ================= START CAMERA =================
//   useEffect(() => {
//     const startCamera = async () => {
//       if (!cameraOpen) return;

//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: "user" },
//           audio: false,
//         });

//         streamRef.current = stream;

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           await videoRef.current.play().catch(() => {});
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     startCamera();
//   }, [cameraOpen]);

//   // ================= STOP CAMERA =================
//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//   };

//   useEffect(() => {
//     return () => stopCamera();
//   }, []);

//   // ================= CAPTURE =================
//   const capture = () => {
//     const video = videoRef.current;

//     const canvas = document.createElement("canvas");
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0);

//     setImage(canvas.toDataURL("image/png"));

//     stopCamera();
//     setCameraOpen(false);
//   };

//   // ================= RETAKE =================
//   const retake = () => {
//     setImage(null);
//     setCameraOpen(true);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">

//       <div className="bg-white w-[650px] rounded-[24px] p-6 relative h-140">

//         {/* CLOSE */}
//         <button
//           onClick={() => {
//             stopCamera();
//             closeModal();
//           }}
//           className="absolute top-4 right-4 w-8 h-8 rounded-full border text-gray-500 flex items-center justify-center"
//         >
//           <X size={16} />
//         </button>

//         {/* HEADER */}
//         <h2 className="text-[20px] font-bold text-[#1B1B3D]">
//           KYC Verification
//         </h2>

//         <div className="flex items-center justify-between mt-0">
//           <p className="text-sm text-gray-500">Take a Selfie</p>
//           <p className="text-sm text-gray-500">Step 2 of 3</p>
//         </div>

//         {/* PROGRESS */}
//         <div className="flex gap-2 mt-3">
//           <div className="h-[4px] w-1/3 rounded-full bg-[#FF6B6B]"></div>
//           <div className="h-[4px] w-1/3 rounded-full bg-[#FF6B6B]"></div>
//           <div className="h-[4px] w-1/3 rounded-full bg-pink-100"></div>
//         </div>

//         {/* TITLE */}
//         <div className="text-center mt-3">
//           <h3 className="text-[25px] font-bold text-[#1B1B3D]">
//             Take a Selfie
//           </h3>

//           <div className="flex items-center justify-center gap-2 mt-0">
//             <ShieldCheck size={16} className="text-[#7B61FF]" />
//             <span className="text-[#7B61FF] text-sm">
//               Identity Verification
//             </span>
//           </div>
//         </div>

//         {/* CAMERA BOX (NO LAYOUT CHANGE) */}
//         <div className="flex justify-center mt-5">
//           <div className="w-[220px] h-[200px] rounded-2xl overflow-hidden border-4 border-gray-200 bg-gray-100 flex items-center justify-center">

//             {isCamera ? (
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 playsInline
//                 muted
//                 className="w-full h-full object-cover"
//               />
//             ) : image ? (
//               <img
//                 src={image}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <User size={100} className="text-gray-300" />
//             )}

//           </div>
//         </div>

//         {/* TEXT */}
//         <p className="text-center text-[#1B1B3D] font-medium mt-5">
//           Hold your phone steady and look straight at the camera
//         </p>

//         <p className="text-center text-gray-400 text-sm mt-2">
//           Ensure your face is well-lit and fits within the guide.
//         </p>

//         {/* ================= FOOTER ================= */}

//         {/* OPEN CAMERA */}
//         {isIdle && (
//           <>
//             <button
//               onClick={openCamera}
//               className="w-full mt-5 py-2 rounded-2xl text-white font-semibold bg-gradient-to-r from-pink-300 to-blue-500"
//             >
//               Open Camera
//             </button>

//             <button
//               onClick={closeModal}
//               className="w-full mt-3 text-gray-400 text-sm"
//             >
//               I'll do this later
//             </button>
//           </>
//         )}

//         {/* CAMERA ACTIVE (SIDE BY SIDE BUTTONS) */}
//         {isCamera && (
//             <>
//     <div className="flex justify-center gap-4 mt-4">

//             <button
//               onClick={capture}
//               className="px-5 py-2 rounded-full border border-gray-300 text-sm text-gray-600 flex items-center gap-4"
//             >Capture
//             </button>

//             <button
//               onClick={retake}
//               className="px-5 py-2 rounded-full border border-gray-300 text-sm text-gray-600  flex items-center gap-4"
//             >Retake
//         </button>
// </div>

// <button className="w-full mt-2 py-1 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-300 to-blue-500">
//       Confirm
// </button>

// </>

//         )}

//         {/* AFTER CAPTURE */}
//         {isCaptured && (
//           <>
//             <div className="flex justify-center gap-4 mt-1">

//               <button
//                 onClick={retake}
//                 className="px-5 py-1 rounded-full border text-gray-600 border-gray-300 text-sm flex items-center gap-4"
//               >Retake
//               </button>

//               <button
//                 onClick={() => {
//                   setImage(null);
//                   setCameraOpen(true);
//                 }}
//                 className="px-5 py-1 rounded-full border border-gray-300 text-gray-600 text-sm flex items-center gap-4"
//               > Re-Capture
//               </button>
//             </div>
//    <button className="w-full mt-1 py-1 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-300 to-blue-500">
//               Confirm
//             </button>
//           </>
//         )}

//       </div>
//     </div>
//   );
// }

// export default Selfie;










import React, { useRef, useState, useEffect } from "react";
import { X, User, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Selfie({ closeModal, nextStep }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [image, setImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  // ================= STATES =================
  const isIdle = !cameraOpen && !image;
  const isCamera = cameraOpen && !image;
  const isCaptured = !!image;

  // ================= OPEN CAMERA =================
  const openCamera = () => setCameraOpen(true);

  // ================= START CAMERA =================
  useEffect(() => {
    const startCamera = async () => {
      if (!cameraOpen) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
      } catch (error) {
        console.log(error);
      }
    };

    startCamera();
  }, [cameraOpen]);

  // ================= STOP CAMERA =================
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  // ================= CAPTURE =================
  const capture = () => {
    const video = videoRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    setImage(canvas.toDataURL("image/png"));

    stopCamera();
    setCameraOpen(false);
  };

  // ================= RETAKE =================
  const retake = () => {
    setImage(null);
    setCameraOpen(true);
  };

  // ================= CONFIRM =================
  const handleConfirm = () => {
    nextStep();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3 sm:px-4 py-4 overflow-y-auto">
      
      <div className="bg-[var(--bg-background)] w-full max-w-[650px] rounded-[24px] p-4 sm:p-6 relative min-h-[700px] sm:min-h-[560px]">

        {/* CLOSE */}
        <button
          onClick={() => {
            stopCamera();
            closeModal();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[var(--border)] text-[var(--text-dim)] flex items-center justify-center"
        >
          <X size={16} />
        </button>

        {/* HEADER */}
        <h2 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-dim)]">
          KYC Verification
        </h2>

        <div className="flex items-center justify-between mt-1 gap-3">
          <p className="text-[13px] sm:text-sm text-[var(--text-dim2)]">
            Take a Selfie
          </p>

          <p className="text-[13px] sm:text-sm text-[var(--text-dim2)] whitespace-nowrap">
            Step 2 of 3
          </p>
        </div>

        {/* PROGRESS */}
        <div className="flex gap-2 mt-3">
          <div className="h-[4px] w-1/3 rounded-full bg-[var(--bg-card)]"></div>
          <div className="h-[4px] w-1/3 rounded-full bg-[var(--bg-card)]"></div>
          <div className="h-[4px] w-1/3 rounded-full bg-[var(--bg-card)]"></div>
        </div>

        {/* TITLE */}
        <div className="text-center mt-5 sm:mt-3">
          <h3 className="text-[22px] sm:text-[25px] font-bold text-[var(--text-dim)]">
            Take a Selfie
          </h3>

          <div className="flex items-center justify-center gap-2 mt-1">
            <ShieldCheck size={16} className="text-[#7B61FF]" />

            <span className="text-[#7B61FF] text-[13px] sm:text-sm">
              Identity Verification
            </span>
          </div>
        </div>

        {/* CAMERA BOX */}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-[220px] h-[200px] rounded-2xl overflow-hidden border-4 border-[var(--border)] bg-[var(--bg-card)]/10 flex items-center justify-center">

            {isCamera ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : image ? (
              <img
                src={image}
                alt="Captured selfie"
                className="w-full h-full object-cover"
              />
            ) : (
              <User
                size={90}
                className="text-[var(--text-dim)]"
              />
            )}
          </div>
        </div>

        {/* TEXT */}
        <p className="text-center text-[14px] sm:text-[16px] text-[var(--text-dim)] font-medium mt-5 leading-6">
          Hold your phone steady and look straight at the camera
        </p>

        <p className="text-center text-[13px] sm:text-sm text-[var(--text-dim2)] mt-2 leading-6">
          Ensure your face is well-lit and fits within the guide.
        </p>

        {/* ================= IDLE ================= */}
        {isIdle && (
          <>
            <button
              onClick={openCamera}
              className="w-full mt-5 py-3 rounded-2xl text-white font-semibold text-[15px] sm:text-[16px] bg-gradient-to-r from-pink-300 to-blue-500"
            >
              Open Camera
            </button>

            <button
              onClick={closeModal}
              className="w-full mt-3 text-[13px] sm:text-sm text-[var(--text-dim)]"
            >
              I'll do this later
            </button>
          </>
        )}

        {/* ================= CAMERA ACTIVE ================= */}
        {isCamera && (
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-5">
            <button
              onClick={capture}
              className="px-5 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--text-dim)] bg-[var(--bg-card)]/10"
            >
              Capture
            </button>

            <button
              onClick={retake}
              className="px-5 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--text-dim)] bg-[var(--bg-card)]/10"
            >
              Retake
            </button>
          </div>
        )}

        {/* ================= AFTER CAPTURE ================= */}
        {isCaptured && (
          <>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-5">
              <button
                onClick={retake}
                className="px-5 py-2 rounded-full border border-[var(--border)] text-[var(--text-dim)] text-sm bg-[var(--bg-card)]/10"
              >
                Retake
              </button>

              <button
                onClick={() => {
                  setImage(null);
                  setCameraOpen(true);
                }}
                className="px-5 py-2 rounded-full border border-[var(--border)] text-[var(--text-dim)] text-sm bg-[var(--bg-card)]/10"
              >
                Re-Capture
              </button>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full mt-4 py-3 rounded-xl text-white font-semibold text-[15px] sm:text-[16px] bg-gradient-to-r from-pink-300 to-blue-500"
            >
              Confirm
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Selfie; 