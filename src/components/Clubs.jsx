


import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const events = [
    {
      id: 1,
      title: "Techno",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
      description: "Techno evenPIJIE0UIERJ]09RU]0t",
    },
    {
      id: 2,
      title: "Sports",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
      description: " sports evIHG08ERGJ[ents ",
    },
    {
      id: 3,
      title: "Cultural",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
      description: "CulturJBIU0Hal festival.",
    },
  ];

  return (
    
    <div className=" min-h-screen bg-black flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[1440px]">

        {/* Header */}
        <div className="text-center mb-2">
          <h2
            className="text-xl font-bold uppercase mb-4 tracking-wide text-gray-300"
            style={{
              WebkitTextStroke: "0.2px #707070",
              color: "transparent",
              fontFamily: "Istok Web, sans-serif",
            }}
          >
            Explore events
          </h2>

          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-2">
            Discover What's Happening Next
          </h1>

          <p className="text-gray-400 max-w-2xl mb-2 mx-auto leading-relaxed">
            Stay in the loop with the exciting moments unfolding around you.
            From fresh experiences to major highlights, every event is crafted to spark curiosity and celebration. 
            There’s always something new waiting just around the corner.
          </p>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/club?id=${event.id}`} 
              className="relative group aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
              {/* Event Image: blur and scale on hover */}
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover z-0 transition duration-500 group-hover:blur-sm group-hover:scale-105"
              />

              {/* Glass overlay (same as yours) */}
              <div
                className="absolute -top-0 -right-0 w-12 h-12 rounded
    bg-transparent border border-white/20
    scale-100 group-hover:scale-[20]
    transition-transform duration-500 ease-out
    z-20 pointer-events-none"
              />

              {/* Arrow stays intact */}
              <button className="absolute top-2 right-4 z-30 text-white text-xl">
                →
              </button>

              {/* Original title disappears on hover */}
              <div className="absolute bottom-8 left-8 z-20 transition-opacity duration-500 group-hover:opacity-0">
                <h3 className="text-white text-4xl font-bold tracking-wide">
                  {event.title}
                </h3>
              </div>

              {/* New content appears on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-4">
                
                <p className="text-gray-200 text-sm">{event.description}</p>
                
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
