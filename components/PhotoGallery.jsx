'use client';
import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import galleryData from '../data/gallery.json';

const CATEGORIES = ['Todas', 'Premiación', 'Partidos', 'Equipos'];

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredPhotos = activeCategory === 'Todas'
    ? galleryData
    : galleryData.filter((photo) => photo.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction) => {
    setLightboxIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return filteredPhotos.length - 1;
      if (newIndex >= filteredPhotos.length) return 0;
      return newIndex;
    });
  };

  const handleKeyDown = (e) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  };

  const currentPhoto = filteredPhotos[lightboxIndex];

  return (
    <section id="galeria" className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
      <h2 className="mb-2 flex items-center gap-2 text-4xl font-black">
        <Filter className="text-[#FFD700]" /> Galería de Fotos
      </h2>
      <p className="mb-10 text-gray-300">Revive los mejores momentos del torneo</p>

      <div className="w-full max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeCategory === cat
                  ? 'bg-[#FFD700] text-[#002B49] shadow-[0_4px_20px_rgba(255,215,0,0.3)]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredPhotos.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-gray-400">No hay fotos en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredPhotos.map((photo, index) => (
              <figure
                key={photo.id}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer transition hover:border-[#FFD700]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <figcaption className="p-3 text-left">
                  <p className="font-bold text-white truncate">{photo.title}</p>
                  <p className="text-xs text-[#FFD700]/80">{photo.category}</p>
                </figcaption>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-lg">
                    Ver ampliada
                  </span>
                </div>
              </figure>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada"
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition z-10"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition z-10 hidden md:flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full">
            <Image
              src={currentPhoto.imageUrl}
              alt={currentPhoto.title}
              width={800}
              height={600}
              className="max-w-full max-h-[85vh] object-contain"
              priority
            />
            <div className="mt-4 text-left">
              <h3 className="text-xl font-bold text-white">{currentPhoto.title}</h3>
              <p className="text-sm text-[#FFD700]">{currentPhoto.category}</p>
              <p className="mt-2 text-gray-300">{currentPhoto.description}</p>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition z-10 hidden md:flex"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}