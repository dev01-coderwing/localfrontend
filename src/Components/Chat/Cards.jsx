import React from "react";
import { VolumeX, AlertTriangle, Ban } from "lucide-react";

const ActionCard = ({ icon, title, desc, primaryText }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 w-[300px] shadow-lg text-center">
      
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-2">{desc}</p>

      {/* Buttons */}
      <div className="flex justify-between gap-3 mt-6">
        <button className="w-full border border-red-300 text-red-400 py-2 rounded-lg hover:bg-red-50 transition">
          Cancel
        </button>

        <button className="w-full bg-gradient-to-r from-pink-400 to-blue-500 text-white py-2 rounded-lg hover:opacity-90 transition">
          {primaryText}
        </button>
      </div>
    </div>
  );
};

const Cards = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-[#0b0213] to-black flex items-center justify-center gap-6 flex-wrap p-6">
      
      {/* Mute */}
      <ActionCard
        icon={<VolumeX className="text-gray-500" />}
        title="Mute Conversation"
        desc="Mute notifications from Sophia? You can unmute anytime."
        primaryText="Mute"
      />

      {/* Report */}
      <ActionCard
        icon={<AlertTriangle className="text-red-400" />}
        title="Report User"
        desc="Report Sophia for inappropriate behavior? Our team will review."
        primaryText="Report"
      />

      {/* Block */}
      <ActionCard
        icon={<Ban className="text-gray-500" />}
        title="Block User"
        desc="Are you sure you want to block Sophia? They won't be able to message you."
        primaryText="Block"
      />
    </div>
  );
};

export default Cards;