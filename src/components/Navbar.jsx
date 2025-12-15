import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);

 return (
  <>
    
    <nav className="fixed top-3 inset-x-0 z-50 flex justify-center text-white">
      <div className="relative w-full max-w-6xl px-3 sm:px-4">
        
        <div
          className="
            absolute inset-0
            rounded-xl
            bg-black/40 backdrop-blur-md
            border border-white/20
            shadow-lg
            overflow-hidden
          "
        />

        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/30 animate-pulse"
              style={{
                width: "2px",
                height: "2px",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        
        <div className="relative flex items-center justify-between px-3 sm:px-4 py-3">
          
          
          <Link to="/" className="font-bold tracking-tight shrink-0">
            <div className="flex flex-col leading-tight text-sm sm:text-base">
              <span className="text-emerald-400">Moon</span>
              <span className="text-emerald-400 text-xs sm:text-sm">
                Stone
              </span>
            </div>
          </Link>

          
          <div className="hidden md:flex items-center gap-6">
            <Link className="nav-link" to="/">Home</Link>

            <div className="relative group">
              <button className="nav-link flex items-center gap-1">
                Events <span className="text-xs"></span>
              </button>

            <div
  className="
    absolute left-2 top-8 -translate-x-1/4
    w-20
    flex flex-col items-center justify-center
    backdrop-blur-md
    rounded-xl
    opacity-0 scale-95
    group-hover:opacity-100 group-hover:scale-100
    transition
    p-2
  "
>
  <Link className="dropdown-item" to="/club?id=1">Techno</Link>
  <Link className="dropdown-item" to="/club?id=2">Sports</Link>
  <Link className="dropdown-item" to="/club?id=3">Cultural</Link>
</div>
</div>

            <Link className="nav-link" to="/about">About</Link>
          </div>

          
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-xl px-2"
          >
            ☰
          </button>
        </div>
      </div>
    </nav>

   
    {isMobileOpen && (
      <div
        className="
          fixed top-[4.5rem] inset-x-0
          mx-auto w-[92%] max-w-sm
          backdrop-blur-xl
          border border-white/20
          rounded-xl
          p-4
          z-40
          space-y-2
          text-white
        "
      >
        <Link className="mobile-item" to="/">Home</Link>

        <button
          onClick={() => setIsEventOpen(!isEventOpen)}
          className="mobile-item flex pb-1 justify-between w-full"
        >
          Events
        </button>

        {isEventOpen && (
           <div className="pl-4 flex flex-col space-y-1">
            <Link className="mobile-sub" to="/club?id=1">Techno</Link>
            <Link className="mobile-sub" to="/club?id=2">Sports</Link>
            <Link className="mobile-sub" to="/club?id=3">Cultural</Link>
          </div>
        )}

        <Link className="mobile-item" to="/about">About</Link>
      </div>
    )}

    
    <style>
      {`
        .nav-link {
          @apply text-sm font-medium relative;
        }
        .nav-link::after {
          content: '';
          @apply absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-400 transition-all;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .dropdown-item {
          @apply block px-4 py-2 text-sm hover:bg-white/10;
        }
        .mobile-item {
          @apply block py-3 px-2 rounded-lg hover:bg-white/10;
        }
        .mobile-sub {
          @apply block py-2 text-sm text-white/80;
        }
      `}
    </style>
  </>
)};
