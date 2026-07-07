import { useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Right from "./Right";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getPsychologicalProfile } from "../../Redux/profileSlice";

export default function ProfileLayout() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const psychological = useSelector((state) => state.profile.psychological);

  useEffect(() => {
    dispatch(getPsychologicalProfile());
  }, [dispatch]);

  const noResult = t('profileLayout.no_result');
  const mbtiResult = psychological?.mbti || noResult;
  const loveLanguageResult = psychological?.loveLanguage || noResult;
  const attachmentStyleResult = psychological?.attachmentStyle || noResult;
  const bigFiveResult = psychological?.bigFive || noResult;

  const IMAGE_BASE_URL = "http://35.180.139.208:3000";
  const avatarUrl = user?.profileImage ? `${IMAGE_BASE_URL}/${user.profileImage}` : "";

  //  MAIN DATA (SINGLE SOURCE OF TRUTH)
  const profileData = {
    profile: {
      name: user?.fullName || "",
      avatar: avatarUrl,
      verified: true,
      badge: "/Image/Badge.png",
      tick: "/Image/tick.png",

      stats: [
        { value: "87%", label: t('profileLayout.avg_match') },
        { value: 12, label: t('profileLayout.matches') },
        { value: 5, label: t('profileLayout.in_labs') },
      ],

      compatibility: [
        {
          title: t('profileLayout.mbti'),
          desc: t('profileLayout.mbti_desc', { mbti_result: mbtiResult }),
          status: psychological?.mbti ? "done" : "pending",
          img: "/Image/Brain2.png",
        },
        {
          title: t('profileLayout.love_languages'),
          desc: t('profileLayout.love_languages_desc', { love_language_result: loveLanguageResult }),
          status: psychological?.loveLanguage ? "done" : "pending",
          img: "/Image/heart2.png",
        },
        {
          title: t('profileLayout.attachment_style'),
          desc: t('profileLayout.attachment_style_desc', { attachment_style_result: attachmentStyleResult }),
          status: psychological?.attachmentStyle ? "done" : "pending",
          img: "/Image/pin.png",
        },
        {
          title: t('profileLayout.big_five'),
          desc: t('profileLayout.big_five_desc', { big_five_result: bigFiveResult }),
          status: psychological?.bigFive ? "done" : "pending",
          img: "/Image/star.png",
        },
      ],
      images: [
        {
          id: 1,
          url: avatarUrl,
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
        label: t('profileLayout.available_balance'),
        img: "/Image/Balance.png",
      },

      usage: {
        title: t('profileLayout.time_usage'),
        usedPercent: 40,
        usedTime: "2h 30m",
        totalTime: "6h 00m",
        remaining: t('profileLayout.remaining', { time: '3h' }),
      },

      buttons: [
        { label: t('profileLayout.manage_subscription'), icon: "crown", style: "gradient" },
        { label: t('profileLayout.invite_friends'), icon: "gift", style: "dark" },
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

