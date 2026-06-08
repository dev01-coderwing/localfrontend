// import Navbar from "../Navbar/Navbar";
// import Left from "./Left";
// import Right from "./Right";
// import Middle from "./Middle";
// import { Outlet } from "react-router-dom";

// export default function ProfileLayout() {
//   // ✅ DUMMY API DATA (replace later with real API)
//   const rightSidebarData = {
//     influencer: {
//       title: "Become an Influencer",
//       desc: "Earn rewards for sharing",
//       img: "/Image/Star2.png",
//     },

//     sections: [
//       {
//         title: "ACCOUNT",
//         items: [
//           { name: "Edit Profile", icon: "user", route: "edit-profile" },
//           { name: "Subscription", icon: "card", route: "subscription" },
//           { name: "Get Verified", icon: "shield", route: "verify" },
//           { name: "Language", icon: "globe", route: "language" },
//           { name: "Settings", icon: "settings", route: "settings" },
//         ],
//       },
//       {
//         title: "PREFERENCES",
//         items: [
//           { name: "Privacy & Security", icon: "lock", route: "privacy" },
//           { name: "Display Mode", icon: "sun", route: "display" },
//           { name: "Notifications", icon: "bell", route: "notifications" },
//           { name: "Apply Promo Code", icon: "gift", route: "promo" },
//         ],
//       },
//     ],
//   };
//   const getImageByType = (type) => {
//     switch (type) {
//       case "MBTI":
//         return "/Image/Brain2.png";

//       case "Love Languages":
//         return "/Image/heart2.png";

//       case "Attachment Style":
//         return "/Image/pin.png";

//       case "Big Five (OCEAN)":
//         return "/Image/star.png";

//       default:
//         return "/Image/default.png";
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       <div className="min-h-screen bg-[#f6f1eb] p-6">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-3xl p-5 shadow-inner">
//           {/* ✅ PASS DATA */}

//           {/* ✅ DYNAMIC CONTENT */}
//           <div className="lg:col-span-2">
//             <Outlet />
//           </div>
//           <Right data={rightSidebarData} />
//         </div>
//       </div>
//     </div>
//   );
// }

// import Navbar from "../../Navbar/Navbar";
// import Left from "../ProfileHome/Left";
// import Right from "../Right";
// import Middle from "../ProfileHome/Middle";
// import { Outlet } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";
// export default function ProfileLayout() {
//   // ✅ DUMMY API DATA (replace later with real API)
//   const rightSidebarData = {
//     influencer: {
//       title: "Become an Influencer",
//       desc: "Earn rewards for sharing",
//       img: "/Image/Star2.png",
//     },

//     sections: [
//       {
//         title: "ACCOUNT",
//         items: [
//           { name: "Edit Profile", icon: "user", route: "edit-profile" },
//           { name: "Subscription", icon: "card", route: "subscription" },
//           { name: "Get Verified", icon: "shield", route: "verify" },
//           { name: "Language", icon: "globe", route: "language" },
//           { name: "Settings", icon: "settings", route: "settings" },
//         ],
//       },
//       {
//         title: "PREFERENCES",
//         items: [
//           { name: "Privacy & Security", icon: "lock", route: "privacy" },
//           { name: "Display Mode", icon: "sun", route: "display" },
//           { name: "Notifications", icon: "bell", route: "notifications" },
//           { name: "Apply Promo Code", icon: "gift", route: "promo" },
//         ],
//       },
//     ],
//   };
//   const getImageByType = (type) => {
//     switch (type) {
//       case "MBTI":
//         return "/Image/Brain2.png";

//       case "Love Languages":
//         return "/Image/heart2.png";

//       case "Attachment Style":
//         return "/Image/pin.png";

//       case "Big Five (OCEAN)":
//         return "/Image/star.png";

//       default:
//         return "/Image/default.png";
//     }
//   };
//   // 🔥 THIS WILL BE REPLACED WITH API LATER
//   const getProfileData = () => {
//     return {
//       images: [
//         {
//           id: 1,
//           url: "https://i.pravatar.cc/300",
//           isMain: true,
//         },
//       ],

//       bio: "",

//       interests: ["Art", "Travel", "Music", "Fitness", "Cooking", "Reading"],
//     };
//   };

//   const profileData = getProfileData();

//   return (
//     <div>
//       <Navbar />

//       <div className="min-h-screen bg-[#f6f1eb] p-6">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-3xl p-5 shadow-inner">
//           {/* ✅ PASS DATA */}

//           {/* ✅ DYNAMIC CONTENT */}
//           <div className="lg:col-span-2">
//             <Outlet context={profileData} />
//           </div>
//           <Right data={rightSidebarData} />
//         </div>
//       </div>
//     </div>
//   );
// }

import Navbar from "../../Navbar/Navbar";
import Right from "./Right";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  //  MAIN DATA (SINGLE SOURCE OF TRUTH)
  const profileData = {
    profile: {
      name: "Neetesh Lodhi",
      avatar: "https://i.pravatar.cc/100",
      verified: true,
      badge: "/Image/Badge.png",
      tick: "/Image/tick.png",

      stats: [
        { value: "87%", label: "Avg Match" },
        { value: 12, label: "Matches" },
        { value: 5, label: "In Lab’s" },
      ],

      compatibility: [
        {
          title: "MBTI",
          desc: "ENFP - The Campaigner",
          status: "done",
          img: "/Image/Brain2.png",
        },
        {
          title: "Love Languages",
          desc: "Quality Time",
          status: "done",
          img: "/Image/heart2.png",
        },
        {
          title: "Attachment Style",
          desc: "Secure",
          status: "done",
          img: "/Image/pin.png",
        },
        {
          title: "Big Five (OCEAN)",
          desc: "Not completed",
          status: "pending",
          img: "/Image/star.png",
        },
      ],
      interests: ["Art", "Travel", "Music", "Fitness", "Cooking", "Reading"],
      bio: "",
      images: [
        {
          id: 1,
          url: "https://i.pravatar.cc/300",
          isMain: true,
        },
        { id: 2, url: "", isMain: false },
        { id: 3, url: "", isMain: false },
        { id: 4, url: "", isMain: false },
        { id: 5, url: "", isMain: false },
      ],
    },

    middle: {
      balance: {
        amount: "€ 18.96",
        label: "Available Balance",
        img: "/Image/Balance.png",
      },

      usage: {
        title: "Time Usage",
        usedPercent: 40,
        usedTime: "2h 30m",
        totalTime: "6h 00m",
        remaining: "3h remaining",
      },

      buttons: [
        { label: "Manage Subscription", icon: "crown", style: "gradient" },
        { label: "Invite Friends", icon: "gift", style: "dark" },
      ],
    },
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-[var(--bg-background)] p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 🔥 LEFT + MIDDLE (DYNAMIC via Outlet) */}
          <div className="lg:col-span-2  bg-red-100">
            <Outlet context={profileData} />
          </div>

          {/* 🔥 RIGHT SIDEBAR (FIXED) */}
          <Right />
        </div>
      </div>
    </div>
  );
}
