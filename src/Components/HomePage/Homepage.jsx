import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Navbar from "../Navbar/Navbar";
import infinite from "/Image/infinet.png"
import Heart from "/Image/Heart-icon.png";
import noto from "/Image/noto.png"
import icon from "/Image/icon.png"
// import { Heart } from 'lucide-react';
import chatImg from "/Image/chatIcon.png";
import ChatRulesModal from "../Cards/ChatRulesModal";
import LucasLabOverview from "./LucasLabOverview";
import FreeChatModal from "../Cards/FreeChatModal";
import ProfilePopup from "./ProfilePopup";
import "./Homepage.css";
import { BadgeCheck, MessageCircle, Infinity } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../Components/Redux/discoverySlice";




function Homepage() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const navigate = useNavigate();
  const settings = {
    centerMode: true,
    centerPadding: "220px",
    slidesToShow: 1,
    infinite: true,
    arrows: true,
    speed: 500,
  };

  const [flowOpen, setFlowOpen] = useState(false);
  const dispatch = useDispatch();

  const { profiles, loading } = useSelector(
    (state) => state.discovery
  );
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);
  console.log("Profiles:", profiles);
  console.log("Loading:", loading);
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (
      month < 0 ||
      (month === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  return (
    <>
      <Navbar />

      <div className="w-full h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="w-[800px]">

          <Slider {...settings}>
            {profiles.map((item) => (
              <div
                key={item.id}
                className="px-4 shadow-2xl rounded-2xl cursor-pointer"
                onClick={() => {
                  setSelectedProfile(item);
                  setActiveModal("profile");
                }}
              >

                <div className="relative rounded-3xl overflow-hidden shadow-xl w-80 ">

                  {/* Image */}
                  <img
                    src={
                      item.profileImage
                        ? `http://35.180.139.208:3000/${item.profileImage}`
                        : "https://i.pravatar.cc/150"
                    }
                    alt={item.fullName}
                    className="w-full h-[520px] object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">

                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        {item.fullName}, {calculateAge(item.dob)}
                        <span className="text-blue-500">
                          <BadgeCheck />
                        </span>
                      </h2>

                      <button
                        onClick={() => setActiveModal("rules")}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden hover:scale-110 transition"
                      >
                        <MessageCircle />

                      </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 flex justify-between items-center bg-black/50 rounded-full px-5 py-2 text-sm backdrop-blur-md">
                      <span className="flex gap-2 text-[#FF6467]"><img src={Heart} alt="" className="w-8 " /> {item.like}%</span>
                      <span className="flex gap-2 text-[#FB64B6]"><img src={noto} alt="" className="w-8" /> {item.match}%</span>
                      <span className="flex gap-2  text-[#C27AFF]"><img src={infinite} alt="" className="w-8" /><Infinity className="mt-2" /></span>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </Slider>

          {/* Bottom Buttons */}
          {/* <div className="flex justify-center items-center gap-6 mt-2">
            
            <button className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 text-xl hover:scale-110 transition">
              ✖
            </button>

            <button className="w-16 h-16 bg-gradient-to-r from-[#E4678C] to-[#FC9A86] rounded-full shadow-lg flex items-center justify-center text-white text-xl hover:scale-110 transition">
            <img src={icon} alt="" />
            </button>

            <button className="w-14 h-14 bg-[#A000F0] rounded-full shadow-lg flex items-center justify-center text-white text-xl hover:scale-110 transition">
              <img src={Heart} alt="" className="w-10"/> 
            </button>

          </div> */}
          <div className="flex justify-center items-center gap-6 mt-2">

            {/* ❌ Button → Rules Modal */}
            <button
              onClick={() => setActiveModal("rules")}
              className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 text-xl hover:scale-110 transition"
            >
              ✖
            </button>

            {/* 🔥 Middle Button → Premium Modal */}
            <button
              onClick={() => setActiveModal("premium")}
              className="w-16 h-16 bg-gradient-to-r from-[#E4678C] to-[#FC9A86] rounded-full shadow-lg flex items-center justify-center text-white text-xl hover:scale-110 transition"
            >
              <img src={icon} alt="" />
            </button>

            {/* ❤️ LikeButton  */}
            <button
              onClick={() => setActiveModal("profile")}
              className="   w-14 h-14  rounded-full   bg-gradient-to-r from-[#A000F0] to-[#8A38F5]   flex items-center justify-center  hover:scale-105 transition-all duration-300 "
            >
              <img src={Heart} alt="" />

            </button>
          </div>
        </div>
      </div>
      {/* Modals */}

      {activeModal === "rules" && (
        <ChatRulesModal
          onClose={() => setActiveModal(null)}
          onContinue={() => setActiveModal("free")}
        />)}

      {activeModal === "premium" && (
        <LucasLabOverview onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "free" && (
        <FreeChatModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "profile" && (
        <ProfilePopup
          profile={selectedProfile}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}

export default Homepage;