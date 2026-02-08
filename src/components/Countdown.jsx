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

      if (diff < 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Título y Decoración */}
        <div className="text-center mb-12 md:mb-16 space-y-2">
          <span 
            className="text-lime-800 tracking-[0.2em] text-xs md:text-sm uppercase font-semibold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            La Cuenta Atrás
          </span>
          
          {/* COHERENCIA: Usamos Great Vibes (como en el Header) para el título */}
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl text-stone-800 pt-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            ¡Ya falta menos!
          </h2>
          
          <div className="w-24 h-1 bg-lime-800/20 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Grid de bloques de tiempo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          <TimeBlock value={timeLeft.days} label="Días" delay="0" />
          <TimeBlock value={timeLeft.hours} label="Horas" delay="100" />
          <TimeBlock value={timeLeft.minutes} label="Minutos" delay="200" />
          <TimeBlock value={timeLeft.seconds} label="Segundos" delay="300" />
        </div>

        {/* Mensaje inferior */}
        <div className="text-center mt-12 md:mt-16">
          <p 
            className="text-stone-500 italic text-lg md:text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "Nos vemos en los jardines de Quinta Lacy"
          </p>
        </div>
      </div>
    </section>
  );
}

function TimeBlock({ value, label, delay }) {
  return (
    <div 
      className="group relative"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Tarjeta con efecto Glass/Papel */}
      <div className="relative bg-white p-6 md:p-8 rounded-t-[3rem] rounded-b-2xl shadow-sm border border-stone-200 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-lime-800/30 transition-all duration-500 ease-out">
        
        {/* Decoración superior (hojita/punto) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-lime-800/20 group-hover:bg-lime-800 transition-colors duration-500"></div>

        <div className="flex flex-col items-center justify-center space-y-2">
          
          {/* COHERENCIA: Usamos Playfair Display para los números (como la fecha del Header) */}
          <div 
            className="text-5xl sm:text-6xl md:text-7xl text-stone-800 group-hover:text-lime-900 transition-colors duration-300 tabular-nums leading-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {String(value).padStart(2, "0")}
          </div>

          {/* Línea separadora pequeña */}
          <div className="w-8 h-px bg-stone-200 group-hover:bg-lime-800/40 transition-colors duration-300 my-2"></div>

          {/* Etiqueta: Montserrat para legibilidad */}
          <div 
            className="text-xs md:text-sm uppercase tracking-widest text-stone-500 font-medium group-hover:text-lime-700 transition-colors duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {label}
          </div>
        </div>
      </div>

      {/* Sombra de suelo decorativa */}
      <div className="absolute -bottom-2 left-4 right-4 h-4 bg-lime-900/5 blur-lg rounded-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}