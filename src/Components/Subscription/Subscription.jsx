import React, { useState } from "react";
import Navbar from '../Navbar/Navbar'
import Addons from "./Addons";
const plansData = [
  {
    id: 1,
    name: "Dégustation",
    priceMonthly: 19.99,
    priceYearly: 149.9,
    save: "Save 17%",
    features: [
      "50 questions",
      "5 Mode Acting",
      "Unlimited swipes",
      "Compatibility: 0-50% max",
      "2 months Iucasope",
      "2 Moves/day",
      "Bonus: 1 Iucasope Guide",
      "Essential Badge",
    ],
  },
  {
    id: 2,
    name: "Privilège",
    priceMonthly: 29.99,
    priceYearly: 269.91,
    save: "Save 26%",
    popular: true,
    features: [
      "90 questions",
      "9 Mode Acting",
      "Unlimited swipes",
      "Compatibility: 0-65% max",
      "4 months Iucasope",
      "3 Moves/day",
      "Bonus: 2 Iucasope Guides",
      "Privilege Badge",
    ],
  },
  {
    id: 3,
    name: "Cercle Privé",
    priceMonthly: 39.99,
    priceYearly: 359.99,
    save: "Save 33%",
    features: [
      "130 questions",
      "13 Mode Acting",
      "Unlimited swipes",
      "Compatibility: 0-100% max",
      "6 months Iucasope",
      "4 Moves/day",
      "Bonus: 3 Iucasope Guides",
      "Elite Badge",
    ],
  },
];
function Subscription() {
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [activeTab, setActiveTab] = useState("Dégustation");

  return (
    <>
      <Navbar />
      <div>
        <div className="min-h-screen bg-[var(--bg-background)] flex flex-col items-center py-10 px-4">

          {/* Header */}
          <h1 className="text-2xl font-bold mb-2 text-[var(--text-dim)]">Reveal your perfect match</h1>
          <p className="text-[var(--text-dim2)] mb-6 text-center max-w-md">
            Choose a subscription to unlock more accurate compatibility and exclusive features.
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
                {plan.name}
              </button>
            ))}
          </div>


          {/* Toggle */}
          <div className="flex items-center gap-3 mb-8 text-[var(--text-dim)]">
            <span className={!isYearly ? "font-semibold" : "text-[var(--text-dim2)]"}>
              Monthly
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
              Annual
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
                    {plan.save}
                  </span>

                  {/* Title */}
                  <h2 className="text-lg font-semibold mb-2 text-[var(--text-dim)]">{plan.name}</h2>

                  {/* Price */}
                  <p className="text-2xl font-bold mb-1 text-[var(--text-dim)]">
                    €{price}
                    <span className="text-sm  text-[var(--text-dim)]">/year</span>
                  </p>

                  <p className="text-[var(--text-dim2)] text-sm mb-4">
                    Unlock more features and compatibility
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-[var(--text-dim2)]">
                        <span className="text-green-500 mr-2">✔</span>
                        {feature}
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
                    Select
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