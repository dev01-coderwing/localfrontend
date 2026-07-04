import { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Right from "./Right";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../../api";

const COMPAT_ICON_MAP = {
  mbti: "/Image/Brain2.png",
  love_language: "/Image/heart2.png",
  attachment_style: "/Image/pin.png",
  ocean: "/Image/Star.png",
};

export default function ProfileLayout() {
  const { t } = useTranslation();
  const [psych, setPsych] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPsychProfile = async () => {
      try {
        const response = await api.get("/profile/psychological");
        setPsych(response.data?.data || null);
      } catch (err) {
        console.log("Psychological profile error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPsychProfile();
  }, []);

  const compatibility = (psych?.psychologicalInsights || []).map((item) => ({
    title: item.title,
    desc: item.description || item.value,
    status: "done",
    img: COMPAT_ICON_MAP[item.id] || "/Image/badge.png",
  }));

  // NOTE: pas d'endpoint identifié dans le backend pour avg_match / matches / in_labs
  // à ce jour — reste en placeholder tant que Meera ne confirme pas la source.
  const profileData = {
    profile: {
      name: psych?.user?.fullName || "",
      avatar: psych?.user?.profileImage
        ? `http://35.180.139.208:3000/${psych.user.profileImage}`
        : "https://i.pravatar.cc/150",
      verified: true,
      badge: "/Image/badge.png",
      tick: "/Image/tick.png",

      stats: [
        { value: "—", label: t('profileLayout.avg_match') },
        { value: "—", label: t('profileLayout.matches') },
        { value: "—", label: t('profileLayout.in_labs') },
      ],

      compatibility,
      compatibilityMessage: !loading && psych?.hasData === false ? psych.message : null,

      bio: psych?.user?.bio || "",
      images: [
        {
          id: 1,
          url: psych?.user?.profileImage
            ? `http://35.180.139.208:3000/${psych.user.profileImage}`
            : "",
          isMain: true,
        },
        { id: 2, url: "", isMain: false },
        { id: 3, url: "", isMain: false },
        { id: 4, url: "", isMain: false },
        { id: 5, url: "", isMain: false },
      ],
    },

    middle: {
      // NOTE: pas d'endpoint identifié pour le solde/temps Lucas à ce jour — placeholder.
      balance: {
        amount: "—",
        label: t('profileLayout.available_balance'),
        img: "/Image/coin.png",
      },
      usage: {
        title: t('profileLayout.time_usage'),
        usedPercent: 0,
        usedTime: "—",
        totalTime: "—",
        remaining: t('profileLayout.remaining', { time: '—' }),
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
          <div className="lg:col-span-2 bg-red-100">
            {loading ? (
              <p className="text-center text-sm text-[var(--text-dim2)] py-10">Loading...</p>
            ) : (
              <Outlet context={profileData} />
            )}
          </div>
          <Right />
        </div>
      </div>
    </div>
  );
}
