import Navbar from "../../Navbar/Navbar";
import Left from "./Left";
import Right from "../layout/Right";
import Middle from "./Middle";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../Redux/profileSlice";
import { useTranslation } from "react-i18next";

const IMAGE_BASE_URL = "http://35.180.139.208:3000";

export default function ProfileLayout() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userId]);

  const profileData = profile?.data || {};

  const transformedData = {
    profile: {
      name: profileData.fullName || "",
      avatar: profileData.profileImage
        ? `${IMAGE_BASE_URL}/${profileData.profileImage}`
        : "",
      verified: profileData.isVerified || false,
      stats: [
        { value: `${profileData.avgMatchPercentage ?? 0}%`, label: t('profile.avg_match') },
        { value: profileData.totalMatches ?? 0, label: t('profile.matches') },
        { value: profileData.inLabsCount ?? 0, label: t('profile.in_labs') },
      ],
      compatibility: (profileData.assessments || []).map((item) => ({
        title: item.title,
        desc: item.description || item.result || item.subtitle,
        status: item.completed ? "done" : "pending",
        icon: item.icon,
      })),
    },

    middle: {
      balance: {
        amount: `€ ${profileData.availableBalance ?? 0}`,
        label: t('profile.available_balance'),
      },

      usage: {
        title: t('profile.time_usage'),
        usedPercent: profileData.timeUsage?.percentUsed ?? 0,
        usedTime: profileData.timeUsage?.usedFormatted ?? "—",
        totalTime: profileData.timeUsage?.totalFormatted ?? "—",
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
