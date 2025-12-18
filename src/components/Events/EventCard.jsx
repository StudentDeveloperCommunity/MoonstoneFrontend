   export default function EventCard({ event, onClick }) {
    return (
      <div
        onClick={onClick}
        className="
          w-[368px] h-[500px] mx-auto
          bg-gray-800 border-2 border-white/60
          rounded-[25px] overflow-hidden
          cursor-pointer
          transform
          transition-all duration-500 ease-out
          hover:-translate-y-2 hover:shadow-2xl
          animate-fadeUp
        "
      >
        {/* ===============================
            Aadi | Image + Date Badge
           =============================== */}
        <div className="relative w-full h-[240px] overflow-hidden">
          <img
            src={event.img}
            alt={event.title}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              hover:scale-110
            "
          />
  
          {/* ===============================
              Aadi | Date Badge
             =============================== */}
          <div
            className="
              absolute top-4 left-4
              bg-white text-black
              rounded-xl px-3 py-2
              text-center shadow-md
            "
          >
            <p className="text-xs font-semibold leading-none">FEB</p>
            <p className="text-lg font-bold leading-none">12</p>
          </div>
        </div>
  
        {/* ===============================
            Aadi | Content
           =============================== */}
        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold">{event.title}</h2>
  
          <p className="text-sm opacity-80 line-clamp-3">
            {event.desc}
          </p>
  
          <span
            className="
              inline-block px-4 py-1 rounded-full
              bg-indigo-600 text-xs font-semibold
            "
          >
            {event.category.toUpperCase()}
          </span>
        </div>
      </div>
    );
  }
  