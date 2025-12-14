// import {
//   FaLinkedinIn,
//   FaInstagram,
//   FaYoutube,
//   FaXTwitter,
//   FaFacebookF,
// } from "react-icons/fa6";

// export default function Footer() {
//   return (

// <footer className="w-full bg-black text-white pt-8 sm:pt-16 pb-6 sm:pb-12">
//   <div
//     className="
//       max-w-[1500px] mx-auto
//       border border-white/25 rounded-2xl
//       px-4 sm:px-8 lg:px-10
//       py-6 sm:py-10 lg:py-12
//       overflow-hidden
//     "
//     style={{ background: "rgba(0,0,0,0.2)" }}
//   >
//     <div
//       className="
//         grid grid-cols-1
//         gap-8 sm:gap-10
//         sm:grid-cols-2
//         md:grid-cols-12
//       "
//     >
//       {/* LOGO */}
//       <div className="md:col-span-3 flex justify-center md:justify-start">
//         <img
//           src="/moonstone-logo.png"
//           alt="Moonstone"
//           className="w-36 sm:w-48 lg:w-[220px]"
//         />
//       </div>

//       {/* SPACER (desktop only) */}
//       <div className="hidden md:block md:col-span-4"></div>

//       {/* INFORMATION */}
//      <div className="md:col-start-10 md:col-span-3 flex flex-col items-center md:items-start">
//   <p className="text-xs tracking-widest opacity-70">
//     INFORMATION
//   </p>
//   <ul className="mt-3 flex flex-col gap-2 text-sm sm:text-base">
//     <li className="hover:text-gray-300 cursor-pointer">Home</li>
//     <li className="hover:text-gray-300 cursor-pointer">About</li>
//     <li className="hover:text-gray-300 cursor-pointer">Events</li>
//   </ul>
// </div>


//       {/* SOCIAL ICONS */}
//       <div className="md:col-span-3 flex justify-center md:justify-start gap-4 mt-4 md:mt-14 flex-wrap">
//         {[FaLinkedinIn, FaInstagram, FaYoutube, FaXTwitter, FaFacebookF].map(
//           (Icon, index) => (
//             <div
//               key={index}
//               className="
//                 w-10 h-10 sm:w-11 sm:h-11
//                 flex items-center justify-center
//                 bg-white text-black
//                 rounded-full text-lg sm:text-xl
//                 cursor-pointer
//                 hover:bg-gray-200 transition
//               "
//             >
//               <Icon />
//             </div>
//           )
//         )}
//       </div>

//       {/* PHONE NUMBERS */}
//       <div className="md:col-span-3 mt-4 md:mt-14 text-sm leading-relaxed flex flex-col items-center md:items-start">
//         <p>+91 7313111500</p>
//         <p>+91 7313111501</p>
//       </div>

//       {/* ADDRESS */}
//       <div className="md:col-span-2 mt-4 md:mt-14 text-sm leading-relaxed flex flex-col items-center md:items-start text-center md:text-left">
//         <p>A.B. Road Pigdamber, Rau,</p>
//         <p>Indore, Madhya Pradesh 453331</p>
//       </div>

//       {/* EMAIL */}
//       <div className="md:col-span-3 mt-4 md:mt-14 text-sm flex flex-col items-center md:items-start break-all">
//         <p className="opacity-70">Gmail</p>
//         <p>director.admissions@medicaps.ac.in</p>
//       </div>
//     </div>
//   </div>
// </footer>


//   );
// }


import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-8 sm:pt-16 pb-6 sm:pb-12">
      <div
        className="
          max-w-[1500px] mx-auto
          border border-white/25 rounded-2xl
          px-4 sm:px-8 lg:px-10
          py-6 sm:py-10 lg:py-12
          overflow-hidden
        "
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <div
          className="
            grid grid-cols-1
            gap-8 sm:gap-10
            sm:grid-cols-2
            md:grid-cols-12
          "
        >
          {/* LOGO */}
          <div className="md:col-span-3 flex justify-center md:justify-start">
            <img
              src="/moonstone-logo.png"
              alt="Moonstone"
              className="w-36 sm:w-48 lg:w-[220px]"
            />
          </div>

          {/* SPACER (desktop only) */}
          <div className="hidden md:block md:col-span-4"></div>

          {/* INFORMATION */}
          <div className="md:col-start-10 md:col-span-3 flex flex-col items-center md:items-start">
            <p className="text-xs tracking-widest opacity-70">INFORMATION</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm sm:text-base">
              <li className="hover:text-gray-300 cursor-pointer">Home</li>
              <li className="hover:text-gray-300 cursor-pointer">About</li>
              <li className="hover:text-gray-300 cursor-pointer">Events</li>
            </ul>
          </div>

          {/* SOCIAL ICONS */}
          <div className="md:col-span-3 flex justify-center md:justify-start gap-4 mt-4 md:mt-14 md:flex-nowrap">
            {[FaLinkedinIn, FaInstagram, FaYoutube, FaXTwitter, FaFacebookF].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="
                    w-10 h-10 sm:w-11 sm:h-11
                    flex items-center justify-center
                    bg-white text-black
                    rounded-full text-lg sm:text-xl
                    cursor-pointer
                    hover:bg-gray-200 transition
                  "
                >
                  <Icon />
                </div>
              )
            )}
          </div>

          {/* CONTACT COLUMNS */}
          <div className="md:col-span-9 flex flex-col md:flex-row mb-1 md:justify-between md:gap-10 mt-4 md:mt-14">
            {/* PHONE NUMBERS */}
            <div className="text-sm leading-relaxed flex flex-col items-center md:items-start">
              <p>+91 7313111500</p>
              <p>+91 7313111501</p>
            </div>

            {/* ADDRESS */}
            <div className="text-sm leading-relaxed flex flex-col items-center mb-1 md:items-start text-center md:text-left">
              <p>A.B. Road Pigdamber, Rau,</p>
              <p>Indore, Madhya Pradesh 453331</p>
            </div>

            {/* EMAIL */}
            <div className="text-sm flex flex-col items-center md:items-start break-all ">
              <p className="opacity-70">Gmail</p>
              <p>director.admissions@medicaps.ac.in</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
