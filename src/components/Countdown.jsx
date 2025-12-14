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
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-4 md:gap-6 justify-center items-center">
        {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => {
          const value = [
            timeLeft.days,
            timeLeft.hours,
            timeLeft.minutes,
            timeLeft.seconds,
          ][index];

          return (
            <div
              key={label}
              className="flex flex-col items-center gap-3 bg-[rgb(140_140_140_/_20%)] rounded-lg px-7 md:px-10 py-7 md:py-10"
            >
              <div className="text-4xl md:text-6xl font-black text-white tracking-wider">
                {padZero(value)}
              </div>
              <div className="text-xs md:text-sm font-bold text-gray-300 uppercase tracking-widest">
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest">
        STARTING SOON
      </div>
    </div>
  );
}

Countdown.propTypes = {
  startTime: PropTypes.instanceOf(Date).isRequired,
  onComplete: PropTypes.func,
};
