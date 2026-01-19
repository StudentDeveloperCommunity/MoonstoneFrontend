import { useEffect, useState } from "react";

export default function WebsiteLoader({ timeoutMs = 15000, dismissible = true }) {
  const loadingTexts = [
    "Loading the Moonstone magic… ✨",
    "Setting the stage for tonight… 🎭",
    "Good vibes incoming… ⚡",
    "Almost showtime… 🌙",
    "The night is about to begin… 🔥",
  ];

  const [currentText, setCurrentText] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 2000); // change text every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Safety timeout so loader does not get stuck if caller forgets to reset loading.
    const timer = setTimeout(() => setVisible(false), timeoutMs);
    return () => clearTimeout(timer);
  }, [timeoutMs]);

  if (!visible) return null;

  const handleClose = () => {
    if (dismissible) setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center opacity-85 justify-center bg-black backdrop-blur-2xl">
      <div className="relative h-28 w-28">
        {/* Spinner */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 
          border-t-[#008080] border-r-transparent border-b-transparent border-l-transparent">
        </div>
      </div>

      {/* Animated Text */}
      <p className="mt-6 text-white text-lg font-semibold tracking-wide transition-opacity duration-500">
        {loadingTexts[currentText]}
      </p>

      {dismissible && (
        <button
          onClick={handleClose}
          className="mt-6 px-4 py-2 text-sm text-white border border-white/40 rounded hover:bg-white/10"
        >
          Close
        </button>
      )}
    </div>
  );
}
