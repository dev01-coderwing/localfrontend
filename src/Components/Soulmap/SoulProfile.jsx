import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SoulProfile = ({ onClose, user, onInvite }) => {
    const { t } = useTranslation();
    return (
        <div className="flex items-center justify-center p-4">
 
            {/* Outer Glow Border */}
            <div className="p-[2px] rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-[0_0_40px_rgba(168,85,247,0.5)]">
 
                {/* 🔥 Compact Card */}
                <div className="w-full max-w-[520px] bg-[#120021] rounded-3xl p-4">
 
                    {/* Header */}
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-white text-base font-bold">
                            {t('soulProfile.title')}
                        </h2>
 
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-600 text-gray-300 hover:bg-white/10 transition active:scale-95"
                        >
                            ✕
                        </button>
                    </div>
 
                    {/* Profile Section */}
                    <div className="rounded-2xl bg-gradient-to-br from-[#1a0033] to-[#2a0a2f] p-3 text-center border border-white/5 shadow-inner">
 
                        <span className="text-[10px] px-3 py-1 rounded-full border border-purple-400 text-purple-300 mb-2 inline-block font-bold tracking-widest uppercase">
                            ● {user?.matchStatus || t('soulProfile.default_match_status')}
                        </span>
 
                        {/* Avatar */}
                        <div className="flex justify-center mb-3">
                            <div className="p-[2px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                                {user?.img ? (
                                    <img
                                        src={user.img}
                                        className="w-16 h-16 rounded-full border-2 border-[#120021] object-cover"
                                        alt="avatar"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full border-2 border-[#120021] bg-purple-900/40 flex items-center justify-center text-purple-200 text-lg font-bold">
                                        {(user?.name || t('soulProfile.unknown_name')).charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>

                        <h3 className="text-white text-xl font-bold">
                            {user?.name || t('soulProfile.unknown_name')} <span className="text-blue-400 ml-1">✔</span>
                        </h3>

                        <p className="text-gray-400 text-[13px] mt-1 opacity-80 leading-snug">
                            {user?.bio || t('soulProfile.no_bio')}
                        </p>
                    </div>
 
                    {/* Divider */}
                    <div className="flex items-center gap-3 my-3">
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-purple-500" />
                        <span className="text-purple-300 text-[10px] font-black uppercase tracking-widest">
                            {t('soulProfile.breakdown')}
                        </span>
                        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-purple-500" />
                    </div>
 
                    {/* Stats */}
                    <div className="flex gap-3 mb-3">
                        <div className="flex-1 p-3 rounded-xl border border-purple-500/30 bg-[#160028] shadow-inner">
                            <p className="text-gray-500 text-[9px] font-black tracking-widest">{t('soulProfile.astral_label')}</p>
                            <h2 className="text-white text-lg font-bold">{user?.astral || 87}%</h2>
                        </div>
 
                        <div className="flex-1 p-3 rounded-xl border border-purple-500/30 bg-[#160028] shadow-inner">
                            <p className="text-gray-500 text-[9px] font-black tracking-widest">{t('soulProfile.emotional_label')}</p>
                            <h2 className="text-white text-lg font-bold">{user?.emotional || 82}%</h2>
                        </div>
                    </div>
 
                    {/* Description */}
                    <div className="p-3 rounded-xl border border-purple-500/20 bg-[#160028]/80 shadow-md">
                        <h4 className="text-white text-xs font-bold flex items-center gap-2 mb-1">
                            ✨ <span className="text-purple-300 uppercase tracking-tight">{t('soulProfile.astral_alignment')}</span>
                        </h4>
                        <p className="text-gray-400 text-[11.5px] leading-relaxed italic opacity-90">
                            {user?.alignmentText || t('soulProfile.default_alignment_text')}
                        </p>
                    </div>
 
                    {/* Buttons */}
                    <div className="mt-4 space-y-2">
                        <button
                            onClick={onInvite}
                            className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#D5989F] via-[#A888E2] to-[#769AF7] text-white text-sm font-bold shadow-xl hover:brightness-110 active:scale-95 transition"
                        >
                            {t('soulProfile.send_invitation')}
                        </button>
 
                        <button className="w-full py-2.5 rounded-full border border-purple-500/40 text-purple-300 text-sm font-bold hover:bg-purple-500/5 active:scale-95 transition">
                            {t('soulProfile.save_for_later')}
                        </button>
                    </div>
 
                </div>
            </div>
        </div>
    );
};
 
export default SoulProfile;


