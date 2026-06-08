import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitFeedbackApi } from "../../Redux/supportSlice";
import {Heart} from "lucide-react";
const Feedback = ({ onNext }) => {

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.support);

  const [type, setType] = useState("Suggestion");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {

    if (!desc || !rating) {
      alert("Please fill all fields");
      return;
    }

    const result = await dispatch(
      SubmitFeedbackApi({
        category: type,
        message: desc,
        rating,
      })
    );

    console.log(result);

    if (result?.type === "feedback/submit/fulfilled") {
      alert("Feedback submitted successfully");
      onNext();
    } else {
      alert("Failed to submit feedback");
    }
  };

  return (
    <div className="bg-[var(--bg-card)]/10 p-6 rounded-2xl shadow-md h-full">

      <h1 className="text-xl font-semibold mb-4">
        Feedback
      </h1>

      <h2 className="text-lg font-semibold mb-2">
        We Value Your Voice
      </h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {["Suggestion", "Bug", "Experience"].map((item) => (
          <button
            key={item}
            onClick={() => setType(item)}
            className={`flex-1 py-2 rounded-full ${
              type === item
                ? "bg-pink-400 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        className="w-full p-3 border rounded-lg mb-4"
        placeholder="Describe..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      {/* Rating */}
      <div className="flex gap-2 justify-center mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            onClick={() => setRating(i)}
            className={`text-8xl cursor-pointer ${
              i <= rating
                ? "text-[#FFB4A0]"
                : "text-[#FFB4A066]"
            }`}
          >
            <Heart className="fill-current size-10 border-none" />
          </span>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-pink-400 to-blue-500 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Feedback"}
      </button>

    </div>
  );
};

export default Feedback;