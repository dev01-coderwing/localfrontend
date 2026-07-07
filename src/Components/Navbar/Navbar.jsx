import React, { useState, useEffect, useRef } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../Redux/profileSlice";
import {
  Globe,
  Home,
  MessageCircle,
  Sparkles,
  Zap,
  Bell,
  SlidersHorizontal,
  Shield,
  Menu,
  X,
} from "lucide-react";

import Filter from "../HomePage/Filter";
import BoostModal from "../Boost/BoostModal";
import { LogoutUser } from "../Redux/authSlice";
import { disconnectSocket } from "../../socket";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBoostOpen, setIsBoostOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef();

  const { profile } = useSelector((state) => state.profile);
  const userId = useSelector((state) => state.auth.user?.id);

  const IMAGE_BASE_URL = import.meta.env.VITE_API_URL?.trim()?.replace(
    /\/api\/v1\/?$/,
    "",
  );

  useEffect(() => {
    if (userId && !profile) {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userId, profile]);
  // ✅ Sync login state from localStorage
  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
  }, []);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =============================
  // 🔐 LOGGED IN NAVBAR
  // =============================
  if (isLoggedIn) {
    return (
      <header className="w-full bg-[var(--bg)] border border-[var(--border)] shadow-sm font-sans relative z-50">
        {/* Top Row */}
        <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between mt-2">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="logo" className="h-8 md:h-9 object-contain" />
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop Icons */}
            <div className="hidden sm:flex items-center gap-2 md:gap-3">
              <button
                onClick={() => setIsBoostOpen(true)}
                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-orange-50 text-orange-400 hover:bg-orange-100 transition"
              >
                <Zap className="w-5 h-5 fill-current" />
              </button>

              <button className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 border">
                <Bell className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsFilterOpen(true)}
                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 border"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex max-w-full mx-auto px-6 py-2 items-center justify-between ">
          {/* Links */}
          <nav className="flex items-center gap-2">
            {[
              { path: "/homepage", label: t("navbar.home"), icon: Home },
              { path: "/Soulmap", label: t("navbar.soul_map"), icon: Globe },
              { path: "/Lucas", label: t("navbar.lucas"), icon: Sparkles },
              { path: "/Chat", label: t("navbar.chats"), icon: MessageCircle },
            ].map((nav) => {
              const isActive = location.pathname === nav.path;
              const Icon = nav.icon;

              return (
                <Link
                  key={nav.path}
                  to={nav.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    isActive
                      ? "bg-[#FFF5F3] text-[#FF7A64] font-semibold"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {nav.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5F1FF] text-[#6B21A8] font-semibold text-sm">
              {profile?.data?.subscription?.plan?.planName ||
                t("navbar.privilege_badge")}
            </button>

            {/* Profile */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border cursor-pointer"
              >
                <img
                  src={
                    profile?.data?.profileImage
                      ? `${IMAGE_BASE_URL}/${profile.data.profileImage}`
                      : "/Image/default-avatar.png"
                  }
                  alt={profile?.data?.fullName || "User"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[var(-- bg-background)]  border border-[var(--border)] rounded-xl shadow-lg z-50">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--text-dim)] hover:bg-[var(--hover)] transition"
                  >
                    {t("navbar.profile")}
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        await dispatch(LogoutUser());
                        disconnectSocket();

                        setIsDropdownOpen(false);
                        setIsLoggedIn(false);

                        navigate("/login");
                      } catch (err) {}
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 "
                  >
                    {t("navbar.logout")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[60px] bg-white z-40 p-6">
            <nav className="flex flex-col gap-3">
              {[
                { path: "/", label: t("navbar.home"), icon: Home },
                { path: "/Soulmap", label: t("navbar.soul_map"), icon: Globe },
                { path: "/Lucas", label: t("navbar.lucas"), icon: Sparkles },
                {
                  path: "/Chat",
                  label: t("navbar.chats"),
                  icon: MessageCircle,
                },
              ].map((nav) => {
                const Icon = nav.icon;

                return (
                  <Link
                    key={nav.path}
                    to={nav.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
                  >
                    <Icon />
                    {nav.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Modals */}
        {isFilterOpen && <Filter onClose={() => setIsFilterOpen(false)} />}
        <BoostModal
          isOpen={isBoostOpen}
          onClose={() => setIsBoostOpen(false)}
        />
      </header>
    );
  }

  // =============================
  // 🚫 NOT LOGGED IN NAVBAR
  // =============================
  return (
    <header className="w-full bg-[var(--card)] border border-[var(--border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 object-contain" />
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/signup">
            <button className="px-5 py-2 rounded-full bg-[#FFB4A01A] text-[#FFB4A0]">
              {t("navbar.sign_up")}
            </button>
          </Link>

          <Link to="/login">
            <button className="px-5 py-2 rounded-full bg-gray-100 text-gray-700">
              {t("navbar.login")}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
