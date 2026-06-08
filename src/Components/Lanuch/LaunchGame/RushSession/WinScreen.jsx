import React from "react";
import { X, PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitEmojiRushResultThunk } from "../../../Redux/gameSlice";

const WinScreen = ({ score, onClaim, onRestart, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClaimReward = async () => {

const result = await dispatch(
  submitEmojiRushResultThunk({
    result: "WIN",
  })
);

  console.log(result);

  navigate("/homepage");
};
  return (
    <div className="absolute inset-0 bg-[var(--bg)]/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-sm bg-[var(--card)] rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-8 relative flex flex-col items-center text-center border border-[var(--border)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Celebration Icon */}
        <div className="mb-6 mt-4">
          <PartyPopper className="w-20 h-20 text-[var(--accent)]" />
        </div>

        {/* Text Content */}
        <h2 className="text-[36px] font-black text-[var(--accent)] mb-2">You Win!</h2>
        <p className="text-[var(--text-dim)] font-medium mb-8 leading-tight">
          You tapped 20 positive<br />emojis in time!
        </p>

        {/* Rewards Section */}
        <div className="w-full bg-[var(--accent-soft)] rounded-[24px] p-6 mb-8 border border-[var(--border)]">
          <p className="text-[var(--accent)] text-[14px] font-bold mb-4 uppercase tracking-wider">Rewards Unlocked</p>
          <div className="flex items-center justify-center gap-3">
            <img src="/Image/Coin.png" alt="Coin" className="w-10 h-10 object-contain" />
            <span className="text-[32px] font-black text-[var(--accent)]">15 Meons</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <button
           onClick={handleClaimReward} 
            className="w-full bg-gradient-to-r from-[#D79098] to-[#5F7BF4] text-white py-4.5 rounded-full font-bold text-lg shadow-[0_10px_25px_rgba(95,123,244,0.3)] hover:opacity-95 transition-all transform active:scale-[0.98]"
          >
            Claim Reward
          </button>
          <button
            onClick={onRestart}
            className="w-full bg-[var(--card)] border border-[var(--border)] text-[var(--text-dim)] py-4.5 rounded-full font-bold text-lg hover:bg-[var(--hover)] transition-all transform active:scale-[0.98]"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinScreen;
