import React from "react";
import { Globe, Search, Navigation } from "lucide-react";
import { useTranslation } from "react-i18next";

const Alignment = ({ onProfileView, onInvite, onMaybeLater }) => {
    const { t } = useTranslation();
    return (
        <div className="p-4">
            {/* Main Card */}
            <div className="w-full max-w-[400px] bg-[#0A0212] rounded-[40px] p-5 flex flex-col items-center shadow-2xl border border-white/[0.02]">
 
                {/* Top Icon Section */}
                <div className="relative mb-2 mt-1">
                    <div className="w-28 h-28 bg-[#8B6EE2] rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
                        <div className="relative">
                            <Globe className="w-12 h-12 text-[#0A0510]" strokeWidth={1.5} />
                            <Search
                                className="w-8 h-8 text-[#0A0510] absolute -bottom-1 -right-1 bg-[#8B6EE2] rounded-full p-0.5"
                                strokeWidth={3}
                            />
                        </div>
                    </div>
                </div>
 
                {/* Title */}
                <h1 className="text-white text-2xl font-bold tracking-tight mb-2">
                    {t('alignment.title')}
                </h1>
 
                {/* Location Badge */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-2xl mb-2 transition hover:bg-white/10 cursor-default">
                    <div className="bg-[#5D3AB1] p-1.5 rounded-lg">
                        <Navigation className="w-4 h-4 text-white" fill="currentColor" />
                    </div>
                    <span className="text-white font-bold text-base">{t('alignment.location')}</span>
                </div>
 
                {/* Description Text */}
                <p className="text-#FFFFFFCC text-center text-[15px] leading-relaxed mb-4 max-w-[300px] opacity-90">
                    {t('alignment.description')}
                </p>
 
                {/* Match Statistics Row */}
                <div className="grid grid-cols-2 gap-3 w-full mb-4">
                    {/* Astral Match Card */}
                    <div className="border border-white/20 rounded-[28px] p-4 flex flex-col items-center justify-center aspect-square md:aspect-auto">
                        <span className="text-gray-500 text-[11px] font-black tracking-[0.2em] uppercase mb-2">
                            {t('alignment.astral_match')}
                        </span>
                        <h2 className="text-white text-4xl font-bold tracking-tight">
                            89%<span className="text-2xl ml-1">+</span>
                        </h2>
                    </div>
 
                    {/* Emotional Match Card */}
                    <div className="border border-white/20 rounded-[28px] p-4 flex flex-col items-center justify-center aspect-square md:aspect-auto">
                        <span className="text-gray-500 text-[11px] font-black tracking-[0.2em] uppercase mb-2">
                            {t('alignment.emotional_match')}
                        </span>
                        <h2 className="text-white text-4xl font-bold tracking-tight">
                            78%<span className="text-2xl ml-1">+</span>
                        </h2>
                    </div>
                </div>
 
                {/* Call to Action Buttons */}
                <div className="w-full space-y-2.5 mb-2">
                    <button
                        onClick={onInvite}
                        className="w-full py-3 rounded-[20px] bg-gradient-to-r from-[#D5989F] via-[#A888E2] to-[#769AF7] text-white text-base font-bold shadow-xl hover:brightness-110 active:scale-[0.98] transition-all"
                    >
                        {t('alignment.send_invitation')}
                    </button>
 
                    <button
                        onClick={onProfileView}
                        className="w-full py-3 rounded-[20px] border border-[#FCA5A5]/60 text-[#FCA5A5] text-base font-bold hover:bg-[#FCA5A5]/5 active:scale-[0.98] transition-all"
                    >
                        {t('alignment.view_profile')}
                    </button>
                </div>
 
                {/* Secondary Link */}
                <button
                    onClick={onMaybeLater}
                    className="text-gray-500 text-base font-medium hover:text-gray-300 transition-colors pb-2"
                >
                    {t('alignment.maybe_later')}
                </button>
 
            </div>
        </div>
    );
};
 
export default Alignment;