import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Right from "../layout/Right";
import { ArrowLeft } from "lucide-react";

function Data() {

  const [selected, setSelected] = useState("");

  const settings = [
    {
      id: "personal",
      title: "Personal Data Usage",
      desc: "Turning this off will limit profile personalization and matchmaking efficiency",
    },
    {
      id: "ai",
      title: "AI Analysis Permission",
      desc: "Enables smart-intro features and deep compatibility scoring based on your profile",
    },
  ];

  const privacyOptions = [
    {
      id: "always",
      title: "Always",
      desc: "Share location even when the app is in the background",
    },
    {
      id: "while",
      title: "While using the app",
      desc: "Only share while searching for matches",
    },
    {
      id: "never",
      title: "Never",
      desc: "Completely disable location discovery",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-background)] text-[var(--text-dim)]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-3xl p-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow">
                <ArrowLeft className="w-5 h-5 text-black" />
              </button>

              <h1 className="text-3xl font-semibold text-[var(--text-dim)]">
                Setting
              </h1>
            </div>

            {/* Section */}
            <h2 className="text-lg font-semibold mb-4">
              Data & Privacy
            </h2>

            <div className="space-y-4 mb-8 ">

              {settings.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[var(--bg-card2)] border border-[var(--border)] rounded-2xl p-4"
                >

                  <div>
                    <h3 className="font-semibold ">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[var(--text-dim2)] mt-1">
                      {item.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelected(item.id)}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center
                    ${
                      selected === item.id
                        ? "bg-[#F7A58F] border-[#F7A58F]"
                        : "border-gray-300"
                    }`}
                  >
                    {selected === item.id && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </button>

                </div>

              ))}

            </div>

            {/* Privacy Section */}
            <h2 className="text-lg font-semibold mb-4 text-[var(--text-dim)]">
              Data & Privacy
            </h2>

            <div className="space-y-4">

              {privacyOptions.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between border  bg-[var(--bg-card2)] border-[var(--border)] text-[var(--text-dim)] rounded-2xl p-4"
                >

                  <div>
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[var(--text-dim2)] mt-1">
                      {item.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelected(item.id)}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center
                    ${
                      selected === item.id
                        ? "bg-[#F7A58F] border-[#F7A58F]"
                        : "border-gray-300"
                    }`}
                  >
                    {selected === item.id && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </button>

                </div>

              ))}

            </div>

            {/* Footer */}
            <div className="flex flex-col items-center mt-12">

              <button className="px-8 py-3 rounded-full bg-[#FFD7CB] text-[#FF7A59] text-sm font-semibold">
                SECURE CONNECTION
              </button>

              <p className="text-xs text-center text-gray-500 mt-6 max-w-xl">
                Your privacy is our priority. Changes take up to 24 hours
                to sync across all servers globally. IAMeetYou complies
                with GDPR and CCPA standards.
              </p>

            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="w-full">
            <Right />
          </div>

        </div>

      </div>

    </div>
  );
}

export default Data;