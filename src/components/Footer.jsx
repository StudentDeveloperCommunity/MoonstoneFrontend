import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { PiXLogoFill } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="w-full bg-zinc-950 text-white font-['Poppins'] border-t border-t-white">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:flex-wrap divide-y md:divide-y-0 md:divide-x divide-white/90">
        {/* Left Section */}
        <div className="w-full md:w-[32%] py-8 md:py-10 flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-center justify-center md:justify-start">
            {/* <img src={logo} alt="Logo" className="w-24 sm:w-28 h-auto" /> */}
            <h1 className="text-3xl font-extrabold tracking-wide text-indigo-700 cursor-pointer hover:scale-105 transition-transform duration-300">
              MoonStone - Medicaps University
            </h1>
          </div>
          <div className="w-full h-[1px] bg-white/90" />
          <div className="flex flex-col items-center md:items-start gap-4 pl-4 sm:pl-6 md:px-8 pt-6 text-sm sm:text-base">
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" />
              <span>AB Road Pigdamber, Rau, Indore, M.P. -453331</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <FaPhoneAlt />
              <span>+91-0731-3111481</span>
              <span className="px-1">|</span>
              <span>+91-7723019451</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope />
              <span>info@moonstone.com</span>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="w-full md:w-[36%] py-8 md:py-10 flex flex-col justify-between items-center text-sm sm:text-base">
          <div className="grid grid-cols-2 pl-4 sm:pl-10 sm:grid-cols-2 gap-y-3 gap-x-10 pb-15">
            <span className="cursor-pointer hover:underline hover:text-blue-500">Home</span>
            <span className="cursor-pointer hover:underline hover:text-blue-500">About</span>
            <span className="cursor-pointer hover:underline hover:text-blue-500">Events Techno</span>
            <span className="cursor-pointer hover:underline hover:text-blue-500">Events Sports</span>
            <span className="cursor-pointer hover:underline hover:text-blue-500">Events Cultural</span>
            
          </div>
          <div className="w-full h-[1px] bg-white/90" />
          <div className="mt-3 px-2 text-center text-white/80 text-[10px] sm:text-[11px] md:text-[12px] leading-snug">
            Copyright: © 2025 Medicaps University. <br />
            {/* <span className="underline text-white">by@createshaan</span> */}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[32%] px-1 sm:px-3 md:px-1 py-8 md:py-10 flex flex-col gap-4 items-center">
          <div className="text-xl sm:text-2xl font-normal">Have a Query?</div>
          <div className="text-lg sm:text-xl font-normal">Reach Out To Us!</div>

          <button className="cursor-pointer mt-2 px-6 py-2 bg-gradient-to-r from-[#140555] to-[#5e0816] text-white rounded-2xl text-sm sm:text-base font-light border border-white/40 w-fit">
            Get in Touch &gt;
          </button>

          <div className="flex gap-3 mt-4 flex-wrap">
            <div className="w-7 h-7 bg-white text-black rounded-lg flex items-center justify-center">
              <FaInstagram size={14} />
            </div>
            <div className="w-7 h-7 bg-white text-black rounded-lg flex items-center justify-center">
              <FaLinkedin size={14} />
            </div>
            <div className="w-7 h-7 bg-white text-black rounded-lg flex items-center justify-center">
              <PiXLogoFill size={14} />
            </div>
            <div className="w-7 h-7 bg-white text-black rounded-lg flex items-center justify-center">
              <FaFacebook size={14} />
            </div>
            <div className="w-7 h-7 bg-white text-black rounded-lg flex items-center justify-center">
              <FaYoutube size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
