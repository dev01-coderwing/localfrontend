




// import React, { useState } from "react";
// import {
//   ArrowLeft,
//   BadgeCheck,
//   ShieldCheck,
//   CircleDollarSign,
//   Users,
//   UserCheck,
//   TrendingUp,
//   Wallet,
// } from "lucide-react";

// import Navbar from "../../Navbar/Navbar";
// import Right from "../layout/Right";
// import RegistrationPopup from "./RegistrationPopup";

// const Introduction = () => {
//   const [showPopup, setShowPopup] = useState(false);

//   const commissionData = [
//     { name: "Degustation", value: "18%" },
//     { name: "Privilege", value: "12%" },
//     { name: "Circle Privé", value: "10%" },
//     { name: "Luxescape Guide", value: "10%" },
//     { name: "Luxescape Infinity", value: "16%" },
//     { name: "Le Digest", value: "10%" },
//     { name: "Sovous Orient", value: "10%" },
//   ];

//   const eligibilityData = [
//     {
//       icon: Users,
//       title: "5 Active Referrals",
//       desc: "Minimum monthly requirement to trigger recurring payouts.",
//     },
//     {
//       icon: UserCheck,
//       title: "Active Subscription",
//       desc: "Influencers must maintain their own premium account.",
//     },
//     {
//       icon: TrendingUp,
//       title: "10% Annual Growth Cap",
//       desc: "Annual retention cap for your based annual retention.",
//     },
//     {
//       icon: Wallet,
//       title: "€30 Minimum Withdrawal",
//       desc: "Commissions are paid once your balance reaches €30.",
//     },
//   ];

//   const openPopup = () => {
//     setShowPopup(true);
//   };

//   return (
//     <div className="min-h-screen bg-[var(--bg-background)]">
//       <Navbar />

//       <div className="w-full px-3 md:px-5 lg:px-7 py-5">

//         {/* FIXED GRID HEIGHT ALIGNMENT */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_320px] items-stretch gap-4">

//           {/* LEFT */}
//           <div className="bg-[var(--bg-card)]/10 rounded-[22px] p-4 md:p-5 border border-[var(--border)] h-full">

//             <div className="flex items-center gap-3 mb-5 flex-wrap">
//               <button className="text-[var(--text-dim)] w-8 h-8 rounded-full bg-[var(--bg-card)]/10 flex items-center justify-center border border-[var(--border)] shrink-0">
//                 <ArrowLeft size={18} />
//               </button>

//               <h1 className="text-[20px] sm:text-[24px] font-semibold text-[var(--text-dim)]">
//                 Setting
//               </h1>
//             </div>

//             <div className="mb-5">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
//                 <h2 className="text-[15px] font-semibold text-[var(--text-dim2)]">
//                   Influencer Program
//                 </h2>

//                 <button
//                   onClick={openPopup}
//                   className="px-4 py-2 rounded-full text-white text-xs font-medium bg-gradient-to-r from-pink-300 to-indigo-500 w-full sm:w-auto"
//                 >
//                   Register as Influencer
//                 </button>
//               </div>

//               <div className="relative overflow-hidden rounded-[18px] h-[220px] md:h-[250px]">
//                 <img
//                   src="/Image/galaxy.png"
//                   alt=""
//                   className="w-full h-full object-cover"
//                 />

//                 <div className="absolute inset-0 bg-black/35" />

//                 <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white z-10">
//                   <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-semibold leading-tight">
//                     Become an
//                     <br />
//                     Influencer
//                   </h2>

//                   <p className="text-xs sm:text-sm mt-3 text-white/80 max-w-[300px]">
//                     Join our elite circle of creators and grow your passive income stream.
//                   </p>
//                 </div>

//                 <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 space-y-3 z-10 hidden sm:block">
//                   <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 w-[170px]">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
//                         <BadgeCheck size={20} className="text-white" />
//                       </div>
//                       <div>
//                         <h4 className="text-white text-sm font-semibold">
//                           Get Approved
//                         </h4>
//                         <p className="text-white/70 text-xs">
//                           Quick review process
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 w-[170px]">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
//                         <ShieldCheck size={20} className="text-white" />
//                       </div>
//                       <div>
//                         <h4 className="text-white text-sm font-semibold">
//                           Create Promo
//                         </h4>
//                         <p className="text-white/70 text-xs">
//                           Your custom code
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-[var(--bg-background)] rounded-[18px] border border-[var(--border)] p-4">

//               <div className="flex items-center justify-between mb-5">
//                 <div>
//                   <p className="text-[11px] text-[var(--text-dim2)]">
//                     Global Policy
//                   </p>
//                   <h3 className="text-[16px] font-semibold text-[var(--text-dim)]">
//                     Fixed Discount
//                   </h3>
//                 </div>

//                 <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
//                   <CircleDollarSign size={14} className="text-pink-500" />
//                 </div>
//               </div>

//               <div className="rounded-[14px] overflow-x-auto border border-[var(--border)] mb-6 bg-[var(--bg-card)]/10">
//                 <div className="min-w-[500px]">
//                   <div className="grid grid-cols-2  px-4 py-3 text-[13px] font-semibold text-[var(--text-dim)]">
//                     <p>Commission Structure</p>
//                     <p className="text-right">Commission</p>
//                   </div>

//                   {commissionData.map((item, index) => (
//                     <div
//                       key={index}
//                       className="grid grid-cols-2 px-4 py-3 border-t border-[var(--border)] text-[13px] text-[var(--text-dim2)]"
//                     >
//                       <p>{item.name}</p>
//                       <p className="text-right font-medium">{item.value}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {eligibilityData.map((item, index) => {
//                   const Icon = item.icon;

//                   return (
//                     <div
//                       key={index}
//                       className="bg-[var(--bg-card)]/10 rounded-[18px] p-4 border border-[var(--border)] flex flex-col items-center text-center"
//                     >
//                       <Icon size={18} className="mb-3 text-[var(--text-dim)]" />
//                       <h4 className="text-[14px] font-semibold text-[var(--text-dim)]">
//                         {item.title}
//                       </h4>
//                       <p className="text-[12px] text-[var(--text-dim2)] mt-2 leading-relaxed">
//                         {item.desc}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>

//               <button
//                 onClick={openPopup}
//                 className="w-full mt-6 h-[52px] rounded-[14px] text-white font-medium bg-gradient-to-r from-pink-300 to-indigo-500"
//               >
//                 Register as Influencer →
//               </button>
//             </div>
//           </div>

//           {/* FIXED SIDEBAR ISSUE */}
//           <aside className="lg:col-span-1 sticky top-5 h-fit w-full max-w-[320px] ml-0 lg:ml-4">
//             <Right />
//           </aside>

//         </div>
//       </div>

//       {showPopup && (
//         <RegistrationPopup closePopup={() => setShowPopup(false)} />
//       )}
//     </div>
//   );
// };

// export default Introduction;










import React, { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  ShieldCheck,
  CircleDollarSign,
  Users,
  UserCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";

import Navbar from "../../Navbar/Navbar";
import Right from "../layout/Right";
import RegistrationPopup from "./RegistrationPopup";

const Introduction = () => {
  const [showPopup, setShowPopup] = useState(false);

  const commissionData = [
    { name: "Degustation", value: "18%" },
    { name: "Privilege", value: "12%" },
    { name: "Circle Privé", value: "10%" },
    { name: "Luxescape Guide", value: "10%" },
    { name: "Luxescape Infinity", value: "16%" },
    { name: "Le Digest", value: "10%" },
    { name: "Sovous Orient", value: "10%" },
  ];

  const eligibilityData = [
    {
      icon: Users,
      title: "5 Active Referrals",
      desc: "Minimum monthly requirement to trigger recurring payouts.",
    },
    {
      icon: UserCheck,
      title: "Active Subscription",
      desc: "Influencers must maintain their own premium account.",
    },
    {
      icon: TrendingUp,
      title: "10% Annual Growth Cap",
      desc: "Annual retention cap for your based annual retention.",
    },
    {
      icon: Wallet,
      title: "€30 Minimum Withdrawal",
      desc: "Commissions are paid once your balance reaches €30.",
    },
  ];

  const openPopup = () => {
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-background)] relative">
      <Navbar />

      <div className="w-full px-3 md:px-5 lg:px-7 py-5">

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_320px] items-stretch gap-4">
      

          {/* LEFT */}
          <div className="bg-[var(--bg-card)]/10 rounded-[22px] p-4 md:p-5 border border-[var(--border)] h-full">

            {/* Header */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <button className="text-[var(--text-dim)] w-8 h-8 rounded-full bg-[var(--bg-card)]/10 flex items-center justify-center border border-[var(--border)] shrink-0">
                <ArrowLeft size={18} />
              </button>

              <h1 className="text-[20px] sm:text-[24px] font-semibold text-[var(--text-dim)]">
                Setting
              </h1>
            </div>

            {/* Hero Section */}
            <div className="mb-5">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                <h2 className="text-[15px] font-semibold text-[var(--text-dim2)]">
                  Influencer Program
                </h2>

                <button
                  onClick={openPopup}
                  className="px-4 py-2 rounded-full text-white text-xs font-medium bg-gradient-to-r from-pink-300 to-indigo-500 w-full sm:w-auto"
                >
                  Register as Influencer
                </button>
              </div>

              {/*Banner*/}
              <div className="relative overflow-hidden rounded-[18px] h-[220px] md:h-[250px]">

                <img
                  src="/Image/galaxy.png"
                  alt=""
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/35" />

                {/* Left Content */}
                <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white">

                  <h2 className="text-[22px] sm:text-[28px] md:text-[34px] font-semibold leading-tight">
                    Become an
                    <br />
                    Influencer
                  </h2>

                  <p className="text-xs sm:text-sm mt-3 text-white/80 max-w-[300px]">
                    Join our elite circle of creators and grow your passive
                    income stream.
                  </p>
                </div>

                {/* Floating Cards */}
                <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 space-y-3 hidden sm:block">
                 <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 w-[170px]">
                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                        <BadgeCheck size={20} className="text-white" />
                      </div>

                      <div>
                        <h4 className="text-white text-sm font-semibold">
                          Get Approved
                        </h4>


                        <p className="text-white/70 text-xs">
                          Quick review process
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 w-[170px]">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                        <ShieldCheck size={20} className="text-white" />
                      </div>

                      <div>
                        <h4 className="text-white text-sm font-semibold">
                          Create Promo
                        </h4>

                        <p className="text-white/70 text-xs">
                          Your custom code
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Section */}
            <div className="bg-[var(--bg-background)] rounded-[18px] border border-[var(--border)] p-4">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <p className="text-[11px] text-[var(--text-dim2)]">
                    Global Policy
                  </p>

                  <h3 className="text-[16px] font-semibold text-[var(--text-dim)]">
                    Fixed Discount
                  </h3>
                </div>

                <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
                  <CircleDollarSign size={14} className="text-pink-500" />
                </div>
              </div>

              {/* Table */}
              <div className="rounded-[14px] overflow-x-auto border border-[var(--border)] mb-6 bg-[var(--bg-card)]/10">

                <div className="min-w-[500px]">

                  <div className="grid grid-cols-2 px-4 py-3 text-[13px] font-semibold text-[var(--text-dim)]">
                    <p>Commission Structure</p>
                    <p className="text-right">Commission</p>
                  </div>

                  {commissionData.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 px-4 py-3 border-t border-[var(--border)] text-[13px] text-[var(--text-dim2)]"
                    >
                      <p>{item.name}</p>

                      <p className="text-right font-medium">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {eligibilityData.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="bg-[var(--bg-card)]/10 rounded-[18px] p-4 border border-[var(--border)] flex flex-col items-center text-center"
                    >
                      <Icon
                        size={18}
                        className="mb-3 text-[var(--text-dim)]"
                      />

                      <h4 className="text-[14px] font-semibold text-[var(--text-dim)]">
                        {item.title}
                      </h4>

                      <p className="text-[12px] text-[var(--text-dim2)] mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Button */}
              <button
                onClick={openPopup}
                className="w-full mt-6 h-[52px] rounded-[14px] text-white font-medium bg-gradient-to-r from-pink-300 to-indigo-500"
              >
                Register as Influencer →
              </button>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-1 sticky top-5 z-0 h-fit w-full max-w-[320px] ml-0 lg:ml-4">
            <Right />
          </aside>
        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <RegistrationPopup
          closePopup={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Introduction;