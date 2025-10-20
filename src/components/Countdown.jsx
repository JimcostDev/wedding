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
    <section className="py-12 md:py-20 bg-linear-to-b from-white via-rose-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-3 text-gray-900">
            <span className="bg-linear-to-b from-rose-500 via-rose-400 to-pink-500 bg-clip-text text-transparent">
              ¡Faltan!
            </span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base">Hasta el gran día</p>
        </div>

        {/* Grid de bloques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          <TimeBlock value={timeLeft.days} label="Días" />
          <TimeBlock value={timeLeft.hours} label="Horas" />
          <TimeBlock value={timeLeft.minutes} label="Minutos" />
          <TimeBlock value={timeLeft.seconds} label="Segundos" />
        </div>

        {/* Mensaje decorativo */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-gray-600 text-sm md:text-base italic">
            Cada segundo nos acerca más a nuestro momento especial
          </p>
        </div>
      </div>
    </section>
  );
}

function TimeBlock({ value, label }) {
  return (
    <div className="group relative">
      {/* Fondo degradado de rose */}
      <div className="absolute -inset-0.5 bg-linear-to-br from-rose-300 to-pink-300 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>

      {/* Card principal */}
      <div className="relative bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-rose-100 hover:border-rose-300">
        {/* Número principal */}
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-linear-to-br from-rose-600 to-rose-500 bg-clip-text text-transparent mb-3 text-center font-mono">
          {String(value).padStart(2, "0")}
        </div>

        {/* Etiqueta */}
        <div className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-rose-700 text-center font-semibold">
          {label}
        </div>

        {/* Decoración inferior */}
        <div className="h-1 bg-linear-to-r from-transparent via-rose-300 to-transparent mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}