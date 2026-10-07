import Logo from "./Logo";

export const WHATSAPP = "51944897167";
export const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
      {/* Diagonal accent line */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 border-r-[300px] border-t-[300px] border-r-transparent border-t-gold/10 rotate-45" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 border-l-[300px] border-b-[300px] border-l-transparent border-b-red/10 rotate-45" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
          {/* LEFT COLUMN - Content */}
          <div className="lg:order-1 text-left enter enter-1">
            <span className="badge-sharp inline-block mb-6">Torneo de Fútbol Formativo</span>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] mb-6 text-gradient-gold tracking-tight">
              COPA <span className="block text-gold-bright">CRACK</span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed enter enter-2">
              Donde los futuros cracks juegan, aprenden y sueñan bajo las luces del estadio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 enter enter-3">
              <a
                href={wa("Hola, deseo inscribir a mi equipo en la Copa Crack Oficial (Enero 2027)")}
                target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-center"
              >
                Inscribe a tu academia
              </a>
              <a
                href="#equipos"
                className="btn-secondary w-full sm:w-auto text-center"
              >
                Ver Equipos
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN - Logo Card */}
          <div className="lg:order-2 flex justify-center enter enter-4">
            <div className="logo-card w-full max-w-md aspect-square sm:max-w-lg lg:max-w-xl flex items-center justify-center p-8 sm:p-12">
              <Logo size={220} className="drop-shadow-[0_0_60px_rgba(255,190,11,0.5)]" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce enter enter-5">
          <span className="text-xs uppercase tracking-widest font-bold text-gold/50">Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold/50">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}