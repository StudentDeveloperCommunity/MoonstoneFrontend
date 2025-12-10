import React, { useState } from "react";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-zinc-300 backdrop-blur-md shadow-xl z-50
      w-[90%] md:w-[60%] lg:w-[40%] rounded-full py-4 px-6 flex items-center justify-between transition-all duration-300">
      
      {/* Logo */}
      <a href="#" className="text-2xl font-extrabold tracking-wide text-indigo-700 cursor-pointer hover:scale-105 transition-transform duration-300">
        MoonStone
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8 text-lg font-semibold">
        <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Home</a>

        {/* Events Dropdown — Hover + Hold */}
        <div className="relative group">
          <button
            className="hover:text-indigo-600 flex items-center gap-1 transition-colors duration-200"
          >
            Events
            <span className="mt-1">▼</span>
          </button>

          {/* KEEP OPEN on hover using group-hover + pointer-events-auto */}
          <div className="absolute top-10 left-1/2  -translate-x-1/2 bg-white shadow-xl rounded-lg py-3 w-44 
              opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 
              transition-all duration-300 pointer-events-auto group-hover:pointer-events-auto z-50">

            <a href="#techno" className="block px-4 py-2 hover:bg-indigo-200 hover:text-indigo-700 transition-all">
              Techno
            </a>
            <a href="#sports" className="block px-4 py-2 hover:bg-indigo-200 hover:text-indigo-700 transition-all">
              Sports
            </a>
            <a href="#cultural" className="block px-4 py-2 hover:bg-indigo-200 hover:text-indigo-700 transition-all">
              Cultural
            </a>
          </div>
        </div>

        <a href="#" className="hover:text-indigo-600 transition-colors duration-200">About</a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-3xl focus:outline-none"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {isMobileOpen && (
        <div className="md:hidden mt-24 bg-white shadow-lg px-6 pb-4 text-lg font-medium rounded-xl w-[90%] mx-auto animate-slideDown">
          <a href="#" className="block py-3 border-b hover:bg-indigo-50 transition-all">Home</a>

          <button
            onClick={() => setIsEventOpen(!isEventOpen)}
            className="w-full text-left py-3 border-b flex justify-between hover:bg-indigo-50 transition-all"
          >
            Events <span>▼</span>
          </button>

          {isEventOpen && (
            <div className="pl-4 animate-fadeIn">
              <a href="#" className="block py-2 hover:bg-indigo-100 transition-all">Techno</a>
              <a href="#" className="block py-2 hover:bg-indigo-100 transition-all">Sports</a>
              <a href="#" className="block py-2 hover:bg-indigo-100 transition-all">Cultural</a>
            </div>
          )}

          <a href="#" className="block py-3 hover:bg-indigo-50 transition-all">About</a>
        </div>
      )}
    </nav>
  );
}
