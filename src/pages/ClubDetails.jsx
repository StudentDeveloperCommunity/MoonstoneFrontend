import React, { useEffect, useState } from "react";
import bannerimg1 from "../assets/club/techno-club-banner.png"; 
import bannerimg2 from "../assets/club/sports-club-banner.png"; 
import bannerimg3 from "../assets/club/cultural-club-banner.png";

import img1 from "../assets/events/event-1.jpeg";
import img2 from "../assets/events/event-2.avif";
import img3 from "../assets/events/event-3.avif";
import img4 from "../assets/events/event-4.avif";
import img5 from "../assets/events/event-5.webp";
import img6 from "../assets/events/event-6.avif";
import { useLocation } from "react-router-dom";
export default function ClubDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clubId = queryParams.get("id");
  const [clubid, setClubid] = useState(clubId || 1);
  
  // Sample Event Data (Replace with API data later)
  const ev=[
      { id: 1, title: "Robo Race", desc: "Experience high-speed robotics in this intense techno challenge ", img: img1, category: "techno" },
      { id: 2, title: "Football Championship", desc: "Compete and show your athletic excellence in our sports league.", img: img2, category: "sports" },
      { id: 3, title: "Cultural Fest", desc: "Celebrate music, dance, art, and cultural diversity.", img: img3, category: "cultural" },
      { id: 1, title: "Hackathon", desc: "Showcase coding skills and build real-world solutions overnight.", img: img4, category: "techno" },
      { id: 3, title: "Drama Night", desc: "A celebration of performance arts & cultural expression.", img: img5, category: "cultural" },
      { id: 1, title: "Tech Circuit", desc: "Compete in intense hardware building & debugging challenges.", img: img6, category: "techno" },
    ]
  const [events,setEvent] = useState([]);
    const [top,settop]=useState({img:bannerimg1,title:"Techno Club",desc:"The Techno Club focuses on coding, AI, robotics and software innovations. Students collaborate to create solutions, participate in hackathons, and build real-world development & research skills."});
    useEffect(()=>{
    setEvent(ev.filter(event=> {
      if(clubid==1) return event.category==="techno";
      else if(clubid==2) return event.category==="sports";
      else if(clubid==3) return event.category==="cultural";
    }))
    if(clubid==1){
      settop({img:bannerimg1,title:"Techno Club",desc:"The Techno Club focuses on coding, AI, robotics and software innovations. Students collaborate to create solutions, participate in hackathons, and build real-world development & research skills."});
    }
    else if(clubid==2){
      settop({img:bannerimg2,title:"Sports Club",desc:"The Sports Club promotes physical fitness and teamwork through various athletic events, tournaments, and training sessions."});
    }
    else if(clubid==3){
      settop({img:bannerimg3,title:"Cultural Club",desc:"The Cultural Club celebrates artistic expression and diversity through music, dance, drama, and cultural festivals."});
    }
  },[clubid])
console.log(events);
console.log(clubid);
  return (
    <div className="w-full flex flex-col items-center justify-center pt-20 pb-10">

      {/* ---------- TOP SECTION (FULL WIDTH IMAGE) ---------- */}
      <section className="w-full mb-12">
        <img
          src={top.img}
          alt="Techno Club Banner"
          className="w-full h-[500px] md:h-full object-cover"
        />

        <div className="px-8 mt-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{top.title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {top.desc}
          </p>
        </div>
      </section>

      {/* ---------- EVENTS SECTION ---------- */}
      <section className="w-full max-w-6xl px-6">
        <h3 className="text-3xl font-bold mb-8 text-center">Our Events</h3>

        <div className="flex flex-col gap-20">

          {events.map((event, index) => (
            <div
              key={event.id}
              className={`grid md:grid-cols-2 gap-10 items-center ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Event Image */}
              <div className={index % 2 !== 0 ? "md:order-2" : ""}>
                <img
                  src={event.img}
                  alt={event.title}
                  className="rounded-2xl shadow-lg w-full h-[280px] object-cover"
                />
              </div>

              {/* Event Text */}
              <div className={`flex flex-col justify-center ${
                index % 2 !== 0 ? "md:order-1" : ""
              }`}>
                <h4 className="text-2xl font-bold mb-3">{event.title}</h4>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {event.desc}
                </p>

                {/* Gradient Button */}
                <button
                  className="h-12 w-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                  text-white font-semibold rounded-full shadow-xl mt-5 transition-all duration-300
                  hover:scale-105 hover:shadow-2xl"
                >
                  Register Now →
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
