
import React, { useMemo } from "react";
import banner from "../assets/herosection/banner.png";
import img1 from "../assets/club/techno-club-banner.png";
import img2 from "../assets/club/sports-club-banner.png";
import img3 from "../assets/club/cultural-club-banner.png";

export default function AboutUs() {
  // ⭐ Generate stars ONLY ONCE (so they don't change on re-render)
  const stars = useMemo(() => {
    const STAR_COUNT = 130; // increase to 180 for more stars

    return Array.from({ length: STAR_COUNT }).map((_, i) => {
      const size = Math.random() > 0.7 ? 2 : 1;
      const left = Math.random() * 98;
      const top = Math.random() * 100;

      const twinkleDuration = 0.8 + Math.random() * 1.8;
      const twinkleDelay = Math.random() * 2;

      const moveDuration = 10 + Math.random() * 18;
      const moveDelay = Math.random() * 3;

      const opacity = 0.35 + Math.random() * 0.65;
      const glow = 6 + Math.random() * 10;

      return {
        id: i,
        size,
        left,
        top,
        twinkleDuration,
        twinkleDelay,
        moveDuration,
        moveDelay,
        opacity,
        glow,
      };
    });
  }, []);

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      {/* ✅ Full-page animated stars background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${Math.min(star.left, 98)}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.glow}px rgba(255,255,255,0.9)`,
              animation: `
                twinkleStrong ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite alternate,
                moveStar ${star.moveDuration}s linear ${star.moveDelay}s infinite alternate
              `,
            }}
          />
        ))}
      </div>

      {/* ✅ Actual content above stars */}
      <div className="relative z-10 w-full flex mt-0 flex-col items-center justify-center pt-20 pb-10">
        {/* ---------- TOP SECTION (FULL WIDTH IMAGE) ---------- */}
        <section className="w-full h-full mb-20">
          {/* Full Width Image */}
          <img
            src={"https://res.cloudinary.com/desybsga6/image/upload/v1768939215/banner_vcwnek.png"}
            alt="Moonstone at Medicaps"
            className="w-full h-1/2 object-cover mb-8"
          />

          {/* Text Below Image */}
          <div>
            <h2 className="text-3xl md:text-4xl px-8 font-bold mb-4 text-center md:text-left">
              Moonstone at Medi-Caps
            </h2>

            <p className="text-lg leading-relaxed px-10 text-gray-300 text-center md:text-left">
              Moonstone at Medi-Caps University is a dynamic student-driven
              initiative that brings together creativity, innovation, and
              leadership. It serves as a platform for students to explore
              opportunities, learn new skills, manage events, and build a strong
              campus community. Through a wide range of activities, Moonstone
              helps students grow both personally and professionally while
              celebrating unity and talent.
            </p>
          </div>
        </section>

        {/* ---------- TECHNO CLUB ---------- */}
        <section id="techno-club" className="w-full max-w-6xl grid md:grid-cols-2 gap-10 px-6 mb-20">
          {/* Left Image */}
          <div className="flex justify-center items-center">
            <div className="rounded-2xl border border-white/20 p-3 bg-transparent shadow-lg">
              <img
                src={"https://res.cloudinary.com/desybsga6/image/upload/v1768936832/techno-club-banner_qutmc7.jpg"}
                alt="Techno Club"
                className="w-full max-w-lg h-72 md:h-72 object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-3">Techno Club</h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              The Techno Club empowers students interested in programming,
              robotics, AI, and modern tech innovations. Through workshops,
              hackathons, mentorship sessions, and technical events, the club
              helps students develop strong problem-solving and development
              skills.
            </p>

            <button
              className="h-12 w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                 text-white font-semibold rounded-full shadow-xl mt-5
                 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => (window.location.href = "/allevents?id=1")}
            >
              View Events →
            </button>
          </div>
        </section>

        {/* ---------- CULTURAL CLUB (REVERSED) ---------- */}
        <section id="cultural-club" className="w-full max-w-6xl grid md:grid-cols-2 gap-10 px-6 mb-20">
          {/* Right Image on Desktop */}
          <div className="md:order-2 flex justify-center items-center">
            <div className="rounded-2xl border border-white/20 p-3 bg-transparent shadow-lg">
              <img
                src={"https://res.cloudinary.com/desybsga6/image/upload/v1768934610/cultural-club-banner_b7kwyo"}
                alt="Cultural Club"
                className="w-full max-w-lg h-60 md:h-80 object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center md:order-1">
            <h3 className="text-2xl font-bold mb-3">Cultural Club</h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              The Cultural Club celebrates creativity through dance, music,
              theatre, and visual arts. It creates a space for students to
              express themselves and discover their artistic talents while
              organising university-wide cultural events and festivals.
            </p>

            <button
              className="h-12 w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                 text-white font-semibold rounded-full shadow-xl mt-5
                 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => (window.location.href = "/allevents?id=3")}
            >
              View Events →
            </button>
          </div>
        </section>

        {/* ---------- SPORTS CLUB ---------- */}
        <section id="sports-club" className="w-full max-w-6xl grid md:grid-cols-2 gap-10 px-6">
          {/* Left Image */}
          <div className="flex justify-center items-center">
            <div className="rounded-2xl border-2 border-white/20 p-3 bg-transparent shadow-lg">
              <img
                src={"https://res.cloudinary.com/desybsga6/image/upload/v1768936941/sports-club-banner_tpvqqx.png"}
                alt="Sports Club"
                className="w-full max-w-lg h-80 object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-3">Sports Club</h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              The Sports Club promotes fitness, teamwork, discipline, and
              competitive spirit. Through tournaments, training sessions, and
              various indoor/outdoor games, students learn to maintain a healthy
              lifestyle while representing the university.
            </p>

            <button
              className="h-12 w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                 text-white font-semibold rounded-full shadow-xl mt-5
                 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => (window.location.href = "/allevents?id=2")}
            >
              View Events →
            </button>
          </div>
        </section>

      </div>

      {/* ✅ Stars Animations */}
      <style>{`
        @keyframes twinkleStrong {
          0%   { opacity: 0.15; transform: scale(0.9); }
          50%  { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0.25; transform: scale(1); }
        }

        @keyframes moveStar {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, -60px); }
        }
      `}</style>
    </div>
  );
}