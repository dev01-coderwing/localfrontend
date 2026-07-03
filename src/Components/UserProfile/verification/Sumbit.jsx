// import React, { useState } from "react";
// import {
//   X,
//   Camera,
//   FileText,
//   Check,
//   Image as ImageIcon,
// } from "lucide-react";

// function Submit() {
//   const [documentFile, setDocumentFile] = useState(null);
//   const [selfieFile, setSelfieFile] = useState(null);

//   // Handle document upload
//   const handleDocumentUpload = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setDocumentFile({
//         file,
//         preview: URL.createObjectURL(file),
//       });
//     }
//   };

//   // Handle selfie upload
//   const handleSelfieUpload = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setSelfieFile({
//         file,
//         preview: URL.createObjectURL(file),
//       });
//     }
//   };

//   // File size formatter
//   const formatFileSize = (bytes) => {
//     if (bytes < 1024) return bytes + " B";
//     else if (bytes < 1048576)
//       return (bytes / 1024).toFixed(1) + " KB";
//     else return (bytes / 1048576).toFixed(1) + " MB";
//   };

//   return (
//     <div className="min-h-screen  flex items-center justify-center ">
//       {/* Modal */}
//       <div className="w-full  bg-white shadow-2xl border border-gray-200 px-8 py-7 relative">
//         {/* Top */}
//         <div className="flex items-start justify-between">
//           <div>
//             <h2 className="text-[23px] font-semibold text-black">
//               KYC Verification
//             </h2>
//           </div>

//           <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
//             <X size={18} />
//           </button>
//         </div>

//         {/* Progress */}
//         <div className="mt-5">
//           <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
//             <span  className="font-medium text-[16px]">Take a Selfie</span>
//             <span className="font-medium">Step 2 of 3</span>
//           </div>

//           <div className="w-full h-2 rounded-full overflow-hidden flex gap-2">
//             <div className="w-1/3 bg-[#ffb199] rounded-full"></div>
//             <div className="w-1/3 bg-[#ffb199] rounded-full"></div>
//             <div className="w-1/3 bg-[#ffb199] rounded-full"></div>
//           </div>
//         </div>

//         {/* Heading */}
//         <div className="text-center mt-8">
//           <h1 className="text-[27px] font-bold text-black">
//             Verify Your Identity
//           </h1>

//           <p className="text-gray-500 text-[15px] mt-3">
//             To keep our community safe, we need to quickly verify who you are.
//           </p>
//         </div>

//         {/* Upload Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-9">
//           {/* Document Upload */}
//           <div className="border border-gray-200 rounded-[22px] p-5 bg-white shadow-sm">
//             {/* Header */}
//             <div className="flex items-start justify-between">
//               <div className="flex gap-3">
//                 <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
//                   <FileText className="text-purple-600" size={22} />
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-[17px] text-black">
//                     Upload Government ID
//                   </h3>
//                   <p className="text-sm text-gray-400 mt-1">Passport</p>
//                 </div>
//               </div>

//               <Check className="text-green-500" size={20} />
//             </div>

//             {/* Upload Area */}
//             <label className="mt-5 border-2 border-dashed border-purple-300 rounded-[20px] h-[330px] flex items-center justify-center overflow-hidden cursor-pointer block">
//               {documentFile ? (
//                 <img
//                   src={documentFile.preview}
//                   alt="document"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="text-center">
//                   <FileText
//                     size={48}
//                     className="mx-auto text-purple-400"
//                   />
//                   <p className="mt-4 text-gray-500 font-medium ">
//                     Upload your ID
//                   </p>
//                 </div>
//               )}

//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleDocumentUpload}
//               />
//             </label>

//             {/* Bottom */}
//             <div className="flex items-center justify-between mt-4">
//               <div className="flex gap-3 items-center">
//                 <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
//                   <ImageIcon size={18} className="text-blue-600" />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">
//                     {documentFile
//                       ? documentFile.file.name
//                       : "No file selected"}
//                   </p>

//                   <p className="text-xs text-gray-400 mt-1">
//                     {documentFile
//                       ? formatFileSize(documentFile.file.size)
//                       : "0 MB"}
//                   </p>
//                 </div>
//               </div>

//               <label className="text-[#9b4dff] font-semibold cursor-pointer">
//                 {documentFile ? "Replace" : "Upload"}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleDocumentUpload}
//                 />
//               </label>
//             </div>
//           </div>

//           {/* Selfie Upload */}
//           <div className="border border-gray-200 rounded-[22px] p-5 bg-white shadow-sm">
//             {/* Header */}
//             <div className="flex items-start justify-between">
//               <div className="flex gap-3">
//                 <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
//                   <Camera className="text-purple-600" size={22} />
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-[17px] text-black">
//                     Take a Selfie
//                   </h3>
//                   <p className="text-sm text-gray-400 mt-1">
//                     A quick photo to match your ID
//                   </p>
//                 </div>
//               </div>

//               <Check className="text-green-500" size={20} />
//             </div>

//             {/* Upload Area */}
//             <label className="mt-5 border-2 border-dashed border-purple-300 rounded-[20px] h-[330px] flex items-center justify-center overflow-hidden cursor-pointer block">
//               {selfieFile ? (
//                 <img
//                   src={selfieFile.preview}
//                   alt="selfie"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="text-center">
//                   <Camera
//                     size={48}
//                     className="mx-auto text-purple-400"
//                   />
//                   <p className="mt-4 text-gray-500 font-medium">
//                     Upload your selfie
//                   </p>
//                 </div>
//               )}

//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleSelfieUpload}
//               />
//             </label>

//             {/* Bottom */}
//             <div className="flex items-center justify-between mt-4">
//               <div className="flex gap-3 items-center">
//                 <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
//                   <ImageIcon size={18} className="text-blue-600" />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">
//                     {selfieFile
//                       ? selfieFile.file.name
//                       : "No file selected"}
//                   </p>

//                   <p className="text-xs text-gray-400 mt-1">
//                     {selfieFile
//                       ? formatFileSize(selfieFile.file.size)
//                       : "0 MB"}
//                   </p>
//                 </div>
//               </div>

//               <label className="text-[#9b4dff] font-semibold cursor-pointer">
//                 {selfieFile ? "Retake" : "Upload"}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleSelfieUpload}
//                 />
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Button */}
//         <button className="w-full h-[40px] rounded-2xl bg-gradient-to-r from-[#d9a5b3] to-[#5f7cff] text-white font-semibold text-lg mt-10 hover:opacity-90 transition">
//           Submit Verification →
//         </button>

//         {/* Footer */}
//         <p className="text-center text-gray-400 text-sm mt-5">
//           By submitting, you agree to our{" "}
//           <span className="text-blue-500 cursor-pointer">
//             Terms of Service
//           </span>
//           .
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Submit;







import React, { useState } from "react";
import {
  X,
  Camera,
  FileText,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import VerificationProgress from "./VerificationProgress";

function Submit({ closeModal }) {
  const { t } = useTranslation();
  const [documentFile, setDocumentFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);

  // Progress Popup
  const [showProgress, setShowProgress] = useState(false);

  // Handle document upload
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setDocumentFile({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // Handle selfie upload
  const handleSelfieUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelfieFile({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // File size formatter
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576)
      return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <>
      {/* FULL SCREEN PAGE */}
      <div className="w-full min-h-screen bg-[var(--bg-background)] px-3 sm:px-4 py-4 overflow-y-auto">

        {/* MAIN CONTAINER */}
        <div className="w-full bg-[var(--bg-background)] shadow-2xl px-4 sm:px-6 lg:px-8 py-6 sm:py-7 relative rounded-[24px] min-h-screen">

          {/* Top */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[19px] sm:text-[23px] font-semibold text-[var(--text-dim)]">
                {t('verification.title')}
              </h2>
            </div>

            <button
              onClick={closeModal}
              className="w-10 h-10 rounded-full border border-[var(--accent)] text-[var(--text-dim)] flex items-center justify-center hover:bg-gray-100 transition shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[13px] sm:text-sm text-[var(--text-dim2)] mb-2 gap-2">
              <span className="font-medium sm:text-[16px]">
                {t('verification.take_selfie')}
              </span>

              <span className="font-medium whitespace-nowrap">
                {t('verification.step', { step: 2, total: 3 })}
              </span>
            </div>

            <div className="w-full h-2 rounded-full overflow-hidden flex gap-2">
              <div className="w-1/3 bg-[var(--bg-card)] rounded-full"></div>
              <div className="w-1/3 bg-[var(--bg-card)] rounded-full"></div>
              <div className="w-1/3 bg-[var(--bg-card)] rounded-full"></div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mt-8">
            <h1 className="text-[24px] sm:text-[27px] leading-snug font-bold text-[var(--text-dim)]">
              {t('verification.heading')}
            </h1>

            <p className="text-[13px] sm:text-[15px] text-[var(--text-dim2)] mt-3 leading-6">
              {t('verification.description')}
            </p>
          </div>

          {/* Upload Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-9">

            {/* Document Upload */}
            <div className="border border-[var(--accent)] rounded-[22px] p-4 sm:p-5 bg-[var(--bg-card)]/10 shadow-sm">

              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[var(--bg-background)] border border-[var(--accent)] flex items-center justify-center shrink-0">
                    <FileText
                      className="text-[var(--text-dim)]"
                      size={22}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[15px] sm:text-[17px] text-[var(--text-dim)]">
                      {t('verification.upload_id')}
                    </h3>

                    <p className="text-[13px] sm:text-sm text-[var(--text-dim2)] mt-1">
                      {t('verification.passport')}
                    </p>
                  </div>
                </div>

                <Check className="text-green-500 shrink-0" size={20} />
              </div>

              <label className="mt-5 border-2 border-dashed border-[var(--accent)] rounded-[20px] h-[260px] sm:h-[330px] flex items-center justify-center overflow-hidden cursor-pointer block">
                {documentFile ? (
                  <img
                    src={documentFile.preview}
                    alt="document"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center px-4">
                    <FileText
                      size={44}
                      className="mx-auto text-[var(--text-dim)]"
                    />

                    <p className="mt-4 text-[14px] sm:text-[15px] text-[var(--text-dim2)] font-medium">
                      {t('verification.upload_your_id')}
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleDocumentUpload}
                />
              </label>

              <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
                <div className="flex gap-3 items-center min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-background)] border border-[var(--accent)] flex items-center justify-center shrink-0">
                    <ImageIcon
                      size={18}
                      className="text-[var(--text-dim)]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-[var(--text-dim)] text-sm truncate">
                      {documentFile
                        ? documentFile.file.name
                        : t('verification.no_file_selected')}
                    </p>

                    <p className="text-xs text-[var(--text-dim2)] mt-1">
                      {documentFile
                        ? formatFileSize(documentFile.file.size)
                        : t('verification.size_placeholder')}
                    </p>
                  </div>
                </div>

                <label className="text-[var(--text-dim)] font-semibold cursor-pointer whitespace-nowrap">
                  {documentFile ? t('verification.replace') : t('verification.upload')}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleDocumentUpload}
                  />
                </label>
              </div>
            </div>

            {/* Selfie Upload */}
            <div className="border border-[var(--accent)] rounded-[22px] p-4 sm:p-5 bg-[var(--bg-card)]/10 shadow-sm">

              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-background)] border border-[var(--accent)] flex items-center justify-center shrink-0">
                    <Camera
                      className="text-[var(--text-dim)]"
                      size={22}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[15px] sm:text-[17px] text-[var(--text-dim)]">
                      {t('verification.take_selfie')}
                    </h3>

                    <p className="text-[13px] sm:text-sm text-[var(--text-dim2)] mt-1">
                      {t('verification.selfie_desc')}
                    </p>
                  </div>
                </div>

                <Check className="text-green-500 shrink-0" size={20} />
              </div>

              <label className="mt-5 border-2 border-dashed border-[var(--accent)] rounded-[20px] h-[260px] sm:h-[330px] flex items-center justify-center overflow-hidden cursor-pointer block">
                {selfieFile ? (
                  <img
                    src={selfieFile.preview}
                    alt="selfie"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center px-4">
                    <Camera
                      size={44}
                      className="mx-auto text-[var(--text-dim)]"
                    />

                    <p className="mt-4 text-[14px] sm:text-[15px] text-[var(--text-dim2)] font-medium">
                      {t('verification.upload_selfie')}
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSelfieUpload}
                />
              </label>

              <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
                <div className="flex gap-3 items-center min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-background)] border border-[var(--accent)] flex items-center justify-center shrink-0">
                    <ImageIcon
                      size={18}
                      className="text-[var(--text-dim)]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-[var(--text-dim)] text-sm truncate">
                      {selfieFile
                        ? selfieFile.file.name
                        : t('verification.no_file_selected')}
                    </p>

                    <p className="text-xs text-[var(--text-dim2)] mt-1">
                      {selfieFile
                        ? formatFileSize(selfieFile.file.size)
                        : t('verification.size_placeholder')}
                    </p>
                  </div>
                </div>

                <label className="text-[var(--text-dim)] font-semibold cursor-pointer whitespace-nowrap">
                  {selfieFile ? t('verification.retake') : t('verification.upload')}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleSelfieUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setShowProgress(true)}
            className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-[#d9a5b3] to-[#5f7cff] text-white font-semibold text-[15px] sm:text-lg mt-10 hover:opacity-90 transition"
          >
            {t('verification.submit')}
          </button>

          {/* Footer */}
          <p className="text-center text-[12px] sm:text-sm text-[var(--text-dim2)] mt-5 leading-6">
            {t('verification.agreement_prefix')}{" "}
            <span className="text-blue-500 cursor-pointer">
              {t('verification.terms_of_service')}
            </span>
            .
          </p>
        </div>
      </div>

      {/* PROGRESS POPUP */}
      {showProgress && (
        <VerificationProgress
          closeModal={() => setShowProgress(false)}
        />
      )}
    </>
  );
}

export default Submit;
