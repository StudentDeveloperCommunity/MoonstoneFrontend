import { useEffect, useState } from "react";
import lg from "../assets/herosection/moon-gif.gif";

export default function WebsiteLoader() {
  const loadingTexts = [
    "Loading the Moonstone magic… ✨",
    "Setting the stage for tonight… 🎭",
    "Good vibes incoming… ⚡",
    "Almost showtime… 🌙",
    "The night is about to begin… 🔥",
  ];

  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 2000); // change text every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center opacity-85 justify-center bg-black backdrop-blur-2xl">
      <div className="relative h-28 w-28">
        {/* Spinner */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 
          border-t-[#008080] border-r-transparent border-b-transparent border-l-transparent">
        </div>

        {/* Moon GIF */}
        <img
          src={lg}
          alt="Loading..."
          className="absolute inset-0 m-auto h-28 w-28 object-contain"
        />
      </div>

      {/* Animated Text */}
      <p className="mt-6 text-white text-lg font-semibold tracking-wide transition-opacity duration-500">
        {loadingTexts[currentText]}
      </p>
    </div>
  );
}
