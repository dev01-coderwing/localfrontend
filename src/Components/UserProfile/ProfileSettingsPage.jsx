import React from "react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Right from "./layout/Right";
import { Check, X ,ArrowLeft,Clock,HatGlasses  } from "lucide-react";
// import incognito from "/Image/incognito.png";

const ProfileSettingsPage = () => {

     const [showModal, setShowModal] = useState(false);
     const [mode, setMode] = useState("expired"); 
// "select" | "active" | "expired"
const [toast, setToast] = useState(null);

const [selectedPlan, setSelectedPlan] = useState(0);
  return (
    <div className="min-h-screen bg-[var(--bg-background)]">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
      <div className="lg:col-span-2">

  {/* OUTER BACKGROUND */}
  <div className="rounded-[20px] p-8 ">

    {/* HEADER */}
    <div className="flex items-center gap-4 mb-6">
  <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition">
    <ArrowLeft size={18} className="text-gray-700" />
  </button>

  <h2 className="text-2xl font-semibold text-[var(--text-dim)]">
    Setting
  </h2>
</div>
<div className="bg-[var(--bg-background)] p-5 rounded-[32px]">

    {/* 🔥 NEW SECTION WRAPPER */}

      {/* SECTION TITLE */}
      <h3 className="text-[var(--text-dim2)] font-semibold mb-4">
        Invisible Mode
      </h3>

      {/* MAIN CARD */}
  <div className="bg-[var(--bg-card)]/10 rounded-[32px] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
        {/* ICON + TITLE */}
       <div className="text-center mb-6">

  {/* ICON */}
  <div className="flex justify-center mb-4">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
      <HatGlasses size={34} className="text-gray-800" />
    </div>
  </div>

  {/* TITLE */}
  <h3 className="text-xl font-semibold text-[var(--text-dim2)]">
    Go Incognito
  </h3>

  {/* SUBTEXT */}
  <p className="text-[var(--text-dim2)] text-sm mt-2">
    Browse profiles completely anonymously
  </p>

</div>

        {/* INFO BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* LEFT BOX */}
          <div className="bg-[var(--bg-background)] rounded-2xl p-5 shadow-sm">
            <h4 className="font-semibold text-[var(--text-dim)] mb-4">
              What you can do
            </h4>

            <div className="space-y-3 text-sm text-[var(--text-dim2)]">
              {[
                "View profiles",
                "Like profiles",
                "Add to favorites",
                "Send roses",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center rounded-md bg-green-500 text-white">
                    <Check size={14} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT BOX */}
          <div className="bg-[var(--bg-background)] rounded-2xl p-5 shadow-sm">
            <h4 className="font-semibold text-[var(--text-dim2)] mb-4">
              What others cannot see
            </h4>

            <div className="space-y-3 text-sm text-[var(--text-dim2)]">
              {[
                "You won’t appear in ‘Who Viewed You’",
                "Last seen hidden",
                "Online status hidden",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center rounded-md bg-red-500 text-white">
                    <X size={14} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* BUTTON */}
        <button  onClick={() => setShowModal(true)} className="mt-8 w-full py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-[#D79098] to-[#5F7BF4]">
          Active Invisible Mode
        </button>

      </div>
              </div>
    

  </div>
</div>

        {/* RIGHT SIDEBAR */}
        <div>
          <Right />
        </div>

      </div>

      {showModal && (
 <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">

<div className="
  bg-[var(--bg-background)]
   text-[var(--text)] 
  w-[480px] 
  min-h-[537px] 
  max-w-[95%]
  rounded-[20px] 
  px-[43px] py-[24px] 
  border border-gray-200 
  shadow-[0px_20px_60px_rgba(0,0,0,0.1)] 
 flex flex-col justify-between
  relative
   
">

      {/* CLOSE */}
     <button
  onClick={() => setShowModal(false)}
  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
>
  <X size={18} className="text-gray-600" />
</button>

      {mode === "select" && (
<div className="flex flex-col h-full justify-between  ">
    {/* ICON */}
     <div className="flex justify-center mb-4">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
      <HatGlasses size={34} className="text-gray-800" />
    </div>
  </div>

    <h2 className="text-center text-lg font-semibold text-[var(--text-dim2)]">
      Unlock Invisible Mode
    </h2>

    <p className="text-center text-sm text-[var(--text-dim2)] mb-6">
      Go invisible and browse profiles privately
    </p>

    {/* OPTIONS */}
    <div className="space-y-4 ">
     {[
  { label: "24 Hours", price: "99 Meons" },
  { label: "7 Days", price: "599 Meons" },
  { label: "30 Days", price: "1,999 Meons" },
].map((item, i) => (
  <div
    key={i}
    onClick={() => setSelectedPlan(i)}
    className={`flex items-center justify-between p-4 rounded-xl border-[1px] cursor-pointer transition text-[var(--text-dim2)] ${
      selectedPlan === i
        ? "border-[#FFB4A0] "
        : "border-gray-200"
    }`}
  >
    {/* LEFT */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-[10px] bg-[rgba(84,112,255,0.2)] flex items-center justify-center">
        <Clock size={22} className="text-[#5470FF]" />
      </div>

      <div>
        <p className="font-semibold text-[var(--text-dim)]">
          {item.label}
        </p>
        <p className="text-sm text-[var(--text-dim2)]">
          {item.price}
        </p>
      </div>
    </div>

    {/* RADIO */}
    <div
      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
        selectedPlan === i
          ? "border-orange-400"
          : "border-gray-300"
      }`}
    >
      {selectedPlan === i && (
        <div className="w-2.5 h-2.5 bg-orange-400 rounded-full"></div>
      )}
    </div>
  </div>
))}
    </div>

    <button
      onClick={() => setMode("active")}
      className="mt-6 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-400 to-blue-500"
    >
      Activate Now
    </button>

    <p className="text-center text-sm text-gray-400 mt-4">
      View Meons balance
    </p>
 </div>
)}


{mode === "active" && (
  <>
    {/* ICON */}
    <div className="flex justify-center mb-4">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
      <HatGlasses size={34} className="text-gray-800" />
    </div>
  </div>

    {/* TITLE */}
    <h2 className="text-center text-2xl font-semibold text-[var(--text-dim)]">
      Invisible Mode Activated
    </h2>

    <p className="text-center text-[var(--text-dim2)]">
      You are now browsing anonymously
    </p>

    {/* GREEN BADGE */}
    <div className="flex justify-center mt-6">
      <div className="bg-green-100 text-green-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        Active until 28 Feb, 10:45 PM
      </div>
    </div>

    {/* BUTTON */}
    <div className="mt-10">
      <button
        onClick={() => setShowModal(false)}
        className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
      >
        Continue Browsing
      </button>

      <p className="text-center text-[var(--text-dim2)] mt-4">
        Manage Plan
      </p>
    </div>
     </>
)}
    {mode === "expired" && (
  <>
    {/* ICON */}
     <div className="flex justify-center mb-4">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
      <HatGlasses size={34} className="text-gray-800" />
    </div>
  </div>

    {/* TITLE */}
    <h2 className="text-center text-2xl font-semibold text-[var(--text-dim)]">
      Invisible Mode Expired
    </h2>

    {/* SUBTEXT */}
    <p className="text-center text-[var(--text-dim2)] mt-2">
      You are now visible to others.
    </p>

    {/* BADGE (same style as active) */}
    <div className="flex justify-center mt-6">
      <div className="bg-green-100 text-green-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        Active until 28 Feb, 10:45 PM
      </div>
    </div>

    {/* BUTTON */}
    <div className="mt-10">
<button
  onClick={() => {
    const hasEnoughCoins = false;

    if (!hasEnoughCoins) {
      setToast({ type: "warning" });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setMode("select");
    setShowModal(true);
  }}
  className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
>
  Activate Again
</button>

      <p className="text-center text-[var(--text-dim2)] mt-4">
        Continue Normally
      </p>
    </div>
 
  </>


  
)}

    </div>
  </div>
)}
{toast && (
  <div className="fixed bottom-6 right-6 z-[999]">

    {/* ERROR TOAST */}
    {toast.type === "error" && (
      <div className="flex items-center justify-between gap-4 bg-white px-5 py-3 rounded-xl shadow-lg min-w-[300px]">

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>

          <p className="text-sm text-gray-800">
            Not enough Meons. Please top up.
          </p>
        </div>

        <button className="px-3 py-1 text-sm border border-purple-400 text-purple-500 rounded-full">
          Top Up
        </button>
      </div>
    )}

    {/* WARNING TOAST */}
    {toast.type === "warning" && (
      <div className="bg-white p-4 rounded-xl shadow-lg w-[320px]">

        <div className="flex items-start gap-3">
          
          {/* ICON */}
          <div className="w-10 h-10 rounded-lg bg-[#EEF1FF] flex items-center justify-center">
            <Clock className="text-[#5470FF]" size={18} />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-gray-800">
              Invisible Mode ending
            </p>

            <p className="text-sm text-gray-500">
              Ending in <span className="text-red-500 font-medium">5 Minutes</span>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button className="text-gray-400">Dismiss</button>

          <button className="px-4 py-1 rounded-md text-white bg-gradient-to-r from-[#D79098] to-[#5F7BF4]">
            Extend
          </button>
        </div>
      </div>
    )}

  </div>
)}
    </div>
  );
};

export default ProfileSettingsPage;
