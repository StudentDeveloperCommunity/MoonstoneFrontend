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
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-[1440px] mx-auto rounded-t-[25px] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch min-h-[500px]">
          <div
            ref={containerRef}
            className="w-full lg:w-[500px] flex-shrink-0 bg-black rounded-r-[25px] lg:rounded-r-[25px] lg:rounded-l-none p-6 lg:p-4 flex items-center justify-center overflow-hidden relative"
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
                className={`w-full h-full object-cover rounded-lg ml-8 transition-opacity duration-500 ${
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

          <div className="flex-1 px-6 lg:px-12 py-8 lg:py-16 flex flex-col justify-center">
            <div className="flex flex-col items-center text-center">
              <h2
                className="text-xl font-bold uppercase mb-2 tracking-wide text-gray-300"
            style={{
              WebkitTextStroke: "0.2px white",
              fontFamily: "Istok Web, sans-serif",
            }}
              >
                About Moonstone
              </h2>

              <h1
                className="
    text-4xl md:text-5xl font-bold uppercase mb-4
    bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500
    bg-clip-text text-transparent
  "
                // style={{ fontFamily: "Istok Web, sans-serif" }}
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
