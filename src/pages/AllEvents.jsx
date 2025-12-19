import { useState } from "react";
import { useNavigate } from "react-router-dom";

import EventsHero from "../components/Events/EventsHero";
import EventsSearch from "../components/Events/EventsSearch";
import EventsFilters from "../components/Events/EventsFilters";
import EventCard from "../components/Events/EventCard";

export default function AllEvents() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const events = [
    { id: 1, title: "Kampus Combat", category: "sports" },
    { id: 2, title: "Robo Race", category: "techno" },
    { id: 3, title: "Cultural Fest", category: "cultural" },
    { id: 4, title: "Hackathon", category: "techno" },
    { id: 5, title: "Drama Night", category: "cultural" },
    { id: 6, title: "Tech Circuit", category: "techno" },
  ];

  const filteredEvents = events.filter((event) => {
    const matchCategory =
      filter === "all" ||
      (filter === "non-tech"
        ? event.category !== "techno"
        : event.category === filter);

    const matchSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <section className="min-h-screen bg-gray-900 text-white pt-24 pb-32">
      <EventsHero />
      <EventsSearch search={search} setSearch={setSearch} />
      <EventsFilters filter={filter} setFilter={setFilter} />

      <div className="max-w-[1200px] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => navigate(`/event/${event.id}`)}
          />
        ))}
      </div>
    </section>
  );
}
