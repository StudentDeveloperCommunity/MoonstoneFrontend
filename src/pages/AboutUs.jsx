import React from "react";
import banner from "../assets/herosection/banner.png";
import img1 from "../assets/club/techno-club-banner.png";
import img2 from "../assets/club/sports-club-banner.png";
import img3 from "../assets/club/cultural-club-banner.png";

export default function AboutUs() {
  return (
    <div className="w-full flex mt-0 flex-col bg-black text-white items-center justify-center pt-20 pb-10">

      {/* ---------- TOP SECTION (FULL WIDTH IMAGE) ---------- */}
      <section className="w-full h-full  mb-20">
        
        {/* Full Width Image */}
        <img
          src={banner}
          alt="Moonstone at Medicaps"
          className=" w-full h-1/2 object-cover mb-8"
        />

        {/* Text Below Image */}
        <div>
          <h2 className="text-3xl md:text-4xl px-8 font-bold mb-4 text-center md:text-left">
            Moonstone at Medi-Caps
          </h2>

          <p className="text-lg leading-relaxed px-10 text-gray-300 text-center md:text-left">
            Moonstone at Medi-Caps University is a dynamic student-driven initiative 
            that brings together creativity, innovation, and leadership.
            It serves as a platform for students to explore opportunities, 
            learn new skills, manage events, and build a strong campus community.
            Through a wide range of activities, Moonstone helps students grow 
            both personally and professionally while celebrating unity and talent.
          </p>
        </div>
      </section>

      {/* ---------- REUSABLE GRADIENT BUTTON ---------- */}
      {/* Add this component anywhere */}
      
      {/* ---------- TECHNO CLUB ---------- */}
      <section className="w-full max-w-6xl grid md:grid-cols-2 gap-10 px-6 mb-20">
        
        {/* Left Image */}
        <div>
          <img
            src={img1}
            alt="Techno Club"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-3">Techno Club</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            The Techno Club empowers students interested in programming, robotics, AI, 
            and modern tech innovations. Through workshops, hackathons, mentorship 
            sessions, and technical events, the club helps students develop strong 
            problem-solving and development skills.
          </p>

          {/* Gradient Button */}
          <button
            className="h-12 w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            text-white font-semibold rounded-full shadow-xl mt-5 transition-all duration-300
            hover:scale-105 hover:shadow-2xl"
            onClick={()=>window.location.href="/club?id=1"}
          >
            View Events →
          </button>
        </div>

      </section>

      {/* ---------- CULTURAL CLUB (REVERSED) ---------- */}
      <section className="w-full max-w-6xl grid md:grid-cols-2 gap-10 px-6 mb-20">

        {/* Right Image on Desktop */}
        <div className="md:order-2">
          <img
            src={img2}
            alt="Cultural Club"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center md:order-1">
          <h3 className="text-2xl font-bold mb-3">Cultural Club</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            The Cultural Club celebrates creativity through dance, music, theatre, 
            and visual arts. It creates a space for students to express themselves and 
            discover their artistic talents while organising university-wide cultural 
            events and festivals.
          </p>

          {/* Gradient Button */}
          <button
            className="h-12 w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            text-white font-semibold rounded-full shadow-xl mt-5 transition-all duration-300
            hover:scale-105 hover:shadow-2xl"
            onClick={()=>window.location.href="/club?id=3"}

          >
            View Events →
          </button>
        </div>

      </section>

      {/* ---------- SPORTS CLUB ---------- */}
      <section className="w-full max-w-6xl grid md:grid-cols-2 gap-10 px-6">

        {/* Left Image */}
        <div>
          <img
            src={img3}
            alt="Sports Club"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-3">Sports Club</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            The Sports Club promotes fitness, teamwork, discipline, and competitive spirit. 
            Through tournaments, training sessions, and various indoor/outdoor games, 
            students learn to maintain a healthy lifestyle while representing the university.
          </p>

          {/* Gradient Button */}
          <button
            className="h-12 w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            text-white font-semibold rounded-full shadow-xl mt-5 transition-all duration-300
            hover:scale-105 hover:shadow-2xl"
            onClick={()=>window.location.href="/club?id=2"}

          >
            View Events →
          </button>
        </div>

      </section>

    </div>
  );
}
