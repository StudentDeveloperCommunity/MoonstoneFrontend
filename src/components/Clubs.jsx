import React from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/events/event-1.jpeg"
import img2 from "../assets/events/event-2.avif"
import img3 from "../assets/events/event-3.avif"
export default function Index() {
  const events = [
    {
      id: 1,
      title: "Techno",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        hoverImage: img1,
        hovertext:"Feel the drop, own the night 🎧🔥Techno @ Moonstone is our annual college EDM fest with booming beats, lights, and nonstop energy."
    },
    {
      id: 2,
      title: "Sports",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        hoverImage: img2,
        hovertext:"From friendly matches to epic moments ⚽✨ Sports @ Moonstone is where fun meets fitness every year.."
    },
    {
      id: 3,
      title: "Cultural",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        hoverImage: img3,
        hovertext:"Sing it, dance it, feel it 🎤💃 Cultural @ Moonstone is where campus shines with creativity every year.."
    },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[1440px]">

       
        <div className="text-center mb-12">
          <h2 className="text-xl font-bold uppercase mb-4 tracking-wide text-gray-300">
            Explore events
          </h2>

          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6">
            Discover What's Happening Next
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stay in the loop with exciting moments unfolding around you.
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {events.map((event) => (
            <Link
  to={`/club?id=${event.id}`}
  className="relative group aspect-square overflow-hidden rounded-xl cursor-pointer"
>
  {/* Base Image */}
  <img
    src={event.image}
    alt={event.title}
    className="absolute inset-0 w-full h-full object-cover
      transition-all duration-500 ease-out
      group-hover:scale-105 group-hover:opacity-0"
  />

  {/* Hover Image */}
  <img
    src={event.hoverImage}
    alt="Hover"
    className="absolute inset-0 w-full h-full object-cover
      opacity-0 scale-110
      transition-all duration-500 ease-out
      group-hover:opacity-100 group-hover:scale-100"
  />

  <div
  className="absolute inset-0 z-20
    p-6
    opacity-0 -translate-y-2
    transition-all duration-300 delay-200
    group-hover:opacity-100 group-hover:translate-y-0"
>
  <p className="text-white text-xl font-semibold mt-10  uppercase tracking-wider">
    {event.hovertext}
  </p>
</div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 z-10" />

  {/* Arrow */}
  <span className="absolute top-2 right-4 z-20 text-white text-xl">
    →
  </span>

  {/* Title */}
  <div className="absolute bottom-8 left-8 z-20">
    <h3 className="text-white text-4xl font-bold">
      {event.title}
    </h3>
  </div>
</Link>


          ))}
        </div>
      </div>
    </div>
  );
}
