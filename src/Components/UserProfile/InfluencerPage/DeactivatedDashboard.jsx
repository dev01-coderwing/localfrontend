// import React from "react";
// import {
//   ArrowLeft,
//   User,
//   Copy,
//   Lock,
//   Gift,
// } from "lucide-react";

// import Navbar from "../../Navbar/Navbar";
// import Right from "../layout/Right";

// function DeactivatedDashboard() {
//   const statsData = [
//     {
//       title: "Total Referrals",
//       value: "124",
//       growth: "+18% this month",
//     },
//     {
//       title: "Active Now",
//       value: "42",
//       growth: "+3% this month",
//     },
//     {
//       title: "Total Earnings",
//       value: "€ 608",
//       growth: "+24%",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#f7f3ef]">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Layout */}
//       <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-4">

//         {/* Exact layout like screenshot */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

//           {/* LEFT CONTENT */}
//           <div className="bg-[#f5f0ea] border border-[#e8ddd4] rounded-[24px] p-4 sm:p-5">

//             {/* Header */}
//             <div className="flex items-center gap-3 mb-5">
//               <button className="h-9 w-9 rounded-full bg-white border border-[#ebe4dd] flex items-center justify-center">
//                 <ArrowLeft size={18} className="text-[#333]" />
//               </button>

//               <h1 className="text-[20px] sm:text-[24px] font-semibold text-[#222]">
//                 Setting
//               </h1>
//             </div>

//             {/* Dashboard Title */}
//             <div className="mb-4">
//               <h2 className="text-[15px] font-semibold text-[#222]">
//                 Influencer Dashboard
//               </h2>
//             </div>

//             {/* Subscription Alert */}
//             <div className="bg-red-500 rounded-[14px] p-4 text-white mb-4">
//               <p className="text-[13px] font-medium">
//                 Your subscription is inactive. Reactivate to enable your promo code.
//               </p>

//               <button className="w-full mt-3 h-[38px] rounded-full bg-white text-red-500 text-[13px] font-medium">
//                 Renew Subscription
//               </button>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
//               {statsData.map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-white border border-[#ece5de] rounded-[16px] p-4"
//                 >
//                   <div className="flex items-center gap-2 mb-3 text-black">
//                     <div className="h-6 w-6 rounded-full bg-[#eef1ff] p-1 flex items-center justify-center">
//                       <User size={15} />
//                     </div>

//                     <span className="text-[12px] text-[#888]">
//                       {item.title}
//                     </span>
//                   </div>

//                   <h3 className="text-[28px] font-semibold text-[#222]">
//                     {item.value}
//                   </h3>

//                   <p className="text-[12px] text-[#54b26b] mt-1">
//                     {item.growth}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Promo Code Section */}
//             <div className="bg-[#f8dfd9] rounded-[18px] p-4 sm:p-5 mb-5">

//               <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//                 <div>
//                   <h3 className="text-[15px] font-semibold text-[#222]">
//                     Promo Code
//                   </h3>

//                   <p className="text-[12px] text-[#8a8a8a] mt-1">
//                     Your Promo Code
//                   </p>
//                 </div>

//                 <button className="text-[12px] text-[#6a6cff] font-medium">
//                   View All
//                 </button>
//               </div>

//               {/* Promo Box */}
//               <div className="flex flex-col lg:flex-row gap-3">

//                 <div className="flex-1 h-[58px] rounded-[14px] bg-white flex items-center justify-center relative">
//                   <span className="text-[24px] font-semibold text-[#2b2b2b] line-through">
//                     YOURCODE15
//                   </span>

//                   <span className="absolute bottom-1 text-[10px] text-red-500">
//                     Taking suspended
//                   </span>
//                 </div>

//                 <button className="h-[58px] px-6 rounded-[14px] bg-[#f1cb08] text-[#222] text-[14px] font-medium flex items-center justify-center gap-2">
//                   <Copy size={16} />
//                   Copy Code
//                 </button>

//                 <button className="h-[58px] w-[58px] rounded-[14px] bg-[#e8b933] flex items-center justify-center">
//                   <Gift size={18} className="text-[#222]" />
//                 </button>
//               </div>

//               <p className="text-[11px] text-red-500 mt-3 text-center">
//                 Referrals are not being tracked currently
//               </p>

//               {/* Progress */}
//               <div className="mt-5 bg-[#f5d6cf] rounded-[16px] p-4">
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   <span className="px-3 py-1 rounded-full bg-[#dff5e4] text-[#55a56a] text-[11px]">
//                     Subscription Active
//                   </span>

//                   <span className="px-3 py-1 rounded-full bg-[#e7e4e4] text-[#777] text-[11px]">
//                     Withdrawal Locked
//                   </span>
//                 </div>

//                 <h3 className="text-[16px] font-semibold text-[#222]">
//                   Eligibility progress
//                 </h3>

//                 <p className="text-[13px] text-[#8a8a8a] mt-2">
//                   Reach milestones to unlock premium features.
//                 </p>

//                 <div className="flex items-center justify-between mt-4">
//                   <span className="text-[13px] font-medium">
//                     Active Referrals Progress
//                   </span>

//                   <span className="text-[13px] font-semibold">
//                     3/5 Needed
//                   </span>
//                 </div>

//                 <div className="h-[8px] rounded-full bg-[#f4d5cb] overflow-hidden mt-2">
//                   <div className="w-[60%] h-full bg-[#f3a58f]" />
//                 </div>
//               </div>

//               {/* Withdraw Card */}
//               <div className="mt-4 bg-white border border-[#ece5de] rounded-[14px] p-4 flex items-center gap-4">
//                 <div className="h-10 w-10 rounded-full bg-[#f7f3ef] flex items-center justify-center">
//                   <Lock size={18} className="text-[#444]" />
//                 </div>

//                 <div>
//                   <h4 className="text-[14px] font-semibold text-[#222]">
//                     Unlock Bank Withdrawals
//                   </h4>

//                   <p className="text-[12px] text-[#888] mt-1">
//                     Maintain 5 active referrals for 30 days.
//                   </p>
//                 </div>
//               </div>

//               {/* Renew Button */}
//               <button className="w-full mt-5 h-[50px] rounded-[14px] text-white font-medium bg-gradient-to-r from-pink-300 to-indigo-500">
//                 Renew Subscription
//               </button>

//               <p className="text-[11px] text-[#9a9a9a] mt-3 text-center">
//                 Reactivate now to restart your earning potential.
//               </p>
//             </div>
//           </div>

//           {/* RIGHT SIDEBAR */}
//           <div className="w-full lg:w-[320px]">
//             <div className="lg:sticky lg:top-4">
//               <Right />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DeactivatedDashboard;


// import React from "react";
// import {
//   ArrowLeft,
//   User,
//   Copy,
//   Lock,
//   Gift,
// } from "lucide-react";

// import Navbar from "../../Navbar/Navbar";
// import Right from "../layout/Right";

// function InfluencerDashboard() {
//   const statsData = [
//     {
//       title: "Total Referrals",
//       value: "124",
//       growth: "+18% this month",
//     },
//     {
//       title: "Active Now",
//       value: "42",
//       growth: "+3% this month",
//     },
//     {
//       title: "Total Earnings",
//       value: "€ 608",
//       growth: "+24%",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#f7f3ef]">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Layout */}
//       <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-4">

//         {/* Main Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

//           {/* LEFT CONTENT */}
//           <div className="bg-[#f5f0ea] border border-[#e8ddd4] rounded-[24px] p-4 sm:p-5">

//             {/* Header */}
//             <div className="flex items-center gap-3 mb-5">
//               <button className="h-9 w-9 rounded-full bg-white border border-[#ebe4dd] flex items-center justify-center">
//                 <ArrowLeft size={18} className="text-[#333]" />
//               </button>

//               <h1 className="text-[20px] sm:text-[24px] font-semibold text-[#222]">
//                 Setting
//               </h1>
//             </div>

//             {/* Dashboard Title */}
//             <div className="mb-4">
//               <h2 className="text-[15px] font-semibold text-[#222]">
//                 Influencer Dashboard
//               </h2>
//             </div>

//             {/* Subscription Alert */}
//             <div className="bg-red-500 rounded-[14px] p-4 text-white mb-5">
//               <p className="text-[13px] font-medium">
//                 Your subscription is inactive. Reactivate to enable your promo code.
//               </p>

//               <button className="w-full mt-3 h-[38px] rounded-full bg-white text-red-500 text-[13px] font-medium">
//                 Renew Subscription
//               </button>
//             </div>

//             {/* BLURRED STATS SECTION */}
//             <div className="relative mb-5">

//               {/* Blur Overlay */}
//               <div className="absolute inset-0 z-10 bg-white/20 backdrop-blur-[3px] rounded-[18px]" />

//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-60">
//                 {statsData.map((item, index) => (
//                   <div
//                     key={index}
//                     className="bg-white border border-[#ece5de] rounded-[16px] p-4"
//                   >
//                     <div className="flex items-center gap-2 mb-3 text-black">
//                       <div className="h-6 w-6 rounded-full bg-[#eef1ff] p-1 flex items-center justify-center">
//                         <User size={15} />
//                       </div>

//                       <span className="text-[12px] text-[#888]">
//                         {item.title}
//                       </span>
//                     </div>

//                     <h3 className="text-[28px] font-semibold text-[#222]">
//                       {item.value}
//                     </h3>

//                     <p className="text-[12px] text-[#54b26b] mt-1">
//                       {item.growth}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Promo Code Section */}
//             <div className="bg-[#f8dfd9] rounded-[18px] p-4 sm:p-5 mb-5">

//               <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//                 <div>
//                   <h3 className="text-[15px] font-semibold text-[#222]">
//                     Promo Code
//                   </h3>

//                   <p className="text-[12px] text-[#8a8a8a] mt-1">
//                     Your Promo Code
//                   </p>
//                 </div>

//                 <button className="text-[12px] text-[#6a6cff] font-medium">
//                   View All
//                 </button>
//               </div>

//               {/* Promo Box */}
//               <div className="flex flex-col lg:flex-row gap-3">

//                 {/* Promo Code */}
//                 <div className="flex-1 h-[58px] rounded-[14px] bg-white flex items-center justify-center relative">
//                   <span className="text-[24px] font-semibold text-[#2b2b2b] line-through">
//                     YOURCODE15
//                   </span>

//                   <span className="absolute bottom-1 text-[10px] text-red-500">
//                     Tracking suspended
//                   </span>
//                 </div>

//                 {/* Copy Button */}
//                 <button className="h-[58px] px-6 rounded-[14px] bg-[#f1cb08] text-[#222] text-[14px] font-medium flex items-center justify-center gap-2">
//                   <Copy size={16} />
//                   Copy Code
//                 </button>

//                 {/* Gift Button */}
//                 <button className="h-[58px] w-[58px] rounded-[14px] bg-[#e8b933] flex items-center justify-center">
//                   <Gift size={18} className="text-[#222]" />
//                 </button>
//               </div>

//               <p className="text-[11px] text-red-500 mt-3 text-center">
//                 Referrals are not being tracked currently
//               </p>

//               {/* Progress Section */}
//               <div className="mt-5 bg-[#f5d6cf] rounded-[16px] p-4">

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   <span className="px-3 py-1 rounded-full bg-[#dff5e4] text-[#55a56a] text-[11px]">
//                     Subscription Active
//                   </span>

//                   <span className="px-3 py-1 rounded-full bg-[#e7e4e4] text-[#777] text-[11px]">
//                     Withdrawal Locked
//                   </span>
//                 </div>

//                 <h3 className="text-[16px] font-semibold text-[#222]">
//                   Eligibility progress
//                 </h3>

//                 <p className="text-[13px] text-[#8a8a8a] mt-2">
//                   Reach milestones to unlock premium features.
//                 </p>

//                 <div className="flex items-center justify-between mt-4">
//                   <span className="text-[13px] font-medium">
//                     Active Referrals Progress
//                   </span>

//                   <span className="text-[13px] font-semibold">
//                     3/5 Needed
//                   </span>
//                 </div>

//                 <div className="h-[8px] rounded-full bg-[#f4d5cb] overflow-hidden mt-2">
//                   <div className="w-[60%] h-full bg-[#f3a58f]" />
//                 </div>
//               </div>

//               {/* Withdrawal Card */}
//               <div className="mt-4 bg-white border border-[#ece5de] rounded-[14px] p-4 flex items-center gap-4">
//                 <div className="h-10 w-10 rounded-full bg-[#f7f3ef] flex items-center justify-center">
//                   <Lock size={18} className="text-[#444]" />
//                 </div>

//                 <div>
//                   <h4 className="text-[14px] font-semibold text-[#222]">
//                     Unlock Bank Withdrawals
//                   </h4>

//                   <p className="text-[12px] text-[#888] mt-1">
//                     Maintain 5 active referrals for 30 days.
//                   </p>
//                 </div>
//               </div>

//               {/* Renew Button */}
//               <button className="w-full mt-5 h-[50px] rounded-[14px] text-white font-medium bg-gradient-to-r from-pink-300 to-indigo-500">
//                 Renew Subscription
//               </button>

//               <p className="text-[11px] text-[#9a9a9a] mt-3 text-center">
//                 Reactivate now to restart your earning potential.
//               </p>
//             </div>
//           </div>

//           {/* RIGHT SIDEBAR */}
//           <div className="w-full lg:w-[320px]">
//             <div className="lg:sticky lg:top-4">
//               <Right />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InfluencerDashboard;




import React from "react";
import {
  ArrowLeft,
  User,
  Copy,
  Lock,
  Gift,
} from "lucide-react";

import Navbar from "../../Navbar/Navbar";
import Right from "../layout/Right";

function DeactivatedDashboard() {
  const statsData = [
    {
      title: "Total Referrals",
      value: "124",
      growth: "+18% this month",
    },
    {
      title: "Active Now",
      value: "42",
      growth: "+3% this month",
    },
    {
      title: "Total Earnings",
      value: "€ 608",
      growth: "+24%",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-4 bg-[var(--bg-background)]">

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 ">

          {/* LEFT CONTENT */}
          <div className="bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-[24px] p-4 sm:p-5">

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <button className="h-9 w-9 rounded-full text-[var(--text)]  border border-[var(--accent)]  bg-[var(--bg-background)] flex items-center justify-center">
                <ArrowLeft size={18} className="text-[var(--text-dim)]" />
              </button>

              <h1 className="text-[20px] sm:text-[24px] font-semibold text-[var(--text-dim)]">
                Setting
              </h1>
            </div>

            {/* Dashboard Title */}
            <div className="mb-4">
              <h2 className="text-[15px] font-semibold text-[var(--text-dim2)]">
                Influencer Dashboard
              </h2>
            </div>

            {/* Subscription Alert */}
            <div className="bg-red-500 rounded-[14px] p-4 text-white mb-5">
              <p className="text-[13px] font-medium">
                Your subscription is inactive. Reactivate to enable your promo code.
              </p>

              <button className="w-full mt-3 h-[38px] rounded-full bg-white text-red-500 text-[13px] font-medium">
                Renew Subscription 
              </button>
            </div>

            {/* BLURRED STATS SECTION */}
            <div className="relative mb-5">
              <div className="absolute inset-0 z-10 bg-white/20 backdrop-blur-[3px] rounded-[18px]" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-60">
                {statsData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#ece5de] rounded-[16px] p-4"
                  >
                    <div className="flex items-center gap-2 mb-3 text-black">
                      <div className="h-6 w-6 rounded-full bg-[#eef1ff] p-1 flex items-center justify-center">
                        <User size={15} />
                      </div>

                      <span className="text-[12px] text-[#888]">
                        {item.title}
                      </span>
                    </div>

                    <h3 className="text-[28px] font-semibold text-[#222]">
                      {item.value}
                    </h3>

                    <p className="text-[12px] text-[#54b26b] mt-1">
                      {item.growth}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="bg-[var(--card)] rounded-[18px] p-4 sm:p-5 mb-5">

              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--text-dim)]">
                    Promo Code
                  </h3>

                  <p className="text-[12px] text-[var(--text-dim2)] mt-1">
                    Your Promo Code
                  </p>
                </div>

                <button className="text-[12px] text-[var(--text-dim)] font-medium">
                  View All
                </button>
              </div>

              {/* Promo Box */}
              <div className="flex flex-col lg:flex-row gap-3  bg-[var(--card)]/10">

                {/* Promo Code */}
                <div className="flex-1 min-h-[58px] rounded-[14px] border border-[var(--border)]  bg-[var(--bg-card)]/10 flex items-center justify-center relative px-4">
                  <span className="text-[20px] sm:text-[24px] font-semibold text-[var(--text-dim)] line-through text-center break-all">
                    YOURCODE15
                  </span>

                  <span className="absolute bottom-1 text-[10px] text-red-500">
                    Tracking suspended
                  </span>
                </div>

                {/* Copy Button */}
                <button className="h-[58px] px-6 rounded-[14px] bg-[#f1cb08] text-[#222] text-[14px] font-medium flex items-center justify-center gap-2 w-full lg:w-auto">
                  <Copy size={16} />
                  Copy Code
                </button>

                {/* Gift Button */}
                <button className="h-[58px] w-full lg:w-[58px] rounded-[14px] bg-[#e8b933] flex items-center justify-center">
                  <Gift size={18} className="text-[#222]" />
                </button>
              </div>

              <p className="text-[11px] text-red-500 mt-3 text-center">
                Referrals are not being tracked currently
              </p>

            {/* LIGHT BLURRED LOWER SECTION */}
<div className="relative mt-5">

  {/* Only blur cards section */}
  <div className="relative">

    {/* Light Blur Overlay */}
    <div className="absolute inset-0 z-10 bg-white/10 backdrop-blur-[1.5px] rounded-[16px]" />

    <div className="opacity-80 space-y-4">

      {/* Progress Section */}
      <div className="bg-[#f5d6cf] rounded-[16px] p-4">

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#dff5e4] text-[#55a56a] text-[11px] whitespace-nowrap">
            Subscription Active
          </span>

          <span className="px-3 py-1 rounded-full bg-[#e7e4e4] text-[#777] text-[11px] whitespace-nowrap">
            Withdrawal Locked
          </span>
        </div>

        <h3 className="text-[16px] font-semibold text-[#222]">
          Eligibility progress
        </h3>

        <p className="text-[13px] text-[#8a8a8a] mt-2">
          Reach milestones to unlock premium features.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-4">
          <span className="text-[13px] font-medium">
            Active Referrals Progress
          </span>

          <span className="text-[13px] font-semibold">
            3/5 Needed
          </span>
        </div>

        <div className="h-[8px] rounded-full bg-[#f4d5cb] overflow-hidden mt-2">
          <div className="w-[60%] h-full bg-[#f3a58f]" />
        </div>
      </div>

      {/* Withdrawal Card */}
      <div className="bg-white border border-[#ece5de] rounded-[14px] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-[#f7f3ef] flex items-center justify-center shrink-0">
          <Lock size={18} className="text-[#444]" />
        </div>

        <div className="min-w-0">
          <h4 className="text-[14px] font-semibold text-[#222]">
            Unlock Bank Withdrawals
          </h4>

          <p className="text-[12px] text-[#888] mt-1">
            Maintain 5 active referrals for 30 days.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* KEEP BUTTON CLEAR */}
  <button className="w-full mt-4 h-[50px] rounded-[14px] text-white font-medium bg-gradient-to-r from-pink-300 to-indigo-500">
    Renew Subscription
  </button>

  <p className="text-[11px] text-[var(--text-dim2)] text-center mt-3">
    Reactivate now to restart your earning potential.
  </p>
</div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-[320px]">
            <div className="lg:sticky lg:top-4">
              <Right />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeactivatedDashboard;