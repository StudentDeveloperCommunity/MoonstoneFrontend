import { useState, useEffect, useRef } from "react";

export default function About() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef(null);
  const videoRef = useRef(null);

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
      {
        threshold: 0.1,
        rootMargin: "300px",
      },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex items-center justify-center pt-4 sm:pt-6 md:pt-8 lg:pt-12 pb-4 sm:pb-6 md:pb-6 lg:pb-10 px-3 sm:px-4 md:px-6">
      <div className="w-full max-w-[1440px] mx-auto rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-t-[25px] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-3 sm:gap-4 md:gap-6 lg:gap-0 min-h-auto lg:min-h-[500px]">
          <div
            ref={containerRef}
            className="w-full sm:w-auto lg:w-[500px] flex-shrink-0 bg-black rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 flex items-center justify-center overflow-hidden relative mx-auto sm:mx-0 h-56 sm:h-64 md:h-80 lg:h-auto"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          >
            {!videoLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400 text-sm">Loading video...</p>
                </div>
              </div>
            )}

            {isInView && (
              <video
                ref={videoRef}
                className={`w-full h-full object-cover rounded-lg sm:ml-8 transition-opacity duration-500 ${
                  videoLoaded ? "opacity-100" : "opacity-0"
                }`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                disablePictureInPicture
                controlsList="nodownload noremoteplayback"
                onCanPlay={() => setVideoLoaded(true)}
                onError={() => setVideoLoaded(true)}
              >
                <source
                  src="https://res.cloudinary.com/desybsga6/video/upload/v1768937362/moonstonediary_ocotcz.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className="w-full lg:flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center text-center w-full max-w-2xl">
              <h2
                className="text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase mb-2 sm:mb-3 tracking-wide text-gray-300"
            style={{
              WebkitTextStroke: "0.2px white",
              fontFamily: "Istok Web, sans-serif",
            }}
              >
                About Moonstone
              </h2>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent"
              >
                It's Back
              </h1>

              <p
                className="className= text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                // style={{ fontFamily: "Istok Web, sans-serif" }}
              >
                The fest is an unbeatable combination of talent and teamwork,
                featuring nail-biting techno-management competitions, intense
                sports challenges, exciting club activities, and captivating
                cultural performances. The fest is an unbeatable combination of
                talent and teamwork, featuring nail-biting techno-management
                competitions, exciting sports challenges, exciting club
                activities, and captivating cultural performances. The fest is
                an unbeatable combination of talent and teamwork, featuring
                nail-biting techno-management competitions.
              </p>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
