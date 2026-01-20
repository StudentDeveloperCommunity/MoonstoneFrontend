import React, { useMemo } from "react";
import logo from "../assets/logo/mnsnt 2.png";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

export default function Footer() {
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
    { icon: FaLinkedinIn, link: "#", label: "LinkedIn" },
    { icon: FaInstagram, link: "#", label: "Instagram" },
    { icon: FaYoutube, link: "#", label: "YouTube" },
    { icon: FaXTwitter, link: "#", label: "Twitter" },
    { icon: FaFacebookF, link: "#", label: "Facebook" },
  ];

  const gradientHover = "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:via-pink-500 hover:to-cyan-400 transition-all duration-300 hover:scale-105 inline-block origin-left";

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
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
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
          <div className="flex flex-col xl:flex-row justify-between items-start gap-12 mb-10">
            <div className="group cursor-pointer w-full xl:w-auto flex justify-center xl:justify-start">
              <img
                src={logo}
                alt="Moonstone Logo"
                className="w-80 sm:w-96 md:w-[28rem] h-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />
            </div>

            <div className="flex-1 w-full xl:w-auto xl:min-w-[50%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-8 text-base sm:text-sm font-light text-gray-300 text-center sm:text-left">
              <div className="space-y-4 flex flex-col items-center sm:items-start">
                <div className="flex flex-col gap-1">
                  <a href="tel:+917313111500" className="hover:text-white transition-colors block text-lg sm:text-sm">+91 7313111500</a>
                  <a href="tel:+917313111501" className="hover:text-white transition-colors block text-lg sm:text-sm">+91 7313111501</a>
                </div>
                <div className="flex flex-col gap-1 text-gray-400">
                  <p className="text-lg sm:text-sm">A.B. Road Pigdamber, Rau</p>
                  <p className="text-lg sm:text-sm">Indore, MP 453331</p>
                </div>
                <div>
                  <a href="mailto:director.admissions@medicaps.ac.in" className="hover:text-white transition-colors break-words text-lg sm:text-sm">
                    director.admissions@medicaps.ac.in
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:gap-3 md:pl-4 items-center sm:items-start">
                <Link to="/" className={`${gradientHover} text-lg sm:text-sm`}>Home</Link>
                <Link to="/about" className={`${gradientHover} text-lg sm:text-sm`}>About</Link>
                <Link to="/allevents" className={`${gradientHover} text-lg sm:text-sm`}>Events</Link>
                <Link to="/developers" className={`${gradientHover} text-lg sm:text-sm`}>Developers</Link>
              </div>

              <div className="flex flex-col gap-4 sm:gap-3 md:pl-4 items-center sm:items-start">
                <a href="#" className={`${gradientHover} text-lg sm:text-sm`}>Facebook</a>
                <a href="#" className={`${gradientHover} text-lg sm:text-sm`}>Twitter</a>
                <a href="#" className={`${gradientHover} text-lg sm:text-sm`}>Linkedin</a>
                <a href="#" className={`${gradientHover} text-lg sm:text-sm`}>Instagram</a>
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

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-white/10 pt-8 gap-6 md:gap-0 text-center md:text-left">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter uppercase leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400 animate-pulse">
                MOONSTONE 2k26
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-2 tracking-widest uppercase">
              Designed & Developed by Team Moonstone
            </p>
          </div>
          <p className="text-xs text-gray-600">
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