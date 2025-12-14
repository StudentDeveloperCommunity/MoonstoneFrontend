// import React, { useState } from "react";

// export default function Navbar() {
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [isEventOpen, setIsEventOpen] = useState(false);

//   return (
//     <>
//       {/* MAIN NAVBAR */}
//       <nav
//         className="fixed top-4 left-1/2 -translate-x-1/2
//         bg-gradient-to-r from-slate-100 via-slate-300 to-slate-700 backdrop-blur-md shadow-xl z-50
//         w-[90%] md:w-[60%] lg:w-[40%]
//         rounded-full py-4 px-6 flex items-center justify-between"
//       >
//         {/* Logo */}
//         <a
//           href="/"
//           className="text-2xl font-extrabold tracking-wide text-indigo-700 cursor-pointer hover:scale-105 transition-transform duration-300"
//         >
//           MoonStone
//         </a>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-8 text-lg font-semibold">
//           <a href="/" className="hover:text-indigo-600">Home</a>

//           {/* Events Dropdown */}
//           <div className="relative group">
//             <button className="hover:text-indigo-600 flex items-center gap-1">
//               Events <span className="mt-1">▼</span>
//             </button>

//             <div
//               className="absolute top-10 left-1/2 -translate-x-1/2 
//               bg-white shadow-xl rounded-lg py-3 w-44 opacity-0 
//               group-hover:opacity-100 scale-95 group-hover:scale-100
//               transition-all duration-300 z-50"
//             >
//               <a href="/club?id=1" className="block px-4 py-2 hover:bg-indigo-200">Techno</a>
//               <a href="/club?id=2" className="block px-4 py-2 hover:bg-indigo-200">Sports</a>
//               <a href="/club?id=3" className="block px-4 py-2 hover:bg-indigo-200">Cultural</a>
//             </div>
//           </div>

//           <a href="/aboutus" className="hover:text-indigo-600">About</a>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-3xl"
//           onClick={() => setIsMobileOpen(!isMobileOpen)}
//         >
//           ☰
//         </button>
//       </nav>

//       {/* MOBILE MENU — SEPARATED LAYER (FIX FOR OVAL SHAPE) */}
//       {isMobileOpen && (
//         <div
//           className="md:hidden fixed top-24 left-1/2 -translate-x-1/2
//           w-[90%] bg-white shadow-2xl rounded-xl p-6 z-40 animate-slideDown"
//         >
//           <a href="/" className="block py-3 border-b hover:bg-indigo-50">
//             Home
//           </a>

//           <button
//             onClick={() => setIsEventOpen(!isEventOpen)}
//             className="w-full py-3 border-b flex justify-between hover:bg-indigo-50"
//           >
//             Events <span>▼</span>
//           </button>

//           {isEventOpen && (
//             <div className="pl-4 animate-fadeIn">
//               <a href="/club?id=1" className="block py-2 hover:bg-indigo-100">Techno</a>
//               <a href="/club?id=2" className="block py-2 hover:bg-indigo-100">Sports</a>
//               <a href="/club?id=3" className="block py-2 hover:bg-indigo-100">Cultural</a>
//             </div>
//           )}

//           <a href="/aboutus" className="block py-3 hover:bg-indigo-50">About</a>
//         </div>
//       )}
//     </>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center text-white">
        <div className="relative w-full max-w-6xl mx-6">
          
          {/* Glass boundary */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md
            border border-white/30 rounded-2xl
            shadow-[0_0_25px_rgba(255,255,255,0.08)]"
          />

          {/* Stars background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/30 animate-pulse"
                style={{
                  width: Math.random() * 2 + 1 + "px",
                  height: Math.random() * 2 + 1 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 3 + "s",
                  animationDuration: Math.random() * 3 + 2 + "s",
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative px-6 py-4 flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="font-bold tracking-tight group">
              <div className="flex flex-col leading-tight">
                <span className="text-emerald-400 group-hover:text-emerald-300 transition">
                  moon
                </span>
                <span className="text-emerald-400 group-hover:text-emerald-300 text-sm transition">
                  stone
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link className="nav-link" to="/">Home</Link>

              {/* Events Dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  className="nav-link flex items-center gap-1 bg-transparent border-none outline-none"
                >
                  Events <span className="text-xs">▼</span>
                </button>

                <div
                  className="absolute left-1/2 top-9 -translate-x-1/2
                  bg-black/80 backdrop-blur-xl border border-white/20
                  rounded-xl w-44 py-2 opacity-0 scale-95
                  group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300"
                >
                  <Link to="/club?id=1" className="dropdown-item">Techno</Link>
                  <Link to="/club?id=2" className="dropdown-item">Sports</Link>
                  <Link to="/club?id=3" className="dropdown-item">Cultural</Link>
                </div>
              </div>

              <Link className="nav-link" to="/about">About</Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden text-white text-2xl bg-transparent border-none"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed top-24 left-1/2 -translate-x-1/2
          w-[90%] bg-black/85 backdrop-blur-xl
          border border-white/20 rounded-2xl
          shadow-2xl p-6 z-40 space-y-2 text-white"
        >
          <Link className="mobile-item" to="/">Home</Link>

          <button
            onClick={() => setIsEventOpen(!isEventOpen)}
            className="mobile-item flex justify-between w-full bg-transparent border-none"
          >
            Events <span>▼</span>
          </button>

          {isEventOpen && (
            <div className="pl-4 space-y-2">
              <Link className="mobile-sub" to="/club?id=1">Techno</Link>
              <Link className="mobile-sub" to="/club?id=2">Sports</Link>
              <Link className="mobile-sub" to="/club?id=3">Cultural</Link>
            </div>
          )}

          <Link className="mobile-item" to="/about">About</Link>
        </div>
      )}

      {/* Utility styles */}
      <style>
        {`
          .nav-link {
            @apply text-sm font-medium text-white relative transition;
          }
          .nav-link::after {
            content: '';
            @apply absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-400 transition-all;
          }
          .nav-link:hover::after {
            width: 100%;
          }
          .dropdown-item {
            @apply block px-4 py-2 text-sm text-white hover:bg-white/10;
          }
          .mobile-item {
            @apply block py-3 px-2 text-white hover:bg-white/10 rounded-lg;
          }
          .mobile-sub {
            @apply block py-2 text-sm text-white/90 hover:text-white;
          }
        `}
      </style>
    </>
  );
}
