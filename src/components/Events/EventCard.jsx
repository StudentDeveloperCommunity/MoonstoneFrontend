import img from "../../assets/eventsindetails/Frame.svg"
import { API_URL } from "../../NwConfig";
import { useNavigate } from "react-router-dom";
export default function EventCard({ event }) {
  const navigate=useNavigate()
  const redirecttoregister=(event)=>{
    navigate("/eventsindetails",{state:{event:event}})
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function formatDate(dateString) {
  if (!dateString) return "";
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
      onClick={()=>redirecttoregister(event)}
      className="
        relative w-[368px] h-[500px]
        rounded-[25px] overflow-hidden
        border-2 border-white/60
        cursor-pointer
        transition-transform duration-300
        hover:-translate-y-1
      "
    >
      {/* Image */}
      <img
        src={`${API_URL}/${event.image}`}
        alt={event.title}
        className="w-full h-full object-cover"
      />

      {/* Date */}
      <div className="absolute top-4 right-4 bg-white text-black rounded-md px-2 py-1 text-[11px] text-center z-10">
        <div>{formatDate(event?.eventDate)}</div>
        <div className="text-[9px] tracking-wider">{formatMonth(event?.eventDate)}</div>
      </div>

      {/* Bottom GLASS BLUR (soft & smooth) */}
      <div
        className="absolute bottom-0 left-0 w-full h-[170px]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
        }}
      />

      {/* Content */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <h2 className="text-white font-bold text-[28px] leading-[32px] uppercase mb-4">
          
            <span  className="block">
              {event.title.substring(0,18)}...
            </span>
        </h2>

        <button
          className="w-full h-[40px] rounded-[8px] text-sm text-white"
          style={{
            background: "linear-gradient(90deg, #042790 0%, #A2162E 100%)",
          }}
                onClick={()=>redirecttoregister(event)}

        >
          Register Now
        </button>
      </div>
    </div>
  );
}
