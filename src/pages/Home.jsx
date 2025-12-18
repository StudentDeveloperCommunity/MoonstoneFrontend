
import React, { useState } from "react";
import { Countdown } from "../components/Countdown";
import Events from "../components/Events";
import Clubs from "../components/Clubs";
import VideoCarousel from "../components/VideoCarousel";
import moonVideo from "../assets/herosection/moon.mp4";

import Faq from "../components/Faq";
import Sponsors from "../components/Sponsors";


export default function Index() {
  const [countdownStart, setCountdownStart] = useState(
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="w-full">
 <div className="relative min-h-screen w-full bg-black overflow-hidden">
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {Array.from({ length: 50 }).map((_, i) => (
    <div
      key={i}
      className="absolute rounded-full bg-white opacity-50"
      style={{
        width: Math.random() > 0.5 ? "1px" : "2px",
        height: Math.random() > 0.5 ? "1px" : "2px",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `twinkle ${2 + Math.random() * 3}s infinite alternate,
                    moveStar ${5 + Math.random() * 5}s linear infinite alternate`
      }}
    />
  ))}
</div>

        {/* HERO CONTENT  */}
        <div className="relative z-10 flex flex-col items-center text-center px-4" style={{ paddingTop: "20vh" }}>
          
          <div className="flex flex-col items-center justify-center space-y-0">

            <h1
              className="flex items-center justify-center text-white leading-none flex-nowrap gap-[0.15em]"

              style={{
                fontFamily: "Tac One",
                fontWeight: 1000,
                letterSpacing: "-0.12em",
                fontSize: "clamp(70px, 10vw, 110px)"
              }}
            >
              <span>M</span>
      
<div className="w-[clamp(60px,10vw,100px)] h-[clamp(60px,10vw,100px)] rounded-full overflow-hidden ">
  <video
    src={moonVideo}
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
    style={{
      animation: "spin3D 15s linear infinite",
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden"
    }}
  />
</div>



              <span style={{ fontFamily: "Symbol", fontWeight: 1000, letterSpacing: "-0.12em", fontSize: "clamp(70px, 10vw, 100px)" }}>O</span>
              <span style={{ fontFamily: "Tac One", fontWeight: 1000, letterSpacing: "-0.12em", fontSize: "clamp(70px, 10vw, 110px)" }}>N</span>
            </h1>

            <h2
              className="text-white mt-0.2 drop-shadow-lg"
              style={{
                fontFamily: "Squada One",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                fontSize: "clamp(50px, 8vw, 90px)"
              }}
            >
              STONE ' 26
            </h2>
          </div>
<div className="mb-8 md:mb-10">
  <button
    onClick={() => {
      document.getElementById("events-section")?.scrollIntoView({ behavior: "smooth" });
    }}
    className="inline-flex px-7 py-1.5 justify-center items-center gap-2.5 rounded-[25px] text-white text-[18px] md:text-[20px] font-normal transition-all duration-300 hover:scale-105 group"
    style={{
      background: 'rgba(255, 255, 255, 0.20)',
      backdropFilter: 'blur(2px)',
      fontFamily: "'Spline Sans', sans-serif",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'linear-gradient(90deg, #8B3A8B 0%, #5A4A9F 100%)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.20)';
    }}
  >
    Explore Events
  </button>
</div>

          <div className="pt-6 scale-90 md:scale-95 mt-3 max-w-md">
            <Countdown startTime={countdownStart} />
          </div>

        </div>

        <style>{`

        @keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

@keyframes moveStar {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100px, 100px); /* stars will move diagonally */
  }
}


          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }

          @keyframes spinHorizontal {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
        `}</style>
      </div>

      
      {/* ADDITIONAL SECTIONS */}
      <VideoCarousel />
      <Events />
      <Clubs />
      <Sponsors/>
      <Faq/>
      

    </div>
  );
}












// import React, { useState } from "react";
// import { Countdown } from "../components/Countdown";
// import Events from "../components/Events";
// import Clubs from "../components/Clubs";
// import VideoCarousel from "../components/VideoCarousel";
// import moonVideo from "../assets/herosection/moon.mp4";
// import Faq from "../components/Faq";
// import Sponsors from "../components/Sponsors";
// import Footer from "../components/Footer";

// export default function Home() {
//   const [countdownStart] = useState(
//     new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
//   );

//   return (
//     <div className="w-full relative">
//       {/* HERO SECTION */}
//       <div className="fixed inset-0 w-full h-full z-10 bg-black overflow-hidden">
//         <div className="relative z-10 flex flex-col items-center text-center px-4" style={{ paddingTop: "20vh" }}>
//           <div className="flex flex-col items-center justify-center space-y-0">

//             <h1
//               className="flex items-center justify-center text-white leading-none flex-nowrap gap-[0.15em]"
//               style={{
//                 fontFamily: "Tac One",
//                 fontWeight: 1000,
//                 letterSpacing: "-0.12em",
//                 fontSize: "clamp(70px, 10vw, 110px)"
//               }}
//             >
//               <span>M</span>
//               <div className="w-[clamp(60px,10vw,100px)] h-[clamp(60px,10vw,100px)] rounded-full overflow-hidden ">
//                 <video
//                   src={moonVideo}
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                   className="w-full h-full object-cover"
//                   style={{
//                     animation: "spin3D 15s linear infinite",
//                     transformStyle: "preserve-3d",
//                     backfaceVisibility: "hidden"
//                   }}
//                 />
//               </div>
//               <span style={{ fontFamily: "Symbol", fontWeight: 1000, letterSpacing: "-0.12em", fontSize: "clamp(70px, 10vw, 100px)" }}>O</span>
//               <span style={{ fontFamily: "Tac One", fontWeight: 1000, letterSpacing: "-0.12em", fontSize: "clamp(70px, 10vw, 110px)" }}>N</span>
//             </h1>

//             <h2
//               className="text-white mt-0.2 drop-shadow-lg"
//               style={{
//                 fontFamily: "Squada One",
//                 fontWeight: 900,
//                 letterSpacing: "-0.02em",
//                 fontSize: "clamp(50px, 8vw, 90px)"
//               }}
//             >
//               STONE ' 26
//             </h2>
//           </div>

//           <div className="mb-8 md:mb-10">
//             <button
//               onClick={() => {
//                 document.getElementById("events-section")?.scrollIntoView({ behavior: "smooth" });
//               }}
//               className="inline-flex px-7 py-1.5 justify-center items-center gap-2.5 rounded-[25px] text-white text-[18px] md:text-[20px] font-normal transition-all duration-300 hover:scale-105 group"
//               style={{
//                 background: 'rgba(255, 255, 255, 0.20)',
//                 backdropFilter: 'blur(2px)',
//                 fontFamily: "'Spline Sans', sans-serif",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = 'linear-gradient(90deg, #8B3A8B 0%, #5A4A9F 100%)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.20)';
//               }}
//             >
//               Explore Events
//             </button>
//           </div>

//           <div className="pt-6 scale-90 md:scale-95 mt-3 max-w-md">
//             <Countdown startTime={countdownStart} />
//           </div>

//         </div>

//         <style>{`
//           @keyframes twinkle {
//             0%, 100% { opacity: 0.3; }
//             50% { opacity: 0.8; }
//           }
//           @keyframes spinHorizontal {
//             from { transform: rotateY(0deg); }
//             to { transform: rotateY(360deg); }
//           }
//         `}</style>
//       </div>

//       {/* VIDEO CAROUSEL SCROLLING OVER HERO */}
//       <div className="relative z-20 mt-[100vh] -mt-32">
//         <VideoCarousel />
     

//       {/* OTHER SECTIONS */}
     
//         <Events />
      
//       <Clubs />
//       <Sponsors/>
//       <Faq/>
      
//     </div>
    
//      </div>
//   );
// }

