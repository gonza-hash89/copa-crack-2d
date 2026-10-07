"use client";
import { useEffect, useState } from "react";
import photos from "@/data/gallery.json";

const filters = ["Todas", "Premiación", "Partidos", "Equipos"];

export default function PhotoGallery() {
  const [filter, setFilter] = useState("Todas");
  const [index, setIndex] = useState(null);
  const list = filter === "Todas" ? photos : photos.filter((p) => p.category === filter);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % list.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, list.length]);

  const current = index !== null ? list[index] : null;

  return (
    <section id="galeria" className="px-4 pt-24 pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-gradient-gold">Galería</h2>
          <span className="badge-sharp self-end">{list.length} fotos</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setIndex(null); }}
              aria-pressed={filter === f}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-150 clip-path-polygon(0_3px_3px_0_100%_0_100%_calc(100%-3px)_calc(100%-3px)_100%_0_100%) ${
                filter === f 
                  ? "bg-gradient-to-r from-red to-gold text-red-dark border-none shadow-[4px_4px_0_rgba(255,190,11,0.5)]" 
                  : "glass text-white/80 hover:text-gold hover:border-gold/50 border border-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((p, i) => (
            <li key={p.id}>
              <button onClick={() => setIndex(i)} className="group relative block w-full aspect-square overflow-hidden clip-path-polygon(0_2%_2%_0_100%_0_100%_98%_98%_100%_0_100%) glass hover:border-gold hover:border-2 hover:shadow-[8px_8px_0_rgba(255,190,11,0.3)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200" aria-label={`Ver ${p.title}`}>
                <img src={p.url} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-red/90 via-red/50 to-transparent p-3 text-left">
                  <span className="text-xs font-bold text-white drop-shadow-lg">{p.title}</span>
                  <span className="text-[10px] text-gold/80 uppercase tracking-wide">{p.category}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {current && (
        <div role="dialog" aria-modal="true" aria-label={current.title} onClick={() => setIndex(null)}
             className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button onClick={() => setIndex(null)} aria-label="Cerrar" className="absolute top-4 right-4 text-3xl text-white/80 hover:text-gold transition-colors">×</button>
          <button onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + list.length) % list.length); }} aria-label="Anterior" className="absolute left-4 text-4xl text-white/80 hover:text-gold">‹</button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full max-w-4xl">
            <img src={current.url} alt={current.title} className="lightbox-img max-h-[80vh] w-auto" />
            <figcaption className="mt-4 text-center text-sm text-gold font-medium">{current.title} · {current.category}</figcaption>
          </figure>
          <button onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % list.length); }} aria-label="Siguiente" className="absolute right-4 text-4xl text-white/80 hover:text-gold">›</button>
        </div>
      )}
    </section>
  );
}