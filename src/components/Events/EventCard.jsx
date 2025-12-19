export default function EventCard({ event, onClick }) {
  return (
    <div
      onClick={onClick}
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
        src="src/assets/events/event-12.png"
        alt={event.title}
        className="w-full h-full object-cover"
      />

      {/* Date */}
      <div className="absolute top-4 right-4 bg-white text-black rounded-md px-2 py-1 text-[11px] text-center z-10">
        <div>12</div>
        <div className="text-[9px] tracking-wider">FEB</div>
      </div>

      {/* Bottom GLASS BLUR (soft & smooth) */}
      <div
        className="absolute bottom-0 left-0 w-full h-[170px]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      />

      {/* Content */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <h2 className="text-white font-bold text-[28px] leading-[32px] uppercase mb-4">
          {event.title.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h2>

        <button
          className="w-full h-[40px] rounded-[8px] text-sm text-white"
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
