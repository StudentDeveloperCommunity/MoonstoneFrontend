import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import img1 from "../assets/events/event-1.jpeg";
import img2 from "../assets/events/event-2.avif";
import img3 from "../assets/events/event-3.avif";
import img4 from "../assets/events/event-4.avif";
import img5 from "../assets/events/event-5.webp";
import img6 from "../assets/events/event-6.avif";

import EventsHero from "../components/Events/EventsHero";
import EventsSearch from "../components/Events/EventsSearch";
import EventsFilters from "../components/Events/EventsFilters";
import EventCard from "../components/Events/EventCard";

export default function AllEvents() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const events = [
    {
      id: 1,
      title: "Kampus Combat",
      desc: "Experience high-speed robotics in this intense techno challenge.",
      img: img1,
      category: "techno",
    },
    {
      id: 2,
      title: "Football Championship",
      desc: "Compete and show your athletic excellence in our sports league.",
      img: img2,
      category: "sports",
    },
    {
      id: 3,
      title: "Cultural Fest",
      desc: "Celebrate music, dance, art, and cultural diversity.",
      img: img3,
      category: "cultural",
    },
    {
      id: 4,
      title: "Hackathon",
      desc: "Showcase coding skills and build real-world solutions overnight.",
      img: img4,
      category: "techno",
    },
    {
      id: 5,
      title: "Drama Night",
      desc: "A celebration of performance arts & cultural expression.",
      img: img5,
      category: "cultural",
    },
    {
      id: 6,
      title: "Tech Circuit",
      desc: "Compete in intense hardware building & debugging challenges.",
      img: img6,
      category: "techno",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      filter === "all" ||
      (filter === "non-tech"
        ? event.category !== "techno"
        : event.category === filter);

    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-black text-white pt-24 pb-40">
      <EventsHero />

      <div className="max-w-[1152px] mx-auto px-4">
        <EventsSearch search={search} setSearch={setSearch} />
        <EventsFilters filter={filter} setFilter={setFilter} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 mt-12">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => navigate(`/event/${event.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
