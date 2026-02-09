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
        console.log("Sponsors API response:", res);
        if (res?.success && res?.sponsors?.length > 0) {
          const mappedSponsors = res.sponsors
            .map((sponsor) => ({
              id: sponsor._id || sponsor.id,
              img:
                sponsor.image || sponsor.logo
                  ? `${API_URL}/${sponsor.image || sponsor.logo}`
                  : null,
              alt: sponsor.title || sponsor.name || "Sponsor",
              link: sponsor.link || sponsor.website || "#",
            }))
            .filter((sponsor) => sponsor.img); // Only show sponsors with images
          setSponsors(mappedSponsors);
        }
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchSponsors();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchSponsors();
    }, 10000); // 10 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // duplicate array for seamless marquee loop
  const marqueeSponsors = useMemo(() => {
    if (sponsors.length === 0) return [];
    return [...sponsors, ...sponsors];
  }, [sponsors]);

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
      <section className="w-full py-10 sm:py-14 bg-black/45 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-8">
          <div className="text-center">
            <h3
              className="text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase mb-2 sm:mb-3"
              style={{
                color: "white",
                fontFamily: "Istok Web, sans-serif",
              }}
            >
              Event Sponsors
            </h3>
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase mb-3 sm:mb-4 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent"
            >
              Supporting Every Step
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Our sponsors help make this event possible. Check back soon to see
              our amazing partners!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10 sm:py-14 bg-black/45 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2
            className="text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase mb-2 sm:mb-3 tracking-wide text-gray-300"
            style={{
              WebkitTextStroke: "0.2px white",
              fontFamily: "Istok Web, sans-serif",
            }}
          >
            Event Sponsors
          </h2>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase mb-3 sm:mb-4 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent"
          >
            Supporting Every Step
          </h2>

          <p
            className="text-xs sm:text-sm md:text-base text-white/90 max-w-[851px] mx-auto"
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

        {/* ✅ marquee track - continuous smooth animation */}
        <div className="inline-flex items-center gap-3 animate-sponsor-marquee py-8 will-change-transform w-max">
          {marqueeSponsors.map((sp, idx) => (
            <a
              key={`${sp.id}-${idx}`}
              href={sp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-shrink-0
                w-[220px] h-[140px]
                sm:w-[240px] sm:h-[160px]
                md:w-[280px] md:h-[180px]
                lg:w-[400px] lg:h-[240px]
                xl:w-[440px] xl:h-[260px]
                rounded-2xl overflow-hidden
                bg-transparent
                flex items-center justify-center
                shadow-xl
                hover:shadow-2xl hover:scale-105 transition-all duration-300
                cursor-pointer
                border border-gray-200
                relative
                group
              "
            >
              {/* Background pattern for better visual appeal */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              {/* Content container */}
              <div className="relative z-10 flex items-center justify-center w-full h-full p-2">
                <img
                  src={sp.img}
                  alt={sp.alt}
                  className="
                    w-full h-full 
                    object-contain 
                    filter drop-shadow-lg
                    group-hover:scale-110 transition-transform duration-300
                  "
                  draggable="false"
                  onError={(e) => {
                    console.error("Failed to load sponsor image:", sp.img);
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <div class="flex flex-col items-center justify-center h-full text-gray-400">
                        <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5a2 2 0 00-2-2v-5a2 2 0 00-2-2H5m14 0a2 2 0 002-2v-5a2 2 0 00-2-2H9m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6m14 0v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5m14 0a2 2 0 002-2v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5m14 0a2 2 0 002-2v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5" />
                        </svg>
                        <span class="text-sm font-medium">Logo</span>
                      </div>
                    `;
                  }}
                />
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Border highlight on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
            </a>
          ))}
        </div>
      </div>

      {/* optional bottom line like screenshot */}

      {/* Smooth infinite marquee animation */}
      <style>{`
        @keyframes sponsorMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-sponsor-marquee {
          animation: sponsorMarquee 28s linear infinite;
          display: flex;
          width: max-content;
        }

        /* Pause animation on hover to see details */
        .animate-sponsor-marquee:hover {
          animation-play-state: paused;
        }

        /* Hardware acceleration for smoother performance */
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}