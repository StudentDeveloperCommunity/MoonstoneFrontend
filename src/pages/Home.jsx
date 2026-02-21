import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Countdown } from "../components/Countdown";
import Events from "../components/Events";
import Clubs from "../components/Clubs";
import VideoCarousel from "../components/VideoCarousel";
import Faq from "../components/Faq";
import Sponsors from "../components/Sponsors";
import { Download, Calendar, X } from "lucide-react";
import axios from "axios";
import { API_URL, getevents } from "../NwConfig";
import EliteSponsors from "../components/EliteSponsors";
import { getCachedVideo } from "../utils/videoPreloader";

export default function Index() {
  const [countdownStart] = useState(
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  );

  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moonVideoPreloaded, setMoonVideoPreloaded] = useState(true);
  const [visibleSections, setVisibleSections] = useState(new Set(['hero']));
  
  // Refs for intersection observer
  const observerRef = useRef(null);
  const sectionRefs = useRef({});

  // Preload moon video and image for instant display
  useEffect(() => {
    const moonVideoSrc = "https://ik.imagekit.io/wciaxyg0zo/videos/moon.mp4?updatedAt=1771160801609";
    const moonImageSrc = "https://ik.imagekit.io/wciaxyg0zo/moon.png?updatedAt=1771160801609";
    
    // Preload both video and image
    const preloadAssets = async () => {
      const videoPromises = [];
      
      // Preload video
      const videoPromise = new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.src = moonVideoSrc;
        
        video.oncanplay = () => {
          resolve(video);
        };
        
        video.onerror = () => {
          reject(new Error('Video preload failed'));
        };
        
        video.load();
      });
      videoPromises.push(videoPromise);
      
      // Preload image
      const imagePromise = new Promise((resolve, reject) => {
        const img = new Image();
        img.src = moonImageSrc;
        
        img.onload = () => {
          resolve(img);
        };
        
        img.onerror = () => {
          reject(new Error('Image preload failed'));
        };
        
        img.src = moonImageSrc;
      });
      imagePromise.push(imagePromise);
      
      // Wait for both to complete
      try {
        const [video, image] = await Promise.all(videoPromises);
        setMoonVideoPreloaded(true);
        setMoonImagePreloaded(true);
        console.log('Moon assets preloaded successfully');
      } catch (error) {
        console.warn('Failed to preload moon assets:', error);
        // Still set to true to avoid blue glare
        setMoonVideoPreloaded(true);
        setMoonImagePreloaded(true);
      }
    };

    // Call the preload function
    preloadAssets();
  }, []);

  // Intersection Observer for lazy loading sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, sectionId]));
          }
        });
      },
      {
        root: null,
        rootMargin: '100px', // Start loading 100px before visible
        threshold: 0.1
      }
    );

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Register sections for observation
  const registerSection = useCallback((sectionId) => {
    return (el) => {
      if (el && !sectionRefs.current[sectionId]) {
        sectionRefs.current[sectionId] = el;
        observerRef.current?.observe(el);
      }
    };
  }, []);

  // Hide the right-side scrollbar on Home page only (html + body)
  useEffect(() => {
    document.body.classList.add("scrollbar-none");
    document.documentElement.classList.add("scrollbar-none");
    return () => {
      document.body.classList.remove("scrollbar-none");
      document.documentElement.classList.remove("scrollbar-none");
    };
  }, []);

  // Fetch all events for timeline download
  const fetchAllEvents = async () => {
    console.log("Fetching all events...");
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}${getevents}`,
        { role: "admin", page: 1, limit: 100 },
        { withCredentials: true },
      );
      console.log("API response:", response.data);
      if (response.data?.success) {
        const events = response.data.events || [];
        console.log("Events fetched successfully:", events);
        setEventsData(events);
      } else {
        console.log("API response unsuccessful:", response.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Download functions
  const downloadPDF = () => {
    console.log("Download PDF clicked");

    try {
      // Create download link for actual PDF file from frontend public folder
      const link = document.createElement("a");
      link.href =
        "/assets/EventsTimeline/Moonstone 2k26 Events Timeline-Updated.pdf";
      link.download = "Moonstone 2k26 Events Timeline-Updated.pdf";
      link.style.display = "none";
      // Force download behavior
      link.setAttribute(
        "download",
        "Moonstone 2k26 Events Timeline-Updated.pdf",
      );
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      document.body.appendChild(link);

      console.log("Triggering PDF download...", link.href);
      link.click();

      // Cleanup
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        console.log("PDF download completed");
      }, 100);
    } catch (error) {
      console.error("PDF download error:", error);
      alert("Failed to download PDF. Please check console for details.");
    }
  };

  const downloadCSV = () => {
    console.log("Download Excel clicked");

    try {
      // Create download link for actual Excel file from frontend public folder
      const link = document.createElement("a");
      link.href =
        "/assets/EventsTimeline/Moonstone 2k26 Events Timeline-Updated.xlsx";
      link.download = "Moonstone 2k26 Events Timeline-Updated.xlsx";
      link.style.display = "none";
      // Force download behavior
      link.setAttribute(
        "download",
        "Moonstone 2k26 Events Timeline-Updated.xlsx",
      );
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      document.body.appendChild(link);

      console.log("Triggering Excel download...", link.href);
      link.click();

      // Cleanup
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        console.log("Excel download completed");
      }, 100);
    } catch (error) {
      console.error("Excel download error:", error);
      alert("Failed to download Excel file. Please check console for details.");
    }
  };

  const handleTimelineClick = () => {
    // Auto-load sample data for testing
    const sampleData = [
      {
        title: "Moonstone Tech Fest",
        eventDate: "2024-01-15",
        eventType: "Technical",
        description:
          "Annual technical festival with coding competitions and workshops",
      },
      {
        title: "Cultural Night",
        eventDate: "2024-01-20",
        eventType: "Cultural",
        description: "Music, dance and drama performances by students",
      },
      {
        title: "Sports Meet",
        eventDate: "2024-01-25",
        eventType: "Sports",
        description: "Annual sports competition with various athletic events",
      },
      {
        title: "Hackathon",
        eventDate: "2024-02-01",
        eventType: "Technical",
        description: "24-hour coding challenge with exciting prizes",
      },
      {
        title: "Alumni Meet",
        eventDate: "2024-02-10",
        eventType: "Networking",
        description: "Connect with alumni and share experiences",
      },
    ];
    setEventsData(sampleData);
    console.log("Sample data auto-loaded:", sampleData);

    // Open modal after a small delay to ensure state is updated
    setTimeout(() => {
      setShowTimelineModal(true);
    }, 100);
  };

  const stars = useMemo(() => {
    const STAR_COUNT = 50; // Reduced from 150 for better performance

    return Array.from({ length: STAR_COUNT }).map((_, i) => {
      const size = Math.random() > 0.7 ? 2 : 1;
      const left = Math.random() * 98;
      const top = Math.random() * 100;

      const twinkleDuration = 0.8 + Math.random() * 1.8;
      const twinkleDelay = Math.random() * 2;

      const moveDuration = 10 + Math.random() * 18;
      const moveDelay = Math.random() * 3;

      const opacity = 0.2 + Math.random() * 0.8;

      return {
        id: i,
        size,
        left,
        top,
        twinkleDuration,
        twinkleDelay,
        moveDuration,
        moveDelay,
        opacity,
      };
    });
  }, []);

  return (
    <div className="relative w-full bg-black overflow-hidden">
      {/* ✅ background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white will-change-transform"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${Math.min(star.left, 98)}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              animation: `
                twinkleStrong ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite alternate,
                moveStar ${star.moveDuration}s linear ${star.moveDelay}s infinite alternate
              `,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full">
        {/* ✅ HERO SECTION */}
        <section className="relative w-full overflow-hidden">
          <div
            className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col items-center justify-start text-center 
                       px-3 sm:px-6 lg:px-10
                       pt-32 sm:pt-40 md:pt-28 lg:pt-32 xl:pt-36 2xl:pt-40
                       pb-0 m-0"
          >
            {/* ✅ Title */}
            <div className="flex flex-col items-center justify-center m-0 p-0 space-y-1 sm:space-y-2">
              <h1
                className="flex items-center justify-center text-white leading-none flex-nowrap gap-2 sm:gap-3 m-0 p-0"
                style={{
                  fontFamily: "Tac One",
                  fontWeight: 1000,
                  letterSpacing: "-0.10em",
                  fontSize: "clamp(56px, 10vw, 140px)",
                }}
              >
                <span>M</span>

                <div style={{ perspective: "1000px" }}>
                  <div className="rounded-full overflow-hidden w-[clamp(52px,9vw,110px)] h-[clamp(52px,9vw,110px)] m-0 p-0 relative ">
                    <video
                      src="https://ik.imagekit.io/wciaxyg0zo/videos/moon.mp4?updatedAt=1771160801609"
                      autoPlay
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      preload={moonVideoPreloaded ? "auto" : "metadata"}
                      className="w-full h-full object-cover"
                      style={{ 
                        willChange: 'transform',
                        transform: 'translateZ(0)',
                        opacity: moonVideoPreloaded ? 1 : 0.8,
                        transition: 'opacity 0.3s ease-in-out'
                      }}
                      onCanPlayThrough={(e) => {
                        e.target.style.opacity = '1';
                      }}
                      onLoadedData={(e) => {
                        // Video metadata loaded, set to fully opaque immediately
                        e.target.style.opacity = '1';
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: "Symbol",
                    fontWeight: 1000,
                    letterSpacing: "-0.10em",
                    fontSize: "clamp(52px, 9vw, 110px)",
                  }}
                >
                  O
                </span>

                <span
                  style={{
                    fontFamily: "Tac One",
                    fontWeight: 1000,
                    letterSpacing: "-0.10em",
                    fontSize: "clamp(52px, 9vw, 120px)",
                  }}
                >
                  N
                </span>
              </h1>

              <h2
                className="text-white drop-shadow-lg m-0 p-0"
                style={{
                  fontFamily: "Squada One",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(30px, 7vw, 90px)",
                }}
              >
                STONE ' 26
              </h2>
            </div>

            {/* ✅ Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 sm:mt-3 md:mt-4 mb-3 sm:mb-4 md:mb-5 m-0 p-0">
              <button
                onClick={() => {
                  // Scroll to Explore Events (Discover What's Happening Next)
                  const target = document.querySelector("#events-section");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full text-white text-base font-medium
                         transition-all duration-300 hover:scale-105 active:scale-95
                         bg-gradient-to-r from-purple-600 to-blue-600 backdrop-blur-sm
                         border border-white/10 hover:border-white/20"
                style={{
                  fontFamily: "'Spline Sans', sans-serif",
                  background: "rgba(255, 255, 255, 0.20)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(90deg, #8B3A8B 0%, #5A4A9F 100%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.20)";
                }}
              >
                Explore Events
              </button>

              {/* ✅ EVENTS TIMELINE TOGGLE */}
              <button
                onClick={handleTimelineClick}
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full text-white text-base font-medium
                         transition-all duration-300 hover:scale-105 active:scale-95
                         bg-gradient-to-r from-purple-600/20 to-blue-600/20 
                         backdrop-blur-sm border border-white/10 hover:border-white/20"
                style={{
                  fontFamily: "'Spline Sans', sans-serif",
                }}
              >
                <Calendar className="w-5 h-5 text-purple-300 group-hover:text-purple-200 transition-colors" />
                <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                  See All Events Timeline
                </span>
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </div>

            {/* ✅ COUNTDOWN + VIDEO CAROUSEL (NO GAP) */}
            <div className="w-full flex flex-col items-center justify-start m-0 p-0 gap-0">
              <div className="w-full flex justify-center m-0 p-0">
                <div className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[640px] m-0 p-0">
                  <Countdown startTime={countdownStart} />
                </div>
              </div>

              <div className="w-full m-0 p-0 -mt-[1px]">
                <VideoCarousel />
              </div>
            </div>

            <style>{`
              @keyframes twinkleStrong {
                0%   { opacity: 0.05; transform: scale3d(0.9, 0.9, 1) translateZ(0); }
                50%  { opacity: 1;    transform: scale3d(1.35, 1.35, 1) translateZ(0); }
                100% { opacity: 0.15; transform: scale3d(1, 1, 1) translateZ(0); }
              }

              @keyframes moveStar {
                0%   { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(80px, -60px, 0); }
              }

              @keyframes spin3D {
                from { transform: rotateY(0deg); }
                to   { transform: rotateY(360deg); }
              }
            `}</style>
          </div>
        </section>

        {/* ✅ TIMELINE MODAL */}
        {showTimelineModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowTimelineModal(false)}
            />
            <div
              className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full 
                        shadow-2xl transform transition-all duration-300 scale-100"
              style={{ zIndex: 10000 }}
            >
              <button
                onClick={() => setShowTimelineModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="flex flex-col items-center space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Download Events Timeline
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Choose your preferred format
                  </p>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-6 w-full">
                    <button
                      onClick={() => {
                        console.log("PDF button clicked!");
                        console.log("Current eventsData:", eventsData);
                        console.log("EventsData length:", eventsData.length);
                        downloadPDF();
                      }}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-4 
                               bg-gradient-to-r from-red-600 to-pink-600 
                               text-white rounded-xl font-medium
                               transition-all duration-300 hover:scale-105 active:scale-95
                               hover:shadow-lg hover:shadow-red-600/25"
                      style={{ pointerEvents: "auto", cursor: "pointer" }}
                    >
                      <Download className="w-5 h-5" />
                      <span>Download PDF</span>
                    </button>

                    <button
                      onClick={() => {
                        console.log("Excel button clicked!");
                        downloadCSV();
                      }}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-4 
                               bg-gradient-to-r from-green-600 to-emerald-600 
                               text-white rounded-xl font-medium
                               transition-all duration-300 hover:scale-105 active:scale-95
                               hover:shadow-lg hover:shadow-green-600/25"
                      style={{ pointerEvents: "auto", cursor: "pointer" }}
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Excel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="w-full flex flex-col m-0 p-0 space-y-2 sm:space-y-3 md:space-y-4">
          {/* Glimpses Of Events */}
          <div id="glimpses-section" className="w-full m-0 p-0">
            <Events />
          </div>

          {/* Clubs */}
          <div className="w-full m-0 p-0">
            <Clubs />
          </div>
          <section className="my-12">
            <EliteSponsors />
          </section>

          {/* Sponsors */}
          <section id="sponsors" className="w-full m-0 p-0">
            <Sponsors />
          </section>

          {/* FAQ */}
          <div className="w-full m-0 p-0">
            <Faq />
          </div>
        </div>
      </div>
    </div>
  );
}
