export default function EventsHero() {
  return (
    <section className="w-full flex justify-center px-4 mt-8">
      {/* ↓ banner height reduced */}
      <div className="relative max-w-[1152px] w-full min-h-[200px] overflow-hidden rounded-tl-[20px] rounded-tr-[60px] rounded-br-[20px] rounded-bl-[60px] bg-black">

        {/* 🌌 FULL TWINKLE BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() > 0.5 ? "1px" : "2px",
                height: Math.random() > 0.5 ? "1px" : "2px",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.35,
                animation: `twinkle ${2 + Math.random() * 3}s infinite alternate,
                            moveStar ${5 + Math.random() * 5}s linear infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* ✨ Soft light wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent" />

        {/* 🔮 Decorative glass circles (slightly smaller) */}
        <div
          className="absolute bottom-[-60px] right-[-60px] w-[260px] h-[260px] rounded-full blur-[26px] opacity-35"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.06) 65%, transparent 75%)",
          }}
        />

        <div
          className="absolute bottom-[-30px] right-[-30px] w-[180px] h-[180px] rounded-full blur-[30px] opacity-25"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.06) 65%, transparent 75%)",
          }}
        />

        {/* 📝 CONTENT (vertical padding reduced) */}
        <div className="relative z-10 h-full flex flex-col justify-center px-[55px] py-5 font-Istok text-white">
          <p className="inline-block w-fit px-3 py-1 text-[22px] font-bold uppercase border border-white">
            All Events
          </p>

          <h1 className="mt-3 text-[34px] font-bold uppercase leading-none max-w-[833px]">
            Explore Events Happening in Moonstone
          </h1>

          <p className="mt-3 max-w-[729px] text-[15px] font-normal text-white/70">
            Explore what’s happening, join what interests you, and be part of
            experiences that shape campus life.
          </p>
        </div>

        {/* 🎞️ Animations */}
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
          }

          @keyframes moveStar {
            0% { transform: translate(0, 0); }
            100% { transform: translate(60px, 60px); }
          }
        `}</style>
      </div>
    </section>
  );
}