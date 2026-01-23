import React from "react";
import { Link } from "react-router-dom";


export default function Index() {
  const events = [
    {
      id: 1,
      title: "Sports",
      image: "https://res.cloudinary.com/desybsga6/image/upload/v1768938825/Kabaddi_1_akr5kj.webp",
      linkto: "/allevents?id=2",
    },
    {
      id: 2,
      title: "Techno",
      image: "https://res.cloudinary.com/desybsga6/image/upload/v1768938646/Gemini_Generated_Image_yfmm0ryfmm0ryfmm_1_ghfkwd.webp",
      linkto: "/allevents?id=1",
    },
    {
      id: 3,
      title: "Cultural",
      image: "https://res.cloudinary.com/desybsga6/image/upload/v1768938427/199A4372_oc9cng.webp",
      linkto: "/allevents?id=3",
    },
  ];

  return (
    <div
      id="events-section"
      className="h-fit sm:min-h-fit flex items-center justify-center px-4 py-6 sm:py-12 md:py-16"
    >
      <div className="w-full max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2
            className="text-xl font-bold uppercase mb-4 tracking-wide text-gray-300"
            style={{
              WebkitTextStroke: "0.2px white",
              fontFamily: "Istok Web, sans-serif",
            }}
          >
            Explore events
          </h2>

         <h1
  className="
    text-4xl md:text-5xl font-bold uppercase mb-4
    bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500
    bg-clip-text text-transparent
  "
>
  Discover What's Happening Next
</h1>


          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Stay in the loop with the exciting moments unfolding around you.
            From fresh experiences to major highlights, every event is crafted
            to spark curiosity and celebration. There’s always something new
            waiting just around the corner.
          </p>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 gap-4 px-4 place-items-center" style={{ contain: 'layout style paint' }}>
          {events.map((event) => (
            <Link
              key={event.id}
              to={event.linkto}
              className="relative group aspect-square w-full max-w-[420px] overflow-hidden rounded-xl cursor-pointer"
            >
              {/* Event Image */}
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* ✅ Optimized overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 z-10" />

              {/* ✅ Title (static) */}
              <div className="absolute bottom-8 left-8 z-30">
                <h3 className="text-white text-4xl font-bold tracking-wide">
                  {event.title}
                </h3>
              </div>

              {/* ✅ Explore More button */}
              <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-white/20 text-white text-sm md:text-base font-medium backdrop-blur-sm border border-white/30">
                  Explore More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
