import React, { useRef } from "react";
import { motion } from "framer-motion";
import vid1 from "../assets/herosection/vid-1.mp4";
import vid2 from "../assets/herosection/vid-2.mp4";
import vid3 from "../assets/herosection/vid-3.mp4";

// Demo video data
const videos = [
  {
    src: vid1,
    title: "Moon Landing",
    desc: "Experience the historic landing on the moon with high-quality footage.",
  },
  {
    src: vid2,
    title: "Moon Phases",
    desc: "Learn about the phases of the moon and their astronomical significance.",
  },
  {
    src: vid3,
    title: "Moon Exploration",
    desc: "Discover modern moon exploration missions and their objectives.",
  },
];

export default function VideoCarousel() {
  const scrollRef = useRef(null);


  return (
    <section className="py-20 bg-gray-900 text-white relative">
      <h2 className="text-center text-4xl font-semibold mb-10">Our Videos</h2>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar m-5"
      >
        {videos.map((video, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="min-w-[100vw] flex rounded-2xl overflow-hidden shadow-xl bg-gray-800"
          >
            {/* Left: Video */}
            <div className="w-1/2">
              <video
                src={video.src}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
              />
            </div>

            {/* Right: Title + Description */}
            <div className="w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">{video.title}</h3>
              <p className="text-lg opacity-90">{video.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
