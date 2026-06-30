import React from "react";
import Navbar from "../Navbar/Navbar";
import Right from "../../Components/UserProfile/layout/Right";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import coins from "/Image/coins.png";
import coin from "/Image/coin.png";

// product images
import rose from "/Image/rose.png";
import boost from "/Image/boost.png";
import crown from "/Image/crown.png";
import heart from "/Image/heart1.png";
import diamond from "/Image/diamond.png";
import ghost from "/Image/ghost.png";
import { useSelector } from "react-redux";
import { getMeonBalanceThunk } from "../Redux/meonsSlice";

import { useDispatch } from "react-redux";
import { spendMeonsThunk } from "../Redux/meonsSlice";
import { useTranslation } from "react-i18next";

const SpendMeons = () => {
  const { t } = useTranslation();

  const [selectedItem, setSelectedItem] = React.useState(null);

  const [quantity, setQuantity] = React.useState(1);


  const dispatch = useDispatch();
  const { balance } = useSelector(
    (state) => state.meon
  );

  const currentBalance = balance?.data?.meons || 0;

  React.useEffect(() => {

    dispatch(getMeonBalanceThunk());

  }, [dispatch]);

  const [showSuccess, setShowSuccess] = React.useState(false);
  const [lastPurchase, setLastPurchase] = React.useState(0);



  const navigate = useNavigate();

  const handlePurchase = async () => {

    // TOTAL COST
    const total = selectedItem.price * quantity;

    // CHECK BALANCE
    if (currentBalance < total) {

      alert(t('spendMeons.not_enough_meons'));

      return;
    }

    try {

      // API CALL
      const result = await dispatch(
        spendMeonsThunk({
          amount: total,
          reason: `Purchased ${selectedItem.name}`,
        })
      );

      console.log(result);

      // SUCCESS
      if (result.meta.requestStatus === "fulfilled") {



        // SHOW SUCCESS POPUP
        setLastPurchase(total);

        setShowSuccess(true);

        // RESET
        setSelectedItem(null);

        setQuantity(1);

      } else {

        console.log(result.payload);

        alert(t('spendMeons.purchase_failed'));
      }

    } catch (error) {

      console.log(error);

      alert(t('spendMeons.something_went_wrong'));
    }
  };
  const products = [
    { name: "Red Rose", price: 20, img: rose },
    { name: "Profile Boost", price: 199, img: boost },
    { name: "VIP Gold", price: 3550, img: crown },
    { name: "Super Like", price: 60, img: heart },
    { name: "Crystal Diamond", price: 60, img: diamond },
    { name: "Invisible Mode", price: 3550, img: ghost },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-background)] border border-[var(--border)] ">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2">

          <div className="bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-[20px] p-6">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => navigate("/wallet")}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition"
              >
                <ArrowLeft size={18} className="text-gray-700" />
              </button>

              <h2 className="text-2xl font-semibold text-[var(--text-dim)]">
                {t('spendMeons.setting')}
              </h2>
            </div>

            {/* TITLE */}
            <p className="text-sm font-semibold text-[var(--text-dim2)] mb-4">
              {t('spendMeons.spend_meons')}
            </p>

            {/* WALLET CARD (REUSE SAME) */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-[#D79098] via-[#9B85C6] to-[#5F7BF4] flex items-center justify-between overflow-hidden mb-6">

              <div>
                <p className="text-xs text-[var(--text-dim)] mb-2">
                  {t('spendMeons.meons_balance')}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img src={coin} className="" />
                  </div>
                  <h1 className="text-[28px] font-bold text-[var(--text-dim)]">
                    {balance?.data?.meons?.toLocaleString() || 0}
                  </h1>
                </div>
              </div>

              <div className="relative w-[50%] h-[100px]">
                <img
                  src={coins}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] translate-x-11 object-contain"
                />
              </div>
            </div>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {products.map((item, i) => (
                <div
                  key={i}
                  className="bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-xl p-3 shadow-sm"
                >

                  {/* IMAGE */}
                  <div className="h-[120px] rounded-lg overflow-hidden mb-3">
                    <img
                      src={item.img}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <p className="text-[var(--text-dim)] font-medium text-sm">
                    {t(`spendMeons.product_${i}_name`)}
                  </p>

                  {/* PRICE */}
                  <div className="flex items-center gap-1 text-sm text-[var(--text-dim)] mb-3">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <img src={coin} className=" object-contain" />
                    </div>
                    {item.price}
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setQuantity(1);
                    }}
                    className="w-full py-2 rounded-lg text-white text-sm bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
                  >
                    {t('spendMeons.buy')}
                  </button>

                </div>
              ))}

            </div>

            {/* FOOTER */}
            <p className="text-xs text-center text-[var(--text-dim)] mt-4">
              {t('spendMeons.disclaimer')}
            </p>

          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div>
          <Right />
        </div>

      </div>
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50">

          <div className="relative w-[450px] max-w-[90%] bg-[var(--bg-background)] rounded-[24px] p-5 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide

">
            {/* CLOSE */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white flex items-center justify-center"
            >
              <X size={20} className="text-gray-600" />
            </button>

            {/* TITLE */}
            <h2 className="text-xl font-semibold text-[var(--text-dim)] mb-8">
              {t('spendMeons.item_details')}
            </h2>

            {/* IMAGE */}
            <div className="flex justify-center">
              <div className="w-[180px] h-[180px] rounded-[24px] overflow-hidden shadow-xl">
                <img
                  src={selectedItem.img}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* NAME */}
            <h3 className="text-center text-4xl font-bold text-[var(--text-dim)] mt-8">
              {selectedItem.name}
            </h3>

            {/* BADGE */}
            <div className="flex justify-center mt-3">
              <span className="px-4 py-1 border border-[var(--border)] rounded-full text-sm text-[var(--text-dim2)]">
                {t('spendMeons.rare_item')}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-center text-[var(--text-dim2)] max-w-[500px] mx-auto mt-6 leading-8">
              {t('spendMeons.description')}
            </p>

            {/* PRICE BOX */}
            <div className="bg-[var(--bg-card)]/10 rounded-2xl border border-[var(--border)] p-5 mt-6">

              {/* PRICE */}
              <div className="text-center">
                <p className="text-2xl font-semibold text-[var(--text-dim)]">
                  {t('spendMeons.price_per_unit')}
                </p>

                <div className="flex items-center justify-center gap-1 mt-3">
                  <img src={coin} className="w-5 h-5 object-contain" />

                  <span className="text-4xl font-bold text-[var(--text-dim2)]">
                    {selectedItem.price}
                  </span>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="h-[1px] bg-[var(--border)] my-5"></div>

              {/* BALANCE */}
              <div className="text-center">
                <p className="text-xl font-semibold text-[var(--text-dim)]">
                  {t('spendMeons.your_current_balance')}
                </p>

                <div className="flex items-center justify-center gap-1 mt-2">
                  <img src={coin} className="w-4 h-4 object-contain" />

                  <span className="text-3xl font-bold text-[var(--text-dim2)]">
                    {currentBalance.toLocaleString()}
                  </span>
                </div>
              </div>

            </div>
            <div className="bg-[var(--bg-card)]/10 rounded-2xl border border-[var(--border)] p-5 mt-4">

              <div className="flex items-center justify-between">

                <p className="text-xl font-medium text-[var(--text-dim)]">
                  {t('spendMeons.quantity')}
                </p>

                <div className="flex items-center gap-4">

                  <button
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                    className="w-8 h-8 rounded-full bg-[var(--bg)] text-xl"
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold bg-[var(--bg)]">
                    {quantity}
                  </span>

                  <button
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                    className="w-8 h-8 rounded-full bg-[var(--bg)] text-xl"
                  >
                    +
                  </button>

                </div>
              </div>

            </div>
            <div className="mt-5">

              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-medium text-[var(--text-dim)]">
                  {t('spendMeons.total_cost')}
                </p>

                <div className="flex items-center gap-1">
                  <img src={coin} className="w-4 h-4 object-contain" />

                  <span className="text-2xl font-bold text-[var(--text-dim)]">
                    {selectedItem.price * quantity}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full py-3 rounded-xl text-white text-lg font-medium bg-gradient-to-r from-[#D79098] via-[#9B85C6] to-[#5F7BF4]"
              >
                {t('spendMeons.confirm_purchase')}
              </button>

            </div>
          </div>
        </div>
      )}


      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="relative w-[350px] bg-[var(--card)] rounded-[28px] p-6 shadow-2xl">

            {/* CLOSE */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-5 right-5 text-[var(--text)]"
            >
              <X size={24} />
            </button>

            {/* COIN */}
            <div className="flex justify-center mt-6 relative">

              {/* DECORATION DOTS */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[220px] h-[220px] rounded-full relative">

                  <span className="absolute top-4 left-1/2 w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="absolute top-14 right-5 w-2 h-2 bg-red-400 rounded-full"></span>
                  <span className="absolute bottom-10 left-4 w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="absolute bottom-6 right-10 w-2 h-2 bg-pink-400 rounded-full"></span>
                  <span className="absolute top-20 left-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="absolute bottom-14 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>

                </div>
              </div>

              {/* MAIN COIN */}
              <img
                src={coin}
                className="w-[140px] h-[140px] object-contain relative z-10"
              />
            </div>

            {/* TITLE */}
            <h2 className="text-center text-4xl font-bold text-[var(--text)] mt-6">
              {t('spendMeons.purchase_successful')}
            </h2>

            {/* DEDUCTED */}

            <div className="flex items-center justify-center gap-2 border border-gray-200 rounded-full py-2 px-4 w-fit mx-auto mt-5 bg-white">

              <img
                src={coin}
                className="w-5 h-5 object-contain"
              />

              <span className="text-black text-sm font-medium">
                {t('spendMeons.deducted', { amount: lastPurchase })}
              </span>

            </div>

            {/* BUTTONS */}
            <div className="mt-10 space-y-3">

              {/* USE NOW */}
              <button
                className="w-full py-3 rounded-xl text-white text-lg font-medium bg-gradient-to-r from-[#D79098] via-[#9B85C6] to-[#5F7BF4]"
              >
                {t('spendMeons.use_now')}
              </button>

              {/* BACK */}
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full py-3 rounded-xl border border-[#FFB39F] text-[#FFB39F] text-lg font-medium"
              >
                {t('spendMeons.back_to_wallet')}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpendMeons;
