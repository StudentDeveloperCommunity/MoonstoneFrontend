import React, { useState } from "react";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);

  return (
    <>
      {/* MAIN NAVBAR */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2
        bg-zinc-300 backdrop-blur-md shadow-xl z-50
        w-[90%] md:w-[60%] lg:w-[40%]
        rounded-full py-4 px-6 flex items-center justify-between"
      >
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-extrabold tracking-wide text-indigo-700 cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          MoonStone
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          <a href="/" className="hover:text-indigo-600">Home</a>

          {/* Events Dropdown */}
          <div className="relative group">
            <button className="hover:text-indigo-600 flex items-center gap-1">
              Events <span className="mt-1">▼</span>
            </button>

            <div
              className="absolute top-10 left-1/2 -translate-x-1/2 
              bg-white shadow-xl rounded-lg py-3 w-44 opacity-0 
              group-hover:opacity-100 scale-95 group-hover:scale-100
              transition-all duration-300 z-50"
            >
              <a href="#techno" className="block px-4 py-2 hover:bg-indigo-200">Techno</a>
              <a href="#sports" className="block px-4 py-2 hover:bg-indigo-200">Sports</a>
              <a href="#cultural" className="block px-4 py-2 hover:bg-indigo-200">Cultural</a>
            </div>
          </div>

          <a href="#" className="hover:text-indigo-600">About</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU — SEPARATED LAYER (FIX FOR OVAL SHAPE) */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed top-24 left-1/2 -translate-x-1/2
          w-[90%] bg-white shadow-2xl rounded-xl p-6 z-40 animate-slideDown"
        >
          <a href="/" className="block py-3 border-b hover:bg-indigo-50">
            Home
          </a>

          <button
            onClick={() => setIsEventOpen(!isEventOpen)}
            className="w-full py-3 border-b flex justify-between hover:bg-indigo-50"
          >
            Events <span>▼</span>
          </button>

          {isEventOpen && (
            <div className="pl-4 animate-fadeIn">
              <a href="#techno" className="block py-2 hover:bg-indigo-100">Techno</a>
              <a href="#sports" className="block py-2 hover:bg-indigo-100">Sports</a>
              <a href="#cultural" className="block py-2 hover:bg-indigo-100">Cultural</a>
            </div>
          )}

          <a href="#" className="block py-3 hover:bg-indigo-50">About</a>
        </div>
      )}
    </>
  );
}
