'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import galleryData from '../data/gallery.json';

const CATEGORIES = ['Todas', 'Premiación', 'Partidos', 'Equipos'];

function PhotoGrid({ photos }) {
  return (
    <div className="grid-gallery max-w-7xl mx-auto">
      {photos.map((photo, index) => (
        <motion.figure
          key={photo.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          className="glass-card overflow-hidden cursor-pointer gallery-img group"
          onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: photo.id }))}
        >
          <div className="aspect-[4/3] overflow-hidden relative">
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover gallery-img duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-center">
              <span className="px-4 py-2 rounded-full bg-[var(--gold)]/90 text-[#002b49] text-sm font-bold backdrop-blur-sm">
                Ver ampliada
              </span>
            </div>
          </div>
          <figcaption className="p-4 text-left">
            <p className="font-bold text-white truncate group-hover:text-[var(--gold)] transition-colors">{photo.title}</p>
            <p className="text-xs text-[var(--gold)]/80 mt-1">{photo.category}</p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card col-span-full p-16 text-center"
    >
      <p className="text-gray-400">No hay fotos en esta categoría.</p>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredPhotos = activeCategory === 'Todas'
    ? galleryData
    : galleryData.filter((photo) => photo.category === activeCategory);

  const openLightbox = (id) => {
    const index = filteredPhotos.findIndex(p => p.id === id);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };
    const handleCustomEvent = (e) => openLightbox(e.detail);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-lightbox', handleCustomEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-lightbox', handleCustomEvent);
    };
  }, [lightboxOpen, filteredPhotos.length]);

  const currentPhoto = filteredPhotos[lightboxIndex];

  return (
    <section id="galeria" className="section-premium">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-12">
          <h2 className="mb-4 flex items-center justify-center gap-3 text-4xl font-black heading-3d md:text-5xl">
            <Filter className="text-[var(--gold)]" /> Galería de Fotos
          </h2>
          <p className="text-gray-300 text-lg">Revive los mejores momentos del torneo</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn-3d px-5 py-2.5 text-sm ${activeCategory === cat ? 'btn-gold' : 'btn-ghost'}`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {filteredPhotos.length === 0 ? (
              <EmptyState />
            ) : (
              <PhotoGrid photos={filteredPhotos} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxOpen && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Imagen ampliada"
          >
            <motion.button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition btn-3d"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition btn-3d hidden md:flex"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-8 w-8" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl max-h-[85vh] w-full"
            >
              <Image
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                width={1000}
                height={750}
                className="lightbox-img max-w-full max-h-[85vh] object-contain rounded-xl"
                priority
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6 text-left"
              >
                <h3 className="text-2xl font-black text-white mb-2">{currentPhoto.title}</h3>
                <p className="text-sm text-[var(--gold)] mb-3">{currentPhoto.category}</p>
                <p className="text-gray-300">{currentPhoto.description}</p>
              </motion.div>
            </motion.div>

            <motion.button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition btn-3d hidden md:flex"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-8 w-8" />
            </motion.button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 md:hidden">
              <motion.button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn-3d btn-ghost p-2"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
              <motion.button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn-3d btn-ghost p-2"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}