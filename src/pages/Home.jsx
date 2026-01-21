import { useMemo, useState } from "react";
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
      {/* background */}
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
        <div className="relative min-h-screen w-full overflow-hidden">
          <div
            className="relative flex flex-col items-center text-center px-2"
            style={{ paddingTop: "20vh" }}
          >
            <div className="flex flex-col items-center justify-center  space-y-0">
              <h1
                className="flex items-center justify-center text-white leading-none flex-nowrap gap-[0.20em]"
                style={{
                  fontFamily: "Tac One",
                  fontWeight: 1000,
                  letterSpacing: "-0.12em",
                  fontSize: "clamp(100px, 10vw, 140px)",
                }}
              >
                <span>M</span>

                <div
                  style={{
                    perspective: "1000px",
                  }}
                >
                  <div className="w-[clamp(70px,10vw,110px)] h-[clamp(70px,10vw,110px)] rounded-full overflow-hidden">
                    <video
                      src={"https://res.cloudinary.com/desybsga6/video/upload/v1768939310/moon_zsbpxz.mp4"}
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
                    letterSpacing: "-0.12em",
                    fontSize: "clamp(70px, 10vw, 100px)",
                  }}
                >
                  O
                </span>

                <span
                  style={{
                    fontFamily: "Tac One",
                    fontWeight: 1000,
                    letterSpacing: "-0.12em",
                    fontSize: "clamp(70px, 10vw, 110px)",
                  }}
                >
                  N
                </span>
              </h1>

              <h2
                className="text-white mt-0.2 drop-shadow-lg"
                style={{
                  fontFamily: "Squada One",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(50px, 8vw, 90px)",
                }}
              >
                STONE ' 26
              </h2>
            </div>

            <div className="mb-8 md:mb-10">
              <button
                onClick={() => {
                  document
                    .getElementById("events-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex px-7 py-1.5 justify-center items-center gap-2.5 rounded-[25px] text-white text-[18px] md:text-[20px] font-normal transition-all duration-300 hover:scale-105 group"
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

            <div className="pt-6 scale-90 md:scale-95 mt-3 max-w-md">
              <Countdown startTime={countdownStart} />
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

        <VideoCarousel />
        <Events />
        <Clubs />
        <section id="sponsors">
        <Sponsors />
        </section>
        <Faq />
      </div>
    </div>
  );
}
