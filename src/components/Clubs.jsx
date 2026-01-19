


// import React from "react";
// import { Link } from "react-router-dom";
// import eventImg1 from "../assets/events/TAN03734.webp";
// import eventImg2 from "../assets/events/TAN03286.webp";
// import eventImg3 from "../assets/events/199A2046.webp";

// export default function Index() {
//   const events = [
//     {
//       id: 1,
//       title: "Techno",
//       image: eventImg1,
//       // description: "Feel the drop, own the night Techno @ Moonstone is our annual college EDM fest with booming beats, lights, and nonstop energy.",
//       linkto:"/allevents?id=1"
//     },
//     {
//       id: 2,
//       title: "Sports",
//       image: eventImg2,
//       // description: "From friendly matches to epic moments  Sports @ Moonstone is where fun meets fitness every year.. ",
//       linkto:"/allevents?id=2"

//     },
//     {
//       id: 3,
//       title: "Cultural",
//       image: eventImg3,
//       // description: "Sing it, dance it, feel it  Cultural @ Moonstone is where campus shines with creativity every year..",
//       linkto:"/allevents?id=3"

//     },
//   ];

//   return (
    
//     <div id="events-section" className=" min-h-screen  flex items-center justify-center px-4 py-16">
//       <div className="w-full max-w-[1440px]">

//         {/* Header */}
//         <div className="text-center mb-2">
//           <h2
//             className="text-xl font-bold uppercase mb-4 tracking-wide text-gray-300"
//             style={{
//               WebkitTextStroke: "0.2px #707070",
//               color: "transparent",
//               fontFamily: "Istok Web, sans-serif",
//             }}
//           >
//             Explore events
//           </h2>

//           <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-2">
//             Discover What's Happening Next
//           </h1>

//           <p className="text-gray-400 max-w-2xl mb-2 mx-auto leading-relaxed">
//             Stay in the loop with the exciting moments unfolding around you.
//             From fresh experiences to major highlights, every event is crafted to spark curiosity and celebration. 
//             There’s always something new waiting just around the corner.
//           </p>
//         </div>

//         {/* Event Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
//           {events.map((event) => (
//             <Link
//               key={event.id}
//               to={event.linkto} 
//               className="relative group aspect-square overflow-hidden rounded-xl cursor-pointer"
//             >
//               {/* Event Image: blur and scale on hover */}
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="absolute inset-0 w-full h-full object-cover z-0 transition duration-500 group-hover:blur-sm group-hover:scale-105"
//               />

//               {/* Glass overlay (same as yours) */}
//               <div
//                 className="absolute -top-0 -right-0 w-12 h-12 rounded
//     bg-transparent border border-white/20
//     scale-100 group-hover:scale-[20]
//     transition-transform duration-500 ease-out
//     z-20 pointer-events-none"
//               />

              
//               {/* Original title disappears on hover */}
//               <div className="absolute bottom-8 left-8 z-20 transition-opacity duration-500 group-hover:opacity-0">
//                 <h3 className="text-white text-4xl font-bold tracking-wide">
//                   {event.title}
//                 </h3>
//               </div>

//               {/* New content appears on hover */}
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-4">
                
//                <div className="absolute bottom-8 left-8 z-20 transition-opacity duration-500 group-hover:opacity-0">
//   <h3 className="text-white text-4xl font-bold tracking-wide">
//     {event.title}
//   </h3>

//   {/* ✅ Explore More Button */}
//   <button
//     className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-full 
//     bg-white/20 text-white text-sm font-medium
//     backdrop-blur-md border border-white/30
//     hover:bg-white/30 transition duration-300"
//   >
//     Explore More
//   </button>
// </div>

                
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import eventImg1 from "../assets/events/TAN03734.webp";
import eventImg2 from "../assets/events/TAN03286.webp";
import eventImg3 from "../assets/events/199A2046.webp";

export default function Index() {
  const events = [
    {
      id: 1,
      title: "Techno",
      image: eventImg1,
      linkto: "/allevents?id=1",
    },
    {
      id: 2,
      title: "Sports",
      image: eventImg2,
      linkto: "/allevents?id=2",
    },
    {
      id: 3,
      title: "Cultural",
      image: eventImg3,
      linkto: "/allevents?id=3",
    },
  ];

  return (
    <div
      id="events-section"
      className="min-h-screen flex items-center justify-center px-4 py-16"
    >
      <div className="w-full max-w-[1440px]">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-xl font-bold uppercase mb-4 tracking-wide text-gray-300"
            style={{
              WebkitTextStroke: "0.2px #707070",
              color: "transparent",
              fontFamily: "Istok Web, sans-serif",
            }}
          >
            Explore events
          </h2>

          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-4">
            Discover What's Happening Next
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stay in the loop with the exciting moments unfolding around you.
            From fresh experiences to major highlights, every event is crafted
            to spark curiosity and celebration. There’s always something new
            waiting just around the corner.
          </p>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 place-items-center">
          {events.map((event) => (
            <Link
              key={event.id}
              to={event.linkto}
              className="relative group aspect-square w-full max-w-[420px] overflow-hidden rounded-xl cursor-pointer"
            >
              {/* Event Image */}
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover z-0 transition duration-500 group-hover:blur-[1px] group-hover:scale-[1.03]"
              />

              {/* ✅ Dark overlay (for readability of button on any image) */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition duration-500 z-10" />

              {/* ✅ Glass overlay effect */}
              <div
                className="absolute top-0 right-0 w-12 h-12 rounded-lg
                bg-white/10 border border-white/25
                scale-100 group-hover:scale-[4]
                opacity-0 group-hover:opacity-100
                blur-[1px]
                transition-all duration-400 ease-out
                z-20 pointer-events-none"
              />

              {/* ✅ Title (visible normally, disappears on hover) */}
              <div className="absolute bottom-8 left-8 z-30 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-white text-4xl font-bold tracking-wide">
                  {event.title}
                </h3>
              </div>

              {/* ✅ Explore More (appears in center on hover) */}
              <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span
                  className="inline-flex items-center justify-center px-6 py-2 rounded-full
                  bg-white/20 text-white text-sm md:text-base font-medium
                  backdrop-blur-md border border-white/30
                  hover:bg-white/30 transition duration-300"
                >
                  Explore More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
