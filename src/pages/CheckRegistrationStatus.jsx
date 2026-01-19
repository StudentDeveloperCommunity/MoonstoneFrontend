import { useState } from "react";
import "@fontsource/istok-web";
import GetRegistrationStatus from "../api-files/RegisertAPIs/GetRegistartionStatus";
import WebsiteLoader from "../Loader/WebsiteLoader";
import { API_URL } from "../NwConfig";

export default function CheckRegistrationStatus() {
   const [Search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [notfound, setnotfound] = useState(false);
//   const [data, setData] = useState({});
    const [result,setresult]=useState({})
  
  async function findreg() {
    setLoading(true);
    const form = { id: Search };
    const res = await GetRegistrationStatus(form);
    // console.log(res)
    if (res?.success) {
      setresult(res?.data?.[0]);
      setnotfound(false)
    } else {
      setresult({});
      setnotfound(true)
    }
    setLoading(false);
  }

  function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
}

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "declined":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center"
      style={{ fontFamily: "'Istok Web', sans-serif" }}
    >
        {
            loading && <WebsiteLoader/>
        }
      {/* Header */}
      <div className="w-full bg-black text-white py-10 text-start px-10 md:px-24">
        <h1
          className="text-3xl md:text-5xl mt-24 font-bold tracking-wide"
          style={{ fontFamily: "'Istok Web', sans-serif" }}
        >
          MOONSTONE 2026
        </h1>
        <p
          className="text-white mt-2 text-sm md:text-2xl font-semibold md:font-bold"
          style={{ fontFamily: "'Istok Web', sans-serif" }}
        >
          ENTER YOUR REGISTRATION NUMBER BELOW TO CHECK THE STATUS OF YOUR
          REQUEST.
        </p>
      </div>

      {/* Search Card */}
      <div className="w-full max-w-4xl mx-auto mt-10 px-4">
        <div
          className="bg-white rounded-lg p-8"
          style={{
            fontFamily: "'Istok Web', sans-serif",
            boxShadow: "6px 4px 26px 0px #00BC7059",
          }}
        >
          <h2
            className="text-2xl font-semibold text-center mb-6"
            style={{ fontFamily: "'Istok Web', sans-serif" }}
          >
            Check Registration Status
          </h2>

          <input
            type="text"
            placeholder="Enter valid Registration Number"
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[#717182] h-1px rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 mb-4 text-[#717182] text-[16px]"
            style={{ fontFamily: "'Istok Web', sans-serif" }}
          />

          <button
            onClick={findreg}
            className="w-full bg-[#00BC71] hover:bg-emerald-500 text-white  font-medium py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
            style={{ fontFamily: "'Istok Web', sans-serif" }}
          >
            Check Status →
          </button>

        </div>
        <p
          style={{
            fontFamily: "Arial",
            fontWeight: "400",
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "16px",
            letterSpacing: "0px",
            textAlign: "center",
            marginTop: "20px",
            color: "#62748E",
          }}
        >
          Make sure that the registration status is approved, anything other
          than that will be considered invalid. If you have any query regarding
          your registration please contact the respective event coordinator.
        </p>

        <div className="text-center mt-3">
          <a
            href="https://www.moonstone.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#62748E] font-medium text-md transition-colors"
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

      {/* Example Card - Show when no result found or as placeholder */}
      {notfound && (
  <div className="w-full max-w-2xl mx-auto mt-10 px-4 py-10">
    <div
      className="bg-white rounded-lg p-8 flex flex-col items-center text-center"
      style={{
        border: "2px dashed #999",
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
      <h2 className="text-2xl text-black mb-2">
        No Registration Found
      </h2>

      <p className="text-sm text-[#717182] mb-4">
        We couldn’t find any event registration with the provided
        <span className="font-medium text-black"> Registration ID</span>.
      </p>

      <p className="text-sm text-[#717182]">
        Please check the ID and try again.
      </p>
    </div>
  </div>
)}


      {/* Result Card */}
      {(result && Object.keys(result).length>=1) && (
        <div className="w-full max-w-4xl mb-5 mx-auto mt-10 px-4">
          <div 
            className="bg-white rounded-lg p-6 flex flex-col md:flex-row gap-6"
            style={{
              border: "2px solid #999",
              fontFamily: "'Istok Web', sans-serif",
            }}
          >
            {/* Image Section */}
            <div className="flex-shrink-0">
              <img
                src={`${API_URL}/${result?.eventID?.image}`}
                alt="event"
                className="w-full md:w-56 h-56 object-cover rounded-lg"
              />
            </div>

            {/* Details Section */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Istok Web', sans-serif" }}>
                {result?.eventID?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: "'Istok Web', sans-serif" }}>
                {formatDate(result?.eventID?.date)} | {result?.eventID?.event_at}
              </p>

              <p className="text-sm text-gray-700 mb-2" style={{ fontFamily: "'Istok Web', sans-serif" }}>
                <span className="font-semibold">Event Coordinator Contact:</span>
              </p>
              <p className="text-sm font-semibold text-gray-900 mb-4" style={{ fontFamily: "'Istok Web', sans-serif" }}>
                {result?.eventID?.convener}, {result?.eventID?.convener_number}
              </p>

              <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "'Istok Web', sans-serif" }}>
                Registration Status
              </p>
              <div>
                <span
                className={`px-3 py-1 text-sm capitalize font-semibold rounded-full border ${getStatusBadge(
                  result?.approved
                )}`}
              >
                {result?.approved}
              </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
