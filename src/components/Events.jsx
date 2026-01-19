import React, { useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";

import img3 from "../assets/events/SHIV5804.webp";
import img4 from "../assets/events/199A2325.webp";
import img5 from "../assets/events/199A3109.webp";
import img6 from "../assets/events/TAN06227.webp";
import img7 from "../assets/events/TAN04895.webp";

const Events = memo(function Events() {
  const imagesTop = [img3, img7, img5, img6, img4];

  return (
    <section id="events" className="py-20 pt-4 text-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h3
            className="text-xl md:text-2xl font-bold uppercase tracking-wide"
            style={{
              WebkitTextStroke: "0.2px #606060ff",
              color: "transparent",
              fontFamily: "Istok Web, sans-serif",
            }}
          >
            Glimpses Of Events
          </h3>

          <h2
            className="text-2xl md:text-4xl lg:text-[36px] font-bold uppercase text-white whitespace-nowrap"
            style={{ fontFamily: "Istok Web, sans-serif" }}
          >
            Flashback Frames
          </h2>

          <p
            className="text-[#3A3A3A] text-sm md:text-base max-w-[851px] mx-auto "
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
            animation: scroll 40s linear infinite;
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
          {[...imagesTop, ...imagesTop, ...imagesTop, ...imagesTop].map((img, index) => (
            <motion.div
              key={index}
              className="relative min-w-[600px] h-96 cursor-pointer rounded-2xl overflow-hidden shadow-xl flex-shrink-0 carousel-image"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
