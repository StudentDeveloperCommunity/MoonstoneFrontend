import React from "react";
import backIcon from "../assets/eventsindetails/back.svg";
import combatImg from "../assets/eventsindetails/Frame.svg";

export default function KampusCombatPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="relative w-full max-w-6xl top-12 md:top-14 bg-black text-white rounded-2xl shadow-2xl p-6 md:p-10">
        {/* Back Button (Image) */}
        <button className="absolute md:top-10 left-4 md:left-0">
          <img
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
              src={combatImg}
              alt="Kampus Combat"
              className="rounded-2xl w-full max-w-sm md:max-w-full object-cover"
            />

            {/* Register Button BELOW IMAGE */}
            <button
              className="mt-5 w-full py-3 rounded-xl text-white text-[24px] font-semibold md:font-bold
              bg-gradient-to-r from-[#042790] to-[#A2162E] hover:opacity-90 transition"
            >
              Register Now
            </button>
          </div>

          {/* RIGHT: Event Details */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="text-2xl md:text-4xl font-bold mb-3">
              KAMPUS COMBAT
            </h1>

            <p className="text-sm md:text-base text-gray-300 font-semibold mb-4">
              12 FEBRUARY, 2025 &nbsp; | &nbsp; V-BLOCK 126 <br />
              02.00 PM – 04.00 PM
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#00BC71] text-black px-4 py-2 rounded-xl text-sm font-semibold">
                ₹150/- per Person
              </span>
              <span className="text-sm text-gray-300">
                1–4 Members in a Team
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
              Figma ipsum component variant main layer. Device main create pen
              component component device. Move project move flatten slice frame.
              Pixel reesizing draft invite layout. Horizontal rectangle
              horizontal overflow slice rotate hand style. Vector strikethrough
              background component bold polygon rotate. Style text background
              pencil slice scale connection draft mask. <br />Ellipse image device
              vector create. Blur editor strikethrough layer device variant.
              Horizontal background pencil scale scale italic clip main
              strikethrough arrow. Bold editor strikethrough polygon polygon
              reesizing frame move opacity group. Create distribute main flatten
              overflow layout move comment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
