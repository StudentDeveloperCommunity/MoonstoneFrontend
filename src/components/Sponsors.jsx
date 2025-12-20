import { useEffect, useRef,useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import SponsorFetcher from "../api-files/SponsorAPIs/SponsorFetcher";
import { API_URL } from "../NwConfig";
import WebsiteLoader from "../Loader/WebsiteLoader";
export default function Sponsors() {
  const [allSponsors,setallSponsors]=useState([])
  const [loading,setloading]=useState(false)
  async function getsponsors() {
    setloading(true)
    const res=await SponsorFetcher()
    // console.log(res)
    if(res?.success){
      setallSponsors(res?.sponsors)
      setloading(false)
    }
    setloading(false)
  }
  useEffect(()=>{
getsponsors()
  },[])
  // const allSponsors = [
  //   { id: 1, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDbDA3aeEKMSmQVBzewP0X7VaO5rPY3GV2w&s", altText: "Sponsor" },
  //   { id: 2, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s", altText: "Sponsor" },
  //   { id: 3, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s", altText: "Sponsor" },
  //   { id: 4, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s", altText: "Sponsor" },
  //   { id: 5, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s", altText: "Sponsor" },
  //   { id: 6, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s", altText: "Sponsor" },
  // ];

  const marqueeSponsors = [...allSponsors, ...allSponsors];

  return (
    <section className="w-full py-16 bg-white overflow-hidden">
      {
        loading && <WebsiteLoader/>
      }
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h3
            className="text-xl md:text-2xl font-bold uppercase mb-2 tracking-wide"
            style={{
              WebkitTextStroke: "0.2px #707070",
              color: "black",
              fontFamily: "Istok Web, sans-serif",
            }}
          >
            Event Sponsors
          </h3>

          <h2
            className="text-2xl md:text-4xl lg:text-[36px] font-bold uppercase mb-4 text-black whitespace-nowrap"
            style={{ fontFamily: "Istok Web, sans-serif" }}
          >
            Supporting Every Step
          </h2>

          <p
            className="text-[#3A3A3A] text-sm md:text-base max-w-[851px] mx-auto text-gray-600"
            style={{ fontFamily: "Istok Web, sans-serif" }}
          >
            This year's fest is shaped and strengthened by the support of our sponsors.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-fit animate-marquee">
          {marqueeSponsors.map((sponsor, index) => (
            <div
              key={`-${index}`}
              className="flex-shrink-0 px-4 w-[180px] sm:w-[220px] md:w-[240px]"
            >
              <div
                className="w-full h-[100px] flex items-center justify-center rounded-md"
                style={{
                  backgroundColor: "rgba(0,0,0,0.82)",
                  backdropFilter: "blur(3px)",
                }}
              >
                <img
                  src={`${API_URL}/${sponsor.image}`}
                  alt={sponsor.title}
                   className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
