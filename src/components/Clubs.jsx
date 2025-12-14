// import { ArrowRight } from "lucide-react";

// export default function Index() {
//   const events = [
//     {
//       id: 1,
//       title: "Techno",
//       image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
//     },
//     {
//       id: 2,
//       title: "Techno",
//       image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
//     },
//     {
//       id: 3,
//       title: "Techno",
//       image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16 md:py-20">
//       <div className="w-full max-w-[1440px]">
//         <div className="text-center mb-8 md:mb-12">
//           <h2 className="text-xl md:text-2xl font-bold uppercase mb-4 tracking-wide">
//             Explore events
//           </h2>
          
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase mb-6 md:mb-8 leading-tight px-4">
//             Discover What's Happening Next
//           </h1>
          
//           <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4 leading-relaxed">
//             Stay in the loop with the exciting moments unfolding around you.
//             <br className="hidden md:block" />
//             From fresh experiences to major highlights, every event is crafted to spark curiosity and celebration.
//             <br className="hidden md:block" />
//             There's always something new waiting just around the corner.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 md:px-8 max-w-full">
//           {events.map((event) => (
//             <div
//               key={event.id}
//               className="relative group w-full aspect-square rounded-lg overflow-hidden bg-white"
//             >
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/40" />

//               <button className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors p-2">
//                 <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
//               </button>

//               <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
//                 <h3 className="text-white text-4xl md:text-5xl font-bold tracking-wide">
//                   {event.title}
//                 </h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { ArrowRight } from "lucide-react";


export default function Index() {
  const events = [
    {
      id: 1,
      title: "Techno",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    },
    {
      id: 2,
      title: "Techno",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    },
    {
      id: 3,
      title: "Techno",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[1440px]">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-xl font-bold uppercase mb-4 tracking-wide text-gray-300">
            Explore events
          </h2>

          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6">
            Discover What's Happening Next
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stay in the loop with exciting moments unfolding around you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative group aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
              {/* Background image */}
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 z-10" />

              {/* 🔥 Hover expanding gradient (replacement for ::before) */}
             <div
  className="absolute -top-4 -right-4 w-8 h-8 rounded-full
  bg-white/10 backdrop-blur-xl border border-white/20
  scale-100 group-hover:scale-[28]
  transition-transform duration-500 ease-out
  z-10"
/>


              {/* Arrow */}
              <button className="absolute top-4 right-4 z-20 text-white text-xl">
                →
              </button>

              {/* Title */}
              <div className="absolute bottom-8 left-8 z-20">
                <h3
                  className="text-white text-4xl font-bold tracking-wide
                  transition-colors duration-300"
                >
                  {event.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
