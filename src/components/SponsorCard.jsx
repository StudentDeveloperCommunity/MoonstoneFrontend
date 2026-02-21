import { memo, useState, useEffect } from "react";

const SponsorCard = memo(({ sponsor }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [currentSponsorId, setCurrentSponsorId] = useState(null);

  // Ultra-fast image loading with immediate display
  useEffect(() => {
    // Reset state when sponsor changes
    setImageLoaded(false);
    setImageError(false);
    setImageSrc(null);
    
    const sponsorId = sponsor?._id || sponsor?.id;
    if (!sponsorId || sponsorId !== currentSponsorId) {
      setCurrentSponsorId(sponsorId);
    }

    if (!sponsor?.img) {
      setImageLoaded(true);
      setImageError(true);
      return;
    }

    // Set image source immediately for instant display
    setImageSrc(sponsor.img);
    setImageLoaded(true); // Mark as loaded immediately
    
    // Preload in background for smooth experience
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Only update if this is still current sponsor
      if (sponsorId === currentSponsorId) {
        setImageError(true);
        setImageLoaded(true);
      }
    };
    
    // Start loading image immediately
    img.src = sponsor.img;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [sponsor?.img, sponsor?._id, sponsor?.id, currentSponsorId]);

  return (
    <a
      href={sponsor.link || "#"}
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
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        )}
        {imageSrc && !imageError && (
          <img
            src={imageSrc}
            alt={sponsor.alt}
            className="
              w-full h-full 
              object-contain 
              filter drop-shadow-lg
              group-hover:scale-110 transition-transform duration-300
            "
            style={{ opacity: imageLoaded ? 1 : 0 }}
            loading="eager"
            decoding="async"
            draggable="false"
          />
        )}
        {imageError && (
          <div className="w-full h-full rounded-2xl bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5a2 2 0 00-2-2v-5a2 2 0 00-2-2H5m14 0v-5a2 2 0 00-2-2H9m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6m14 0v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5m14 0a2 2 0 002-2v-5a2 2 0 00-2-2H9m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6m14 0v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5m14 0a2 2 0 002-2v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5" />
            </svg>
            <span className="text-sm font-medium">Logo</span>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Border highlight on hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
    </a>
  );
});

SponsorCard.displayName = 'SponsorCard';

export default SponsorCard;
