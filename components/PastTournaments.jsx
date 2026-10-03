'use client';
import { Trophy, Award, ChevronDown, ChevronUp, Medal } from 'lucide-react';
import { useState } from 'react';
import pastTournaments from '../data/past_tournaments.json';

const CupBadge = ({ type, children }) => {
  const styles = type === 'gold'
    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-[#002B49] shadow-[0_0_10px_rgba(255,215,0,0.4)]'
    : 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-[0_0_10px_rgba(180,180,190,0.3)]';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black ${styles}`}>
      {children}
    </span>
  );
};

export default function PastTournaments() {
  const [openEdition, setOpenEdition] = useState(null);

  const toggleEdition = (id) => {
    setOpenEdition(openEdition === id ? null : id);
  };

  return (
    <section id="historial" className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
      <h2 className="mb-2 flex items-center gap-2 text-4xl font-black heading-3d">
        <Trophy className="text-[#FFD700]" /> Historial de Campeones
      </h2>
      <p className="mb-12 text-gray-300">Revive las ediciones pasadas del torneo</p>

      <div className="w-full max-w-4xl space-y-4">
        {pastTournaments.map((edition) => {
          const isOpen = openEdition === edition.id;
          return (
            <article
              key={edition.id}
              className="card-3d overflow-hidden"
            >
              <button
                onClick={() => toggleEdition(edition.id)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left font-bold transition"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#e6c200]/10 text-[#FFD700] border border-[#FFD700]/30">
                    <Trophy className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xl text-white">{edition.title}</p>
                    <p className="text-sm text-gray-400">Año {edition.year}</p>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-6 w-6 text-[#FFD700] transition-transform duration-300" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 transition-transform duration-300" />
                )}
              </button>

              {isOpen && (
                <div className="border-t border-white/10 p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {edition.categories.map((cat, idx) => (
                      <div
                        key={`${edition.id}-${idx}`}
                        className="space-y-4"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Award className="h-5 w-5 text-[#FFD700]" />
                          <span className="font-bold text-lg text-white">{cat.category}</span>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="card-gold p-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                            <div className="relative mb-3 flex items-center gap-2">
                              <Trophy className="h-5 w-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                              <CupBadge type="gold">Copa Oro</CupBadge>
                            </div>
                            <div className="relative space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">Campeón</span>
                                <span className="font-semibold text-yellow-300 drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]">{cat.gold.champion}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">Subcampeón</span>
                                <span className="font-semibold text-gray-200">{cat.gold.runnerUp}</span>
                              </div>
                            </div>
                          </div>

                          <div className="card-silver p-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                            <div className="relative mb-3 flex items-center gap-2">
                              <Medal className="h-5 w-5 text-gray-400 drop-shadow-[0_0_8px_rgba(180,180,190,0.4)]" />
                              <CupBadge type="silver">Copa Plata</CupBadge>
                            </div>
                            <div className="relative space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">Campeón</span>
                                <span className="font-semibold text-gray-300">{cat.silver.champion}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">Subcampeón</span>
                                <span className="font-semibold text-gray-400">{cat.silver.runnerUp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {pastTournaments.length === 0 && (
        <div className="card-3d p-8 text-center">
          <Trophy className="mx-auto mb-4 h-10 w-10 text-[#FFD700]" />
          <p className="mb-2 text-xl font-black uppercase tracking-wider">Historial en construcción</p>
          <p className="text-gray-300">Los campeonatos anteriores se publicarán aquí.</p>
        </div>
      )}
    </section>
  );
}