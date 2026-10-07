import Logo from "./Logo";

export const WHATSAPP = "51944897167";
export const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export default function Hero() {
  return (
    <section id="inicio" className="pt-40 sm:pt-32 pb-20 px-4">
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
        <Logo size={150} className="enter enter-1 drop-shadow-[0_0_40px_rgba(255,190,11,0.4)]" />
        <h1 className="font-display text-6xl sm:text-8xl mt-6 bg-gradient-to-r from-gold-bright via-gold to-red bg-clip-text text-transparent enter enter-2 animate-gradient-shift">
          COPA CRACK
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-white/90 enter enter-3">Torneo de fútbol formativo</p>
        <p className="mt-4 max-w-xl text-white/70 enter enter-4">
          Donde los futuros cracks juegan, aprenden y sueñan bajo las luces del estadio.
        </p>
        <a
          href={wa("Hola, deseo inscribir a mi equipo en la Copa Crack Oficial (Enero 2027)")}
          target="_blank" rel="noopener noreferrer"
          className="btn-primary enter enter-5 mt-8"
        >
          Inscribe a tu academia por WhatsApp
        </a>
      </div>
    </section>
  );
}