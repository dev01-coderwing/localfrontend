import { useState } from "react";
import VoiceAnalysis from "./VoiceAnalysis";
import VoiceConsentModal from "./VoiceConsentModal";

export default function VoicePageWrapper() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <VoiceConsentModal onClose={() => setShowModal(false)} />
      )}

      {!showModal && <VoiceAnalysis />}
    </>
  );
}