import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getLucasLabOverview } from "../Redux/lucasSlice";

const LucasLabOverview = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const overview = useSelector((state) => state.lucas.overview);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getLucasLabOverview());
  }, [dispatch]);

  const noResult = t('lucasLab.no_result');

  const insights = [
    {
      icon: "🧠",
      name: t('lucasLab.mbti_name'),
      sub: t('lucasLab.mbti_sub'),
      badge: overview?.insights?.mbti || noResult,
      badgeClass: "bg-violet-600 text-white",
    },
    {
      icon: "💗",
      name: t('lucasLab.love_name'),
      sub: t('lucasLab.love_sub'),
      badge: overview?.insights?.loveLanguage || noResult,
      badgeClass: "bg-gradient-to-r from-pink-500 to-orange-400 text-white",
    },
    {
      icon: "🔗",
      name: t('lucasLab.attachment_name'),
      sub: t('lucasLab.attachment_sub'),
      badge: overview?.insights?.attachmentStyle || noResult,
      badgeClass: "bg-purple-500 text-white",
    },
    {
      icon: "⭐",
      name: t('lucasLab.ocean_name'),
      sub: t('lucasLab.ocean_sub'),
      badge: overview?.insights?.bigFive || noResult,
      badgeClass: "bg-amber-400 text-white",
    },
  ];

  const profileName = overview?.fullName || authUser?.fullName || "";
  const initials = profileName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const matchPercent = overview?.matchPercent ?? 0;
  const offset = circumference - (matchPercent / 100) * circumference;

  return (
   <div className="fixed inset-0  flex items-center justify-center p-6 z-50">
  <div className="bg-[var(--bg-background)] rounded-[28px] w-full max-w-[380px] max-h-[90vh] overflow-y-auto p-5 relative">
        {/* Close Button */}
        <button
       onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-dim)] text-sm hover:bg-[var(--hover)] transition"
        >
          ✕
        </button>

        {/* Title */}
        <p className="text-center text-[17px] font-semibold text-[var(--text-dim)] mb-4">
          {t('lucasLab.title')}
        </p>

        {/* Profile Row */}
        <div className="flex items-center gap-3 bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-[14px] px-4 py-3 mb-4">
          <div className="w-13 h-13 rounded-[12px] bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-[16px] font-bold text-[var(--text-dim)]">{profileName}</p>
            <p className="text-[12px] text-[var(--text-dim2)] mt-0.5">{t('lucasLab.profile_sub')}</p>
          </div>
        </div>

        {/* Match Box */}
        <div className="rounded-[20px] bg-gradient-to-br from-violet-700 via-purple-500 to-pink-500 p-6 mb-4 flex flex-col items-start">
          <span className="text-[13px] font-semibold text-white/90 mb-4">
            {t('lucasLab.overall_match')}
          </span>
          <div className="w-full flex justify-center">
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle
                cx="65" cy="65" r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="10"
              />
              <circle
                cx="65" cy="65" r={radius}
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 65 65)"
              />
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <text
                x="65" y="70"
                textAnchor="middle"
                fontSize="26"
                fontWeight="700"
                fill="white"
                fontFamily="system-ui"
              >
                {matchPercent}%
              </text>
            </svg>
          </div>
        </div>

        {/* Psychological Insights */}
        <p className="text-[14px] font-semibold text-[var(--text-dim)] mb-3">
          {t('lucasLab.psychological_insights')}
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {insights.map((item, i) => (
            <div
              key={i}
              className="bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-[14px] p-3"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-base">{item.icon}</span>
                <span className="text-[12px] font-semibold text-[var(--text-dim)]">
                  {item.name}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-dim2)] mb-2">{item.sub}</p>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${item.badgeClass}`}
              >
                {item.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Potential Challenges */}
        <div className="bg-red-50 border border-red-100 rounded-[16px] p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="#e53e3e"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-[14px] font-bold text-red-500">
              {t('lucasLab.potential_challenges')}
            </span>
          </div>
          <p className="text-[12px] text-red-500 mb-3">
            {t('lucasLab.challenges_desc')}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[13px]">🔒</span>
            <span className="text-[12px] text-[var(--text-dim2)]">{t('lucasLab.unlock_insights')}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full py-4 rounded-[16px] bg-gradient-to-r from-violet-600 to-pink-500 text-white text-[15px] font-semibold hover:opacity-90 transition">
          {t('lucasLab.cta_button')}
        </button>
      </div>
    </div>
  );
};

export default LucasLabOverview;

