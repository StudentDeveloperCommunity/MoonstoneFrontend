import { API_URL } from "../../NwConfig";
import { useNavigate } from "react-router-dom";
import fallbackImg from "../../assets/eventsindetails/Frame.svg";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const redirecttoregister = () => {
    navigate("/eventsindetails", { state: { event } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <div
      onClick={redirecttoregister}
      className="
        relative w-[300px] h-[360px]
        rounded-[20px] overflow-hidden
        border border-white/25
        cursor-pointer
        bg-[#1a1a1a]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* ✅ IMAGE WITH FALLBACK */}
      <img
        src={
          event?.image
            ? `${API_URL}/${event.image}`
            : fallbackImg
        }
        onError={(e) => {
          e.currentTarget.src = fallbackImg;
        }}
        alt={event?.title || "Event"}
        className="w-full h-full object-cover block"
      />

      {/* DATE BADGE */}
      <div className="absolute top-3 right-3 z-20">
        <div className="w-[54px] h-[54px] bg-white rounded-[10px] flex flex-col items-center justify-center shadow">
          <span className="text-[20px] font-bold leading-none text-black">
            {formatDate(event?.eventDate)}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-black">
            {formatMonth(event?.eventDate)}
          </span>
        </div>
      </div>

      {/* BOTTOM GRADIENT */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />

      {/* CONTENT */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-2">
        <h2 className="text-white font-bold text-[18px] leading-[22px] uppercase">
          {event?.title || "Event Title"}
        </h2>

        <button
          onClick={(e) => {
            e.stopPropagation();
            redirecttoregister();
          }}
          className="w-full h-[40px] rounded-[7px] text-[13px] font-medium text-white"
          style={{
            background: "linear-gradient(90deg, #042790 0%, #A2162E 100%)",
          }}
        >
          Register Now
        </button>
      </div>
    </div>
  );
}