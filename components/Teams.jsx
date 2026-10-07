"use client";

import teams from "@/data/teams.json";
import Image from "next/image";

function Crest({ short, color, logo }) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={`${short} crest`}
        width={80}
        height={80}
        className="w-20 h-20 object-contain filter drop-shadow-lg"
      />
    );
  }
  return (
    <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-br from-red/30 to-gold/30 border border-gold/50 shadow-lg">
      <span className="font-black text-2xl text-white drop-shadow-lg">{short}</span>
    </div>
  );
}

export default function Teams() {
  return (
    <section id="equipos" className="px-4 pt-24 pb-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl sm:text-5xl text-center enter enter-1 text-gradient-gold">
          Equipos
        </h2>
        <p className="mt-4 mx-auto w-fit rounded-full border border-gold/60 bg-gold/10 px-5 py-2 text-sm text-gold enter enter-2">
          14 academias participantes del último campeonato
        </p>
        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map((t, i) => (
            <li key={t.id} className="glass rounded-2xl p-4 flex flex-col items-center text-center hover:border-gold hover:border-2 hover:shadow-[0_0_20px_rgba(255,190,11,0.4)] transition-all duration-300 fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <Crest short={t.short} color={t.color} logo={t.logo} />
              <span className="mt-3 text-sm font-medium leading-snug">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}