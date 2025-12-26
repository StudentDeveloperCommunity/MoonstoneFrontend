import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/moonstone-logo.png";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);

 return (
  <>
    {/* NAVBAR */}
    <nav className="fixed top-3 inset-x-0 z-50 flex justify-center text-white">
      <div className="relative w-full max-w-6xl px-3 sm:px-4">
        
        {/* Glass boundary */}
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

        {/* Stars background */}
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

        {/* Content */}
        <div className="relative flex items-center justify-between px-3 sm:px-4 py-3">
          
          {/* Logo */}
          <Link to="/" className="font-bold tracking-tight shrink-0">
            <div className="flex flex-col leading-tight text-sm sm:text-base">
             <img src={logo} alt="Moonstone Logo" className="w-28 sm:w-32 h-auto" />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link className="nav-link" to="/">Home</Link>

            <div className="relative group">
              <button 
          onClick={()=>window.location.href="/allevents?id:all"}
               className="nav-link flex items-center gap-1">
                Events <span className="text-xs"></span>
              </button>

</div>

            <Link className="nav-link" to="/about">About</Link> 

            <Link
                className="px-4 py-2 bg-[#00BC71] hover:bg-emerald-500 rounded-lg font-medium transition-all duration-300 text-sm"
                to="/check-registration"
              >
                Check Registration
              </Link>
            
          </div>
{/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
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
          onClick={()=>window.location.href="/allevents?id:all"}
          className="mobile-item flex pb-1 justify-between w-full"
        >
          Events 
        </button>

       

        <Link className="mobile-item" to="/about">About</Link> <br /><br />

        <Link
            className="px-1 py-1 mobile-item  bg-emerald-600 hover:bg-emerald-700 text-center rounded-lg font-medium transition-all"
            to="/check-registration"
          >
            Check Registration
          </Link>
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
