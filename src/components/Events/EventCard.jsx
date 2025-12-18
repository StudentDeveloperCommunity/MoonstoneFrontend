export default function EventCard({ event, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative w-[368px] h-[500px]
                 border-2 border-white/60
                 rounded-[25px]
                 overflow-hidden
                 cursor-pointer
                 transition-transform duration-300
                 hover:-translate-y-1"
    >
      <img
        src={event.img}
        alt={event.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-4 right-4 bg-white text-black rounded-md px-2 py-1 text-xs font-medium">
        12<br />FEB
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-[170px]
                   bg-[#000000B2]
                   backdrop-blur-[6px]
                   px-6 pb-5 pt-6
                   flex flex-col justify-between"
      >
        <h2 className="text-[32px] font-bold uppercase leading-[34px]">
          {event.title}
        </h2>

        <button
          className="w-full h-[40px]
                     rounded-lg
                     bg-gradient-to-r from-[#042790] to-[#A2162E]
                     text-white font-medium
                     transition-opacity duration-300
                     hover:opacity-90"
        >
          Register Now
        </button>
      </div>
    </div>
  );
}
