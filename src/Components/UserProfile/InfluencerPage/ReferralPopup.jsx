



import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

const ReferralPopup = ({
  isOpen = true,
  onClose = () => {},
  totalReferrals = 42,
  totalEarnings = "€ 1,240.00",
  referrals = [
    {
      id: 1,
      name: "Mark Johnson",
      plan: "Privilège Plan",
      since: "Since jan 2025",
      status: "Active",
      duration: "6 Months",
      earned: "€ 82.50",
    },
    {
      id: 2,
      name: "Marcus Sterling",
      plan: "Cercle Privé Plan",
      since: "Since jan 2026",
      status: "Cancelled",
      duration: "2 Months",
      earned: "€ 12.00",
    },
  ],
}) => {
  const [search, setSearch] = useState("");

  const filteredReferrals = useMemo(() => {
    return referrals.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, referrals]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-5">
      <div className="relative w-full max-w-[900px] rounded-[28px] bg-[var(--bg-background)] shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center text-[var(--text-dim)] justify-center rounded-full border border-[var(--accent  )]   transition hover:bg-gray-100"
        >
          <X className="h-5 w-5  text-[var(--text-dim)]" />
        </button>

        {/* Main Content */}
        <div className="p-5 sm:p-7 md:p-10">
          
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[24px] font-semibold text-[var(--text-dim)]">
                My Referrals
              </h2>

              <p className="mt-3 text-[17px] text-[var(--text-dim)]">
                Tracking {totalReferrals} active referrals
              </p>
            </div>

            <div className="w-fit rounded-full mt-9 border border[var(--border)] px-4 py-1 text-[18px] font-semibold text-[var(--text-dim)]">
              {totalEarnings}
            </div>
          </div>

          {/* Search */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex h-[58px] flex-1 items-center rounded-2xl border border-[var(--accent)]  px-4">
              <Search className="h-5 w-5 text-[var(--text-dim)]" />

              <input
              onClick={() => console.log("input clicked")}
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ml-3 w-full bg-transparent text-[16px] text-[var(--text-dim)] outline-none placeholder:text-[var(--text-dim2)]"
              
              />
            </div>

            <button className="flex h-[58px] w-[58px] items-center justify-center rounded-2xl border border-[var(--border)] transition hover:bg-gray-50">
              <SlidersHorizontal className="h-6 w-6 text-[var(--text-dim)]" />
            </button>
          </div>

          {/* Referral List */}
          <div className="mt-7 flex max-h-[420px] flex-col overflow-y-auto pr-1">
            {filteredReferrals.map((item, index) => (
              <div key={item.id}>
                <div className="flex flex-col gap-5 py-5">
                  
                  {/* Top Section */}
                  <div className="flex items-start justify-between gap-4">
                    
                    {/* Left */}
                    <div className="flex gap-4">
                      <div className="h-[42px] w-[42px] rounded-full bg-black shrink-0" />

                      <div>
                        <h3 className="text-[24px] leading-none font-medium text-[var(--text-dim)]">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-[14px] text-[var(--text-dim2)]">
                          {item.plan} • {item.since}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div
                      className={`rounded-full px-4 py-1 text-[14px] font-medium ${
                        item.status === "Active"
                          ? "bg-[#C7F1C9] text-[#3A9A44]"
                          : "bg-[#DDDDDD] text-[#707070]"
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-end justify-between">
                    
                    {/* Duration */}
                    <div>
                      <p className="text-[15px] text-[var(--text-dim2)]">
                        Active Duration
                      </p>

                      <h4 className="mt-1 text-[20px] leading-none font-semibold text-[var(--text-dim)]">
                        {item.duration}
                      </h4>
                    </div>

                    {/* Earnings */}
                    <div className="text-right">
                      <p className="text-[15px] text-[var(--text-dim)]">
                        Total Earned
                      </p>

                      <h4 className="mt-1 text-[28px] leading-none font-semibold text-[#D89A24]">
                        {item.earned}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index !== filteredReferrals.length - 1 && (
                  <div className="h-px w-full  bg-[var(--bg-card)]" />
                )}
              </div>
            ))}

            {/* Empty State */}
            {filteredReferrals.length === 0 && (
              <div className="py-14 text-center text-[18px] text-[#8A8A8A]">
                No referrals found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPopup;