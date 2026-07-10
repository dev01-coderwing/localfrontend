import Navbar from "../../Navbar/Navbar";
import Left from "./Left";
import Right from "../layout/Right";
import Middle from "./Middle";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../Redux/profileSlice";
import { useTranslation } from "react-i18next";

export default function ProfileLayout() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { profile, loading } = useSelector((state) => state.profile);
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userId]);

  // Kept from the latest version: derives the image host from the env variable
  // instead of a hardcoded IP — better than what we had before.
  const IMAGE_BASE_URL = import.meta.env.VITE_API_URL?.trim()?.replace(/\/api\/v1\/?$/, "");

  const data = profile?.data || {};

  // Formats raw minutes (from timeUsage.usedMinutes / totalMinutes) into "Xh Ym"
  const formatMinutes = (mins) => {
    if (mins == null) return "—";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m.toString().padStart(2, "0")}m`;
  };

  const transformedData = {
    profile: {
      name: data.fullName || "",
      avatar: data.profileImage ? `${IMAGE_BASE_URL}/${data.profileImage}` : "",
      verified: data.isVerified || false,
      stats: [
        { value: `${data.avgMatchPercentage ?? 0}%`, label: t('profile.avg_match') },
        { value: data.totalMatches ?? 0, label: t('profile.matches') },
        { value: data.inLabsCount ?? 0, label: t('profile.in_labs') },
      ],
      compatibility: (data.assessments || []).map((item) => ({
        title: item.title,
        desc: item.description || item.result || item.subtitle,
        status: item.status === "completed" ? "done" : "pending",
        icon: item.icon,
      })),
    },
    middle: {
      balance: {
        amount: `€ ${data.availableBalance ?? 0}`,
        label: t('profile.available_balance'),
      },
      usage: {
        title: t('profile.time_usage'),
        usedPercent: data.timeUsage?.totalMinutes
          ? Math.round((data.timeUsage.usedMinutes / data.timeUsage.totalMinutes) * 100)
          : 0,
        usedTime: formatMinutes(data.timeUsage?.usedMinutes),
        totalTime: formatMinutes(data.timeUsage?.totalMinutes),
        remaining: t('profile.remaining_time'),
      },
      buttons: [
        { label: t('profile.manage_subscription'), icon: "crown", style: "gradient" },
        { label: t('profile.invite_friends'), icon: "gift", style: "dark" },
      ],
    },
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[var(--bg-background)] p-6 lg:p-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {loading ? (
              <p className="text-center text-sm text-[var(--text-dim2)] py-10">Loading...</p>
            ) : (
              <Left data={transformedData.profile} />
            )}
          </div>
          <div className="lg:col-span-1 lg:pt-28">
            <Middle data={transformedData.middle} />
          </div>
          <div className="lg:col-span-1 lg:pt-28">
            <Right />
          </div>
        </div>
      </div>
    </div>
  );
}
