import Navbar from "../../Navbar/Navbar";
import Left from "./Left";
import Right from "../layout/Right";
import Middle from "./Middle";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../Redux/profileSlice";
export default function ProfileLayout() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);

 const userId = localStorage.getItem("userId");

useEffect(() => {
  if (userId) {
    dispatch(getUserProfile(userId));
  }
}, [dispatch, userId]);

  // ✅ DUMMY API DATA (replace later with real API)
  const apiData = {
    user: {
      name: "Neetesh Lodhi",
      avatar: "https://i.pravatar.cc/100",
      verified: true,
    },

    stats: {
      avgMatch: "87%",
      matches: 12,
      labs: 5,
    },

    compatibility: [
      { type: "MBTI", result: "ENFP - The Campaigner", status: "done" },
      { type: "Love Languages", result: "Quality Time", status: "done" },
      { type: "Attachment Style", result: "Secure", status: "done" },
      { type: "Big Five (OCEAN)", result: "Not completed", status: "pending" },
    ],

    wallet: {
      balance: 18.96,
    },

    usage: {
      used: 150,
      total: 360,
    },

    settings: [
      { name: "Edit Profile", icon: "user" },
      { name: "Subscription", icon: "card" },
      { name: "Get Verified", icon: "shield" },
      { name: "Language", icon: "globe" },
      { name: "Settings", icon: "settings" },
      { name: "Privacy & Security", icon: "lock" },
      { name: "Display Mode", icon: "sun" },
      { name: "Notifications", icon: "bell" },
      { name: "Apply Promo Code", icon: "gift" },
    ],
  };
  const getImageByType = (type) => {
    switch (type) {
      case "MBTI":
        return "./Image/🧠.png";

      case "Love Languages":
        return "./Image/💕.png";

      case "Attachment Style":
        return "./Image/🔗.png";

      case "Big Five (OCEAN)":
        return "./Image/⭐.png";

      default:
        return "/Image/default.png";
    }
  };
  // ✅ TRANSFORM DATA (backend → UI)
 const transformedData = {
  profile: {
    name: profile?.data?.name || "",
    avatar: profile?.data?.profilePicture || "",
    verified: profile?.data?.verified || false,
  },

  middle: {
    balance: {
      amount: `€ ${profile?.data?.walletBalance || 0}`,
      label: "Available Balance",
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
