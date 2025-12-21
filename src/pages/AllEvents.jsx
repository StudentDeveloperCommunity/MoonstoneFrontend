import { useEffect, useRef, useState } from "react";
import EventsHero from "../components/Events/EventsHero";
import EventsSearch from "../components/Events/EventsSearch";
import EventsFilters from "../components/Events/EventsFilters";
import EventCard from "../components/Events/EventCard";
import { useSearchParams } from "react-router-dom";
import EventFetcher from "../api-files/EventAPIs/EventFetcher";
import WebsiteLoader from "../Loader/WebsiteLoader";
import Pagination from "../components/Pagination";
export default function AllEvents() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [events, setEvent] = useState([]);

  // Pagination Essentials
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  const getclubevents = async (id) => {
    setLoading(true);
    const form = { role, page, limit: 6 };
    // console.log(form)
    const res = await EventFetcher(form)
    // console.log(res);
    if (res?.success) {
      setEvent(res?.events);
      setTotalPages(res?.pagination?.totalPages);
      setLoading(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id == 1 || id == 2 || id == 3) {
      setRole(id == 1 ? "techno" : id == 2 ? "sports" : "cultural");
    } else if (id === "all") {
      setRole("admin");
    }
  }, [id]);


  useEffect(() => {
    getclubevents(id)

  }, [role, page])

  const [filter, setFilter] = useState("all");
  useEffect(() => {
    if (filter === "all") {
      setRole("admin");
    } else {
      setRole(filter);
    }
    setPage(1); // reset pagination on filter change
  }, [filter]);
  // console.log(filter)
  useEffect(() => {
    // setClubid(filter)
    getclubevents(filter)
  }, [filter])
  const [search, setSearch] = useState("");

  // const events = [
  //   { id: 1, title: "Kampus Combat", category: "sports" },
  //   { id: 2, title: "Robo Race", category: "techno" },
  //   { id: 3, title: "Cultural Fest", category: "cultural" },
  //   { id: 4, title: "Hackathon", category: "techno" },
  //   { id: 5, title: "Drama Night", category: "cultural" },
  //   { id: 6, title: "Tech Circuit", category: "techno" },
  // ];

  const filteredEvents = events?.filter((event) => {
    const matchCategory =
      filter === "all" || event.eventType === filter;


    const matchSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <section ref={topRef} className="min-h-screen bg-gray-900 text-white pt-24 pb-32">
      {
        loading && <WebsiteLoader />
      }
      <EventsHero />
      <EventsSearch search={search} setSearch={setSearch} />
      <EventsFilters filter={filter} setFilter={setFilter} />

      <div className="max-w-[1200px] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredEvents?.map((event) => (
          <EventCard
            key={event._id}
            event={event}

          />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
