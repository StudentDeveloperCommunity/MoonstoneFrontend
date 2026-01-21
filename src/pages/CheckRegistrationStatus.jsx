import { useState, useMemo } from "react";
import "@fontsource/istok-web";
import GetRegistrationStatus from "../api-files/RegisertAPIs/GetRegistartionStatus";
import WebsiteLoader from "../Loader/WebsiteLoader";
import { API_URL } from "../NwConfig";
import fallbackImg from "../assets/eventsindetails/Frame.svg";

export default function CheckRegistrationStatus() {
  // ⭐ Generate stars ONLY ONCE (so they don't change on re-render)
  const stars = useMemo(() => {
    const STAR_COUNT = 130;

    return Array.from({ length: STAR_COUNT }).map((_, i) => {
      const size = Math.random() > 0.7 ? 2 : 1;
      const left = Math.random() * 98;
      const top = Math.random() * 100;

      const twinkleDuration = 0.8 + Math.random() * 1.8;
      const twinkleDelay = Math.random() * 2;

      const moveDuration = 10 + Math.random() * 18;
      const moveDelay = Math.random() * 3;

      const opacity = 0.35 + Math.random() * 0.65;
      const glow = 6 + Math.random() * 10;

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
        glow,
      };
    });
  }, []);

   const [Search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("id"); // 'id' or 'email'
  const [loading, setLoading] = useState(false);
  const [notfound, setnotfound] = useState(false);
  const [results, setresults] = useState([])
  
  async function findreg() {
    setLoading(true);
    const form = searchType === "id" ? { id: Search } : { email: Search };
    const res = await GetRegistrationStatus(form);
    console.log("Registration Status Response:", res);
    if (res?.success) {
      console.log("Results data:", res?.data);
      setresults(res?.data);
      setnotfound(false)
    } else {
      setresults([]);
      setnotfound(true)
    }
    setLoading(false);
  }

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

function formatFullDate(dateString) {
  if (!dateString) return "Date not available";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      {/* ✅ Full-page animated stars background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${Math.min(star.left, 98)}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.glow}px rgba(255,255,255,0.9)`,
              animation: `
                twinkleStrong ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite alternate,
                moveStar ${star.moveDuration}s linear ${star.moveDelay}s infinite alternate
              `,
            }}
          />
        ))}
      </div>

      {/* ✅ Actual content above stars */}
  <div className="relative z-10 w-full flex mt-0 flex-col items-center justify-center pt-40 md:pt-48 pb-10">
        {
            loading && <WebsiteLoader/>
        }
        
        {/* Images removed: top logo and banner intentionally hidden on this page */}

        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Istok Web', sans-serif" }}
          >
            Check Registration Status
          </h1>
          <p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: "'Istok Web', sans-serif" }}
          >
            Choose your search method and enter your details to check the status of your event registration
          </p>
        </div>

        {/* Search Card */}
        <div className="w-full max-w-2xl mx-auto px-6">
          <div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            style={{
              fontFamily: "'Istok Web', sans-serif",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Search Type Selection */}
            <div className="flex gap-4 mb-8 justify-center">
              <button
                onClick={() => setSearchType("id")}
                className={"px-6 py-3 rounded-lg font-medium transition-all duration-300 " + (
                  searchType === "id"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                )}
                style={{ fontFamily: "'Istok Web', sans-serif" }}
              >
                Registration ID
              </button>
              <button
                onClick={() => setSearchType("email")}
                className={"px-6 py-3 rounded-lg font-medium transition-all duration-300 " + (
                  searchType === "email"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                )}
                style={{ fontFamily: "'Istok Web', sans-serif" }}
              >
                Email
              </button>
            </div>

            <input
              type={searchType === "email" ? "email" : "text"}
              placeholder={searchType === "id" ? "Enter valid Registration Number (e.g., 464493060360)" : "Enter your email address"}
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent mb-6 text-white placeholder-gray-400 text-[16px] backdrop-blur-sm"
              style={{ fontFamily: "'Istok Web', sans-serif" }}
            />

            <button
              onClick={findreg}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-purple-600/30"
              style={{ fontFamily: "'Istok Web', sans-serif" }}
            >
              Check Status →
            </button>
          </div>
          
          <p
            className="text-center text-gray-400 text-sm mt-6"
            style={{ fontFamily: "'Istok Web', sans-serif" }}
          >
            Make sure that the registration status is approved. If you have any query regarding
            your registration please contact the respective event coordinator.
          </p>

          <div className="text-center mt-6">
            <a
              href="https://www.medicaps.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 font-medium transition-colors hover:text-purple-300"
              style={{ fontFamily: "'Istok Web', sans-serif" }}
            >
              Visit Official Website
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* No Results Found */}
        {notfound && (
          <div className="w-full max-w-2xl mx-auto mt-12 px-6">
            <div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center border border-white/20"
              style={{
                fontFamily: "'Istok Web', sans-serif",
              }}
            >
              {/* Icon */}
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0 3h.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              {/* Text */}
              <h2 className="text-2xl font-bold text-white mb-3">
                No Registration Found
              </h2>

              <p className="text-gray-300 mb-4">
                We couldn't find any event registration with the provided
                <span className="font-medium text-white"> {searchType === "id" ? "Registration ID" : "email address"}</span>.
              </p>

              <p className="text-gray-400">
                Please check the {searchType === "id" ? "ID" : "email address"} and try again.
              </p>
            </div>
          </div>
        )}

        {/* Result Cards */}
        {results.length > 0 && (
          <div className="w-full max-w-6xl mx-auto mt-12 px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Istok Web', sans-serif" }}>
                {searchType === "id" ? "Registration Details" : `Found ${results.length} Registration(s)`}
              </h2>
              <p className="text-gray-300 text-lg" style={{ fontFamily: "'Istok Web', sans-serif" }}>
                {searchType === "id" 
                  ? "Your event registration details" 
                  : "All events registered with this email address"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
              {results.map((result, index) => {
                console.log(`Rendering result ${index}:`, result);
                return (
                <div
                  key={result._id || index}
                  className="
                    relative w-[300px] h-[400px]
                    rounded-[20px] overflow-hidden
                    border border-white/25
                    bg-[#1a1a1a]
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl
                  "
                >
                  {/* EVENT IMAGE */}
                  <img
                    src={
                      result?.eventID?.image
                        ? `${API_URL}/${result.eventID.image}`
                        : fallbackImg
                    }
                    onError={(e) => {
                      e.currentTarget.src = fallbackImg;
                    }}
                    alt={result?.eventID?.title || "Event"}
                    className="w-full h-full object-cover block"
                  />

                  {/* REGISTRATION STATUS BADGE */}
                  <div className="absolute top-3 left-3 z-20">
                    <div className={`
                      px-4 py-2 text-sm font-bold rounded-full border
                      ${getStatusBadge(result?.approved)}
                    `}>
                      {result?.approved?.toUpperCase()}
                    </div>
                  </div>

                  {/* BOTTOM GRADIENT */}
                  <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-t from-black/95 via-black/70 to-transparent z-10" />

                  {/* CONTENT - Only Event Title and Status */}
                  <div className="absolute bottom-3 left-3 right-3 z-20">
                    <h2 className="text-white font-bold text-[16px] leading-[20px] uppercase mb-2">
                      {result?.eventID?.title || "Event Title"}
                    </h2>

                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 text-xs font-medium">
                        {searchType === "id" ? "Your Registration" : `Registration ${index + 1}`}
                      </span>
                      <div className={`
                        px-2 py-1 text-xs font-medium rounded
                        ${result?.approved === 'approved' ? 'bg-green-500/20 text-green-400' : 
                          result?.approved === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-red-500/20 text-red-400'}
                      `}>
                        {result?.approved === 'approved' ? '✓ Approved' : 
                         result?.approved === 'pending' ? '⏳ Pending' : 
                         '✗ Rejected'}
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}