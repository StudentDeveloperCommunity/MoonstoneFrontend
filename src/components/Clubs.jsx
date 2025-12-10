import { motion } from "framer-motion";
import React from "react";

import img1 from "../assets/club/techno.png";
import img2 from "../assets/club/sports.png";
import img3 from "../assets/club/cultural.jpeg";

export default function Clubs() {
  const clubs = [
    {
      name: "Techno Club",
      desc: "Explore tech events, coding competitions, robotics & innovation.",
      img: img1,
      color: "from-[#1a1f2e] to-[#0d1219] border-blue-500/40",
      id:"techno"
    },
    {
      name: "Sports Club",
      desc: "Enhance physical skills through tournaments and athletic activities.",
      img: img2,
      color: "from-[#1e2a1f] to-[#10160f] border-green-500/40",
      id:"sports"
    },
    {
      name: "Cultural Club",
      desc: "Celebrate music, dance, drama, and India’s cultural heritage.",
      img: img3,
      color: "from-[#2a1f2d] to-[#160f18] border-pink-500/40",
      id:"cultural"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <h2 className="text-center text-4xl font-semibold mb-12">Our Clubs</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
        {clubs.map((club) => (
          <motion.div
          id={club.id}
            key={club.name}
            whileHover={{ scale: 1.05 }}
            className={`relative rounded-2xl p-6 bg-gradient-to-br ${club.color}
              shadow-xl border group overflow-hidden`}
          >
            {/* Image */}
            <div className="w-full h-48 flex justify-center">
              <img
                src={club.img}
                className="h-full object-contain drop-shadow-xl"
                alt={club.name}
              />
            </div>

            {/* Name */}
            <h3 className="text-2xl font-bold mt-6 text-center">{club.name}</h3>

            {/* Description */}
            <p className="text-center text-lg opacity-90 mt-3 px-2">
              {club.desc}
            </p>

            {/* Center Hover Button */}
            <motion.button
            //   initial={{ opacity: 0, scale: 0.8 }}
            //   whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 m-auto h-12 w-40 
                bg-white text-black font-semibold rounded-full shadow-xl
                flex justify-center items-center
                opacity-0 group-hover:opacity-100
                transition-all duration-300"
            >
              View More →
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
