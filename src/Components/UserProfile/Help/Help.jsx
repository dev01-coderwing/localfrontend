// import React from 'react'
// import Navbar from "../../Navbar/Navbar";
// import Right from "../layout/Right";
// import { Outlet } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { useState } from "react";
// const topicsList = [
//     "Account Issue",
//     "Payment Problem",
//     "Bug Report",
//     "Feature Request",
//     "Other",
// ];
// function Help() {
//     const [showSupport, setShowSupport] = useState(false);
//     const [form, setForm] = useState({
//         topic: "",
//         message: "",
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     // handle change
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//         setError("");
//     };

//     // submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!form.topic || !form.message) {
//             return setError("Please fill all fields");
//         }

//         try {
//             setLoading(true);

//             // 🔥 API CALL (replace with your backend)
//             await new Promise((res) => setTimeout(res, 1500));

//             alert("Message Sent Successfully 🚀");

//             setForm({
//                 topic: "",
//                 message: "",
//             });
//         } catch (err) {
//             setError("Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <Navbar />


//             <div className='flex w-full'>
//                 <div className="min-h-screen flex-1 flex items-center justify-center p-8">

//                     <div className="w-full bg-[var(--card)] rounded-2xl shadow-lg p-8">

//                         {!showSupport ? (
//                             // ✅ FEEDBACK UI
//                             <>
//                                 <h1 className="text-xl font-semibold mb-4">Feedback</h1>

//                                 {/* Tabs */}
//                                 <div className="flex gap-2 bg-gray-200 p-1 rounded-full mb-4">
//                                     {["Suggestion", "Bug", "Experience"].map((item) => (
//                                         <button
//                                             key={item}
//                                             className="flex-1 py-2 rounded-full bg-pink-400 text-white text-sm"
//                                         >
//                                             {item}
//                                         </button>
//                                     ))}
//                                 </div>

//                                 {/* Textarea */}
//                                 <textarea
//                                     placeholder="Describe..."
//                                     className="w-full p-3 border rounded-lg mb-4"
//                                 />

//                                 {/* Hearts */}
//                                 <div className="flex justify-center gap-2 mb-4 text-2xl">
//                                     {[1, 2, 3, 4, 5].map((i) => (
//                                         <span key={i}>❤️</span>
//                                     ))}
//                                 </div>

//                                 {/* Button */}
//                                 <button
//                                     onClick={() => setShowSupport(true)}
//                                     className="w-full py-3 rounded-lg text-white 
//             bg-gradient-to-r from-pink-400 to-indigo-500"
//                                 >
//                                     ➤ Send Feedback
//                                 </button>
//                             </>
//                         ) : (
//                             // ✅ SUPPORT FORM
//                             <>
//                                 <h1 className='text-2xl font-semibold mb-4'>Contact Support</h1>

//                                 <div className="bg-gradient-to-r from-[#7133A8] via-[#E4678C] to-[#FC9A86] p-4 rounded-xl mb-6 flex gap-3 items-start">
//                                     <div className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
//                                         ?
//                                     </div>
//                                     <div>
//                                         <h2 className="font-semibold">How can we help?</h2>
//                                         <p className="text-sm text-gray-600">
//                                             We’re here to ensure your experience is safe and enjoyable.
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <form onSubmit={handleSubmit} className="space-y-4">
//                                     {/* Topic */}
//                                     <select
//                                         name="topic"
//                                         value={form.topic}
//                                         onChange={handleChange}
//                                         className="w-full p-3 border rounded-lg"
//                                     >
//                                         <option value="">Select topic</option>
//                                         {topicsList.map((t, i) => (
//                                             <option key={i}>{t}</option>
//                                         ))}
//                                     </select>

//                                     {/* Message */}
//                                     <textarea
//                                         name="message"
//                                         value={form.message}
//                                         onChange={handleChange}
//                                         className="w-full p-3 border rounded-lg"
//                                     />

//                                     <button className="w-full py-3 bg-gradient-to-r from-pink-400 to-indigo-500 text-white rounded-lg">
//                                         Send Message
//                                     </button>
//                                 </form>

//                                 {/* Back */}
//                                 <button
//                                     onClick={() => setShowSupport(false)}
//                                     className="mt-4 text-blue-500"
//                                 >
//                                     ← Back
//                                 </button>
//                             </>
//                         )}

//                     </div>
//                 </div>
//                 <div className="lg:col-span-1"> <Right /> 0</div>

//             </div>
//         </>
//     )
// }

// export default Help



import React, { useState } from "react";
import ContactSupport from "./ContactSupport";
import Feedback from "./Feedback";
import FAQ from "./FAQ";
import Navbar from "../../Navbar/Navbar";
import Right from "../layout/Right";
function Help() {
  const [step, setStep] = useState("contact");
return (
  <div className="min-h-screen bg-[var(--bg-background)] text-[var(--text-dim)]">

    {/* Navbar */}
    <Navbar />

    {/* Main Layout */}
    <div className="max-w-7xl mx-auto px-4 py-6">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2">

          <div className="bg-[var(--bg-card)]/10 border border-[var(--border)] rounded-3xl p-6 shadow-sm min-h-[700px]">

            {step === "contact" && (
              <ContactSupport
                onNext={() => setStep("feedback")}
              />
            )}

            {step === "feedback" && (
              <Feedback
                onNext={() => setStep("faq")}
              />
            )}

            {step === "faq" && <FAQ />}

          </div>

        </div>

        {/* RIGHT SECTION */}
        <aside className="w-full">

          <div className="sticky top-6">
            <Right />
          </div>

        </aside>

      </div>

    </div>

  </div>
);
}

export default Help