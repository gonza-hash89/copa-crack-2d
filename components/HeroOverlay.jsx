'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

export default function HeroOverlay({ whatsapp }) {
  const [logoOk, setLogoOk] = useState(true);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
      {/* Logo oficial 2D: PNG con transparencia, responsivo */}
      {logoOk && (
        <Image
          src="/logo.png"
          alt="Escudo oficial Copa Crack Oficial"
          width={600}
          height={600}
          priority
          sizes="(max-width: 768px) 208px, 288px"
          onError={() => setLogoOk(false)}
          className="enter enter-1 h-auto w-52 drop-shadow-[0_10px_35px_rgba(255,215,0,0.35)] md:w-72 filter brightness-110"
        />
      )}
      <p className="enter enter-2 mb-4 rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 px-4 py-1 text-sm text-[#FFD700] backdrop-blur-sm">
        🏆 Próximo Campeonato · Enero 2027 — Lima, Perú
      </p>
      <h1 className="enter enter-2 mb-2 mt-6 text-5xl font-black tracking-wider heading-3d md:text-7xl">
        COPA <span className="text-[#FFD700]">CRACK</span>
      </h1>
      <p className="enter enter-3 mb-8 text-xl text-gray-300 max-w-xl">
        Donde nacen los verdaderos cracks
      </p>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener"
        className="btn-3d btn-whatsapp enter enter-4 px-8 py-3"
      >
        <MessageCircle className="mr-2 inline h-5 w-5" />Inscribir por WhatsApp
      </a>
      <p className="enter enter-5 mt-14 animate-bounce text-3xl text-white/50">↓</p>
    </section>
  );
}