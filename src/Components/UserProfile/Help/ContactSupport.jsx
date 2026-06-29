// ContactSupport.jsx
import React, { useState } from "react";

const ContactSupport = ({ onNext }) => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!topic || !message) {
      alert("Please fill all fields");
      return;
    }

    // API call here (optional)
    onNext();
  };

  return (
    <div className=" flex items-center justify-center   ">
      
      <div className="bg-[var(--card)]/10 p-6 rounded-2xl shadow-md  w-full max-w-4xl flex flex-col">
        
        <h1 className="text-xl font-semibold mb-4">Contact Support</h1>

        {/* Header */}
        <div className="bg-gradient-to-t from-[#7133A8] via-[#E4678C] to-[#FC9A86] p-4 rounded-xl text-white mb-6">
          <h2 className="text-lg font-semibold">How can we help?</h2>
          <p className="text-sm">
            We're here to ensure your experience is safe.
          </p>
        </div>

        {/* Form content */}
        <div className="flex flex-col flex-grow text-[var]">
          
          {/* Topic */}
          <select
            className="w-full p-3 border rounded-lg mb-4 bg-[var(--bg-card)]/10"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="" className="text-black">Select a topic</option>
            <option className="text-[var(--text-dim)] bg-[var(--bg-background)]">Account Issue</option>
            <option className="text-[var(--text-dim)] bg-[var(--bg-background)]">Payment</option>
            <option className="text-[var(--text-dim)] bg-[var(--bg-background)]" >Bug</option>
          </select>

          {/* Message */}
          <textarea
            className="w-full p-3 border rounded-lg mb-2"
            rows="3"
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Spacer to push button down */}
          <div className="flex-grow"></div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-[#D79098] to-[#5F7BF4] hover:opacity-90 transition mt-auto"
          >
            Send Message
          </button>

        </div>
      </div>
    </div>
  );
};

export default ContactSupport;