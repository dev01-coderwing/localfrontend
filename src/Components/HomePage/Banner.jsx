// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

// import "swiper/css";

// const banners = [
//   {
//     id: 1,
//     tag: "🎄 Christmas Special",
//     title: "Spread love this festive season",
//     button: "Unwrap Offer",
//     discount: "-20%",
//     subText: "on subscription",
//     active: "🎁 Active: Feb 14 00:00 – Feb 15 00:00 · user local time",
//     bg: "from-green-800 via-green-900 to-black",
//   },
//   {
//     id: 2,
//     tag: "🔥 Limited Offer",
//     title: "Upgrade to Premium today",
//     button: "Get Started",
//     discount: "-30%",
//     subText: "on yearly plan",
//     active: "⚡ Offer expires in 24 hours",
//     bg: "from-blue-700 via-slate-900 to-black",
//   },
//   {
//     id: 3,
//     tag: "🎁 New User",
//     title: "Get exclusive membership perks",
//     button: "Claim Now",
//     discount: "-15%",
//     subText: "for first purchase",
//     active: "💫 Available for new users only",
//     bg: "from-purple-700 via-indigo-900 to-black",
//   },
// ];

// export default function Banner() {
//   return (
//     <div className="w-full rounded-3xl overflow-hidden">
//       <Swiper
//         modules={[Autoplay]}
//         slidesPerView={1}
//         loop
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//         }}
//       >
//         {banners.map((banner) => (
//           <SwiperSlide key={banner.id}>
//             <div
//               className={`bg-gradient-to-r ${banner.bg} text-white relative min-h-[260px] p-8 md:p-12`}
//             >
//               <div className="flex flex-col md:flex-row justify-between gap-8">
//                 {/* Left */}
//                 <div className="max-w-lg">
//                   <p className="text-sm text-white/80 mb-5">
//                     {banner.tag}
//                   </p>

//                   <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
//                     {banner.title}
//                   </h2>

//                   <button className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
//                     {banner.button}
//                     <span>→</span>
//                   </button>
//                 </div>

//                 {/* Right */}
//                 <div className="bg-white/15 backdrop-blur-md rounded-3xl px-8 py-6 self-start">
//                   <h1 className="text-4xl md:text-5xl font-bold">
//                     {banner.discount}
//                   </h1>

//                   <p className="text-sm text-white/80 mt-2">
//                     {banner.subText}
//                   </p>
//                 </div>
//               </div>

//               {/* Bottom Badge */}
//               <div className="absolute left-1/2 -translate-x-1/2 bottom-5 bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 text-xs md:text-sm text-pink-200">
//                 {banner.active}
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { getSeasonalBanners } from "../Redux/bannerSlice";

export default function Banner() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
const BASE_URL = "http://35.180.139.208:3000";
  const { banners, loading } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(getSeasonalBanners());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-64 rounded-3xl bg-gray-200 animate-pulse" />
    );
  }

  return (
    <div className="w-full rounded-3xl overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {banners?.map((banner) => (
 <SwiperSlide key={banner.id}>
  <div className="relative min-h-[260px] md:min-h-[350px] rounded-3xl overflow-hidden">

    {/* Background Image */}
    <img
      src={`${BASE_URL}/${banner.imageUrl}`}
      alt={banner.title}
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Content */}
    <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 h-full p-8 md:p-12 text-white">

      {/* Left */}
      <div className="max-w-lg flex flex-col justify-center">
        <p className="text-sm text-white/80 mb-5">
          {t('banner.seasonal_offer')}
        </p>

        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          {banner.title}
        </h2>

        {banner.subtitle && (
          <p className="text-white/80 mb-4">
            {banner.subtitle}
          </p>
        )}

        {banner.description && (
          <p className="text-white/70 mb-6">
            {banner.description}
          </p>
        )}

        <button className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-xl font-semibold w-fit">
          {t('banner.learn_more')}
        </button>
      </div>

    </div>

    {/* Bottom Badge */}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-5 bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 text-xs md:text-sm text-pink-200 z-10">
      {t('banner.active_from')} {new Date(banner.startDate).toLocaleDateString()}
    </div>

  </div>
</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

