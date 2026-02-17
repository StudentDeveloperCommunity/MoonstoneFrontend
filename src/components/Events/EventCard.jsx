import { API_URL } from "../../NwConfig";
import { useNavigate } from "react-router-dom";
import { useState, memo, useEffect } from "react";
import fallbackImg from "../../assets/eventsindetails/Frame.svg";

const EventCard = memo(({ event }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [currentEventId, setCurrentEventId] = useState(null);

  // Ultra-fast image loading with immediate display
  useEffect(() => {
    // Reset state when event changes
    setImageLoaded(false);
    setImageError(false);
    setImageSrc(null);
    
    const eventId = event?._id || event?.id;
    if (!eventId || eventId !== currentEventId) {
      setCurrentEventId(eventId);
    }

    if (!event?.image) {
      setImageSrc(fallbackImg);
      setImageLoaded(true);
      return;
    }

    // Set image source immediately for instant display
    const fullUrl = `${API_URL}/${event.image}`;
    setImageSrc(fullUrl);
    
    const img = new Image();
    
    // Ultra-fast timeout - fail quickly to show fallback
    const timeoutId = setTimeout(() => {
      img.src = ''; // Cancel loading
      if (eventId === currentEventId) {
        setImageSrc(fallbackImg);
        setImageError(true);
        setImageLoaded(true);
      }
    }, 1500); // 1.5s timeout - fail fast
    
    img.onload = () => {
      clearTimeout(timeoutId);
      // Only update if this is still current event
      if (eventId === currentEventId) {
        setImageSrc(fullUrl);
        setImageLoaded(true);
      }
    };
    
    img.onerror = () => {
      clearTimeout(timeoutId);
      // Only update if this is still current event
      if (eventId === currentEventId) {
        setImageSrc(fallbackImg);
        setImageError(true);
        setImageLoaded(true);
      }
    };
    
    // Start loading the image immediately
    img.src = fullUrl;
    
    return () => {
      clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
    };
  }, [event?.image, event?._id, event?.id, currentEventId]);

  const redirecttoregister = () => {
    navigate("/eventsindetails", { state: { event } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function formatDate(dateString) {
    if (!dateString) return "--";
    return new Date(dateString).getDate();
  }

  function formatMonth(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("default", {
      month: "short",
    });
  }

  return (
    <div
      onClick={redirecttoregister}
      className="
        relative w-[300px] h-[360px]
        rounded-[20px] overflow-hidden
        border border-white/25
        cursor-pointer
        bg-[#1a1a1a]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* MOBILE-OPTIMIZED IMAGE WITH PRELOADING */}
      <div className="relative w-full h-full">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse">
            {/* Mobile-optimized loading indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={event?.title || "Event"}
            className={`w-full h-full object-cover block transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager" // Load immediately for better UX
            decoding="async" // Async decoding for performance
          />
        )}
      </div>

      {/* DATE BADGE */}
      <div className="absolute top-3 right-3 z-20">
        <div className="w-[54px] h-[54px] bg-white rounded-[10px] flex flex-col items-center justify-center shadow">
          <span className="text-[20px] font-bold leading-none text-black">
            {formatDate(event?.eventDate)}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-black">
            {formatMonth(event?.eventDate)}
          </span>
        </div>
      </div>

      {/* BOTTOM GRADIENT */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />

      {/* CONTENT */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-2">
        <h2 className="text-white font-bold text-[18px] leading-[22px] uppercase">
          {event?.title || "Event Title"}
        </h2>

        <button
          onClick={(e) => {
            e.stopPropagation();
            redirecttoregister();
          }}
          className="w-full h-[40px] rounded-[7px] text-[13px] font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #042790 0%, #A2162E 100%)",
          }}
        >
          Register Now
        </button>
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;