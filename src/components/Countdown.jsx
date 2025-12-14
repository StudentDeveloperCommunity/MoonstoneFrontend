import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function Countdown({ startTime, onComplete }) {
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
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [startTime, onComplete]);

  const padZero = (num) => String(num).padStart(2, "0");

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* COUNTER GRID */}
      <div
        className="
          w-full max-w-5xl
          px-3 sm:px-6 md:px-0   /* 👈 left & right margin */
          grid grid-cols-4
          gap-2 sm:gap-3 md:gap-6
        "
      >
        {Object.entries(timeLeft).map(([label, value]) => (
          <div
            key={label}
            className="
              flex flex-col items-center
              gap-1 sm:gap-2 md:gap-3

              bg-[rgb(140_140_140_/_20%)]
              rounded-md sm:rounded-lg

              px-2 py-3
              sm:px-4 sm:py-5
              md:px-10 md:py-10
            "
          >
            {/* NUMBER */}
            <div
              className="
                text-lg
                sm:text-2xl
                md:text-6xl
                font-black
                text-white
                tracking-wide
              "
            >
              {padZero(value)}
            </div>

            {/* LABEL */}
            <div
              className="
                text-[9px]
                sm:text-xs
                md:text-sm
                font-bold
                text-gray-300
                uppercase
                tracking-widest
                text-center
              "
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* STATUS TEXT */}
      <div className="mt-4 text-gray-500 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest">
        Starting Soon
      </div>
    </div>
  );
}


Countdown.propTypes = {
  startTime: PropTypes.instanceOf(Date).isRequired,
  onComplete: PropTypes.func,
};
