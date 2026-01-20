import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import EventsHero from "../components/Events/EventsHero";
import EventsSearch from "../components/Events/EventsSearch";
import EventsFilters from "../components/Events/EventsFilters";
import EventCard from "../components/Events/EventCard";
import Pagination from "../components/Pagination";

import EventFetcher from "../api-files/EventAPIs/EventFetcher";

/* 🔹 TEMP DEMO DATA (ONLY FOR UI VISIBILITY) */
const DEMO_EVENTS = [
  {
    _id: "1",
    title: "Kampus Combat 2.0",
    eventDate: "2026-02-12",
    image: "uploads/demo1.jpg",
    eventType: "sports",
  },
  {
    _id: "2",
    title: "Techno Clash",
    eventDate: "2026-02-15",
    image: "uploads/demo2.jpg",
    eventType: "techno",
  },
  {
    _id: "3",
    title: "Cultural Night",
    eventDate: "2026-02-20",
    image: "uploads/demo3.jpg",
    eventType: "cultural",
  },
  {
    _id: "4",
    title: "Hackathon",
    eventDate: "2026-02-22",
    image: "uploads/demo4.jpg",
    eventType: "techno",
  },
  {
    _id: "5",
    title: "Drama Night",
    eventDate: "2026-02-25",
    image: "uploads/demo5.jpg",
    eventType: "cultural",
  },
  {
    _id: "6",
    title: "Football League",
    eventDate: "2026-02-28",
    image: "uploads/demo6.jpg",
    eventType: "sports",
  },
];

export default function AllEvents() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [role, setRole] = useState("admin");
  const [events, setEvents] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ---------------- FETCH EVENTS (UNCHANGED LOGIC) ---------------- */
  const getclubevents = async () => {
    try {
      const form = { role, page, limit: 6 };
      const res = await EventFetcher(form);

      if (res?.success && Array.isArray(res.events)) {
        setEvents(res.events);
        setTotalPages(res.pagination?.totalPages || 1);
      } else {
        setEvents([]);
        setTotalPages(1);
      }
    } catch (err) {
      setEvents([]);
      setTotalPages(1);
    }
  };

  /* ---------------- URL PARAM → ROLE ---------------- */
  useEffect(() => {
    if (id == 1 || id == 2 || id == 3) {
      setRole(id == 1 ? "techno" : id == 2 ? "sports" : "cultural");
    } else {
      setRole("admin");
    }
  }, [id]);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    getclubevents();
  }, [role, page]);

  /* ---------------- FILTER ---------------- */
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setRole(filter === "all" ? "admin" : filter);
    setPage(1);
  }, [filter]);

  /* ---------------- SEARCH ---------------- */
  const [search, setSearch] = useState("");

  /* 🔑 If API fails → use DEMO_EVENTS */
  const sourceEvents = events.length > 0 ? events : DEMO_EVENTS;

  const filteredEvents = sourceEvents.filter((event) => {
    const matchCategory = filter === "all" || event.eventType === filter;

    const matchSearch =
      !search || event.title.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ✅ STABLE STAR BACKGROUND */
  const stars = useMemo(() => {
    const STAR_COUNT = 140;

    return Array.from({ length: STAR_COUNT }).map((_, i) => {
      const size = Math.random() > 0.75 ? 2 : 1;
      const left = Math.random() * 98;
      const top = Math.random() * 100;

      const twinkleDuration = 0.8 + Math.random() * 1.8;
      const twinkleDelay = Math.random() * 2;

      const moveDuration = 10 + Math.random() * 18;
      const moveDelay = Math.random() * 3;

      const opacity = 0.35 + Math.random() * 0.65;
      const glow = 6 + Math.random() * 10;

      return {
        id: i,
        size,
        left,
        top,
        twinkleDuration,
        twinkleDelay,
        moveDuration,
        moveDelay,
        opacity,
        glow,
      };
    });
  }, []);

  return (
    <>
      {/* 🌌 FIXED STAR BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${Math.min(star.left, 98)}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.glow}px rgba(255,255,255,0.9)`,
              animation: `
                twinkleStrong ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite alternate,
                moveStar ${star.moveDuration}s linear ${star.moveDelay}s infinite alternate
              `,
            }}
          />
        ))}
      </div>

      {/* PAGE CONTENT */}
      <section className="relative w-full text-white pb-32">
        {/* SPACE BELOW FIXED NAVBAR */}
        <div className="pt-28">
          <EventsHero />
        </div>

        <EventsSearch search={search} setSearch={setSearch} />
        <EventsFilters filter={filter} setFilter={setFilter} />

        {/* ✅ EVENTS GRID */}
        <div className="relative z-20 max-w-[1100px] mx-auto mt-12 px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>

      <style>{`
        @keyframes twinkleStrong {
          0%   { opacity: 0.15; transform: scale(0.9); }
          50%  { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0.25; transform: scale(1); }
        }

        @keyframes moveStar {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, -60px); }
        }
      `}</style>
    </>
  );
}
