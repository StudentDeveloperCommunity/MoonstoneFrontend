import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const events = [
    {
      id: 1,
      title: "Techno",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    },
    {
      id: 2,
      title: "Sports",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    },
    {
      id: 3,
      title: "Cultural",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
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
              key={event.id}
              to={`/club?id=${event.id}`} 
              className="relative group aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
             
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              
              <div className="absolute inset-0 bg-black/40 z-10" />

              
              <div
                className="absolute -top-0 -right-0 w-12 h-12 rounded
                  bg-white/10 backdrop-blur-xl border border-white/20
                  scale-100 group-hover:scale-[28]
                  transition-transform duration-500 ease-out
                  z-10"
              />

              
              <button className="absolute top-2 right-4 z-20 text-white text-xl">
                →
              </button>

              
              <div className="absolute bottom-8 left-8 z-20">
                <h3
                  className="text-white text-4xl font-bold tracking-wide
                    transition-colors duration-300"
                >
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
