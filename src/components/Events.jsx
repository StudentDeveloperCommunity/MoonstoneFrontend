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

  const autoScroll = (ref, speed, direction = "left") => {
    const container = ref.current;
    if (!container) return;

    const scroll = () => {
      if (direction === "left") {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) container.scrollLeft = 0;
      } else {
        container.scrollLeft -= speed;
        if (container.scrollLeft <= 0) container.scrollLeft = container.scrollWidth / 2;
      }
      requestAnimationFrame(scroll);
    };

    scroll();
  };

  useEffect(() => {
    autoScroll(row1Ref, 0.3, "right"); 
    autoScroll(row2Ref, 0.3, "left");  
  }, []);

  return (
    <section id="events" className="py-20 pt-4 bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h3
            className="text-xl md:text-2xl font-bold uppercase tracking-wide"
            style={{
              WebkitTextStroke: "0.2px #606060ff",
              color: "white",
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
            className="text-[#3A3A3A] text-sm md:text-base max-w-[851px] mx-auto text-gray-500"
            style={{ fontFamily: "Istok Web, sans-serif" }}
          >
           Revisiting the highlights as we gear up for another great year.
          </p>
        </div>
      </div>

      {/* ---------------- TOP ROW ---------------- */}
      <div
        ref={row1Ref}
        className="flex gap-4 pl-6 pr-0 overflow-x-hidden whitespace-nowrap mb-5"
      >
        {[...imagesTop, ...imagesTop].map((img, index) => (
          <motion.div
            key={index}
            className="inline-block relative min-w-[260px] h-48 cursor-pointer rounded-2xl overflow-hidden shadow-xl"
          >
            <img src={img} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* ---------------- BOTTOM ROW ---------------- */}
      <div
        ref={row2Ref}
        className="flex gap-4 pl-6 pr-0 overflow-x-hidden whitespace-nowrap mb-0 scrollbar-none"
        style={{ transform: "scaleX(-1)" }}
      >
        {[...imagesBottom, ...imagesBottom].map((img, index) => (
          <motion.div
            key={index}
            className="inline-block relative min-w-[260px] h-48 cursor-pointer rounded-2xl overflow-hidden shadow-xl"
            style={{ transform: "scaleX(-1)" }}
          >
            <img src={img} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
