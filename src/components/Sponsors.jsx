import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function Sponsors() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const sponsorsPerSlide = 6;

  const allSponsors = [
    { id: 1, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDbDA3aeEKMSmQVBzewP0X7VaO5rPY3GV2w&s?width=256", altText: "Moonstone Logo" },
    { id: 2, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s?width=256", altText: "Moonstone Logo" },
    { id: 3, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s?width=256", altText: "Moonstone Logo" },
    { id: 4, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s?width=256", altText: "Moonstone Logo" },
    { id: 5, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s?width=256", altText: "Moonstone Logo" },
    { id: 6, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s", altText: "Moonstone Logo" },
    { id: 7, logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXzNwY1e7GZYkoP5YgxJzA6lH-4XbosIugQ&s", altText: "Moonstone Logo" },
    
  ];

  const sponsorSlides = [];
  for (let i = 0; i < allSponsors.length; i += sponsorsPerSlide) {
    sponsorSlides.push(allSponsors.slice(i, i + sponsorsPerSlide));
  }

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
useEffect(() => {
  if (!emblaApi) return;

  
  const interval = setInterval(() => {
    emblaApi.scrollNext();
  }, 3000);

  const handleSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

  handleSelect(); // initial setup
  setScrollSnaps(emblaApi.scrollSnapList());

  emblaApi.on("select", handleSelect);
  emblaApi.on("reInit", handleSelect);

  return () => {
    clearInterval(interval);
    emblaApi.off("select", handleSelect);
    emblaApi.off("reInit", handleSelect);
  };
}, [emblaApi]);

return (
  <div className="min-h-screen bg-[#E8E8E8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-[1440px]">
      
      <div className="text-center mb-12">
        <div className="text-[24px] font-bold uppercase mb-2" style={{ fontFamily: "'Istok Web', -apple-system, Roboto, Helvetica, sans-serif", WebkitTextStroke: "1px #707070", color: "transparent" }}>
          Event Sponsors
        </div>
        <h1 className="text-[36px] font-bold uppercase text-black mb-4" style={{ fontFamily: "'Istok Web', -apple-system, Roboto, Helvetica, sans-serif" }}>
          Supporting Every Step
        </h1>
        <p className="text-[16px] text-[#3A3A3A] max-w-[851px] mx-auto" style={{ fontFamily: "'Istok Web', -apple-system, Roboto, Helvetica, sans-serif" }}>
          This year's fest is shaped and strengthened by the support of our sponsors.
        </p>
      </div>

      
      <div className="relative max-w-[900px] mx-auto ">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {sponsorSlides.map((slideSponsors, slideIndex) => (
              <div key={slideIndex} className="flex-[0_0_100%] min-w-0">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 px-2">

                  {slideSponsors.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      className="w-full aspect-[213/100] rounded-lg overflow-hidden m-1 "
                      // p-2 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.82)", backdropFilter: "blur(3px)" }}
                    >
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.altText}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

       
        <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center hover:bg-black transition-colors" aria-label="Previous slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center hover:bg-black transition-colors" aria-label="Next slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex ? "bg-black w-8" : "bg-black/30 hover:bg-black/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)};
