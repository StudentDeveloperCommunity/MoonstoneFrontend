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
    <footer className="w-full bg-black text-white py-10 px-4 md:px-10 overflow-hidden relative font-inter">
     
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
  {Array.from({ length: 100 }).map((_, i) => (  // reduced from 180 to 100
    <div
      key={i}
      className="absolute rounded-full"
      style={{
        width: Math.random() > 0.5 ? "2px" : "3px",
        height: Math.random() > 0.5 ? "2px" : "3px",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.5 + 0.3, // slightly dimmer
        backgroundColor: "rgba(200,200,200,0.8)", // grey instead of white
        boxShadow: "0 0 6px rgba(200,200,200,0.6)", // softer glow
        animation: `twinkleContinuous ${0.4 + Math.random() * 0.6}s linear infinite`,
        animationDelay: `-${Math.random() * 1}s`,
      }}
    />
  ))}
</div>


      <div className="absolute inset-0 opacity-20 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative">
       
        <div
          className="border border-[#8C8C8C] rounded-2xl px-6 md:px-10 lg:px-20 py-8 md:py-10"
           style={{
    backgroundColor: "rgba(41, 39, 39, 0.31)", 
    backdropFilter: "blur(10px)", 
    WebkitBackdropFilter: "blur(4px)", 
  }}
          
        >
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 mb-16">
           
            <div className="flex items-center">
              <img
                src={logo}
                alt="Moonstone Logo"
                className="w-[150px] md:w-[199px] h-auto"
              />
            </div>

           
            <div className="flex-1 hidden lg:block" />

            
            <div className="flex flex-col items-start gap-6">
              <p className="text-[10px] font-medium tracking-wider uppercase opacity-60">
                Information
              </p>
              <nav className="flex flex-col gap-1">
                <a
                  href="#"
                  className="text-base leading-[140%] hover:opacity-70 transition-opacity"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-base leading-[140%] hover:opacity-70 transition-opacity"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-base leading-[140%] hover:opacity-70 transition-opacity"
                >
                  Events
                </a>
              </nav>
            </div>
          </div>

          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            
            <div className="flex items-center gap-2">
              {[
                { Icon: FaLinkedinIn, label: "LinkedIn" },
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaYoutube, label: "YouTube" },
                { Icon: FaXTwitter, label: "X (Twitter)" },
                { Icon: FaFacebookF, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>

            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12">
              <div className="text-xs leading-[130%]">
                <p>+ 917313111500,</p>
                <p>+ 917313111501</p>
              </div>

              <div className="text-xs leading-[130%] max-w-[250px]">
                <p>A.B. Road Pigdamber, Rau,</p>
                <p>Indore, Madhya Pradesh 453331</p>
              </div>

              <div className="text-xs leading-[130%] max-w-[250px]">
                <p>Gmail</p>
                <p>director.admissions@medicaps.ac.in</p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="mt-12 mb-6">
          <h2 className="text-[32px] md:text-[40px] font-extrabold leading-[100%] tracking-[-0.8px]">
            MOONSTONE 2k26
          </h2>
        </div>

      
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] leading-[140%]">
          <p>© 2026 — Copyright</p>
          
        </div>
      </div>
    </footer>
  );
}
