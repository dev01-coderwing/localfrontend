 import { MapPin, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SoulmapLocation = ({ onClose, locationName, onViewProfile, matches = [] }) => {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-[600px] w-full max-w-md bg-[#0b0014] rounded-[32px] border border-white/5 flex flex-col p-6 overflow-hidden">
     
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 z-50"
        >
          <X className="w-5 h-5 text-gray-300" />
        </button>
      )}
 
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pr-12">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📍</span>
              <h1 className="text-white text-2xl font-bold tracking-tight">
                {locationName || t('soulmapLocation.default_location')}
              </h1>
            </div>
            <p className="text-gray-400 text-sm mt-1 ml-7">
              {t('soulmapLocation.soul_alignment_detected')}
            </p>
          </div>
 
          <span className="text-[10px] font-black px-3 py-1 rounded-full border border-purple-500/50 text-purple-300 tracking-widest bg-purple-500/5">
            {t('soulmapLocation.high_priority')}
          </span>
        </div>
 
        {/* Cards */}
        <div className="flex flex-col gap-4">
          {matches.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">
              {t('soulmapLocation.no_matches')}
            </p>
          ) : (
          matches.map((user, index) => (
            <div
              key={index}
              className="p-[1px] rounded-2xl bg-gradient-to-r from-purple-500/30 to-blue-500/30 shadow-xl"
            >
              <div className="bg-[#120021]/80 rounded-2xl p-5 flex items-center gap-4 border border-white/5">

                {/* Avatar */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-blue-500 rounded-full opacity-20"></div>
                  {user.img ? (
                    <img
                      src={user.img}
                      alt=""
                      className="relative w-16 h-16 rounded-full border-2 border-purple-500/50 object-cover"
                    />
                  ) : (
                    <div className="relative w-16 h-16 rounded-full border-2 border-purple-500/50 bg-purple-900/40 flex items-center justify-center text-purple-200 font-bold">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>
 
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-white text-lg font-bold">
                      {user.name}
                    </h2>
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-white">✔</span>
                    </div>
                  </div>
 
                  {/* Badges */}
                  <div className="flex gap-2">
                    <div className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 flex items-center gap-1.5">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">{t('soulmapLocation.astral_label')}</span>
                      <span className="text-[12px] font-bold text-white">{user.astral}%</span>
                    </div>
                    <div className="px-3 py-1 rounded-full border border-gray-500/30 bg-white/5 flex items-center gap-1.5">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">{t('soulmapLocation.emotional_label')}</span>
                      <span className="text-[12px] font-bold text-white">{user.emotional}%</span>
                    </div>
                  </div>
 
                  {/* Button */}
                  <button
                    onClick={() => onViewProfile && onViewProfile(user)}
                    className="mt-4 w-full py-2.5 rounded-full bg-gradient-to-r from-[#D5989F] via-[#A888E2] to-[#769AF7] text-white text-sm font-bold shadow-lg hover:brightness-110 transition active:scale-[0.98]"
                  >
                    {t('soulmapLocation.view_profile')}
                  </button>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SoulmapLocation;



 
