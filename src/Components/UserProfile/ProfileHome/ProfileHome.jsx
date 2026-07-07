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
  const { profile } = useSelector((state) => state.profile);
  const userId = useSelector((state) => state.auth.user?.id);

useEffect(() => {
  if (userId) {
    dispatch(getUserProfile(userId));
  }
}, [dispatch, userId]);

 const IMAGE_BASE_URL = import.meta.env.VITE_API_URL?.trim()?.replace(/\/api\/v1\/?$/, "");

 const transformedData = {
  profile: {
    name: profile?.data?.fullName || "",
    avatar: profile?.data?.profileImage
      ? `${IMAGE_BASE_URL}/${profile.data.profileImage}`
      : "",
verified: profile?.data?.isVerified || false,
    stats: profile?.data?.stats || [],
    compatibility: profile?.data?.compatibility || [],
  },

  middle: {
    balance: {
      amount: `€ ${profile?.data?.walletBalance || 0}`,
      label: t('profile.available_balance'),
    },

    usage: {
      title: t('profile.time_usage'),
      usedPercent: 40,
      usedTime: "2h 30m",
      totalTime: "6h 00m",
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
             <Left data={transformedData.profile} />
          </div>
          {/* Middle and Right columns start after the heading height (approx pt-28) */}
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
