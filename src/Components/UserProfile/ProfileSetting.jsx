import React, { useState, useCallback, memo } from "react";
import { Plus, X, ArrowLeft } from "lucide-react";
import Navbar from "../Navbar/Navbar";
import Right from "./layout/Right";
import { useTranslation } from "react-i18next";

/**
 * PHOTO SLOT COMPONENT
 * Precise recreation of the design slots.
 */
const PhotoSlot = memo(({ image, index, onUpload, onRemove }) => {
  const { t } = useTranslation();
  const isMain = index === 0;

  return (
    <div
      className={`relative rounded-[28px] border-2 border-dashed border-gray-100 bg-white flex items-center justify-center overflow-hidden group transition-all duration-300 hover:border-purple-200 ${isMain ? "row-span-2 h-full" : "aspect-square md:aspect-auto md:h-[180px] lg:h-[200px]"
        }`}
    >
      {image ? (
        <div className="w-full h-full relative">
          <img
            src={typeof image === "string" ? image : image.url}
            alt={isMain ? "Main" : `Photo ${index}`}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {isMain && (
            <div className="absolute top-4 right-4 px-4 py-1.5 bg-[#7C81D3] text-white text-[10px] font-black rounded-full shadow-lg uppercase tracking-widest z-10 transition-transform active:scale-95">
              {t('profileSettings.main_photo')}
            </div>
          )}

          {/* Red close button with white circle background matching design */}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md text-[#F24E1E] hover:scale-110 active:scale-90 transition-all z-10 border border-gray-100/50"
          >
            <X size={16} className="stroke-[3.5]" />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full bg-white text-gray-400 hover:text-purple-400 transition-colors">
          <Plus
            size={isMain ? 48 : 32}
            className="stroke-[1.5] transition-transform group-hover:scale-110"
          />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => onUpload(e, index)}
          />
        </label>
      )}
    </div>
  );
});

/**
 * INTEREST PILL COMPONENT
 */
const InterestPill = memo(({ label, onRemove }) => (
  <div className="flex items-center gap-2 px-5 py-2.5 bg-[var(--bg-card)]/10 text-[var(--text-dim2)] rounded-full text-[11px] font-black uppercase tracking-tight transition-all hover:bg-[#FFB4A0]/40 group">
    {label}
    <button
      type="button"
      onClick={() => onRemove(label)}
      className="flex items-center justify-center w-5 h-5 bg-white/40 rounded-full hover:bg-white hover:text-red-500 transition-colors"
    >
      <X size={12} className="stroke-[4]" />
    </button>
  </div>
));

/**
 * PROFILE SETTING PAGE
 * Achieve 100% Fidelity with the design image.
 */
export default function ProfileSetting() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState({
    images: [
      { id: 1, url: "/Image/Man.png", isMain: true },
      null, null, null, null, null
    ],
    bio: "",
    interests: ["Art", "Travel", "Music", "Fitness", "Cooking", "Reading"],
  });

  const handleUpload = useCallback((e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile((prev) => {
      const next = [...prev.images];
      next[index] = index === 0 ? { id: Date.now(), url, isMain: true } : url;
      return { ...prev, images: next };
    });
  }, []);

  const handleRemove = useCallback((index) => {
    setProfile((prev) => {
      const next = [...prev.images];
      next[index] = null;
      return { ...prev, images: next };
    });
  }, []);

  const removeInterest = useCallback((name) => {
    setProfile((prev) => ({
      ...prev, interests: prev.interests.filter((i) => i !== name)
    }));
  }, []);

  const addInterest = useCallback(() => {
    const val = window.prompt(t('profileSettings.enter_interest'));
    if (val && !profile.interests.find(i => i.toLowerCase() === val.toLowerCase())) {
      setProfile(prev => ({ ...prev, interests: [...prev.interests, val] }));
    }
  }, [profile.interests, t]);

  return (
    <div className="min-h-screen bg-[var(--bg-background)] ">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 md:p-10">
        <section className="bg-[var(--bg-card)]/10 rounded-[48px] p-6 md:p-14 shadow-sm">

          {/* Header */}
          <header className="flex items-center gap-6 mb-12">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>
            <h1 className="text-2xl  text-[var(--text-dim)] tracking-tight">{t('profileSettings.title')}</h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Page Content Area (2/3 width) */}
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-[var(--bg-background)] rounded-[56px] p-8 md:p-12 border border-[var] shadow-inner space-y-10">

                {/* 1. PHOTO GRID (Precise 5-column proportional grid) */}
                <div className="grid grid-cols-5 gap-5 h-fit">
                  {/* Col 1: Main (Spans 2 rows) */}
                  <div className="col-span-2 row-span-2">
                    <PhotoSlot index={0} image={profile.images[0]} onUpload={handleUpload} onRemove={handleRemove} />
                  </div>

                  {/* Top Row: Col 3, 4, 5 and Col 2 Top */}
                  <div className="col-start-3">
                    <PhotoSlot index={1} image={profile.images[1]} onUpload={handleUpload} onRemove={handleRemove} />
                  </div>
                  <div className="col-start-4">
                    <PhotoSlot index={2} image={profile.images[2]} onUpload={handleUpload} onRemove={handleRemove} />
                  </div>
                  <div className="col-start-5">
                    <PhotoSlot index={3} image={profile.images[3]} onUpload={handleUpload} onRemove={handleRemove} />
                  </div>

                  {/* Bottom Row: Col 3 Bottom, etc. as needed */}
                  <div className="col-start-3 row-start-2">
                    <PhotoSlot index={4} image={profile.images[4]} onUpload={handleUpload} onRemove={handleRemove} />
                  </div>
                  <div className="col-start-4 row-start-2">
                    <PhotoSlot index={5} image={profile.images[5]} onUpload={handleUpload} onRemove={handleRemove} />
                  </div>
                </div>

                {/* 2. BIO SECTION */}
                <div className="space-y-4">
                  <label htmlFor="bio" className="text-sm font-bold text-[var(--text-dim2)] ml-1">{t('profileSettings.bio_label')}</label>
                  <textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder={t('profileSettings.bio_placeholder')}
                    className="w-full bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-[32px] p-8 text-sm font-medium text-[var(--text-dim2)] outline-none focus:ring-4 focus:ring-purple-50 transition-all shadow-sm min-h-[160px] resize-none placeholder:text-[var(--text-dim2)]"
                  />
                </div>

                {/* 3. INTERESTS SECTION */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-sm font-bold text-[var(--text-dim2)]">{t('profileSettings.interests')}</h2>
                    <button
                      type="button"
                      onClick={addInterest}
                      className="text-xs font-black text-[var(--text)] border-b-2 border-gray-900 pb-0.5 hover:text-purple-600 hover:border-purple-600 transition-all uppercase tracking-widest"
                    >
                      {t('profileSettings.add_new')}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3 ">
                    {profile.interests.map((item) => (
                      <InterestPill key={item} label={item} onRemove={removeInterest} />
                    ))}
                  </div>
                </div>

                {/* SAVE ACTION */}
                <footer className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    className="w-full max-w-sm h-15 py-5 rounded-[28px] bg-gradient-to-r from-[#DB96A1] to-[#7C81D3] text-white font-black text-sm shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-95 transition-all duration-300 uppercase tracking-[0.2em]"
                  >
                    {t('profileSettings.update_profile')}
                  </button>
                </footer>
              </div>
            </div>

            {/* Sidebar (1/3 width) */}
            <aside className="lg:col-span-1">
              <Right />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
