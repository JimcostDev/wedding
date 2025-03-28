import { useState, useEffect } from "react";

export default function Countdown({ weddingDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(weddingDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days > 0 ? days : 0,
        hours: hours > 0 ? hours : 0,
        minutes: minutes > 0 ? minutes : 0,
        seconds: seconds > 0 ? seconds : 0,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center text-slate-800 mb-8">
          <span className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
            ¡Faltan!
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          <TimeBlock value={timeLeft.days} label="Días" />
          <TimeBlock value={timeLeft.hours} label="Horas" />
          <TimeBlock value={timeLeft.minutes} label="Minutos" />
          <TimeBlock value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>
    </section>
  );
}

function TimeBlock({ value, label }) {
  return (
    <div className="bg-white p-4 md:p-5 lg:p-6 rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-shadow border border-stone-200">
      <div className="text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-amber-600 mb-1 md:mb-2 text-center">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs md:text-sm lg:text-base uppercase tracking-wide text-stone-700 text-center font-medium">
        {label}
      </div>
    </div>
  );
}
