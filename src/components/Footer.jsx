import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/FinalLogo.png";
import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa6";

export default function Footer() {
  const navigate = useNavigate();

  const handleClubNavigation = (clubId) => {
    // Navigate to about page first
    navigate("/about");

    // Then scroll to the specific club section after a short delay
    setTimeout(() => {
      const element = document.getElementById(clubId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

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

  const socialLinks = [
    {
      icon: FaLinkedinIn,
      link: "https://www.linkedin.com/school/medicaps-university-indore/posts/?feedView=all",
      label: "LinkedIn",
    },
    {
      icon: FaInstagram,
      link: "https://www.instagram.com/medicaps_university/",
      label: "Instagram",
    },
    {
      icon: FaYoutube,
      link: "https://www.youtube.com/@medicaps_university",
      label: "YouTube",
    },
    // { icon: FaXTwitter, link: "#", label: "Twitter" },
    {
      icon: FaFacebookF,
      link: "https://www.facebook.com/medicapsuniversityindore/",
      label: "Facebook",
    },
  ];

  const gradientHover =
    "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:via-pink-500 hover:to-cyan-400 transition-all duration-300 hover:scale-105 inline-block origin-left";

  return (
    <footer className="relative w-full bg-black text-white py-12 px-4 md:px-10 overflow-hidden font-sans">
      {/* background - same as home page */}
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

      <div className="relative max-w-[1440px] mx-auto z-10">
        <div
          className="
            border border-white/20 rounded-3xl px-6 md:px-12 py-10 md:py-16
            bg-transparent
            transition-all duration-500
          "
        >
          {/* ✅ MAIN ROW (Aligned like image) */}
          <div className="flex flex-col xl:flex-row items-start justify-between gap-12 mb-10">
            {/* LEFT: LOGO - navigates to Home */}
            <Link
              to="/"
              aria-label="Go to Home"
              className="group cursor-pointer w-full xl:w-[32%] flex justify-center xl:justify-start"
            >
              <img
                src={logo}
                alt="Moonstone Logo"
                className="w-80 sm:w-96 md:w-[28rem] h-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />
            </Link>

            {/* CENTER: LINKS (two columns) */}
            <div className="w-full xl:w-[38%] flex justify-center">
              <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm font-semibold text-gray-300">
                {/* Column 1 */}
                <div className="flex flex-col gap-2">
                  {/* About page changed to highlights */}
                  <Link to="/about" className={gradientHover}>
                    Highlights
                  </Link>
                  <Link to="/allevents" className={gradientHover}>
                    Events
                  </Link>
                  <Link to="/developers" className={gradientHover}>
                    Developers
                  </Link>
                  
                  {/* <Link to="/" state={{ scrollTo: "sponsors" }}>
                    Sponsors
                  </Link> */}
                  <Link to="/" state={{ scrollTo: "sponsors" }} className={gradientHover}>
  Sponsors
</Link>

                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleClubNavigation("techno-club")}
                    className={gradientHover + " text-left"}
                  >
                    Subordinate Clubs
                  </button>
                  <button
                    onClick={() => handleClubNavigation("techno-club")}
                    className={gradientHover + " text-left"}
                  >
                    Techno
                  </button>
                  <button
                    onClick={() => handleClubNavigation("cultural-club")}
                    className={gradientHover + " text-left"}
                  >
                    Cultural
                  </button>
                  <button
                    onClick={() => handleClubNavigation("sports-club")}
                    className={gradientHover + " text-left"}
                  >
                    Sports
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: ADDRESS */}
            <div className="w-full xl:w-[30%] flex flex-col items-center xl:items-center text-gray-300 text-sm font-semibold">
              <p className="sm:text-md text-xl text-gray-200 leading-relaxed text-center xl:text-right">
                A.B. Road Pigdamber, Rau,
                <br />
                Indore, Madhya Pradesh
                <br />
                453331
              </p>

              {/* ✅ contact section */}
              <div className="mt-4 flex flex-col items-center xl:items-end gap-2">
                {/* ✅ numbers in same row */}
                <div className="flex flex-row gap-4 items-center justify-center xl:justify-end">
                  <a
                    href="tel:+917313111500"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +91 7313111500
                  </a>

                  <span className="text-gray-500">•</span>

                  <a
                    href="tel:+917313111501"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +91 7313111501
                  </a>
                </div>

                {/* email */}
                <a
                  href="mailto:director.admissions@medicaps.ac.in"
                  className="text-gray-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  director.admissions@medicaps.ac.in
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-6 sm:gap-4 justify-center xl:justify-start flex-wrap">
            {socialLinks.map((item, i) => (
              <a
                key={i}
                href={item.link}
                aria-label={item.label}
                className="
                  group relative w-12 h-12 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                  bg-white/10 border border-white/10 overflow-hidden
                  transition-all duration-300 ease-out
                  hover:scale-110 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]
                  hover:border-transparent
                "
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-orange-500 via-pink-500 to-cyan-500 transition-opacity duration-300" />
                <item.icon className="relative z-10 text-xl sm:text-lg text-gray-300 group-hover:text-white transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-white/10 pt-8 gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter uppercase leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400 animate-pulse">
                MOONSTONE 2k26
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-2 tracking-widest uppercase">
              Designed & Developed by Student Developers' Community
            </p>
          </div>

          <p className="text-xs text-gray-600 text-center md:text-right">
            2026 — All Rights Reserved.
          </p>
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
      `}</style>
    </footer>
  );
}
