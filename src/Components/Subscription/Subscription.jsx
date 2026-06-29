import React, { useState } from "react";
import Navbar from '../Navbar/Navbar'
import Addons from "./Addons";
import { useTranslation } from "react-i18next";

const plansData = [
  {
    id: 1,
    name: "Dégustation",
    nameKey: "subscription.plan1.name",
    priceMonthly: 19.99,
    priceYearly: 149.9,
    save: "subscription.plan1.save",
    features: [
      "subscription.plan1.feature1",
      "subscription.plan1.feature2",
      "subscription.plan1.feature3",
      "subscription.plan1.feature4",
      "subscription.plan1.feature5",
      "subscription.plan1.feature6",
      "subscription.plan1.feature7",
      "subscription.plan1.feature8",
    ],
  },
  {
    id: 2,
    name: "Privilège",
    nameKey: "subscription.plan2.name",
    priceMonthly: 29.99,
    priceYearly: 269.91,
    save: "subscription.plan2.save",
    popular: true,
    features: [
      "subscription.plan2.feature1",
      "subscription.plan2.feature2",
      "subscription.plan2.feature3",
      "subscription.plan2.feature4",
      "subscription.plan2.feature5",
      "subscription.plan2.feature6",
      "subscription.plan2.feature7",
      "subscription.plan2.feature8",
    ],
  },
  {
    id: 3,
    name: "Cercle Privé",
    nameKey: "subscription.plan3.name",
    priceMonthly: 39.99,
    priceYearly: 359.99,
    save: "subscription.plan3.save",
    features: [
      "subscription.plan3.feature1",
      "subscription.plan3.feature2",
      "subscription.plan3.feature3",
      "subscription.plan3.feature4",
      "subscription.plan3.feature5",
      "subscription.plan3.feature6",
      "subscription.plan3.feature7",
      "subscription.plan3.feature8",
    ],
  },
];

function Subscription() {
  const { t } = useTranslation();
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [activeTab, setActiveTab] = useState("Dégustation");

  return (
    <>
      <Navbar />
      <div>
        <div className="min-h-screen bg-[var(--bg-background)] flex flex-col items-center py-10 px-4">

          {/* Header */}
          <h1 className="text-2xl font-bold mb-2 text-[var(--text-dim)]">{t("subscription.title")}</h1>
          <p className="text-[var(--text-dim2)] mb-6 text-center max-w-md">
            {t("subscription.subtitle")}
          </p>
          <div className="flex bg-[var(--bg-card)]/10  rounded-full p-1 mb-6">
            {plansData.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActiveTab(plan.name)}
                className={`px-4 py-2 rounded-full text-sm transition ${activeTab === plan.name
                    ? "bg-[#009C00] text-[var(--text-dim)]"
                    : " text-[var(--text-dim)]"
                  }`}
              >
                {t(plan.nameKey)}
              </button>
            ))}
          </div>


          {/* Toggle */}
          <div className="flex items-center gap-3 mb-8 text-[var(--text-dim)]">
            <span className={!isYearly ? "font-semibold" : "text-[var(--text-dim2)]"}>
              {t("subscription.monthly")}
            </span>

            <div
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 bg-[var(--bg-background)] border border-[var(--border)] rounded-full flex items-center cursor-pointer p-1"
            >
              <div
                className={`w-4 h-4 bg-[var(--bg-card)] rounded-full shadow-md transform duration-300 ${isYearly ? "translate-x-6" : ""
                  }`}
              ></div>
            </div>

            <span className={isYearly ? "font-semibold" : "text-[var(--text-dim2)]"}>
              {t("subscription.annual")}
            </span>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3  gap-6 w-full max-w-6xl">
            {plansData.map((plan) => {
              const price = isYearly
                ? plan.priceYearly
                : plan.priceMonthly;

              return (
                <div
                  key={plan.id}
                  className={`relative bg-[var(--bg-card)]/10 rounded-xl shadow-md p-6 border transition ${selectedPlan === plan.id
                      ? "border border-[var(--border)]scale-105"
                      : "border-gray-200"
                    }`}
                >
                  {/* Save Badge */}
                  <span className="absolute top-4 right-4 bg-[#009C00] text-[var(--text)] text-xs px-2 py-1 rounded">
                    {t(plan.save)}
                  </span>

                  {/* Title */}
                  <h2 className="text-lg font-semibold mb-2 text-[var(--text-dim)]">{t(plan.nameKey)}</h2>

                  {/* Price */}
                  <p className="text-2xl font-bold mb-1 text-[var(--text-dim)]">
                    €{price}
                    <span className="text-sm  text-[var(--text-dim)]">{t("subscription.perYear")}</span>
                  </p>

                  <p className="text-[var(--text-dim2)] text-sm mb-4">
                    {t("subscription.unlockMore")}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-[var(--text-dim2)]">
                        <span className="text-green-500 mr-2">✔</span>
                        {t(feature)}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-2 rounded-lg text-[var(--text)] transition ${selectedPlan === plan.id
                        ? "bg-gradient-to-r from-[#D79098] to-[#5F7BF4]" : "bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
                      }`}
                  >
                    {t("subscription.select")}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <Addons />
      </div>

    </>
  )
}

export default Subscription
