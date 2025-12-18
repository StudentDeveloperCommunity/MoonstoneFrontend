export default function EventsHero() {
  return (
    <section className="w-full flex justify-center px-4 mt-10">
      <div
        className="
          max-w-[1152px] w-full h-[196px]
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-[0_8px_32px_rgba(31,38,135,0.37)]
          rounded-tl-[20px] rounded-tr-[60px]
          rounded-br-[20px] rounded-bl-[60px]
          flex flex-col justify-center
          px-6 sm:px-10
          text-white
          relative
          overflow-hidden
        "
      >
        <p className="text-sm tracking-widest opacity-80 uppercase">
          All Events
        </p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
          Explore Events Happening in Moonstone
        </h1>

        <p className="text-sm md:text-base opacity-80 mt-2 max-w-[700px]">
          Explore what’s happening, join what interests you, and be part of
          experiences that shape campus life.
        </p>

        {/* subtle glass glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
