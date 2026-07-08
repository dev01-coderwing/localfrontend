
// import {
//   User,
//   CreditCard,
//   Shield,
//   Globe,
//   Lock,
//   Sun,
//   Bell,
//   Gift,
//   Settings,
// } from "lucide-react";
// import { FiChevronRight } from "react-icons/fi";
// import { Link } from "react-router-dom";

// // ✅ ICON MAP
// const iconMap = {
//   user: User,
//   card: CreditCard,
//   shield: Shield,
//   globe: Globe,
//   lock: Lock,
//   sun: Sun,
//   bell: Bell,
//   gift: Gift,
//   settings: Settings,
// };

// function Right() {
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

//           // ✅ FIXED ICON BUG
//           { name: "Notifications", icon: "bell", route: "notifications" },

//           { name: "Apply Promo Code", icon: "gift", route: "promo" },
//         ],
//       },
//     ],
//   };

//   return (
//     // ✅ MAIN SCROLL CONTAINER (FIXED)
//     <div className="space-y-4 w-full h-[calc(100vh-100px)] overflow-y-auto pr-1 sticky top-[100px]">

//       {/* 🔥 Influencer Card */}
//       <div className="flex items-center justify-between rounded-2xl px-5 py-4 bg-gradient-to-t from-[#7133A8] to-[#E4678C] to-[#FC9A86] cursor-pointer">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
//             <img
//               src={rightSidebarData.influencer.img}
//               alt="influencer"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div>
//             <p className="text-sm font-semibold text-gray-800">
//               {rightSidebarData.influencer.title}
//             </p>
//             <p className="text-xs text-gray-500">
//               {rightSidebarData.influencer.desc}
//             </p>
//           </div>
//         </div>

//         <FiChevronRight className="text-gray-400" />
//       </div>

//       {/* 🔥 Sections */}
//       {rightSidebarData.sections.map((section, index) => (
//         <div
//           key={index}
//           className="bg-[var(--card)] rounded-3xl p-4 flex flex-col"
//         >
//           <h3 className="text-sm font-semibold text-[var(--text)] mb-3 ml-1">
//             {section.title}
//           </h3>

//           {/* ✅ NO INNER SCROLL */}
//           <div className="space-y-2">
//             {section.items.map((item, i) => {
//               const Icon = iconMap[item.icon];

//               return (
//                 <Link
//                   key={i}
//                   to={`/profile/${item.route}`}
//                   className="flex items-center justify-between bg-white px-4 py-3 rounded-xl hover:shadow-sm transition"
//                 >
//                   <div className="flex items-center gap-3 text-sm font-medium">
//                     {Icon && <Icon size={16} className="text-gray-700" />}
//                     <span className="text-gray-700">{item.name}</span>
//                   </div>

//                   <FiChevronRight className="text-gray-400" />
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Right;

import {
  User,
  CreditCard,
  Shield,
  Globe,
  Lock,
  Sun,
  Bell,
  Gift,
  Settings,
} from "lucide-react";

import { FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";
// Verification Component
import VerifyModal from "../verification/VerifyModal";
import { useTheme } from "../../../ThemeContext";
import { useTranslation } from "react-i18next";
import star2 from "/Image/Black-star.png"
import { useNavigate } from "react-router-dom";




const iconMap = {
  user: User,
  card: CreditCard,
  shield: Shield,
  globe: Globe,
  lock: Lock,
  sun: Sun,
  bell: Bell,
  gift: Gift,
  settings: Settings,
};

function Right() {
  const { t } = useTranslation();
  const [verifyStep, setVerifyStep] = useState(0);
  const [invisibleMode, setInvisibleMode] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const { theme, setTheme } = useTheme();
const navigate = useNavigate();
  const rightSidebarData = {
    influencer: {
      title: t('profileSidebar.become_influencer'),
      desc: t('profileSidebar.earn_rewards_desc'),
      img: star2,
    },

    sections: [
      {
        key: "account",
        title: t('profileSidebar.account'),
        items: [
          { name: t('profileSidebar.edit_profile'), icon: "user", route: "/edit-profile" },
          { name: t('profileSidebar.subscription'), icon: "card", route: "/subscription" },
          { name: t('profileSidebar.get_verified'), icon: "shield", route: "/verify" },
          { name: t('profileSidebar.language'), icon: "globe", route: "/languagePage" },
          { name: t('profileSidebar.settings'), icon: "settings", route: "/settings" },
        ],
      },
      {
        key: "preferences",
        title: t('profileSidebar.preferences'),
        items: [
          { name: t('profileSidebar.privacy_security'), icon: "lock", route: "privacy" },
          {
            name: t('profileSidebar.display_mode'),
            icon: "sun",
            route: "display",
          },
          { name: t('profileSidebar.notifications'), icon: "bell", route: "notifications" },
          { name: t('profileSidebar.apply_promo_code'), icon: "gift", route: "promo" },
        ],
      },
    ],
  };
  const themes = {
    light: {
      dotBg: "linear-gradient(135deg, #F0F8FF, #FEF9F3)",
      primaryBlue: "#3645FF",
    },

    "deep-blue-theme": {
      dotBg: "linear-gradient(135deg, #191970, #000080)",
      primaryBlue: "#7B68EE",
    },

    "noir-bronze-theme": {
      dotBg: "linear-gradient(135deg, #0A0A0A, #000000)",
      primaryBlue: "#CD7F32",
    },
  };
  const applyTheme = (themeName) => {
    setTheme(themeName);
    setShowThemeModal(false);
  };
  const current = themes[theme] || themes.light;
  return (
    <>
      <div
        className="
          w-full
          space-y-4
          px-2 sm:px-3 md:px-4
          py-2
          lg:sticky lg:top-[100px]
          lg:h-[calc(100vh-100px)]
          lg:overflow-y-auto
        "
      >
        {/* Influencer Card */}
        <div
        onClick={() => navigate("/introduction")}
          className="
            flex items-center justify-between
            rounded-2xl
            px-4 py-3 sm:px-5 sm:py-4
            bg-gradient-to-tr from-[#7133A8] via-[#E4678C] to-[#FC9A86]
            cursor-pointer
          "
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shrink-0">
              <img
                src={rightSidebarData.influencer.img}
                alt="influencer"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-xs sm:text-sm font-semibold text-white">
                {rightSidebarData.influencer.title}
              </p>

              <p className="text-[10px] sm:text-xs text-white/80">
                {rightSidebarData.influencer.desc}
              </p>
            </div>
          </div>

          <FiChevronRight className="text-white/80 text-sm" />
        </div>

        {/* Sections */}
        {rightSidebarData.sections.map((section, index) => (
          <div
            key={index}
            className="
              bg-[var(--card)]
              rounded-2xl sm:rounded-3xl
              p-3 sm:p-4
            "
          >
            <h3 className="text-xs sm:text-sm font-semibold text-[var(--text-dim)] mb-2 sm:mb-3 ml-1">
              {section.title}
            </h3>

            <div className="space-y-2">
              {section.items.map((item, i) => {
                const Icon = iconMap[item.icon];

                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (item.route === "verify") {
                        setVerifyStep(1);
                      } else if (item.route === "display") {
                        setShowThemeModal(true);
                      }
                    }}
                    className="
                      flex items-center justify-between
                      bg-white
                      px-3 py-2.5 sm:px-4 sm:py-3
                      rounded-lg sm:rounded-xl
                      hover:shadow-sm
                      transition
                      cursor-pointer
                    "
                  >
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium">
                      {Icon && (
                        <Icon
                          size={14}
                          className="text-gray-700 sm:size-4"
                        />
                      )}

                      <span className="text-gray-700">
                        {item.name}
                      </span>
                    </div>

                    <FiChevronRight className="text-gray-400 text-sm" />
                  </div>
                );
              })}
            </div>

            {/* Invisible Mode Card */}
            {section.key === "preferences" && (
              <div className="mt-4">
                <div
                  className="
                    rounded-2xl
                    p-4
                    bg-gradient-to-r
                    from-[#EBD7FF]
                    to-[#DDBBFF]
                  "
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-[#2D1B45] ">
                        {t('profileSidebar.invisible_mode')}
                      </h4>

                      <span className="text-[10px] bg-[#7B3FF2] text-white px-2 py-1 rounded-full">
                        {t('profileSidebar.premium_badge')}
                      </span>
                    </div>

                    {/* Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={invisibleMode}
                        onChange={() =>
                          setInvisibleMode(!invisibleMode)
                        }
                      />

                      <div
                        className="
                          w-11 h-6
                          bg-white/70
                          rounded-full
                          peer-checked:bg-[#7B3FF2]
                          transition
                        "
                      ></div>

                      <div
                        className="
                          absolute left-1 top-1
                          w-4 h-4
                          bg-white
                          rounded-full
                          transition
                          peer-checked:translate-x-5
                        "
                      ></div>
                    </label>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#4A3563] mt-3 font-medium">
                    {t('profileSidebar.invisible_mode_desc1')}
                  </p>

                  <p className="text-[11px] text-[#6E5A85] mt-1 leading-relaxed">
                    {t('profileSidebar.invisible_mode_desc2')}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {showThemeModal && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-[var(--bg-background)] rounded-3xl p-6 w-[320px] shadow-2xl">
            <div className="space-y-3">
              <button
                onClick={() => {
                  setTheme("light");
                  setShowThemeModal(false);
                }}
                className={`w-full p-3 rounded-xl border transition-all
      ${theme === "light"
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-[var(--border)] text-[var(--text-dim2)]"
                  }`}
              >
                {t('profileSidebar.light_mode')}
              </button>

              <button
                onClick={() => {
                  setTheme("deep-blue-theme");
                  setShowThemeModal(false);
                }}
                className={`w-full p-3 rounded-xl border transition-all
      ${theme === "deep-blue-theme"
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-[var(--border)] text-[var(--text-dim2)]"
                  }`}
              >
                {t('profileSidebar.dark_mode')}
              </button>

              <button
                onClick={() => {
                  setTheme("noir-bronze-theme");
                  setShowThemeModal(false);
                }}
                className={`w-full p-3 rounded-xl border transition-all
      ${theme === "noir-bronze-theme"
                    ? "border-amber-600 bg-amber-50 text-amber-700"
                    : "border-[var(--border)] text-[var(--text-dim2)]"
                  }`}
              >
                {t('profileSidebar.bronze_mode')}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ONLY VERIFY MODAL CONNECTED */}
      {verifyStep === 1 && (
        <VerifyModal
          closeModal={() => setVerifyStep(0)}
        />
      )}
    </>
  );
}

export default Right;


