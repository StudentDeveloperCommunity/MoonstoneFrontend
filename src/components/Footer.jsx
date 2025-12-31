import React from "react";
import logo from "../assets/logo/moonstone-logo.png";
import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-white py-10 px-4 md:px-10 overflow-hidden">
      
      {/* 🌌 FOOTER STAR BACKGROUND (CONTAINED) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 35 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() > 0.5 ? "1px" : "2px",
              height: Math.random() > 0.5 ? "1px" : "2px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
              animation: `twinkle ${2 + Math.random() * 3}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative max-w-[1440px] mx-auto">
        <div
          className="border border-[#8C8C8C] rounded-2xl px-6 md:px-10 lg:px-20 py-8 md:py-10"
          style={{
            backgroundColor: "rgba(41, 39, 39, 0.31)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* TOP */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-16">
            <img
              src={logo}
              alt="Moonstone Logo"
              className="w-[150px] md:w-[190px]"
            />

            <div className="flex flex-col gap-6">
              <p className="text-[10px] tracking-wider uppercase opacity-60">
                Information
              </p>
              <nav className="flex flex-col gap-1">
                <a className="hover:opacity-70">Home</a>
                <a className="hover:opacity-70">About</a>
                <a className="hover:opacity-70">Events</a>
              </nav>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex gap-2">
              {[FaLinkedinIn, FaInstagram, FaYoutube, FaXTwitter, FaFacebookF].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
                  >
                    <Icon />
                  </div>
                )
              )}
            </div>

            <div className="flex flex-wrap gap-8 text-xs">
              <div>
                <p>+91 7313111500</p>
                <p>+91 7313111501</p>
              </div>
              <div>
                <p>A.B. Road Pigdamber, Rau</p>
                <p>Indore, MP 453331</p>
              </div>
              <div>
                <p>director.admissions@medicaps.ac.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-extrabold">MOONSTONE 2k26</h2>
          <p className="text-xs mt-2">© 2026 — Copyright</p>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%,100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </footer>
  );
}