 import {React,useState} from "react";
 import Withdrawal from "./Withdrawal";
import {
  ArrowLeft,
  ChevronRight,
  Building2,
  BadgeCheck,
  Info,
  User
} from "lucide-react";

const withdrawHistory = [
  {
    id: 1,
    name: "John Dawson",
    time: "2 hours ago",
    amount: "+€14.99",
  },
  {
    id: 2,
    name: "NTR Patel",
    time: "5 hours ago",
    amount: "+€18.00",
  },
];

function InfluencerWallet({onClose}) {

  const [showWithdrawal, setShowWithdrawal] = useState(false);
  return (
    // <div className="min-h-screen bg-[#1f1f1f] flex items-center justify-center p-2 sm:p-4 md:p-6">
    <div
  className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6"
  onClick={onClose}
>
      
      {/* MAIN POPUP */}
     <div
       onClick={(e) => e.stopPropagation()}
  className="
    w-full
    max-w-[430px]
    sm:max-w-[520px]
    md:max-w-[650px]
    lg:max-w-[760px]
    xl:max-w-[820px]
    bg-[var(--bg)]
    rounded-[22px]
    sm:rounded-[26px]
    shadow-2xl
    overflow-hidden
    bg-[var(--bg-background)]
    
  "
>
     
        {/* HEADER */}
        <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4">
          <div className="flex items-center gap-3">
            
            


<button
  onClick={onClose}
  className="h-8 w-8 rounded-full flex items-center text-[var(--text-dim)] justify-center hover:bg-gray-200 transition border border-[var(--border)]"
>
  <ArrowLeft size={18} />
</button> 

            <h2 className="text-[14px] sm:text-[15px] font-semibold text-[var(--text-dim)]">
              My Referrals
            </h2>

          </div>
        </div>

        {/* SCROLL AREA */}
        <div className="px-3 sm:px-4 pb-4 sm:pb-5 overflow-y-auto max-h-[88vh]">

          {/* BALANCE CARD */}
          <div className="bg-[var(--card)]  border  border-[var(--border)] rounded-[18px] sm:rounded-[22px] p-3 sm:p-4">

            {/* TAGS */}
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-[5px] rounded-full bg-[#b9efb8] text-[9px] sm:text-[10px] font-medium text-[#1c7a1c] whitespace-nowrap">
                • Subscription Active
              </span>

              <span className="px-2 py-[5px] rounded-full bg-[#d9d5d5] text-[9px] sm:text-[10px] font-medium text-[#555] whitespace-nowrap">
                • Active Balance
              </span>
            </div>

            {/* BALANCE */}
            <div className="mt-4">
              <p className="text-[11px] sm:text-[12px]  text-[var(--text-dim2)]">
                Available Balance
              </p>

              <h1 className="text-[30px] sm:text-[34px] md:text-[38px] font-bold text-[var(--text-dim)] mt-1 leading-none">
                € 82.50
              </h1>
            </div>

            {/* BANK DETAIL */}
            <div className="mt-5  bg-[var(--bg-card)]/10  rounded-[14px] border border-[var(--border)] sm:rounded-[16px] px-3 sm:px-4 py-3 flex items-center justify-between">
              
              <div className="flex items-center gap-3 min-w-0">
                
                <div className="h-10 w-10 min-w-[40px] text-[var(--text-dim)]  bg-[var(--bg-background)] border border-[var(--border)] rounded-full  flex items-center justify-center">
                  <Building2 size={18} />
                </div>

                <div className="min-w-0">
                  <h4 className="text-[12px] sm:text-[13px] font-semibold text-[var(--text-dim)]">
                    Bank Detail
                  </h4>

                  <p className="text-[10px] sm:text-[11px] text-[var(--text-dim2)] truncate">
                    **** 1234
                  </p>
                </div>
              </div>

              <ChevronRight
                size={18}
                className="text-[#777] min-w-[18px] text-[var(--text-dim)]" 
              />
            </div>

            {/* VERIFICATION */}
            <div className="mt-3 bg-[var(--bg-card)]/10  rounded-[14px] border border-[var(--border)] sm:rounded-[16px] px-3 sm:px-4 py-3 flex items-center justify-between">
              
              <div className="flex items-start gap-3 min-w-0 ">
                
                <div className="h-10 w-10 min-w-[40px] text-[var(--text-dim)] bg-[var(--bg-background)] rounded-full border border-[var(--border)] flex items-center justify-center">
                  <BadgeCheck size={18} />
                </div>

                <div className="min-w-0">
                  
                  <span className="inline-block px-2 py-[2px] rounded-full bg-[#b9efb8] text-[8px] sm:text-[9px] text-[#1c7a1c] font-semibold">
                    Verified
                  </span>

                  <h4 className="text-[12px] sm:text-[13px] font-semibold text-[var(--text-dim)] mt-1">
                    KYC Verification
                  </h4>

                  <p className="text-[10px] sm:text-[11px] text-[var(--text-dim2)] leading-4 sm:leading-5">
                    To unlock withdrawals, complete a quick identity check.
                  </p>

                </div>
              </div>

              <ChevronRight
                size={18}
                className="text-[#777] min-w-[18px] text-[var(--text-dim)]"
              />
            </div>

            {/* WITHDRAW BUTTON */}
            <button
              onClick={() => setShowWithdrawal(true)}
              className="
                mt-4
                w-full
                h-[46px]
                sm:h-[48px]
                rounded-full
                bg-gradient-to-r
                from-[#dfb0b0]
                to-[#9ca7ff]
                text-[var(--text)]
                text-[14px]
                sm:text-[15px]
                font-semibold
                hover:opacity-95
                transition
              "
            >
              Withdraw
            </button>
          </div>

          {/* CURRENCY INFO */}
          <div className="mt-4 bg-[var(--bg-card)]/10 border border-[var(--border)]  bg-[var(--bg-card)]/10 rounded-[16px] sm:rounded-[18px] p-3 sm:p-4">
            
            <div className="flex gap-3">
              
              <div className="mt-1 min-w-[16px]">
                <Info size={16} className="text-[var(--text-dim)]" />
              </div>

              <div>
                <h4 className="text-[12px] sm:text-[13px] font-semibold text-[var(--text-dim)]">
                  Currency information
                </h4>

                <p className="text-[10px] sm:text-[11px] text-[var(--text-dim2)] leading-5 mt-1">
                  Withdrawals in currencies other than EUR will incur bank
                  amount. We recommend withdrawing in EUR to avoid fees.
                </p>
              </div>
            </div>
          </div>

          {/* TRANSACTION */}
          <div className="mt-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              
              <div>
                <h3 className="text-[12px] sm:text-[13px] font-semibold text-[var(--text-dim)]">
                  Total Amount: €125.99
                </h3>

                <p className="text-[9px] sm:text-[10px] text-[var(--text-dim)] mt-1">
                  Transaction ID: #WB-562-31
                </p>
              </div>

              <span className="w-fit px-3 py-1 rounded-full bg-[#e7e5ff] text-[#6b63ff] text-[9px] sm:text-[10px] font-medium">
                • Processing
              </span>

            </div>

            {/* PROGRESS */}
            <div className="mt-5 relative text-[var(--text)]">

              <div className="absolute top-3 left-0 right-0 h-[2px] bg-[#ddd] text-[var(--text)] " />

              <div className="relative flex items-start justify-between gap-2 text-[var(--text)] ">

                {[
                  { label: "Request", active: true },
                  { label: "Processing", active: true },
                  { label: "Sent To Bank", active: false },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center  px-1 flex-1 "
                  >
                    <div
                      className={`
                        h-6 w-6 rounded-full flex items-center justify-center text-white text-[10px]
                        ${
                          item.active
                            ? "bg-[#62c16b]"
                            : "bg-[#cfcfcf]"
                        }
                      `}
                    >
                      ✓
                    </div>

                    <p className="text-[9px] sm:text-[10px] text-[#777] mt-2 text-center leading-4">
                      {item.label}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* WITHDRAW HISTORY */}
          <div className="mt-6 sm:mt-7">

            <div className="flex items-center justify-between">
              
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-[var(--text-dim)]">
                Withdraw History
              </h3>

              <button className="text-[11px] sm:text-[12px] text-[var(--text-dim)] font-medium">
                View All
              </button>

            </div>

            <div className="mt-4 flex flex-col gap-3">
              
              {withdrawHistory.map((item) => (
                <div
                  key={item.id}
                  className=" rounded-[16px] sm:rounded-[18px] px-3 text-[var(--text-dim)] bg-[var(--bg-card)]/10 sm:px-4 py-3 flex items-center justify-between border border-[var(--border)]"
                >
                  
                  <div className="flex items-center gap-3 min-w-0  ">
                    
                    <div className="h-10 p-2 w-10 sm:h-11 sm:w-11 rounded-full border border-[var(--border)] bg-[var(--bg-background)] min-w-[40px]"><User /></div>
                     
                    <div className="min-w-0">
                      
                      <h4 className="text-[12px] sm:text-[13px] font-semibold text-[var(--text-dim)] truncate  ">
                        {item.name}
                      </h4>

                      <p className="text-[10px] sm:text-[11px] text-[var(--text-dim2)]">
                        {item.time}
                      </p>

                    </div>
                  </div>

                  <div className="text-right min-w-fit">
                    <h4 className="text-[13px] sm:text-[14px] font-bold text-[#18a84f]">
                      {item.amount}
                    </h4>

                    <p className="text-[9px] sm:text-[10px] text-[var(--text-dim)]">
                      Commission
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
      {showWithdrawal && (
  <Withdrawal
    onClose={() => setShowWithdrawal(false)}
  />
)}
    </div>

    
    
  );
}

export default InfluencerWallet;



