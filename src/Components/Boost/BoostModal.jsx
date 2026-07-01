import React from "react";
import { X, Eye } from "lucide-react";
import { useState } from "react";
import PremiumBoostModal from "./PremiumBoostModal";
import { useTranslation } from "react-i18next";
const BoostModal = ({
    isOpen,
    onClose,
    onBoost,
    data = {},
}) => {
    const { t } = useTranslation();
    if (!isOpen) return null;
const [open, setOpen] = useState(false);

    const {
        title = t('boost.title'),
        subtitle = t('boost.subtitle'),
        stats = [
            {
                icon: <Eye />,
                title: t('boost.stat_views_title'),
                desc: t('boost.stat_views_desc'),
            },
            {
                icon: "💗",
                title: t('boost.stat_likes_title'),
                desc: t('boost.stat_likes_desc'),
            },
            {
                icon: "⭐",
                title: t('boost.stat_favorites_title'),
                desc: t('boost.stat_favorites_desc'),
            },
        ],
        buttonText = t('boost.boost_now'),
        secondaryText = t('boost.maybe_later'),
    } = data;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            {/* Modal */}
            <div className="relative w-[380px] rounded-2xl bg-[var(--card)] p-6 shadow-xl">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-black"
                >
                    <X size={18} />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 text-3xl">
                        ⚡
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-xl font-semibold">{title}</h2>
                <p className="text-center text-gray-500 mt-1 text-sm">
                    {subtitle}
                </p>

                {/* Stats */}
                <div className="mt-5 space-y-3">

                    {/* First big card */}
                    <div className="flex items-start gap-3 rounded-xl border p-3">
                        <span className="text-lg">{stats[0]?.icon}</span>
                        <div>
                            <h4 className="font-medium">{stats[0]?.title}</h4>
                            <p className="text-xs text-gray-500">
                                {stats[0]?.desc}
                            </p>
                        </div>
                    </div>

                    {/* Two small cards */}
                    <div className="grid grid-cols-2 gap-3">
                        {stats.slice(1).map((item, i) => (
                            <div
                                key={i}
                                className="rounded-xl border p-3"
                            >
                                <span>{item.icon}</span>
                                <h4 className="mt-1 text-sm font-medium">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-gray-500">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={() => setOpen(true)}
                    className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#D79098] to-[#5F7BF4] py-2.5 text-white font-medium"
                >
                    {buttonText}

                </button>

                {/* Secondary */}
                <p
                    onClick={onClose}
                    className="mt-3 text-center text-sm text-gray-500 cursor-pointer"
                >
                    {secondaryText}
                </p>
            </div>

<PremiumBoostModal
  isOpen={open}
  onClose={() => setOpen(false)}
/>
        </div>
    );
};

export default BoostModal;
