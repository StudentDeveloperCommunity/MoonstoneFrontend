import { memo, useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

const DeveloperCard = memo(({ dev }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [currentDevId, setCurrentDevId] = useState(null);

  // Ultra-fast image loading with immediate display
  useEffect(() => {
    // Reset state when dev changes
    setImageLoaded(false);
    setImageError(false);
    setImageSrc(null);
    
    const devId = dev?.id;
    if (!devId || devId !== currentDevId) {
      setCurrentDevId(devId);
    }

    if (!dev?.image) {
      setImageLoaded(true);
      setImageError(true);
      return;
    }

    // Set image source immediately for instant display
    setImageSrc(dev.image);
    
    const img = new Image();
    
    // Ultra-fast timeout - fail quickly to show fallback
    const timeoutId = setTimeout(() => {
      img.src = ''; // Cancel loading
      if (devId === currentDevId) {
        setImageError(true);
        setImageLoaded(true);
      }
    }, 1200); // 1.2s timeout - fail fast
    
    img.onload = () => {
      clearTimeout(timeoutId);
      // Only update if this is still current dev
      if (devId === currentDevId) {
        setImageSrc(dev.image);
        setImageLoaded(true);
      }
    };
    
    img.onerror = () => {
      clearTimeout(timeoutId);
      // Only update if this is still current dev
      if (devId === currentDevId) {
        setImageError(true);
        setImageLoaded(true);
      }
    };
    
    // Start loading the image immediately
    img.src = dev.image;
    
    return () => {
      clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
    };
  }, [dev?.image, dev?.id, currentDevId]);

  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-6
                         transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(100,180,255,0.4)] border border-transparent hover:border-blue-400/50 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 min-h-[200px]">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gray-300 shrink-0 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        {imageSrc && !imageError && (
          <img
            src={imageSrc}
            alt={dev.name}
            className="w-full h-full object-cover object-top transition-opacity duration-200"
            style={{ opacity: imageLoaded ? 1 : 0 }}
            loading="eager" // Load immediately for better UX
            decoding="async" // Async decoding for performance
          />
        )}
        {imageError && (
          <span className="text-3xl font-bold text-gray-500 select-none">
            {dev.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 w-full">
        <h3 className="text-black font-bold text-base sm:text-lg leading-tight truncate">
          {dev.name}
        </h3>
        <span className="inline-block mt-1.5 sm:mt-2 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">
          {dev.role}
        </span>

        <div className="mt-2 sm:mt-3 text-gray-600 text-xs sm:text-sm space-y-1">
          <p className="text-xs text-gray-500 mb-1 truncate">
            {dev.department}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1 hover:text-blue-600 transition-colors cursor-pointer break-all">
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="text-xs break-all">{dev.email}</span>
          </div>
          {dev.linkedin && (
            <div className="flex items-center justify-center sm:justify-start mt-1">
              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 text-xs font-semibold hover:underline flex items-center gap-1 break-all"
              >
                <FaLinkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                LinkedIn
              </a>
            </div>
          )}
          <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1 hover:text-blue-600 transition-colors cursor-pointer truncate">
            <span className="text-xs truncate">
              {dev.phone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

DeveloperCard.displayName = 'DeveloperCard';

export default DeveloperCard;
