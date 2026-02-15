import React, { useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";

const Events = memo(function Events() {
  const imagesTop = [
    "https://ik.imagekit.io/wciaxyg0zo/GLimpses%20of%20Event/199A3109.webp?updatedAt=1771160768291",
    "https://ik.imagekit.io/wciaxyg0zo/GLimpses%20of%20Event/199A2325.webp?updatedAt=1771160767809",
    "https://ik.imagekit.io/wciaxyg0zo/GLimpses%20of%20Event/SHIV5804.webp?updatedAt=1771160769266",
    "https://ik.imagekit.io/wciaxyg0zo/GLimpses%20of%20Event/TAN04895.webp?updatedAt=1771160768299",
    "https://ik.imagekit.io/wciaxyg0zo/GLimpses%20of%20Event/TAN06636.webp?updatedAt=1771160767848",
  ];

  return (
    <section
      id="events"
      className="py-10 sm:py-14 text-white scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2
            className="text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase mb-1 sm:mb-3 tracking-wide text-gray-300"
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
          
          // .scroll-container:hover {
          //   animation-play-state: paused;
          // }
          
          // .carousel-image {
          //   will-change: transform;
          //   transform: translateZ(0);
          // }
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
              className="relative min-w-[240px] xs:min-w-[280px] sm:min-w-[320px] md:min-w-[350px] lg:min-w-[450px]
             h-40 xs:h-48 sm:h-48 md:h-64 lg:h-72
             cursor-pointer rounded-lg sm:rounded-xl md:rounded-2xl
             overflow-hidden shadow-xl flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img
                src={img}
                alt={`Event ${index}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Events;
