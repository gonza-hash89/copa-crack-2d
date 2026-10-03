'use client';
import { useEffect, useState } from 'react';
import { Lock, Upload, Link2, Trash2, LogOut, ImagePlus } from 'lucide-react';

// PIN por defecto. Para cambiarlo sin tocar código, define
// NEXT_PUBLIC_GALLERY_PIN en tus variables de entorno (Vercel).
const DEFAULT_PIN = 'copacrack2026';
const STORAGE_KEY = 'copa-crack-gallery';
const MAX_FILE_MB = 2.5;

const getPin = () =>
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_GALLERY_PIN) ||
  DEFAULT_PIN;

const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function loadPhotos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [unlocked, setUnlocked] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [notice, setNotice] = useState('');

  // Carga inicial desde este navegador (sin backend: cada admin ve sus fotos
  // en su propio navegador; para galería global se requiere Vercel Blob o
  // Cloudinary en el futuro).
  useEffect(() => {
    setPhotos(loadPhotos());
    try {
      if (sessionStorage.getItem('copa-crack-admin') === '1') setUnlocked(true);
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  const persist = (next) => {
    setPhotos(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setNotice('⚠️ Límite del navegador lleno: usa URLs en vez de archivos.');
    }
  };

  const login = (e) => {
    e.preventDefault();
    if (pin === getPin()) {
      setUnlocked(true);
      setShowLogin(false);
      setPin('');
      setPinError('');
      try {
        sessionStorage.setItem('copa-crack-admin', '1');
      } catch {
        /* sin sessionStorage */
      }
    } else {
      setPinError('PIN incorrecto.');
    }
  };

  const logout = () => {
    setUnlocked(false);
    try {
      sessionStorage.removeItem('copa-crack-admin');
    } catch {
      /* sin sessionStorage */
    }
  };

  const addByUrl = (e) => {
    e.preventDefault();
    const src = url.trim();
    if (!src) return;
    persist([{ id: uid(), src, caption: caption.trim() }, ...photos]);
    setUrl('');
    setCaption('');
    setNotice('✅ Foto agregada a la galería.');
  };

  const addFiles = (files) => {
    setNotice('');
    [...files].forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setNotice(`⚠️ "${file.name}" supera ${MAX_FILE_MB}MB: usa la opción de URL.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((prev) => {
          const next = [{ id: uid(), src: reader.result, caption: file.name }, ...prev];
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {
            setNotice('⚠️ Límite del navegador lleno: usa URLs en vez de archivos.');
          }
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (id) => persist(photos.filter((p) => p.id !== id));

  return (
    <div className="w-full max-w-4xl">
      {photos.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <ImagePlus className="mx-auto mb-4 h-10 w-10 text-[#FFD700]" />
          <p className="mb-2 text-xl font-black uppercase tracking-wider">Galería en preparación</p>
          <p className="text-gray-300">Las fotos de los campeonatos anteriores se publicarán aquí.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {photos.map((p) => (
            <figure key={p.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.caption || 'Foto campeonato Copa Crack'} className="aspect-square w-full object-cover transition group-hover:scale-105" loading="lazy" />
              {p.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-1.5 text-xs">{p.caption}</figcaption>
              )}
              {unlocked && (
                <button onClick={() => removePhoto(p.id)} aria-label="Eliminar foto" className="absolute right-2 top-2 rounded-full bg-red-600/90 p-1.5 hover:bg-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </figure>
          ))}
        </div>
      )}

      {/* Acceso administración */}
      <div className="mt-6 text-center">
        {!unlocked ? (
          showLogin ? (
            <form onSubmit={login} className="mx-auto flex max-w-sm flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
              <label htmlFor="gallery-pin" className="text-sm font-bold">PIN de administración</label>
              <input
                id="gallery-pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••••••"
                className="rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-center"
              />
              {pinError && <p className="text-sm text-red-400">{pinError}</p>}
              <button type="submit" className="rounded-full bg-[#FFD700] px-5 py-2 text-sm font-bold text-[#002B49] hover:bg-[#ffe14d]">
                Desbloquear
              </button>
            </form>
          ) : (
            <button onClick={() => setShowLogin(true)} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#FFD700]">
              <Lock className="h-4 w-4" /> Administración / Subir fotos
            </button>
          )
        ) : (
          <div className="mx-auto max-w-xl rounded-xl border border-[#FFD700]/40 bg-[#FFD700]/5 p-5 text-left">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-bold text-[#FFD700]">Panel de administración</p>
              <button onClick={logout} className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white">
                <LogOut className="h-4 w-4" /> Salir
              </button>
            </div>
            <form onSubmit={addByUrl} className="mb-4 flex flex-col gap-2">
              <label htmlFor="photo-url" className="inline-flex items-center gap-1 text-sm font-bold"><Link2 className="h-4 w-4" /> Pegar URL de imagen</label>
              <input id="photo-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" className="rounded-lg border border-white/10 bg-black/40 px-4 py-2" />
              <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Descripción (opcional)" className="rounded-lg border border-white/10 bg-black/40 px-4 py-2" />
              <button type="submit" className="rounded-full bg-[#FFD700] px-5 py-2 text-sm font-bold text-[#002B49] hover:bg-[#ffe14d]">Agregar foto</button>
            </form>
            <div>
              <label htmlFor="photo-file" className="inline-flex cursor-pointer items-center gap-1 text-sm font-bold"><Upload className="h-4 w-4" /> Subir desde este dispositivo</label>
              <input id="photo-file" type="file" accept="image/*" multiple onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} className="mt-2 block w-full text-sm text-gray-300" />
              <p className="mt-1 text-xs text-gray-500">Máx. {MAX_FILE_MB}MB por archivo. Se guardan en este navegador.</p>
            </div>
            {notice && <p className="mt-3 text-sm">{notice}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
