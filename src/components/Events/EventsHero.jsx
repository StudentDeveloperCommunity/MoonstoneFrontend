export default function EventsHero() {
  return (
    <section className="w-full flex justify-center px-4 mt-10">
      <div className="relative max-w-[1152px] w-full h-[196px] overflow-hidden rounded-tl-[20px] rounded-tr-[60px] rounded-br-[20px] rounded-bl-[60px]">

        {/* ultra-clear glass base */}
        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[22px]" />

        {/* soft light wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent" />

        {/* bottom-right glass circles */}
        <div className="absolute bottom-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full blur-[28px] opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.06) 65%, transparent 75%)",
          }}
        />

        <div className="absolute bottom-[-40px] right-[-40px] w-[220px] h-[220px] rounded-full blur-[32px] opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.06) 65%, transparent 75%)",
          }}
        />

        {/* content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 font-['Istok_Web'] text-white">
          <p className="text-[14px] font-bold tracking-widest uppercase opacity-80">
            All Events
          </p>

          <h1 className="mt-2 text-[22px] sm:text-[28px] md:text-[36px] font-bold uppercase leading-tight">
            Explore Events Happening in Moonstone
          </h1>

          <p className="mt-2 max-w-[729px] text-[14px] sm:text-[16px] text-white/80">
            Explore what’s happening, join what interests you, and be part of
            experiences that shape campus life.
          </p>
        </div>
      </div>
    </section>
  );
}
