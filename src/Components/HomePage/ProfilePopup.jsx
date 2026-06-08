import { useState } from "react";

const interests = ["Art", "Travel", "Music", "Fitness", "Cooking", "Reading"];

const photos = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
];

function ProfilePopup({ onClose }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [roseSent, setRoseSent] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  const prevPhoto = () =>
    setCurrentPhoto((p) => (p - 1 + photos.length) % photos.length);
  const nextPhoto = () =>
    setCurrentPhoto((p) => (p + 1) % photos.length);
  return (
    <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
      {/* Modal backdrop */}
      <div className="relative w-full max-w-xl bg-[var(--bg-background)] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <span className="text-xl font-bold text-[var(--text-dim)] tracking-tight">Profile</span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[var(--bg-card)] flex items-center justify-center hover:bg-[var(--hover)] transition-colors"
          >
            <svg className="w-4 h-4 text-[var(--text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex gap-4 px-6 pb-4">

          {/* Left: Photo Card */}
          <div className="relative w-52 h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg group">
            <img
              src={photos[currentPhoto]}
              alt="Nicole Jennifer"
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Nav arrows */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[var(--bg-card)] flex items-center justify-center shadow hover:bg-[var(--hover)] transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-3 h-3 text-[var(--text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[var(--bg-card)] flex items-center justify-center shadow hover:bg-[var(--hover)] transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-3 h-3 text-[var(--text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1">
              {photos.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full transition-all duration-300 ${i === currentPhoto ? "w-6 bg-white" : "w-3 bg-white/50"
                    }`}
                />
              ))}
            </div>

            {/* More options dot */}
            <button className="absolute top-3 right-2 text-[var(--text-dim)] opacity-80 hover:opacity-100">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="19" r="1.5" />
              </svg>
            </button>

            {/* Name & Location */}
            <div className="absolute bottom-3 left-3">
              <div className="flex items-center gap-1">
                <span className="text-[var(--text)] font-bold text-base leading-tight">Nicole Jennifer</span>
                <span className="text-base">💙🏅⚪</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <svg className="w-3 h-3 text-[var(--text-dim)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="text-white/80 text-xs">2.3 km away</span>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 min-w-0">
            {/* Match stats */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xl">❤️</span>
                <span className="font-bold text-[var(--text-dim)] text-sm">35%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl">🍑</span>
                <span className="font-bold text-[var(--text-dim)] text-sm">50%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl">🎭</span>
                <span className="font-bold text-[var(--text-dim)] text-sm">∞</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-wider mb-1.5">Bio</p>
              <p className="text-[var(--text-dim2)] text-sm leading-relaxed">
                Architect by day, Vinyl collect by night. I'm a firm believer that the best conversations happen over a late-night pasta dinner. Looking for someone who can appreciate a good building and an even better sense of humor.
              </p>
            </div>

            {/* Interests */}
            <div>
              <p className="text-xs font-semibold text-[var(--text-dim)] uppercase tracking-wider mb-2">Interests</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-dim2)] text-xs font-medium hover:border-[var(--hover)] transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-3 space-y-3">
          {/* Send Rose + Send Invitation */}
          <div className="flex gap-3">
            <button
              onClick={() => setRoseSent(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-md ${roseSent
                  ? "bg-red-400 text-white scale-95"
                  : "bg-gradient-to-r from-red-300 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 hover:shadow-lg active:scale-95"
                }`}
            >
              <span className="text-base">🌹</span>
              {roseSent ? "Rose Sent!" : "Send Rose"}
            </button>

            <button
              onClick={() => setInviteSent(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-md ${inviteSent
                  ? "bg-purple-400 text-white scale-95"
                  : "bg-gradient-to-r from-pink-400 to-indigo-500 text-white hover:from-pink-500 hover:to-indigo-600 hover:shadow-lg active:scale-95"
                }`}
            >
              {inviteSent ? "Invitation Sent!" : "Send Invitation"}
            </button>
          </div>

          {/* Upgrade Plan */}
          <button className="w-full py-3 rounded-2xl border border-[var(--border)] text-rose-500 font-semibold text-sm hover:bg-rose-50 transition-colors">
            Upgrade Plan
          </button>
        </div>

        {/* Cancel */}
        <div className="pb-5 text-center">
          <button
            onClick={onClose}
            className="text-gray-500 text-sm hover:text-gray-700 transition-colors font-medium"
          >
            Cancel and Return
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopup;
