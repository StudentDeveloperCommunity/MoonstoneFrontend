import React, { useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";

const Events = memo(function Events() {
  const imagesTop = [
    "https://res.cloudinary.com/desybsga6/image/upload/v1768937737/199A3109_dxm6od.webp",
    "https://res.cloudinary.com/desybsga6/image/upload/v1768937602/199A2325_i2kkgi.webp",
    "https://res.cloudinary.com/desybsga6/image/upload/v1768938467/TAN04895_tvoxxf.webp",
    "https://res.cloudinary.com/desybsga6/image/upload/v1768938518/SHIV5804_rv0ssx.webp",
    "https://res.cloudinary.com/desybsga6/image/upload/v1768938932/TAN06636_ahdmd0.webp",
  ];

  return (
    <section
      id="events"
      className="py-12 sm:py-20 pt-8 sm:pt-14 text-white scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center mb-6 sm:mb-10">
          <h2
            className="text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase mb-2 sm:mb-4 tracking-wide text-gray-300"
            style={{
              WebkitTextStroke: "0.2px white",
              fontFamily: "Istok Web, sans-serif",
            }}
          >
            Glimpses Of Events
          </h2>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase mb-3 sm:mb-4 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            Flashback Frames
          </h1>

          <p
            className="text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Istok Web, sans-serif" }}
          >
            Revisiting the highlights as we gear up for another great year.
          </p>
        </div>
      </div>

      {/* ---------------- SMOOTH SINGLE ROW ---------------- */}
      <div className="relative overflow-hidden">
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .scroll-container {
            animation: scroll 28s linear infinite;
            will-change: transform;
            transform: translateZ(0);
            display: flex;
            gap: 1rem;
          }
          
          .scroll-container:hover {
            animation-play-state: paused;
          }
          
          .carousel-image {
            will-change: transform;
            transform: translateZ(0);
          }
        `}</style>

        <div className="flex gap-4 scroll-container">
          {[
            ...imagesTop,
            ...imagesTop,
            ...imagesTop,
            ...imagesTop,
            ...imagesTop,
          ].map((img, index) => (
            <motion.div
              key={index}
              className="relative min-w-[250px] sm:min-w-[350px] md:min-w-[400px] h-40 sm:h-56 md:h-72 cursor-pointer rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl flex-shrink-0 carousel-image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img
                src={img}
                alt={`Event ${index}`}
                className="w-full h-full object-cover carousel-image"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Events;
