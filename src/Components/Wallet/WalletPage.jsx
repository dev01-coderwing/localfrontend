import React from "react";
import Navbar from "../Navbar/Navbar";
import Right from "../../Components/UserProfile/layout/Right"; // adjust path
import { ArrowLeft, CalendarDays } from "lucide-react";
import coins from "/Image/coins.png"; // use your coin stack image
import coin from "/Image/coin.png";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMeonBalanceThunk, getTransactionsThunk } from "../Redux/meonsSlice";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WalletPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
const [showAll, setShowAll] = React.useState(false);
  const { balance, transactions, loading, error } = useSelector(
    (state) => state.meon,
  );

  useEffect(() => {
    dispatch(getMeonBalanceThunk());
    dispatch(getTransactionsThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[var(--bg-background)] border border-[var(--border)] ">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2">
          <div className="bg-[var(--bg-card)]/10 rounded-[20px] p-6 shadow-sm border border-[var(--border)]">
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
                <ArrowLeft size={18} className="text-gray-700" />
              </button>

              <h2 className="text-2xl font-semibold text-[var(--text-dim)]">
                {t('wallet.setting')}
              </h2>
            </div>

            {/* TITLE */}
            <h3 className="text-sm text-[var(--text-dim)] mb-4">
              {t('wallet.meons_wallet')}
            </h3>

            {/* WALLET CARD */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-[#D79098] via-[#9B85C6] to-[#5F7BF4] flex items-center justify-between overflow-hidden">
              {/* LEFT */}
              <div>
                <p className="text-xs text-[var(--text-dim)] mb-2">
                  {t('wallet.meons_balance')}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={coin} // 👈 your coin image path
                      alt="coin"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h1 className="text-4xl font-bold text-[var(--text)]">
                    {balance?.data?.meons?.toLocaleString() || 0}
                  </h1>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative w-[50%] h-[100px]">
                <img
                  src={coins}
                  alt="coins"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] translate-x-11 object-contain pointer-events-none"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => navigate("/earn-meons")}
                className="flex-1 py-3 rounded-xl border border-[#FCA5A5] text-[#F87171]"
              >
                {t('wallet.earn_meons')}
              </button>

              <button
                onClick={() => navigate("/spend-meons")}
                className="flex-1 py-3 rounded-xl text-white bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
              >
                {t('wallet.spend_meons')}
              </button>
            </div>

            {/* HISTORY */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm text-[var(--text-dim)]">
                  {t('wallet.recent_history')}
                </h4>

<button
  onClick={() => setShowAll(!showAll)}
  className="text-xs text-blue-500"
>
  {showAll ? t('wallet.show_less') : t('wallet.view_all')}
</button>
              </div>
              {(showAll
  ? transactions?.data
  : transactions?.data?.slice(0, 5)
)?.map((item, index) => (
                <div
                  key={index}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex justify-between items-center mb-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CalendarDays size={18} className="text-blue-500" />
                    </div>

                    <div>
                      <p className="font-medium text-[var(--text)]">
                        {item.reason}
                      </p>
                      <p className="text-xs text-[var(--text-dim)]">
                        {item.createdAt}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`font-semibold ${
                      item.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.amount > 0 ? "+" : "-"}
                    {Math.abs(item.amount)}
                  </p>
                </div>
              ))}

              {/* FOOTER NOTE */}
              <p className="text-xs text-[var(--text-dim)] text-center mt-4">
                {t('wallet.disclaimer')}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div>
          <Right />
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
