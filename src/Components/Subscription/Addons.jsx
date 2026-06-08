
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import infinet from '/Image/infinet.png'
import lucascope from '/Image/lucascope.png'
import badge from '/Image/badge.png'
import noto from '/Image/noto.png'  
const pricingData = {
  freeplan: {
    name: "L'Apéritif",
    badge: "Free",
    features: [
      "20 questions",
      "2 Mode Acting®",
      "Unlimited swipes",
      "Compatibility: 0–35% max",
      "1 Meon/day (connection)",
      "Mini-games included",
    ],
    cta: "Continue in free mode →",
  },
  addons: [
    {
      id: "lucascope-guide",
      icon: lucascope,
      name: "Lucascope Guide",
      subtitle: "+1h/month of astrology and compatibility",
      badge: "Save 17%",
      defaultPlan: "annual",
      plans: [
        {
          id: "annual",
          label: "Annual",
          price: 7.99,
          total: 79.9,
          originalTotal: 95.88,
          note: "2 months free",
        },
        { id: "monthly", label: "Monthly", price: 7.99, total: null, note: null },
      ],
      features: [
        "+1h/month Lucas time",
        "Personal astro (birth chart, horoscope)",
        "No synastry",
        "Icon",
      ],
    },
    {
      id: "lucascope-infinity",
      icon: infinet,
      name: "Lucascope Infinity",
      subtitle: "Save 2 months on yearly plan",
      badge: "Save 17%",
      defaultPlan: "annual",
      plans: [
        {
          id: "annual",
          label: "Annual",
          price: 19.99,
          total: 79.9,
          originalTotal: 239.88,
          note: "2 months free",
        },
        { id: "monthly", label: "Monthly", price: 19.99, total: null, note: null },
      ],
      features: ["+4h/month Lucas time", "Personal astro + Synastry",    {
    text: "Icon",
    image: infinet,
  },],
    },
    {
      id: "le-digestif",
      icon:badge,
      name: "Le Digestif",
      subtitle: "(one-time purchase)",
      badge: null,
      defaultPlan: "onetime",
      plans: [{ id: "onetime", label: "One-time", price: 9.99, total: null, note: null }],
      features: [
        "50 intimate questions",
        "+5% compatibility",
        "5 Mode Acting®",
   {
    text: "Icon",
    image: noto,
  },
        "Permanent access",
      ],
      headerPrice: "€9.99",
    },
  ],
  footnotes: [
    "COP1 (Lucascope Guide): the basic version, with simple guidance: solar/lunar compatibility, daily horoscope, small relationship tips.",
    "COP2 (Lucascope Infinity +): the advanced version, with complete synastry, karmic analysis, couple cycles, future projections.",
    "Relocation Filter: Display your profile in your current and future city to connect before you even arrive (e.g., job relocation, studying abroad). Limits: Serenity (same country), Elite (Worldwide). Subject to country availability on IAMeetYou.",
  ],
};

function CheckIcon({ checked }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold mr-2  flex-shrink-0 ${
        checked ? "bg-green-500 text-[var(--text)]" : "bg-gray-200 text-gray-400"
      }`}
    >
      ✓
    </span>
  );
}

function AddonCard({ addon, selected, onToggle, selectedPlan, onPlanChange }) {
  const currentPlan = addon.plans.find((p) => p.id === selectedPlan) || addon.plans[0];

  return (
    <div
      className={`relative rounded-2xl border-2 transition-all duration-300 p-5 flex flex-col gap-3 bg-[var(--bg-card)]/10  shadow-sm cursor-pointer
        ${selected ? "border-[var(--border)] shadow-violet-100 shadow-md" : "border-[var(--border)] "}`}
      onClick={() => onToggle(addon.id)}
    >
      {/* Badge */}
      {addon.badge && (
        <span className="absolute -top-3 left-4 bg-green-500 text-[var(--text)] text-xs font-bold px-3 py-1 rounded-full shadow">
          {addon.badge}
        </span>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2 ">
        <div className="flex items-center gap-2">
          <span className="size-8 "><img src={addon.icon} alt="" /></span>
        
          <div>
            <h3 className="font-bold text-[var(--text-dim1)] text-sm leading-tight">{addon.name}</h3>
            <p className="text-xs text-[var(--text-dim2)]">{addon.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-bold text-[var(--text-dim)] text-base">€{currentPlan.price.toFixed(2)}</span>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              selected ? "border-[var(--border)] bg-violet-500" : "border-[var(--border)]"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(addon.id);
            }}
          >
            {selected && <span className="text-[var(--text-dim2)] text-xs">✓</span>}
          </div>
        </div>
      </div>

      {/* Plan selector */}
      {addon.plans.length > 1 && (
        <div className="flex flex-col gap-1.5">
          {addon.plans.map((plan) => (
            <label
              key={plan.id}
              className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? "border-violet-400 bg-violet-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name={addon.id}
                  value={plan.id}
                  checked={selectedPlan === plan.id}
                  onChange={() => onPlanChange(addon.id, plan.id)}
                  className="accent-violet-500"
                />
                <span className="text-sm font-medium text-[var(--text-dim2)]">{plan.label}</span>
              </div>
              <div className="text-right">
                {plan.total && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[var(--text-dim2)] line-through">
                      €{plan.originalTotal?.toFixed(2)}
                    </span>
                    <span className="font-bold text-[var(--text-dim2)] text-sm">€{plan.total.toFixed(2)}</span>
                    {plan.note && (
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                        {plan.note}
                      </span>
                    )}
                  </div>
                )}
                {!plan.total && (
                  <span className="font-bold text-[var(--text-dim2)] text-sm">€{plan.price.toFixed(2)}</span>
                )}
              </div>
            </label>
          ))}
        </div>
      )}

      {/* Single plan (one-time) */}
      {addon.plans.length === 1 && (
        <div className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 bg-gray-50">
          <span className="text-sm font-medium text-[var(--text-dim2)]">{addon.plans[0].label}</span>
          <span className="font-bold text-[var(--text-dim2)]">€{addon.plans[0].price.toFixed(2)}</span>
        </div>
      )}

      {/* Features */}
      <ul className="space-y-1.5 mt-1">
       {addon.features.map((f, i) => (
  <li key={i} className="flex items-center gap-2 text-xs text-[var(--text-dim2)]">
    <CheckIcon checked={true} />

    {typeof f === "string" ? (
      f
    ) : (
      <div className="flex items-center gap-2">
        <span>{f.text}</span>
        <img
          src={f.image}
          alt=""
          className="w-4 h-4 object-contain"
        />
      </div>
    )}
  </li>
))}
      </ul>
    </div>
  );
}

export default function Addons() {
  const [selectedAddons, setSelectedAddons] = useState({});

  const [selectedPlans, setSelectedPlans] = useState(
    Object.fromEntries(pricingData.addons.map((a) => [a.id, a.defaultPlan]))
  );
  const navigate = useNavigate();

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePlanChange = (addonId, planId) => {
    setSelectedPlans((prev) => ({ ...prev, [addonId]: planId }));
    setSelectedAddons((prev) => ({ ...prev, [addonId]: true }));
  };

  const totalEUR = pricingData.addons.reduce((sum, addon) => {
    if (!selectedAddons[addon.id]) return sum;
    const plan = addon.plans.find((p) => p.id === selectedPlans[addon.id]) || addon.plans[0];
    return sum + plan.price;
  }, 0);

  const totalMeons = 0;

  return (
    <div className="min-h-screen bg-[var(--bg-background)] font-sans flex flex-col items-center py-10 px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'DM Serif Display', serif; }
      `}</style>

      <div className="w-full max-w-6xl space-y-6 ">

        {/* Free Plan Banner */}
        <div className="bg-[var(--bg-card)]/10 rounded-2xl border border-[var(--border)] shadow-sm px-6 py-5 text-center ">
          <h2 className="display-font text-xl text-[var(--text-dim)] mb-2">
            {pricingData.freeplan.name}{" "}
            <span className="inline-block bg-gray-100 text-[var(--text-dim2)] text-sm font-semibold px-2 py-0.5 rounded-full align-middle">
              {pricingData.freeplan.badge}
            </span>
          </h2>
          <p className="text-sm text-[var(--text-dim2)] flex flex-wrap justify-center gap-x-2 gap-y-1">
            {pricingData.freeplan.features.map((f, i) => (
              <span key={i}>
                {f}
                {i < pricingData.freeplan.features.length - 1 && (
                  <span className="ml-2 text-gray-300">●</span>
                )}
              </span>
            ))}
          </p>
          <button className="mt-3 text-sm text-violet-600 font-semibold hover:underline transition-all">
            {pricingData.freeplan.cta}
          </button>
        </div>

        {/* Enhance Section */}
        <div className="rounded-2xl px-6 py-6 w-full">
          <div className="text-center mb-6">
            <h2 className="display-font text-2xl text-[var(--text-dim)]">Enhance your experience</h2>
            <p className="text-sm text-[var(--text-dim2)] mt-1">Add options to maximize your chances.</p>
          </div>

          {/* Addon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[var(--text-dim)]">
  {pricingData.addons.map((addon) => (
    <AddonCard
      key={addon.id}
      addon={addon}
      selected={!!selectedAddons[addon.id]}
      onToggle={toggleAddon}
      selectedPlan={selectedPlans[addon.id]}
      onPlanChange={handlePlanChange}
    />
  ))}
</div>

          {/* Footnotes */}
          <ul className="mt-6 space-y-2">
            {pricingData.footnotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-dim2)]">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer / Total Bar */}
        <div className=" bottom-4 bg-[var(--bg-card)]/10 rounded-2xl border border-[var(--border)] shadow-lg px-6 py-4 flex items-center justify-between">
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-[var(--text-dim)] font-medium uppercase tracking-wider">Total (EUR)</p>
              <p className="text-2xl font-bold text-[var(--text-dim2)]">
                €{totalEUR.toFixed(2)}
                <span className="text-sm font-normal text-[var(--text-dim2)]">/mo</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--text)] font-medium uppercase tracking-wider">Total Meons</p>
              <p className="text-2xl font-bold text-[var(--text)]">{totalMeons.toFixed(2)}</p>
            </div>
          </div>
          <button    onClick={() => navigate("/subscription2")}
            className={`px-8 py-3 rounded-xl font-bold text-[var(--text)] text-sm transition-all duration-300 shadow-md
              ${totalEUR > 0
                ? "bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
                : "bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
              }`}
              
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}