import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronDown, Coins, Sparkles, Moon, Crown, Martini } from 'lucide-react';
import { useTranslation } from "react-i18next";
import mini from '/Image/min.png'
import small from '/Image/small.png'
import large from '/Image/large.png'
import medium from '/Image/medium.png'
import XL from '/Image/XL.png'
import lucascope from '/Image/lucascope.png'
import lucascopeInfinity from '/Image/lucascopeInfinity.png'
import leDigestif from '/Image/Le Digestif.png'
import coin from '/Image/coin.png'
import lucas from '/Image/lucasTime.png'

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

  const RadioCheckbox = ({ checked, activeColor = 'text-amber-500' }) => (
    <div className={`w-5 h-5 rounded flex items-center justify-center border ${checked ? 'border-amber-500 bg-amber-500' : 'border-gray-300'}`}>
      {checked && <Check size={14} className="text-[var(--text)]" />}
    </div>
  );

  const CircleRadio = ({ checked }) => (
    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${checked ? 'border-amber-500' : 'border-gray-300'}`}>
      {checked && <div className="w-3 h-3 rounded-full bg-amber-500" />}
    </div>
  );

  return (
    <div className="  min-h-screen font-sans text-[var(--text)]   pb-32 bg-[var(--bg-background)]">

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <div className="bg-[var(--card)] rounded-[28px] p-6 md:p-8 space-y-10  ">
          <section>
            {/* HEADER */}
            <div>

              <div className="flex items-center gap-4 mb-8 ">

                <button className="w-10 h-10 rounded-full bg-[var(--bg)] flex items-center justify-center shadow-sm">
                  <ArrowLeft
                    size={20}
                    className="text-[var(--text)]  "
                  />
                </button>

                <h1 className="text-2xl font-bold text-[var(--text-dim)]">
                  {t("subscription2.title")}
                </h1>

              </div>

              <div className="text-center mb-10">

                <h2 className="text-4xl font-bold text-[var(--text-dim)] mb-3">
                  {t("subscription2.heading")}
                </h2>

                <p className="text-sm text-[var(--text-dim)] max-w-md mx-auto leading-relaxed">
                  {t("subscription2.headingDesc")}
                </p>

              </div>

            </div>
            <div className="flex items-center gap-2 mb-4">

              <img
                src={coin}
                alt="coin"
                className="w-5 h-10 "
              />

              <h3 className="font-bold text-lg text-[var(--text-dim)]">
                {t("subscription2.meonsPackages")}
              </h3>

            </div>

            <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar snap-x">
              {/* Package Items */}
              {[
                { id: 'Mini', labelKey: 'subscription2.pkg.mini', meons: 99, price: '00.99', oldPrice: null, discount: null, tag: null, image: mini },
                { id: 'Small', labelKey: 'subscription2.pkg.small', meons: 500, price: '4.49', oldPrice: null, discount: '-10%', tag: null, image: small },
                { id: 'Medium', labelKey: 'subscription2.pkg.medium', meons: 1000, price: '7.99', oldPrice: null, discount: '-20%', tag: null, image: medium },
                { id: 'XL', labelKey: 'subscription2.pkg.xl', meons: 2000, price: '12.99', oldPrice: null, discount: '-35%', tag: 'subscription2.tagBestValue', image: XL },
                { id: 'Large', labelKey: 'subscription2.pkg.large', meons: 5000, price: '24.99', oldPrice: null, discount: '-50%', tag: 'subscription2.tagMostPopular', highlight: true, image: large },
              ].map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`flex-none w-54 snap-center relative text-[var(--text-dim2)] rounded-xl border p-4 cursor-pointer transition-all duration-200
                  ${isSelected(selectedPackage, pkg.id, true)
                      ? ` ${pkg.highlight ? '' : 'bg-[var(--bg)] shadow-md'}`
                      : `bg-[var(--bg-card)]/10 `}
                `}
                >
                  {pkg.tag && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] whitespace-nowrap font-bold
                    ${pkg.highlight ? ' text-[var(--text-dim2)]' : ' text-[var(--text-dim2)]'}
                  `}>
                      {t(pkg.tag)}
                    </div>
                  )}

                  <div className="flex justify-end mb-2">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border
                    ${isSelected(selectedPackage, pkg.id, true) ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                      {isSelected(selectedPackage, pkg.id, true) && <Check size={12} className="text-[var(--text)]" />}
                    </div>
                  </div>

                  <div className="flex justify-center mb-3 h-[50px] items-center">
                    <img
                      src={pkg.image}
                      alt={pkg.id}
                      className="h-full object-contain"
                    />
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

          {/* Visibility Boosts Block 1 */}
          <section>
            <h3 className="font-bold text-lg mb-4 text-[var(--text-dim)]">{t("subscription2.visibilityBoosts")}</h3>
            <div className=" rounded-2xl p-6  flex flex-col md:flex-row gap-8">

              {/* Single Boosts */}
              <div className="flex-1 bg-[var(--bg-card)]/10 border border-[var(--border)]  p-5 rounded-2xl">
                <h4 className="font-bold mb-4 text-[var(--text-dim)] ">{t("subscription2.singleBoosts")}</h4>
                <div className="space-y-3">
                  {[
                    { id: '30 min', labelKey: 'subscription2.boost30min', cost: '199', tags: null },
                    { id: '1 hour', labelKey: 'subscription2.boost1hour', cost: '349', tags: [{ text: 'subscription2.tagRecommend', color: 'bg-fuchsia-500' }, { text: 'subscription2.tagSave12', color: 'bg-green-500' }] },
                    { id: '2 hours', labelKey: 'subscription2.boost2hours', cost: '599', tags: [{ text: 'subscription2.tagPopular', color: 'bg-blue-600' }, { text: 'subscription2.tagSave20', color: 'bg-green-500' }] },
                    { id: '4 hours', labelKey: 'subscription2.boost4hours', cost: '999', tags: [{ text: 'subscription2.tagSave30', color: 'bg-green-500' }] },
                  ].map((item) => (
                    <div key={item.id} className="relative">
                      {item.tags && (
                        <div className="absolute -top-3 left-4 flex gap-1 z-10 text-[var(--text-dim2)]">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className={`text-[9px] text-[var(--text-dim2)] px-1.5 py-0.5 rounded-sm ${tag.color}`}>{t(tag.text)}</span>
                          ))}
                        </div>
                      )}
                      <div
                        onClick={() => toggleSelection(setSelectedSingleBoosts, selectedSingleBoosts, item.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer
                        ${isSelected(selectedSingleBoosts, item.id) ? 'border border-[var(--border)]  text-[var(--text-dim2)] font-medium' : ' text-[var(--text-dim2)] border border-[var(--border)] '}
                      `}
                      >
                        <span className="text-sm">{t(item.labelKey)}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[var(--text-dim)]">{item.cost} {t("subscription2.meons")}</span>
                          <RadioCheckbox checked={isSelected(selectedSingleBoosts, item.id)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boost Packs */}
              <div className="flex-1 relative bg-[var(--bg-card)]/10 border border-[var(--border)]  p-5 rounded-2xl">
                <div className="absolute -top-3 left-0 bg-amber-400 text-[var(--text)]  text-[10px] font-bold px-2 py-0.5 rounded-sm z-10">
                  {t("subscription2.recommended")}
                </div>
                <h4 className="font-bold mb-4 mt-2 text-[var(--text-dim)]">{t("subscription2.boostPacks")}</h4>
                <div className="space-y-3 ">
                  {[
                    { id: 'Pack Charm', labelKey: 'subscription2.packCharm', descKey: 'subscription2.packCharmDesc', cost: '499', tag: 'subscription2.tagSave15' },
                    { id: 'Pack Seduction', labelKey: 'subscription2.packSeduction', descKey: 'subscription2.packSeductionDesc', cost: '799', tag: 'subscription2.tagSave20' },
                    { id: 'Pack Irresistible', labelKey: 'subscription2.packIrresistible', descKey: 'subscription2.packIrresistibleDesc', cost: '1499', tag: 'subscription2.tagSave35' },
                  ].map((item) => (
                    <div key={item.id} className="relative mt-5 text-[var(--text-dim)]">
                      {item.tag && (
                        <div className="absolute -top-3 left-4 z-10">
                          <span className={`text-[9px] text-[var(--text-dim2)] px-1.5 py-0.5 rounded-sm bg-green-500`}>{t(item.tag)}</span>
                        </div>
                      )}
                      <div
                        onClick={() => toggleSelection(setSelectedBoostPacks, selectedBoostPacks, item.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer
                        ${isSelected(selectedBoostPacks, item.id) ? 'border border-[var(--border)] bg-[var(--bg-card)]/30' : 'border border-[var(--border)]'}
                      `}
                      >
                        <div>
                          <div className="text-sm">{t(item.labelKey)}</div>
                          <div className="text-[11px] text-[var(--text-dim)] ">{t(item.descKey)}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[var(--text-dim)] ">{item.cost} {t("subscription2.meons")}</span>
                          <RadioCheckbox checked={isSelected(selectedBoostPacks, item.id)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* VIP Mode */}
              <div className="flex-1 bg-[var(--bg-card)]/10 border border-[var(--border)]  p-5 rounded-2xl">
                <h4 className="font-bold mb-4 mt-2 text-[var(--text-dim)]">{t("subscription2.vipMode")}</h4>
                <div className="space-y-3">
                  {[
                    { id: '24 hours', labelKey: 'subscription2.vip24hours', cost: '199' },
                    { id: '7 days', labelKey: 'subscription2.vip7days', cost: '599' },
                    { id: '30 days', labelKey: 'subscription2.vip30days', cost: '999' },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleSelection(setSelectedVip, selectedVip, item.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer
                      ${isSelected(selectedVip, item.id) ? 'border border-[var(--border)] bg-[var(--bg-card)]/10 text-[var(--text-dim2)]' : 'text-[var(--text-dim2)] border border-[var(--border)]'}
                    `}
                    >
                      <span className="text-sm">{t(item.labelKey)}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-[var(--text-dim)] ">{item.cost} {t("subscription2.meons")}</span>
                        <RadioCheckbox checked={isSelected(selectedVip, item.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Visibility Boosts Block 2 (Roses & Question Paths) */}
          <section>
            <div className="bg-[var(--bg-card)]/10 rounded-2xl p-6 flex flex-col md:flex-row gap-8">

              {/* Roses & Bouquets */}
              <div className="flex-1">
                <h4 className="font-bold mb-4">{t("subscription2.rosesAndBouquets")}</h4>
                <div className="space-y-3">

                  {[
                    { id: 'Single Rose', labelKey: 'subscription2.singleRose', descKey: 'subscription2.desc5roses', cost: '20', tag: null },
                    { id: 'Small Bouquet', labelKey: 'subscription2.smallBouquet', descKey: 'subscription2.desc5roses', cost: '99', tag: null },
                    { id: 'Medium Bouquet', labelKey: 'subscription2.mediumBouquet', descKey: 'subscription2.desc12roses', cost: '200', tag: 'subscription2.tagSave17' },
                    { id: 'Large Bouquet', labelKey: 'subscription2.largeBouquet', descKey: 'subscription2.desc12roses', cost: '375', tag: 'subscription2.tagSave25' },
                  ].map((item) => (
                    <div key={item.id} className="relative mt-4">
                      {item.tag && (
                        <div className="absolute -top-3 left-4 z-10">
                          <span className={`text-[9px] text-[var(--text)] px-1.5 py-0.5 rounded-sm bg-green-500`}>{t(item.tag)}</span>
                        </div>
                      )}
                      <div
                        onClick={() => toggleSelection(setSelectedBouquets, selectedBouquets, item.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer
                         ${isSelected(selectedBouquets, item.id) ? 'border border-[var(--border)] bg-[var(--bg-card)]/10 text-[var(--text-dim2)]' : 'text-[var(--text-dim2)] border border-[var(--border)]'}
                       `}
                      >
                        <div>
                          <div className="text-sm text-[var(--text)] ">{t(item.labelKey)}</div>
                          <div className="text-xs text-[var(--text-dim)] ">{t(item.descKey)}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[var(--text-dim)] ">{item.cost} {t("subscription2.meons")}</span>
                          <RadioCheckbox checked={isSelected(selectedBouquets, item.id)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Paths */}
              <div className="flex-1">
                <h4 className="font-bold mb-1 text-[var(--text-dim)]">{t("subscription2.questionPaths")}</h4>
                <p className="text-xs text-[var(--text-dim)]  mb-4">{t("subscription2.questionPathsDesc")}</p>
                <div className="space-y-3 mt-5">
                  {[
                    { id: 'Essential Path', labelKey: 'subscription2.essentialPath', descKey: 'subscription2.path30q', cost: '9.99', tag: null },
                    { id: 'Serenity Path', labelKey: 'subscription2.serenityPath', descKey: 'subscription2.path40q', cost: '19.99', tag: 'subscription2.tagSave17' },
                    { id: 'Elite Path', labelKey: 'subscription2.elitePath', descKey: 'subscription2.path40q', cost: '29.99', tag: 'subscription2.tagSave25' },
                  ].map((item) => (
                    <div key={item.id} className={`relative ${item.tag ? 'mt-4' : ''}`}>
                      {item.tag && (
                        <div className="absolute -top-3 left-4 z-10">
                          <span className={`text-[9px] text-[var(--text)] px-1.5 py-0.5 rounded-sm bg-green-500`}>{t(item.tag)}</span>
                        </div>
                      )}
                      <div
                        onClick={() => toggleSelection(setSelectedQuestions, selectedQuestions, item.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer
                        ${isSelected(selectedQuestions, item.id) ? 'border border-[var(--border)] bg-[var(--bg-card)]/10 text-[var(--text-dim2)]' : 'text-[var(--text-dim2)] border border-[var(--border)]'}
                      `}
                      >
                        <div>
                          <div className="text-sm text-[var(--text)] ">{t(item.labelKey)}</div>
                          <div className="text-xs text-[var(--text-dim)] ">{t(item.descKey)}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-[var(--text-dim)] ">€{item.cost}</span>
                          <RadioCheckbox checked={isSelected(selectedQuestions, item.id)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Visibility Boosts Block 3 (Lucas Time) */}
          <section>
            <div className=" rounded-2xl p-6  flex flex-col md:flex-row gap-8 border border-[var(--border)] bg-[var(--bg-card)]/10">

              {/* Lucas Time */}
              <div className="flex-1 bg-[var(--bg-card)]/10 border border-[var(--border)]  p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#7133A8] via-[#E4678C] to-[#FC9A86] p-[2px]">  <img
                    src={lucas}
                    alt="Lucas Time"
                    className="w-full h-full object-cover rounded-full bg-white" />
                  </div>
                  <div>
                    <h4 className="font-bold leading-tight text-[var(--text-dim)]">{t("subscription2.lucasTime")}</h4>
                    <p className="text-xs text-[var(--text-dim2)] ">{t("subscription2.aiCoach")}</p>
                  </div>
                </div>

               <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
  {[
    { id: '1 Hour', labelKey: 'subscription2.lucasTime1h', cost: '4.99' },
    { id: '2 Hours', labelKey: 'subscription2.lucasTime2h', cost: '7.99' },
    { id: '5 Hours', labelKey: 'subscription2.lucasTime5h', cost: '12.99' },
    { id: '10 Hours', labelKey: 'subscription2.lucasTime10h', cost: '19.99' },
  ].map((time) => (
    <div
      key={time.id}
      onClick={() =>
        toggleSelection(setSelectedLucasTime, selectedLucasTime, time.id)
      }
      className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer transition-all
        ${
          isSelected(selectedLucasTime, time.id)
            ? 'border border-[var(--border)] bg-[var(--bg-card)]/10 text-[var(--text-dim2)]'
            : 'text-[var(--text-dim2)] border border-[var(--border)]'
        }
      `}
    >
      <span className="text-xs text-[var(--text-dim2)] mb-1">
        {t(time.labelKey)}
      </span>

      <span className="font-bold text-base mb-2 text-[var(--text-dim2)]">
        €{time.cost}
      </span>

      <RadioCheckbox
        checked={isSelected(selectedLucasTime, time.id)}
      />
    </div>
  ))}
</div>
              </div>

              {/* Other Services */}
              <div className="flex-1 flex flex-col justify-center space-y-3 bg-[var(--bg)]">
                {[
                  {
                    title: 'subscription2.lucascopeGuide',
                    desc: 'subscription2.lucascopeGuideDesc',
                    price: '7.99',
                    image: lucascope,
                  },

                  {
                    title: 'subscription2.lucascopeInfinity',
                    desc: 'subscription2.lucascopeInfinityDesc',
                    price: '19.99',
                    image: lucascopeInfinity,
                  },

                  {
                    title: 'subscription2.leDigestif',
                    desc: 'subscription2.leDigestifDesc',
                    price: '9.99',
                    image: leDigestif,
                  },
                ].map((svc) => (
                  <div
  key={svc.title}
  className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/10 hover:border-[var(--border)] cursor-pointer shadow-sm"
>
  <div className="flex items-center gap-4">

    <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--hover)] flex items-center justify-center">
      <img
        src={svc.image}
        alt={t(svc.title)}
        className="w-full h-full object-cover"
      />
    </div>

    <div>
      <h5 className="font-bold text-sm text-[var(--text-dim)]">
        {t(svc.title)}
      </h5>

      <p className="text-[10px] text-[var(--text-dim2)]">
        {t(svc.desc)}
      </p>
    </div>

  </div>

  <div className="flex items-center gap-2">

    <span className="font-bold text-sm text-[var(--text-dim2)]">
      €{svc.price}
    </span>

    <ChevronDown
      size={16}
      className="text-[var(--text-dim2)]"
    />

  </div>
</div>
                ))}
              </div>

            </div>
          </section>

        </div>

        {/* Sticky Bottom Footer */}
     <div className="bottom-4 bg-[var(--bg-card)]/10 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">

  <div className="max-w-full mx-auto flex items-center justify-between px-2 md:px-8">

    <div className="flex gap-8 md:gap-16">

      <div className="flex flex-col">

        <span className="text-xs font-bold text-[var(--text-dim2)]">
          {t("subscription2.totalEur")}
        </span>

        <div className="flex items-baseline gap-1">

          <span className="text-xl font-bold text-[var(--text-dim)]">
            €0.00
          </span>

          <span className="text-xs text-[var(--text-dim2)]">
            {t("subscription2.perMonth")}
          </span>

        </div>
      </div>

      <div className="flex flex-col hidden sm:flex">

        <span className="text-xs font-bold text-[var(--text-dim2)]">
          {t("subscription2.totalMeons")}
        </span>

        <span className="text-xl font-bold text-[var(--text-dim)]">
          0.00
        </span>

      </div>

    </div>

    <button
      onClick={() => navigate("/PaymentModal")}
      className="bg-gradient-to-r from-pink-400 to-indigo-500 hover:from-pink-500 hover:to-indigo-600 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all active:scale-95"
    >
      {t("subscription2.continue")}
    </button>

  </div>
</div>

      </div>
    </div>
  );
};

export default Subscription2;
