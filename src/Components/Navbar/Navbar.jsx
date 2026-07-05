import React, { useState, useEffect, useRef } from "react";
const logo = "/Image/logo-nav.png";
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
  CircleUser,
  Menu,
  X
} from "lucide-react";
 
import Filter from "../HomePage/Filter";
import BoostModal from "../Boost/BoostModal";
import { LogoutUser } from "../Redux/authSlice";
import { disconnectSocket } from "../../socket";
import { useTranslation } from "react-i18next";

// Fichier renommé côté dépôt le 05/07/2026 : privilece.png -> privilege.png (faute corrigée)
const TIER_BADGE_IMAGES = {
  "Dégustation": "/Image/Degusta.png",
  "Privilège": "/Image/privilege.png",
  "Cercle Privé": "/Image/prive.png",
  "L'Apéritif (Free)": "/Image/silver-icon.png",
};

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBoostOpen, setIsBoostOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
 
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef();

  const { profile } = useSelector((state) => state.profile);
  const userId = useSelector((state) => state.auth.user?.id);

  const IMAGE_BASE_URL = "http://35.180.139.208:3000";

  const tierName = profile?.data?.tier_name || "L'Apéritif (Free)";
  const tierBadgeImage = TIER_BADGE_IMAGES[tierName];

  useEffect(() => {
    if (userId && !profile) {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userId, profile]);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
  }, []);
 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
 
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  if (isLoggedIn) {
    return (
      <header className="w-full bg-[var(--bg)] border border-[var(--border)] shadow-sm font-sans relative z-50">
        <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between mt-2">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="logo" className="h-8 md:h-9 object-contain" />
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
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

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div className="hidden md:flex max-w-full mx-auto px-6 py-2 items-center justify-between ">
          <nav className="flex items-center gap-2">
            {[
              { path: "/homepage", label: t('navbar.home'), icon: Home },
              { path: "/Soulmap", label: t('navbar.soul_map'), icon: Globe },
              { path: "/Lucas", label: t('navbar.lucas'), icon: Sparkles },
              { path: "/Chat", label: t('navbar.chats'), icon: MessageCircle },
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

          <div className="flex items-center gap-4">
            <Link
              to="/profile/language"
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-[var(--border)] hover:bg-[var(--hover)] transition"
            >
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-bold uppercase">{i18n.language}</span>
            </Link>

            <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#F5F1FF] text-[#6B21A8] font-semibold text-sm">
              {tierBadgeImage && (
                <img src={tierBadgeImage} alt={tierName} className="w-4 h-4 object-contain" />
              )}
              {tierName}
            </button>

            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border cursor-pointer flex items-center justify-center bg-gray-100"
              >
                {profile?.data?.profileImage && !avatarError ? (
                  <img
                    src={`${IMAGE_BASE_URL}/${profile.data.profileImage}`}
                    alt={profile?.data?.fullName || "User"}
                    className="w-full h-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <CircleUser className="w-7 h-7 text-gray-400" />
                )}
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[var(--bg-background)] border border-[var(--border)] rounded-xl shadow-lg z-50">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--text-dim)] hover:bg-[var(--hover)] transition"
                  >
                    {t('navbar.profile')}
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await dispatch(LogoutUser());
                        disconnectSocket();
                        setIsDropdownOpen(false);
                        setIsLoggedIn(false);
                        navigate("/login");
                      } catch (err) {
                        console.log("Logout error:", err);
                      }
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500"
                  >
                    {t('navbar.logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[60px] bg-white z-40 p-6">
            <nav className="flex flex-col gap-3">
              {/* ... liens menu mobile ... */}
            </nav>
          </div>
        )}
        
        {isFilterOpen && <Filter onClose={() => setIsFilterOpen(false)} />}
        <BoostModal isOpen={isBoostOpen} onClose={() => setIsBoostOpen(false)} />
      </header>
    );
  }

  return (
    <header className="w-full bg-[var(--card)] border border-[var(--border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 object-contain" />
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/signup">
            <button className="px-5 py-2 rounded-full bg-[#FFB4A01A] text-[#FFB4A0]">
              {t('navbar.sign_up')}
            </button>
          </Link>
          <Link to="/login">
            <button className="px-5 py-2 rounded-full bg-gray-100 text-gray-700">
              {t('navbar.login')}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
