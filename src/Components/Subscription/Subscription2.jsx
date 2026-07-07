import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronDown } from 'lucide-react';
import { useTranslation } from "react-i18next";

const Subscription2 = () => {
  const [selectedPackage, setSelectedPackage] = useState('Large');
  const [selectedSingleBoosts, setSelectedSingleBoosts] = useState(['1 hour', '4 hours']);
  const [selectedBoostPacks, setSelectedBoostPacks] = useState([]);
  const [selectedVip, setSelectedVip] = useState([]);
  const [selectedBouquets, setSelectedBouquets] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedLucasTime, setSelectedLucasTime] = useState([]);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleSelection = (setter, state, value, singleSelection = false) => {
    if (singleSelection) {
      setter(value);
    } else {
      setter(state.includes(value) ? state.filter((item) => item !== value) : [...state, value]);
    }
  };

  const isSelected = (state, value, singleSelection = false) => {
    if (singleSelection) return state === value;
    return state.includes(value);
  };

  const RadioCheckbox = ({ checked }) => (
    <div className={`w-5 h-5 rounded flex items-center justify-center border ${checked ? 'border-amber-500 bg-amber-500' : 'border-gray-300'}`}>
      {checked && <Check size={14} className="text-white" />}
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-[var(--text)] pb-32 bg-[var(--bg-background)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <div className="bg-[var(--card)] rounded-[28px] p-6 md:p-8 space-y-10">
          <section>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <button className="w-10 h-10 rounded-full bg-[var(--bg)] flex items-center justify-center shadow-sm">
                  <ArrowLeft size={20} className="text-[var(--text)]" />
                </button>
                <h1 className="text-2xl font-bold text-[var(--text-dim)]">{t("subscription2.title")}</h1>
              </div>
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-[var(--text-dim)] mb-3">{t("subscription2.heading")}</h2>
                <p className="text-sm text-[var(--text-dim)] max-w-md mx-auto leading-relaxed">{t("subscription2.headingDesc")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/Image/coin.png" alt="coin" className="w-5 h-10" />
              <h3 className="font-bold text-lg text-[var(--text-dim)]">{t("subscription2.meonsPackages")}</h3>
            </div>
            <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar snap-x">
              {[
                { id: 'Mini', labelKey: 'subscription2.pkg.mini', meons: 99, price: '00.99', image: '/Image/min.png' },
                { id: 'Small', labelKey: 'subscription2.pkg.small', meons: 500, price: '4.49', discount: '-10%', image: '/Image/small.png' },
                { id: 'Medium', labelKey: 'subscription2.pkg.medium', meons: 1000, price: '7.99', discount: '-20%', image: '/Image/medium.png' },
                { id: 'XL', labelKey: 'subscription2.pkg.xl', meons: 2000, price: '12.99', discount: '-35%', tag: 'subscription2.tagBestValue', image: '/Image/XL.png' },
                { id: 'Large', labelKey: 'subscription2.pkg.large', meons: 5000, price: '24.99', discount: '-50%', tag: 'subscription2.tagMostPopular', highlight: true, image: '/Image/large.png' },
              ].map((pkg) => (
                <div key={pkg.id} onClick={() => setSelectedPackage(pkg.id)} className="flex-none w-54 snap-center relative rounded-xl border p-4 cursor-pointer">
                  {pkg.tag && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-bold">{t(pkg.tag)}</div>}
                  <div className="flex justify-end mb-2">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${isSelected(selectedPackage, pkg.id, true) ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                      {isSelected(selectedPackage, pkg.id, true) && <Check size={12} className="text-white" />}
                    </div>
                  </div>
                  <div className="flex justify-center mb-3 h-[50px] items-center">
                    <img src={pkg.image} alt={pkg.id} className="h-full object-contain" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-sm">{t(pkg.labelKey)}</h4>
                    <p className="text-xs text-gray-500 mb-2">{pkg.meons} {t("subscription2.meons")}</p>
                    <div className="flex items-center justify-center gap-1 font-bold">
                      <span>€{pkg.price}</span>
                      {pkg.discount && <span className="text-green-500 text-[10px] ml-1">{pkg.discount}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ... suite des sections ... */}
          
          <div className="flex-1 flex flex-col justify-center space-y-3 bg-[var(--bg)]">
            {[
              { title: 'subscription2.lucascopeGuide', desc: 'subscription2.lucascopeGuideDesc', price: '7.99', image: '/Image/lucascope.png' },
              { title: 'subscription2.lucascopeInfinity', desc: 'subscription2.lucascopeInfinityDesc', price: '19.99', image: '/Image/lucascopeInfinity.png' },
              { title: 'subscription2.leDigestif', desc: 'subscription2.leDigestifDesc', price: '9.99', image: '/Image/Le Digestifif.png' },
            ].map((svc) => (
              <div key={svc.title} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--hover)] flex items-center justify-center">
                    <img src={svc.image} alt={t(svc.title)} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[var(--text-dim)]">{t(svc.title)}</h5>
                    <p className="text-[10px] text-[var(--text-dim2)]">{t(svc.desc)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[var(--text-dim2)]">€{svc.price}</span>
                  <ChevronDown size={16} className="text-[var(--text-dim2)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription2;
