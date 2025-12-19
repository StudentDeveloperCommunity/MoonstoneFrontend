import React from "react";
import backIcon from "../assets/eventsindetails/back.svg";
import combatImg from "../assets/eventsindetails/Frame.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../NwConfig";
export default function Eventsindetails() {
  const location=useLocation()
  const Navigate=useNavigate()
  const event=location.state?.event || {}
  const redirecttoregister=(event)=>{
    Navigate("/register",{state:{event:event}})
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
}
function formatTime(timeString) {
  if (!timeString) return "";

  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours, minutes);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
  // console.log(event)
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="relative w-full max-w-6xl top-12 md:top-14 bg-black text-white rounded-2xl shadow-2xl p-6 md:p-10">
        {/* Back Button (Image) */}
        <button className="absolute md:top-10 left-4 md:left-0">
          <img
          onClick={() => Navigate(-1)}
            src={backIcon}
            alt="Back"
            className="w-14 h-14 hover:scale-110 transition"
          />
        </button>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-10 md:ml-6">
          {/* LEFT: Image + Button */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <img
              src={`${API_URL}/${event?.image}`}
              alt="Kampus Combat"
              className="rounded-2xl w-full max-w-sm md:max-w-full object-cover"
            />

            {/* Register Button BELOW IMAGE */}
            <button
              className="mt-5 w-full py-3 rounded-xl text-white text-[24px] font-semibold md:font-bold
              bg-gradient-to-r from-[#042790] to-[#A2162E] hover:opacity-90 transition"
                              onClick={()=>redirecttoregister(event)}

            >
              
              Register Now
            </button>
          </div>

          {/* RIGHT: Event Details */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="text-2xl md:text-4xl font-bold mb-3">
              {event?.title}
            </h1>

            <p className="text-sm md:text-base text-gray-300 font-semibold mb-4">
              {formatDate(event?.eventDate)} &nbsp; | &nbsp; V-BLOCK 126 <br />
              {formatTime(event?.eventTime)}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#00BC71] text-black px-4 py-2 rounded-xl text-sm font-semibold">
                ₹{event?.fee} /- 
              </span>
              <span className="text-sm text-gray-300">
                {event?.minParticipants}–{event?.maxParticipants} Members in a Team
              </span>
            </div>

            {/* Info */}
            <div className="text-sm text-gray-400 space-y-1 mb-5 md:text-[14px] font-arial">
              <p>Convener: <span className="text-white">Dr. Sanket Gupta, +91 1234567890</span></p>
              <p>Student Coordinator: <span className="text-white">Eshaan Sharma, +91 1234567890</span></p>
              <p>Organized by: <span className="text-white">Developers Community</span></p>
              <p>Last date to Register: <span className="text-white">8 February, 2025</span></p>
            </div>

            {/* Description */}
            <p className="text-md text-gray-300 leading-relaxed md:text-[16px] font-arial text-justify">
              {event?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
