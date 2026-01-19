import React, { useMemo, useState, useEffect } from "react";
import SponsorFetcher from "../api-files/SponsorAPIs/SponsorFetcher";
import { API_URL } from "../NwConfig";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await SponsorFetcher();
        if (res?.success && res?.sponsors?.length > 0) {
          const mappedSponsors = res.sponsors.map((sponsor) => ({
            id: sponsor._id || sponsor.id,
            img: sponsor.image ? `${API_URL}/${sponsor.image}` : "/sponsors/default.png",
            alt: sponsor.title || "Sponsor",
            link: sponsor.link || "#"
          }));
          setSponsors(mappedSponsors);
        }
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  // ✅ duplicate array for seamless marquee loop
  const marqueeSponsors = useMemo(() => sponsors.length > 0 ? [...sponsors, ...sponsors] : [], [sponsors]);

  if (loading) {
    return (
      <section className="w-full py-14 bg-black/45 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (sponsors.length === 0) {
    return (
      <section className="w-full py-14 bg-black/45 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="text-center">
            <h3
              className="text-xl md:text-2xl font-bold uppercase mb-2 tracking-wide"
              style={{
                WebkitTextStroke: "0.3px rgba(255,255,255,0.8)",
                color: "transparent",
                fontFamily: "Istok Web, sans-serif",
              }}
            >
              Event Sponsors
            </h3>
            <p className="text-white/70 text-sm md:text-base">Coming soon...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-14 bg-black/45 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h3
            className="text-xl md:text-2xl font-bold uppercase mb-2 tracking-wide"
            style={{
              WebkitTextStroke: "0.3px rgba(255,255,255,0.8)",
              color: "transparent",
              fontFamily: "Istok Web, sans-serif",
            }}
          >
            Event Sponsors
          </h3>

          <h2
            className="text-2xl md:text-4xl lg:text-[36px] font-bold uppercase mb-3 text-white"
            style={{ fontFamily: "Istok Web, sans-serif" }}
          >
            Supporting Every Step
          </h2>

          <p
            className="text-white/90 text-sm md:text-base max-w-[851px] mx-auto"
            style={{ fontFamily: "Istok Web, sans-serif" }}
          >
            This year's fest is shaped and strengthened by the support of our
            sponsors.
          </p>
        </div>
      </div>

      {/* ✅ Single line + marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Edge fade */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/45 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/45 to-transparent z-10" />

        {/* ✅ marquee track */}
        <div className="flex w-max items-center gap-6 animate-sponsor-marquee">
          {marqueeSponsors.map((sp, idx) => (
            <a
              key={`${sp.id}-${idx}`}
              href={sp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-shrink-0
                w-[180px] h-[70px]
                sm:w-[200px] sm:h-[75px]
                md:w-[230px] md:h-[85px]
                lg:w-[250px] lg:h-[90px]
                rounded-xl overflow-hidden
                bg-[#1a1a1a]
                flex items-center justify-center
                shadow-md
                hover:scale-105 transition-transform duration-300
                cursor-pointer
              "
            >
              <img
                src={sp.img}
                alt={sp.alt}
                className="w-full h-full object-contain p-4"
                draggable="false"
                onError={(e) => {
                  e.target.src = "/sponsors/default.png";
                }}
              />
            </a>
          ))}
        </div>
      </div>

      {/* optional bottom line like screenshot */}

      {/* ✅ marquee keyframes */}
      <style>{`
        @keyframes sponsorMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-sponsor-marquee {
          animation: sponsorMarquee 18s linear infinite;
        }

        /* ✅ smoother on hover (optional) */
        .animate-sponsor-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
