import React from "react";
import { X, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitBubblePopResultThunk } from "../../../Redux/AllgameSclice";

const VictoryScreen = ({ score, onClaim, onRestart, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const handleClaimReward = async () => {
  const result = await dispatch(
    submitBubblePopResultThunk("WIN")
  );

  console.log(result);

  navigate("/homepage");
};
  return (
    <div className="absolute inset-0 bg-[var(--bg)]/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-sm bg-[var(--card)] rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.12)] p-10 relative flex flex-col items-center text-center border border-[var(--border)]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Victory Icon - Heart from design */}
        <div className="mb-6 mt-2 relative">
            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full"></div>
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-500 relative">
                <Heart className="w-10 h-10 fill-current" />
            </div>
        </div>

        {/* Text Content */}
        <h2 className="text-[38px] font-black text-red-500 mb-2">Victory!</h2>
        <p className="text-[18px] font-bold text-gray-800 mb-1">Perfect Match!</p>
        <p className="text-[var(--text-dim)] font-medium mb-8 leading-tight">
          You matched {score} pairs in<br />time!
        </p>

        {/* Rewards Section */}
        <div className="w-full bg-purple-50 rounded-[30px] p-6 mb-8 border border-purple-100">
          <p className="text-purple-500 text-[14px] font-bold mb-4 uppercase tracking-widest">Rewards Unlocked</p>
          <div className="flex items-center justify-center gap-4">
            <img src="/Image/Coin.png" alt="Coin" className="w-10 h-10 object-contain" />
            <span className="text-[34px] font-black text-purple-600">15 Meons</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-4">
          <button
          onClick={handleClaimReward}
            className="w-full bg-gradient-to-r from-red-400 to-purple-500 text-white py-5 rounded-full font-bold text-lg shadow-[0_12px_30px_rgba(239,68,68,0.25)] hover:opacity-95 transition-all transform active:scale-[0.98]"
          >
            Claim Reward
          </button>
          <button
            onClick={onRestart}
            className="w-full bg-[var(--card)] border border-[var(--border)] text-[var(--text-dim)] py-5 rounded-full font-bold text-lg hover:bg-[var(--hover)] transition-all transform active:scale-[0.98]"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen;
