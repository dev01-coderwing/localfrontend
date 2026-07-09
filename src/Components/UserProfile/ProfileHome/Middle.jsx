import { Crown, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Wallet = "/Image/Wallet.png";
function Middle({ data }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const iconMap = {
    crown: <Crown size={16} />,
    gift: <Gift size={16} />,
  };

  return (
    <div className="space-y-5">
      {/* Balance */}
      <div
        onClick={() => navigate("/wallet")}
        className="relative overflow-hidden  w-full h-[138px]  rounded-[24px]  bg-gradient-to-r from-[#F4F1F7] via-[#E6DDF2] to-[#DDE6F6]  border border-[var(--border)] shadow-[0_4px_12px_rgba(0,0,0,0.05)] cursor-pointer hover:scale-[1.02] transition" >
        {/* 🪙 Coin Background */}
        <img
          src="/Image/coin.png"
          className="absolute right-[-100px] bottom-[-92px] w-[180px] h-[180px] opacity-30 pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-5">
          <img src={Wallet} className="w-8 mb-2" />

          <p className="text-sm text-[var(--text-dim2)] leading-none">
            {data.balance.label}
          </p>

          <h2 className="text-[26px] font-semibold mt-1 text-[var(--text-dim)] leading-none">
            {data.balance.amount}
          </h2>
        </div>
      </div>

      {/* Usage */}
      <div className="bg-[var(--bg-card)]/10 rounded-3xl p-5 shadow-sm">
        <div className="flex justify-between text-xs text-[var(--text-dim2)]">
          <span>{data.usage.title}</span>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="mt-2 text-[var(--text-dim)] font-semibold">
            {data.usage.usedTime}
            <span className="text-[var(--text-dim2)] text-xs ml-1">
              /{data.usage.totalTime}
            </span>
          </h2>

          <span className="text-purple-500 bg-purple-100 px-2 h-[18px] rounded-md text-[10px] flex items-center border border-purple-400">
            {t('profile.used_percent', { percent: data.usage.usedPercent })}
          </span>
        </div>

        <div className="w-full bg-white h-3 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-purple-500 h-full rounded-full"
            style={{ width: `${data.usage.usedPercent}%` }}
          />
        </div>

        <p className="text-[10px] text-[var(--text-dim)] mt-2 text-right">
          {data.usage.remaining}
        </p>
      </div>
      {/* Buttons */}
      {data.buttons.map((btn, index) => (
        <button
          key={index}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition hover:opacity-90
            ${btn.style === "gradient"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              : "bg-gray-600 text-white"
            }`}
        >
          {iconMap[btn.icon]}
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default Middle;
