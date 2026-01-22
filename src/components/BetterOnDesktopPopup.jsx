import { useEffect, useState } from "react";

export default function BetterOnDesktopPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => setShow(true), 2000);
    // Auto-hide after 8 seconds
    const hideTimer = setTimeout(() => setShow(false), 10000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-4 z-50 max-w-xs bg-black/90 text-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 animate-fade-in-up border border-white/10">
      <span className="text-lg">💡</span>
      <div className="flex-1 text-sm leading-snug">
        For better user engagement<br />open website on <span className="font-semibold text-blue-300">desktop</span>.
      </div>
    </div>
  );
}

// Add this animation to your global CSS or Tailwind config:
// @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
// .animate-fade-in-up { animation: fade-in-up 0.5s ease; }
