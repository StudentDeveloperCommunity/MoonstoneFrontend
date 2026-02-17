import React, { useMemo, useState, useEffect } from "react";
import SponsorFetcher from "../api-files/SponsorAPIs/SponsorFetcher";
import { API_URL } from "../NwConfig";
import SponsorCard from "../components/SponsorCard";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await SponsorFetcher();
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
            <SponsorCard key={`${sp.id}-${idx}`} sponsor={sp} />
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