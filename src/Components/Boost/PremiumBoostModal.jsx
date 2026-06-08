import React, { useState } from "react";
import { X, Zap } from "lucide-react";
import BoostFlowModal from "./BoostFlowModal";
const PremiumBoostModal = ({ isOpen, onClose, data = {} }) => {
    const [selectedBoost, setSelectedBoost] = useState(null);
    const [showBoostFlow, setShowBoostFlow] = useState(false);
    if (!isOpen) return null;

    const {
        title = "Premium Boost",
        subtitle = "Get Noticed",
        description = "Up to 10x more profile views and instant matches.",
        boosts = [
            { id: 1, time: "30", unit: "Min", price: "199 Meons" },
            { id: 2, time: "1", unit: "hour", price: "349 Meons" },
            { id: 3, time: "2", unit: "hour", price: "599 Meons" },
            { id: 4, time: "4", unit: "hour", price: "999 Meons" },
        ],
        packs = [
            { id: 1, title: "3x 30min Boosts", save: "Save 15%", price: "499 Meons" },
            { id: 2, title: "5x 30min Boosts", save: "Save 25%", price: "799 Meons", best: true },
            { id: 3, title: "10x 30min Boosts", save: "Save 25%", price: "€14.99" },
        ],
        vip = {
            title: "VIP Pass",
            name: "Unlimited Boost",
            validity: "Valid for 7 Days",
            price: "€ 39.99",
            features: [
                "Minimum 8 characters",
                "At least 1 uppercase letter",
                "At least 1 number",
            ],
        },
        total = "1208",
        balance = "€891.00",
    } = data;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="w-[720px] max-w-[95%] rounded-2xl bg-[var(--card)] text-[var(--text)] p-6 shadow-xl relative">

                {/* Header */}
                <button onClick={onClose} className="absolute right-5 top-5">
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                <h2 className="text-center text-sm text-gray-500">{title}</h2>
                <h1 className="text-center text-2xl font-semibold">{subtitle}</h1>
                <p className="text-center text-gray-500 text-sm mt-1">{description}</p>

                {/* Single Boosts */}
                <div className="mt-5">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Single Boosts</h3>
                        <span className="text-xs bg-purple-100 text-purple-500 px-2 py-1 rounded-full">
                            One-Time use
                        </span>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {boosts.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedBoost(item.id)}
                                className={`cursor-pointer rounded-xl border p-3 transition
                  ${selectedBoost === item.id
                                        ? "border-orange-400 bg-orange-50"
                                        : "border-gray-200"
                                    }`}
                            >
                                <h4 className="text-lg font-semibold">{item.time}</h4>
                                <p className="text-xs text-gray-500">{item.unit}</p>
                                <p className="text-sm mt-2">{item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Packs + VIP */}
                <div className="grid grid-cols-2 gap-4 mt-6">

                    {/* Packs */}
                    <div>
                        <h3 className="font-medium mb-2">Value packs</h3>

                        {packs.map((p) => (

                            <div key={p.id} className="border rounded-xl p-3 mb-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-sm">{p.title}</p>
                                    <p className="text-xs text-gray-500">{p.save}</p>
                                </div>
                                <p className="font-medium">{p.price}</p>

                                {p.best && (
                                    <span className="absolute ml-[-30px] mt-[-50px] text-[10px] bg-yellow-400 px-2 py-0.5 rounded-full">
                                        Best Value
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* VIP */}
                    <div className="rounded-2xl p-4 text-white bg-gradient-to-br from-[#291A3B] to-[#140D1F]">
                        <p className="text-xs text-purple-300">{vip.title}</p>
                        <h3 className="text-lg font-semibold">{vip.name}</h3>
                        <p className="text-xs mb-2">{vip.validity}</p>

                        <ul className="text-xs space-y-1 mb-3">
                            {vip.features.map((f, i) => (
                                <li key={i}>✔ {f}</li>
                            ))}
                        </ul>

                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{vip.price}</span>
                            <button className="bg-white text-black px-3 py-1 rounded-lg text-sm">
                                Go VIP
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between mt-6 text-sm">
                    <p>Total Meons: <span className="font-semibold">{total}</span></p>
                    <p>Balance: <span className="font-semibold">{balance}</span></p>
                </div>

                {/* Button */}
                <button
                    onClick={() => setShowBoostFlow(true)}
                    className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-indigo-500 text-white font-medium flex items-center justify-center gap-2"
                >
                    <Zap className="w-4 h-4" />
                    Active Boost
                </button>
            </div>
            <BoostFlowModal
                isOpen={showBoostFlow}
                onClose={() => setShowBoostFlow(false)}
            />
        </div>
    );
};

export default PremiumBoostModal;