import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import img1 from "../assets/events/event-1.jpeg";
import img2 from "../assets/events/event-2.avif";
import img3 from "../assets/events/event-3.avif";
import img4 from "../assets/events/event-4.avif";
import img5 from "../assets/events/event-5.webp";
import img6 from "../assets/events/event-6.avif";

export default function Events() {
  const images = [img1, img2, img3, img4, img5, img6];
  const scrollRef = useRef(null);

  // Auto scroll animation
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollSpeed = 0.6;

    const autoScroll = () => {
      container.scrollLeft += scrollSpeed;

      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }

      requestAnimationFrame(autoScroll);
    };

    autoScroll();
  }, []);

 

  return (
    <section id="events" className="py-20 bg-black text-white relative">
      <h2 className="text-center text-4xl font-semibold mb-10 tracking-wide">
        Event Highlights
      </h2>
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-6 scroll-smooth overflow-x-scroll overflow-y-hidden no-scrollbar"
      >
        {images.map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative min-w-[320px] h-60 cursor-pointer rounded-2xl overflow-hidden shadow-xl group"
          >
            <img src={img} className="w-full h-full object-cover" />

            {/* Hover Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center
              text-xl font-semibold backdrop-blur-sm opacity-0 group-hover:opacity-100 
              transition-all duration-300"
            >
              View More →
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
