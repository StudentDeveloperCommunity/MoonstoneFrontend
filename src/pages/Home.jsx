import React from "react";
import { motion } from "framer-motion";
import bg from "../assets/herosection/moon-video.mp4"
import Events from "../components/Events";
import Clubs from "../components/Clubs";
import VideoCarousel from "../components/VideoCarousel";
export default function Home() {
  return (
    <div className="w-full h-full text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src={bg}
        />

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold drop-shadow-xl"
          >
            Welcome to Moonstone
          </motion.h1>

          <a href="#events" className="mt-6 inline-block animate-bounce text-xl">
            ▼
          </a>
        </div>
      </section>

      {/* Event Highlights */}
      <Events/>

      <VideoCarousel/>

      {/* Clubs Section */}
      <Clubs/>
    </div>
  );
}