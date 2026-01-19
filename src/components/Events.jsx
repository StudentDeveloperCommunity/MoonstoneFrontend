import React, { useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";

import img1 from "../assets/events/199A0979.webp";
import img2 from "../assets/events/199A1374.webp";
import img3 from "../assets/events/199A2046.webp";
import img4 from "../assets/events/199A2325.webp";
import img5 from "../assets/events/199A3109.webp";
import img6 from "../assets/events/199A4372.webp";
import img7 from "../assets/events/SHIV5829.webp";
import img8 from "../assets/events/TAN03442.webp";
import img9 from "../assets/events/TAN03734.webp";
import img10 from "../assets/events/TAN04895.webp";
import img11 from "../assets/events/TAN06636.webp";

const Events = memo(function Events() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const animationRef1 = useRef(null);
  const animationRef2 = useRef(null);

  const imagesTop = [img1, img2, img3, img4, img5, img6];
  const imagesBottom = [img7, img8, img9, img10, img11];

  const autoScroll = (ref, animationRef, speed, direction = "left") => {
    const container = ref.current;
    if (!container) return;

    let isScrolling = true;

    const scroll = () => {
      if (!isScrolling || !container) return;

      if (direction === "left") {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      } else {
        container.scrollLeft -= speed;
        if (container.scrollLeft <= 0) {
          container.scrollLeft = container.scrollWidth / 2;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => {
      isScrolling = false;
    };

    const handleMouseLeave = () => {
      isScrolling = true;
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  };

  useEffect(() => {
    const cleanup1 = autoScroll(row1Ref, animationRef1, 0.5, "right");
    const cleanup2 = autoScroll(row2Ref, animationRef2, 0.5, "left");

    return () => {
      cleanup1?.();
      cleanup2?.();
      if (animationRef1.current) cancelAnimationFrame(animationRef1.current);
      if (animationRef2.current) cancelAnimationFrame(animationRef2.current);
    };
  }, []);

  return (
    <section id="events" className="py-20 pt-4  text-white">
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
        className="flex gap-4 pl-6 pr-0 overflow-x-auto scroll-smooth mb-5"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {[...imagesTop, ...imagesTop].map((img, index) => (
          <motion.div
            key={index}
            className="inline-block relative min-w-[260px] h-48 cursor-pointer rounded-2xl overflow-hidden shadow-xl flex-shrink-0"
          >
            <img src={img} alt={`Event ${index}`} className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>

      {/* ---------------- BOTTOM ROW ---------------- */}
      {/* <div
        ref={row2Ref}
        className="flex gap-4 pl-6 pr-0 overflow-x-auto scroll-smooth mb-0"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          transform: "scaleX(-1)",
        }}
      >
        {[...imagesBottom, ...imagesBottom].map((img, index) => (
          <motion.div
            key={index}
            className="inline-block relative min-w-[260px] h-48 cursor-pointer rounded-2xl overflow-hidden shadow-xl flex-shrink-0"
            style={{ transform: "scaleX(-1)" }}
          >
            <img src={img} alt={`Event ${index}`} className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div> */}
    </section>
  );
});

export default Events;