






import React, { useState } from "react";
import {
  X,
  IdCard,
  Upload,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Selfie from "./Selfie";

function GetVerify({ closeModal }) {

  const navigate = useNavigate();

  const [selectedDoc, setSelectedDoc] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  // ✅ SELFIE POPUP STATE
  const [showSelfie, setShowSelfie] = useState(false);

  // ================= DOCUMENT TYPES =================
  const documents = [
    {
      id: "passport",
      title: "Passport",
      desc: "International travel document",
    },
    {
      id: "national",
      title: "National ID",
      desc: "Government issued identity card",
    },
    {
      id: "license",
      title: "Driver's License",
      desc: "Valid driving permit",
    },
  ];

  // ================= DOCUMENT UPLOAD =================
  const handleDocUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
    
      <div className="w-full min-h-screen bg-[var(--bg-background)] px-4 sm:px-6 md:px-10 py-5 overflow-x-hidden">

        {/* ================= HEADER ================= */}
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-[20px] sm:text-[24px] font-bold text-[var(--text-dim)]">
              KYC Verification
            </h2>

            <p className="text-[14px] sm:text-[16px] font-medium text-[var(--text-dim2)] mt-1">
              Upload document
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-[var(--bg-card)]/10 border border-[var(--border)] text-[var(--text-dim2)] flex items-center justify-center shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= PROGRESS ================= */}
        <div className="flex gap-2 mt-6">
          <div className="h-[5px] w-1/3 rounded-full bg-[var(--bg-card)]"></div>
          <div className="h-[5px] w-1/3 rounded-full bg-[var(--bg-card)]"></div>
          <div className="h-[5px] w-1/3 rounded-full bg-[var(--bg-card)]"></div>
        </div>

        {/* ================= TITLE ================= */}
        <div className="text-center mt-8 sm:mt-9">
          <h1 className="text-[26px] sm:text-[34px] leading-snug font-bold text-[var(--text-dim)]">
            Verify Your Identity
          </h1>

          <p className="text-[14px] sm:text-[18px] text-[var(--text-dim2)] mt-3 leading-6 sm:leading-8 max-w-[800px] mx-auto">
            To keep our community safe, we need to quickly verify who you are.
          </p>
        </div>

        {/* ================= DOCUMENT TYPES ================= */}
        <div className="mt-8 sm:mt-9">
          <h3 className="text-[22px] sm:text-[25px] font-bold text-[var(--text-dim)]">
            Select Document Type
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">

            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc.id)}
                className={`
                  bg-[var(--bg-card)]/10
                  relative
                  border
                  rounded-[24px]
                  p-5
                  cursor-pointer
                  transition
                  flex flex-col justify-center items-center
                  min-h-[190px]

                  ${
                    selectedDoc === doc.id
                      ? "border-[#6F61FF] bg-[#F8F5FF]"
                      : "border-[var(--border)]"
                  }
                `}
              >
                {/* Radio */}
                <div
                  className={`
                    absolute top-5 right-5
                    w-5 h-5 rounded-full border-2
                    flex items-center justify-center

                    ${
                      selectedDoc === doc.id
                        ? "border-[#6F61FF]"
                        : "border-gray-300"
                    }
                  `}
                >
                  {selectedDoc === doc.id && (
                    <div className="w-3 h-3 rounded-full bg-[#6F61FF]"></div>
                  )}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[var(--bg-background)] border border-[var(--accent)] flex items-center justify-center">
                  <IdCard
                    className="text-[var(--text-dim)]"
                    size={24}
                  />
                </div>

                {/* Content */}
                <h4 className="text-[19px] sm:text-[22px] text-center font-semibold text-[var(--text-dim)] mt-5">
                  {doc.title}
                </h4>

                <p className="text-[13px] sm:text-[15px] text-center text-[var(--text-dim2)] mt-3 leading-6">
                  {doc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= DOCUMENT UPLOAD ================= */}
        <div className="mt-10 sm:mt-14">
          <h3 className="text-[22px] sm:text-[25px] font-bold text-[var(--text-dim)] mt-5">
            Upload Document
          </h3>

          <div className="mt-6 border-2 border-dashed border-[var(--accent)] bg-[var(--bg-card)]/10 rounded-[28px] min-h-[300px] sm:min-h-[340px] flex flex-col items-center justify-center text-center px-4 sm:px-10 relative overflow-hidden">

            <input
              type="file"
              id="docUpload"
              className="hidden"
              accept="image/*"
              onChange={handleDocUpload}
            />

            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-[260px] sm:max-h-[280px] w-full object-contain p-4"
              />
            ) : (
              <>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--bg-card)]/10 flex items-center justify-center border border-[var(--border)]">
                  <Upload
                    className="text-[var(--text-dim)]"
                    size={28}
                  />
                </div>

                <h4 className="text-[21px] sm:text-[25px] font-semibold text-[var(--text-dim)] mt-6">
                  Upload Government ID
                </h4>

                <p className="text-[14px] sm:text-[16px] text-[var(--text-dim2)] mt-4 leading-6 sm:leading-7">
                  High-quality JPG, JPEG, PNG or PDF <br />
                  formats supported
                </p>

                <label
                  htmlFor="docUpload"
                  className="mt-7 px-6 sm:px-7 py-3 border border-[var(--accent)] rounded-xl bg-[var(--bg-background)] text-[var(--text-dim)] font-medium cursor-pointer"
                >
                  Select File
                </label>
              </>
            )}
          </div>
        </div>

        {/* ================= INFO BOX ================= */}
        <div className="text-[var(--text-dim2)] mt-8 w-full border border-[var(--border)] rounded-xl min-h-[52px] flex items-center justify-center px-4 py-3">
          <p className="text-center text-[13px] sm:text-[15px] leading-6">
            Ensure the document is well-lit and all four corners are visible.
            Avoid shadows and glare for faster verification.
          </p>
        </div>

        {/* ================= CONTINUE BUTTON ================= */}
        <button
          onClick={() => setShowSelfie(true)}
          className="w-full mt-8 py-3 rounded-2xl bg-gradient-to-r from-pink-300 to-blue-500 text-white text-[15px] sm:text-[16px] font-medium"
        >
          Continue
        </button>
      </div>

      {/* ================= SELFIE POPUP ================= */}
      {showSelfie && (
        <Selfie
          closeModal={() => setShowSelfie(false)}
          nextStep={() => navigate("/submit")}
        />
      )}
    </>
  );
}

export default GetVerify;

