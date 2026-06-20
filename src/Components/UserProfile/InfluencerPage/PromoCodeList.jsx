// import React, { useMemo, useState } from "react";
// import { X } from "lucide-react";

// /**
//  * FULLY RESPONSIVE PROMO HISTORY MODAL
//  * ✔ Mobile First
//  * ✔ Tablet Optimized
//  * ✔ Desktop Optimized
//  * ✔ Dynamic Data
//  * ✔ Scroll Support
//  * ✔ Responsive Typography
//  * ✔ Responsive Spacing
//  * ✔ Responsive Layout Switching
//  */

// const promoData = [
//   {
//     id: 1,
//     code: "SUMMER26",
//     createdAt: "Created Oct 12, 2025",
//     usage: "1,785",
//     earned: "€ 82.50",
//     status: "Request",
//   },
//   {
//     id: 2,
//     code: "WELCOME2026",
//     createdAt: "Created Dec 12, 2025",
//     usage: "1,785",
//     earned: "€ 82.50",
//     status: "Active",
//   },
//   {
//     id: 3,
//     code: "WELCOME2026",
//     createdAt: "Created Dec 12, 2025",
//     usage: "1,785",
//     earned: "€ 82.50",
//     status: "Expired",
//   },
// ];

// const tabs = ["All", "Active", "Expired", "Request"];

// const statusStyles = {
//   Active:
//     "bg-green-100 text-green-600 border border-green-200",
//   Expired:
//     "bg-red-100 text-red-500 border border-red-200",
//   Request:
//     "bg-blue-100 text-blue-600 border border-blue-200",
// };

// export default function PromoCodeList() {
//   const [activeTab, setActiveTab] = useState("All");

//   const filteredData = useMemo(() => {
//     if (activeTab === "All") return promoData;

//     return promoData.filter(
//       (item) =>
//         item.status.toLowerCase() === activeTab.toLowerCase()
//     );
//   }, [activeTab]);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 md:p-6">
//       {/* Modal Container */}
//       <div
//         className="
//           relative
//           w-full
//           max-w-[95vw]
//           sm:max-w-2xl
//           md:max-w-3xl
//           lg:max-w-4xl
//           xl:max-w-5xl
//           rounded-2xl
//           sm:rounded-3xl
//           bg-white
//           shadow-[0_20px_60px_rgba(0,0,0,0.25)]
//           max-h-[95vh]
//           overflow-hidden
//         "
//       >
//         {/* Scrollable Area */}
//         <div className="overflow-y-auto max-h-[95vh]">
//           {/* Close Button */}
//           <button
//             className="
//               absolute
//               right-3
//               top-3
//               sm:right-5
//               sm:top-5
//               flex
//               h-9
//               w-9
//               sm:h-10
//               sm:w-10
//               items-center
//               justify-center
//               rounded-full
//               border
//               border-gray-200
//               bg-white
//               text-gray-500
//               transition
//               hover:bg-gray-100
//             "
//           >
//             <X size={18} />
//           </button>

//           {/* Content */}
//           <div
//             className="
//               px-4
//               py-5
//               sm:px-6
//               sm:py-7
//               md:px-8
//               md:py-8
//               lg:px-10
//               lg:py-10
//             "
//           >
//             {/* Title */}
//             <h2
//               className="
//                 text-xl
//                 sm:text-2xl
//                 md:text-3xl
//                 font-semibold
//                 text-gray-900
//               "
//             >
//               Promo Code History
//             </h2>

//             {/* Tabs */}
//             <div
//               className="
//                 mt-5
//                 flex
//                 flex-wrap
//                 gap-2
//                 sm:gap-3
//               "
//             >
//               {tabs.map((tab) => {
//                 const isActive = activeTab === tab;

//                 return (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`
//                       rounded-full
//                       px-4
//                       py-2
//                       sm:px-5
//                       text-xs
//                       sm:text-sm
//                       font-medium
//                       transition-all
//                       duration-200
//                       border
//                       whitespace-nowrap
//                       ${
//                         isActive
//                           ? "bg-purple-500 text-white border-purple-500 shadow-md"
//                           : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
//                       }
//                     `}
//                   >
//                     {tab}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Promo Items */}
//             <div className="mt-6 sm:mt-8">
//               {filteredData.map((item, index) => (
//                 <div key={item.id}>
//                   {/* Item */}
//                   <div
//                     className="
//                       flex
//                       flex-col
//                       gap-6
//                       md:flex-row
//                       md:items-start
//                       md:justify-between
//                     "
//                   >
//                     {/* Left Section */}
//                     <div className="flex-1 min-w-0">
//                       <h3
//                         className="
//                           text-lg
//                           sm:text-xl
//                           md:text-2xl
//                           font-semibold
//                           text-gray-900
//                           break-words
//                         "
//                       >
//                         {item.code}
//                       </h3>

//                       <p
//                         className="
//                           mt-1
//                           text-xs
//                           sm:text-sm
//                           text-gray-400
//                         "
//                       >
//                         {item.createdAt}
//                       </p>

//                       <div className="mt-4 sm:mt-5">
//                         <p
//                           className="
//                             text-xs
//                             sm:text-sm
//                             text-gray-500
//                           "
//                         >
//                           Usage
//                         </p>

//                         <p
//                           className="
//                             mt-1
//                             text-2xl
//                             sm:text-3xl
//                             font-bold
//                             text-gray-900
//                           "
//                         >
//                           {item.usage}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Right Section */}
//                     <div
//                       className="
//                         flex
//                         flex-col
//                         items-start
//                         gap-4
//                         md:items-end
//                         md:text-right
//                         shrink-0
//                       "
//                     >
//                       {/* Status */}
//                       <span
//                         className={`
//                           inline-flex
//                           items-center
//                           justify-center
//                           rounded-full
//                           px-3
//                           py-1
//                           text-[11px]
//                           sm:text-xs
//                           font-semibold
//                           ${statusStyles[item.status]}
//                         `}
//                       >
//                         {item.status}
//                       </span>

//                       {/* Earnings */}
//                       <div>
//                         <p
//                           className="
//                             text-xs
//                             sm:text-sm
//                             text-gray-500
//                           "
//                         >
//                           Total Earned
//                         </p>

//                         <p
//                           className="
//                             mt-1
//                             text-2xl
//                             sm:text-3xl
//                             font-bold
//                             text-gray-900
//                           "
//                         >
//                           {item.earned}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Divider */}
//                   {index !== filteredData.length - 1 && (
//                     <div className="my-6 sm:my-8 border-t border-gray-200" />
//                   )}
//                 </div>
//               ))}

//               {/* Empty State */}
//               {filteredData.length === 0 && (
//                 <div
//                   className="
//                     py-12
//                     text-center
//                     text-sm
//                     sm:text-base
//                     text-gray-500
//                   "
//                 >
//                   No promo codes found.
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useMemo, useState } from "react";
import { X } from "lucide-react";

const promoData = [
  {
    id: 1,
    code: "SUMMER26",
    createdAt: "Created Oct 12, 2025",
    usage: "1,785",
    earned: "€ 82.50",
    status: "Request",
  },
  {
    id: 2,
    code: "WELCOME2026",
    createdAt: "Created Dec 12, 2025",
    usage: "1,785",
    earned: "€ 82.50",
    status: "Active",
  },
  {
    id: 3,
    code: "WELCOME2026",
    createdAt: "Created Dec 12, 2025",
    usage: "1,785",
    earned: "€ 82.50",
    status: "Expired",
  },
];

const tabs = ["All", "Active", "Expired", "Request"];

const statusStyles = {
  Active:
    "bg-green-100 text-green-600 border border-green-200",
  Expired:
    "bg-red-100 text-red-500 border border-red-200",
  Request:
    "bg-blue-100 text-blue-600 border border-blue-200",
};

export default function PromoCodeList({onClose}) {
  const [activeTab, setActiveTab] = useState("All");

  const filteredData = useMemo(() => {
    if (activeTab === "All") return promoData;

    return promoData.filter(
      (item) =>
        item.status.toLowerCase() === activeTab.toLowerCase()
    );
  }, [activeTab]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 md:p-6">
      {/* Modal Container */}
      <div
        className="
          relative
          w-full
          max-w-[95vw]
          sm:max-w-2xl
          md:max-w-3xl
          lg:max-w-4xl
          xl:max-w-5xl
          rounded-2xl
          sm:rounded-3xl
         bg-[var(--bg-background)]
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          h-[92vh]
          overflow-hidden
        "
      >
        {/* Close Button */}
        <button
         onClick={onClose}
          className="
            absolute
            right-3
            top-3
            sm:right-5
            sm:top-5
            flex
            h-8
            w-8
            sm:h-9
            sm:w-9
            items-center
            justify-center
            rounded-full
            border
            border-[var(--accent)]
            
            text-[var(--text-dim)]
            transition
            hover:bg-gray-100
            z-10
          "
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div
          className="
            h-full
            flex
            flex-col
            px-4
            py-4
            sm:px-6
            sm:py-5
            md:px-8
            md:py-6
            lg:px-10
            lg:py-7
          "
        >
          {/* Title */}
          <h2
            className="
              text-lg
              sm:text-xl
              md:text-2xl
              font-semibold
              text-[var(--text-dim)]
              pr-10
            "
          >
            Promo Code History
          </h2>

          {/* Tabs */}
          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-2
            "
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    rounded-full
                    px-3
                    py-1.5
                    sm:px-4
                    text-[11px]
                    sm:text-xs
                    font-medium
                    transition-all
                    duration-200
                    text-[var(--text-dim2)]
                    border
                    whitespace-nowrap
                    ${
                      isActive
                        ? "bg-purple-500 text-white border-purple-500 shadow-md"
                        : " border-[var(--border)] hover:bg-gray-100  text-[var(--text-dim)]"
                    }
                  `}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Promo Items */}
          <div className="mt-5 flex-1 flex flex-col justify-between">
            <div className="space-y-4 sm:space-y-5">
              {filteredData.map((item, index) => (
                <div key={item.id}>
                  {/* Item */}
                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                      md:flex-row
                      md:items-center
                      md:justify-between
                    "
                  >
                    {/* Left Section */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="
                          text-base
                          sm:text-lg
                          md:text-xl
                          font-semibold
                          text-[var(--text-dim)]
                          break-words
                        "
                      >
                        {item.code}
                      </h3>

                      <p
                        className="
                          mt-0.5
                          text-[11px]
                          sm:text-xs
                        text-[var(--text-dim2)]
                        "
                      >
                        {item.createdAt}
                      </p>

                      <div className="mt-3">
                        <p
                          className="
                            text-[11px]
                            sm:text-xs
                            text-[var(--text-dim2)]
                          "
                        >
                          Usage
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-xl
                            sm:text-2xl
                            font-bold
                            
                            text-[var(--text-dim)]
                          "
                        >
                          {item.usage}
                        </p>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div
                      className="
                        flex
                        flex-col
                        items-start
                        gap-3
                        md:items-end
                        md:text-right
                        shrink-0
                      "
                    >
                      {/* Status */}
                      <span
                        className={`
                          inline-flex
                          items-center
                          justify-center
                          rounded-full
                          px-3
                          py-1
                          text-[10px]
                          sm:text-[11px]
                          font-semibold
                          ${statusStyles[item.status]}
                        `}
                      >
                        {item.status}
                      </span>

                      {/* Earnings */}
                      <div>
                        <p
                          className="
                            text-[11px]
                            sm:text-xs
                            text-[var(--text-dim)]
                          "
                        >
                          Total Earned
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-xl
                            sm:text-2xl
                            font-bold
                            text-[var(--text-dim)]
                          "
                        >
                          {item.earned}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  {index !== filteredData.length - 1 && (
                    <div className="my-4 sm:my-5 border-t border-[var(--border)]" />
                  )}
                </div>
              ))}

              {/* Empty State */}
              {filteredData.length === 0 && (
                <div
                  className="
                    py-10
                    text-center
                    text-sm
                    sm:text-base
                    text-gray-500
                  "
                >
                  No promo codes found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
