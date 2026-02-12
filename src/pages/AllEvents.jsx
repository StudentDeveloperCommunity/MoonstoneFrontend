import { useEffect, useMemo, useState, useCallback } from "react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ---------------- FETCH EVENTS (UNCHANGED LOGIC) ---------------- */
  const getclubevents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const form = { role, page, limit: 6 };
      const res = await EventFetcher(form);

      if (res?.success && Array.isArray(res.events)) {
        // Clear previous events immediately to prevent mixing
        setEvents(res.events);
        setTotalPages(res.pagination?.totalPages || 1);
      } else {
        setEvents([]);
        setTotalPages(1);
        setError("No events found");
      }
    } catch (err) {
      setEvents([]);
      setTotalPages(1);
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [role, page]);

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
    // Clear events immediately when filter changes to prevent mixing
    setEvents([]);
    setLoading(true);
    setError(null);
    setRole(filter === "all" ? "admin" : filter);
    setPage(1);
  }, [filter]);

  /* ---------------- SEARCH ---------------- */
  const [search, setSearch] = useState("");

  /* ✅ Use real events only - no demo fallback */
  const sourceEvents = events;

  /* ✅ Memoized filtering for performance */
  const filteredEvents = useMemo(() => {
    return sourceEvents.filter((event) => {
      const matchCategory = filter === "all" || event.eventType === filter;
      const matchSearch = !search || event.title.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [sourceEvents, filter, search]);

  const handlePageChange = useCallback((page) => {
    // Clear events when changing page to prevent mixing
    setEvents([]);
    setLoading(true);
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ✅ OPTIMIZED STAR BACKGROUND */
  const stars = useMemo(() => {
    const STAR_COUNT = 40; // Reduced from 140 to 40 for performance

    return Array.from({ length: STAR_COUNT }).map((_, i) => {
      const size = Math.random() > 0.8 ? 2 : 1;
      const left = Math.random() * 98;
      const top = Math.random() * 100;

      // Simplified animations - only twinkle, no complex movement
      const twinkleDuration = 2 + Math.random() * 3;
      const twinkleDelay = Math.random() * 2;
      const opacity = 0.3 + Math.random() * 0.7;

      return {
        id: i,
        size,
        left,
        top,
        twinkleDuration,
        twinkleDelay,
        opacity,
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
              animation: `twinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite alternate`,
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

        {/* ✅ EVENTS GRID WITH LOADING SCREEN */}
        <div className="relative z-20 max-w-[1100px] mx-auto mt-12 px-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              {/* Mobile-optimized Loading Spinner */}
              <div className="relative mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-600 border-b-transparent rounded-full animate-spin animation-delay-150"></div>
              </div>
              
              {/* Loading Text */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Loading Events</h3>
              <p className="text-gray-400 text-center max-w-md px-4 text-sm sm:text-base">
                Fetching {filter === "all" ? "all" : filter} events for you...
              </p>
              
              {/* Loading Dots */}
              <div className="flex gap-2 mt-6">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full animate-bounce animation-delay-0"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-full animate-bounce animation-delay-150"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full animate-bounce animation-delay-300"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 text-xl mb-4">{error}</div>
              <button 
                onClick={getclubevents}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-xl">No events found</div>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>

      <style>{`
        @keyframes twinkle {
          0%   { opacity: 0.2; transform: scale(0.9); }
          50%  { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.3; transform: scale(1); }
        }
        
        .animation-delay-0 {
          animation-delay: 0ms;
        }
        
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </>
  );
}
