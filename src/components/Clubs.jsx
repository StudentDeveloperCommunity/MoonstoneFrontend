import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const events = [
    {
      id: 1,
      title: "Sports",
      image:
        "https://ik.imagekit.io/wciaxyg0zo/Explore%20Events-Home%20page/Kabaddi%20(1).webp?updatedAt=1771160747276",
      linkto: "/allevents?id=2",
    },
    {
      id: 2,
      title: "Techno",
      image:
        "https://ik.imagekit.io/wciaxyg0zo/Explore%20Events-Home%20page/Gemini_Generated_Image_yfmm0ryfmm0ryfmm%20(1).webp?updatedAt=1771160747086",
      linkto: "/allevents?id=1",
    },
    {
      id: 3,
      title: "Cultural",
      image:
        "https://ik.imagekit.io/wciaxyg0zo/Explore%20Events-Home%20page/cultural-club-banner.png",
      linkto: "/allevents?id=3",
    },
  ];

  return (
    <div
      id="events-section"
      className="h-fit sm:min-h-fit flex items-center justify-center px-3 sm:px-4 py-1 sm:py-8 md:py-1"
    >
      <div className="w-full max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <h2
            className="text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase mb-2 sm:mb-3 tracking-wide text-gray-300"
            style={{
              WebkitTextStroke: "0.2px white",
              fontFamily: "Istok Web, sans-serif",
            }}
          >
            Explore events
          </h2>

          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase mb-3 sm:mb-4 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent"
          >
            Discover What's Happening Next
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Stay in the loop with the exciting moments unfolding around you.
            From fresh experiences to major highlights, every event is crafted
            to spark curiosity and celebration. There’s always something new
            waiting just around the corner.
          </p>
        </div>

        {/* Event Grid */}
        <div
          className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 gap-4 px-3 sm:px-4 place-items-center"
          style={{ contain: "layout style paint" }}
        >
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
