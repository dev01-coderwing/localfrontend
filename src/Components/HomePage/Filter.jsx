import { useState } from "react";
import { MapPin, LockKeyhole } from "lucide-react";
import { useTranslation } from "react-i18next";
const Filter = ({ onClose }) => {
  const { t } = useTranslation();
  const [distance, setDistance] = useState(50);
  const [ageRange, setAgeRange] = useState([22, 32]);
  
  const [interest, setInterest] = useState("Women");

  return (
    <div className="fixed inset-0 z-50 flex justify-end ">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>

      {/* Right Side Panel */}
      <div
        className=" w-[350px] h-full p-5 shadow-xl animate-slide-in overflow-y-auto bg-[var(--bg-background)] text-[var(--text-dim)]"
       
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">{t('filter.header')}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Location */}
        <div
          className="p-4 rounded-xl mb-4 bg-[var(--bg-card)]/10 border border-[var(--border)]"
         
        >
          <p className="text-sm text-[var(--text-dim)]">{t('filter.location')}</p>
          <div className="flex text-[var(--text-dim2)]"> <MapPin className="size-6 pt-2" /> <p className="mt-1"> Brooklyn, New York</p></div>

        </div>

        {/* Relocation */}
        <div
          className="p-4 rounded-xl mb-4 flex justify-between items-center bg-[var(--bg-card)]/10 border border-[var(--border)]"
       
        >
          <div>
            <p className="font-medium"><LockKeyhole /> {t('filter.relocation_locked')}</p>
            <p className="text-sm text-[var(--text-dim2)]">
              {t('filter.relocation_desc')}
            </p>
            <button
              className="mt-2 px-4 py-1 rounded-full text-white"
              style={{
                background: "linear-gradient(90deg, #7133A8, #E4678C, #FC9A86)"
              }}
            >
              {t('filter.upgrade')}
            </button>
          </div>

          <div className="w-16 h-16 bg-black rounded-xl"></div>
        </div>

        {/* Distance */}
        <div
          className="p-4 rounded-xl mb-4 bg-[var(--bg-card)]/10 border border-[var(--border)]"
        
        >
          <div className="flex justify-between  ">
            <p className="text-sm">{t('filter.max_distance')}</p>
            <p className="text-sm">{distance} {t('filter.miles')}</p>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full mt-2 appearance-none h-1 rounded-lg"
            style={{
              background: `linear-gradient(to right, #FFB4A0 ${distance}%, #e5e7eb ${distance}%)`
            }}
          />
        </div>

        {/* Age Range */}
        <div
          className="p-4 rounded-xl mb-4 bg-[var(--bg-card)]/10 border border-[var(--border)]"
         
        >
          <div className="flex justify-between">
            <p className="text-sm">{t('filter.age_range')}</p>
            <p className="text-sm">
              {ageRange[0]} - {ageRange[1]}
            </p>
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="range"
              min="18"
              max="60"
              value={ageRange[1]}
              onChange={(e) =>
                setAgeRange([ageRange[0], +e.target.value])
              }
              className="w-full appearance-none h-1 rounded-lg"
              style={{
                background: `linear-gradient(to right, #FFB4A0 ${((ageRange[1] - 18) / (60 - 18)) * 100}%, #e5e7eb ${((ageRange[1] - 18) / (60 - 18)) * 100}%)`
              }}
            />

          </div>
        </div>

        {/* Interest */}
        <div
          className="p-4 rounded-xl mb-4 bg-[var(--bg-card)]/10 border border-[var(--border)]"
          
        >
          <p className="text-sm mb-2">{t('filter.interested_in')}</p>

          {["Women", "Men", "Everyone"].map((item) => (
            <div
              key={item}
              className="flex justify-between py-2 border-b last:border-none"
              style={{ borderColor: "var(--border)" }}
            >
              <span>{item === "Women" ? t('filter.women') : item === "Men" ? t('filter.men') : t('filter.everyone')}</span>
              <input
                type="radio"
                checked={interest === item}
                onChange={() => setInterest(item)}
                className="accent-[#FFB4A0]"
              />
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          className="w-full py-3 rounded-xl text-white font-medium"
          style={{
            background:
              "linear-gradient(to right, #f43f5e, #6366f1)",
          }}
        >
          {t('filter.apply')}
        </button>
      </div>
    </div>
  );
};

export default Filter;