import { Trophy, CalendarDays, MapPin, Medal, ClipboardList, Camera } from 'lucide-react';
import Faq from '../components/Faq';
import Gallery from '../components/Gallery';
import HeroOverlay from '../components/HeroOverlay';

const WHATSAPP = 'https://wa.me/51944897167?text=Hola,%20deseo%20inscribir%20a%20mi%20equipo%20en%20la%20Copa%20Crack%20Oficial%20(Enero%202027)';

const section = 'min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center';

export default function Home() {
  return (
    <div className="bg-dots min-h-screen text-white">
      <header className="fixed top-0 inset-x-0 z-10 flex items-center justify-between bg-[#060c14]/85 px-6 py-4 backdrop-blur-md">
        <p className="font-black tracking-wider">COPA <span className="text-[#FFD700]">CRACK</span> <span className="text-xs tracking-[0.3em]">OFICIAL</span></p>
        <nav className="hidden md:flex gap-6 text-sm font-semibold">
          <a href="#tabla" className="hover:text-[#FFD700]">Tabla</a>
          <a href="#partidos" className="hover:text-[#FFD700]">Partidos</a>
          <a href="#galeria" className="hover:text-[#FFD700]">Galería</a>
          <a href="#faq" className="hover:text-[#FFD700]">FAQ</a>
        </nav>
        <a href={WHATSAPP} target="_blank" rel="noopener" className="rounded-full bg-[#FFD700] px-5 py-2 text-sm font-bold text-[#002B49] hover:bg-[#ffe14d]">
          Inscribirme
        </a>
      </header>

      <HeroOverlay whatsapp={WHATSAPP} />

      <section id="tabla" className={section}>
        <h2 className="mb-1 flex items-center gap-2 text-4xl font-black"><Trophy className="text-[#FFD700]" /> Tabla de Posiciones</h2>
        <p className="mb-8 text-gray-300">Temporada Enero 2027 · En preparación</p>
        <div className="w-full max-w-2xl rounded-xl border border-[#FFD700]/40 bg-[#FFD700]/10 p-8 text-center">
          <ClipboardList className="mx-auto mb-4 h-10 w-10 text-[#FFD700]" />
          <p className="mb-2 text-xl font-black uppercase tracking-wider text-[#FFD700]">Próximamente</p>
          <p className="text-gray-200">Inscripciones abiertas para la Temporada Enero 2027. El fixture y la tabla oficial se publicarán al iniciar el torneo.</p>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="mt-6 inline-block rounded-full bg-[#FFD700] px-6 py-2.5 font-bold text-[#002B49] transition hover:bg-[#ffe14d]">
            Inscribir a mi equipo
          </a>
        </div>
      </section>

      <section id="partidos" className={section}>
        <h2 className="mb-8 flex items-center gap-2 text-4xl font-black"><CalendarDays className="text-[#FFD700]" /> Próximos Partidos</h2>
        <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <CalendarDays className="mx-auto mb-4 h-10 w-10 text-[#E51A24]" />
          <p className="mb-2 text-xl font-black uppercase tracking-wider">Fixture en preparación</p>
          <p className="text-gray-300">Inscripciones abiertas para la Temporada Enero 2027. El fixture y la tabla oficial se publicarán al iniciar el torneo.</p>
        </div>
      </section>

      <section id="galeria" className={section}>
        <h2 className="mb-2 flex items-center gap-2 text-4xl font-black"><Camera className="text-[#FFD700]" /> Campeonatos Anteriores</h2>
        <p className="mb-8 text-gray-300">Revive las ediciones pasadas del torneo</p>
        <Gallery />
      </section>

      <section id="faq" className={section}>
        <h2 className="mb-8 flex items-center gap-2 text-4xl font-black"><Medal className="text-[#FFD700]" /> Preguntas Frecuentes</h2>
        <Faq />
      </section>

      <footer className="flex flex-col items-center gap-2 border-t border-white/10 px-6 py-10 text-center text-sm text-gray-400">
        <p className="flex items-center gap-1 font-bold text-gray-200"><MapPin className="h-4 w-4 text-[#FFD700]" /> Sede: Cancha Sintética — Cruce de Av. El Bosque con Av. Huarochirí</p>
        <p>Ref. San Antonio de Carapongo, Lurigancho-Chosica, Lima, Perú</p>
        <a className="text-[#FFD700] hover:underline" href="https://www.google.com/maps/search/?api=1&query=Av.+El+Bosque+con+Av.+Huarochir%C3%AD+Carapongo+Lurigancho" target="_blank" rel="noopener">Ver en Google Maps →</a>
        <p>© 2026 Copa Crack Oficial · Hecho con ⚽ en Perú</p>
      </footer>
    </div>
  );
}