'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const HeroScene = dynamic(() => import('./HeroScene').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 flex items-center justify-center" style={{ background: '#020408' }}>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#ffd700]/30 border-t-[#ffd700] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#ffd700] font-medium">Cargando experiencia 3D...</p>
      </div>
    </div>
  ),
});

export default function HeroSceneWrapper() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!mounted) return null;
  if (reducedMotion) return null;

  return <HeroScene />;
}