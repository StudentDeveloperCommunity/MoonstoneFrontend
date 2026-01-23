import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function Countdown({ onComplete }) {
  // ✅ EVENT START DATE: 12 FEB (set time also so it starts exactly at that moment)
  const startTime = new Date("2026-02-12T00:00:00");
  // If you want a specific time like 10 AM:
  // const startTime = new Date("2026-02-12T10:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = startTime.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const padZero = (num) => String(num).padStart(2, "0");

  return (
    <div className="w-full flex flex-col items-center mb-16">
      {/* COUNTER GRID */}
      <div
        className="
          w-full max-w-5xl
          px-3 sm:px-6 md:px-0
          grid grid-cols-4
          gap-2 sm:gap-3 md:gap-6
        "
      >
        {Object.entries(timeLeft).map(([label, value]) => (
          <div
            key={label}
            className="
              flex flex-col items-center justify-center
              gap-1 sm:gap-2 md:gap-4
              bg-[rgb(140_140_140_/_20%)]
              rounded-md sm:rounded-lg
              px-2 py-3
              sm:px-3 sm:py-3
              md:px-0 md:py-0 md:aspect-square
            "
          >
            {/* NUMBER */}
            <div className="text-lg sm:text-2xl md:text-6xl font-black text-white tracking-wide">
              {padZero(value)}
            </div>

            {/* LABEL */}
            <div className="text-[9px] sm:text-xs md:text-sm m-2 mt-0 font-bold text-gray-300 uppercase tracking-widest text-center">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* STATUS TEXT */}
      <div
        className="
    mt-4 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest
    bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500
    bg-clip-text text-transparent
  "
      >
        Starting Soon
      </div>
    </div>
  );
}

Countdown.propTypes = {
  onComplete: PropTypes.func,
};
