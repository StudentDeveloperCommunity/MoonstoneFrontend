import { useState, memo } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/FinalLogo.png";

const Navbar = memo(function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const gradientTextHover =
    "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:via-pink-500 hover:to-cyan-400 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] transition-all duration-300";

  const mobileLinkStyle =
    "group flex items-center gap-4 p-3.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 active:scale-[0.98]";

  const mobileIconStyle =
    "w-5 h-5 text-white/60 group-hover:text-cyan-400 transition-colors duration-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]";

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-2 sm:top-4 inset-x-0 z-50 flex justify-center text-white font-sans">
        <div className="relative w-full max-w-7xl px-2 sm:px-4">
          <div
            className="
            absolute inset-0
            rounded-2xl
            bg-black/60 backdrop-blur-xl
            border border-white/10
            shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
            overflow-hidden
          "
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          />

          {/* Content Container */}
          <div className="relative flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3">
            <Link to="/" className="font-bold tracking-tight shrink-0 group">
              <div className="flex flex-col leading-tight">
                <img
                  src={logo}
                  alt="Moonstone Logo"
                  className="w-32 sm:w-44 lg:w-56 h-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link
                to="/"
                className={`text-white/90 text-[15px] font-medium tracking-wide ${gradientTextHover}`}
              >
                Home
              </Link>
              {/* about page changed  as highlights */}
              <Link
                className={`text-white/90 text-[15px] font-medium tracking-wide ${gradientTextHover}`}
                to="/about"
              >
                Highlights
              </Link>

              <div className="relative group">
                <button
                  onClick={() => (window.location.href = "/allevents?id:all")}
                  className={`text-white/90 text-[15px] font-medium tracking-wide flex items-center gap-1 ${gradientTextHover}`}
                >
                  Events
                </button>
              </div>

              <Link
                to="/developers"
                className={`text-white/90 text-[15px] font-medium tracking-wide ${gradientTextHover}`}
              >
                Developers
              </Link>

              <Link
                className="
                  relative px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300
                  bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500
                  bg-[length:200%_auto] hover:bg-right
                  text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]
                  hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]
                  hover:scale-105 active:scale-95
                  whitespace-nowrap
                "
                to="/check-registration"
              >
                Check Registration
              </Link>
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white transition active:scale-90"
            >
              <svg
                className="w-7 h-7 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsMobileOpen(false)}
          />

          <div
            className="
            fixed top-[4.5rem] sm:top-[5.5rem] inset-x-0
            mx-auto w-[95%] max-w-sm
            bg-black/90 backdrop-blur-2xl
            border border-white/15
            rounded-2xl
            p-4
            z-40
            space-y-2
            shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]
            max-h-[80vh] overflow-y-auto
            animate-in fade-in slide-in-from-top-4 duration-300 ease-out
          "
          >
            {/* Home */}
            <Link
              className={mobileLinkStyle}
              to="/"
              onClick={() => setIsMobileOpen(false)}
            >
              <svg
                className={mobileIconStyle}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-lg font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                Home
              </span>
            </Link>

            {/* About */}
            <Link
              className={mobileLinkStyle}
              to="/about"
              onClick={() => setIsMobileOpen(false)}
            >
              <svg
                className={mobileIconStyle}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-lg font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                Highlights
              </span>
            </Link>

            {/* Events */}
            <button
              onClick={() => {
                window.location.href = "/allevents?id:all";
                setIsMobileOpen(false);
              }}
              className={`${mobileLinkStyle} w-full`}
            >
              <svg
                className={mobileIconStyle}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-lg font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                Events
              </span>
            </button>

            {/* Developers */}
            <Link
              className={mobileLinkStyle}
              to="/developers"
              onClick={() => setIsMobileOpen(false)}
            >
              <svg
                className={mobileIconStyle}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <span className="text-lg font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                Developers
              </span>
            </Link>

            <div className="h-px bg-white/10 my-2 mx-2" />

            <div className="pt-2 pb-1">
              <Link
                className="
                  group relative block w-full py-3.5 text-center
                  rounded-xl font-bold text-white text-lg tracking-wide
                  bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500
                  bg-[length:200%_auto] hover:bg-right transition-all duration-500
                  shadow-[0_0_20px_rgba(236,72,153,0.4)]
                  active:scale-[0.98]
                "
                to="/check-registration"
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="drop-shadow-md">Check Registration</span>
              </Link>
            </div>
          </div>
        </>
      )}

      <style>
        {`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.2); border-radius: 4px; }
      `}
      </style>
    </>
  );
});

export default Navbar;
