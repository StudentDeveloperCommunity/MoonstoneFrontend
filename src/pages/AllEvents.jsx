import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EventsHero from "../components/Events/EventsHero";
import EventsSearch from "../components/Events/EventsSearch";
import EventsFilters from "../components/Events/EventsFilters";
import EventCard from "../components/Events/EventCard";
import { useSearchParams } from "react-router-dom";
import EventFetcher from "../api-files/EventAPIs/EventFetcher";
import WebsiteLoader from "../Loader/WebsiteLoader";

export default function AllEvents() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
    const [clubid, setClubid] = useState("");
      const [loading,setLoading]=useState(false);
        const [events,setEvent] = useState([]);
      
    const getclubevents=async(id)=>{
        setLoading(true);
        var form={}
        // console.log(id)
        if(id ==1 || id ==2 || id ==3){
         form={"role":id==1?"techno":id==2?"sports":"cultural"};
        }
        else{
          form={"role":id==="all"?"admin":id}
        }
        // console.log(form)
        // console.log(form);
        const res=await EventFetcher(form)
        // console.log(res);
        if(res?.success){
          setEvent(res?.events);
          setLoading(false);
        }
        setLoading(false);
      }

      useEffect(()=>{
    getclubevents(id)

      },[id])
  
  // console.log(id)

  const [filter, setFilter] = useState("all");
  // console.log(filter)
  useEffect(()=>{
    // setClubid(filter)
    getclubevents(filter)
  },[filter])
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
    <section className="min-h-screen bg-gray-900 text-white pt-24 pb-32">
      {
              loading && <WebsiteLoader/>
            }
      <EventsHero />
      <EventsSearch search={search} setSearch={setSearch}  />
      <EventsFilters filter={filter} setFilter={setFilter} />

      <div className="max-w-[1200px] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredEvents?.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            
          />
        ))}
      </div>
    </section>
  );
}
