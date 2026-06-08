import React from 'react';
import Navbar from '../Navbar/Navbar';
import Session from '../Session/Session';
import {
  Globe,
  Home,
  MessageCircle,
  Sparkles,
  Zap,
  Bell,
  SlidersHorizontal,
  Trash2,
  Send,
  CheckCheck
} from 'lucide-react';
import logo from '/Image/IAMeetYou.png';

const Lucas = () => {
  const [timeLeft, setTimeLeft] = React.useState(305); // Start at 5 mins 5 secs
  const [showSession, setShowSession] = React.useState(null); // 'update', 'critical', 'end'
  const [isTimerPaused, setIsTimerPaused] = React.useState(false);

  // Timer Logic
  React.useEffect(() => {
    if (isTimerPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowSession('end');
          return 0;
        }

        const newTime = prev - 1;

        // Trigger Modals
        if (newTime === 300) setShowSession('update');
        if (newTime === 60) setShowSession('critical');

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerPaused, timeLeft]);

  const handleCloseModal = () => setShowSession(null);
  const handleExtend = () => {
    setTimeLeft(3600); // Add 1 hour
    setShowSession(null);
  };

  // Helper for demo timer label
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Navbar />


      {/* Session Modal */}
      <Session
        isOpen={!!showSession}
        type={showSession}
        timeLeft={timeLeft}
        onClose={handleCloseModal}
        onExtend={handleExtend}
      />

      {/* Main Content Layout */}
      <div className="max-w-full mx-auto h-[calc(100vh-var(--nav-height,100px))]">
        <div className="flex w-full h-full bg-[var(--bg-background)]  border border-[var(--border)] overflow-hidden transition-colors duration-300">

          {/* Left Sidebar (30%) */}
          <div className="w-[30%] flex flex-col border-r border-[var(--border)] p-6">

            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[var(--text-dim)]">Lucas</h1>
              <button className="w-8 h-8 flex items-center justify-center bg-[var(--bg-card)]/10 text-[var(--text-dim)] rounded-lg">
                <Sparkles className="w-4 h-4" />
              </button>
            </div>

            {/* Analyzed Profiles List */}
            <div className="flex-1 pr-2 space-y-4 overflow-y-auto">

              {/* Profile Card 1 */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] shadow-sm bg-[var(--bg-card)]/10 group transition-colors">
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--text-dim)]">Lynn</h3>
                  <p className="text-[12px] text-[var(--text-dim2)] mt-0.5">Analyzed: 15/01/2026</p>
                  <p className="text-[12px] text-[var(--text-dim2)] mt-1 font-medium">Expires in: 6 days</p>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg)] text-[var(--text-dim)] hover:bg-red-50 hover:text-red-500 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Card 2 */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] shadow-sm bg-[var(--bg-card)]/10 group transition-colors">
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--text-dim)]">Olivia</h3>
                  <p className="text-[12px] text-[var(--text-dim2)] mt-0.5">Analyzed: 12/01/2026</p>
                  <p className="text-[12px] text-[var(--text-dim2)]    mt-1 font-medium">Expires in: 3 days</p>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-card)]/10 text-[var(--text-dim)] transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Bottom Info Card */}
            <div className="mt-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/10">
              <h4 className="text-sm font-semibold text-[var(--text-dim)] mb-3 opacity-90">Memory duration:</h4>
              <ul className="space-y-1.5 font-medium">
                <li className="text-[13px] text-[var(--text-dim2)] flex gap-2">
                  <span>•</span> Discovery: No memory
                </li>
                <li className="text-[13px] text-[var(--text-dim2)] flex gap-2">
                  <span>•</span> Essential: 2 weeks
                </li>
                <li className="text-[13px] text-[var(--text-dim2)] flex gap-2">
                  <span>•</span> Serenity: 1 month
                </li>
                <li className="text-[13px] text-[var(--text-dim2)] flex gap-2">
                  <span>•</span> Elite: 2 months
                </li>
              </ul>
            </div>

          </div>

          {/* Right Chat Area (70%) */}
          <div className="flex-1 flex flex-col relative bg-[var(--bg-background)]">

            {/* Chat Header */}
            <div className="px-6 py-4 flex items-center gap-3 border-b border-[var(--border)]">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 flex items-center justify-center text-white p-2 border border-[var(--border)]">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[var(--bg-background)] rounded-full"></div>
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-[var(--text-dim)] leading-tight">Lucas</h2>
                <p className="text-[12px] text-[var(--text-dim2)] font-medium">Dating Coach</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[var(--bg-background)] bg-opacity-30">

              {/* Bot Message */}
              <div className="flex w-full">
                <div className="max-w-[60%] flex flex-col">
                  <div className="bg-[var(--bg-card)]/10 text-[var(--text-dim)] px-5 py-4 rounded-2xl rounded-tl-sm text-[15px] leading-relaxed shadow-sm border border-[var(--border)]">
                    Hey! I'm Lucas, your AI dating coach. I'm here to help you navigate your connections with deeper insights. What would you like to know?
                  </div>
                  <span className="text-[11px] text-[var(--text-dim)] mt-2 px-1">10:30 AM</span>
                </div>
              </div>

              {/* User Message */}
              <div className="flex w-full justify-end">
                <div className="max-w-[60%] flex flex-col items-end">
                  <div className="bg-[var(--bg-card)]/10      text-[var(--text-dim)] px-5 py-4 rounded-2xl rounded-tr-sm text-[15px] leading-relaxed shadow-sm">
                    Hi! I'm great, thanks! How about you?
                  </div>
                  <div className="flex items-center gap-1 mt-2 pr-1">
                    <span className="text-[11px] text-[var(--text-dim)]">10:32 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-green-500" />
                  </div>
                </div>
              </div>

            </div>

            {/* Chat Input */}
            <div className="p-6 pt-2 bg-[var(--bg-background)] border-t border-[var(--border)]">
              <div className="flex items-center gap-3 border border-[var(--border)] rounded-full pl-5 pr-1.5 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent)] focus-within:ring-opacity-20 transition-all">
                <input
                  type="text"
                  placeholder="Ask Lucas anything..."
                  className="flex-1 bg-transparent border-none outline-none text-[var(--text-dim)] placeholder-[var(--text-dim2)] text-[15px]"
                />
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--accent)] hover:opacity-90 text-white transition-all shadow-sm">
                  <Send className="w-4 h-4 ml-[-2px]" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </>
  );
};

export default Lucas;