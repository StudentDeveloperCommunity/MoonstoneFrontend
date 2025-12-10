import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import img1 from "../assets/events/event-1.jpeg";
import img2 from "../assets/events/event-2.avif";
import img3 from "../assets/events/event-3.avif";
import img4 from "../assets/events/event-4.avif";
import img5 from "../assets/events/event-5.webp";
import img6 from "../assets/events/event-6.avif";
import img7 from "../assets/events/event-7.jpeg";
import img8 from "../assets/events/event-8.jpeg";
import img9 from "../assets/events/event-9.jpeg";
import img10 from "../assets/events/event-10.jpeg";
import img11 from "../assets/events/event-11.jpeg";

export default function Events() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const imagesTop = [img1, img2, img3,img4, img5, img6];
  const imagesBottom = [img7, img8, img9, img10, img11];

  // Auto Scroll Function
  const autoScroll = (ref, speed) => {
    const container = ref.current;
    if (!container) return;

    const scroll = () => {
      container.scrollLeft += speed;

      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
      requestAnimationFrame(scroll);
    };

    scroll();
  };

  useEffect(() => {
    autoScroll(row1Ref, 0.6); // top row slightly faster
    autoScroll(row2Ref, 0.4); // bottom row slower
  }, []);

  return (
    <section id="events" className="py-20 bg-black text-white">
      <h2 className="text-center text-4xl font-semibold mb-10 tracking-wide">
        Event Highlights
      </h2>

      {/* ---------------- TOP ROW (BIGGER IMAGES) ---------------- */}
      <div
        ref={row1Ref}
        className="flex gap-6 px-6 overflow-x-scroll overflow-y-hidden no-scrollbar scroll-smooth mb-10"
      >
        {imagesTop.map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative min-w-[380px] h-64 cursor-pointer rounded-2xl overflow-hidden shadow-xl group"
          >
            <img src={img} className="w-full h-full object-cover" />

            <motion.div
              onClick={() => (window.location.href = "/allevents")}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center text-xl font-semibold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              View More →
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ---------------- BOTTOM ROW (SLIGHTLY SMALLER) ---------------- */}
      <div
        ref={row2Ref}
        className="flex gap-6 px-6 overflow-x-scroll overflow-y-hidden no-scrollbar scroll-smooth"
      >
        {imagesBottom.map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative min-w-[320px] h-56 cursor-pointer rounded-2xl overflow-hidden shadow-xl group"
          >
            <img src={img} className="w-full h-full object-cover" />

            <motion.div
              onClick={() => (window.location.href = "/allevents")}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center text-xl font-semibold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              View More →
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
