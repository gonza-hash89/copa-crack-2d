import { Trophy, CalendarDays, MapPin, Medal, ClipboardList, Camera, Shield } from 'lucide-react';
import Faq from '../components/Faq';
import HeroOverlay from '../components/HeroOverlay';
import PastTournaments from '../components/PastTournaments';
import PhotoGallery from '../components/PhotoGallery';
import teams from '../data/teams.json';

const WHATSAPP = 'https://wa.me/51944897167?text=Hola,%20deseo%20inscribir%20a%20mi%20equipo%20en%20la%20Copa%20Crack%20Oficial%20(Enero%202027)';

export default function Home() {
  return (
    <div className="relative min-h-screen text-white">
      <header className="fixed top-0 inset-x-0 z-10 flex items-center justify-between bg-[#050b07]/90 px-6 py-4 backdrop-blur-2xl border-b border-white/5">
        <p className="font-black tracking-wider heading-gold text-2xl">COPA <span>CRACK</span> <span className="text-xs tracking-[0.3em] text-white/70">OFICIAL</span></p>
        <nav className="hidden md:flex gap-8 text-sm font-semibold">
          <a href="#equipos" className="nav-link">Equipos</a>
          <a href="#historial" className="nav-link">Historial</a>
          <a href="#tabla" className="nav-link">Tabla</a>
          <a href="#partidos" className="nav-link">Partidos</a>
          <a href="#galeria" className="nav-link">Galería</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>
        <a href={WHATSAPP} target="_blank" rel="noopener" className="btn-3d btn-gold px-6 py-2.5 text-sm">
          Inscribirme
        </a>
      </header>

      <HeroOverlay whatsapp={WHATSAPP} />

      <section id="equipos" className="section-premium">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <h2 className="mb-4 flex items-center justify-center gap-3 text-4xl font-black heading-3d md:text-5xl lg:text-6xl">
              <Shield className="text-[var(--gold)]" /> Equipos Participantes
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">14 academias que disputaron la última edición</p>
          </div>
          <ul className="grid-teams max-w-7xl mx-auto">
            {teams.map((team, index) => (
              <li
                key={team.id}
                className="glass-card fade-in-up p-5 text-left group"
                style={{ animationDelay: `${Math.min(index * 80, 600)}ms` }}
              >
                <span className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] text-xs font-black text-[#002B49] shadow-[0_2px_12px_rgba(255,215,0,0.5)]">
                  {team.id}
                </span>
                <p className="font-bold text-white text-lg group-hover:text-[var(--gold)] transition-colors">{team.name}</p>
                <p className="text-xs text-gray-400 mt-1">{team.fullName}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PastTournaments />

      <PhotoGallery />

      <section id="tabla" className="section-premium">
        <div className="max-w-3xl w-full text-center">
          <h2 className="mb-4 flex items-center justify-center gap-3 text-4xl font-black heading-3d md:text-5xl">
            <Trophy className="text-[var(--gold)]" /> Tabla de Posiciones
          </h2>
          <p className="mb-10 text-gray-300 text-lg">Temporada Enero 2027 · En preparación</p>
          <div className="glass-card p-10 md:p-12">
            <ClipboardList className="mx-auto mb-6 h-14 w-14 text-[var(--gold)]" />
            <p className="mb-3 text-2xl font-black uppercase tracking-wider text-[var(--gold)]">Próximamente</p>
            <p className="text-gray-200 mb-8 max-w-lg mx-auto">Inscripciones abiertas para la Temporada Enero 2027. El fixture y la tabla oficial se publicarán al iniciar el torneo.</p>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="btn-3d btn-gold px-8 py-3 font-bold text-base">
              Inscribir a mi equipo
            </a>
          </div>
        </div>
      </section>

      <section id="partidos" className="section-premium">
        <div className="max-w-3xl w-full text-center">
          <h2 className="mb-10 flex items-center justify-center gap-3 text-4xl font-black heading-3d md:text-5xl">
            <CalendarDays className="text-[var(--gold)]" /> Próximos Partidos
          </h2>
          <div className="glass-card p-10 md:p-12">
            <CalendarDays className="mx-auto mb-6 h-14 w-14 text-[var(--cyber-green)]" />
            <p className="mb-3 text-2xl font-black uppercase tracking-wider">Fixture en preparación</p>
            <p className="text-gray-300">Inscripciones abiertas para la Temporada Enero 2027. El fixture y la tabla oficial se publicarán al iniciar el torneo.</p>
          </div>
        </div>
      </section>

      <section id="faq" className="section-premium">
        <div className="max-w-3xl w-full text-center">
          <h2 className="mb-10 flex items-center justify-center gap-3 text-4xl font-black heading-3d md:text-5xl">
            <Medal className="text-[var(--gold)]" /> Preguntas Frecuentes
          </h2>
        </div>
        <Faq />
      </section>

      <footer className="relative z-10 flex flex-col items-center gap-3 border-t border-white/10 px-6 py-12 text-center text-sm text-gray-400">
        <p className="flex items-center justify-center gap-2 font-bold text-gray-200">
          <MapPin className="h-5 w-5 text-[var(--gold)]" />
          Sede: Cancha Sintética — Cruce de Av. El Bosque con Av. Huarochirí
        </p>
        <p>Ref. San Antonio de Carapongo, Lurigancho-Chosica, Lima, Perú</p>
        <a className="footer-link hover:underline" href="https://www.google.com/maps/search/?api=1&query=Av.+El+Bosque+con+Av.+Huarochir%C3%AD+Carapongo+Lurigancho" target="_blank" rel="noopener">Ver en Google Maps →</a>
        <p>© 2026 Copa Crack Oficial · Hecho con ⚽ en Perú</p>
      </footer>
    </div>
  );
}