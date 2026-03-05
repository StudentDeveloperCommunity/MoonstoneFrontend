import { useState, useEffect } from "react";

const HeroImage = memo(({ src, alt, className = "" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  // Ultra-fast image loading with immediate display
  useEffect(() => {
    // Reset state when src changes
    setImageLoaded(false);
    setImageError(false);
    setImageSrc(null);

    if (!src) {
      setImageLoaded(true);
      setImageError(true);
      return;
    }

    // Set image source immediately for instant display
    setImageSrc(src);
    setImageLoaded(true); // Mark as loaded immediately
    
    // Preload in background for smooth experience
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      setImageError(true);
      setImageLoaded(true);
    };
    
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      {imageSrc && !imageError && (
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: imageLoaded ? 1 : 0 }}
          loading="eager"
          decoding="async"
        />
      )}
      {imageError && (
        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
          <span className="text-white text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
});

HeroImage.displayName = 'HeroImage';

export default HeroImage;
