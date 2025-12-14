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

  const imagesTop = [img1, img2, img3, img4, img5, img6];
  const imagesBottom = [img7, img8, img9, img10, img11];

  
  const autoScroll = (ref, speed) => {
    const container = ref.current;
    if (!container) return;

    const scroll = () => {
      container.scrollLeft += speed;

      
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      requestAnimationFrame(scroll);
    };

    scroll();
  };

  useEffect(() => {
    autoScroll(row1Ref, 0.3); 
    autoScroll(row2Ref, 0.4); 
  }, []);

  return (
    <section id="events" className="py-20 bg-black text-white">
      <h2 className="text-center text-4xl font-semibold mb-10 tracking-wide">
        Event Highlights
      </h2>

      {/* ---------------- TOP ROW ---------------- */}
  
      <div
        ref={row1Ref}
        className="flex gap-6 px-6 overflow-x-none whitespace-nowrap mb-10"
      >
        {[...imagesTop, ...imagesTop].map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="inline-block relative min-w-[380px] h-64 cursor-pointer rounded-2xl overflow-hidden shadow-xl"
          >
            <img src={img} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* ---------------- BOTTOM ROW ---------------- */}
    <div
  ref={row2Ref}
  className="flex gap-6 pl-6 pr-0 overflow-x-hidden whitespace-nowrap mb-0 scrollbar-none"
  style={{ transform: "scaleX(-1)" }}
>

      
        {[...imagesBottom, ...imagesBottom].map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="inline-block relative min-w-[320px] h-56 cursor-pointer rounded-2xl overflow-hidden shadow-xl"
            style={{ transform: "scaleX(-1)" }} 
          >
            <img src={img} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
