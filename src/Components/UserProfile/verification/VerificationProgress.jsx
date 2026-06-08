// import React from "react";
// import { X, Clock3, Lock, ShieldCheck } from "lucide-react";

// function VerificationProgress() {
//   return (
//     <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50 px-4">

//       {/* Popup */}
//       <div className="w-full h-[520px] max-w-[430px] border border-[var(--border)] bg-[var(--bg)] rounded-[28px] p-6 relative shadow-2xl ">

//         {/* Close Button */}
//         <button
//            onClick={() => window.history.back()}
//           className="absolute top-5 right-5 text-[var(--text-dim)]"
//         >
//           <X size={22} />
//         </button>

//         {/* Top Icon */}
//         <div className="flex justify-center mt-3">
//           <div className="w-[78px] h-[78px] rounded-full bg-[#3D43F5] flex items-center justify-center shadow-lg">
//             <Clock3 size={32} className="text-white" />
//           </div>
//         </div>

//         {/* Status Badge */}
//         <div className="flex justify-center mt-4">
//           <div className="px-5 py-2 rounded-full bg-[#F6E3D4] flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-[#D96A1B]"></div>

//             <span className="text-[#D96A1B] text-sm font-medium">
//               Under Review
//             </span>
//           </div>
//         </div>

//         {/* Heading */}
//         <div className="text-center mt-3">
//           <h2 className="text-[20px] font-bold text-[var(--text)]">
//             Verification in Progress
//           </h2>

//           <p className="text-[var(--text-dim)] text-[15px] leading-[24px] mt-2 px-3">
//             We’re reviewing your documents to ensure the safety of our
//             community.
//             <br />
//             This Usually takes{" "}
//             <span className="font-semibold text-[var(--text)]">
//               2-5 business days.
//             </span>
//           </p>
//         </div>

//         {/* Disabled Card */}
//         <div className="mt-7 border border-gray-200 rounded-2xl px-4 py-5 flex items-center justify-between  bg-[var(--card)]">

//           <div className="flex items-center gap-3">
//             <div className="w-10 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//               <ShieldCheck size={18} className="text-gray-500" />
//             </div>

//             <span className="text-[var(--text-dim)] font-medium text-[16px]">
//               Withdrawal Funds
//             </span>
//           </div>

//           <Lock size={16} className="text-[var(--text-dim)]" />
//         </div>

//         {/* Button */}
//         <button 
        
//         className="w-full h-[45px] rounded-2xl mt-7 text-white font-semibold bg-gradient-to-r from-[#D9A5B3] to-[#5C6CFF]">
//           Back to Dashboard
//         </button>

//         {/* Footer */}
//         <p className="text-center text-[var(--text-dim)]text-sm mt-5">
//           Need help?{" "}
//           <span className="text-[#5C6CFF] cursor-pointer font-medium">
//             Contact Support
//           </span>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default VerificationProgress;


import React from "react";
import { X, Clock3, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function VerificationProgress({ closeModal }) {

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 px-3 sm:px-4 py-4 overflow-y-auto">

      {/* Popup */}
      <div className="w-full max-w-[430px] min-h-[520px] border border-[var(--border)] bg-[var(--bg-background)] rounded-[28px] p-4 sm:p-6 relative shadow-2xl">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 text-[var(--text-dim)]"
        >
          <X size={22} />
        </button>

        {/* Top Icon */}
        <div className="flex justify-center mt-3">
          <div className="w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] rounded-full bg-[var(--bg-card)] flex items-center justify-center shadow-lg">
            <Clock3
              size={30}
              className="text-white"
            />
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center mt-4">
          <div className="px-4 sm:px-5 py-2 rounded-full bg-[var(--bg-card)]/10 border border-[var(--accent)] flex items-center gap-2">

            <div className="w-2 h-2 rounded-full bg-[#D96A1B]"></div>

            <span className="text-[#D96A1B] text-[13px] sm:text-sm font-medium">
              Under Review
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-4">
          <h2 className="text-[18px] sm:text-[20px] leading-snug font-bold text-[var(--text-dim)]">
            Verification in Progress
          </h2>

          <p className="text-[13px] sm:text-[15px] text-[var(--text-dim2)] leading-6 sm:leading-[24px] mt-3 px-1 sm:px-3">
            We’re reviewing your documents to ensure the safety of our
            community.
            <br />
            This usually takes{" "}
            <span className="font-semibold text-[var(--text-dim)]">
              2-5 business days.
            </span>
          </p>
        </div>

        {/* Disabled Card */}
        <div className="mt-7 border border-[var(--accent)] rounded-2xl px-4 py-5 flex items-center justify-between gap-3 bg-[var(--card)]">

          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-8 rounded-full bg-[var(--bg-card)]/10 flex items-center justify-center shrink-0">
              <ShieldCheck
                size={18}
                className="text-[var(--text-dim)]"
              />
            </div>

            <span className="text-[14px] sm:text-[16px] text-[var(--text-dim)] font-medium truncate">
              Withdrawal Funds
            </span>
          </div>

          <Lock
            size={16}
            className="text-[var(--text-dim)] shrink-0"
          />
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/profile")}
          className="w-full min-h-[45px] rounded-2xl mt-7 text-white font-semibold text-[15px] sm:text-[16px] bg-gradient-to-r from-[#D9A5B3] to-[#5C6CFF]"
        >
          Back to Dashboard
        </button>

        {/* Footer */}
        <p className="text-center text-[13px] sm:text-sm text-[var(--text-dim)] leading-6 mt-5">
          Need help?{" "}
          <span className="text-[#5C6CFF] cursor-pointer font-medium">
            Contact Support
          </span>
        </p>

      </div>
    </div>
  );
}

export default VerificationProgress;

