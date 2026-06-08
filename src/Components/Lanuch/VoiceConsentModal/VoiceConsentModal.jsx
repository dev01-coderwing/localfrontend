import { useState } from "react";
import voice from "/Image/voice.png?url";
export default function VoiceConsentModal({ onClose, onAgree }) {
    return (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="bg-[var(--bg-background)] w-[350px] rounded-2xl p-6 text-center relative">
 
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400"
                >
                    ✕
                </button>
 
                <div className="w-18 h-18 mx-auto mb-3 bg-purple-100 text-purple-500 flex items-center justify-center rounded-full">
                    <img src={voice} alt="Voice" />
                </div>
 
                <h3 className="font-semibold mb-2">Voice Analysis Consent</h3>
 
                <p className="text-xs text-[var(--text-dim)] mb-4">
                    We analyze emotional tone form your voice to <br />  improve compatibility matching. Audio is <br /> processed securely and deleted immediately <br /> after analysis. Only your anonymous <br /> compatibility score is stored in our secure <br /> database.        </p>
                <div className="flex  text-sm justify-evenly text-[var(--text-dim2)]"><p>Secure processing</p>   <p>Auto-deletion</p></div>
                <p className="text-xs text-[var(--text-dim2)] mb-5 text-center mt-5">End-to-end encryption</p>
 
                <div className="bg-purple-100 text-[var(--text-dim2)] rounded-xl py-6 px-4 mb-6 text-sm">
                    I agree to voice processing for compatibility analysis and acknowledge my data is protected.        </div>
                <button
                    onClick={onAgree}
                    className="w-full py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-[var(--text)] mb-2"
                >
                    I Agree & Continue
                </button>
 
                <button
 
                    className="w-full py-2 rounded-full border border-orange-400  text-orange-400 mb-2"
                >
                    Use text mode instead
                </button>
 
                <button onClick={onClose} className="text-sm text-gray-400">
                    Cancel
                </button>
            </div>
        </div>
    );
}