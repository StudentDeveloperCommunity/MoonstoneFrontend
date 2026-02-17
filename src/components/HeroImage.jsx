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
    
    const img = new Image();
    
    // Ultra-fast timeout - fail quickly to show fallback
    const timeoutId = setTimeout(() => {
      img.src = ''; // Cancel loading
      setImageError(true);
      setImageLoaded(true);
    }, 800); // 0.8s timeout - fail fast
    
    img.onload = () => {
      clearTimeout(timeoutId);
      setImageSrc(src);
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      clearTimeout(timeoutId);
      setImageError(true);
      setImageLoaded(true);
    };
    
    // Start loading image immediately
    img.src = src;
    
    return () => {
      clearTimeout(timeoutId);
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
