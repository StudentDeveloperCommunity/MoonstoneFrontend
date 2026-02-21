import { useState, useEffect } from "react";
import hcl from "../assets/HCL.png";

import { FaLinkedinIn, FaInstagram, FaTwitter, FaGlobe } from "react-icons/fa6";

export default function EliteSponsors() {
  const [hclLoaded, setHclLoaded] = useState(false);
  const [hclError, setHclError] = useState(false);

  // Preload HCL image for instant display
  useEffect(() => {
    // Set loaded immediately for instant display
    setHclLoaded(true);
    
    // Preload in background
    const img = new Image();
    img.onload = () => {
      setHclLoaded(true);
    };
    
    img.onerror = () => {
      setHclError(true);
      setHclLoaded(true);
    };
    
    img.src = hcl;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [hcl]);

  return (
    <div className="w-full text-white mt-8 px-4 sm:px-6  md:px-10">
      {/* ✅ Heading */}
      <div className="text-center">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold uppercase pb-6 sm:mb-4 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
          Special Thanks to HCLTech
        </h1>
      </div>

      {/* ✅ Main Layout */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:space-x-8 justify-center gap-6 text-center lg:text-left">
        {/* ✅ Image Card */}
        <div className="w-full lg:w-[32%] bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 rounded-2xl p-3 sm:p-4 shadow-lg">
          {!hclLoaded && (
            <div className="w-full h-auto rounded-xl bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
          )}
          {hclLoaded && !hclError && (
            <img
              src={hcl}
              alt="HCL Sponsor"
              className="w-full h-auto object-contain rounded-xl transition-opacity duration-300"
              style={{ opacity: hclLoaded ? 1 : 0 }}
              loading="eager"
              decoding="async"
            />
          )}
          {hclError && (
            <div className="w-full h-auto rounded-xl bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 font-semibold">HCLTech</span>
            </div>
          )}
        </div>

        {/* ✅ Text Section */}
        <div className="w-full lg:w-[45%] space-y-4">
          <p
            className="
           
            sm:text-lg 
            md:text-xl 
            text-gray-300 
            leading-relaxed
            text-justify 
            font-semibold
          "
          >
            We sincerely thank HCLTech for their valuable support and
            partnership in making Moonstone 2026 – Medi-Caps University a
            success. Your contribution strengthens innovation, learning, and
            industry collaboration within the student community.
          </p>

          <h3 className="flex text-sm lg:justify-start sm:justify-center justify-center items-center sm:text-base text-gray-300 font-semibold pt-4">
            Connect with HCLTech
          </h3>

          {/* ✅ Icons Row */}
          <div
            className="
            
            flex 
            items-center 
            justify-center 
            lg:justify-start 
            gap-6 
            text-gray-400
        "
          >
            <a
              href="https://in.linkedin.com/company/hcltech"
              className="hover:text-cyan-400 transition"
            >
              <FaLinkedinIn className="text-xl hover:scale-110 transition-transform duration-200" />
            </a>

            <a
              href="https://www.instagram.com/hcltech/"
              className="hover:text-cyan-400 transition"
            >
              <FaInstagram className="text-xl hover:scale-110 transition-transform duration-200" />
            </a>

            <a
              href="https://x.com/hcltech"
              className="hover:text-cyan-400 transition"
            >
              <FaTwitter className="text-xl hover:scale-110 transition-transform duration-200" />
            </a>

            <a
              href="https://www.hcltech.com/"
              className="hover:text-cyan-400 transition"
            >
              <FaGlobe className="text-xl hover:scale-110 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
