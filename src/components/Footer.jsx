import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-16 pb-12">
      <div
        className="max-w-[1500px] mx-auto border border-white/25 rounded-2xl px-10 py-12"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
       
        <div className="grid grid-cols-12 gap-6">

          
          <div className="col-span-3">
            <img
              src="/moonstone-logo.png"
              alt="Moonstone"
              className="w-[220px]"
            />
          </div>

         
          <div className="col-span-4"></div>

          
          <div className="col-span-2"></div>
          <div className="col-span-3 flex flex-col items-start">
            <p className="text-xs tracking-widest opacity-70">INFORMATION</p>

            <ul className="mt-4 flex flex-col gap-2 text-base">
              <li className="hover:text-gray-300 cursor-pointer">Home</li>
              <li className="hover:text-gray-300 cursor-pointer">About</li>
              <li className="hover:text-gray-300 cursor-pointer">Events</li>
            </ul>
          </div>

       
          <div className="col-span-3 mt-14 flex gap-5">
            {[FaLinkedinIn, FaInstagram, FaYoutube, FaXTwitter, FaFacebookF].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="w-11 h-11 flex items-center justify-center bg-white text-black rounded-full text-xl cursor-pointer hover:bg-gray-200 transition"
                >
                  <Icon />
                </div>
              )
            )}
          </div>

       
          <div className="col-span-1"></div>

         
          <div className="col-span-3 mt-14 text-sm leading-relaxed flex flex-col">
            <p>+ 917313111500</p>
            <p>+ 917313111501</p>
          </div>

         
          <div className="col-span-2 mt-14 text-sm leading-relaxed flex flex-col">
            <p>A.B. Road Pigdamber, Rau,</p>
            <p>Indore, Madhya Pradesh 453331</p>
          </div>

          
          <div className="col-span-3 mt-14 text-sm flex flex-col">
            <p className="opacity-70">Gmail</p>
            <p>director.admissions@medicaps.ac.in</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
