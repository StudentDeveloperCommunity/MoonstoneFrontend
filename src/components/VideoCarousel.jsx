import { useState, useEffect, useRef } from "react";

export default function About() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initialize Cloudinary player when in view
  useEffect(() => {
    if (isInView && !playerRef.current) {
      // Check if Cloudinary script is loaded
      if (typeof window.cloudinary !== 'undefined' && window.cloudinary.VideoPlayer) {
        try {
          const player = window.cloudinary.VideoPlayer('player', {
            cloud_name: 'dbzpt8fqa',
            publicId: 'moonstonediary_trm92b',
            autoplay: true,
            loop: true,
            muted: true,
            controls: false,
            fluid: true,
            transformation: [
              { quality: 'auto' },
              { fetch_format: 'auto' }
            ]
          });
          
          playerRef.current = player;
          
          player.on('ready', () => {
            console.log('Cloudinary player is ready');
            setVideoLoaded(true);
          });
        } catch (error) {
          console.error('Error initializing Cloudinary player:', error);
        }
      } else {
        console.error('Cloudinary VideoPlayer not loaded. Check script inclusion.');
        // Fallback: set as loaded to remove loading state
        setTimeout(() => setVideoLoaded(true), 2000);
      }
    }
  }, [isInView]);

  
  return (
    <div className="min-h-screen  flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-[1440px] mx-auto rounded-t-[25px] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch min-h-[500px]">
          <div
            ref={containerRef}
            className="w-full lg:w-[500px] flex-shrink-0 bg-black rounded-r-[25px] lg:rounded-r-[25px] lg:rounded-l-none p-6 lg:p-4 flex items-center justify-center overflow-hidden relative"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          >
            {/* Loading placeholder */}
            {!videoLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400 text-sm">Loading video...</p>
                </div>
              </div>
            )}

            {/* Cloudinary Video Player */}
            <div 
              id="player" 
              className={`w-full h-full rounded-lg ml-8 transition-opacity duration-500 ${
                videoLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ transform: 'translateZ(0)' }}
            />
            
            {/* Fallback video if Cloudinary player fails */}
            {videoLoaded && !playerRef.current && (
              <video
                className="w-full h-full object-cover rounded-lg ml-8"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              >
                <source 
                  src="https://res.cloudinary.com/dbzpt8fqa/video/upload/v1/moonstonediary_trm92b.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className="flex-1 px-6 lg:px-12 py-8 lg:py-16 flex flex-col justify-center">
            <div className="flex flex-col  items-center text-center">
              <h2
                className="text-lg md:text-xl lg:text-2xl font-bold uppercase mb-2 tracking-wide"
                style={{
                  WebkitTextStroke: "0.07px #707070",
                  color: "transparent",
                  fontFamily: "Istok Web, sans-serif",
                }}
              >
                About Moonstone
              </h2>

              <h3
                className="text-xl md:text-2xl lg:text-3xl font-bold text-white uppercase mb-6 lg:mb-8"
                style={{
                  fontFamily: "Istok Web, sans-serif",
                }}
              >
                It's Back
              </h3>

              <p
                className="text-white text-xl font-mono md:text-base lg:text-2xl leading-relaxed text-justify  mb-8"
                style={{
                  fontFamily: "Istok Web, sans-serif",
                }}
              >
                The fest is an unbeatable combination of talent and teamwork,
                featuring nail-biting techno-management competitions, intense
                sports challenges, exciting club activities, and captivating
                cultural performances. The fest is an unbeatable combination of
                talent and teamwork, featuring nail-biting techno-management
                competitions, intense sports challenges, exciting club
                activities, and captivating cultural performances. The fest is
                an unbeatable combination of talent and teamwork, featuring
                nail-biting techno-management competitions.
              </p>
            </div>
            <a
              href="#"
              className="text-gray-400 text-base md:text-sm lg:text-sm  hover:text-gray-300 transition-colors inline-flex items-center gap-1 self-end"
            >
              Know More 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
