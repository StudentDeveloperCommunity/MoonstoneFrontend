import { useEffect, useState } from "react";

export default function WebsiteLoader() {
  const loadingTexts = [
    "Loading... ⚡",
    "Please wait... 📋",
    "Processing... 🔄",
    "Almost done... ✨",
    "Finalizing... 🎯",
  ];

  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center opacity-85 justify-center bg-black backdrop-blur-2xl">
      <div className="relative h-16 w-16">
        {/* Simple Spinner */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 
          border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent">
        </div>
      </div>

      {/* Animated Text */}
      <p className="mt-6 text-white text-lg font-semibold tracking-wide transition-opacity duration-500">
        {loadingTexts[currentText]}
      </p>
    </div>
  );
}
