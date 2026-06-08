import React from "react";
import Navbar from "../Navbar/Navbar";
import Right from "../../Components/UserProfile/layout/Right";
import { ArrowLeft, CalendarDays, Gamepad2, UserCheck } from "lucide-react";
import coins from "/Image/coins.png"; // your coins image
import coin from "/Image/coin.png"
import { useNavigate } from "react-router-dom";

const EarnMeons = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = React.useState(1240);

  const [tasks, setTasks] = React.useState([
    {
      id: 1,
      title: "Daily Login",
      description: "Come back tomorrow for more",
      reward: 20,
      type: "login",
    },
    {
      id: 2,
      title: "Mini Games",
      description: "Challenge others and win rewards.",
      reward: 100,
      type: "game",
    },
    {
      id: 3,
      title: "Complete Profile",
      description: "70% Completed",
      reward: 50,
      progress: 70,
      type: "profile",
    },
  ]);
  return (
    <div className="min-h-screen  bg-[var(--bg-background)] border border-[var(--border)] ">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2">

          <div className=" bg-[var(--bg-card)]/10 rounded-[20px] p-6">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => navigate("/wallet")}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition"
              >
                <ArrowLeft size={18} className="text-gray-700" />
              </button>

              <h2 className="text-2xl font-semibold text-[var(--text-dim)]">
                Setting
              </h2>
            </div>

            {/* TITLE */}
            <p className="text-sm font-semibold text-[var(--text-dim)] mb-4">
              How to Earn Meons
            </p>

            {/* WALLET CARD */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-[#D79098] via-[#9B85C6] to-[#5F7BF4] flex items-center justify-between overflow-hidden">

              {/* LEFT */}
              <div>
                <p className="text-xs text-[var(--text-dim)] mb-2">
                  MEONS BALANCE
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={coin}   // 👈 your coin image path
                      alt="coin"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h1 className="text-4xl font-bold text-[var(--text-dim)]">
                    {balance.toLocaleString()}
                  </h1>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative w-[50%] h-[100px]">
                <img
                  src={coins}
                  alt="coins"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] translate-x-11 object-contain pointer-events-none" />
              </div>
            </div>


            {/* AVAILABLE TASKS */}
            <h3 className="text-sm font-semibold text-[var(--text-dim)] mb-3">
              Available Tasks
            </h3>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-[var(--bg-card)]/10 rounded-xl p-4 shadow-sm border border-[var(--border)]"
                >

                  {/* TOP */}
                  <div className="flex items-center justify-between mb-3">

                    <div className="flex items-center gap-3">

                      {/* ICON */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center 
          ${task.type === "login" ? "bg-blue-100" :
                          task.type === "game" ? "bg-indigo-100" :
                            "bg-purple-100"}`}>

                        {task.type === "login" && (
                          <CalendarDays size={18} className="text-blue-500" />
                        )}

                        {task.type === "game" && (
                          <Gamepad2 size={18} className="text-indigo-500" />
                        )}

                        {task.type === "profile" && (
                          <UserCheck size={18} className="text-purple-600" />
                        )}
                      </div>

                      {/* TEXT */}
                      <div>
                        <p className="font-semibold text-[var(--text-dim)]">
                          {task.title}
                        </p>
                        <p className="text-xs text-[var(--text-dim2)]">
                          {task.description}
                        </p>
                      </div>

                    </div>

                    {/* REWARD */}
                    <p className="text-green-500 font-semibold">
                      +{task.reward}
                    </p>
                  </div>

                  {/* EXTRA UI */}
                  {task.type === "game" && (
                    <button
                      onClick={() => {
                        setBalance((prev) => prev + task.reward);
                      }}
                      className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
                    >
                      Play Now
                    </button>
                  )}

                  {task.type === "profile" && (
                    <>
                      <div className="w-full h-2 bg-gray-200 rounded-full mb-3">
                        <div
                          className="h-2 bg-[#FCA5A5] rounded-full"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>

                      <button
                        onClick={() => {
                          setBalance((prev) => prev + task.reward);
                        }}
                        className="w-full py-3 rounded-xl bg-[var(--bg-card)]/10 text-[var(--text-dim)]"
                      >
                        Finish Setup
                      </button>
                    </>
                  )}
                </div>
              ))}

            </div>

            {/* FOOTER */}
            <p className="text-xs text-gray-400 text-center mt-6">
              Meons can be used for boosts, profile highlights, and gifts. Terms and Conditions apply.
            </p>

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

export default EarnMeons;