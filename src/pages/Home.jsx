import { useMemo, useState, useEffect } from "react";
import { Countdown } from "../components/Countdown";
import Events from "../components/Events";
import Clubs from "../components/Clubs";
import VideoCarousel from "../components/VideoCarousel";
import Faq from "../components/Faq";
import Sponsors from "../components/Sponsors";

export default function Index() {
  const [countdownStart] = useState(
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  );

  // Hide the right-side scrollbar on Home page only (html + body)
  useEffect(() => {
    document.body.classList.add("scrollbar-none");
    document.documentElement.classList.add("scrollbar-none");
    return () => {
      document.body.classList.remove("scrollbar-none");
      document.documentElement.classList.remove("scrollbar-none");
    };
  }, []);

  const stars = useMemo(() => {
    const STAR_COUNT = 150;

    return Array.from({ length: STAR_COUNT }).map((_, i) => {
      const size = Math.random() > 0.7 ? 2 : 1;
      const left = Math.random() * 98;
      const top = Math.random() * 100;

      const twinkleDuration = 0.8 + Math.random() * 1.8;
      const twinkleDelay = Math.random() * 2;

      const moveDuration = 10 + Math.random() * 18;
      const moveDelay = Math.random() * 3;

      const opacity = 0.2 + Math.random() * 0.8;

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
      };
    });
  }, []);

  return (
    <div className="relative w-full bg-black overflow-hidden">
      {/* ✅ background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white will-change-transform"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${Math.min(star.left, 98)}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              animation: `
                twinkleStrong ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite alternate,
                moveStar ${star.moveDuration}s linear ${star.moveDelay}s infinite alternate
              `,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full">
        {/* ✅ HERO SECTION */}
        <section className="relative w-full overflow-hidden">
          <div
            className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col items-center justify-start text-center 
                       px-3 sm:px-6 lg:px-10
                       pt-32 sm:pt-40 md:pt-28 lg:pt-32 xl:pt-36 2xl:pt-40
                       pb-0 m-0"
          >
            {/* ✅ Title */}
            <div className="flex flex-col items-center justify-center m-0 p-0 space-y-1 sm:space-y-2">
              <h1
                className="flex items-center justify-center text-white leading-none flex-nowrap gap-2 sm:gap-3 m-0 p-0"
                style={{
                  fontFamily: "Tac One",
                  fontWeight: 1000,
                  letterSpacing: "-0.10em",
                  fontSize: "clamp(56px, 10vw, 140px)",
                }}
              >
                <span>M</span>

                <div style={{ perspective: "1000px" }}>
                  <div className="rounded-full overflow-hidden w-[clamp(52px,9vw,110px)] h-[clamp(52px,9vw,110px)] m-0 p-0">
                    <video
                      src="https://res.cloudinary.com/desybsga6/video/upload/v1768939310/moon_zsbpxz.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: "Symbol",
                    fontWeight: 1000,
                    letterSpacing: "-0.10em",
                    fontSize: "clamp(52px, 9vw, 110px)",
                  }}
                >
                  O
                </span>

                <span
                  style={{
                    fontFamily: "Tac One",
                    fontWeight: 1000,
                    letterSpacing: "-0.10em",
                    fontSize: "clamp(52px, 9vw, 120px)",
                  }}
                >
                  N
                </span>
              </h1>

              <h2
                className="text-white drop-shadow-lg m-0 p-0"
                style={{
                  fontFamily: "Squada One",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(30px, 7vw, 90px)",
                }}
              >
                STONE ' 26
              </h2>
            </div>

            {/* ✅ Button */}
            <div className="mt-2 sm:mt-3 md:mt-4 mb-3 sm:mb-4 md:mb-5 m-0 p-0">
              <button
                onClick={() => {
                  // Scroll to Explore Events (Discover What's Happening Next)
                  const target = document.querySelector("#events-section");
                  if (target) {
                    const top =
                      target.getBoundingClientRect().top + window.scrollY - 80; // account for navbar
                    window.scrollTo({ top, behavior: "smooth" });
                  } else {
                    // Fallback: navigate to All Events page
                    window.location.href = "/allevents";
                  }
                }}
                className="inline-flex px-6 sm:px-7 py-2 justify-center items-center gap-2.5 rounded-[25px] text-white text-[16px] sm:text-[18px] md:text-[20px] font-normal transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(255, 255, 255, 0.20)",
                  backdropFilter: "blur(2px)",
                  fontFamily: "'Spline Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(90deg, #8B3A8B 0%, #5A4A9F 100%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.20)";
                }}
              >
                Explore Events
              </button>
            </div>

            {/* ✅ COUNTDOWN + VIDEO CAROUSEL (NO GAP) */}
            <div className="w-full flex flex-col items-center justify-start m-0 p-0 gap-0">
              <div className="w-full flex justify-center m-0 p-0">
                <div className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[640px] m-0 p-0">
                  <Countdown startTime={countdownStart} />
                </div>
              </div>

              <div className="w-full m-0 p-0 -mt-[1px]">
                <VideoCarousel />
              </div>
            </div>

            <style>{`
              @keyframes twinkleStrong {
                0%   { opacity: 0.05; transform: scale3d(0.9, 0.9, 1) translateZ(0); }
                50%  { opacity: 1;    transform: scale3d(1.35, 1.35, 1) translateZ(0); }
                100% { opacity: 0.15; transform: scale3d(1, 1, 1) translateZ(0); }
              }

              @keyframes moveStar {
                0%   { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(80px, -60px, 0); }
              }

              @keyframes spin3D {
                from { transform: rotateY(0deg); }
                to   { transform: rotateY(360deg); }
              }
            `}</style>
          </div>
        </section>

        <div className="w-full flex flex-col m-0 p-0 space-y-2 sm:space-y-3 md:space-y-4">
          {/* Glimpses Of Events */}
          <div id="glimpses-section" className="w-full m-0 p-0 ">
            <Events />
          </div>

          {/* Clubs */}
          <div className="w-full m-0 p-0">
            <Clubs />
          </div>

          {/* Sponsors */}
          <section id="sponsors" className="w-full m-0 p-0">
            <Sponsors />
          </section>

          {/* FAQ */}
          <div className="w-full m-0 p-0">
            <Faq />
          </div>
        </div>
      </div>
    </div>
  );
}
