import React, { useState } from "react";
import img1 from "../assets/events/event-1.jpeg";
import img2 from "../assets/events/event-2.avif";
import img3 from "../assets/events/event-3.avif";
import img4 from "../assets/events/event-4.avif";
import img5 from "../assets/events/event-5.webp";
import img6 from "../assets/events/event-6.avif";

export default function AllEvents() {
  const [filter, setFilter] = useState("all");

  const events = [
    { id: 1, title: "Robo Race", desc: "Experience high-speed robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.robotics in this intense techno challenge.", img: img1, category: "techno" },
    { id: 2, title: "Football Championship", desc: "Compete and show your athletic excellence in our sports league.", img: img2, category: "sports" },
    { id: 3, title: "Cultural Fest", desc: "Celebrate music, dance, art, and cultural diversity.", img: img3, category: "cultural" },
    { id: 4, title: "Hackathon", desc: "Showcase coding skills and build real-world solutions overnight.", img: img4, category: "techno" },
    { id: 5, title: "Drama Night", desc: "A celebration of performance arts & cultural expression.", img: img5, category: "cultural" },
    { id: 6, title: "Tech Circuit", desc: "Compete in intense hardware building & debugging challenges.", img: img6, category: "techno" },
  ];

  const filteredEvents = filter === "all" ? events : events.filter((e) => e.category === filter);

  return (
    <section className="min-h-screen bg-gray-900 text-white pt-24 pb-10 px-4 md:px-10">

      {/* Dropdown Filter aligned LEFT */}
      <div className="mb-6 mt-5">
        <div className="inline-block relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-6 py-3 pr-10 rounded-lg bg-gray-800 text-white shadow-lg border border-gray-700 
                       focus:ring-2 ring-indigo-500 outline-none appearance-none cursor-pointer"
          >
            <option value="all">📋 All Events</option>
            <option value="techno">🤖 Techno Events</option>
            <option value="sports">⚽ Sports Events</option>
            <option value="cultural">🎭 Cultural Events</option>
          </select>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
            ▼
          </span>
        </div>
      </div>

      {/* Scrollable Event Sections */}
      <div className="overflow-y-scroll snap-y snap-mandatory no-scrollbar">

        {filteredEvents.map((event, index) => (
          <div
            key={event.id}
            className="snap-start min-h-[85vh] flex flex-col md:flex-row items-center 
                       justify-center gap-10 py-0"
          >
            {/* IMAGE */}
            <div
              className={`w-full md:w-1/2 ${
                index % 2 === 0 ? "md:order-1" : "md:order-2"
              }`}
            >
              <img
                src={event.img}
                alt={event.title}
                className="rounded-xl w-full object-cover shadow-xl
                           hover:scale-[1.02] transition-transform"
              />
            </div>

            {/* TEXT */}
            <div
              className={`w-full md:w-1/2 space-y-4 text-center md:text-left ${
                index % 2 === 0 ? "md:order-2" : "md:order-1"
              }`}
            >
              <h2 className="text-4xl font-bold tracking-wide">{event.title}</h2>
              <p className="text-lg opacity-90 leading-relaxed text-wrap md:h-52 h-32 overflow-x-auto no-scrollbar">{event.desc}</p>

              <span className="inline-block px-4 py-2 rounded-full bg-indigo-600 text-white text-sm shadow-md">
                {event.category.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
