import Logo from "./Logo";

const left = [["Equipos", "#equipos"], ["Historial", "#historial"]];
const right = [["Galería", "#galeria"], ["Contacto", "#contacto"]];
const link = "px-3 py-2 rounded-lg text-sm text-white/80 hover:text-gold hover:bg-red/10 transition-colors";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass backdrop-blur-md bg-black/40 border-x-0 border-t-0 rounded-none border-b border-gold/20" style={{ height: '80px' }}>
      <nav className="mx-auto max-w-6xl px-4 py-2 grid grid-cols-[1fr_auto_1fr] items-center h-full" aria-label="Principal">
        <div className="hidden sm:flex justify-end gap-1 pr-4">
          {left.map(([t, h]) => <a key={h} href={h} className={link}>{t}</a>)}
        </div>
        <a href="#inicio" className="col-start-2 flex flex-col items-center" aria-label="Copa Crack, inicio">
          <Logo size={44} className="drop-shadow-[0_0_20px_rgba(255,190,11,0.5)]" />
        </a>
        <div className="hidden sm:flex gap-1 pl-4">
          {right.map(([t, h]) => <a key={h} href={h} className={link}>{t}</a>)}
        </div>
      </nav>
      <div className="sm:hidden flex justify-center gap-1 pb-2">
        {[...left, ...right].map(([t, h]) => <a key={h} href={h} className={link}>{t}</a>)}
      </div>
    </header>
  );
}