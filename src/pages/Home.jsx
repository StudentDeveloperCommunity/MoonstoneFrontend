// import React, { useState } from "react";
// import { Countdown } from "../components/Countdown";
// import Events from "../components/Events";
// import Clubs from "../components/Clubs";
// import VideoCarousel from "../components/VideoCarousel";

// export default function Index() {
//   const [countdownStart, setCountdownStart] = useState(
//     new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
//   );

//   return (
//     <div className="min-h-screen w-full bg-black overflow-hidden relative">

//       {/* Stars Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         {Array.from({ length: 50 }).map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-white opacity-50"
//             style={{
//               width: Math.random() > 0.5 ? "1px" : "2px",
//               height: Math.random() > 0.5 ? "1px" : "2px",
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `twinkle ${2 + Math.random() * 3}s infinite`
//             }}
//           />
//         ))}
//       </div>

//       {/* CONTENT STARTING 1/4 FROM TOP */}
//       <div className="relative z-10 flex flex-col items-center text-center px-4" style={{ paddingTop: "25vh" }}>
        
//         {/* MAIN TITLE */}
//         <div className="flex flex-col items-center justify-center space-y-4">

//           <h1
//             className="flex items-center justify-center text-white leading-tight flex-wrap gap-3 md:gap-6"
//             style={{
//               fontFamily: "Tac One",
//               fontWeight: 1000,
//               letterSpacing: "-0.12em",
//               fontSize: "clamp(60px, 10vw, 110px)"
//             }}
//           >
//             <span>M</span>

//             <img
//               src="https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg"
//               alt="Moon"
//               className="rounded-full object-cover shadow-2xl grayscale"
//               style={{
//                 width: "clamp(80px, 15vw, 150px)",
//                 height: "clamp(80px, 15vw, 150px)",
//                 animation: "spinHorizontal 15s linear infinite"
//               }}
//             />

//             <span
//               style={{
//                 fontFamily: "Symbol",
//                 fontWeight: 900,
//                 letterSpacing: "-0.12em",
//                 fontSize: "clamp(60px, 10vw, 110px)"
//               }}
//             >
//               O
//             </span>

//             <span
//               style={{
//                 fontFamily: "Tac One",
//                 fontWeight: 1000,
//                 letterSpacing: "-0.12em",
//                 fontSize: "clamp(60px, 10vw, 110px)"
//               }}
//             >
//               N
//             </span>
//           </h1>

//           <h2
//             className="text-white"
//             style={{
//               fontFamily: "Squada One",
//               fontWeight: 900,
//               letterSpacing: "-0.02em",
//               fontSize: "clamp(50px, 8vw, 90px)"
//             }}
//           >
//             STONE ' 26
//           </h2>
//         </div>

//         {/* BUTTON */}
//         <button className="px-8 py-3 bg-[rgb(140_140_140_/_25%)] hover:bg-gray-600 text-white font-bold rounded-full transition-colors text-sm md:text-base">
//           Explore Events
//         </button>

//         {/* COUNTDOWN SCALED DOWN */}
//         <div className="pt-6 scale-90 md:scale-95 max-w-md">
//           <Countdown startTime={countdownStart} />
//         </div>
//          {/* Event Highlights */}
              

//                <VideoCarousel/>
//                 <Events/>
//               {/* Clubs Section */}
//               <Clubs/>
            
//       </div>

//       <style>{`
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.3; }
//           50% { opacity: 0.8; }
//         }

//         @keyframes spinHorizontal {
//           from { transform: rotateY(0deg); }
//           to { transform: rotateY(360deg); }
//         }
//       `}</style>

      
//     </div>
//   );
// }


import React, { useState } from "react";
import { Countdown } from "../components/Countdown";
import Events from "../components/Events";
import Clubs from "../components/Clubs";
import VideoCarousel from "../components/VideoCarousel";
import moonVideo from "../assets/herosection/moon.mp4";
import background from "../assets/herosection/hero1.jpg";
import Faq from "../components/Faq";
import Sponsors from "../components/Sponsors";


export default function Index() {
  const [countdownStart, setCountdownStart] = useState(
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="w-full">

      
      <div className="relative min-h-screen w-full overflow-hidden">

        
      <div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(${background})`,
    filter: "brightness(0.5) contrast(1.2)",
    zIndex: 0
  }}
/>

        
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
  {Array.from({ length: 180 }).map((_, i) => (
    <div
      key={i}
      className="absolute rounded-full bg-white"
      style={{
        width: Math.random() > 0.5 ? "2px" : "3px",
        height: Math.random() > 0.5 ? "2px" : "3px",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.6 + 0.4,
        boxShadow: "0 0 8px rgba(255,255,255,0.8)",
        animation: `twinkleContinuous ${
        0.4 + Math.random() * 0.6

        }s linear infinite`,
        animationDelay: `-${Math.random() * 1}s`
      }}
    />
  ))}
</div>


        {/* HERO CONTENT  */}
        <div className="relative z-10 flex flex-col items-center text-center px-4" style={{ paddingTop: "25vh" }}>
          
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1
              className="flex items-center justify-center text-white leading-tight flex-wrap gap-3 md:gap-6"
              style={{
                fontFamily: "Tac One",
                fontWeight: 1000,
                letterSpacing: "-0.12em",
                fontSize: "clamp(60px, 10vw, 110px)"
              }}
            >
              <span>M</span>
             {/* <img
  src="https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg"
  alt="Moon"
  className="rounded-full object-cover grayscale"
  style={{
    width: "clamp(80px, 15vw, 150px)",
    height: "clamp(80px, 15vw, 150px)",
    animation: "spinHorizontal 15s linear infinite"
  }}
/> */}
<div className="w-[clamp(70px,15vw,100px)] h-[clamp(70px,15vw,100px)] rounded-full overflow-hidden">
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



              <span style={{ fontFamily: "Symbol", fontWeight: 900, letterSpacing: "-0.12em", fontSize: "clamp(60px, 10vw, 110px)" }}>O</span>
              <span style={{ fontFamily: "Tac One", fontWeight: 1000, letterSpacing: "-0.12em", fontSize: "clamp(60px, 10vw, 110px)" }}>N</span>
            </h1>

            <h2
              className="text-white drop-shadow-lg"
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

          <button className="px-8 py-3 bg-[rgba(140,140,140,0.25)] hover:bg-[rgba(140,140,140,0.4)] text-white font-bold rounded-full transition-colors text-sm md:text-base mt-6">
            Explore Events
          </button>

          <div className="pt-6 scale-90 md:scale-95 max-w-md">
            <Countdown startTime={countdownStart} />
          </div>

        </div>

        <style>{`
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
