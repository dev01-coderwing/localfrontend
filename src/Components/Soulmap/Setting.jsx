import React, { useState } from 'react';
import { X, Bell, Orbit, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Setting = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [scanFrequency, setScanFrequency] = useState(false);
  const [timezoneSync, setTimezoneSync] = useState(true);
 
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl"
        onClick={onClose}
      ></div>
 
      {/* Settings Modal */}
      <div className="relative w-full max-w-[440px] h-[90vh] bg-[#0A0712] rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,1)] border border-white/5 flex flex-col animate-in zoom-in-95 slide-in-from-bottom-20 duration-500">
       
        {/* Header */}
        <div className="p-8 pb-4 flex items-center justify-between">
          <h1 className="text-[22px] font-bold text-white tracking-tight">{t('soulSetting.title')}</h1>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all active:scale-90"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>
 
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-10 scrollbar-hide">
         
          {/* Hero Section */}
          <div className="relative w-full h-[240px] rounded-[24px] overflow-hidden mb-8 group">
            {/* Nebula Background (Placeholder, ideally from public/Image/nebula_space_background.png) */}
            <div className="absolute inset-0 bg-[#1A1424]">
              <img
                src="/Image/nebula_space_background.png"
                alt="Nebula"
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-10000 ease-linear"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.backgroundImage = 'radial-gradient(circle at center, #6d28d9 0%, #0a0712 100%)';
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0712] via-transparent to-transparent opacity-60"></div>
           
            {/* Overlay Text */}
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-[28px] font-bold text-white leading-[1.1] tracking-tight">
                {t('soulSetting.astral_line')}<br />
                {t('soulSetting.emotional_line')}<br />
                {t('soulSetting.doubt_line')}
              </h2>
            </div>
          </div>
 
          {/* Quote Section */}
          <div className="pl-6 border-l-2 border-purple-600/50 mb-10">
            <p className="text-[17px] text-gray-200 leading-relaxed font-medium italic opacity-90">
              {t('soulSetting.quote')}
            </p>
          </div>
 
          {/* Preferences Heading */}
          <h3 className="text-[17px] font-bold text-white mb-6 tracking-wide">{t('soulSetting.preferences_heading')}</h3>
 
          {/* Preferences List */}
          <div className="space-y-4">
           
            {/* Match Alerts */}
            <PreferenceItem
              icon={<Bell className="w-5 h-5 text-purple-400" />}
              title={t('soulSetting.match_alerts_title')}
              subtitle={t('soulSetting.match_alerts_subtitle')}
              isActive={matchAlerts}
              onToggle={() => setMatchAlerts(!matchAlerts)}
            />
 
            {/* Scan Frequency */}
            <PreferenceItem
              icon={<Orbit className="w-5 h-5 text-purple-400" />}
              title={t('soulSetting.scan_frequency_title')}
              subtitle={t('soulSetting.scan_frequency_subtitle')}
              isActive={scanFrequency}
              onToggle={() => setScanFrequency(!scanFrequency)}
            />
 
            {/* Timezone Sync */}
            <PreferenceItem
              icon={<Clock className="w-5 h-5 " />}
              title={t('soulSetting.timezone_sync_title')}
              subtitle={t('soulSetting.timezone_sync_subtitle')}
              isActive={timezoneSync}
              onToggle={() => setTimezoneSync(!timezoneSync)}
              showAutoDetect
            />
 
          </div>
 
        </div>
 
      </div>
    </div>
  );
};
 
const PreferenceItem = ({ icon, title, subtitle, isActive, onToggle, showAutoDetect }) => {
  const { t } = useTranslation();
  return (
    <div className="p-5 rounded-[20px] bg-[#1A1424] border border-white/5 flex items-center gap-4 transition-all hover:border-purple-500/20 shadow-xl group">
      {/* Icon Area */}
      <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center transition-transform group-hover:scale-110">
        {icon}
      </div>
 
      {/* Text Area */}
      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-bold text-white leading-none mb-1.5">{title}</h4>
        <p className="text-[12px] text-gray-400 leading-none truncate opacity-80">{subtitle}</p>
      </div>
 
      {/* Toggle Area */}
      <div className="flex flex-col items-center gap-1.5">
        <button
          onClick={onToggle}
          className={`relative w-[52px] h-[28px] rounded-full transition-all duration-300 outline-none ${
            isActive ? 'bg-purple-600' : 'bg-gray-700'
          }`}
        >
          <div className={`absolute top-[4px] w-[20px] h-[20px] bg-white rounded-full transition-all duration-300 shadow-md ${
            isActive ? 'left-[28px]' : 'left-[4px]'
          }`}></div>
        </button>
        {showAutoDetect && (
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">
            {t('soulSetting.auto_detect')}
          </span>
        )}
      </div>
    </div>
  );
};
 
export default Setting;
 