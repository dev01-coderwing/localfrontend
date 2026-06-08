import React from 'react';
import { Hourglass, Timer, Plus, X, Brain, CheckCircle } from 'lucide-react';
 
const Session = ({ isOpen, type, timeLeft, onClose, onExtend }) => {
if (!isOpen || !type) return null;
  // Helper to format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
 
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center  backdrop-blur-sm p-4 animate-in fade-in duration-300">
     
      {/* Container for the Card */}
      <div className="animate-in zoom-in-95 duration-300 ease-out ">
       
        {/* Card 1: Session Update (Yellow Theme) */}
        {type === 'update' && (
          <div className="w-full max-w-[480px] bg-[var(--bg-card)]/10 rounded-[2.5rem] border-[1.5px] border-[var(--border)] p-10 shadow-2xl flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-[var(--bg-background)] rounded-full flex items-center justify-center mb-8">
              <Hourglass className="w-10 h-10 text-[var(--text-dim2)]" />
            </div>
           
            <h2 className="text-[32px] font-bold text-[var(--text-dim)] mb-4 tracking-tight">Session Update</h2>
           
            <p className="text-[18px] text-[var(--text-dim)]leading-relaxed mb-10 px-4 font-medium">
              You have <span className="text-[#D97706] font-bold">5 minutes remaining</span> in your premium session. Extend now to keep chatting.
            </p>
 
            <button
              onClick={onExtend}
              className="w-full h-16 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#FCD34D] rounded-full flex items-center justify-center gap-3 text-white text-xl font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-lg mb-6"
            >
              <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              Buy 1h
            </button>
 
            <button
              onClick={onClose}
              className="text-[20px] font-bold text-[var(--text-dim)] hover:text-gray-700 transition"
            >
              May be Later
            </button>
          </div>
        )}
 
        {/* Card 2: Critical Alert (Red Theme) */}
        {type === 'critical' && (
          <div className="w-full max-w-[480px] bg-white rounded-[2.5rem] border-[1.5px] border-[#EF4444] p-10 shadow-2xl flex flex-col items-center text-center relative">
            <div className="w-24 h-24 bg-[#FFF1F1] rounded-full flex items-center justify-center mb-6">
              <Timer className="w-10 h-10 text-[#FF0000] animate-pulse" />
            </div>
           
            <span className="text-[14px] font-bold text-[#FF0000] tracking-widest uppercase mb-4">Critical Alert</span>
           
            <div className="text-[48px] font-bold text-gray-700 mb-4 tabular-nums">
              {formatTime(timeLeft)}
            </div>
           
            <h2 className="text-[32px] font-bold text-gray-900 mb-4 tracking-tight">Session Expiring</h2>
           
            <p className="text-[17px] text-gray-500 leading-relaxed mb-10 px-2 font-medium">
              Your premium AI chat session is about to end. Continue now to save your progress and maintain high-speed responses.
            </p>
 
            <button
              onClick={onExtend}
              className="w-full h-16 bg-[#FF0000] rounded-full flex items-center justify-center text-white text-xl font-bold hover:bg-[#E60000] active:scale-[0.98] transition-all shadow-lg mb-6"
            >
              Buy Now
            </button>
 
            <button
              onClick={onClose}
              className="text-[20px] font-bold text-gray-500 hover:text-gray-700 transition mb-10"
            >
              May be Later
            </button>
 
            <div className="flex justify-between w-full text-[12px] font-bold text-gray-400 mt-auto">
              <span>Session Data</span>
              <span className="text-red-500">99% Lost at 0:00</span>
            </div>
          </div>
        )}
 
        {/* Card 3: Session End (Premium/Lucas Theme) */}
        {type === 'end' && (
          <div className="w-full max-w-[480px] bg-[var(--bg-background)] rounded-[2.5rem] p-10 border border-[var(--border-color)] flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-color)] mb-8">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-[11px] font-bold text-red-500 uppercase tracking-tight">0:00 Remaining</span>
            </div>
           
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-purple-500 to-pink-500 shadow-xl ring-[6px] ring-white">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <div className="bg-gradient-to-tr from-purple-500 via-pink-400 to-white w-full h-full p-4 flex items-center justify-center text-white">
                    <Brain className="w-12 h-12" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -translate-x-1/2 left-1/2 bg-white border border-gray-100 px-3 py-0.5 rounded-full shadow-sm">
                <span className="text-[13px] font-bold text-gray-700">Lucas</span>
              </div>
            </div>
           
            <h2 className="text-[32px] font-bold text-[var(--text-dim)] mb-4 tracking-tight leading-tight">
              That's all for now – I loved our chat!
            </h2>
           
            <p className="text-[18px] text-[var(--text-dim2)] leading-relaxed mb-10 px-4 font-medium">
              You've reached the end of your session. want to pick up where we left off?
            </p>
 
            <button
              onClick={onExtend}
              className="w-full h-16 bg-gradient-to-r from-[#CE8E9A] via-[#94A3B8] to-[#5F7BF4] rounded-full flex items-center justify-center text-white text-xl font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-lg mb-6"
            >
              Continue Chat
            </button>
 
            <button
              onClick={onClose}
              className="text-[20px]  text-[var(--text-dim2)] hover:text-[var(--text-dim)] transition"
            >
              Exit Session
            </button>
          </div>
        )}
 
      </div>
    </div>
  );
};
 
export default Session;
 